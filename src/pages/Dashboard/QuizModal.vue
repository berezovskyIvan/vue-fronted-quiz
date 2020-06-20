<template lang="pug">
  .test-el
    i-input(v-model="description.model" :placeholder="description.placeholder" :width="400" @enter="enter")
    i-input(v-model="url.model" :placeholder="url.placeholder" :width="400" @enter="enter")
    i-button(value="Sync"
      background-color="#8aacc8"
      :height="50"
      color="#fef9ff"
      :disabled="disabled"
      @click="click")
</template>

<script>
  import IInput from '@/components/IComponents/IInput'
  import IButton from '@/components/IComponents/IButton'
  import { mapState } from 'vuex'
  import { getGslUrl } from '@/utlis'

  export default {
    name: 'QuizModal',
    components: {
      IInput,
      IButton
    },
    data () {
      return {
        description: {
          model: '',
          placeholder: 'Описание'
        },
        url: {
          model: '',
          placeholder: `Ссылка "Google Spreadsheet Link"`
        }
      }
    },
    computed: {
      ...mapState({
        modal: state => state.modal
      }),
      isEdit () {
        return this.modal.data.sheetId && this.modal.data.description
      },
      disabled () {
        return !this.description.model || !this.url.model
      }
    },
    methods: {
      getPastQuizData () {
        if (this.isEdit) {
          this.description.model = this.modal.data.description
          this.url.model = getGslUrl(this.modal.data.sheetId)
        }
      },
      click () {
        if (this.isEdit) {
          this.updateQuiz()
        } else {
          this.createQuiz()
        }
      },
      enter () {
        if (!this.disabled) {
          if (this.isEdit) {
            this.updateQuiz()
          } else {
            this.createQuiz()
          }
        }
      },
      createQuiz () {
        this.$store.dispatch('modal/showLoader', {
          height: 100,
          width: 100
        })

        const obj = {
          url: this.url.model,
          description: this.description.model
        }

        this.$store.dispatch('quiz/create', obj).then(res => {
          if (res.data && Object.keys(res.data).length) {
            this.$store.commit('quiz/create', res.data)
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
      },
      updateQuiz () {
        this.$store.dispatch('modal/showLoader', {
          height: 100,
          width: 100
        })

        const body = {
          url: this.url.model,
          description: this.description.model,
          pastSheetId: this.modal.data.sheetId
        }

        this.$store.dispatch('quiz/update', body).then(res => {
          if (res.data && Object.keys(res.data).length) {
            this.$store.commit('quiz/update', {
              data: res.data,
              pastSheetId: body.pastSheetId
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
    },
    mounted () {
      this.getPastQuizData()
    }
  }
</script>

<style lang="scss" scoped>
  .test-el {
    display: flex;
    flex-direction: column;

    div:not(:last-child) {
      margin-bottom: 20px;
    }
  }
</style>
