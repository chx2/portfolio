<template>
    <div class="bg-white">
        <main class="w-full md:w-4/6 mx-auto md:flex flex-row">
          <div class="w-full">
            <div class="background p-32 absolute w-full shadow-2xl left-0"
                 :style="`background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/blog/${ article.thumbnail }')`">
              <h1 class="text-white hidden md:block text-6xl text-center m-4">{{ article.title }}</h1>
              <h2 class="text-white hidden md:block text-xl text-center">Published on {{ $dayjs(article.createdAt).format('MM/DD/YYYY') }}</h2>
            </div>
            <div class="p-4 md:p-0 md:mt-64 md:pt-16">
              <nuxt-content class="mt-32 pt-32 md:pt-0 md:mt-32 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl" :document="article" />
            </div>
            <hr class="pt-4 pb-4"/>
            <h2 class="text-4xl text-center m-4" v-if="prev || next">Other Articles</h2>
            <div class="block md:flex md:w-3/4 mx-auto mb-8">
              <NuxtLink :to="prev.path" class="w-full md:w-1/2" v-if="prev">
                <div class="bg-gray-900 h-full cursor-pointer duration-100 rounded hover:opacity-75 mr-4">
                  <img class="max-h-80" :src="`/images/blog/${prev.thumbnail}`" :alt="prev.title">
                  <div class="flex flex-col p-4 text-white">
                    <h2 class="font-bold pb-2">{{ prev.title }}</h2>
                    <hr class="pb-2"/>
                    <p>{{ prev.description }}</p>
                    <h3 class="pt-2">Posted: {{ $dayjs(prev.createdAt).format('M/DD/YYYY') }}</h3>
                  </div>
                </div>
              </NuxtLink>
              <NuxtLink :to="next.path" class="w-full md:w-1/2" v-if="next">
                <div class="bg-gray-900 h-full cursor-pointer duration-100 rounded hover:opacity-75 ml-4">
                  <img class="max-h-80" :src="`/images/blog/${next.thumbnail}`" :alt="next.title">
                  <div class="flex flex-col p-4 text-white">
                    <h2 class="font-bold pb-2">{{ next.title }}</h2>
                    <hr class="pb-2"/>
                    <p>{{ next.description }}</p>
                    <h3 class="pt-2">Posted: {{ $dayjs(next.createdAt).format('MM/DD/YYYY') }}</h3>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </main>
    </div>
</template>

<script>
export default {
    layout: 'index',
    async asyncData ({ $content, params }) {
        const article = await $content('articles', params.slug).fetch()
        const [prev, next] = await $content('articles')
            .sortBy('createdAt', 'asc')
            .surround(params.slug)
            .fetch()
        return {
            article,
            prev,
            next
        }
    },
    head () {
        return {
            title: this.article.title,
            titleTemplate: '%s | Chris Hackett',
            meta: [
                {
                  hid: "description",
                  name: "description",
                  content: this.article.description,
                },
                {
                  hid: "og:title",
                  name: "og:title",
                  content: this.article.title,
                },
                {
                  hid: "og:description",
                  name: "og:description",
                  content: this.article.description,
                },
                {
                  hid: "og:type",
                  property: "og:type",
                  content: "article",
                },
                {
                  hid: "og:url",
                  property: "og:url",
                  content: `https://chrish.me/articles/${this.$route.params.slug}`,
                },
                {
                  hid: "twitter:url",
                  name: "twitter:url",
                  content: `https://chrish.me/articles/${this.$route.params.slug}`,
                },
                {
                  hid: "twitter:title",
                  name: "twitter:title",
                  content: this.article.title,
                },
                {
                  hid: "twitter:description",
                  name: "twitter:description",
                  content: this.article.description,
                },
                {
                  hid: "twitter:image",
                  name: "twitter:image",
                  content: this.article.thumbnail,
                },
                {
                  hid: "og:image",
                  property: "og:image",
                  content: this.article.thumbnail,
                },
                {
                  property: "article:published_time",
                  content: this.article.createdAt,
                },
            ],
            link: [
              {
                hid: "canonical",
                rel: "canonical",
                href: `https://chrish.me/articles/${this.$route.params.slug}`,
              },
            ],
        }
    }
}
</script>
<style scoped>
    .background {
        background-size: cover!important;
        background-position: center center!important;
        background-attachment: fixed!important;
        background-repeat: no-repeat!important;
        max-height: 420px;
    }
    .nuxt-content h1 {
        font-size: 3.5rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .nuxt-content h2 {
        font-size: 3.25rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .nuxt-content h3 {
        font-size: 3rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .nuxt-content iframe {
        width: 100%;
    }
    .nuxt-content blockquote {
        background: rgba(31, 41, 55, var(--tw-bg-opacity));
        color: white;
        padding: 2rem;
    }
    .nuxt-content img {
        margin: 2rem auto 2rem auto;
        max-height: 600px;
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    }
    .nuxt-content ul {
      list-style: disc;
      margin: 2rem
    }
    .nuxt-content ol {
      list-style: decimal;
      margin: 2rem
    }
    .nuxt-content p {
        line-height: 32px;
        margin-bottom: 1rem;
    }
    .nuxt-content a {
        color: #ff0000;
        text-decoration: underline;
    }
</style>
