<template>
  <div class="login">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';

export default {
  name: 'login',
  components: {
    Login,
  },
};
</script>
<style lang="scss">
 .login{
   height: 775px;
 }
</style>
