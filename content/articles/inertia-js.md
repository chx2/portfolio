---
title: I built an app using Inertia.js
description: While Laravel 8 comes with many updates to the existing framework, one thing that this update brings is a brand new tool built using the new features of 8. This tool, Jetstream, can be considered in many ways, to be the final evolution of UI scaffolding for Laravel.
slug: 'inertia-js'
thumbnail: 'inertia-js.png'
createdAt: 10/26/2020
---

With the recent shoutout that I gave involving [Laravel Jetstream](/laravel-jetstream), I found myself curious about one of the tools included with Jetstream. Inertia.js, a library focused on creating SPA apps, allows for a interesting scenario:

> Inertia.js lets you quickly build modern single-page React, Vue and Svelte apps using classic server-side routing and controllers.

Essentially, the idea of Inertia is to allow for a more monolithic type approach for building a single page applications(SPA). My curiosity for the project, in combination with my recent acquisition of a house alongside my fiancée, I found myself wanting a budget app; what better way to get the ball rolling!

How does Inertia.js work?

<img src="/images/blog/inertia-js.png" alt="Inertia" />

In many ways, I would consider Inertia as the first step a company might make towards encouraging developers to think in the SPA mindset. With Inertia, many of the more complex features of the application remain on the server side. Functionality such as routing, controllers, middleware, authentication, and data fetching remain on the server.

## Why use Inertia.js?

If you’re someone who’s full-stack or just server-oriented in general, you know idea of resource controllers & ORMs already. If you’re going to be building a project either by yourself or a few other like-minded people, it may seem like a hassle going the typical SPA route.

When working with SPA’s & a backend such as Laravel, you need to build out several features in your SPA app that in the past were normally attended to by your web server framework:

- Routing
- Authentication
- API Handling

Besides these, you also have to build an extensive API on the server-side to account for this new application. While this approach may be required for a large application, most medium to small sized projects often will implement basic CRUD API’s and in countless scenarios, it will often feel like unnecessary work for this sake of making the ‘cool new approach’ feasible.

## My experience using Inertia.js

In order to get my feet wet in Inertia, I had to come up with an application idea of some sort. Luckily, I recently bought a house! There’s been quite an influx of expenses, therefore, leading me to create Budget.io, an application based on, you guessed it, budgets!

<img src="/images/blog/budget.png" alt="Budget" />

