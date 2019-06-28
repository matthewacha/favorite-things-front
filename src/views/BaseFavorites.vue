<template>
  <div class="favorites">
    <Favorites />
  </div>
</template>

<script>
// @ is an alias to /src
import Favorites from '@/components/FavoriteDashboard.vue';

export default {
  name: 'favorites',
  components: {
    Favorites,
  },
};
</script>
<style lang="scss">
 .favorites{
   height: 775px;
 }
</style>
