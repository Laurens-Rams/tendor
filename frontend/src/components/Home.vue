<template>
<section class="flex flex-col antialiased bg-gray-100 text-gray-600 min-h-screen">
    <div class="relative">
    <img class="h-screen w-full object-cover" src="../assets/tendor.png" alt="">
    <h1 class="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold shadow-xl">Find your Rock Buddy</h1>
    </div>
    <div class="h-full pt-20 mb-40">
      <div class="w-1/4 max-w-5xl mx-auto text-center">
        <h1 class="text-3xl font-bold mb-3">Hello and Welcome to Climbing Partner Finder.</h1>
        <p>Calling all climbers! Our primary goal is to assist climbers like you in connecting with others who share your enthusiasm and expertise. This app is your ultimate tool for discovering like-minded climbing buddies who share your passion and skill level.</p>
        <router-link to="/user-list"><button class="text-sm px-8 p-1.5 flex flex-col items-center mt-10 mx-auto text-white font-semibold bg-teal-500 rounded-md border border-teal-500 shadow-sm hover:bg-teal-600">Find your Buddy</button></router-link>
      </div>
    </div>
  </section>
</template>
