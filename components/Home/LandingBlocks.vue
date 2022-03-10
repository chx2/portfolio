<template>
    <div class="md:flex mb-96">
        <div class="bg-gray-900 z-0 mt-16 w-full shadow-2xl rounded-r md:w-1/2 p-16 flex justify-center items-center flex-col text-white animate__animated animate__slideInLeft">
            <h1 class="text-4xl mb-4">Hello, I'm Chris.</h1>
            <h2 class="text-2xl animate__animated animate__fadeInLeft animate__delay-1s">Full-Stack Developer</h2>
            <h3 class="text-xl animate__animated animate__fadeInLeft animate__delay-2s">{{ $dayjs('2018').toNow(true) }} professional experience</h3>
            <h3 class="text-xl animate__animated animate__fadeInLeft animate__delay-2s">1,000+ external code contributions</h3>
            <NuxtLink to="/resume" class="bg-gray-800 rounded-lg duration-100 cursor-pointer hover:bg-gray-900 hover:text-white shadow-2xl mt-4 mx-auto p-4 flex justify-center items-center flex-col text-white animate__animated animate__lightSpeedInLeft animate__delay-3s">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </NuxtLink>
        </div>
        <div class="w-full md:w-1/2">
            <img class="hidden md:block absolute rounded shadow-2xl right-32 mt-32 z-10 w-1/2 animate__animated animate__fadeInLeft animate__delay-3s" src="/images/code.png" alt="code">
        </div>
    </div>
</template>

<script>
import "animate.css"

export default {
    name: "LandingBlocks",
}
</script>
