<template>
  <section class="pt-20 flex flex-col justify-center antialiased bg-gray-100 text-gray-600 min-h-screen p-7">
    <div class="flex justify-center items-center mt-10">
      <div class="p-7 pb-3 w-full max-w-3xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header class="border-b border-gray-100">
          <h2 class="font-semibold text-xl text-gray-800 p-5">Personal Information</h2>
        </header>
        <form @submit.prevent="addUser" enctype="multipart/form-data">
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-5 border-b">
            <label for="name" class="font-medium text-gray-800">Name</label>
            <input type="text" id="name" v-model="name" :placeholder="user.name ? user.name : 'Enter your name'" class="text-sm font-medium text-left text-black rounded-lg bg-white border border-gray-200 rounded-md focus:ring-4 focus:ring-blue-300 px-4 py-2 w-full placeholder:grey-700">
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-5 border-b">
            <label for="email" class="font-medium text-gray-800">Email</label>
            <input type="email" id="email" v-model="email" class="text-sm font-medium text-left text-black rounded-lg bg-white border border-gray-200 rounded-md focus:ring-4 focus:ring-blue-300 px-4 py-2 w-full placeholder:grey-700" readonly disabled>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-5 border-b">
            <label for="birthday" class="font-medium text-gray-800">Birthday</label>
            <template v-if="editingBirthday || !user.birthday">
              <input
                ref="birthdayInput"
                type="date"
                id="birthday"
                v-model="birthday"
                :ref="birthdayInput"
                class="border border-gray-200 rounded-md px-4 py-2 w-full"
                :placeholder="user.birthday ? '' : 'YYYY-MM-DD'"
              />
            </template>
            <template v-else>
              <p class="ml-4">{{ convertBirthdayFormat(user.birthday) }} <button @click="startEditingBirthday" class="text-blue-600 hover:underline">Edit</button></p>
            </template>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <label for="profileImage" class="font-medium text-gray-800">Profile Image</label>
            <div class="mb-3">
              <input
                class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none  "
                id="formFileLg"
                type="file"
                @change="handleFileUpload"
              />
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <label for="location" class="font-medium text-gray-800">Location</label>
            <input type="text" id="location" v-model="location" class="text-sm font-medium text-left text-black rounded-lg bg-white border border-gray-200 rounded-md focus:ring-4 focus:ring-blue-300 px-4 py-2 w-full placeholder:grey-700" :placeholder="user.location ? user.location : 'What interests you?'">
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 ">
            <label for="interests" class="font-medium text-gray-800">Interests</label>
            <textarea id="interests" v-model="interests" class="text-sm font-medium text-left text-black rounded-lg bg-white border border-gray-200 rounded-md focus:ring-4 focus:ring-blue-300 px-4 py-2 w-full placeholder:grey-700" :placeholder="user.interests ? user.interests : 'Enter a city in Austria' "></textarea>
          </div>
          <header class="border-b border-gray-100 pt-3">
            <h2 class="font-semibold text-xl text-gray-800 p-5">Climbing Information</h2>
          </header>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <label for="climbingDifficultyBouldering" class="font-medium text-gray-800">What is your climbing level?</label>
            <div>
              <div class="mb-6">
                <label for="location" class="block text-sm font-medium leading-6 text-gray-900 mb-2">Bouldering</label>
                <select v-model="user.climbingDifficultyBouldering" id="climbingDifficultyBouldering" class="text-sm font-medium text-left text-black rounded-lg bg-white border border-gray-200 rounded-md focus:ring-4 focus:ring-blue-300 px-4 py-2 w-full">
                  <option value="" disabled>Select your difficulty</option>
                  <option v-for="difficulty in difficulties" :key="difficulty.value" :value="difficulty.value">
                    {{ difficulty.label }}
                  </option>
                </select>
              </div>
              <div>
                <label for="climbingDifficultySport" class="block text-sm font-medium leading-6 text-gray-900 mb-2">Sport Climbing</label>
                <select v-model="user.climbingDifficultySport" id="climbingDifficultySport" class="text-sm font-medium text-left text-black rounded-lg bg-white border border-gray-200 rounded-md focus:ring-4 focus:ring-blue-300 px-4 py-2 w-full">
                  <option value="" disabled>Select your difficulty</option>
                  <option v-for="difficulty in difficulties" :key="difficulty.value" :value="difficulty.value">
                    {{ difficulty.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <div><label for="climbingDifficultyBouldering" class="font-medium text-gray-800">Let's see how you match</label></div>
            <div>
              <div class="w-full">
                <button
                  id="dropdownSearchButton"
                  :class="[
                    'w-full inline-flex px-4 pr-1 py-2 text-sm font-medium text-left text-black rounded-lg bg-white border border-gray-200 rounded-md focus:ring-4 focus:ring-blue-300',
                    isActiveEquipment ? 'bg-blue-700' : ''
                  ]"
                  type="button"
                  @click="toggleDropdownEquipment"
                >
                  What equipment can you offer?
                  <svg
                    class="w-3 h-3 ml-5 ml-auto"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 20 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                <div
                  id="dropdownSearch"
                  class="z-10 mt-2"
                  :class="[
                    'w-full bg-white rounded-lg shadow',
                    isActiveEquipment ? '' : 'hidden '
                  ]"
                >
                  <ul
                    class="h-65 px-3 pb-3 overflow-y-auto text-sm text-gray-700 pt-3"
                    :aria-labelledby="'dropdownSearchButton'"
                  >
                    <li v-for="equipment in equipmentOptions" :key="equipment.id">
                      <div class="flex items-center p-2 rounded hover:bg-gray-100">
                        <input
                          :id="'checkbox-item-' + equipment.id"
                          type="checkbox"
                          :value="equipment"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          v-model="selectedEquipmentOptions"
                          :checked="selectedEquipmentOptions.includes(equipment)"
                        >
                        <label
                          :for="'checkbox-item-' + equipment.id"
                          class="ml-2 text-sm font-medium text-gray-900 rounded"
                        >
                          {{ equipment.option }}
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="w-full">
                <button
                  id="dropdownSearchButton"
                  :class="[
                    'w-full mt-3 inline-flex px-4 pr-1 py-2 text-sm font-medium text-left text-black rounded-lg bg-white border border-gray-200 rounded-md focus:ring-4 focus:ring-blue-300',
                    isActiveService ? 'bg-blue-700' : ''
                  ]"
                  type="button"
                  @click="toggleDropdownService"
                >
                  What Service Can You Offer?
                  <svg
                    class="w-3 h-3 ml-5 ml-auto"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 20 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                <div
                  id="dropdownSearch"
                  class="z-10 mt-2"
                  :class="[
                    'w-full bg-white rounded-lg shadow',
                    isActiveService ? '' : 'hidden '
                  ]"
                >
                  <ul
                    class="h-65 px-3 pb-3 overflow-y-auto text-sm text-gray-700 pt-3"
                    :aria-labelledby="'dropdownSearchButton'"
                  >
                    <li v-for="service in serviceOptions" :key="service.id">
                      <div class="flex items-center p-2 rounded hover:bg-gray-100">
                        <input
                          :id="'checkbox-item-' + service.id"
                          type="checkbox"
                          :value="service"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          v-model="selectedServiceOptions"
                          :checked="selectedServiceOptions.includes(service)"
                        >
                        <label
                          :for="'checkbox-item-' + service.id"
                          class="ml-2 text-sm font-medium text-gray-900 rounded"
                        >
                          {{ service.option }}
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 p-4">
            <div>
              <label class="relative inline-flex items-center mb-1 cursor-pointer">
                <input type="checkbox" value="publish.value" class="sr-only peer" v-model="publish" :checked="user.showInDatabase">
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-200 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                <span class="ml-3 mr-5 text-sm font-medium text-gray-900 dark:text-gray-700">Publish</span>
              </label>
              <label id="remeber" class="relative inline-flex items-center cursor-pointer">
                <input
                  required
                  for="remember"
                  type="checkbox"
                  :value="terms"
                  class="sr-only peer"
                  @input="terms = !terms"
                  v-model="terms"
                />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-200 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-700">Agree with terms and conditions*</span>
              </label>
            </div>
            <div class="pt-2">
              <button type="submit" class="float-right float-bottom text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
              <button type="cancel" class="float-right text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cancel</button>
              <p class="text-s text-green-500">{{ successMessage }}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, doc } from '../firebase';
