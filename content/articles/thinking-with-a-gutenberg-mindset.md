---
title: Thinking with a Gutenberg Mindset
description: From its conception back in early 2003, WordPress has grown to become the most recognized name in content management systems.
slug: thinking-with-a-gutenberg-mindset
thumbnail: wordpress.jpeg
createdAt: 3/27/2020
---

# Introduction
From its conception back in early 2003, WordPress has grown to become the most recognized name in content management systems. One of the biggest appeal points of WordPress is focus towards users, not developers. The goal of the WordPress experience is to make everything from the content to the extensions controlled by the user regardless of technical background. Despite this ideology, due to the nature of web technology, many aspects of WordPress still required developer intervention for years.

When reflecting back on my past year or so of writing WordPress themes, the reasoning was simple. The point of a custom theme was for the developer to build the complex views that the client wants. The client’s desire for a developer might stem either from convenience or the inability to do it themselves through something like SquareSpace or Wix. Once the developer has created the design, they insert the following code into their theme templates that grabs WordPress editor content:

```php 
<?php the_content(); ?> 
```

Wherever this tag is placed, the user would then get to place whatever content they desired. While this process keeps things simple, in many ways it is limiting. WordPress used a basic WYSIWYG editor that is very comparable to something such as Microsoft Word. However, how can such a simple editor really conform with the idea of truly making the content of a website custom? Sure, you can put HTML in the WordPress editor, but that contradicts the idea of making WordPress for a user versus a developer. 

## How Gutenberg flows

Compared to the old WYSIWYG editor, Gutenberg is a different take on content creation. It is in many ways like tools such as Wix, Square Space, and preexisting page builders for WordPress. Based entirely on ‘blocks'([Funny, I’ve heard this before](https://www.drupal.org/docs/8/core/modules/block/overview)), content can be adjusted from content to custom layouts. There is plenty of tools out there that introduce [additional blocks](https://www.ultimategutenberg.com/) or the ability to [create your own](https://getblocklab.com/).

<img src="/images/blog/gutenberg.png" alt="Gutenberg Logo" />

Because of this new editing mindset, it is now possible for the layout and the content to be modified from the same place. Before Gutenberg, without a page builder, achieving such visuals relied solely on cramming HTML into a content block.

Funny enough, this block you are reading now is an example of combining content creation in addition to the built-in column system within Gutenberg. The Go WordPress theme basically sets up the content area of the website as a blank slate. Everything from that point on is solely based on how you utilize Gutenberg content within.

## Why do some hate Gutenberg? 
Coming from an agency that relies heavily on WordPress development, I understand where the frustration lies. Chances are if you ask a seasoned WordPress developer, you will find frustration in the new editing mindset. As much as the idea of the client being able to affect layout sounds nice to the client or maybe you as well, it is often not considered to be the responsibility of the client for something such as that. If a client is paying an agency to manage the site, why is it their responsibility? 

<img src="/images/blog/frustration.jpeg" alt="Frustrated Man" />

Besides the mindset being new to some, the introduction of Gutenberg was not perfect. It was very common early on to run across bugs. In some cases, depending on how your WordPress site’s theme was built, upgrading to 5.0+ would break all of your content. While it’s easy to fix this via the [Classic Editor Plugin](https://wordpress.org/plugins/classic-editor/)(Which has become one of the most downloaded WordPress plugins since WordPress 5), those without knowledge of what was happening led to frustrations around release time. 

## If Gutenberg exists, are Digital firms dead? 

I would say far from the contrary, in many ways Gutenberg can help drive the need for digital firms. Despite the abilities Gutenberg now grants the user, chances are many will still favor towards an experienced firm/developer to handle their website.

<img src="/images/blog/wordpress.jpeg" alt="Gutenberg" />

People who often seek help from digital firms are not savvy with web technology to an expert level. They are seeking help from a firm to help create well-crafted solutions to conserve time spent and create a better end product. In many ways it is the same as if you were planning to hire a plumber or electrician. Could you fix your plumbing and wiring yourself? Yes, you could, given the time to learn how to do so if you are unfamiliar with either. Most people however don’t have such time to dedicate to handling these tasks. Picking the path of a trained professional saves time spent as well as improves quality and safety. The same goes for websites as working with a digital firm can help you with aspects of design as well as other areas such as SEO, ADA & GDPR compliance, and analytics.

## How do I survive in the Gutenberg age?

There are three important concepts to consider when trying to keep relevant in the age of Gutenberg:

***Build responsive themes***: If you aren’t doing so already, you need to! It is still up to the theme developer for details such as theme customization and base colors schemes. It is also the developer’s responsibility to ensure the website will look good across all screen resolutions.

***Reduce your plugins***: You would be surprised how many features such as widgets and galleries are covered within Gutenberg. Consider ditching the 4-5 gallery plugins you might have installed. You can even start writing your own blocks!

***Consult with your clients***: Keep them up-to-date with the recent changes of WordPress. Talk with them about how they would like to be involved in the website. Be there to diligently answer questions as needed. Whether they need you to utilize the editor or not, it is almost a guarantee that providing support for your clients will lead to long-term relationships with them!

Even if you don’t think it will work well in your firm, consider giving Gutenberg try the next opportunity you get to build a theme from scratch. It’s always worth taking a shot at trying something new.
