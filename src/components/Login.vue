<template>
  <div class="login">
    <div class="login-frame">
      <div class="login-frame-title">
        <div>Login to follow your favorite things</div>
      </div>
      <div class="login-frame-body">
        <v-form ref="form" id="form-name" v-model="valid" lazy-validation>
          <v-text-field id="login-input" v-model="name" :rules="nameRules" label="Name" :counter="10" required></v-text-field>

          <v-btn :disabled="!valid" color="success" @click="validate" >login</v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import userService from '@/services/userService';
import router from '@/router';

export default {
  name: 'Login',
  props: {},
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters',
    ],
  }),
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.$refs.form.$el[0].value,
        };
        try {
          const response = await userService.postUser(data);
          this.$store.dispatch('user', response.data);
          localStorage.setItem('userObject', JSON.stringify(response.data));
          router.push('/favorites');
        } catch (e) {
          this.$store.dispatch('userError', e.message);
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.login {
  height: inherit;
  align-content: center;
  width: 100%;
  text-align: center;
  background-image: url("../assets/funFront.jpg");
  .login-frame {
    height: 40%;
    width: 40%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    background-color: #2c3e5012;
    &-title {
      height: 20%;
      color: #fffcdb;
      font-weight: 500;
      font-size: 2em;
      padding-top: 40px;
    }
    &-body {
      padding: 10 !important;
      #form-name {
        margin: 20px;
        margin-top: 60px;
      }
    }
  }
}
.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background-color: #2b3e50 !important;
}
</style>