import { getAuth } from 'firebase/auth';

import { equipmentOptions, serviceOptions, difficulties } from '../constants';

// User data
const user = ref({
  name: '',
  climbingDifficultyBouldering: '',
  climbingDifficultySport: '',
  location: '',
  birthday: '',
  interests: '',
  equipmentOptions: '',
  serviceOptions: '',
});

// Form state
const isActiveService = ref(false);
const isActiveEquipment = ref(false);

// Form values
const selectedEquipmentOptions = ref([]);
const selectedServiceOptions = ref([]);
const name = ref('');
const email = ref('');
const birthday = ref('');
const location = ref('');
const interests = ref('');
const publish = ref(true);
const terms = ref(false);
const profileImage = ref(null);
const userExists = ref(false);
const editingBirthday = ref(false);
const submitted = ref(false);
const successMessage = ref('');

onMounted(async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser !== null) {
    email.value = currentUser.email;

    const userQuery = query(collection(db, 'users'), where('email', '==', email.value));
    const querySnapshot = await getDocs(userQuery);
    userExists.value = !querySnapshot.empty;

    if (userExists.value) {
      const userData = querySnapshot.docs[0].data();
      Object.assign(user.value, userData);

      selectedEquipmentOptions.value = user.value.equipmentOptions || [];
      selectedServiceOptions.value = user.value.serviceOptions || [];
      terms.value = user.value.termsAccepted || [];
    } else {
      console.log('User does not exist');
    }
  }
});

