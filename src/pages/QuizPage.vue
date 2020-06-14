<template lang="pug">
  .quiz-page
    span Quiz only
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'QuizPage',
    computed: {
      ...mapState({
        quizzes: state => state.quiz.list
      }),
      quizKey () {
        return this.$route.params.key
      }
    },
    methods: {

    },
    beforeMount () {
      console.log('route', this.$route)
    }
  }
</script>

<style lang="scss" scoped>

</style>
