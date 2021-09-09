---
title: Laravel Jetstream, last stop for Laravel UI
description: While Laravel 8 comes with many updates to the existing framework, one thing that this update brings is a brand new tool built using the new features of 8. This tool, Jetstream, can be considered in many ways, to be the final evolution of UI scaffolding for Laravel.
slug: 'laravel-jetstream'
thumbnail: scaffolds.jpg
createdAt: 9/24/2020
---

If you’ve missed some recent news, [Laravel 8](https://laravel.com/docs/8.x/releases) is finally out! If it seems to have arrived sooner than you’re used to for a major Laravel release, it’s because of the [recent changes](https://laravel-news.com/laravel-releases) to the Laravel development cycle. It is to be expected in future versions that major releases will come and go very quickly.

While Laravel 8 comes with many updates to the existing framework, one thing that this update brings is a brand new tool built using the new features of 8. This tool, Jetstream, can be considered in many ways, to be the final evolution of UI scaffolding for Laravel.

## What is Jetstream?

Similar to other standalone systems introduced with major releases, Jetstream is a Laravel application built to exemplify the features introduced with Laravel 8. Besides just the features of 8, there are other aspects about Jetstream that are shown to reflect how developers can be using Laravel:

- Developers can now have scaffolding using a front-end JS framework that’s actually SPA(Single Page Application) out-of-the-box.
- Features that are often incorported into modern applications are supported via the framework-provided packages by default.
- The framework is embracing modern packages/tools and is giving developers ways to better their skills and the applications they build.

<img src="/images/blog/jetstream.png" alt="Jetstream" />

It is definitely reassuring among other changes with Laravel 8 that it seems like Taylor Otwell & the team are pushing Laravel into the future. In order for such a framework to maintain relevance into the future it must provide developers with the tools they need, regardless of the shortcomings due to the language they are built in.

## What does Jetstream have to do with Laravel UI?

Introduced with Laravel 7, the `laravel/ui` package provided an easy way for developers to include scaffolding presets such as Bootstrap, Vue, and React. It was a big step forward to include these commonly use tools bundled in by default!

<img src="/images/blog/scaffolding.jpg" alt="Scaffolding" />

With this new release of Laravel however, Jetstream not only does the same, it also bundles in many of the common attributes most applications will always start with. While every feature of your application probably isn’t included, Jetstream takes a huge step foward with the approach that most developers do with these scaffolding options; creating single page applications.

## What features come with Jetstream?

### Stack of your choice

While the choices are reduced down to two for Jetstream, they are both unique yet effective approaches to building single page applications:

<img src="/images/blog/livewire.jpg" alt="Livewire" />

The first option to decide from is Livewire. [Livewire](https://laravel-livewire.com/) is an interesting option to look into if you’re not a Javscript savant. Instead of worrying about importing an entire front-end framework, Livewire allows you to write regular blade templates that include both non-reactive and reactive components. This means, similarly to how you might create a dynamic component in Vue that sends a query to retrieve data from the back-end, Livewire allows you to do so without writing anything outside of server-side PHP!

<img src="/images/blog/inertia.png" alt="Inertia" />

The second option, for those more savvy in Javascript, is using the approach of Inertia.js. [Intertia.js](https://inertiajs.com/) is the approach you can relate most to how you’re probably doing so already, having the Laravel side handle logic then a standalone Vue front-end application. The difference that Inertia renders your front-end application server-side, allowing for the server to handle things such as routing, middleware, and data requests to the server.

With the growing complexity of front-end applications in modern development, tools such as this are especially helpful to assist front-end developers who should more or less be designers than handling development logic(Feel free to disagree, personal opinion). This is also a helpful when you are wanting your existing multi-page application to upgrade without a complete restructure of architecture. As stated by the creators of Inertia themselves:

> Inertia is a new approach to building classic server-driven web apps. We call it the modern monolith.

### Account management & security

Building off of existing migrations within Laravel, Jetstream comes bundled with features that are super-common among most applications built. Besides just the basic authentication pages(which are now all SPA-based and using Laravel Sanctum), you get all of these things included:

<img src="/images/blog/admin.png" alt="Admin" />

Nothing much else to say other than all of this is based on a barebones installation I did of Jetstream!

### API Management & Teams

Since Jetstream is based on [Laravel Sanctum](https://laravel.com/docs/8.x/sanctum) for authentication, tokens are the blood flowing through Jetstream. Want third party integration access for reading and creating actions only? No problem, there’s a built-in panel for that:

<img src="/images/blog/admin-1.png" alt="Admin" />

Besides API’s, you can also manage roles with a built-in panel for that as well! Similiar to other existing tools like Laravel Vapor, you can build teams, create roles, and sort out one of the often overlooked, yet complex parts of your application.

<img src="/images/blog/admin-2.png" alt="Admin" />

While you might be able to make the argument that these features are very opinionted, scaffolding is meant for quick-starts, not ground-up builds. If you’re struggling to start an app and want to account for the basics when building modern applications, Jetstream throws all of this in the pot without any additional steps!

## Conclusion

With the changes brought via Jetstream, it does not appear that the `laravel/ui` package will be continued to be maintained beyond Laravel 7. While it was a step in the right direction at the time, the world of application development, especially [PHP](https://www.php.net/archive/2020.php), is changing at a fast rate. As many(including myself) always hope for, is that change will be something that is for the better.
