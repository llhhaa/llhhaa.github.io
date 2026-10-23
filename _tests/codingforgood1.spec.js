import { test, expect } from "@playwright/test";

const STEP_1_OUTPUT = ["pwLength is  0", "Try again..."];
const STOPPED = /Stopped after 3 seconds/;
const LOOP_TIMEOUT = { timeout: 6000 };

const open = page => page.goto("/codingforgood1.html");
const editor = page => page.getByRole("textbox", { name: "Code editor" });
const output = page => page.locator("#out .line");
const status = page => page.locator("#msg");
const stepButton = (page, n) => page.getByRole("button", { name: `Step ${n}`, exact: true });
const button = (page, name) => page.getByRole("button", { name });
const starters = page => page.locator(".starter").evaluateAll(els => els.map(el => el.textContent.trim()));

async function runCode(page, code) {
  await editor(page).fill(code);
  await button(page, /Run/).click();
}

function edit(code, from, to) {
  expect(code, "the starter code changed; update this test's solution").toContain(from);
  return code.replace(from, to);
}

test.describe("steps", () => {
  test.beforeEach(({ page }) => open(page));

  test("has a button for each of the 5 steps, titled with that step's heading", async ({ page }) => {
    const codes = await starters(page);
    expect(codes).toHaveLength(5);

    for (const [i, code] of codes.entries()) {
      const heading = code.match(/^\/\/ =+ STEP \d+: (.+?) =+$/m);
      expect(heading, `step ${i + 1} should start with a "// ===== STEP N: ... =====" heading`).not.toBeNull();
      await expect(stepButton(page, i + 1)).toHaveAttribute("title", heading[1]);
    }
  });

  test("opens on step 1 and runs its starter code", async ({ page }) => {
    await expect(stepButton(page, 1)).toHaveAttribute("aria-pressed", "true");
    await expect(editor(page)).toHaveValue((await starters(page))[0]);
    await expect(output(page)).toHaveText(STEP_1_OUTPUT);
    await expect(status(page)).toHaveText("saved in this browser");
  });

  test("every step's starter code runs cleanly and is not solved yet", async ({ page }) => {
    const unsolved = [
      STEP_1_OUTPUT,
      ["firstLetter is  f", "Try again..."],
      [/^randomLetter is +[a-zA-Z]$/],
      [/^Your list is +\[".",(null,){8}null\]$/, /^Your password is +.$/, "Keep trying..."],
      [/^Your list is +\[(null,){6}"\d",".+",null,null\]$/, /^Your password is +..$/, "Keep trying..."],
    ];

    for (const [i, lines] of unsolved.entries()) {
      await stepButton(page, i + 1).click();
      await expect(stepButton(page, i + 1)).toHaveAttribute("aria-pressed", "true");
      await expect(output(page)).toHaveText(lines);
    }
  });
});

test.describe("lesson solutions", () => {
  test.beforeEach(({ page }) => open(page));

  test("step 1: setting pwLength to 10 is correct", async ({ page }) => {
    await runCode(page, edit((await starters(page))[0], "let pwLength = 0;", "let pwLength = 10;"));
    await expect(output(page)).toHaveText(["pwLength is  10", /^Correct!/]);
  });

  test("step 2: picking letters[0] is correct", async ({ page }) => {
    await stepButton(page, 2).click();
    await runCode(page, edit((await starters(page))[1], "letters[5]", "letters[0]"));
    await expect(output(page)).toHaveText(["firstLetter is  a", /^Correct!/]);
  });

  test("step 4: filling all 10 boxes makes a great password", async ({ page }) => {
    const fillAll = Array.from({ length: 10 }, (_, i) =>
      `password[${i}] = pickRandom(${["letters", "numbers", "sChars"][i % 3]});`).join("\n");

    await stepButton(page, 4).click();
    await runCode(page, edit((await starters(page))[3], "password[0] = pickRandom(letters);", fillAll));
    await expect(output(page).last()).toHaveText("Great password!");
    await expect(output(page).nth(1)).toHaveText(/^Your password is +.{10}$/);
  });

  test("step 5: filling password[i] in the loop makes a great password", async ({ page }) => {
    await stepButton(page, 5).click();
    await runCode(page, edit((await starters(page))[4], "// what goes here?", "password[i] = pickRandom(letters);"));
    await expect(output(page).last()).toHaveText("Great password!");
  });
});