When building Budget.io, I was actually inspired by a course my fiancée and I took during our mortgage application process on [Framework](https://www.frameworkhomeownership.org/). While this course was pretty straight foward(And actually saved us money by taking it), there was an interesting feature within the application. Under some of the budgeting sections, there were actually editable budget PDFs that both allowed the easy incomes/expenses and calculating totals.

After finding inspiration in cool-looking PDF files, I laid out three things I wanted my application to accomplish:

- Create a panel to add budgets, then subsequently add incomes/expenses to each.
- Allow users to generate PDF reports based on either/or incomes and expenses in a easier to understand PDF version of the budgets page.
- Allow users to compare budgets via line chart to determine their overall performance between budgets.

With my ideas fleshed out into some super basic concepts, I began a somewhat on-off project to make this idea a reality!

## Budgets

When defining my Budget model, I wrote some super-basic fields to account for information I felt a budget may contain, in addition to the logical aspects of storing in within Budget.io:

``` 
Schema::create('budgets', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->text('name');
    $table->integer('user_id');
    $table->timestamp('start_date');
    $table->timestamp('end_date');
    $table->softDeletes();
    $table->timestamps();
});
```

- `ID` represents the primary key of the model
- `name` represents, well, the name of the budget
- `user_id` represents the ID of the user who created the budget
- `start_date` and `end_date` represent the date range the user specifies the budget for
- `softDeletes()` and `timestamps()` are used to generate update columns & support for soft deletion of the model

When displaying the form, only three of the fields require attention since things such as updated columns, ids, and timestamps are autocompleted within the application code. In terms of how Inertia swaps between the various resource methods, the resource routes are structured accoridng to [Laravel Resource Controller standards](https://laravel.com/docs/8.x/controllers#resource-controllers):

> Route::resource('budgets', BudgetController::class)->middleware('auth');

Besides the basic [Eloquent ORM CRUD](https://laravel.com/docs/8.x/eloquent) involved with handling resources, we can return JSON response that contain update information for Inertia to switch component views:

``` 
/**
 * Show the form for creating a new resource.
 *
 * @return \Inertia\Response
 */
public function create()
{
    return Inertia::render('Budgets/Create', [
        'auth_url' => 'logout'
    ]);
}
```

The response results in the same page layout, but an updated body component:

<img src="/images/blog/budget-screen.png" alt="Budget Screen" />

Once a budget has been created, the user can then use a page in which incomes/expenses are setup similarly in terms of field names:

``` 
$table->integer('budget_id');
$table->text('source');
$table->decimal('amount');
$table->longText('notes')->nullable();
$table->timestamps();
```

- `budget_id` refers to the budget the income/expense is a part of
- `source` refers to a name/description of the income/expense
- `amount` refers to the monetary amount
- `notes` refers to notes on the entry

The income/expense forms are setup similarily to the budget form. Once either has been created, it is added to the main page of the budget:

<img src="/images/blog/income-screen.png" alt="Income Screen" />

As more incomes/expenses are adding to the individual budget, the results at the bottom will display the current ledger:

<img src="/images/blog/total-screen.png" alt="Total Screen" />

## Reports

Once a budget or two has been created, users can then select a budget and view reports by either/or incomes/expenses:

<img src="/images/blog/budget-report.png" alt="Budget Report" />

Since this required an [external library](https://github.com/niklasravnsborg/laravel-pdf) to pull off, I had to get a bit creative since reports are not actually saved, rather they are generated on the spot. I split the viewing of the form into a resource controller, then made a custom route for viewing the generated PDF:

``` 
Route::resource('reports', ReportController::class)->middleware('auth');
Route::get('/export', [ReportController::class, 'show'])->middleware('auth');
```

## Stats

While the concept of stats is simple, it was a pain to work with. Since stats are generated live just like reports, I had to figure out how my resource controller would fit into the picture. I had intially pondered the idea of putting the form selecting for budgets on a separate page, but I wanted the stats to have the traditional SPA feel, the feel that all things on the page are seemlessly going together. To accomplish this, I simply made a single view, which came attached with all of a user’s budgets including all incomes/expenses tied to each:

``` 
$budgets = Budget::where('user_id', Auth::id())->get();

//We need to get the incomes/expenses attached to each budget
$ids = $budgets->pluck('id')->toArray();
$incomes = Income::whereIn('budget_id', $ids)->get();
$expenses = Expense::whereIn('budget_id', $ids)->get();
return Inertia::render('Stats/Index', [
    'budgets' => $budgets,
    'incomes' => $incomes,
    'expenses' => $expenses,
    'auth_url' => 'logout'
]);
```

While this does translate to some IN() queries(Which are not very [performance effective](https://decipherinfosys.wordpress.com/2007/01/30/in-vs-exists/)), the overall impact should be very minimal unless a user has thousands of budgets with tens of thousands of entries per budget.

After the data is passed through, once users select the budgets they wish to add, the chart magic takes off from there:

<img src="/images/blog/chart.png" alt="Chart" />

## Reflection

Overall, the development experience through Inertia was an interesting task. Inertia made the actual process of making the ‘api’ relatively simple and made the authentication, often one of the hardest parts of an SPA to work on, was actually relatively easy to make.

In all honesty, most of my project was spent towards libraries I have not tried before such as [day.js](https://day.js.org/), [chart.js](https://vue-chartjs.org/), and [vue-meta](https://vue-meta.nuxtjs.org/). While my work involved full-stack development, the emphasis of the majority of my time working within Inertia focused towards the front-end, as would making a regular a SPA would be like. 

Because of its use of Laravel-based routing and authentication, I found two of what I often find to be the most difficult components of building SPA’s a breeze with Inertia. With the increasing improvements of Laravel Sanctum however, this point is becoming somewhat moot. Nevertheless, if you’re coming from an older background in web-development, the ease of development that Sanctum provides is not something you should overlook.

## Why not use Inertia.js?

While Inertia.js might have some unique features & prides itself as a first step into SPA applications, there are many SPA benefits that you are trading in due to the architecture.

## Offline Support

Since calling actual Interial views still requires a server response, Inertia makes the idea of offline support rather difficult to implement. Since Inertia continues requiring the server return Javascript/JSON for each request, implementing such a state in Inertia would be very counterproductive in how it expects you to structure your application.

## API Creation

While the idea of having your back-end API ‘just work’, many front-end developers would argue that this cancels out benefits brought on by tools such as GraphQL. While it may be easier to create an API in Inertia, in many cases, an API is expected to be robust; cutting corners for simplicity will not always cut it. This is especially true for applications that have a public API beyond what the visual application itself supports.

## Separation of development

As much work as it seems that SPA applications bring to a full-stack application, this is often the case simply because you can develop components separately . If you’re going to be involved in a project with someone besides yourself, having the application broken into multiple, free-standing parts that can be tested separately is a fantastic development approach when building more complex applications. While this isn’t the case for every application, one of the single greatest pros of using Inertia.js can be considered invalid if you have a large enough team working on a specific application at once. While Inertia.js keeps everything together, sometimes, it is better to split a project up into segments.

## Conclusion

While I don’t see Inertia as a tool that will power Fortune 500 companies decades into the future, I see it content with serving many existing to small/medium sized projects for the forseeable future. Since it grabbed a spot being built into [Laravel Jetstream](https://blog.chrish.me/laravel-jetstream/), I don’t see Inertia leaving the Laravel development space anytime soon. Inertia.js is a fantastic tool for those who either want to get their feet wet in Vue, or want to make things easy for a change 😁

If you’re interested in what this looks like, you can check it out for yourself! You can check out the [GitHub repo](https://github.com/chx2/Budget.io) as of now. Feel free to start a [pull request](https://github.com/chx2/Budget.io/pulls) or report any [issues](https://github.com/chx2/Budget.io/issues) you find! I have some [temporary project goals](https://github.com/chx2/Budget.io/projects) setup, and the project will be receiving an initial cycle of updates!
