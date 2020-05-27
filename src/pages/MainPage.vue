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
@import '../styles/global';

.main-page {
  @include flex-center;

  h1 {
    font-size: 30px;
  }
}
</style>
