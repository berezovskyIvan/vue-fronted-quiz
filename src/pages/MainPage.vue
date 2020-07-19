<template lang="pug">
  .main-page
    h1 Quizzes
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

<style lang="scss" scoped>
@import '~s/global';

.main-page {
  padding-left: 50px;
  padding-right: 50px;

  h1 {
    @include justify-center;
    font-size: 30px;
  }
}
</style>
