<template lang="pug">
  .test-el(:class="{ 'test-el--loading': loading }")
    i-loader(v-if="loading" height="100px" width="100px")

    template(v-else)
      i-input(v-model="description.model" :placeholder="description.placeholder" :width="400")
      i-input(v-model="url.model" :placeholder="url.placeholder" :width="400")
      i-button(value="Sync"
        background-color="#8aacc8"
        :height="50"
        color="#fef9ff"
        :disabled="disabled"
        @click="click")
</template>

<script>
  import { mapState } from 'vuex'
  import ILoader from '@/components/IComponents/ILoader'
  import IInput from '@/components/IComponents/IInput'
  import IButton from '@/components/IComponents/IButton'
  import { getGslUrl } from '@/utlis'

  export default {
    name: 'QuizModal',
    components: {
      ILoader,
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
        },
        loading: false
      }
    },
    computed: {
      ...mapState({
        userId: state => state.auth.currentUser.Ea,
        modal: state => state.modal
      }),
      disabled () {
        return !this.description.model || !this.url.model
      }
    },
    methods: {
      click () {
        if (this.modal.data.sheetId && this.modal.data.description) {
          this.updateQuiz()
        } else {
          this.createQuiz()
        }
      },
      updateQuiz () {
        this.loading = true

        const body = {
          userId: this.userId,
          description: this.description.model,
          url: this.url.model,
          pastSheetId: this.modal.data.sheetId
        }

        this.$store.dispatch('quiz/update', body).then(res => {
          if (res.data && Object.keys(res.data).length) {
            this.$store.commit('quiz/update', {
              data: res.data,
              pastSheetId: body.pastSheetId
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
      createQuiz () {
        this.loading = true

        const obj = {
          userId: this.userId,
          description: this.description.model,
          url: this.url.model
        }

        this.$store.dispatch('quiz/create', obj).then(res => {
          if (res.data && Object.keys(res.data).length) {
            this.$store.commit('quiz/create', res.data)
          }

          this.loading = false
          this.$store.dispatch('modal/close')
        }).catch(err => {
          if (err.response && err.response.statusText) {
            console.error(err.response.statusText)
          } else {
            console.error(err.response)
          }

          this.loading = false
          this.$store.dispatch('modal/close')
        })
      }
    },
    mounted () {
      if (this.modal.data.description && this.modal.data.sheetId) {
        this.description.model = this.modal.data.description
        this.url.model = getGslUrl(this.modal.data.sheetId)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .test-el {
    display: flex;
    flex-direction: column;

    &--loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    div:not(:last-child) {
      margin-bottom: 20px;
    }
  }
</style>
