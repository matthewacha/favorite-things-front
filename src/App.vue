<template>
  <div id="app">
    <Navbar :getError="getError"/>
    <router-view/>
  </div>
</template>
<script>
import Navbar from "@/views/TheNavbar.vue";
export default {
  components: {
    Navbar
  },
  data: () => ({
    error: ""
  }),
  methods: {
        getError(){
      const value = this.$store.state.userError
        ? this.$store.state.userError
        : '';
        console.log('mmmmmmm', value)
      this.error = value
      return value;
    }
  },
  computed: {
    userObject() {
      const value = this.$store.state.userData.user
        ? this.$store.state.userData.user.name
        : "";

      return value;
    }
  }
};
</script>


<style lang="scss">
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
