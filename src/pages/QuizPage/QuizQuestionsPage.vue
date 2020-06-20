<template lang="pug">
  .quiz-questions-page
    h3.quiz-questions-page__title {{ `Вопрос номер №${currentPage + 1}` }}
    .quiz-questions-page__body {{ body }}
    img.quiz-questions-page__img(:src="imagePath")
    .quiz-questions-page__answers
      .quiz-questions-page__answers__el(v-for="(item, index) in answers"
        :key="index"
        v-html="item.text"
        @click="showQuestionResult(item.value)")
</template>

<script>
  import config from '#/config'
  import IButton from '@/components/IComponents/IButton'
  import { mapState } from 'vuex'
  import { getColumnConfig } from '@/utlis'

  export default {
    name: 'QuizQuestionsPage',
    components: {
      IButton
    },
    props: {
      currentPage: {
        type: Number,
        required: true
      }
    },
    computed: {
      ...mapState({
        info: state => state.quiz.current.questions_page
      }),
      sheetData () {
        const obj = config.sheetData.questionsPage
        return obj.question
      },
      body () {
        return this.getValue(this.sheetData.body)
      },
      imagePath () {
        return this.getValue(this.sheetData.image)
      },
      answers () {
        let result = []

        for (let x = 0; x < 4; x++) {
          const textConfig = getColumnConfig(this.sheetData.answerText, x + 1)
          const valueConfig = getColumnConfig(this.sheetData.answerValue, x + 1)
          const text = this.getValue(textConfig)
          const value = this.getValue(valueConfig)

          result.push({
            text,
            value
          })
        }

        return result
      }
    },
    methods: {
      getValue (val) {
        const data = this.info.find(item => {
          if (!item || !item.length || item.length < 2 || !val) {
            return false
          }

          return item[0].toLowerCase() === val.toLowerCase()
        })

        if (data && data.length && data.length > 1) {
          const pageNumber = this.currentPage + 1
          return data[pageNumber]
        }

        return ''
      },
      showQuestionResult ($event) {
        const obj = {
          answer: $event,
          success: $event === '30'
        }

        this.$emit('show-question-result', obj)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
