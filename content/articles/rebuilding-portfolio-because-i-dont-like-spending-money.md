---
title: Rebuilding my portfolio because I don't like spending money
description: Over the course of the various iterations my personal portfolio has undergone, I recently decided that of all the things I pay for hosting, my portfolio can be reduced to zeroes on the dollar!
slug: rebuilding-portfolio-because-i-dont-like-spending-money
thumbnail: nuxt.png
createdAt: 9/8/2021
---

While I previously discussed how my portfolio site has been a good way of exemplifying my development skills, I made the point on how hosting can be costly. While it costs a grand total of 3$ a month, using tools as I'm about to show you will enable myself(and you) to host your own portfolio for free!

## My approach
I decided from my existing background in Vue, I wanted to host everything together again on a single application. My main issue is having a CMS in addition to the freedom of creating custom pages how I would typically when making Vue applications. I also wanted to consider the idea of having a static site, which would pretty much cut my server costs to zero with options such as [GitHub](https://pages.github.com/), etc.

In the end, I decided to go with [Nuxt](https://nuxtjs.org/). Nuxt is pretty much the Vue counterpart of [Next](https://nextjs.org/), which actually is somewhat ironic because the creator of Next, Vercel, is the company I decided to pick for hosting; more on this later. Nuxt along provided the tools I needed for my portfolio requirements and with the addition of the [Nuxt Content API](https://content.nuxtjs.org/) to my project, I had the CMS piece to my puzzle that now enables me to go fully static! While it was nice to get a fresh coat of paint on things, there were some significant adjustments to be made.

## Hosting
Typically, when hosting applications, I tend to use [Vultr](https://www.vultr.com/). While it's not free, it's relatively cheap and makes it possible in combination with Laravel Forge to spin up new applications easily. Despite this however, really the only thing on my personal website that requires any sort of database is my blog. The only reason that uses a database is, well, WordPress.

<img src="/images/blog/vercel.jpg" alt="Vercel" />

Recently, I've been hearing greats things about [Vercel](https://vercel.com/). Vercel in many ways is very similiar to Netlify. It serves as a hosting platform for predominantly front-end applications with some support for serverless functions. They offer one-click setups for many application setups(Nuxt, Next, Hugo, Gatsby, etc). They also allow for you to import your domains and offer a free plan!

While I'm not moving away from Vultr entirely, I feel that I definitely can use Vercel to offload some of my smaller projects. Starting, with my portfolio!

### Migration
My resume and landing page as usual are pretty straight forward. I decided to return to using Tailwind as my design choice to show a little more creative freedom rather than using existing components. Because of this, pretty much the resume and landing page were done from scratch. I was however, able to import my data files into the Nuxt Content API so I didn't have to really change how I dynamically generate content on my resume!

<img src="/images/blog/nuxt_content.png" alt="Nuxt Content" />

The harder part of the migration was the WordPress articles for my blog. I couldn't really find a good way to import everything all at once, so I pretty much had to copy+paste anything worth keeping. There's pretty much three big parts to this process:

### Code
Building the Nuxt template was the first task of my blog migration. While the template itself is rather simple, Manually having to inject styling and figuring out Nuxt routing was not. Styling for my blog is a little tricky so I ended having to write `.nuxt-content <selector>` for pretty much all of my base styles. While not hard on its own, it was rather tedious figuring out what trickery I do when writing.

### Metadata
Each of my articles has a starting block in the corresponding `.md` file that holds basic metadata about the article:

```
---
title: Rebuilding my portfolio because I don't like spending money
description: Over the course of the various iterations my personal portfolio has undergone, I recently decided that of all the things I pay for hosting, my portfolio can be reduced to zeroes on the dollar!
slug: rebuilding-portfolio-because-i-dont-like-spending-money
thumbnail: nuxt.png
createdAt: 9/8/2021
---
```

Most of these are pretty straightforward. Except in my case, I had to go back to each article and copy these various bits of details over. While Nuxt Content does allow you to use the file created date, when migrating existing content over, I can't rely on that feature to reasonably sort thing out.

## Content
While content for the most part was copy+paste, It was only 100% effective with plain text. For some reason I like sharing code snippets as a developer so that wasn't particularly fun to deal with my past self. I also I had to move over all my images manually. The loss of Gutenberg when editing content does present little more restrictive freedom when designing content layout. However, as a developer, I tend to keep my articles pretty simple in overall structure anyways.

## Thoughts on Nuxt.js
Overall, it was a great deal easier moving all of my Vue-related portfolio work into a single application. The Nuxt commandline installation was fantastic. I was able to install Nuxt locally with the project pre-configured with Tailwind, Axios, and Content, the Nuxt API for pretty much a hand rolled CMS. Integrations for Nuxt are done via modules, which helps keeps your actual template code clean and not having a massive `app.js` file that imports any bits and pieces that you need in your project.

The only downside I saw to Nuxt was routing. Normally when working in Vue applications, you become pretty familiar with `vue-router` and set up your routes manually. Nuxt's approach is to automatically create routes by folder structure. While this approach worked for my simple project, this approach seems like a powder keg when working with extensive front-end applications that have dozens of pages & sub-pages. Passing in params also seemed tedious even at the level I was doing it. Because of how Nuxt handles params, I had to actually name my files per name of the params. While it's possible there may be an easier way to do it, from the documentation I read, this seems like the standard for Nuxt.

Besides the minimal issues I ran into, It's nice to know that I now manage all of my portfolio from a single app in addition to Vercel offering support out of the box as well!

## Conclusion
While change can be something that is somewhat cumbersome to pick up on, it can help you in the long run. While updates to a portfolio probably doesn't seem to be too significant, having a place where employers see the little details about you and how you manage those are ways you can build on yourself professionally.

While you don't have to use Nuxt yourself, if you're looking to make a digital portfolio for yourself, you don't have to spend a pretty penny to do so. If you play your cards right, all you need is the right skills, and you can make one free of charge!
