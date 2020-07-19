<template lang="pug">
  .login(:class="{ 'login--loading': authLoading }")
    template(v-if="authLoading")
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
  components: {
    ILoader,
    GoogleAuthButton
  },
  mixins: [AuthMixin]
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
