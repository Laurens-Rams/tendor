<script setup>

</script>

<template>
    <h1>404 - Page not found</h1>
    <div class="background_about"></div>
</template>

<style scoped>
.background_about {
  position: fixed;
  width: 86vw;
  height: 100vh;
  background-image: url('../assets/not_found.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-left: 14%;
  position: fixed;
}

h1 {
    color: #595474;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    z-index: 10;
    font-size: 4vw;
    font-family: 'Amsi';
}

</style>