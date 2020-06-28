<template lang="pug">
  .quiz-questions-page
    div(style="margin-right: 50px")
      h3.quiz-questions-page__title {{ `Вопрос № ${currentPage + 1} / ${questionsCount}` }}
      .quiz-questions-page__body {{ body }}
      .quiz-questions-page__answers
        .quiz-questions-page__answers__el(v-for="(item, index) in answers"
          :key="index"
          v-html="item.text"
          @click="showQuestionResult(item.value)")

    img.quiz-questions-page__img(:src="imagePath")
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
    data () {
      return {
        questionsCount: config.questionsCount
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
        const values = this.answers.values(u => Number(u.value))
        const max = Math.max(values)
        const answerValueNum = Number($event)
        const obj = {
          points: answerValueNum,
          success: $event === answerValueNum
        }

        this.$emit('show-question-result', obj)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .quiz-questions-page {
    display: flex;

    &__body {
      max-width: 500px;
      margin-bottom: 20px;
    }

    &__answers {
      display: flex;
      flex-wrap: wrap;
      width: 681px;
      border-radius: 20px;
      border: 1px solid $color-silver;

      &__el {
        @include flex-center;
        height: 100px;
        width: 300px;
        padding-left: 20px;
        padding-right: 20px;
        cursor: pointer;

        &:nth-child(1) {
          border-right: 1px solid $color-silver;
          border-bottom: 1px solid $color-silver;
        }

        &:nth-child(2) {
          border-bottom: 1px solid $color-silver;
        }

        &:nth-child(3) {
          border-right: 1px solid $color-silver;
        }
      }
    }
  }
</style>
