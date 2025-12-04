---
title: "My experience with Kiro"
keywords: 
  - kiro
date: 2025-10-02
tags:
  - tools
author: ""
---

I got off the Kiro waitlist and spent a couple of weeks trying it out. This is a messy, journal-style note about what I did, what worked, and what didn’t. I wanted to build a project with it to see how it fits into a real workflow and to compare it later with other IDEs and tools.

Note: I tried to keep this casual — these are my raw thoughts.

I started by generating a plan using Gemini 2.5 Pro, then gave that plan to Kiro to help make specs and scaffolding. I wanted to see how Kiro handles spec-driven development (SDD) and whether it helps with the flow. I created a different spec for each high-level feature.

## First impressions

- Very verbose. The tool writes a lot. Reading and refining everything takes time.

- You need to be clear about the aim of the project. If your goal is fuzzy, the output can be too. If some requirements are unclear, write that down in the spec.

## The project I tried

I built a cross-platform Flutter client for Nextcloud's password manager. I started from scratch. I asked Gemini 2.5 Pro for a plan, then fed that plan into Kiro to develop specs.

## How Kiro worked for this

First it created `requirements.md` for setting up the project (eventually for individual features when asked). It was really good and detailed. It covered almost all the user scenarios, error cases, and edge cases. I found it very useful for bridging the gap between technical and non-technical teams.

Then it moved to `design.md` which included a technical design with a suggested folder structure and diagrams (depending on the feature). The folder structure it generated sometimes had duplicate approaches. For example, it created `models`, `data`, `api`, and `services` folders individually, but also repeated similar files inside each feature folder. It took a lot of back and forth to refine it.

While defining technical details in the specs, I explicitly provided the APIs to be used. Even though whatever I mentioned, the model tried to use its own knowledge and generated technical specs with either some different APIs or mock endpoints. I’m not sure if I could not explain it properly or a limitation of the tool.

Once the technical designs were done, `tasks.md` was created. It had very detailed tasks (repetitive at times). Gives a clear cut idea of what you are about to work on. I like their tasks UI too — it gives a nice inline interface to run, retry and tracking the progress.

One add on is the steering docs it can generate. They are a great way to define rules and patterns about your codebase. The model generally understands them and tries to follow them.

In the steering docs, I mentioned how important tests are and asked the model not to break tests. The good thing is that it managed to make it write tests for each task. However, while integrating a webview with an external Flutter package, I hit some Swift compatibility issues for the macOS build. The model tried upgrading/downgrading package versions. When it couldn't fix the issue, it commented out a line in `pubspec.yaml` for that package and continued writing tests and making them pass. Because the tests passed, it told me to continue development with the commented package and fix the issue later. That was surprising since this was the authentication module I was working on.

## Did it work for my project?

Short answer, No. But I like the idea of spec creation and would probably use it in future projects. I'm less sure about using it to create technical docs — I feel I need more skills to avoid the back-and-forth with the model. It might be easier for people whose job is to architect projects. The tasks part did not work well for my project, so I wouldn't rely on it yet.

## What went wrong

It sometimes got stuck when I asked it to edit something (either specs or code). I had to force-stop the chat, but the change eventually appeared, so maybe it was working in the background.

I had to provide online references (a URL) for it to work as I intended. Otherwise it used older knowledge and wrote specs that were not accurate or how I wanted.

When I asked it to fix a specific issue, it would roam the project and try to fix other unrelated things. I would prefer it to only fix what I asked for.

At one point, when it hit a tricky regular-expression error, it got confused and rewrote the entire file instead of making a small, targeted fix.

## What I liked and will keep using

I liked the `requirements.md` and steering files. They helped me (as a developer/creator) think clearly and guided the AI. My only pet peeve is that specs need to be updated as the project grows which is understandable I guess.

- The task list concept is awesome. One can easily follow it while building features. I'd like to keep this in my workflow.

## Final thoughts

Kiro is powerful and tries to do a lot. For me, the biggest wins were in spec creation and offloading repetitive tasks. Downsides are verbosity, occasional unrelated fixes, and the need to keep reviewing what it does.

My plan: I was originally going to try the same project with GitHub's spec-kit, but I think I'll try something smaller first. I feel it'll be easier for me to gain experience with SDD if the project is not too complex. I’ll share the comparison when I have more experiments done.

If you have tips on working with SDD tools, or how to keep the AI focused when fixing issues, please tell me — I’d love to hear them.
