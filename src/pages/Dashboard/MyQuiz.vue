<template lang="pug">
  .my-quiz(:class="{ 'my-quiz--loading': loading }")
    i-loader(v-if="loading" width="70px" height="70px")
    template(v-else)
      .my-quiz__icons
        i-svg-icon(icon="bin", font-size="17px" @click="deleteQuiz")
        i-svg-icon(icon="edit" font-size="17px" @click="updateQuiz")
        i-svg-icon(v-if="!item.is_publish" icon="rocket" font-size="17px" @click="publishQuiz")
      .my-quiz__attr
        span.my-quiz__attr__title Описание
        span.my-quiz__attr__value {{ item.description }}
      .my-quiz__attr
        span.my-quiz__attr__title Номер документа
        span.my-quiz__attr__value {{ item.sheet_id }}
</template>

<script>
  import ILoader from '@/components/IComponents/ILoader'
  import ISvgIcon from '@/components/IComponents/ISvgIcon'
  import QuizModal from '@/pages/Dashboard/QuizModal'
  import QuizPublishModal from '@/pages/Dashboard/QuizPublishModal'
  import QuizConfirmDelete from '@/pages/Dashboard/QuizConfirmDelete'

  export default {
    name: 'MyQuiz',
    components: {
      ILoader,
      ISvgIcon
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
      height: 118px;
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
  }
</style>
