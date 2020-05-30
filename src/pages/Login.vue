<template lang="pug">
  .login-button
    .login-button__icon
      img(src="../images/auth/google-logo.svg")
    google-login(:params="params" :onSuccess="onSuccess" :onFailure="onFailure")
      | Sign in with Google
    //google-login(:params="params" :logoutButton="true" :onSuccess="onSuccess" :onFailure="onFailure")
</template>

<script>
import config from '#/config'
import GoogleLogin from 'vue-google-login'

export default {
  name: 'Login',
  components: {
    GoogleLogin
  },
  data () {
    return {
      params: {
        client_id: config.google_client_id
      }
    }
  },
  methods: {
    onSuccess (data) {
      console.log('success event: ', data)
      this.$router.push({ name: 'dashboard' })
    },
    onFailure (error) {
      console.log('error', error)
      console.error('Auth error: ', error)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/global';

.login-button {
  display: flex;
  width: 300px;
  height: 50px;
  margin-top: 50px;
  margin-left: 50px;

  &__icon {
    @include flex-center;
    width: 50px;
    border: 2px solid $color-blue;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;

    img {
      width: 25px;
      height: 25px;
    }
  }

  #google-signin-btn-0 {
    width: 250px;
    border: none;
    outline: none;
    font-size: 20px;
    font-weight: bold;
    background-color: $color-blue;
    color: $color-white;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
  }
}
</style>
