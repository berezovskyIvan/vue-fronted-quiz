<template lang="pug">
  .my-quiz
    i-button.my-quiz__delete-button(
      height="35px"
      width="35px"
      have-border
      round
      @click="deleteQuiz"
    )
      template(slot="content")
        i-svg-icon(icon="bin" font-size="13px")
    .my-quiz__attr
      span.my-quiz__attr__title Description
      span.my-quiz__attr__value {{ item.description }}
    .my-quiz__attr
      span.my-quiz__attr__title Document number
      span.my-quiz__attr__value {{ item.sheet_id }}
    .my-quiz__buttons
      i-button(value="Sync" background-color="#f5f5f5" height="45px" @click="updateQuiz")
      i-button(v-if="!item.is_publish" value="Publish" background-color="#f5f5f5" height="45px" @click="publishQuiz")
      i-button(
        v-else
        value="Stop publishing"
        background-color="#f5f5f5"
        height="45px"
        width="162px"
        :loading="loading.stopPublish"
        @click="stopPublishingQuiz"
      )
</template>

<script>
  import ILoader from '@/components/IComponents/ILoader'
  import IButton from '@/components/IComponents/IButton'
  import ISvgIcon from '@/components/IComponents/ISvgIcon'
  import QuizModal from '@/pages/Dashboard/QuizModal'
  import QuizPublishModal from '@/pages/Dashboard/QuizPublishModal'
  import QuizConfirmDelete from '@/pages/Dashboard/QuizConfirmDelete'
  import { changeStatusPublishQuiz } from '@/components/messages'

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
        loading: {
          sync: false,
          publish: false,
          stopPublish: false,
          delete: false
        }
      }
    },
    methods: {
      deleteQuiz () {
        const obj = {
          isOpen: true,
          width: 550,
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
          width: 550,
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

        this.loading.stopPublish = true

        this.$store.dispatch('quiz/stop-publishing', body).then(({ status }) => {
          if (status === 200) {
            this.$store.commit('quiz/stop-publishing', body)

            const notifyData = {
              type: 'info',
              val: changeStatusPublishQuiz
            }

            this.$store.dispatch('notify/open', notifyData)
          }

          this.loading.stopPublish = false
        }).catch(err => {
          if (err && err.response && err.response.data) {
            console.error(err.response.data)
          } else {
            console.error(err)
          }

          this.loading.stopPublish = false
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
    background-color: white;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

    &--loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 192px;
    }

    &__delete-button {
      position: absolute;
      top: 15px;
      right: 15px;

      &:hover {
        &:before {
          content: '';
          position: absolute;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background-color: $color-silver-light;
        }

        >>> {
          .i-svg-icon {
            z-index: 1;
          }
        }
      }
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
