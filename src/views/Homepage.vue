<script setup>

</script>

<template>
    <div class="background_home"></div>
    <div class="flicker"><img class="animation" src="../assets/lights.gif" alt="gif" /></div>

</template>

<style scoped>
.background_home {
  position: fixed;
  width: 86vw;
  height: 100vh;
  background-image: url('../assets/back_home.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-left: 14%;
  position: fixed;
}
.animation {
  opacity: 0.5;
}
</style>