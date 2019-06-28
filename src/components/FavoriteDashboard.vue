<template>
  <div class="favorite-dash">
    <div class="favorite-dash_panel">
      <div class="favorite-dash_panel--left">
        <v-card>
          <v-card-text class="form-override ">
            <FavoriteForm/>
          </v-card-text>
        </v-card>
      </div>
      <div class="favorite-dash_panel--right">
        <v-expansion-panel v-model="panel" expand>
          <v-expansion-panel-content v-for="(item,i) in getsFavoritesList || favoritesList" :key="i">
            <template v-slot:header>
              <h2 class="headline mb-0 item-title">{{item.title.toUpperCase()}}</h2>
              <v-rating
                v-model="item.ranking"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$vuetify.icons.ratingFull"
                half-increments
                readonly
              ></v-rating>
            </template>
            <FavoriteList v-bind:favoriteItem="item"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import favoriteService from "@/services/favoriteService";
import FavoriteForm from "@/components/FavoritesForm.vue";
import FavoriteList from "@/components/FavoriteList.vue";

export default {
  name: "Favorites",
  components: {
    FavoriteForm,
    FavoriteList
  },
  props: {},
  data() {
    return {
      favoritesList: [],
       panel: 0,
    };
  },
  async mounted() {
    this.valid = false;
    const userId = JSON.parse(localStorage.getItem("userObject")).user.id;
    const getFavorites = await favoriteService.getFavorites(userId);
    this.$store.dispatch("favoritesList", getFavorites.data);
    this.getFavoritesList();
  },
  methods: {
    validateAndSubmit() {
      if (this.$refs.form.validate()) {
        const formData = {
          customuser: JSON.parse(localStorage.getItem("userObject")).user.id,
          title: this.title,
          description: this.description,
          ranking: this.ranking,
          category: this.active,
          metadata: JSON.stringify(this.metadata)
        };
        try {
          const response = favoriteService.postFavorite(formData);

          // this.$store.dispatch("postFavData", response.data);
        } catch (error) {
          // this.$store.dispatch("postFavError", response.data);
        }
      }
    },
    getFavoritesList() {
      const favorites = this.$store.getters.favoritesList;
      this.favoritesList = favorites;
    },
    editItem() {},
    deleteItem() {}
  },
  computed: {
    userObject() {
      const value = this.$store.state.userData.user
        ? this.$store.state.userData.user.name
        : "";

      return value;
    },
    getsFavoritesList() {
      const favorites = this.$store.getters.favoritesList;
      this.favoritesList = favorites
      console.log('hehehehehe')
      // return favorites;
    },
  }
};
</script>

<style lang="scss">
.item-title {
    font-size: 1.3em !important;
    font-weight: 700;
    color: #555353;
    text-decoration: capitalize;
    width: 340px !important;
}
.mb-0 {
    margin-bottom: 0!important;
}
#app > div.favorites > div > div > div.favorite-dash_panel--right > ul{
  border: 1px solid #e3e3e3;
}
.favorite-dash {
  height: 100%;
  background-color: white;
  &_panel {
    height: 100%;
    background-color:#7a7c7e1c;
    width: 80%;
    margin: 0 auto;
    display: inline-flex;
    &--left {
      width: 30%;
      max-height: 100%;
      margin-top: 20px;
      margin-left: 20px;
      margin-bottom: 20px;
    }
    &--right {
      width: 70%;
      max-height: 100%;
      padding-left: 2%;
      overflow-x: auto;
      margin-top: 20px;
      margin-right: 20px;
      margin-bottom: 20px;
      &__details {
        min-height: 50%;
        flex: -1 1 100%;
        background-color: black;
        width: 100%;
      }
    }
  }
}
.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background-color: #2b3e50 !important;
}
.form-override {
  background-color: #e0f1ff!important;
}
</style>

