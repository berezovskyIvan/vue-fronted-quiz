<template lang="pug">
  .question-result-page
    h1.question-result-page__header {{ header }}
    .question-result-page__body {{ text }}
    img.question-result-page__img(:src="imagePath")
    i-button(:value="buttonText" have-border background-color="#f5f5f5" height="50px" @click="next")
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
    },
    mounted () {
      console.log('info', this.info, this.currentPage, this.correctAnswer)
    }
  }
</script>

<style lang="scss" scoped>
  .question-result-page {

  }
</style>
