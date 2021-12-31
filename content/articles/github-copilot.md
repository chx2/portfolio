---
title: Using GitHub Copilot with real world projects
description: GitHub Copilot is a tool developed by GitHub to aid programmers simliarly in fashion that most would do with methods such as a pair and mob programming. How true does this hold up in real application development?
slug: 'github-copilot'
thumbnail: 'copilot.png'
createdAt: 12/30/2021
---

## What is Copilot?
If you've missed the news and articles about this tool up to this point, GitHub has released a tool they refer to as [Copilot](https://copilot.github.com/).
GitHub Copilot is a merely a suggestion tool that is utilized during your programming sessions. Powered by [OpenAI](https://openai.com/), Copilot follows along with your programming and attempts to provide help whenever necessary.
In terms of help, Copilot can create entire functions, logical assumptions, or even simple tasks such as fetch calls!

<img src="/images/blog/copilot_example_1.png" alt="Copilot Example 1" />

While in theory having AI take over the task of pairing with you in programming might seem scary, rest assured, it's not out there to take our jobs.
As we dive into what Copilot aims to do, and the level can actually perform at makes it serve as a helpful tool rather than a job outsourcing one.

## How Copilot works?
If the idea of Copilot may seem foreign, keep in mind that you are the programmer in charge when working with Copilot, as stated in the GitHub description:

> With GitHub Copilot, you’re always in charge. You can cycle through alternative suggestions, choose which to accept or reject, and manually edit suggested code. GitHub Copilot adapts to the edits you make, matching your coding style.

As it follows you along, Copilot acquaints itself quickly with nuances such as programming language, frameworks, and overall functionality you may be working with at a given time(back-end, front-end, etc).
Over time while you are programming, Copilot will begin to offer several helpful features as you work:

```
- Converts descriptive comments to code(Programmer describes function, Copilot adds code within)
- Autofill for repetitive code(Programmer makes an array holding the alpabet characters, Copilot finishes after the 2nd letter)
- Suggests basic tests that a programmer will write for unit method tests
- Provides various alternatives for the suggestions it provides
```

Keep in mind that you don't have to utilize all of these features by force; everything Copilot provides is merely speculative suggestion.
You are free to code how you want, Copilot will even pick up on this behavior as well!

## How effective is Copilot?

When working with Copilot, one thing to keep in mind is that it is best used as a pairing tool. While Copilot can write its own functions and methods,
as the programmer who's serving as the actual 'pilot', it is your job to take suggestions when needed, but overall driving the process.
That being said, used as a supplementary tool, I personally found a significant benefit using Copilot.

Currently, my workload has involved working within a different backend stack that I'm normally accustomed to. While the frameworks changed, concepts did not, however, 
there are still changes in details such as syntax and code structure that have changed during this transition. While I have already
done significant amounts of pair and mob programming during the onboarding process, there are still the occasional situations where the cogs are a little slow.

Small yet easily blocking tasks such as remembering syntax gotchas and code helpers are things that copilot actually tends to suggest very handily.
While pair programming can usually handle situations where you forget these, it's a little easier to use the Copilot suggestion rather than your partner trying to explain syntax over a voice call.
Copilot was also helpful in standstill situations where if my programming partner and I were brainstorming, Copilot would continue to throw out suggestions, which I personally found helpful as it keeps us active as well as pushing to keep trying solutions instead of stopping the programming process completely.
Again, Copilot itself was not actually solving the problems itself, it was providing help when needed; not too much, not too little!

## What are the strengths/weaknesses of Copilot?

While Copilot may be helpful in most situations, one thing to note as with any modern AI is that it is not perfect. Some suggestions are not very good practice, don't work, or just flat-out don't make any sense.
As I stated from the beginning, Copilot is not seeking to take your job. You should be using Copilot as a supplementary tool rather than assuming
that it has the capability to write the code for you. While it may have the dataset referencing experience to pull that off, more than likely it will not be able to solve every problem in your specific use case.
Therefore, you should be going into your projects expecting Copilot's assistance, not relying on it for every line of code you write.

## Conclusion
While my explanation of Copilot is rather short, I feel that usage of Copilot is the best way for you to take notes on how it may be useful in your own programming experience.

Currently, Copilot is in a closed technical preview state. You can visit the signup link [here](https://github.com/features/copilot/signup) to put your
name on the list and can begin reading [here](https://copilot.github.com/#faqs) to learn more about what Copilot is as whole. 
One quick note is that you may need to stick to Visual Studio Code when using Copilot. I got lucky during my test run that Copilot supports PyCharm but other than that and Visual Studio, there really aren't many choice currently for IDE's that support Copilot.

While you may not want to rely on Copilot for production-projects right away, I would highly recommend giving it a shot on personal or greenfield work projects.
Whether it may be good fit for you or not, it's definitely worth it to give it a shot in your programming workspace!
