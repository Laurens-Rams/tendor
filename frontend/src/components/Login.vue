<template>
  <section class="bg-gray-100 min-h-screen pt-40">
    <div class="w-full lg:w-4/12 px-4 mx-auto pt-6">
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
      <div class="rounded-t mb-0 px-6 py-6">
        <div class="text-center mb-3">
          <h6 class="text-blueGray-500 text-3xl font-bold mb-5">
            Log into my account
          </h6>
        </div>
        <div class="btn-wrapper text-center">
          <button @click="signInWithGoogle" class="bg-white active:bg-blueGray-50 text-bold text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
            <img alt="..." class="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg">Sign in with Google </button>
        </div>
        <hr class="mt-6 border-b-1 border-blueGray-300">
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div class="text-blueGray-400 text-center mb-3 font-bold">
          <small>Or sign in with credentials</small>
        </div>
        <form>
          <div class="relative w-full mb-3">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Email</label><input type="email" class="border border-gray-200 rounded-md px-4 py-2 w-full" placeholder="Email" v-model="email">
          </div>
          <div class="relative w-full mb-3">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Password</label><input type="password" class="border border-gray-200 rounded-md px-4 py-2 w-full" placeholder="Password" v-model="password">
          </div>
          <div>
            <label class="inline-flex items-center cursor-pointer"><input id="customCheckLogin" type="checkbox" class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"><span class="ml-2 text-sm font-semibold text-blueGray-600">Remember me</span></label>
          </div>
          <div class="text-center mt-6">
            <button @click="login" class="text-white bg-cyan-500 active:bg-cyan-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button"> Login </button>
          </div>
          <div class="text-blueGray-400 text-center mb-3 font-bold">
            <p v-if="errMessage" class="text-red-500 text-sm p-4"> {{ errMessage }}</p>
          <small>Need an account? <router-link to="/register" class="text-cyan-500 font-bold">Register here</router-link></small>
        </div>
        </form>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errMessage = ref()
const router = useRouter();

const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Erfolgreich angemeldet!');
      router.push('/user-list');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
          case "auth/invalid-email":
          errMessage.value = "Invalid email";
            break;
          case "auth/user-not-found":
          errMessage.value = "No account with that email was found";
            break;
          case "auth/wrong-password":
          errMessage.value = "Incorrect password";
            break;
          default:
          errMessage.value = "Email or password was incorrect";
            break
          }
    });
};

const provider = new GoogleAuthProvider(); 

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log('Successfully signed in with Google!');
      router.push('/user-list');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errMessage.value = 'Google sign-in canceled by the user';
          break;
        case 'auth/popup-blocked':
          errMessage.value = 'Google sign-in popup was blocked by the browser';
          break;
        default:
          errMessage.value = 'Failed to sign in with Google';
          break;
      }
    });
};
</script>