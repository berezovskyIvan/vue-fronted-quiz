<template lang="pug">
  .login-button(v-if="wasCheckedAuthStatus")
    .login-button__icon
      img(src="../../images/auth/google-logo.svg")
    google-login(:params="params" :logoutButton="isSignedIn" :onSuccess="onSuccess" :onFailure="onFailure")
      | {{ googleLoginButtonText }}
</template>

<script>
  import config from '#/config'
  import { mapState } from 'vuex'
  import GoogleLogin from 'vue-google-login'

  export default {
    name: 'GoogleAuthButton',
    components: {
      GoogleLogin
    },
    data () {
      return {
        params: {
          client_id: config.google.clientId
        },
        googleLoginButtonSignInVal: 'Sign in with Google',
        googleLoginButtonSignOutVal: 'Sign out',
      }
    },
    computed: {
      ...mapState({
        wasCheckedAuthStatus: state => state.auth.wasCheckedStatus,
        isSignedIn: state => state.auth.isSignedIn
      }),
      googleLoginButtonText () {
        return this.isSignedIn ?
          this.googleLoginButtonSignOutVal :
          this.googleLoginButtonSignInVal
      }
    },
    methods: {
      onSuccess (currentUser) {
        let authInfo = {
          isSignedIn: false,
          currentUser: {
            Ea: '',
            wc: {}
          }
        }

        if (currentUser) {
          authInfo.isSignedIn = true
          authInfo.currentUser = currentUser
        }

        const routeName = currentUser ? 'dashboard' : 'main'
        this.$store.dispatch('auth/updateCheckedStatus', true)
        this.$store.dispatch('auth/updateInfo', authInfo)
        this.$router.push({ name: routeName })
      },
      onFailure (error) {
        console.error(error)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .login-button {
    display: flex;
    height: 50px;

    &__icon {
      @include flex-center;
      width: 50px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background: white;

      img {
        width: 25px;
        height: 25px;
      }
    }

    button {
      border: none;
      outline: none;
      font-size: 20px;
      padding-left: 20px;
      padding-right: 20px;
      background-color: white;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: pointer;
      color: $color-black;
    }
  }
</style>
