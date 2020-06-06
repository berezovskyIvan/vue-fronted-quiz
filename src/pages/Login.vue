<template lang="pug">
  .login(:class="{ 'login--loading': loading }")
    template(v-if="loading")
      i-loader
    template(v-else)
      google-auth-button
</template>

<script>
  import AuthMixin from '@/mixins/auth'
  import ILoader from '@/components/IComponents/ILoader'
  import GoogleAuthButton from '@/components/auth/GoogleAuthButton'

  export default {
    name: 'Login',
    mixins: [AuthMixin],
    components: {
      ILoader,
      GoogleAuthButton
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .login {
    padding-top: 50px;
    padding-left: 50px;

    &--loading {
      @include flex-center;
      height: 100%;
    }
  }
</style>
