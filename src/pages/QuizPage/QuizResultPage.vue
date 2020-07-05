<template lang="pug">
  .quiz-result-page
    div(style="margin-right: 50px")
      h1.quiz-result-page__header {{ header }}
      .quiz-result-page__body {{ body }}
      .quiz-result-page__social-links
        a.quiz-result-page__social-links__item(v-for="(item, index) in socialLinks" :key="index" :href="getSocialUrl(item)")
          img(:src="`/src/images/icons/${item}.svg`")
    img.quiz-result-page__image(:src="imagePath")
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
      },
      socialLinks () {
        if (this.info && this.info.length) {
          const val = this.getValue(this.sheetData.socialLinks)
          const arr = val.split(',')
          return arr.map(u => u.trim().toLowerCase())
        }

        return []
      }
    },
    methods: {
      getValue (val) {
        const data = this.info.find(item => {
          if (!item || !item.length || !val) {
            return false
          }

          return item[0].toLowerCase() === val.toLowerCase() ||
            item[0].toLowerCase().includes(val.toLowerCase())
        })

        if (data && data.length && data.length > 1) {
          return data[this.variant]
        }

        return ''
      },
      getSocialUrl (item) {
        return this.sheetData[item] + `${config.clientUrl}${this.$route.path}`
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
    margin-top: 150px;

    &__body {
      max-width: 500px;
      margin-bottom: 30px;
    }

    &__social-links {
      display: flex;

      &__item {
        cursor: pointer;
        transition: transform 1500ms;

        &:first-child {
          margin-right: 15px;
        }

        img {
          width: 35px;
          height: 35px;
        }

        &:hover {
          transform: rotate(360deg);
        }
      }
    }

    &__image {
      max-height: 400px;
      max-width: 400px;
      margin-left: auto;
    }
  }
</style>
