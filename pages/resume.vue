<template>
    <main class="p-6 mx-auto page max-w-2xl print:max-w-letter md:max-w-letter md:h-letter xsm:p-8 sm:p-9 md:p-16 bg-white">
        <Logo class="hidden md:block" />
        <Header />
        <hr />
        <Socials />
        <hr />
        <Summary />
        <hr />
        <Education />
        <hr />
        <Experience :experiences="experience[0].data" />
        <hr />
        <Projects :projects="projects[0].data" />
        <button class="text-gray-600 fixed top-4 right-4 animate-pulse hidden md:block" @click="print">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
        </button>
    </main>
</template>

<script>
    import Header from "../components/Resume/Header";
    import Summary from "../components/Resume/Summary";
    import Experience from "../components/Resume/Experience";
    import Projects from "../components/Resume/Projects";
    import Education from "../components/Resume/Education";
    import Socials from "../components/Resume/Socials";
    import Logo from "../components/Logo";

    export default {
        name: 'resume',
        components: {Logo, Socials, Education, Projects, Experience, Summary, Header},
        async asyncData ({ $content }) {
            const experience = await $content('data').where({ name: 'Experience' }).limit(1).fetch()
            const projects = await $content('data').where({ name: 'Projects' }).limit(1).fetch()
            return {
                experience,
                projects
            }
        },
        head () {
            return {
                title: 'Resume',
                titleTemplate: '%s | Chris Hackett',
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'View my personal portfolio'
                    },
                    {
                        hid: 'twitter:title',
                        name: 'twitter:title',
                        content: 'View Resume'
                    },
                    {
                        hid: 'twitter:description',
                        name: 'twitter:description',
                        content: 'View my personal portfolio'
                    },
                    {
                        hid: 'og:title',
                        property: 'og:title',
                        content: 'View Resume'
                    },
                    {
                        hid: 'og:description',
                        property: 'og:description',
                        content: 'View my personal portfolio'
                    },
                ]
            }
        },
        methods: {
            print() {
                window.print()
            }
        }
    }
</script>