test.describe("running code", () => {
  test.beforeEach(({ page }) => open(page));

  for (const key of ["Control+Enter", "Meta+Enter"]) {
    test(`${key} runs the code without adding a new line`, async ({ page }) => {
      await editor(page).fill('console.log("shortcut")');
      await editor(page).press(key);
      await expect(output(page)).toHaveText(["shortcut"]);
      await expect(editor(page)).toHaveValue('console.log("shortcut")');
    });
  }

  test("formats logged values like the browser console", async ({ page }) => {
    await runCode(page, 'console.log([1, "a"], { a: 1 }, undefined, null, "text", 2.5)');
    await expect(output(page)).toHaveText(['[1,"a"] {"a":1} undefined null text 2.5']);
  });

  test("shows warnings and errors in their own colors", async ({ page }) => {
    await runCode(page, 'console.warn("careful");\nconsole.error("oops");');
    await expect(page.locator("#out .warn")).toHaveText(["careful"]);
    await expect(page.locator("#out .err")).toHaveText(["oops"]);
  });

  test("reports runtime errors with the student's line number", async ({ page }) => {
    await runCode(page, "// line 1\n// line 2\nnotDefined(); // line 3");
    await expect(page.locator("#out .err")).toHaveText([/notDefined.*\(line 3\)$/]);
  });

  test("reports syntax errors with the browser's message and the student's line number", async ({ page }) => {
    await runCode(page, "// line 1\nlet x = ;");
    await expect(page.locator("#out .err")).toHaveText([/';'.*\(line 2\)$/]);
  });

  for (const [mistake, code, line] of [
    ["an unclosed brace", "for (let i = 0; i < 3; i++) {\n  console.log(i);", 2],
    ["an unclosed string", '// line 1\nconsole.log("hi);', 2],
  ]) {
    test(`explains ${mistake} on the right line, and isn't later reported as stopped`, async ({ page }) => {
      await runCode(page, code);
      await expect(output(page)).toHaveText([new RegExp(`^💥 (?!undefined)\\S.*\\(line ${line}\\)$`)]);
      await page.waitForTimeout(3500);
      await expect(output(page)).toHaveCount(1);
    });
  }

  test("student variable names don't clash with the page's own code", async ({ page }) => {
    await runCode(page, "let lines = 1; let show = 2; function fmt() {}\nconsole.log(lines, show);");
    await expect(output(page)).toHaveText(["1 2"]);
  });

  test("code that finishes is not reported as stopped", async ({ page }) => {
    await expect(output(page)).toHaveText(STEP_1_OUTPUT);
    await page.waitForTimeout(3500);
    await expect(output(page)).toHaveText(STEP_1_OUTPUT);
  });

  test("a loop that never ends is stopped, and the page stays usable meanwhile", async ({ page }) => {
    await runCode(page, 'console.log("before");\nwhile (true) {}');
    await expect(output(page).first()).toHaveText("before");

    await stepButton(page, 2).click();
    await expect(output(page).first()).toHaveText(/firstLetter is/, { timeout: 1000 });

    await stepButton(page, 1).click();
    await expect(output(page)).toHaveText(["before", STOPPED], LOOP_TIMEOUT);
  });

  test("a saved never-ending loop doesn't lock the student out after reloading", async ({ page }) => {
    await runCode(page, "while (true) {}");
    await page.reload();
    await expect(output(page)).toHaveText([STOPPED], LOOP_TIMEOUT);

    await button(page, /Reset/).click();
    await expect(output(page)).toHaveText(STEP_1_OUTPUT);
  });

  test("a loop that logs forever is capped, then stopped", async ({ page }) => {
    await runCode(page, "for (let i = 0; ; i++) console.log(i);");
    await expect(output(page)).toHaveCount(502, LOOP_TIMEOUT);
    await expect(output(page).nth(499)).toHaveText("499");
    await expect(output(page).nth(500)).toHaveText(/Too many lines/);
    await expect(output(page).nth(501)).toHaveText(STOPPED);
  });
});

