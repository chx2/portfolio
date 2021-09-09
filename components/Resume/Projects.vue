<template>
    <section class="mt-4 first:mt-0">
        <div class="break-inside-avoid">
            <h2 class="mb-4 font-bold tracking-widest text-sm2 text-gray-550 text-xl print:font-normal">
                Projects
            </h2>
        </div>
        <section class="mb-4 ml-4 break-inside-avoid" v-for="(project, experience_key) in projects" :key="experience_key">
            <header>
                <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                    {{ project.name }} |
                    <a class="underline" :href="project.url">{{ project.url_short }}</a>
                </h3>
            </header>
            <p class="mt-2 text-md text-gray-700 leading-normal">
                {{ project.description }}
            </p>
            <ul class="flex flex-wrap text-md leading-relaxed mr-2 mb-2 mt-2 print:hidden">
                <li v-for="(skill, skill_key) in project.skills" :key="skill_key" class="px-2 mr-2 mb-2text-base text-gray-750 print:bg-white duration-100 cursor-pointer hover:text-white hover:bg-gray-900 print:border-inset bg-gray-200">
                    {{ skill }}
                </li>
            </ul>
        </section>
    </section>
</template>

<script>
    export default {
        name: "Projects",
        props: {
            projects: {
                type: Array,
                required: true
            }
        }
    }
</script>
