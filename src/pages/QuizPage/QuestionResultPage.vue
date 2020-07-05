<template lang="pug">
  .question-result-page
    div(style="margin-right: 50px")
      h1.question-result-page__header {{ header }}
      .question-result-page__body {{ text }}
      i-button(
        :value="buttonText"
        background-color="#212121"
        color="#fef9ff"
        height="50px"
        @click="next"
      )
    img.question-result-page__image(:src="imagePath")
</template>

<script>
  import config from '#/config'
  import IButton from '@/components/IComponents/IButton'
  import { mapState } from 'vuex'

  export default {
    name: 'QuestionResultPage',
    components: {
      IButton
    },
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      correctAnswer: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      ...mapState({
        info: state => state.quiz.current.questions_page
      }),
      resultType () {
        return this.correctAnswer ? 'correct' : 'wrong'
      },
      questionsPageData () {
        return config.sheetData.questionsPage.result
      },
      sheetData () {
        return this.questionsPageData[this.resultType]
      },
      header () {
        return this.getValue(this.sheetData.header)
      },
      text () {
        return this.getValue(this.sheetData.text)
      },
      imagePath () {
        return this.getValue(this.sheetData.image)
      },
      buttonText () {
        return this.getValue(this.questionsPageData.buttonText)
      }
    },
    methods: {
      getValue (val) {
        const data = this.info.find(item => {
          if (!item || !item.length || !val) {
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
      next () {
        if (this.currentPage < config.questionsCount - 1) {
          this.$emit('next-question')
        } else {
          this.$emit('show-result')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .question-result-page {
    display: flex;

    &__body {
      max-width: 500px;
      margin-bottom: 20px;
    }

    &__image {
      max-height: 400px;
      max-width: 400px;
    }
  }
</style>
