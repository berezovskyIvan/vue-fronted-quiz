<template lang="pug">
  .quiz-result-page
    div(style="margin-right: 50px")
      h1.quiz-result-page__header {{ header }}
      .quiz-result-page__body {{ body }}
    img.quiz-result-page__img(:src="imagePath")
</template>

<script>
  import config from '#/config'
  import { mapState } from 'vuex'

  export default {
    name: 'QuizResultPage',
    computed: {
      ...mapState({
        info: state => state.quiz.current.result_page
      }),
      variant () {
        return this.$route.params.variant
      },
      validVariant () {
        return this.variant > 0 && this.variant <= config.quizResultCount
      },
      sheetData () {
        return config.sheetData.resultPage
      },
      header () {
        if (this.info && this.info.length) {
          return this.getValue(this.sheetData.header)
        }

        return ''
      },
      body () {
        if (this.info && this.info.length) {
          return this.getValue(this.sheetData.body)
        }

        return ''
      },
      imagePath () {
        if (this.info && this.info.length) {
          return this.getValue(this.sheetData.image)
        }

        return ''
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
          return data[this.variant]
        }

        return ''
      }
    },
    beforeMount () {
      if (!this.validVariant) {
        this.$router.push({ name: 'page-not-found' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .quiz-result-page {
    display: flex;

    &__body {
      max-width: 500px;
    }
  }
</style>
