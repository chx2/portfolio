<template>
    <div>
        <div class="md:flex">
            <div class="w-full md:w-1/2">
                <div class="bg-gray-900 z-0 rounded-r p-16 flex justify-center items-center flex-col text-white animate__animated animate__slideInLeft">
                    <h1 class="text-4xl mb-4">Hello, I'm Chris.</h1>
                    <h2 class="text-2xl animate__animated animate__fadeInUp animate__delay-1s">Full-Stack Developer</h2>
                    <div class="mt-4 flex">
                        <a class="cursor-pointer transition duration-100 hover:scale-125" href="mailto:crishack8@gmail.com">
                            <svg class="h-8 w-8 m-2 text-white animate__animated animate__fadeInUp animate__delay-1s"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />  <polyline points="22,6 12,13 2,6" /></svg>
                        </a>
                        <a class="cursor-pointer transition duration-100 hover:scale-125" href="https://github.com/chx2/">
                            <svg class="h-8 w-8 m-2 text-white animate__animated animate__fadeInLeft animate__delay-2s"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                        </a>
                        <a class="cursor-pointer transition duration-100 hover:scale-125" href="https://www.linkedin.com/in/chris-o-hackett/">
                            <svg class="h-8 w-8 m-2 text-white animate__animated animate__fadeInRight animate__delay-3s"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />  <rect x="2" y="9" width="4" height="12" />  <circle cx="4" cy="4" r="2" /></svg>
                        </a>
                    </div>
                </div>
                <div class="slider animate__animated animate__fadeInRight animate__delay-3s">
                    <div class="slide-track">
                        <div class="slide" v-for="(skill, skillIndex) in sort(skills)" :key="skillIndex">
                            <img :src="require(`../static/images/skills/${skill.thumbnail}`)" :alt="skill.name" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/2">
                <img class="hidden md:block absolute rounded shadow-2xl right-16 mt-32 z-10 w-1/2 animate__animated animate__fadeInLeft animate__delay-2s" src="/images/code.png" alt="code">
            </div>
        </div>
    </div>
</template>

<script>
import "animate.css"

export default {
    layout: 'index',
    data() {
        return {
            loaded: null,
            skills: [
                {
                    "name": "HTML5",
                    "thumbnail": "html5.webp"
                },
                {
                    "name": "CSS3/SASS",
                    "thumbnail": "css3.png"
                },
                {
                    "name": "SASS",
                    "thumbnail": "sass.png"
                },
                {
                    "name": "JavaScript/ES6",
                    "thumbnail": "js.png"
                },
                {
                    "name": "PHP",
                    "thumbnail": "php.png"
                },
                {
                    "name": "Python",
                    "thumbnail": "python.png"
                },
                {
                    "name": "MySQL/MariaDB",
                    "thumbnail": "mysql.png"
                },
                {
                    "name": "PostgreSQL",
                    "thumbnail": "pgsql.png"
                },
                {
                    "name": "Supabase",
                    "thumbnail": "supabase.png"
                },
                {
                    "name": "Vue",
                    "thumbnail": "vue.png"
                },
                {
                    "name": "React",
                    "thumbnail": "react.png"
                },
                {
                    "name": "Alpine",
                    "thumbnail": "alpine.png"
                },
                {
                    "name": "Bootstrap",
                    "thumbnail": "bootstrap.png"
                },
                {
                    "name": "Vuetify",
                    "thumbnail": "vuetify.png"
                },
                {
                    "name": "Laravel",
                    "thumbnail": "laravel.png"
                },
                {
                    "name": "Symfony",
                    "thumbnail": "symfony.png"
                },
                {
                    "name": "Django",
                    "thumbnail": "django.png"
                },
                {
                    "name": "Jest",
                    "thumbnail": "jest.png"
                },
                {
                    "name": "Cypress",
                    "thumbnail": "cypress.png"
                },
                {
                    "name": "GitHub",
                    "thumbnail": "github.png"
                },
                {
                    "name": "GitLab",
                    "thumbnail": "gitlab.svg"
                },
                {
                    "name": "AWS-EC2/S3",
                    "thumbnail": "ec2.svg"
                },
                {
                    "name": "Heroku",
                    "thumbnail": "heroku.webp"
                },
                {
                    "name": "Docker",
                    "thumbnail": "docker.webp"
                },
                {
                    "name": "WordPress",
                    "thumbnail": "wp.png"
                }
            ]
        }
    },
    methods: {
        sort(array) {
            return array.sort(() => Math.random() - 0.5)
        }
    },
    head () {
      return {
        title: "Home",
        titleTemplate: '%s | Chris Hackett',
        meta: [
          {
            hid: "description",
            name: "description",
            content: "Hello, I'm Chris. I'm a Full-Stack Developer.",
          },
          {
            hid: "og:title",
            name: "og:title",
            content: "Home",
          },
          {
            hid: "og:description",
            name: "og:description",
            content: "Hello, I'm Chris. I'm a Full-Stack Developer.",
          },
          {
            hid: "og:url",
            property: "og:url",
            content: `https://chrish.me`,
          },
          {
            hid: "twitter:url",
            name: "twitter:url",
            content: `https://chrish.me`,
          },
          {
            hid: "twitter:title",
            name: "twitter:title",
            content: "Home",
          },
          {
            hid: "twitter:description",
            name: "twitter:description",
            content: "Hello, I'm Chris. I'm a Full-Stack Developer.",
          },
          {
            hid: "twitter:image",
            name: "twitter:image",
            content: "/images/code.png",
          },
          {
            hid: "og:image",
            property: "og:image",
            content: "/images/code.png",
          },
        ],
        link: [
          {
            hid: "canonical",
            rel: "canonical",
            href: `https://chrish.me`,
          },
        ],
      }
    }
}
</script>

<style lang="scss">
@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-250px * 7))}
}

.slider {
    background: transparent;
    height: 100px;
    margin: 48px auto auto auto;
    overflow:hidden;
    position: relative;

    &::before,
    &::after {
        content: "";
        height: 100px;
        position: absolute;
        width: 200px;
        z-index: 2;
    }

    &::after {
        right: 0;
        top: 0;
        transform: rotateZ(180deg);
    }

    &::before {
        left: 0;
        top: 0;
    }

    .slide-track {
        height: 100px;
        animation: scroll 30s linear infinite;
        animation-direction: alternate;
        display: flex;
        width: calc(250px * 14);
    }

    .slide {
        padding-top: 8px;
        margin-right: 32px;
        height: 80px;
        width: 80px;
        z-index: 999;
    }
}
</style>
