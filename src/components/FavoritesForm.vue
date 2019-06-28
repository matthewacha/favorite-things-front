<template>
  <div>
    <div class="form-title">
      <v-card-title id="form-title-card" primary-title>
        <div class="favo-title">ADD NEW FAVORITE</div>
      </v-card-title>
    </div>
    <v-form ref="form" id="form-name" v-model="valid" lazy-validation>
      <v-text-field
        v-model="title"
        :rules="titleRules"
        label="Title"
        :counter="10"
        required
        color="deep-purple"
      ></v-text-field>
      <v-text-field
        v-model="description"
        :rules="descriptionRules"
        label="Description"
        :counter="250"
        required
        color="deep-purple"
      ></v-text-field>

      <v-layout row>
        <v-flex class="pr-3">
          <v-slider label="Ranking" v-model="ranking" :max="max" :min="min"></v-slider>
        </v-flex>

        <v-flex shrink style="width: 60px">
          <v-text-field v-model="ranking" class="mt-0" hide-details single-line type="number"></v-text-field>
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
        rows="1"
        :counter="250"
      ></v-textarea>
      <v-btn :disabled="!valid" color="success" @click="validateAndSubmit">submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import favoriteService from "@/services/favoriteService";

export default {
  name: "favoriteform",
  data() {
    return {
      categories: ["person", "place", "food"],
      valid: false,
      min: 0,
      max: 10,
      ranking: 0,
      title: "",
      titleRules: [
        v => !!v.trim() || "Name is required",
        v => (v && v.length <= 20) || "Name must be less than 20 characters"
      ],
      description: "",
      descriptionRules: [
        v => !!v.trim() || "Description is required",
        v =>
          (v && v.length <= 250) ||
          "Description must be less than 250 characters"
      ],
      metadata: undefined,
      active: undefined,
      filter: ""
    };
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
          const pending = { ...formData, created_at: Date.now() };
          this.$store.dispatch("postFavPending", pending);
        //   const response = favoriteService.postFavorite(formData);
        //   this.$store.dispatch("postFavData", response.data);
        } catch (error) {
          // this.$store.dispatch("postFavError", response.data);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background-color: #2b3e50;
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
.favo-title{
    margin: 0 auto;
    color: white;
}
#form-title-card{
    height: 100%;
}
</style>

