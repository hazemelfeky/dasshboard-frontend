<template>
  <div class="splash">
    <div class="splash--up">
      <img src="../assets/splash.gif" class="gif" alt="a nice gif" loop="false" />
      <img src="../assets/logo.png" alt="word logo" />
    </div>
    <router-link class="splash--down" to="/login">Get Started</router-link>
  </div>
</template>

<script>
export default {
  name: "SplashView",
};
</script>
