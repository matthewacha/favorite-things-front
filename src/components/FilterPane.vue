<template>
  <v-card id="filter-card">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0 filter-title">FILTER FAVORITES</h3>
      </div>
    </v-card-title>
    <div class="filter-types">
      <div class="filter-types-title">By Category</div>
      <div class="category-checkbox">
        <v-checkbox
          v-model="filterCriteria.categories"
          color="primary"
          v-for="(category,i) in categories"
          :key="i"
          :label="category"
          :value="category.substr(0,2)"
        ></v-checkbox>
      </div>
      <div class="filter-types-title">By Ranking</div>
      <v-layout row>
        <v-flex class="pr-3">
          <v-slider v-model="filterCriteria.ranking" :max="max" :min="min"></v-slider>
        </v-flex>

        <v-flex shrink style="width: 60px">
          <v-text-field
            v-model="filterCriteria.ranking"
            :max="max"
            :min="min"
            class="mt-0"
            hide-details
            single-line
            type="number"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </div>
    <v-card-actions>
      <v-btn flat color="blue" :disabled="!valid" @click="filterFav">filter</v-btn>
      <v-btn flat color="red" :disabled="!valid" @click="clearFilter">clear</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { serverBus } from '../main';

export default {
  name: 'FilterPane',
  data: () => ({
    categories: ['person', 'place', 'food'],
    active: undefined,
    filterCriteria: {
      categories: [],
      ranking: undefined,
    },
    min: 0,
    max: 10,
    valid: false,
  }),
  updated(){
    this.validateForm()
  },
  methods: {
    async filterFav() {
      await serverBus.$emit('filterFavos');
      this.$store.dispatch('clearFilter');
      const filterParams = Object.keys(this.filterCriteria).map(criteria => ({
        name: criteria,
        value: this.filterCriteria[criteria],
      }));
      this.$store.dispatch('filterFav', filterParams);
    },
    clearFilter() {
      this.filterCriteria.categories = []
      this.filterCriteria.ranking = 0
      this.valid = false
      this.$store.dispatch('clearFilter');
      serverBus.$emit('resetFilterFavos');
    },
    validateForm(){
      const rank = this.filterCriteria.ranking
      const ranking = typeof rank !== undefined && rank > 0 ;
      const category = this.filterCriteria.categories.length > 0;
      this.valid = ranking || category;
  },
},}
</script>

<style lang="scss" scoped>
#filter-card {
  margin-top: 20px;
  border-right: 2px solid #e3e3e3;
  border-left: 2px solid #e3e3e3;
  border-top: 2px solid #e3e3e3;
}
.filter-title {
  font-weight: 600;
  color: #706e6e;
}
.filter-types {
  padding: 20px;
}
.filter-types-title {
  text-align: -webkit-auto;
  font-size: 1.2em;
  font-weight: 500;
  color: #7c7e80;
}
.category-checkbox {
  display: inline-flex;
  width: 100%;
}
</style>
