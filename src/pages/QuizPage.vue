<template lang="pug">
  .quiz-page(:class="{ 'quiz-page--loading': loading } ")

    i-loader(v-if="loading")

    .quiz-page__header(v-else)
      .quiz-page__header__current-page
        span(v-if="!quizIsEnter && !isResultPage") Добро пожаловать
        span(v-else-if="!isResultPage") {{ `Вопрос № ${currentPage + 1} / ${questionsCount}` }}
        span(v-else) Поздравляем тест завершён

    .quiz-page__body(v-if="!loading && !isResultPage")
      quiz-main-page(v-if="!quizIsEnter" @enter-quiz="enterQuiz")

      template(v-else)
        quiz-questions-page(
          v-if="!showQuestionResultPage"
          :current-page="currentPage"
          @show-question-result="showQuestionResult"
        )

        question-result-page(
          v-else
          :current-page="currentPage"
          :correct-answer="correctAnswer"
          @next-question="nextQuestion"
          @show-result="showResult"
        )

    router-view
</template>

<script>
import config from '#/config'
import ILoader from '@/components/IComponents/ILoader'
import QuizMainPage from '@/pages/QuizPage/QuizMainPage'
import QuizQuestionsPage from '@/pages/QuizPage/QuizQuestionsPage'
import QuestionResultPage from '@/pages/QuizPage/QuestionResultPage'
import { mapState } from 'vuex'

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
      totalPoints: 0,
      quizIsEnter: false,
      correctAnswer: false,
      showQuestionResultPage: false,
      questionsCount: config.questionsCount
    }
  },
  computed: {
    ...mapState({
      resultPage: state => state.quiz.current.result_page
    }),
    quizKey () {
      return this.$route.params.key
    },
    isResultPage () {
      return this.$route.name === 'quiz-result'
    },
    sheetData () {
      return config.sheetData.resultPage
    }
  },
  beforeMount () {
    this.getQuizByKey()
  },
  methods: {
    getQuizByKey () {
      this.loading = true

      this.$store.dispatch('quiz/get-by-key', this.quizKey).then(({ status, data }) => {
        if (status === 200) {
          this.$store.commit('quiz/get-by-key', data)
          this.getCashData()
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
    getQuizParams () {
      try {
        const quizParams = sessionStorage.getItem('quizParameters')
        return JSON.parse(quizParams)
      } catch (err) {
        return null
      }
    },
    getCashData () {
      const quizParams = this.getQuizParams()

      if (quizParams) {
        this.quizIsEnter = true
        this.currentPage = quizParams.currentPage
        this.totalPoints = quizParams.totalPoints

        if (quizParams.page === 'QuestionResultPage') {
          this.correctAnswer = quizParams.correctAnswer
          this.showQuestionResultPage = true
        }
      }
    },
    enterQuiz ($event) {
      this.quizIsEnter = true

      const obj = {
        page: 'QuizQuestionsPage',
        currentPage: this.currentPage,
        totalPoints: this.totalPoints
      }

      sessionStorage.setItem('quizParameters', JSON.stringify(obj))
    },
    showQuestionResult ($event) {
      this.correctAnswer = $event.success
      this.totalPoints += $event.points
      this.showQuestionResultPage = true

      const obj = {
        page: 'QuestionResultPage',
        currentPage: this.currentPage,
        totalPoints: this.totalPoints,
        correctAnswer: this.correctAnswer
      }

      sessionStorage.setItem('quizParameters', JSON.stringify(obj))
    },
    nextQuestion () {
      this.showQuestionResultPage = false
      ++this.currentPage

      const obj = {
        page: 'QuizQuestionsPage',
        currentPage: this.currentPage,
        totalPoints: this.totalPoints
      }

      sessionStorage.setItem('quizParameters', JSON.stringify(obj))
    },
    showResult () {
      this.showQuestionResultPage = false
      const variant = this.getValue(this.sheetData.total)

      this.$gtm.push({ event: 'quiz-passed' })
      this.$router.push({
        name: 'quiz-result',
        params: {
          key: this.quizKey,
          variant
        }
      })

      sessionStorage.removeItem('quizParameters')
    },
    getValue (val) {
      const data = this.resultPage.find(item => {
        if (!item || !item.length || !val) {
          return false
        }

        return item[0].toLowerCase().includes(val.toLowerCase())
      })

      if (data && data.length && data.length > 1) {
        return data.findIndex((total, index) => {
          const currentTotal = Number(total)
          const nextTotal = Number(data[index + 1])

          return (this.totalPoints >= currentTotal && this.totalPoints < nextTotal) ||
            (this.totalPoints >= currentTotal && index === config.quizResultCount)
        })
      }

      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~s/global';

.quiz-page {
  &--loading {
    @include flex-center;
  }

  &__header {
    @include flex-center;
    position: absolute;
    height: 100px;
    width: 100%;
    left: 0;
    right: 0;
    background-color: $color-black;

    &__current-page {
      font-size: 24px;
      font-weight: bold;
      color: $color-white;
    }
  }

  &__body {
    margin-top: 150px;
  }
}
</style>
