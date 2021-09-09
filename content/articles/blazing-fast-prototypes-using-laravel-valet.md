---
title: Blazing fast prototypes using Laravel Valet
description: Valet is a Laravel development environment for Mac minimalists. No Vagrant, no /etc/hosts file. You can even share your sites publicly using local tunnels. Yeah, I like it too.
slug: blazing-fast-prototypes-using-laravel-valet
thumbnail: lara.png
createdAt: 6/5/2020
---

After going through a transition into a new job, I’ve been put to the test to develop on a new operating system, work within a large team, and continue to hold to my core values when developing web applications. With most of my current work revolving around a Laravel + Vue stack, I had to find an environment that would aid me in prototyping when developing new features or fixing bugs. Since I’m new to developing on a Mac, all my Windows tools I’ve used up to now are basically out the window. Since then, I decided to learn more about [Laravel Valet](https://laravel.com/docs/7.x/valet).

## What is Valet?

As described in the documentation:

> Valet is a Laravel development environment for Mac minimalists. No Vagrant, no /etc/hosts file. You can even share your sites publicly using local tunnels. Yeah, we like it too.

When working with Valet, several configuration points that you normally have to do manually are done for you:

- Utilizing Homebrew, dependencies such as different PHP versions, MySQL, or other project tools can be mounted/unmounted with a single command
- After installing composer and globally requiring Valet, all you need to do for the installation of Valet is run the command `valet install`
- Once installed, you can ‘park’ a directory, meaning any new projects you add to that folder will automatically become working links(Optional SSL encryption included) using `valet park`
- Valet runs on startup, this means unless you want to ‘park’ another directory or link a project from a specific location, you don’t have to mess with Valet ever again
- Valet comes built-in with ngrock, meaning you can share your website publicly by simply typing `valet share` in your project’s directory
- Running Valet rounds out to about 7mb of memory consumption total

## How does Valet work?

While there are many features that come with Valet, using any given one is rather easy. Here’s an easy-to-follow video that got me up to speed. Warning, it’s a little over-the-top in terms of language to describe using Valet:

<iframe width="560" height="315" src="https://www.youtube.com/embed/H3Z4Gk9Wc0s?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Why not use Homestead?

While Homestead is a great environment for development, it’s not without flaws. The most annoying parts I found about Homestead is simply trying to get started.

When you install Homestead for the first time, you’re going to need:

1. Virtual Box or simliar VM software
2. Vagrant
3. Homestead Vagrant Box
4. Homestead repo(Inside your new Vagrant box)

From here, you then have to generate a Homestead.yaml file on your actual machine that will map site links to the location of your code, plus everything you want to configure…

```
folders:
    - map: ~/code/project1
      to: /home/vagrant/project1
```

***Now you need to reload your Vagrant box… but wait… What if you’re mapping a second project?***

``` 
folders:
    - map: ~/code/project1
      to: /home/vagrant/project1

    - map: ~/code/project2
      to: /home/vagrant/project2
```

***Now reload again…***

<img src="/images/blog/sigh.gif" alt="Sigh" />

…Well, it runs, albeit stuff like NPM not very quickly, but it works. After spending an hour setting up, you can finally start working. Tomorrow it will only take 10 minutes since you will only have to boot up the VM and Vagrant every time you want to start for the day!

After going through this process, how much time difference is noticeable between managing the development environment between Homestead and Valet now? While Homestead may give a sense of safety running a virtual machine, it still doesn’t stack up to the use of Homebrew with Valet. 

<img src="/images/blog/homebrew.png" alt="Homebrew" />

***Worried you installed the wrong version of something in Valet?***

`brew uninstall <package>`

`brew install <package>`

***Don’t remember what you installed?***

Homebrew has a `Cellar` directory where everything you install with it is stored

***Did you royally mess up the installation of Valet?***

`valet uninstall --force` then `valet install`

While I’m not trying to force you to switch from Homestead if you love using it, I mainly bring up these focus points to highlight what you might want to consider when looking for a tool to ‘prototype’. While prototyping may not always prepare you for every nuance when it comes to a production environment, chances are you’ll go far without having to match the OS of the production server when working with many of the features within Laravel.

## Why not use Docker?

<img src="/images/blog/docker.png" alt="Docker" />

While I don’t have highly extensive knowledge on Docker, I’ll keep what I’ve observed to a minimum. Docker appears to be really good for running applications through containers that can be configured for any environment. This is a wonderful benefit for pipeline testing and making portable environments.

I don’t believe speed associated with building prototypes is a core focus of Docker. While I hear all the time about people developing within it, I have a hard time believing the speed of a Docker container could ever outperform an application similarly on Valet.

Docker is a great solution when looking towards your final product on a production server, but again, we’re talking prototypes here. And when you’re coming up with new ideas or don’t need to tap into OS-specific features, Valet will work just fine.

## When to not use Valet?

While I’ve been giving Valet high praise, it’s not a perfect tool. Unfortunately, Valet is only available on Mac. Sorry Windows users, it’s Homestead for you, but you could also try [Laragon](https://blog.chrish.me/laragon-a-web-developer-tool-belt/).

Since Valet is not a virtual environment, dependencies will be on your local machine. If this is scary to you, then Valet may not be the best choice for you as well. This is especially true considering you will likely need to keep your system up-to-date regularly.

Finally, as I stated with Docker, Valet is a prototyping tool. If you’re testing for a specific environment(ex. production server), you are better off using a tool such as Docker. Valet is good for the local stuff, not the ‘I need this everywhere’ stuff.

## Conclusion

Laravel Valet is a unique tool for those working on a Mac. It provides in my opinion the best local development setting for Laravel. While it may not fit every development use case, it’s a great way to get your ideas up and running quickly. Give it a shot; [Taylor Otwell himself would say the same](https://medium.com/@taylorotwell/how-i-work-october-2018-edition-e66a09931e7f#2841)!