const toggleDropdownService = () => {
  isActiveService.value = !isActiveService.value;
};

const toggleDropdownEquipment = () => {
  isActiveEquipment.value = !isActiveEquipment.value;
};

const handleFileUpload = (event) => {
  profileImage.value = event.target.files[0];
  console.log('Selected file:', profileImage.value);
};

const resetForm = () => {
  name.value = '';
  location.value = '';
  interests.value = '';
  profileImage.value = null;
};

const birthdayInput = ref(null);

const startEditingBirthday = () => {
  editingBirthday.value = true;
  birthday.value = user.value.birthday;
  nextTick(() => {
    birthdayInput.value.focus();
  });
};

const convertBirthdayFormat = (birthday) => {
  const date = new Date(birthday);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const updateUserField = (field, value, userUpdate) => {
  if (value !== '') {
    userUpdate[field] = value;
  }
};

const uploadProfileImage = async (storageReference, file) => {
  const snapshot = await uploadBytes(storageReference, file);
  return getDownloadURL(snapshot.ref);
};

const addUser = async () => {
  const newMail = email.value;
  const userQuery = query(collection(db, 'users'), where('email', '==', newMail));
  const querySnapshot = await getDocs(userQuery);
  submitted.value = true;

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const docRef = doc(db, 'users', userDoc.id);

    try {
      const userUpdate = {};

      updateUserField('name', name.value, userUpdate);
      updateUserField('location', location.value, userUpdate);
      updateUserField('interests', interests.value, userUpdate);
      updateUserField('equipmentOptions', selectedEquipmentOptions.value, userUpdate);
      updateUserField('serviceOptions', selectedServiceOptions.value, userUpdate);
      updateUserField('climbingDifficultyBouldering', user.value.climbingDifficultyBouldering, userUpdate);
      updateUserField('climbingDifficultySport', user.value.climbingDifficultySport, userUpdate);
      updateUserField('birthday', birthday.value, userUpdate)
      userUpdate.showInDatabase = publish.value;
      userUpdate.termsAccepted = terms.value;

      if (profileImage.value) {
        const storagePath = `users/${Date.now()}_${profileImage.value.name}`;
        const storageReference = storageRef(storage, storagePath);
        const downloadURL = await uploadProfileImage(storageReference, profileImage.value);
        userUpdate.profileImage = downloadURL;
      }

      await updateDoc(docRef, userUpdate);
      console.log('User data updated in Firestore');
      Object.assign(user.value, userUpdate);
      resetForm();
      successMessage.value = 'User data changed successfully.';
      editingBirthday.value = false;
      submitted.value = true;
    } catch (error) {
      console.error('Error updating user data in Firestore:', error);
    }
  } else {
    const userToAdd = {
      name: name.value,
      email: newMail,
      birthday: birthday.value,
      location: location.value,
      climbingDifficultyBouldering: user.value.climbingDifficultyBouldering,
      climbingDifficultySport: user.value.climbingDifficultySport,
      interests: interests.value,
      showInDatabase: publish.value,
      termsAccepted: terms.value,
      profileImage: null,
      equipmentOptions: selectedEquipmentOptions.value,
      serviceOptions: selectedServiceOptions.value
    };

    if (profileImage.value) {
      const storagePath = `users/${Date.now()}_${profileImage.value.name}`;
      const storageReference = storageRef(storage, storagePath);

      try {
        const downloadURL = await uploadProfileImage(storageReference, profileImage.value);
        userToAdd.profileImage = downloadURL;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    try {
      const userRef = collection(db, 'users');
      await addDoc(userRef, userToAdd);
      console.log('User data added to Firestore');
      Object.assign(user.value, userToAdd);
      resetForm();
      submitted.value = true;
      successMessage.value = 'User data added successfully.';
    } catch (error) {
      console.error('Error adding user data to Firestore:', error);
    }
  }
};
</script>