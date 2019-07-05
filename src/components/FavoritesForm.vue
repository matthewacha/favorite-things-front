<template>
  <div>
    <v-form ref="form" id="form-name" v-model="valid" lazy-validation>
      <v-text-field
        v-model="title"
        :rules="titleRules"
        label="Title"
        :counter="20"
        required
        color="deep-purple"
      ></v-text-field>
      <v-textarea
        v-model="description"
        :rules="descriptionRules"
        label="Description"
        :counter="250"
        rows="3"
        required
        auto-grow
        box
        color="deep-purple"
      ></v-textarea>

      <v-layout row>
        <v-flex class="pr-3">
          <v-slider label="Ranking" v-model="ranking" :max="max" :min="min"></v-slider>
        </v-flex>

        <v-flex shrink style="width: 60px">
          <v-text-field
          v-model="ranking"
          class="mt-0"
          hide-details single-line type="number"></v-text-field>
        </v-flex>
      </v-layout>

      <v-radio-group v-model="active">
        <template v-slot:label>
          <div>Category</div>
        </template>
        <v-radio v-for="(category,i) in categories" :key="i" :value="category.substr(0,2)">
          <template v-slot:label>
            <div>{{category}}</div>
          </template>
        </v-radio>
      </v-radio-group>
      <v-textarea
        v-model="metadata"
        auto-grow
        box
        color="deep-purple"
        label="Other"
        rows="3"
        :counter="250"
      ></v-textarea>
      <v-btn :disabled="!valid" color="success" @click="validateAndSubmit">submit</v-btn>
      <v-btn id="cancel-edit" @click="revertEdit">dismiss</v-btn>
    </v-form>
  </div>
</template>

<script>
import favoriteService from '@/services/favoriteService';
import { serverBus } from '../main';

export default {
  name: 'favoriteform',
  props: {},
  beforeUpdate() {
    serverBus.$on('editFavorite', (editedFavorite) => {
      this.title = editedFavorite.title;
      this.description = editedFavorite.description;
      this.ranking = editedFavorite.ranking;
      this.metadata = JSON.parse(editedFavorite.metadata) !== null
        ? JSON.parse(editedFavorite.metadata).split('"')[0]
        : '';
      this.favoriteId = editedFavorite.id;
      this.userId = editedFavorite.customuser;
      this.active = editedFavorite.category;
      this.edit = true;
      this.created_at = editedFavorite.created_at;
    });
  },
  data() {
    return {
      edit: false,
      formType: 'post',
      userId: undefined,
      favoriteId: undefined,
      created_at: undefined,
      editedFavorite: {},
      categories: ['person', 'place', 'food'],
      valid: false,
      min: 0,
      max: 10,
      ranking: 0,
      title: this.editedFavorite || '',
      titleRules: [
        v => !!v.trim() || 'Title is required',
        v => (v && v.length <= 20) || 'Title must be less than 20 characters',
      ],
      description: '',
      descriptionRules: [
        v => !!v.trim() || 'Description is required',
        v => (v && v.length <= 250)
          || 'Description must be less than 250 characters',
      ],
      metadata: undefined,
      active: undefined,
      filter: '',
    };
  },
  methods: {
    async validateAndSubmit() {
      if (this.$refs.form.validate()) {
        const formData = {
          customuser: JSON.parse(localStorage.getItem('userObject')).user.id,
          title: this.title,
          description: this.description,
          ranking: this.ranking,
          category: this.active,
          metadata: JSON.stringify(this.metadata),
        };
        let editedFavorite;
        try {
          if (!this.edit) {
            const pending = { ...formData, created_at: Date.now() };
            this.$store.dispatch('postFavPending', pending);
            const response = await favoriteService.postFavorite(formData);
            this.$notify({
              text: `${this.title} has been added successfully`,
              type: 'success',
            });
          } else {
            editedFavorite = {
              ...formData,
              id: this.favoriteId,
            };
            this.$store.dispatch('editFavPending', editedFavorite);
            const response = await favoriteService.editFavorite(editedFavorite);
            serverBus.$emit('submitFavorite');
            this.$notify({
              text: `${this.title} has been edited successfully`,
              type: 'success',
            });
            this.edit = false;
            serverBus.$emit('editSuccess', response);
            serverBus.$emit('revertEdit');
          }
          this.revertEdit();
          serverBus.$emit('submitFavorite');
        } catch (error) {
          this.$notify({
              text: error.response.data.message,
              type: 'error',
            });
          this.revertEdit();
          this.$store.dispatch('postFavError', error.error);
        }
      }
    },
    revertEdit() {
      this.title = '';
      this.description = '';
      this.ranking = 0;
      this.metadata = undefined;
      this.cardTitle = 'ADD NEW FAVORITE';
      this.favoriteId = undefined;
      this.userId = undefined;
      this.active = undefined;
      this.edit = undefined;
      serverBus.$emit('revertEdit');
    },
  },
};
</script>

<style lang="scss">
.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background-color: #2b3e50;
}
#cancel-edit {
  background-color: #f35c52 !important;
  color: white;
}
.form-title {
  height: 90px;
  color: #664d4d;
  font-size: 1.5em;
  background-color: #00bdd4;
  font-weight: 700;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.favo-title {
  margin: 0 auto;
  color: white;
}
#form-title-card {
  height: 100%;
}
</style>
