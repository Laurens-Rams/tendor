<script setup>
</script>

<template>
  <header>
    <nav class="sidebar_left">
      <ul>
        <li><router-link to="/"><button>Home</button></router-link></li>
        <li><router-link to="/Cards"><button>Cards</button></router-link></li>
        <li><router-link to="/About"><button>Family</button></router-link></li>
      </ul>
    </nav>
  </header>
  <main>
    <router-view></router-view> 
  </main>
</template>

