<template>
    <div class="w-full md:w-4/5 mx-auto mt-64">
        <div class="w-full p-8 md:flex text-white">
            <div class="w-full relative md:w-1/3">
                <p :class="`${animations[Math.floor((Math.random() *  animations.length))]} hidden md:inline-block text-lg m-1`" v-for="(term, index) in terms" :key="index">
                    {{ term }}
                </p>
            </div>
            <div class="w-full md:w-2/3 md:pl-32">
                <p class="bg-gray-900 mt-8 relative animate-float chat shadow-2xl rounded p-8 text-2xl">
                    With experience ranging from agency work all the way up to corporate-level applications, my core belief
                    is to to create accessible, cohesive, and responsive applications across all digital platforms.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SkillBlock",
    async created() {
        const data = await this.$content('data').where({name: 'Skills'}).only(['data']).fetch()
        data[0].data.forEach(item => {
            item.skills.forEach(element => {
                this.terms.push(element)
            })
        })
    },
    data() {
        return {
            animations: [
                'animate-driftLeft',
                'animate-driftRight',
                'animate-driftUp',
                'animate-driftDown',
                'animate-driftUpLeft',
                'animate-driftDownLeft',
                'animate-driftUpRight',
                'animate-driftDownRight',
            ],
            terms: []
        }
    }
}
</script>
<style scoped>
    .chat:before {
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        left: -25px;
        right: auto;
        top: 0;
        border: 20px solid;
        border-color: rgba(17, 24, 39, 1) rgba(17, 24, 39, 1) transparent transparent;
        border-radius: .25rem;
    }
</style>
