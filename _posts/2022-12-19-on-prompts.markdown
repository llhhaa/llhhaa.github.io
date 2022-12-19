---
layout: post
title:  "On Prompts"
date:   2022-12-19 12:30:00 -0500
categories: programming prompts
---
`def`

I’ve been thinking about software development more and more in terms of prompts. These can be something simple like the output of a script or a Slack message, or something complicated like a pull request or project requirements. Prompts get us not just to complete project work, but to write unit tests, document changes, respond to support issues, and myriad other tasks that create not just functioning software, but functioning software companies.

Everyone works by prompt, but prompts help programmers in particular navigate not just their work and their workplace, but the software itself. A program is a unique accretion of rules, dependencies, and decisions that will be unlike any other program, even if they share a common purpose. Each program is a tome only the programmer can parse, which is why, even though it’s been done countless times in countless other programs, the new feature takes 3 months to implement.

The more complex the workplace and programs, the more important the quality and quantity of prompts. Prompts can be instinctive to respond to or burdensome noise, attention-grabbing or easy to ignore, can overwhelm us or themselves be drowned out. Sometimes, they can be all of those things.

`body`

Among programming prompts, error monitoring is a near-universal. Tracking application errors allows programmers to learn more about application behavior, to know when issues arise, and to fix them. It lifts errors out of log streams, tracks them over time, provides context, and allows programmers to attach extra information to make them even more useful. When something goes really wrong, error monitoring is one of the first places it will show up. For enterprise software companies, it is indispensable. At my company, there are always multiple people with their eye on errors at any given time. Links to errors are littered throughout Slack messages and pull requests. When we triage issues, when we deploy code, when we run tests and QA, we watch for errors.

So far, I’ve described error monitoring as a great, high-quality prompt of ubiquitous use. But often as ubiquitous is the feeling that we’d rather not have to deal with it - a difficult-to-use source of misleading information and extra work. It tends to be a victim of its own success, and, as we’ll see, its widespread use is precisely the source of that pain.

In big software companies that serve large numbers of users, errors come in at huge volumes across dozens of applications. We can’t respond to all of them, so we learn which errors we can ignore. The ignorable stuff is *****noise*****, and it’s a taxing exercise in picking out meaningful prompts among a sea of ones we’ve become inured to, all the while thinking “if only I or someone had the time to clean all this up!”

How did it get so messy? To start, error monitoring services surface *every* unhandled error from the application. This is reasonable of the service - it doesn’t know what errors are important, and it certainly can’t resolve them. It’s our job to resolve errors by addressing ones that matter or suppressing ones that don’t. Either is an undertaking - we need to know what causes the error to occur (difficult in an application with hundreds of thousands of lines of code and millions of users) and what an acceptable resolution would be. It requires us to be familiar with the complete context of the erroring code and the state of the application when the error occurs.

What’s more, programmers can send custom events to the monitoring service. This is often done with unhandled errors, to make them more helpful, but it is also done for application behaviors that are not errors. The role of the error monitoring service grows to that of an *event* monitoring service. It adds another source of prompts for developers to respond to (otherwise, why add the event in the first place?), and to know how to respond, resolve, or remove them when the time comes.

There is no getting around need to tend to our prompts. When you first set up the error monitoring tool, it feels tremendously useful and powerful, each error a wealth of information that empowers you far beyond simple application logs. But as your code and user base grows, so do the errors, while your ability to respond to them stays roughly the same, maybe even decreases. There is an entropic tendency towards noisiness; and just like a messy room, the only way to keep it livable by regularly tidying it.

The difficult part for us programmers is how to find the time to do the tidying. But even seemingly-trivial errors can take large amounts of time. A noisy error for you might be a valuable prompt for someone else - or more frighteningly, a noisy error today might be essential information tomorrow. Each error requires hours of engineering time to triage, discuss, settle on a resolution, and deploy the changes. Now try to find those hours amidst project deadlines and support requests. The slide towards entropy seems all but inevitable.

`return`

What are we to do? We already know one answer - find the time for the tidying. Just like we retro projects and groom backlogs, we should allocate time to resolve errors, tweak app configurations, and add inline documentation to what we can’t get around to. But time budgets have an entropic tendency all their own, and engineers have to constantly advocate for maintenance work in the face of other time demands. It is a double-demand of the discipline of whole programming teams.

There are ways to be clever with your limited time. One strategy that I’ve found to be effective is to simply propose a resolution to a prompt, right or wrong. If it’s right, someone will approve it, but if it’s wrong, it’s a lot easier to get whoever does know what’s going on to tell you what needs to be done to fix it. There is something about *being wrong* that is itself a highly effective prompt for others. I’ve seen a similar strategy suggested in getting help with Linux - ask how something works and experts will tell you to check the docs; complain that something doesn’t work and you’ll get an in-depth answer.

But, neither Sisyphean maintenance nor clever tricks are satisfying answers to this perennial problem, and I have a more radical proposition that requires neither - regardless of their type or origin, prompts are not sacrosanct; all prompts should expire. The [Shape Up](https://basecamp.com/shapeup) method eschews ever-growing backlogs, and instead has us pay attention only to recent or purposefully-maintained project proposals. We should extend this principle to the rest of our programming culture. If no one has ever raised a peep about a year-old error - smash that ignore button, or its code equivalent. If a PR has not been touched in six months, close it. Three months might be enough time in some cases. To paraphrase Shape Up’s author Ryan Singer: “The truth is, prompts are cheap. They come up all the time and accumulate into big piles. Really important prompts will come back to you.” What you’ll be left with are the ones that matter.
