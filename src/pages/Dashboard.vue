<template lang="pug">
  .dashboard(v-if="showPage")
    h1(class="dashboard__title") Панель администрирования
    google-auth-button(class="dashboard__logout-button")
</template>

<script>
  import AuthMixin from '@/mixins/auth'
  import GoogleAuthButton from '@/components/auth/GoogleAuthButton'

  export default {
    name: 'Dashboard',
    mixins: [AuthMixin],
    components: {
      GoogleAuthButton
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/global';

  .dashboard {
    &__title {
      @include flex-center;
      font-size: 30px;
    }

    &__logout-button {
      position: absolute;
      right: 50px;
      top: 20px;
    }
  }
</style>
