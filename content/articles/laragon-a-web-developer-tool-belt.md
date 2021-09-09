---
title: Laragon. A web developer tool-belt.
description: When working as a web developer, you find out early on that constantly uploading your files to your production box or other live environment takes time. Because of this, like any other application you would develop, you begin looking for tools that allow for a local development environment.
slug: laragon-a-web-developer-tool-belt
thumbnail: env.jpeg
createdAt: 5/13/2020
---

<img src="/images/blog/laragon.png" alt="Laragon" />

When working as a web developer, you find out early on that constantly uploading your files to your production box or other live environment takes time. Because of this, like any other application you would develop, you begin looking for tools that allow for a local development environment. 

While setting up a development environment on a Linux-based system is easy, Windows is not necessarily an easy nut to crack if you’re working with a stack not relating to .NET. While Virtual Machines(VMs) and similar container solutions might be something you find over time, chances are when starting out you won’t have much knowledge about using these tools. Many find themselves using solutions such as WAMP and/or XAMPP instead for testing locally. Despite these tools often being bloated and hard to modify, they get the job done. The problem at this point however is once you get farther into your career, all those tools you installed begin putting weight down on your computer’s operating system(OS) to the point where development becomes a hassle.

## What is Laragon?

[Laragon](https://laragon.org/) is a web development environment for Windows. It provides support for most major web development frameworks/languages, is easily modifiable, and runs as a separate service orchestration making it very similar to using a VM or container virtualization product such as Docker.

<img src="/images/blog/laragonpanel-1.png" alt="Laragon Panel" />

Laragon’s purpose is to provide a simplified development environment on Windows that can be managed separately from the OS itself. By separating its resources from your system, you do not need to worry about adding packages or bricking your computer when developing high-performance web applications.

## How does Laragon work?

Similar to using tools such as a VM or docker instances, Laragon runs as a Windows service orchestration. This means it runs asynchronously and separate from the OS itself. Laragon partitions a small amount of memory to utilize whatever tools you initialized with it. Because of this, you remove the risk of tampering with your actual system files or bricking your computer while testing!

<img src="/images/blog/container.png" alt="Container" />

When creating new projects, Laragon automatically generates vanity URLs for you during testing(Which also includes SSL by default!)For example if you you were to create a project called ‘app’ you could access it via:
```
https://app.test/
```
Instead of 
```
http://localhost/app 
```

Because of this feature, you are also free to move your Laragon folder to anywhere you want.

In addition to being portable, you can also setup project presets. While Laragon comes bundled with common LAMP stack applications such as WordPress, Drupal, Laravel, and Symfony, you are free to alter the configuration file to add additional prestets! Presets are as simple as linking to a unzippable package, .git repo file, or a composer command. To test this out, I added a preset for Craft CMS that is written as shown below:
```
# Craft CMS
Craft CMS=composer create-project craftcms/craft %s 
```

## Why use Laragon?

<img src="/images/blog/lamp.png" alt="LAMP" />

When working with LAMP stack applications, you occasionally need to include additional tools into your application such as NGINX, Node, Redis, and many others. While it’s possible to import these into Xampp or Wamp environments, it can be somewhat difficult and also requires you to insert them into your regular system files.

When working with Laragon, you gain the benefit that a VM provides typically with isolating resources([Deleting resources](https://laragon.org/docs/disposable.html) is also far simpler than WAMPP or XAMPP makes it out to be). When setting up a VM however, sometimes it can be a little bit time-consuming setting up the OS, installing the required tools, and applying changes that Laragon does with [one click](https://laragon.org/docs/quick-add.html). While frameworks such a Laravel do have [solutions for this](https://laravel.com/docs/7.x/homestead), when reflecting back and considering what makes Laragon a good ‘tool-belt’ versus a singular tool, this is a especially desirable feature to have when working on LAMP stack projects.

While Laragon caters specifcally towards the LAMP stack, it provides additional support for several other languages/frameworks including:

- PHP
- Node.js
- Python
- Java
- Go
- Ruby

All of these can also utilize databases supported by Laragon:

- MySQL/MariaDB
- PostgreSQL
- MongoDB


Even if you don’t use of these tools, you can easily [extend Laragon](https://laragon.org/docs/easy-to-extend.html)!

## Prototyping with Laragon

When building prototypes, it can be helpful to get immediate feedback when working on a project. If you’re working at a company that has a staging environment, this means you need to pull off some git magic before anyone can have a publicly accessible version of your project. With Laragon however, you can skip this step entirely!

Laragon comes with [ngrock](https://ngrok.com/) by default, meaning you can share your project publicly and securely with anyone from your own computer! Using the [quick share feature](https://laragon.org/docs/quick-share.html), you can either generate a custom URL(Or QR code for mobile applications) straight to your project!

If you don’t need a flashy tool such as quick-share however, Git comes bundled by default; no worries!

## Does Laragon beat Vagrant/Docker solutions?

While Laragon does provide an excellent local environment for development, there are still reasons to consider Vagrant and other container software. The main reason why developers use these is to mimic production environments. While this step is not particularly necessary during development, the push to production can sometimes be a hassle if you haven’t accounted for whatever OS or features will be on the live box you are pushing to. 

<img src="/images/blog/dockvag.png" alt="Docker" />

While Laragon does its best to account for any packages and/or tools that will be thrown at you locally or in production, it still does not have the same possibilities as a virtual machine or container instance. If you are looking for a tool to build quick prototypes, planning to use Windows as your web server of choice, or you aren’t relying on tools specific to an OS distribution then Laragon is a great choice for a cross-platform development tool.

## Conclusion

In the spirit of [learning about new tools](/learning-new-technology), Laragon was a rather unexpected tool for me to find. In an attempt to learn more about setting up VM’s and Vagrant box images, I actually found [this post](https://www.reddit.com/r/PHP/comments/cqijzq/what_do_you_use_for_php_development_ive_been/) in which someone recommended Laragon.

If you are looking to migrate to Laragon from WAMP or XAMPP like I did, Laragon documentation has easy-to-follow tutorials on [moving your data to Laragon](https://laragon.org/download/migrate-from-wamp.html).

If you’ve been keeping up with my pasts few posts, even though many places around the world are beginning to open back up, keep in mind some of the words I’ve talked about over these last few weeks. Keep pushing yourself to try new things once you’re back in the work place again normally. Perhaps show off new skills you’ve learned when you get the chance!
