<template>
  <section class="bg-gray-100 min-h-screen pt-40">
  <div class="w-full lg:w-4/12 px-4 mx-auto pt-6">
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
      <div class="rounded-t mb-0 px-6 py-6">
        <div class="text-center mb-3">
          <h6 class="text-blueGray-500 text-3xl font-bold mb-5">
            Register for free
          </h6>
        </div>
        <div class="btn-wrapper text-center">
          <button @click="signInWithGoogle" class="bg-white active:bg-blueGray-50 text-bold text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
            <img alt="..." class="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg">Sign in with Google </button>
        </div>
        <hr class="mt-6 border-b-1 border-blueGray-300">
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div class="text-gray-800 text-center mb-3 font-bold">
          <small>OR</small>
        </div>
        <form>
<div class="flex mb-3 mt-6">
  <div class="flex-grow w-1/4 pr-2">
    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Name</label>
    <input placeholder="Name" class="border border-gray-200 rounded-md px-4 py-2 w-full" v-model="Name">
  </div>
  </div>
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
            <button @click="register" class="text-white bg-cyan-500 active:bg-cyan-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button"> Register </button>
          </div>
          
          <div class="text-blueGray-400 text-center mb-3 font-bold">
            <p v-if="errMessage" class="text-red-500 text-sm p-4">{{ errMessage }}</p>
          <small>Already have an account? <router-link to="/login" class="text-cyan-500 font-bold">Login here</router-link></small>
        </div>
        </form>
      </div>
    </div>
  </div>
</section>
</template>
  
  <script setup>
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  import { auth, db, collection, setDoc, doc, updateDoc } from '../firebase';// Stellen Sie sicher, dass Sie Ihre Firebase-Datei importieren

  const email = ref('');
  const password = ref('');
  const router = useRouter();
  const errMessage = ref()
  
  const name = ref('');

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      const user = data.user;
      const uid = user.uid;
      // Create a user document in Firestore
      const userRef = doc(db, 'users', uid);
      router.push("/user-list")
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/invalid-email':
          errMessage.value = 'Invalid email';
          break;
        case 'auth/email-already-in-use':
          errMessage.value = 'Email is already in use';
          break;
        case 'auth/weak-password':
          errMessage.value = 'Password is too weak';
          break;
        default:
          errMessage.value = 'Registration failed';
          break;
      }
    });
};

   // Google-Provider definieren

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log('Successfully registered with Google!');
      router.push('/user-list');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errMessage.value = 'Google registration canceled by the user';
          break;
        case 'auth/popup-blocked':
          errMessage.value = 'Google registration popup was blocked by the browser';
          break;
        default:
          errMessage.value = 'Failed to register with Google';
          break;
      }
    });
};
</script>