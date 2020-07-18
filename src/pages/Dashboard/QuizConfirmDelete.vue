<template lang="pug">
  .quiz-confirm-delete
    h3.quiz-confirm-delete__title Вы дейстивтельно хотите удалить quiz?
    .quiz-confirm-delete__buttons
      i-button(value="Отмена" have-border background-color="white" height="45px" @click="closeModal")
      i-button(
        value="Удалить"
        background-color="#212121"
        color="#fef9ff"
        height="45px"
        width="115px"
        :loading="deleteLoading"
        @click="deleteQuiz"
      )
</template>

<script>
  import IButton from '@/components/IComponents/IButton'
  import { mapState } from 'vuex'
  import { deleteQuiz } from '@/components/messages'

  export default {
    name: 'QuizConfirmDelete',
    components: {
      IButton
    },
    data () {
      return {
        deleteLoading: false
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
        this.deleteLoading = true

        const obj = {
          sheetId: this.modalData.sheetId
        }

        this.$store.dispatch('quiz/delete', obj).then(res => {
          if (res && res.data) {
            this.$store.commit('quiz/delete', {
              sheetId: obj.sheetId
            })

            const notifyData = {
              type: 'info',
              val: deleteQuiz
            }

            this.$store.dispatch('notify/open', notifyData)
            this.$gtm.push({ event: 'delete-quiz' })
            this.deleteLoading = false
          }

          this.$root.$emit('closeModal')
        }).catch(err => {
          if (err && err.response && err.response.data) {
            console.error(err.response.data)
          } else {
            console.error(err)
          }

          this.deleteLoading = false
          this.$root.$emit('closeModal')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .quiz-confirm-delete {
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
