<template>
  <section class="flex flex-col antialiased bg-gray-100 text-gray-600 min-h-screen p-10">
    <div class="h-full mt-20">
      <div class="w-full max-w-5xl mx-auto">
        <button
          class="mb-2 p-3 pl-10 w-full inline-flex items-center justify-center sm:text-sm sm:leading-6 rounded-lg bg-slate-200 border-gray-400 hover:bg-slate-300 border-gray-200 rounded-md focus:ring-4 focus:ring-blue-300"
          @click="toggleCollapse"
        >
          <p v-if="!collapsed" >Show Filters</p>
          <p v-else >Hide Filters</p>
          <svg
            class="w-3 h-3 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 20 20"
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
      </div>
      <div v-if="collapsed" class="z-0 p-7 w-full max-w-5xl mx-auto shadow-sm rounded-sm border border-gray-200 bg-white">        
        <header class="px-3 border-b border-gray-100">
              <h2 class="font-bold text-gray-800 text-2xl mb-5">Find your climbing Partner</h2>
            </header>
        <div class="md:grid-cols-3 md:grid">
          <div class="col-span-2">
            <div v-if="collapsed" :class="['', filterbyUserData ? 'opacity-30 pointer-events-none' : 'opacity-100']">
            <div class="hover:bg-slate-100 md:space-y-0 space-y-1 p-4 border-b">
              <div class="mb-[0.125rem] block min-h-[1.5rem] md:grid-cols-2">
                <label class="relative inline-flex items-center mb-2 cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" v-model="filterDifficulties">
                  <div class="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-200 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-violet-600"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-700">Activate Filter</span>
                </label>
              </div>
              <div class="md:space-y-3 space-y-5 md:grid pt-2">
                <div class="md:grid md:grid-cols-2">
                  <label for="difficulty-checkbox" class="flex items-center">
                    <span class="block text-sm font-medium leading-6 text-gray-900 mb-2">Bouldering</span>
                  </label>
                  <select v-model="climbingDifficultySelectedBouldering" id="difficulty-selector" class="text-blue-800 font-semibold relative w-full cursor-default rounded-md bg-slate-100 py-2 pl-4 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <option value="" selected>Bouldering difficulty</option>
                    <option v-for="difficulty in difficulties" :value="difficulty.value" :key="difficulty">{{ difficulty.value }}</option>
                  </select>
                  
                </div>
                <div class="md:grid md:grid-cols-2">
                  <label for="difficulty-checkbox-sport" class="flex items-center">
                    <span class="block text-sm font-medium leading-6 text-gray-900 mb-2">Sport Climbers</span>
                  </label>
                  <select v-model="climbingDifficultySelectedSport" id="difficulty-selector" class="text-blue-800 font-semibold relative w-full cursor-default rounded-md bg-slate-100 py-2 pl-4 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <option value="" selected>Sport Climbing difficulty</option>
                    <option v-for="difficulty in difficulties" :value="difficulty.value" :key="difficulty">{{ difficulty.value }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="hover:bg-slate-100 md:space-y-0 space-y-1 p-4 border-b">
              <label for="city-selector" class="block text-sm font-medium leading-6 text-gray-900 mb-2">Where do you want to climb?</label>
              <select v-model="locationSelected" id="city-selector" class="relative w-full cursor-default rounded-md bg-slate-100 py-2 pl-4 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <option value="" selected>Select a city</option>
                <option v-for="city in cities" :value="city">{{ city }}</option>
              </select>
            </div>
            <div class="p-4 hover:bg-slate-100 border-b">
              <label for="simple-search" class="block text-sm font-medium leading-6 text-gray-900 mb-2">Search by Name</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" v-model="search" id="simple-search" class="relative w-full cursor-default rounded-md bg-slate-100 py-2 pl-4 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Enter a name" required>
              </div>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-slate-100 md:space-y-0 space-y-1 p-4 border-b">
              <div class="mb-[0.125rem] block min-h-[1.5rem] md:grid-cols-2">
                <label class="relative inline-flex items-center mb-2 cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" v-model="filterEqSe">
                  <div class="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-200 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-teal-600"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-700">Activate Filter</span>
                </label>
              </div>
            <div>
              <div class="w-full text-emerald-600 font-semibold">
                <button
                  id="dropdownSearchButton"
                  :class="[
                    'w-full inline-flex px-5 pr-1 py-1 sm:text-sm sm:leading-6 rounded-lg bg-slate-100 border border-gray-200 rounded-md focus:ring-4 focus:ring-blue-300',
                    isActiveEquipment ? 'bg-blue-700' : ''
                  ]"
                  type="button"
                  @click="toggleDropdownEquipment"
                >
                  Select Equipment you need
                  <svg
                    class="w-3 h-3 ml-3 ml-auto mt-1"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 20 20"
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
                    'w-full bg-white rounded-lg shadow-sm',
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
                          v-model="equipmentSelected"
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
              <div class="w-full text-emerald-600 font-semibold">
                <button
                  id="dropdownSearchButton"
                  :class="[
                    'mt-3 w-full inline-flex px-5 pr-1 py-1 sm:text-sm sm:leading-6 rounded-lg bg-slate-100 border border-gray-200 rounded-md focus:ring-4 focus:ring-blue-300',
                    isActiveService ? 'bg-blue-700' : ''
                  ]"
                  type="button"
                  @click="toggleDropdownService"
                >
                  Select Services you need
                  <svg
                    class="w-3 h-3 ml-3 ml-auto mt-1"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 20 20"
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
                    'w-full bg-white rounded-lg shadow-sm',
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
                          v-model="serviceSelected"
                    
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
        </div>
          <div class="md:grid md:grid-cols-2 hover:bg-slate-100 md:space-y-0 space-y-1 p-4 border-b" v-if="isUserLoggedIn">
                <div class="mb-[0.125rem] block min-h-[1.5rem] md:grid-cols-2">
                <label class="relative inline-flex items-center mb-2 cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" v-model="filterbyUserData">
                  <div class="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-200 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900">Filter by your Data</span>
                </label>
              </div>
              <div><p class="text-xs px-2">We suggest you climbing partners based on the data you provided.</p></div>
            </div>
          </div>
          <div class="p-5 mt-10">
            <h2 v-if="isUserLoggedIn" class="text-l font-bold w-full max-w-5xl mx-auto pb-6">Hello {{ name }}</h2>
            <h2 v-else class="text-l font-bold w-full max-w-5xl mx-auto pb-6"><router-link to="/login" class="text-blue-500 font-bold">Login or Register</router-link> to add yourself.</h2>
            <p class="text-xs">Calling all climbers! This app is your ultimate tool for discovering like-minded climbing buddies who share your passion and skill level.<br /><br />
                <strong>Login/Register</strong> (Optional): signing in or registering enables you to join the community as a potential climbing partner.<br /><br />
                <strong>Using the filters</strong> You have two options here. You can either search for a climbing partner by applying specific filters, or you can <strong>add yourself</strong> to our database and let us provide personalized suggestions.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="h-full mt-7">
      <div class="p-7 w-full max-w-5xl mx-auto bg-white shadow-sm rounded-sm border border-gray-200 pt-4">
        <header class="px-5 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">Climbers ({{ userCount }})</h2>
        </header>
        <div class="p-3">
          <div class="overflow-x-auto">
            <table class="table-auto w-full">
              <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Name</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Interests</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Location</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-center">Difficulty</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-center">Age</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr class="hover:bg-slate-100" v-for="user in filterUsers" :key="user.id" @click="openUserDetails(user)">
                  <td class="p-2 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="mr-2">
                        <img class="rounded-full w-8 h-8" :src="user.profileImage ? user.profileImage : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'" width="40" height="40" alt="Profile Image" />
                      </div>
                      <div class="font-medium text-teal-500">{{ user.name ? user.name : "-" }}</div>
                    </div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left max-w-xs overflow-auto">{{ user.interests ? user.interests : "-" }}</div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left font-medium">{{ user.location ? user.location : "-" }}</div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left text-center" v-if="user.climbingDifficultySport || user.climbingDifficultyBouldering">
                      <div class="">
                        <h5 v-if="user.climbingDifficultyBouldering">Boulder: <strong>{{ user.climbingDifficultyBouldering }}</strong></h5>
                        <h5 v-if="user.climbingDifficultySport">Sport: <strong>{{ user.climbingDifficultySport }}</strong></h5>
                      </div>
                    </div>
                    <div v-else class="text-left text-center">
                      -
                    </div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left text-center">{{ user.birthday ? calculateAge(user.birthday) : "-" }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import router from '../router';