test.describe("editor", () => {
  test.beforeEach(({ page }) => open(page));

  test("line numbers match the lines of code", async ({ page }) => {
    const gutter = page.locator("#gutter");

    await editor(page).fill("one\ntwo\nthree");
    expect(await gutter.textContent()).toBe("1\n2\n3");

    await editor(page).fill("one");
    expect(await gutter.textContent()).toBe("1");
  });

  test("highlighting mirrors the code exactly and colors each kind of token", async ({ page }) => {
    const code = 'let x = 7; // a "note"\nconsole.log("<b>&</b>");';
    const hl = page.locator("#hl");

    await editor(page).fill(code);
    expect(await hl.textContent()).toBe(code + "\n");
    await expect(hl.locator(".k")).toHaveText(["let"]);
    await expect(hl.locator(".n")).toHaveText(["7"]);
    await expect(hl.locator(".c")).toHaveText(['// a "note"']);
    await expect(hl.locator(".s")).toHaveText(['"<b>&</b>"']);
    await expect(hl.locator("b")).toHaveCount(0);
  });
});

test.describe("saving", () => {
  test.beforeEach(({ page }) => open(page));

  test("edits survive a reload, even without pressing Run", async ({ page }) => {
    await editor(page).fill('console.log("mine")');
    await page.reload();
    await expect(editor(page)).toHaveValue('console.log("mine")');
    await expect(output(page)).toHaveText(["mine"]);
  });

  test("each step keeps its own edits", async ({ page }) => {
    const codes = await starters(page);

    await editor(page).fill("// step 1 edit");
    await stepButton(page, 2).click();
    await expect(editor(page)).toHaveValue(codes[1]);

    await stepButton(page, 1).click();
    await expect(editor(page)).toHaveValue("// step 1 edit");
  });

  test("reopens on the last step viewed", async ({ page }) => {
    await stepButton(page, 3).click();
    await page.reload();
    await expect(stepButton(page, 3)).toHaveAttribute("aria-pressed", "true");
    await expect(editor(page)).toHaveValue((await starters(page))[2]);
  });

  for (const saved of ["7", "-1", "1.5"]) {
    test(`opens on step 1 when the saved step (${saved}) doesn't exist`, async ({ page }) => {
      await page.addInitScript(value => localStorage.setItem("codingforgood1-current", value), saved);
      await open(page);
      await expect(stepButton(page, 1)).toHaveAttribute("aria-pressed", "true");
      await expect(editor(page)).toHaveValue((await starters(page))[0]);
      await expect(output(page)).toHaveText(STEP_1_OUTPUT);
    });
  }

  test("Reset restores the current step's starter code", async ({ page }) => {
    await runCode(page, "// broken");
    await button(page, /Reset/).click();
    await expect(editor(page)).toHaveValue((await starters(page))[0]);
    await expect(output(page)).toHaveText(STEP_1_OUTPUT);

    await page.reload();
    await expect(editor(page)).toHaveValue((await starters(page))[0]);
  });

  test("still works, without saving, when the browser blocks storage", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() { throw new DOMException("blocked", "SecurityError"); },
      });
    });
    await open(page);

    await expect(page.locator("#steps button")).toHaveCount(5);
    await expect(output(page)).toHaveText(STEP_1_OUTPUT);
    await expect(status(page)).toHaveText(/^not saved/);
  });
});

test.describe("copy my code", () => {
  test("copies the current step's code", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "only Chromium lets tests grant clipboard access");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await open(page);

    await stepButton(page, 2).click();
    await button(page, /Copy my code/).click();
    await expect(status(page)).toHaveText(/^copied step 2/);
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(await editor(page).inputValue());
  });

  test("selects the code for manual copying when the clipboard is unavailable", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: () => Promise.reject(new Error("denied")) },
      });
    });
    await open(page);

    await button(page, /Copy my code/).click();
    await expect(status(page)).toHaveText(/^couldn't copy/);
    await expect(editor(page)).toBeFocused();
    const [start, end, length] = await editor(page).evaluate(ta => [ta.selectionStart, ta.selectionEnd, ta.value.length]);
    expect([start, end]).toEqual([0, length]);
  });
});
