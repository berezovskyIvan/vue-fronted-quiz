<template lang="pug">
  .quiz-confirm-delete
    h3.quiz-confirm-delete__title Вы дейстивтельно хотите удалить quiz?
    .quiz-confirm-delete__buttons
      i-button(value="Отмена" have-border background-color="#f5f5f5" height="50px" @click="closeModal")
      i-button(value="Удалить" have-border background-color="#8aacc8" height="50px" @click="deleteQuiz")
</template>

<script>
  import IButton from '@/components/IComponents/IButton'
  import { mapState } from 'vuex'

  export default {
    name: 'QuizConfirmDelete',
    components: {
      IButton
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
        this.$store.dispatch('modal/showLoader', {
          height: 100,
          width: 100
        })

        const obj = {
          sheetId: this.modalData.sheetId
        }

        this.$store.dispatch('quiz/delete', obj).then(res => {
          if (res && res.data) {
            this.$store.commit('quiz/delete', {
              sheetId: obj.sheetId
            })
          }

          this.$root.$emit('closeModal')
        }).catch(err => {
          if (err && err.response && err.response.data) {
            console.error(err.response.data)
          } else {
            console.error(err)
          }

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
