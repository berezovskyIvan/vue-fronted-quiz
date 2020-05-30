<template lang="pug">
  .dashboard
    h1 Панель администрирования
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="scss" scoped>
@import '../styles/global';

h1 {
  @include flex-center;
  font-size: 30px;
}
</style>
