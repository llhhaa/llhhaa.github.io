---
layout: post
title:  "On the death of a craft that never was"
date:   2024-01-08
categories: programming artificial-intelligence
---
It's been over a year since ChatGPT first arrived and, even though it has yet to cause mass layoffs, blog posts and op-eds still trickle in week-by-week about the end of coding as we know it. This is one more, kind of.

Both AI and the role of AI in software production are in a period of tremendous change, though the pace showing signs of slowing. Sam Altman [argued way back in April](https://www.wired.com/story/openai-ceo-sam-altman-the-age-of-giant-ai-models-is-already-over/) that the data sets models are trained on are already as big as they need to be. New features for LLMs are not with the models themselves (setting aside the rumors about OpenAI’s Q* model) but their “edges”, how they work with multiple data types, interface with other systems, and can be fine-tuned towards specific purposes.

One of those purposes is producing code. The stuff of code is text, and generative AI excels at producing text above all else. Tools like GitHub Copilot are getting more capable, producing larger and more involved units of code, but it’s not evident that these tools are anywhere near getting at the “hard problem of programming.” Human programmers are not turning into machine minders who merely ensure the program behaves as expected. You still need human beings who can not just understand the code and its context, but can themselves write code to fill in any gaps.

To hear some tell it, we are in a [paradigm shift](https://plato.stanford.edu/entries/scientific-revolutions/#KuhEarMod) - AI heralds a new way of coding, unrecognizable to its current practitioners. I disagree, which is why I like James Somer’s essay, [“A Coder Considers the Waning Days of the Craft”](https://www.newyorker.com/magazine/2023/11/20/a-coder-considers-the-waning-days-of-the-craft). Somers’s vision of post-AI programming is neither apocalyptic nor Pollyanna-ish. His predictions are grounded, and he retains an appreciation for the human element in coding.

I want to further temper his view. Somers, like a lot of programmers, sees coding as a “craft”, a deeply human endeavor for which things like individual experience, aesthetics, and even morality are key elements. But professional programming - programming for businesses and other institutions - is much more regimented, constrained, and prepackaged than we tend to acknowledge. In my view, generative AI will not reinvent the profession, but deepen current trends.
<br><br>

---

<br>
There has long been an identity crisis at the heart of professional programming. People who code for a living are invited to call themselves software "engineers", as they create and scale complicated, load-bearing systems prone to ripple effects and unintended consequences. Specifications are handed off, metrics are observed, queries are optimized. Computers are machines, and to program them is to control and instruct them. They are not as concrete as the physical systems that other types of engineers work with, but they are “hard” and deterministic in a way that rhymes with, say, building materials or electrical circuits. 

Simultaneously, professional programmers tend to think of their work as a craft. Where engineers are concerned with strict standards and exacting verification, craftsmen are much closer to artists, concerned with functionality but also aesthetics, conviviality, even morality. Computers are black boxes executing infinitely-expressive programming languages. The variation in the code that can perform a given task is, in principle, infinite. This makes programming resistant to standardization and heavily reliant on peer teaching, since every programmer and every firm is going to solve problems in different ways, even if just slightly. It also gives substantial leeway to programmers in how they write code and decide its structural and aesthetic qualities.

Making software allows the programmer to imagine themselves as both expertly poring over blueprints and a potter over the wheel.
<br><br>

---

<br>
We can think of engineering and craft as opposite poles for how work can look. Programming is not a wholly new thing under the sun, so both poles capture some truth about it. However, programming doesn't fit neatly with either. It sits somewhere in between; I believe it sits closer to engineering.

The actual "craftiness" of programming work in capitalism is overstated. Yes, programmers are concerned with style and design, but this is precisely because there is little in the professional programming environment that _requires_ good style and design. That coders have to compensate with constant, conscious efforts to maintain a “culture” that prioritizes aesthetic quality shows that this quality is not what makes code valuable to a firm.

General programming languages are infinitely expressive, but this not felt much by the typical professional programmer. Libraries, frameworks, and time requirements heavily constrain what code a programmer writes. While these constraints do not rise to an industry standard, in day-to-day practice the code will be utilitarian, unsurprising, and resemble the code the firm has already produced.

Whereas handicraft existed prior to and was tamed by industrial capitalism, engineering was born of the capitalist epoch. Computers are *the* general-purpose machine, the apotheosis of capitalist mechanization, and writing programs for them places one at the heart of that project. Indeed, no matter how much the software engineer feels that they are engaged in a skillful and aesthetic endeavor, programming for profit means working under the imperatives of speed, reliability, and above all, efficiency.

If making software is not engineering, it is work that is subject to, above all else, the same imperatives as engineering and machine-making.
<br><br>

---

<br>
A new type of program - a new machine - that efficiently produces predictable code does not knell the death of a craft but the continuing rationalization and efficiency-making of work that is already principally concerned with those qualities. This trend may be accelerated compared to what came before, but that work will still be recognizable to those who were doing it on November 29, 2022.

Which is also to say, programmers are not wrong that these changes very likely diminish what handicraft-like qualities do exist in programming. Every line of code produced by machine is one less line of code written, literally, by hand. A machine that produces predictable code means it is less important that human programmers are held to (soft, intra-firm) standards of style. There is a machine that can do it for them.

Cultural inertia will ensure that, for a long time, the ability to write well-factored code will still be valued, if not by managers then by programmers themselves. Like any other group whose work is increasingly mediated by machines, programmers will always look over their shoulder at the days of yore. This nostalgia is not strictly sentimental. There will continue to be novel programming problems that LLMs will be less effective at producing code for. And the one task that will rise in importance, the ability to read and understand code you didn’t write, will generally be performed better by those who could have written it themselves.

That may seem like little solace for the current generation of programmers who pride themselves on their coding abilities. For what it’s worth, I suspect every generation of programmers has felt this way - seeing the next generation be a little more willing to let others write the code and understand the inner workings of these machines (consider the case of [left-pad](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code)). Only this time, it’s the machine that tends to, and appears to understand, itself.
