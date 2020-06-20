<template lang="pug">
  .quiz-page(:class="{ 'quiz-page--loading': loading } ")
    i-loader(v-if="loading")

    template(v-else)
      quiz-main-page(v-if="!quizIsEnter" @enter-quiz="enterQuiz")

      template(v-else)
        quiz-questions-page(v-if="!showQuestionResultPage" :current-page="currentPage" @show-question-result="showQuestionResult")
        question-result-page(v-else
          :current-page="currentPage"
          :correct-answer="correctAnswer"
          @next-question="nextQuestion"
          @show-result="showResult")
</template>

<script>
  import ILoader from '@/components/IComponents/ILoader'
  import QuizMainPage from '@/pages/QuizPage/QuizMainPage'
  import QuizQuestionsPage from '@/pages/QuizPage/QuizQuestionsPage'
  import QuestionResultPage from '@/pages/QuizPage/QuestionResultPage'

  export default {
    name: 'QuizPage',
    components: {
      ILoader,
      QuizMainPage,
      QuizQuestionsPage,
      QuestionResultPage
    },
    data () {
      return {
        loading: false,
        currentPage: 0,
        quizIsEnter: false,
        showQuestionResultPage: false,
        correctAnswer: false
      }
    },
    computed: {
      quizKey () {
        return this.$route.params.key
      }
    },
    methods: {
      getQuizByKey () {
        this.loading = true

        this.$store.dispatch('quiz/get-by-key', this.quizKey).then(({ status, data }) => {
          if (status === 200) {
            this.$store.commit('quiz/get-by-key', data)
          } else {
            this.$router.push({ name: 'page-not-found' })
          }

          this.loading = false
        }).catch(err => {
          if (err && err.response && err.response.data) {
            console.error(err.response.data)
          } else {
            console.error(err)
          }

          this.loading = false
        })
      },
      enterQuiz ($event) {
        this.quizIsEnter = true
      },
      showQuestionResult ($event) {
        console.log('showQuestionResult', $event)
        this.correctAnswer = $event.success
        this.showQuestionResultPage = true
      },
      nextQuestion () {
        this.showQuestionResultPage = false
        ++this.currentPage
      },
      showResult () {
        console.log('show result')
      }
    },
    beforeMount () {
      this.getQuizByKey()
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .quiz-page {
    padding-top: 50px;
    padding-left: 50px;

    &--loading {
      @include flex-center;
    }
  }
</style>
