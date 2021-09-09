---
title: Tools to use in your Laravel projects
description: While Laravel already makes building applications in PHP a breeze, there are many tools that you might not be aware of when starting for the first time. From better coding habits to command-line tools, there are many additional tools you might not be aware about that will further improve your experience with using Laravel.
slug: built-in-tools-to-use-in-your-laravel-projects
thumbnail: laravelbg.png
createdAt: 8/11/2020
---

While Laravel already makes building applications in PHP a breeze, there are many tools that you might not be aware of when starting for the first time. From better coding habits to command-line tools, there are many additional tools you might not be aware about that will further improve your experience with using Laravel.

## Artisan 

While working in the MVC framework of Laravel, it can sometimes become tedious when navigating the entire laravel framework filesystem. Similarly, when considering migrations, it can be a hassle trying to run SQL migration files when setting up tables or migrating data to a production database. To save some extra headaches, Laravel comes bundled with a commandline interface known as [Artisan](https://laravel.com/docs/7.x/artisan#introduction).

To view a full list of commands, all you have to do in your project root is enter

> php artisan list

There are numerous commands that Artisan provides. Some of the most commonly used include:

- cache: Handle existing cache data
- db: Seed database with migration records or wipe existing ones
- make: Generate various application files
- migrate: Run database migration files

While there are many more included, you can additionally find out more about every command you are using further by adding help to your command statement. Consider an example when using the migrate command for the first time:

> php artisan help migrate

From hereon, use Artian to make things easier than Laravel is already!

## Eloquent

If you are familiar with the MVC development approach, you are likely familiar with ORM. ORM, or object-relational mapping, refers to mapping data types stored within a database to programmatic models in your application. Without using a ORM, mapping database data into your application models can be tricky when managing data integrity and relationships. Lucky for you when using Laravel, through the implementation of Eloquent, you will rarely find yourself writing SQL code within your application code!

<img src="/images/blog/database.png" alt="Database" />

The overall concept of [Eloquent](https://laravel.com/docs/7.x/eloquent) is rather simple. When creating models, a table is created specifically for that model in addition to relationship keys to other models when needed. The beauty of Eloquent shows itself when storing and viewing model data.

Besides the organizational benefits of this model, it opens the opportunity of further optimizing of your queries and object caching. Entire queries(Which can be written without any actual SQL fragments in your code) can be made to be highly concurrent in your application!

## Scaffolding

When building web applications, those who are accustomed to working on several projects may associate themselves with popular frameworks. From CSS frameworks such as Bootstrap to JavaScript ones such as React or Vue, Laravel comes [bundled with them all](https://laravel.com/docs/7.x/frontend)! 

<img src="/images/blog/vue-react.png" alt="Front End Frameworks" />

While Laravel does not dictate what frameworks you should use specifically, it provides starting points by including them into your project. Additionally, there are templates that you can generate that implement basic authentication for your web application!

In order to get started with some basic front-end scaffolding, you’ll need to run:

> composer require laravel/ui

From there, you have a varied selection of choice for your basic visual layouts!

``` 
// Generate basic scaffolding...
php artisan ui bootstrap
php artisan ui vue
php artisan ui react

// Generate login / registration scaffolding...
php artisan ui bootstrap --auth
php artisan ui vue --auth
php artisan ui react --auth
```

Once you have a selected framework bundled in, using [Laravel Mix](https://laravel.com/docs/7.x/mix) (which is available by default if you have node installed), you have a webpack preset for bundling your Javascript and CSS assets!

## HTTP Client

New as of Laravel 7, Laravel now comes in with a [built-in wrapper](https://laravel.com/docs/7.x/http-client) for making HTTP requests using the Guzzle HTTP library. Forget having to import a library and write out your headers painstakingly; the new HTTP library makes it super simple to write your application requests. Take this example from the documentation that show a basic post request using the new library:

``` 
$response = Http::post('http://test.com/users', [
    'name' => 'Steve',
    'role' => 'Network Administrator',
]);
```

From just 4 lines of code, we are:

1. Creating variable to store the request response
3. Supplying the payload url and data
3. Defining a POST action
4. Sending headers for `application/json` form(HTTP library does this by default)

It’s that easy! It makes everything else involving requests easy as well. Whether you need to supply authentication details or submitting raw form data, there are many helpful features when using the new HTTP library!

## Sanctum

Formerly known as “Airlock”, sanctum is an authentication system that servers as an alternative to Laravel Passport. Sanctum serves two primary purposes.

- Generates & stores user-specific API tokens in a singular table automatically generate when publishing the Sanctum package.
- Sanctum utilizes Laravel’s cookie based session authentication to allow for all the security capabilities with using Laravel normally. Additionally, it opens the possibility to use API’s both within the same application or an entirely different repo (Such as a separate Vue project).

While Laravel already offers simliar authentication via Passport, sanctum is designed specifically for those looking to bypass the use of Oauth. This feature can be very helpful for smaller scale single page applications(SPA).

While building an enterprise application may be more suited to using Passport, if you’re looking to build a smaller scale or standalone SPA with Laravel, consider giving Sanctum a try!

## Collections

PHP arrays have a [very bizarre and unpredictable behavior](https://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design#arrays) to them; luckily, Laravel has a solution for this. Collections are basically this same wacky structure, but with API wrapping to make them less trouble. Considering how Laravel also utilizes the collection approach with database models, you can think of our earlier discussion about Eloquent as a perfect example of what you can do with collections.

An easy example would be a sort for unique values shown below:

```php 
$array= [
  ["id"=>1,"name"=>"Hello"],
  ["id"=>2,"name"=>"There"],
  ["id"=>1,"name"=>"Hello"],
  ["id"=>1,"name"=>"Hello"],
];
```

Instead of trying to figure out whatever spaghetti is needed to solve this normally, all we need to do is run it through collection methods:

```php 
$result = collect($array)->unique("id");
```

The result of the modified collection(array) would be the following:

```php 
 Array
(
    [0] => Array
        (
            [id] => 1
            [name] => Hello
        )

    [1] => Array
        (
            [id] => 2
            [name] => There
        )

)
```

If you’re looking for a better way of managing data within your Laravel application, consider adopting collections, and the [methods](https://laravel.com/docs/7.x/collections#available-methods) they provide!

## Carbon

Working with time or date units can sometimes be tricky. Between storing time values between different formats in whatever database solution you are using, it can be frustrating at times try to find the right way to convert between units. Luckily for you, Laravel comes bundled with the [Carbon DateTime library](https://carbon.nesbot.com/docs/). This library not only makes conversions, it can generate query statements that would otherwise be difficult to write. For example, say we have a data object that we want the records from this week. Instead of remembering WEEKOFYEAR() SQL functions, we can make it simple:

> Data::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->get();

Carbon has an [extensive library](https://carbon.nesbot.com/docs/) for making handling of dates far simpler!

## PHPUnit

<img src="/images/blog/phpunit.png" alt="PHPUnit" />

If you’re not familiar with implementing unit testing, implementing testing within your application allows for better control for quality assurance to ensure functionality between components of your application. Without unit testing, it can be difficult for anyone who’s not the developer themselves to test application components. Since Laravel covers all areas of application development, it comes integrated by default!

From here, you can run your test cases and setup assertions as you need them! If you’re looking for the Laravel approach to TDD(Test-Driven-Development), you can check out Adam Wathan’s 2016 Laravel talk about TDD with Laravel:

<iframe width="560" height="315" src="https://www.youtube.com/embed/MdApmmK71WM?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Telescope

If you’re the kind of person that lives by the theme of your IDE of choice, then are probably accustomed to incorporating visuals into your development process. While it’s nice that things such as Chrome Dev tools can provide feedback on errors, it’s not tailored to Laravel specifically. Since your Laravel application has the opportunity to grow complex in addition, having visual feedback for the whole application can be a lifesaver when looking for hard-to-find bugs. This is where [Laravel Telescope](https://laravel.com/docs/7.x/telescope#data-pruning) comes in.

<img src="/images/blog/telescope.png" alt="Laravel Telescope" />

Telescope essentially provides a visual representation of your application components. While optimal for a development environment, you can additionally setup up guards for the route on a production site. 

## Conclusion

While I brought up a considerable number of the features available in Laravel, there are countless more including community packages that extend the functionality of Laravel.

<img src="/images/blog/postman.png" alt="Postman" />

While it is not a feature limited to Laravel, I highly recommend looking Postman if you’re looking into some of the SPA building features I mentioned. Postman is an API client that can provide significant help in creating & testing API endpoints as you are building your application!

While many of the tools listed in this article are personal favorites of mine, remember that the ecosystem of Laravel is vast. There are many tools both within the framework and from the community that can significantly improve your experience of working with Laravel. Whether you are looking to build a small or enterprise-level application with Laravel, the sky is the limit! Make sure to read the [documentation](https://laravel.com/docs/7.x) to stay up-to-date with the most recent changes!
