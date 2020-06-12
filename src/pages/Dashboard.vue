<template lang="pug">
  .dashboard(:class="{ 'dashboard--loading': loading }")
    template(v-if="loading")
      i-loader
    template(v-else)
      .dashboard__content
        .dashboard__content__title
          h1.dashboard__content__title__value Панель администрирования
          google-auth-button.dashboard__content__title__logout-button
        .dashboard__content__body
          i-button.dashboard__content__body__test-el-button(value="Создать тест" height="50px" background-color="#f5f5f5" @click="openModal")
        my-quizzes
</template>

<script>
  import AuthMixin from '@/mixins/auth'
  import ILoader from '@/components/IComponents/ILoader'
  import IButton from "@/components/IComponents/IButton"
  import GoogleAuthButton from '@/components/auth/GoogleAuthButton'
  import MyQuizzes from '@/pages/Dashboard/MyQuizzes'
  import TestEl from '@/pages/Dashboard/TestEl'

  export default {
    name: 'Dashboard',
    mixins: [AuthMixin],
    components: {
      ILoader,
      IButton,
      MyQuizzes,
      GoogleAuthButton
    },
    data () {
      return {
        testElShow: false
      }
    },
    methods: {
      openModal () {
        const obj = {
          isOpen: true,
          width: 700,
          component: TestEl
        }

        this.$store.dispatch('modal/open', obj)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .dashboard {
    &--loading {
      @include flex-center;
      height: 100%;
    }

    &__content {
      &__title {
        margin-bottom: 50px;

        &__value {
          @include flex-center;
          font-size: 30px;
        }

        &__logout-button {
          position: absolute;
          right: 50px;
          top: 20px;
        }
      }

      &__body {
        display: flex;
        padding-right: 50px;
        padding-left: 50px;

        &__test-el-button {
          margin-left: auto;
        }
      }
    }
  }
</style>
