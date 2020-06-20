<template lang="pug">
  .my-quizzes
    my-quiz(v-for="(item, index) in myQuizzes" :key="index" :item="item")
</template>

<script>
  import MyQuiz from './MyQuiz'
  import { mapState } from 'vuex'

  export default {
    name: 'MyQuizzes',
    components: {
      MyQuiz
    },
    computed: {
      ...mapState({
        myQuizzes: state => state.quiz.my
      })
    }
  }
</script>

<style lang="scss" scoped>
  .my-quizzes {
    padding-left: 50px;
  }
</style>
