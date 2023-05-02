---
layout: post
title:  "Intent and Documentation"
date:   2023-05-01 10:10:00 -0400
categories: programming documentation
---

Why should we document code? Every programmer knows a standard litany of reasons - like that it describes desired program behavior, supports maintenance, and helps with onboarding and knowledge transfer. None of these are wrong. But knowing these facts about a program are outcomes of having documentation, not an account of what writing documentation does for the programmer and the program.

Focusing on outcomes does not tell us why documentation should happen alongside programming. It’s like answering why you practice throwing, catching and batting with “that’s how you win baseball games”. Not wrong, but it’s more accurate to say that practice is how you master the skills of the game and play it well. It confers benefits beyond other, less scrupulous strategies one might use to win.

Focusing on outcomes also has us think of documentation as *having been written* - if documentation exists, then these good things happen. This leads us to see documentation as happening after or separately from programming. It’s a short step from that to documentation as a nice-to-have, and the existence of documentation as the exception, not the rule.

What we need is not a list of the good things that happen when documentation exists, but an account of what happens when we document our code. And to get that, we need to talk about intent.

---
<br>
The spirit of a program is the intent of the programmer who wrote it. Intent is a program’s animating force - it brings it into being, determines what it does, and shapes its growth. Intent also constrains what a program can do and how it will change. An application or module that manages user records, for example, should not also be responsible for calculating tax. Understanding the intent behind a program is key to changing a program, and the program’s success over time.

If a program’s intent is misunderstood or ignored, intent will multiply or degrade as the program undergoes changes. A program with vague or multiple intents is torn between many sets of responsibilities, and risks fulfilling all of them poorly. Multiple intents also introduces conflicting constraints, and the program becomes painful to change - and it will change, not least because the lack of clear intent leaves the programmer with no basis to refuse changes.

Clear and singular intent, determines the appropriateness of a program to a task, and if the program is not appropriate, the programmer needs to decide (i.e. form an intent on) whether to recast the program in the new intention, or write a new program.[^1] This assumes, of course, that the programmer has correctly discerned the program's intent.

Unfortunately, we don’t see intent directly in the body of a program. By the time we’re confronted with the code, the intent is gone, the code merely its residue. Some of it will be the result of intent, but as much or more will be incidental - unrelated to the originating purpose of the program. This distinction is where the the pitfalls of discerning intent lie.

---
<br>
Every aspect of a program, down to individual lines of code, is subject to the intentional/incidental distinction. Intentional aspects accomplish some desired outcome. They get the program to work as intended or make the program easier to change, extend, or understand. Incidental features are there, as the name suggests, by accident. They may help or hurt a program, but they escape the notice of the programmer because they don’t (yet) get in the way of the intentional parts of the program.

For programmers making changes to an existing codebase[^2], sussing out this distinction is the first step in their work. What is intentional, and should be kept and added to? What is incidental, and can be modified or thrown away (or made intentional!) as needed?

Code by itself is coy about what parts of it are intentional and what parts are incidental.[^3] An experienced programmer who knows the language, framework, and idioms of a codebase will be able to discern some of the intent, maybe even most of it. But for all programmers, the tendency when confronted with code that is not clearly incidental is to play it safe and treat it as intentional. This tendency increases with the age, amount, and complexity of code.

This results, over time, in *intentionality creep*: the tendency of incidental codebase features to become intentional, through code that either assumes the incidental feature or follows its pattern. Careless developers aren't the only, or even typical, cause of multiplying intents - it's the tendency of even the most carefully crafted codebases.

---
<br>
Intentionality creep means programs and programmers must always communicate a certain minimum of intent. This is done first and foremost by programming in shared idioms. Patterns like REST APIs and component-state separation don't just structure code, they implicitly state intent, recognizable to other in-the-know programmers. If I see a REST API for a user object, I know that updating users via a PUT request falls within the intent of that program.

Idiom, however, has its limitations. Being implicit means that unfamiliar programmers will be unable to discern the intent. More importantly, not every programming problem has an idiomatic solution. If idiom is your only tool, and you are solving a problem it does not address, your intent will be obscure and haphazard.

This is where documentation reenters our story. And here I mean not just the statement of facts about the program, but also the story of how the program came to be. Such documentation is nothing less or more than the overt statement of intent. How is a program to function? What choices were made to arrive at it? How does it mesh with its context of other programs and the real world? Complete and well-written documentation answers these questions.

Where idiom depends on a prior shared understanding, documentation *creates* a shared understanding. It clarifies some aspect of a program, makes it graspable, and sets forth the requirements for it to change, if needed. This clarity is contagious - documented features help explain the undocumented features that abut them. This contagious clarity means a well-documented program does not have every single line of code explained. It has its key qualities documented, like lampposts along a night path.

And unlike self-documenting programs, documentation is also valuable for what it does *not* say. In the well-documented program, code or behavior that did not merit documentation is open to change. Change in these areas would not interfere with the intent of the program. The night path is lit well enough to allow you to meander while keeping you from straying.

---
<br>
Complete documentation explains why a program was written in a particular way, clarifies that intent to others (and possibly to the programmer who wrote it!), and empowers them to make changes to the program without overburdening or muddling it. It is not a silver bullet against poorly-factored or unfocused code, but when written and read by capable programmers, it comes close.

If you’re a novice documentarian and aren’t sure where to start, there are several widely recognized document formats used in software documentation. Requests for Comment (RFCs) can be used to ask how changes in a program should be made. Architectural Decision Records (ADRs) can be used to record these decisions and the deliberation that led to them. API documentation explains how a program expects to interact with others. If you use version control to manage your code - and you should - commit messages and especially pull requests are opportunities to place documentation right alongside code changes. There are tons of resources on the web about how to use these types of documents, and many others besides.

Of course, documentation does not have to follow a specific format. If what needs to be explained about a program does not fit in the above formats, don’t let that stop you from putting pen to paper. If you feel something should be documented, write it. Some of the most useful documentation is simply a plain-language walk-through of some portion of code that can save a programmer hours of reading and debugging code - and trying to infer the intent behind it.

#### Footnotes
[^1]: For object-oriented programmers, you may at this point think this sounds like a restatement of the Single Responsibility Principle - which it is. This discussion of intent is a broader version of what SRR is for object classes or modules.
[^2]: Which may be the original programmer, if enough time has passed.
[^3]: The assertion that “code documents itself” is, I'd argue, a normative claim that whether code is intentional or incidental is entirely at the discretion of the programmer currently modifying it.
