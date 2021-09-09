<template>
  <footer class="relative">
    <div class="block md:absolute w-96 left-64 top-32 text-white text-2xl">
      <h3 class="italic">{{ quote }}</h3>
      <h3 class="mt-4">{{ author }}</h3>
    </div>
    <img class="w-screen" src="/images/dsm.png" alt="Des Moines"/>
  </footer>
</template>

<script>
export default {
  name: "FooterBlock",
  data() {
    return {
      quote: '',
      author: '',
    }
  },
  async created() {
    let quote = await this.$axios.$get('https://api.quotable.io/random');
    this.quote = quote.content;
    this.author = '-' + quote.author;
  }
}
</script>

<style scoped>
footer {
  animation: pulse 1s infinite;
  animation-name: pulse;
  animation-direction: alternate;
  -webkit-animation-name: pulse;
}
@-webkit-keyframes pulse {
  0% {
    -webkit-filter: brightness(100%);
  }
  100% {
    -webkit-filter: brightness(200%);
  }
}

@keyframes pulse {
  0% {
    filter: brightness(100%);
  }
  100% {
    filter: brightness(200%);
  }
}
</style>
