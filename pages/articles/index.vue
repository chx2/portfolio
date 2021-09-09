<template>
    <main class="w-full md:w-5/6 mx-auto md:flex flex-row">
        <div class="w-full p-4 mt-8 md:p-0 animate__animated animate__fadeIn">
            <h1 class="text-white text-4xl mt-0 ml-0 m-4">Things I've Written</h1>
            <input autofocus @keydown.esc="clearSearch" v-model="searchQuery" @input="search" class="bg-gray-900 text-2xl duration-100 mt-4 hover:bg-gray-700 w-full rounded border-2 border-transparent focus:border-gray-400 text-white p-2" placeholder="Search for an article">
            <hr class="w-11/12 mx-auto m-8" />
            <div class="block md:flex shadow-lg mt-4 mb-4 cursor-pointer duration-100 rounded hover:opacity-75 bg-gray-900" v-for="(article, index) in searchResults" :key="index">
                <div class="w-full md:w-1/4">
                    <img class="h-full max-h-48 w-full" :src="`/images/blog/${article.thumbnail}`" :alt="article.title">
                </div>
                <div class="w-full md:w-3/4">
                    <NuxtLink :to="article.path" class="flex flex-col p-4 text-white">
                        <h2 class="font-bold pb-2">{{ article.title }}</h2>
                        <hr class="pb-2"/>
                        <p>{{ article.description }}</p>
                        <h3 class="pt-2">Posted: {{ $dayjs(article.createdAt).format('MM/DD/YYYY') }}</h3>
                    </NuxtLink>
                </div>
            </div>
            <div v-if="searchResults.length === 0" class="flex justify-center items-center flex-col mt-16">
                <svg xmlns="http://www.w3.org/2000/svg" class="animate__animated animate__rubberBand animate__infinite h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
            </div>
        </div>
    </main>
</template>

<script>
import { search } from "ss-search"

export default {
    layout: 'index',
    async created() {
        this.articles = await this.$content('articles')
          .only([
            'title',
            'description',
            'createdAt',
            'thumbnail',
            'path'
          ])
          .sortBy('createdAt', 'desc')
          .fetch()
        this.searchResults = this.articles
    },
    head () {
        return {
            title: 'View Articles',
            titleTemplate: '%s | Chris Hackett',
            meta: [
              {
                hid: "description",
                name: "description",
                content: "View articles I have posted",
              },
              {
                hid: "og:title",
                name: "og:title",
                content: "View articles",
              },
              {
                hid: "og:description",
                name: "og:description",
                content: "View articles I have posted",
              },
              {
                hid: "og:url",
                property: "og:url",
                content: `https://chrish.me/articles`,
              },
              {
                hid: "twitter:url",
                name: "twitter:url",
                content: `https://chrish.me/articles`,
              },
              {
                hid: "twitter:title",
                name: "twitter:title",
                content: "View articles",
              },
              {
                hid: "twitter:description",
                name: "twitter:description",
                content: "View articles I have posted",
              }
            ],
            link: [
              {
                hid: "canonical",
                rel: "canonical",
                href: `https://chrish.me/articles`,
              },
            ],
        }
    },
    data() {
        return {
            searchQuery: '',
            searchResults: [],
        }
    },
    methods: {
        clearSearch() {
            this.searchQuery = ''
            this.searchResults = this.articles
        },
        search() {
            this.searchResults = search(this.articles, ['title'], this.searchQuery)
        },
        toUpper(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    },
}
</script>
