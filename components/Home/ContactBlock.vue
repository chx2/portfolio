<template>
  <div class="w-full md:w-4/5 mx-auto mt-96 flex justify-center align-center flex-col">
    <h2 class="text-4xl text-white text-center mb-16">Interested in my work?</h2>
    <form action="https://formcarry.com/s/KPoOssLCh26" method="POST" accept-charset="UTF-8" >
      <div class="mb-8 w-1/2 mx-auto">
        <label class="block text-white text-md font-bold mb-2" for="name">
          Name
        </label>
        <input class="shadow appearance-none border-b bg-gray-800 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter your name..." name="name">
      </div>

      <div class="mb-8 w-1/2 mx-auto">
        <label class="block text-white text-md font-bold mb-2" for="email">
          E-Mail
        </label>
        <input class="shadow appearance-none border-b bg-gray-800 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email..." name="email">
      </div>

      <div class="mb-8 w-1/2 mx-auto">
        <label class="block text-white text-md font-bold mb-2" for="message">
          Message
        </label>
        <textarea rows="1" maxlength="500" class="shadow appearance-none border-b bg-gray-800 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Enter your message..." name="message" />
      </div>

      <button type="submit" class="contact bg-black w-1/2 duration-100 cursor-pointer text-white shadow-2xl mt-4 mx-auto p-4 flex justify-center items-center flex-col text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>

      <input type="hidden" name="_gotcha">
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactBlock",
}
</script>

<style scoped>
  .contact:hover,
  .contact:focus {
    background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
  }
  .contact .icon {
    transition: .25s;
  }
  .contact:hover .icon,
  .contact:focus .icon{
    transform: rotate(90deg);
  }
</style>
