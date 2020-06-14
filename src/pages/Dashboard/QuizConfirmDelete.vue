<template lang="pug">
  .quiz-confirm-delete(:class="{ 'quiz-confirm-delete--loading': loading }")
    i-loader(v-show="loading" width="100px" height="100px")
    div(v-show="!loading")
      h3.quiz-confirm-delete__title Вы дейстивтельно хотите удалить quiz?
      .quiz-confirm-delete__buttons
        i-button(value="Отмена" have-border background-color="#f5f5f5" height="50px" @click="closeModal")
        i-button(value="Удалить" have-border background-color="#8aacc8" height="50px" @click="deleteQuiz")
</template>

<script>
  import ILoader from '@/components/IComponents/ILoader'
  import IButton from '@/components/IComponents/IButton'
  import { mapState } from 'vuex'

  export default {
    name: 'QuizConfirmDelete',
    components: {
      ILoader,
      IButton
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      ...mapState({
        modalData: state => state.modal.data
      })
    },
    methods: {
      closeModal () {
        this.$root.$emit('closeModal')
      },
      deleteQuiz () {
        this.loading = true

        const obj = {
          userId: this.modalData.userId,
          sheetId: this.modalData.sheetId
        }

        this.$store.dispatch('quiz/delete', obj).then(res => {
          if (res && res.data) {
            this.$store.commit('quiz/delete', {
              userId: obj.userId,
              sheetId: obj.sheetId
            })
          }

          this.loading = false
          this.$root.$emit('closeModal')
        }).catch(err => {
          if (err.response && err.response.statusText) {
            console.error(err.response.statusText)
          } else {
            console.error(err)
          }

          this.loading = false
          this.$root.$emit('closeModal')
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .quiz-confirm-delete {
    &--loading {
      @include flex-center;
      height: 100%;
    }

    &__title {
      margin-bottom: 30px;
    }

    &__buttons {
      display: flex;

      .i-button {
        &:first-child {
          margin-right: 20px;
        }
      }
    }
  }
</style>
