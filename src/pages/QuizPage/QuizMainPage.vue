<template lang="pug">
  .main-quiz-page
    h1.main-page__header {{ header }}
    .quiz-main-page__body {{ body }}
    img.quiz-main-page__img(:src="imagePath")
    i-button(:value="buttonText" have-border background-color="#f5f5f5" height="50px", @click="enterQuiz")
</template>

<script>
  import config from '#/config'
  import IButton from '@/components/IComponents/IButton'
  import { mapState } from 'vuex'

  export default {
    name: 'QuizMainPage',
    components: {
      IButton
    },
    computed: {
      ...mapState({
        info: state => state.quiz.current.main_page
      }),
      sheetData () {
        return config.sheetData.mainPage
      },
      header () {
        return this.getValue(this.sheetData.header)
      },
      body () {
        return this.getValue(this.sheetData.body)
      },
      imagePath () {
        return this.getValue(this.sheetData.image)
      },
      buttonText () {
        return this.getValue(this.sheetData.buttonText)
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
          return data[1]
        }

        return ''
      },
      enterQuiz ($event) {
        this.$emit('enter-quiz', $event)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .quiz-main-page {

  }
</style>
