<template lang="pug">
  .test-el(:class="{ 'test-el--loading': loading }")
    i-loader(v-if="loading" height="100px" width="100px")
    template(v-else)
      i-input(v-model="description.model" :placeholder="description.placeholder" :width="400")
      i-input(v-model="gslUrl.model" :placeholder="gslUrl.placeholder" :width="400")
      i-button(
        value="Sync"
        background-color="#8aacc8"
        :height="50"
        color="#fef9ff"
        :disabled="disabled"
        @click="click"
    )
</template>

<script>
  import { mapState } from 'vuex'
  import ILoader from '@/components/IComponents/ILoader'
  import IInput from '@/components/IComponents/IInput'
  import IButton from '@/components/IComponents/IButton'

  export default {
    name: 'TestEl',
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
        gslUrl: {
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
        return !this.description.model || !this.gslUrl.model
      }
    },
    methods: {
      click () {
        if (this.modal.oldData.description && this.modal.oldData.url) {
          this.updateQuiz()
        } else {
          this.createQuiz()
        }
      },
      updateQuiz () {
        this.loading = true

        const data = {
          userId: this.userId,
          description: this.description.model,
          url: this.gslUrl.model
        }

        const oldData = {
          description: this.modal.oldData.description,
          url: this.modal.oldData.url
        }

        const body = {
          data,
          oldData
        }

        this.$store.dispatch('quiz/update', body).then(res => {
          if (res.data && Object.keys(res.data).length) {
            this.$store.commit('quiz/update', {
              data: res.data,
              oldData
            })
          }

          this.loading = false
          this.$store.dispatch('modal/close')
        }).catch(err => {
          if (err.response && err.response.statusText) {
            console.error(err.response.statusText)
          } else {
            console.error(err)
          }

          this.loading = false
          this.$store.dispatch('modal/close')
        })
      },
      createQuiz () {
        this.loading = true

        const obj = {
          userId: this.userId,
          description: this.description.model,
          url: this.gslUrl.model
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
      //https://docs.google.com/spreadsheets/d/1RWwzNjm-DBrulgTeu9-HBxSz9hIepXrCy67g3mgAG_Y/edit#gid=1113172195
      if (this.modal.oldData.description && this.modal.oldData.url) {
        this.description.model = this.modal.oldData.description
        this.gslUrl.model = this.modal.oldData.url
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
