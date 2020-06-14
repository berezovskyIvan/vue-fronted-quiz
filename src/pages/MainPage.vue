<template lang="pug">
  .main-page
    h1 Quizzes
    .quizzes
      quiz-dashboard(v-for="(item, index) in quizzes" :key="index" :item="item")
</template>

<script>
  import QuizDashboard from '@/pages/MainPage/QuizDashboard'
  import { mapState } from 'vuex'

  export default {
    name: 'MainPage',
    components: {
      QuizDashboard
    },
    computed: {
      ...mapState({
        quizzes: state => state.quiz.list
      })
    }
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
