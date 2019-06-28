<template>
  <v-card v-if="favoriteItem">
    <v-card-title primary-title>
      <div id="description-head">
        <h3 class="headline mb-0 description-title">Description</h3>
        <div class="description">{{favoriteItem.description}}</div>
      </div>
    </v-card-title>
    <v-card-title primary-title>
      <div class="mb-0">
        Added on:
        <div>{{new Date(favoriteItem.created_at)}}</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="red" @click="delFavorite">Delete</v-btn>
      <v-btn flat color="blue" @click="editFavorite">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import favoriteService from '@/services/favoriteService';
import { serverBus } from '../main';

export default {
  name: "favoritelist",
  props: {
    favoriteItem: Object
  },
  data: () => ({}),
  methods: {
      async delFavorite(e){
          e.preventDefault();
          this.$store.dispatch('delFavPending', this.favoriteItem);
          try{
              const response = await favoriteService.deleteFavorite(this.favoriteItem);
            //   this.$store.dispatch('delFavConfirm', this.favoriteItem)
              await serverBus.$emit("submitFavorite")
          }catch(e){
              this.$store.dispatch('userError', e.message)
          }
      },
      editFavorite(e){
          e.preventDefault();
          serverBus.$emit('editFavorite', this.favoriteItem)
      }
  }
};
</script>

<style lang="scss" scoped>
.description {
    font-size: 1.5em;
    font-family: roboto;
    font-weight: 500;
    color: #808080d9;
}
.description-title {
    font-size: 1.3em !important;
    font-weight: 600;
    color: #6d6c6c;
    border-top: 1.5px solid #e3d9d9;
}
#description-head {
    width: 100%;
}
</style>

