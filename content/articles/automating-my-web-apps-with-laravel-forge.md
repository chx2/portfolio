---
title: Automating my web apps with Laravel Forge
description: Besides just my personal projects, I additionally work with third-parties for hosting of their web applications as well. With a large amount of these projects utilizing Laravel, I want to make the process of both hosting and maintaining my applications easy; cue the web app forge
slug: 'automating-my-web-apps-with-laravel-forge'
thumbnail: forge.png
createdAt: 11/21/2020
---

As my growing set of publicly available Laravel applications continues to grow, Hosting has become something of a hassle. Besides just my personal projects, I additionally work with third-parties for hosting of their web applications as well. With a large amount of these projects utilizing Laravel, I want to make the process of both hosting and maintaining my applications easy; cue the web app forge:

<img src="/images/blog/forge.png" alt="Forge" />

## What is Laravel Forge?

[Laravel Forge](https://forge.laravel.com/) is a web panel used to manage provisioning of Ubuntu servers to serve PHP applications. Forge automates the tasks often needed during a Laravel application deployment as well as installing all depdencies and/or tools needed to run an application.

<img src="/images/blog/forge-panel.png" alt="Forge Panel" />

Forge allows for the configuration of any PHP-based application and with some modifications to the build scripts for each of your apps, even Node.js or SPA applications as well!

<img src="/images/blog/forge-panel-2.png" alt="Forge Panel 2" />

## Why not use cPanel?

The magic behind forge is the automation of tasks you probably know how to do, but are tedious and annoying to take care of anytime you are working on a dedicated machine and/or VPS. Some tasks include:

- Setting up a web folder for new projects
- Creating a database
- Updated nginx.conf for domain/sub-domains
- Installing a SSL certificate
- Pulling in project repository
- Installing dependencies
- Figuring out if you did anything wrong up to this point

<img src="/images/blog/overload.jpeg" alt="Overload" />

Besides just these tasks, it has to be done manually, can be prone to user error, and grows significantly in complexity for adding something simple like hosting a WordPress project and/or automating updates from your project’s repository.

<img src="/images/blog/cpanel.png" alt="CPanel" />

You might be thinking, doesn’t my host’s cPanel fixes many of these issues? While partially true, there are issues that cPanel does not fix:

- Build scripts for individual projects, so you can combine Laravel and Node projects on the same box…. easily.
- Ability to install dependencies(Can do so if on dedicated, typically not so if shared)
- Dealing with messes when deleting projects.

Besides just these issues, keep in mind that cPanel is as old as I am(1996). While it has gone through updates over the years, using it feels ‘odd’ to me. While cPanel can be utilized to the same technical level of Forge, it’s pretty clear that the introduction of panel features such as ‘one-click installs’ means they’re trying to appeal to both technical individuals and those who do not have business running installations on a web server whatsover.

## How I use Forge

As a user of Forge myself. I originally was introduced by hosting one of my third-party affiliate through the [Vultr](https://www.vultr.com/?ref=8650840) hosting service. With their transition into using Laravel apps, I guided them(along with myself) through the process of integrating Forge with a hosting provider. While Forge does make it possible to use custom servers, I recommend using one of the default ones as they are all great options to choose from.

<img src="/images/blog/forge-panel-3.png" alt="Forge Panel 3" />

As seen in previous examples, Forge allows me to easily create the domains and Databases required, no tinkering needed for my Portfolio or Budget application!

For my Vue applications, even though it has nothing to do with PHP, it only takes a couple extra lines in the build script to take the spot as my main application! Since it’s also a GitHub repo, I can hook it up right away with NGINX as with other repos. Per the requirements of a [Vue application deployment](https://cli.vuejs.org/guide/deployment.html), I did need to update one line in my `nginx.conf` to look for the index.html inside the `/dist` folder once my application has been compiled:

``` 
location / {
    try_files $uri $uri/ /index.html;
}
```

Once I’ve done that, all I need to do is install dependencies & run the production build in my deployment script for forge, then boom, Vue app away!

``` 
cd /home/forge/chrish.me
git pull origin master
npm install
npm run build
( flock -w 10 9 || exit 1
    echo 'Restarting FPM...'; sudo -S service $FORGE_PHP_FPM reload ) 9>/tmp/fpmlock
```

## Why not use Forge?

While I’ve been pretty upbeat about Forge up to now, there are some valid considerations to consider not adopting Forge that many may not overlook.

Pricing for Forge may be somewhat excessive for those only looking to host personal projects. While you are more than free to sign up for Forge, the plans are rather pricy for personal applications if that is your only intetnion of using Forge. 

While I personally chose Vultr as my host, the cost of maintaining Forge actually costs about twice as much per month than my actual hosting does. However, if you’re like me and you host applications for others or plan to use this in an enterprise setting, Forge may be a more realistic option.

<img src="/images/blog/forge-plans.png" alt="Forge Plans" />

Another thing to consider is even if you’re at the enterprise level, Forge has since been overtaken by [Laravel Vapor](https://vapor.laravel.com/), a cloud hosting platform for Laravel apps that auto-scales apps & costs based on AWS instance usage. If you’re going to have to many servers in Forge to count, Vapor may be a better option for you.

## Conclusion

For those looking to simplify the process of hosting your web apps, big and small, shop around for tools that make life easier for you. Don’t feel like you have to settle with “this is what every webhost uses” jargon when you need something to simply take the stress out of things. Not everyone has the time to play `sysadmin` simulator whenever they push out a new project for themselves or a client. Make things easier, and if you’re me, be lazier by spinning up in Laravel Forge.
