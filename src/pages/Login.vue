<template lang="pug">
  .login
    h1 LOGIN
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss" scoped>
@import '../styles/global';

.login {
  @include flex-center;

  h1 {
    font-size: 30px;
  }
}
</style>
