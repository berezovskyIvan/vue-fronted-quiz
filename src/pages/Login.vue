<template lang="pug">
  .login
    google-auth-button
</template>

<script>
  import GoogleAuthButton from '@/components/auth/GoogleAuthButton'

  export default {
    name: 'Login',
    components: {
      GoogleAuthButton
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/global';

  .login {
    padding-top: 50px;
    padding-left: 50px;
  }
</style>
