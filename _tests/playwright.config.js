import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

export default defineConfig({
  testDir: ".",
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: {
    command: "node serve.js",
    env: { PORT: String(PORT) },
    url: `http://localhost:${PORT}/codingforgood1.html`,
    reuseExistingServer: true,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
