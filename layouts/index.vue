<template>
    <div class="bg-gray-800 min-h-screen overflow-x-hidden">
        <Logo class="hidden md:block" />
        <TopBar />
        <Nuxt />
    </div>
</template>

<script>
import TopBar from "../components/TopBar";
import Logo from "../components/Logo";
export default {
    name: "index",
    components: {Logo, TopBar}
}
</script>

<style scoped>

</style>
