
<template>
  <div class="fixed bg-teal-400 w-full text-black-700 z-30">
  <div class="flex flex-col px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-10">
    <div class="p-4 flex flex-row items-center justify-between">
      <img class="h-12 w-auto" src="./assets/tendor-logo-black.png" alt="">
    </div>
    <nav class="flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
      <router-link to="/home"><a class="px-4 py-2 mt-2 text-sm font-semibold text-black-900 rounded-lg md:mt-0 focus:text-black-900 hover:bg-teal-500 focus:outline-none focus:shadow-outline" href="#">Home</a></router-link>
      <router-link to="/user-list"><a class="px-4 py-2 mt-2 text-sm font-semibold text-black-900 rounded-lg md:mt-0 focus:text-black-900 hover:bg-teal-500 focus:outline-none focus:shadow-outline" href="#">Find Partner</a></router-link>
      <router-link to="/add-user" v-if="isLoggedIn"><a class="px-4 py-2 mt-2 text-sm font-semibold text-black-900 rounded-lg md:mt-0 focus:text-black-900 hover:bg-teal-500 focus:outline-none focus:shadow-outline" href="#">Add yourself</a></router-link>
      <router-link to="/login" v-if="!isLoggedIn"><a class="px-4 py-2 mt-2 text-sm font-semibold text-black-900 rounded-lg md:mt-0 focus:text-black-900 hover:bg-teal-500 focus:outline-none focus:shadow-outline" href="#">Login</a></router-link>
      <button @click="handleSignout" v-if="isLoggedIn"><a class="px-4 py-2 mt-2 text-sm font-semibold text-black-900 rounded-lg md:mt-0 focus:text-black-900 hover:bg-teal-500 focus:outline-none focus:shadow-outline" href="#">Sign Out</a></button>
    </nav>
  </div>
</div>


  <router-view></router-view>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      auth: null
    };
  },
  methods: {
    handleSignout() {
      signOut(this.auth).then(() => {
        this.$router.push("/");
      });
    }
  },
  mounted() {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user; // Update isLoggedIn based on user presence
    });
  }
};
</script>
