<template>
  <div class="login">
    <Favorites />
  </div>
</template>

<script>
// @ is an alias to /src
import Favorites from '@/components/FavoriteList.vue';

export default {
  name: 'favorites',
  components: {
    Favorites,
  },
};
</script>
<style lang="scss">
 .login{
   height: 775px;
 }
</style>
