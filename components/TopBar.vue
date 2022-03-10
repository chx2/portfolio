<template>
    <nav class="w-full md:flex justify-end items-end p-4 pb-12 text-white">
        <NuxtLink class="p-4 hover:underline pb-4 md:pb-0" to="/">About</NuxtLink>
        <NuxtLink class="p-4 hover:underline pb-4 md:pb-0" to="/resume">Resume</NuxtLink>
        <NuxtLink class="p-4 hover:underline pb-4 md:pb-0" to="/articles">Blog</NuxtLink>
    </nav>
</template>

<script>
export default {
    name: "TopBar"
}
</script>
