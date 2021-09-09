<template>
    <section class="mt-4 first:mt-0">
        <div class="break-inside-avoid">
            <h2 class="mb-4 font-bold tracking-widest text-sm2 text-gray-550 text-xl print:font-normal">
                Experience
            </h2>
        </div>
        <section class="mb-4 ml-4 break-inside-avoid" v-for="(experience, experience_key) in experiences" :key="experience_key">
            <header>
                <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                    {{ experience.name }} | {{ experience.org }} | {{ experience.start }} - {{ experience.end }}
                </h3>
            </header>
            <ul class="mt-2 ml-8 list-disc text-md text-gray-700 leading-normal">
                <li v-for="(task, task_key) in experience.tasks" :key="task_key">
                    {{ task }}
                </li>
            </ul>
        </section>
    </section>
</template>

<script>
    export default {
        name: "Experience",
        props: {
            experiences: {
                type: Object,
                required: true
            }
        }
    }
</script>
