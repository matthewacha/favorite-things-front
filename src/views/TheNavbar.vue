<template>
  <div id="nav">
    <div id="logoDiv">
      <img id="imageIcon" alt="appIcon" src="../assets/appIcon.svg">
    </div>
    <div >
      <v-app v-if="getError" id="inspire">
        <div>
          <v-alert :value="true" color="error">{{getError}}</v-alert>
        </div>
      </v-app>
    </div>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>-->
  </div>
</template>

<script>
export default {
    name: 'navbar',
    props: () => ({
        getError: { type: Function}
    }),
}
</script>

