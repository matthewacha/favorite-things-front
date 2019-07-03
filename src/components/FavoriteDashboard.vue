<template>
  <div class="favorite-dash">
    <div class="favorite-dash_panel">
      <div class="favorite-dash_panel--left">
        <v-expansion-panel v-model="panelForm" expand>
          <v-expansion-panel-content expand-icon>
            <template v-slot:header>
              <div class="form-title">
                <v-card-title id="form-title-card" primary-title>
                  <div class="favo-title">{{cardTitle}}</div>
                </v-card-title>
              </div>
            </template>
            <v-card>
              <v-card-text class="form-override">
                <FavoriteForm v-bind:editedFavorite="editedFavorite"/>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <FilterPane/>
      </div>
      <div class="favorite-dash_panel--right">
        <div>
            <v-card id="no-favs" v-if="favoritesList.length == 0">
              <v-card-title id="no-fav-title" primary-title>
                <div class="no-fav-description" id="description-head">
                  <h3
                    class="headline mb-0 description-title"
                  >You have no favorites, start by adding one!</h3>
                </div>
              </v-card-title>
            </v-card>
        </div>
        <v-expansion-panel v-model="panel">
          <v-expansion-panel-content
            v-for="(item,i) in getsFavoritesList || favoritesList"
            :key="i"
          >
            <template v-slot:header>
              <h2 class="headline mb-0 item-title">{{item.title.toUpperCase()}}</h2>
              <div v-if="edited.value && edited.favId === item.id ">edited</div>
              <v-rating
                v-model="item.ranking"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$vuetify.icons.ratingFull"
                half-increments
                readonly
              ></v-rating>
            </template>
            <FavoriteList @editFavorite="editFavorite" v-bind:favoriteItem="item"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import { serverBus } from '../main';
import favoriteService from '@/services/favoriteService';
import FavoriteForm from '@/components/FavoritesForm.vue';
import FavoriteList from '@/components/FavoriteList.vue';
import FilterPane from '@/components/FilterPane.vue';

export default {
  name: 'Favorites',
  components: {
    FavoriteForm,
    FavoriteList,
    FilterPane,
  },
  props: {},
  data() {
    return {
      favoritesList: [],
      panel: 0,
      panelForm: -1,
      editedFavorite: {},
      edited: { value: false, favId: 0 },
      cardTitle: 'ADD NEW FAVORITE',
    };
  },
  async beforeUpdate() {
    serverBus.$on('editFavorite', (editedFavorite) => {
      this.cardTitle = 'EDIT NEW FAVORITE';
      this.panelForm = 0;
    });

    await serverBus.$on('submitFavorite', async () => {
      await this.fecthFavorites();
    });

    serverBus.$on('revertEdit', () => {
      this.cardTitle = 'ADD NEW FAVORITE';
      this.panelForm = -1;
    });
  },
  async updated() {
    await serverBus.$on('filterFavos', async () => {
      await this.fecthFavorites();
    });
  },
  async mounted() {
    this.valid = false;
    await this.fecthFavorites();
    this.getFavoritesList();
  },
  methods: {
    async fecthFavorites() {
      const userId = JSON.parse(localStorage.getItem('userObject')).user.id;
      const getFavorites = await favoriteService.getFavorites(userId);
      this.$store.dispatch('favoritesList', getFavorites.data);
    },
    getFavoritesList() {
      const favorites = this.$store.getters.favoritesList;
      this.favoritesList = favorites;
    },
    editFavorite(data) {
      this.editedFavorite = data;
    },
    blurComponent() {
      this.panel = 0;
    },
  },
  computed: {
    getsFavoritesList() {
      const favorites = this.$store.getters.favoritesList;
      this.favoritesList = favorites;
    },
    isEdited() {
      const { edited } = this.$store.state;
      this.edited = edited;
    },
  },
};
</script>

<style lang="scss">
.no-fav-description{
  margin: 0 auto;
  font-weight: 600;
  color: #706e6e;
}
#no-favs {
  height: 200px;
}
  #no-fav-title{
    height: inherit;
  }
.item-title {
  font-size: 1.3em !important;
  font-weight: 700;
  color: #555353;
  text-decoration: capitalize;
  width: 340px !important;
}
.mb-0 {
  margin-bottom: 0 !important;
}
#app > div.favorites > div > div > div.favorite-dash_panel--right > ul {
  border: 1px solid #e3e3e3;
}
.favorite-dash {
  height: 100%;
  background-color: white;
  &_panel {
    height: 100%;
    background-color: #7a7c7e1c;
    width: 80%;
    margin: 0 auto;
    display: inline-flex;
    &--left {
      width: 30%;
      max-height: 100%;
      margin-top: 20px;
      margin-left: 20px;
      margin-bottom: 20px;
      overflow-x: auto;
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
  background-color: #e0f1ff !important;
}
</style>
