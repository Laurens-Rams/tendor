<template>
    <div class="bg-gray-200 font-sans w-full flex flex-row mx-auto pt-60">
  <div class="card w-1/2 mx-auto bg-white  shadow-xl hover:shadow pb-40">
     <img class="w-40 h-40 object-cover mx-auto rounded-full -mt-20 border-8 border-white" src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Josune_Bereziartu_2012.jpg" alt="">
     <div class="text-center mt-2 text-3xl font-medium">{{ userData.name}}</div>
     <div class="text-center mt-2 font-light text-sm">{{ userData.email}}</div>
     <div class="px-6 text-center mt-2 font-light text-sm">
       <div class="flex flex-col items-center gap-2 mt-3">
  <span class="flex items-center gap-4 text-sm rounded text-slate-500">
    <span class="flex gap-1 text-amber-400" role="img" aria-label="Rating: 4 out of 5 stars">
      <span aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
        </svg>
      </span>
      <span aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
        </svg>
      </span>
      <span aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
        </svg>
      </span>
      <span aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
        </svg>
      </span>
      <span aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </span>
    </span>
    <span>4.1 out 5</span>
  </span>
  <!-- Helper text -->
  <span class="text-xs leading-6 text-slate-400">based on 42 user ratings</span>
  <button @click="openEmail" class="text-sm px-8 p-1.5 flex flex-col items-center mt-3 mx-auto text-gray-800 font-semibold bg-teal-500 rounded-md border border-teal-500 shadow-sm ">Connect</button>
</div> 
     </div>
     <hr class="mt-8">
     <h3 class="text-center mt-2 font-semibold text-base text-gray-700 mt-3">Information</h3>
     <p class="text-center mt-2 font-light text-sm mb-5">
        {{ userData.interests}}
      </p>
      <h4 class="text-center mt-2  text-xs font-semibold text-gray-700 mt-3">Location</h4>
       <p class="text-center mt-2 font-light text-sm">
        {{ userData.location}}
       </p>
       <h4 class="text-center mt-2 text-xs font-semibold text-gray-700 mt-3">Climbing Difficulty Bouldering</h4>
       <p class="text-center mt-2 font-light text-sm">
        {{ userData.climbingDifficultyBouldering}}
       </p>
       <h4 class="text-center mt-2 text-xs font-semibold text-gray-700 mt-3">Climbing Difficulty Sport</h4>
       <p class="text-center mt-2 font-light text-sm">
        {{ userData.climbingDifficultySport}}
       </p>
       <hr class="mt-8">
     <div class="md:grid-cols-2 md:grid w-full mt-5">
      <div class="mx-auto">
        <h2 class="font-semibold text-gray-800 text-center">Equipment</h2>
        <button v-for="equipment in userData.equipmentOptions" :key="equipment.value" :value="equipment.value" class="text-sm w-60 flex flex-col items-center mt-3 pt-2 w-30 h-10 mx-auto text-gray-800 font-semibold bg-slate-100 rounded-md border border-gray-400 shadow-sm ">{{  equipment.option }}</button>
      </div>
      <div class="">
        <h2 class="font-semibold text-gray-800 text-center">Services</h2>
        <button v-for="service in userData.serviceOptions" :key="service.value" :value="service.value" class=" text-sm w-60 flex flex-col items-center mt-3 pt-2 w-30 h-10 mx-auto text-gray-800 font-semibold bg-slate-100 rounded-md border border-gray-400 shadow-sm ">{{  service.option }}</button>
      </div>
     </div>
  </div>
</div>

  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getFirestore, doc, getDoc } from 'firebase/firestore'
  
  const userData = ref({})
  const props = defineProps(['id'])
  
  onMounted(async () => {
    try {
      const userId = props.id 
      const firestore = getFirestore()
      const userDocRef = doc(firestore, 'users', userId)
      const userDocSnapshot = await getDoc(userDocRef)
  
      if (userDocSnapshot.exists()) {
        userData.value = userDocSnapshot.data()
      }
    } catch (error) {
      console.error(error)
    }
  })

  const openEmail = () => {
  const email = userData.value.email
  const subject = 'Climbing Parter Find'
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}}`
  
  window.location.href = mailtoLink
}

  </script>