import { onMounted, ref, computed, reactive, watch } from 'vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { equipmentOptions, serviceOptions, cities, difficulties } from '../constants';

const userList = reactive([]);
const name = ref('');
const currentUserEmail = ref('');
const search = ref('');
const locationSelected = ref('');
const climbingDifficultySelectedBouldering = ref('');
const climbingDifficultySelectedSport = ref('');
const email = ref('');
const userExists = ref(false);
const userDataFireStore = ref({});

const equipmentSelected = ref([]);
const serviceSelected = ref([]);


const isUserLoggedIn = ref(false);
const filterDifficulties = ref(false);
const filterbyUserData = ref(false);
const filterEqSe = ref(false);

const isActiveService = ref(false);
const isActiveEquipment = ref(false);
const collapsed = ref(false);

const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
};

const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);
  const currentDate = new Date();
  const ageDiff = currentDate - birthDate;
  const calculatedAge = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
  return calculatedAge;
};

const userCount = computed(() => {
  return filterUsers.value.length;
});

onMounted(async () => {
  // for the list
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    userList.push(doc.data());
  });

  // get the suer
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser !== null) {
    email.value = currentUser.email;

    const userQuery = query(collection(db, 'users'), where('email', '==', email.value));
    const querySnapshot = await getDocs(userQuery);
    userExists.value = !querySnapshot.empty;

    if (userExists.value) {
      const userData = querySnapshot.docs[0].data();
      Object.assign(userDataFireStore.value, userData);
    } else {
      console.log('User does not exist');
    }
  } else {
    console.log('User does not exist');
  }
});

onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    // User is authenticated
    name.value = user.email.split('@')[0];
    isUserLoggedIn.value = true;
    currentUserEmail.value = user.email; 
  } else {
    // User is not authenticated
    name.value = '';
    isUserLoggedIn.value = false;
    currentUserEmail.value = ''; 
  }
});

const filterByLocation = (user) => {
  if (locationSelected.value.length === 0) return true;
  return locationSelected.value === user.location;
};

const filterBySearch = (user) => {
  if (!search.value) {
    return true;
  }
  const lowerCaseSearch = search.value.toLowerCase();
  return user.name && user.name.toLowerCase().includes(lowerCaseSearch);
};

const filterByDifficultyBouldering = (user) => {
  if (climbingDifficultySelectedBouldering.value.length === 0) return true;
  console
  return climbingDifficultySelectedBouldering.value === user.climbingDifficultyBouldering;
};

const filterByDifficultySport = (user) => {
  if (climbingDifficultySelectedSport.value.length === 0) return true;
  return climbingDifficultySelectedSport.value === user.climbingDifficultySport;
};

const filterByEquipment = (user) => {
  if (equipmentSelected.value.length === 0) return true;
  if (!Array.isArray(user.equipmentOptions)) return false;
  return equipmentSelected.value.every(selectedOption => {
    return user.equipmentOptions.some(userOption => userOption.option === selectedOption.option);
  });
};

