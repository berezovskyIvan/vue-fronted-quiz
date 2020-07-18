<template lang="pug">
  .main-quiz-page
    div(style="margin-right: 50px")
      h1.main-quiz-page__header {{ header }}
      .main-quiz-page__body {{ body }}
      i-button(
        :value="buttonText"
        background-color="#212121"
        color="#fef9ff"
        height="50px"
        @click="enterQuiz"
      )

    img.main-quiz-page__image(:src="imagePath")
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
        this.$gtm.push({ event: 'quiz-has-started' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .main-quiz-page {
    display: flex;

    &__body {
      max-width: 500px;
      margin-bottom: 20px;
    }

    &__image {
      max-width: 400px;
      max-height: 400px;
    }
  }
</style>
