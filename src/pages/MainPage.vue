<template lang="pug">
  .main-page
    h1 WELCOME TO PROJECT
</template>

<script>
  export default {
    name: 'MainPage'
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .main-page {
    @include justify-center;

    h1 {
      font-size: 30px;
    }
  }
</style>
