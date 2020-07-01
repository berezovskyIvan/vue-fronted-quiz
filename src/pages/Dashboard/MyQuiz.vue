<template lang="pug">
  .my-quiz(:class="{ 'my-quiz--loading': loading }")
    i-loader(v-if="loading" width="70px" height="70px")
    template(v-else)
      .my-quiz__attr
        span.my-quiz__attr__title Описание
        span.my-quiz__attr__value {{ item.description }}
      .my-quiz__attr
        span.my-quiz__attr__title Номер документа
        span.my-quiz__attr__value {{ item.sheet_id }}
      .my-quiz__buttons
        i-button(value="Sync" have-border background-color="#f5f5f5" height="50px" @click="updateQuiz")
        i-button(v-if="!item.is_publish" value="Publish" have-border background-color="#f5f5f5" height="50px" @click="publishQuiz")
        i-button(v-else value="Stop publishing" have-border background-color="#f5f5f5" height="50px" @click="stopPublishingQuiz")
        i-button(value="Delete" have-border background-color="#f5f5f5" height="50px" @click="deleteQuiz")
</template>

<script>
  import ILoader from '@/components/IComponents/ILoader'
  import IButton from '@/components/IComponents/IButton'
  import ISvgIcon from '@/components/IComponents/ISvgIcon'
  import QuizModal from '@/pages/Dashboard/QuizModal'
  import QuizPublishModal from '@/pages/Dashboard/QuizPublishModal'
  import QuizConfirmDelete from '@/pages/Dashboard/QuizConfirmDelete'

  export default {
    name: 'MyQuiz',
    components: {
      ILoader,
      ISvgIcon,
      IButton
    },
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        loading: false
      }
    },
    methods: {
      deleteQuiz () {
        const obj = {
          isOpen: true,
          width: 700,
          height: 190,
          component: QuizConfirmDelete,
          data: {
            sheetId: this.item.sheet_id
          }
        }

        this.$store.dispatch('modal/open', obj)
      },
      updateQuiz () {
        const obj = {
          isOpen: true,
          width: 700,
          height: 250,
          component: QuizModal,
          data: {
            description: this.item.description,
            sheetId: this.item.sheet_id
          }
        }

        this.$store.dispatch('modal/open', obj)
      },
      publishQuiz () {
        const obj = {
          isOpen: true,
          width: 700,
          height: 250,
          component: QuizPublishModal,
          data: {
            ...this.item
          }
        }

        this.$store.dispatch('modal/open', obj)
      },
      stopPublishingQuiz () {
        const body = {
          sheetId: this.item.sheet_id
        }

        this.loading = true

        this.$store.dispatch('quiz/stop-publishing', body).then(({ status }) => {
          if (status === 200) {
            this.$store.commit('quiz/stop-publishing', body)
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .my-quiz {
    position: sticky;
    box-sizing: border-box;
    width: 700px;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid $color-silver;

    &--loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 192px;
    }

    &__icons {
      position: absolute;
      display: flex;
      top: 15px;
      right: 15px;

      >>> {
        .i-svg-icon {
          cursor: pointer;

          &:not(:last-child) {
            margin-right: 13px;
          }
        }
      }
    }

    &__attr {
      &:not(:last-child) {
        margin-bottom: 20px;
      }

      &__title {
        font-weight: 600;
        margin-right: 15px;
      }
    }

    &__buttons {
      display: flex;

      .i-button:not(:last-child) {
        margin-right: 15px;
      }
    }

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
</style>
