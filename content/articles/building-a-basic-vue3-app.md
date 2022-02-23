---
title: Building a basic trivia app in Vue 3
description: With the recent transition of Vue into its third major version, I decided to dive deeper into the syntax of the new composition API to determine the best(and possibly the worst) of the recent changes to Vue.
slug: building-a-vue3-trivia-app
thumbnail: ponder.png
createdAt: 2/21/2022
---

After the recent announcements made at the Vue Nation 2022 conference, there were 
about as many questions I had about the coming changes with Vue 3 as features included within. New syntax, development server, and store library were among some of the most significant changes that are being introduced into the Vue environment.

I decided the best way to tackle some of these newer items going forward is building a more personalized app as using the new Composition API at work will not be very practical for quite some time. I decided to revisit a concept I thought about in the past, which simply involved making a basic trivia app that thrives off of user contributions to make unique trivia everytime you take it.
In addition to Vue 3, I decided to tackle [Supabase](https://supabase.com/) along the way as I've mentioned this tool to colleagues before, but never had a concrete example to show. As I dive into the development of the application and my overall opinions on the technology I used, here's what to expect:

- [Vue 3(Composition API syntax only)](https://vuejs.org/api/sfc-script-setup.html#script-setup)
- [Vue Router 4](https://router.vuejs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [sweetalert2](https://sweetalert2.github.io/)
- [Pinia](https://pinia.vuejs.org/)

While I have a lot of technologies listed, I only plan on discussing Vue 3 and Supabase primarily. I have provided links to each of these technologies if you're interested in checking them out yourself!

## Supabase
While I wanted to add a functional part to my trivia application, I didn't want to go through the hassle of creating the back-end of the application let alone pay for hosting 
for side projects going forward. While I could eventually build out authentication, my main worry was having a basic database for storing trivia information. After thinking through some of my options, I decided to give [Supabase](https://supabase.com/) a try.

Supabase advertises itself as an alternative to [Google Firebase](https://firebase.google.com/). Supabase offer many of the same features Firebase has such as Database storage, file storage, authentication, built-in server functions and real-time capabilities.
One key feature difference as well was the fact that Supabase uses Postgres, which is a relational database alternative to Firebase which is structured more as a NoSQL option.

In addition to having pretty much the same features as Firebase, the [pricing](https://supabase.com/pricing) model directly targets some of the biggest expense areas when running a firebase application:

<img src="/images/blog/supabase.png" alt="Supabase Pricing" />

One area of pricing that caught my eye was API requests. While Firebase charges API requests at a specific number made, Supabase(within reason) does not charge at all. This alone is one of the most significant price points
I often hear colleagues complain about when running their Firebase apps. Since requests are unlimited and most of the features are available in a free plan, Supabase gives me access to basically a carbon copy of Firebase for no charge, even when scaling up for quite some time!


### Supabase Functions
Since we're going for a mostly serverless app, most details such as authentication and data retrieve are baked right into Supabase.
With this approach in place, we can build the front end similarly to how one might typically build a headless app, except the 'body' of this app is already pretty much setup!

There are occasional reasons to insist on having some backend capacities even in this setting. While this application is not doing anything too fancy yet, one feature I wanted to implement on the trivia page was to randomize questions.
It would get pretty boring if every time someone wanted trivia questions, they were fed the same questions, in the same order, over and over again. This pattern
would be something users would pick up on very quickly and lose interest in the app almost immediately. Luckily, Supabase's support for real-time operations allows for both table listeners and
the ability to create [postgres functions](https://www.tutorialspoint.com/postgresql/postgresql_functions.htm) directly on your tables. In this following instance, based off a number of questions the user wants, the category, and difficulty, I want to factor in the arguments for the data selection while ensure the items returned are always unique:
``` 
create or replace function get_questions(questions int, category int, lvl int)
    returns setof "Questions"
as $$
begin
    if category > 0 then
        return query
            select * from public."Questions"
            where verified = true
              and category_id = category
              and difficulty <= lvl
            order by random()
            limit questions;
    else
        return query
            select * from public."Questions"
            where verified = true
              and difficulty <= lvl
            order by random()
            limit questions;
    end if;
end;
$$ language plpgsql;
```
With this function setup, we can then use Supabase's [RPC](https://supabase.com/docs/reference/javascript/rpc) functionality to make a request directly to this database function:
```
async getRandomQuestions(numberQuestions, categoryId, difficulty) {
    try {
        let { data, error, status } = await supabase.rpc('get_questions', {
            questions: numberQuestions,
            category: categoryId,
            lvl: difficulty
        })
    
        if (error && status !== 200) throw error
    
        if (data.length === 0) {
            await Swal.fire({
                icon: 'warning',
                text: 'No questions were found. Please try a broader search range.',
            })
        }
    
        this.questions = data
    } catch (error) {
        await Swal.fire({
            icon: 'error',
            text: 'Error fetching Questions. Please try again later.',
        })
    }
},
```

After implementing this function, that's pretty much it! Everything about the app going forward that isn't already baked in can easily make use of this approach to add logic as needed.
## Thoughts on Vue 3
The never-ending question that seem to plague front-end applications in general and every other JS framework is the increasing complexity of front-end applications. Business logic is nothing new to keeping within these applications, but the extent of this logic
has grown ten-fold as applications on the frontend have been at the point of running on their own as well as being maintained by dedicated teams of front-end developers.

While I feel like the steps taken in the composition API are to drive the importance of the location of business logic,
I feel like it is a step in a direction away from how most people I've seen use Vue handle business logic.
While ultimately a step it what should probably be right direction, will undoubtedly be a slow process to migrate existing Vue 2 applications.

Part of the reason I had to pick Tailwind for my styling was because pretty much no existing Vue component framework works in Vue 3 yet. Vuex's last major version will work in Vue 3,
but you might as well adopt Pinia going forward which I had found out only because I went to Vue Nation. Rest assured, I'm not alone in trying to navigate [some decisions made.](https://devrant.com/rants/3904058/damn-bro-vue-3-sucks-actually-its-just-a-big-function-now-with-arguments-like-th)

Regardless of how things are in the current state, I still prefer Vue over what's out there. Beyond continuing to improve this project as the tools with Vue 3 mature, I do plan on continuing to use Vue(especially tempted to keep giving Vue 3 a shot because [Vite](https://vitejs.dev/) exists). Although I may find myself back on the Options API side sooner than later.

### Diving into the composition API

I won't dive too deep into all the changes within the new syntax of the Composition API; [Vue Docs](https://vuejs.org/) as normal will beat any way of me explaining it.
I am glad to say that as with previous versions of Vue, the documentation is a core focus within the development of Vue and often is the forefront of why I always recommend Vue as my preferred front-end framework. Whether you have experience in Vue previously or no JS framework for the matter, Vue has always done a great job of explaining details to programmer of all levels.
That being said, the updated version of the Vue docs now allows you to toggle by API styles(options being what you are using if you've used Vue before, composition being the new stuff) very easily:

<img src="/images/blog/composition.png" alt="Composition Toggle" />

While it is entirely possible to use the Composition API in the similar hook fashion that you would for the options API, I decided to jump off the deep end and strictly stick to the new syntax introduced.
While I didn't use every single feature available in the new API, I got the experience of written functionality I would be akin to in a normal development setting.

### Syntax

Compared to writing typical Vue components, most of what makes a typical Vue component is still intact, you typically have a `<template>`, `<script>` and `<style>` block wih the exception to the new script block containing the word `setup`.
The bare-bones to defining variables in the new composition revolves around the new `ref` and `reactive` declarations that allow you to define mutable JavaScript Proxy Objects within your code:

``` 
const categories = ref([])
```

Similarly to how you might already being modifying data within Vue, we can create methods(without needing a hook to do so) to modify the `value` of these proxy objects:
``` 
const getCategories = async () => {
  try {
    let { data, error, status } = await supabase
        .from('Categories')
        .select('*')
        .order('title')
    if (error && status !== 200) throw error
    categories.value = data
  } catch (error) {
      await Swal.fire({
          icon: 'error',
          text: 'Error fetching Categories. Please try again later.',
      })
  } finally {
    loading.value = false
  }
}
```
Note that because we defined `categories` as a `ref`, the declaration is a full object that tracks more than just the value, so if we want to change that or reference it outside the template, we explicitly have to say `categories.value` instead of `this.categories`.

While there seems to be no mention of hooks up to this point, don't worry, they're still here, and you can call them as you need them:
``` 
onMounted(() => {
  getCategories()
})
```

### Components
When building individual components using the new Composition API, I feel this is the area that it truly excels.
Since single file components(SFC) in best practice typically only contain the logic to modify themselves visually, it may occasionally seem like overkill managing all the hooks associated within a typical Vue component.
With the simplistic nature of the Composition API, I feel like this is actually a better way in building simple components that don't require every feature Vue has to offer.

A quick example I have within my new app is a simple difficulty selector. While the value it provides will be submitted along other information on a trivia question, the component itself only contains the following logic(minus array of difficulty options):
```
<script setup>
    const props = defineProps({
      modelValue: {
          type: Number,
          default: 2
      }
    })
    const emit = defineEmits(['update:modelValue'])
</script>
```

No fancy hooks, name declarations, this is it(minus Vue 3 changing what `v-model` binds to inside a component :( ). While I'm sure the complexity of this component would not be much of a difference in the options API, this component took less than a minute or two using Composition, and syntactically I feel was a little more straight forward.
Granted, the functionality built within either API options would make this component work, I felt that Composition was the more straight forward approach when building simple components.

### Views
While I did find enjoyment in building components, I unfortunately could not say the same about views.
The reasons I found the Composition API syntax helpful in my previous example are the core of what makes it less attractive in areas of the application containing business logic.
I'll admit, when discussing where business logic belongs in a front-end application is a discussion that has been going on for decades.

However, due to the nature of the composition API, I'd say the Vue devs have their answer; not in your Vue components.
While it's possible to store logic such as API calls in stores instead of your components as a temporary fix, that does not solve the growing complexity problem within your front-end application forever.

### Pinia 
Lining up to be the successor of Vuex(confirmed as of Vue Nation), Pinia is a store library that shares many similarities to Vuex.
While I did not reap the main benefit advertised(full Typescript support), I did have the chance to utilize the updated approach to store actions.

<img src="/images/blog/pinia.png" alt="Pinia" />

After building my initial app with logic within the views, I wanted to strive for having all data types including their respective API fetches within stores; usable anywhere within the application.
Since Pinia lacks mutations, pretty much all the modification of a store takes place within your actions. Forget dispatches though, actions are pretty much called as regular methods would be:

```
// store/categories.js

state: () => ({
    categories: []
}),
setup() {
    const store = categoryStore()

    return {
        // you can return the whole store instance to use it in the template
        store,
    }
},
actions: {
    async getCategories() {
        try {
            let {data, error, status} = await supabase
                .from('Categories')
                .select('*')
                .order('title')

            if (error && status !== 200) throw error

            this.categories = data
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                text: 'Error fetching Categories. Please try again later.',
            })
        }
    }
}
```
Once we call this category store for usage, we can immediately access both the actions and data directly within the store without any kind of extra wrappers or strings attached:
```
// views/Trivia.vue
<template>
    <select
        v-model="categorySelected"
        id="categories"
        class="form-select appearance-none w-full block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border rounded m-0 focus:outline-none"
        aria-label="Default select example"
    >
        <option value="0">
          All
        </option>
        <option
          v-for="(category, categoryIndex) in categories.categories"
          :key="categoryIndex"
          :value="category.id"
        >
          {{ category.title }}
        </option>
    </select>
</template>
<script setup>
import { categoryStore } from '../store/categories'
const categories = categoryStore()

onMounted(() => {
    categories.getCategories()
})
</script>
```

## Conclusion
This project involved an interesting mix between tools I have planned on either giving a try or as with Vue, trying to get my head
in the right direction of the changes coming to the framework. While it took some adjustment at first, over time I was able 
to learn my way into the changes with Vue 3. Coupled with the features of Supabase, both came together surprisingly well, giving
me the ability to not only build a base application, but also to provide the tools to expand the app over time!

If you are interested in checking out the application, you can see it [live here](https://ponder-app.org/)! As of now, 
you can already begin submitting your own questions as well as diving in to what Ponder has to offer for now! Currently, here is the development roadmap:

1. Look into an official domain
2. Add support for content reporting and personal trivia creation(Similar to Kahoot, perhaps will even add corny music as well)
3. Game lobbies where you and your friends can meetup to play random trivia or one of that you've made yourself. Anytime, anywhere!
4. Project released to be open-source(Yes I know, saving the part to mock me for last 😅)

Thanks for reading!