const filterByService = (user) => {
  if (serviceSelected.value.length === 0) return true;
  if (!Array.isArray(user.serviceOptions)) return false;
  return serviceSelected.value.every(selectedOption => {
    return user.serviceOptions.some(userOption => userOption.option === selectedOption.option);
  });
};

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].option !== arr2[i].option) {
      return false;
    }
  }
  return true;
}

const filterUsers = computed(() => {
  return userList.filter((user) => {
    if (user.email === currentUserEmail.value) {
      return false;
    }
    
    if (filterbyUserData.value) {
      if (userDataFireStore.value) {
        return (
          user.location === userDataFireStore.value.location &&
          (user.climbingDifficultyBouldering === userDataFireStore.value.climbingDifficultyBouldering || 
          user.climbingDifficultyBouldering === userDataFireStore.value.climbingDifficultyBouldering) && 
          (arraysEqual(user.equipmentOptions, userDataFireStore.value.equipmentOptions) ||
          arraysEqual(user.serviceOptions, userDataFireStore.value.serviceOptions))
        );
      } else {
        return true;
      }
    } else {
      const locationMatch = filterByLocation(user);
      const searchMatch = filterBySearch(user);
      const difficultyBoulderingMatch = filterByDifficultyBouldering(user);
      const difficultySportMatch = filterByDifficultySport(user);
      const equipmentMatch = filterByEquipment(user);
      const serviceMatch = filterByService(user);

      if (!filterDifficulties.value && !filterEqSe.value) {
      // Only locationMatch and searchMatch are required
      return locationMatch && searchMatch;
    } else if (filterDifficulties.value && !filterEqSe.value) {
      // Apply only filterDifficulties
      const difficultyMatch =
        (climbingDifficultySelectedBouldering.value && difficultyBoulderingMatch) ||
        (climbingDifficultySelectedSport.value && difficultySportMatch);
      return locationMatch && searchMatch && difficultyMatch;
    } else if (!filterDifficulties.value && filterEqSe.value) {
      // Apply only filterEqSe
      const eqSeMatch = (equipmentSelected.value.length === 0 || equipmentMatch) &&
        (serviceSelected.value.length === 0 || serviceMatch);
      return locationMatch && searchMatch && eqSeMatch;
    } else {
      // Apply both filterDifficulties and filterEqSe
      const difficultyMatch =
        (climbingDifficultySelectedBouldering.value && difficultyBoulderingMatch) ||
        (climbingDifficultySelectedSport.value && difficultySportMatch);
      const eqSeMatch = (equipmentSelected.value.length === 0 || equipmentMatch) &&
        (serviceSelected.value.length === 0 || serviceMatch);
      return locationMatch && searchMatch && difficultyMatch && eqSeMatch;
    }
    }
  });
});

const toggleDropdownService = () => {
  isActiveService.value = !isActiveService.value;
};
const toggleDropdownEquipment = () => {
  isActiveEquipment.value = !isActiveEquipment.value;
};

const openUserDetails = (user) => {
  const userRef = collection(db, 'users');
  const queryRef = query(userRef, where('email', '==', user.email));
  
  getDocs(queryRef)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        console.log('Document ID:', docId);
        router.push({ name: 'UserDetails', params: { id: docId } });
      } else {
        console.log('User document not found.');
      }
    })
    .catch((error) => {
      console.log('Error retrieving user document:', error);
    });
};

watch([climbingDifficultySelectedBouldering, climbingDifficultySelectedSport, equipmentSelected, serviceSelected], () => {
  if (!climbingDifficultySelectedBouldering.value && !climbingDifficultySelectedSport.value) {
    filterDifficulties.value = false;
    
  } else {
    filterDifficulties.value = true;
  }

  if (equipmentSelected.value.length === 0 && serviceSelected.value.length === 0) {
    filterEqSe.value = false;
    
  } else {
    filterEqSe.value = true;
  }
});
</script>