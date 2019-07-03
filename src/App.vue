<template>
  <div id="app">
    <Navbar :alertColor="color"/>
    <notifications position="top center" />
    <router-view/>
  </div>
</template>
<script>
import { serverBus } from '@/main';
import Navbar from '@/views/TheNavbar.vue';

export default {
  name: 'app',
  components: {
    Navbar,
  },
  data: () => ({
    error: '',
    message: '',
    value: false,
    notification: '',
    color: '',
  }),
  methods: {
    getError() {
      const value = this.$store.state.responseMessage
        ? this.$store.state.responseMessage
        : '';
      this.message = value;
      return value;
    },
  },
  beforeUpdate() {
    serverBus.$on('editSuccess', (message) => {
      this.message = 'Successfully edited';
      this.value = true;
      this.notification = 'notification-active';
      this.color = 'success';
      this.message = 'Successfully edited';
    });
  },
  computed: {
    userObject() {
      const value = this.$store.state.userData.user
        ? this.$store.state.userData.user.name
        : '';

      return value;
    },
  },
};
</script>


<style lang="scss">
  .notification-title {
    // Style for title line 
  }
 
  .notification-content {
    // Style for content
    font-size: 1.25em;
  }

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 5px;
  width: 100%;
  height: 40px;
  background-color: #2c3e50;
  #logoDiv {
    height: 30px;
    width: 30px;
    align-self: center;
    #imageIcon {
      height: inherit;
      width: 30px;
    }
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
