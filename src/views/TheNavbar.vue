<template>
  <div id="nav">
    <div id="logoDiv">
      <img id="imageIcon" alt="appIcon" src="../assets/appIcon.svg">
    </div>
    <div :class="notification || 'notification'">
      <v-app id="inspire">
          <v-alert id="alert-pane" :value="true" :color="color">{{message}}</v-alert>
      </v-app>
    </div>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>-->
  </div>
</template>

<script>
import { serverBus } from "@/main";

export default {
    name: 'navbar',
    props: () => ({
        notification: String,
        color: String,
        message: String
    }),
    beforeUpdate(){
        console.log('thisone', this)
    },
    data: () => ({
    error: "",
    message: this.message,
    value: false,
    // notification: 'notification-active',
    // color: ''
  }),
}
</script>
<style lang="scss" scoped>
#alert-pane {
    margin: 0;
    z-index: 2;
}
.notification {
    display: none;
    &-active{
        margin: 0 auto;
        width: 10%;
        flex: 1 1 100;
        position: relative;
        top: 6px;
    }
}
</style>


