<template lang="pug">
  .my-quizzes
    my-quiz(v-for="(item, index) in myQuizzes" :key="index" :item="item")
</template>

<script>
  import MyQuiz from './MyQuiz'
  import { mapGetters } from 'vuex'

  export default {
    name: 'MyQuizzes',
    components: {
      MyQuiz
    },
    computed: {
      ...mapGetters({
        myQuizzes: 'quiz/myQuizzes'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .my-quizzes {
    padding-left: 50px;
  }
</style>
