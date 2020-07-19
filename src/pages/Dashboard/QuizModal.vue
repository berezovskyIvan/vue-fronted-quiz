<template lang="pug">
  .test-el
    i-input(v-model="description.model" :placeholder="description.placeholder" :width="400" @enter="enter")
    i-input(v-model="url.model" :placeholder="url.placeholder" :width="400" @enter="enter")
    .test-el__err-msg(v-if="errorLoading") Ошибка загрузки файла
    i-button(value="Sync"
      :height="45"
      :width="88"
      background-color="#212121"
      color="white"
      :disabled="disabled"
      :loading="btnLoading"
      @click="click")
</template>

<script>
import IInput from '@/components/IComponents/IInput'
import IButton from '@/components/IComponents/IButton'
import { mapState } from 'vuex'
import { getGslUrl } from '@/utlis'
import { createQuiz, updateQuiz } from '@/components/messages'

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
      },
      btnLoading: false,
      errorLoading: false
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
  mounted () {
    this.getPastQuizData()
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
      this.btnLoading = true

      const obj = {
        url: this.url.model,
        description: this.description.model
      }

      this.$store.dispatch('quiz/create', obj).then(res => {
        if (res.data && Object.keys(res.data).length) {
          this.$store.commit('quiz/create', res.data)

          const notifyData = {
            val: createQuiz,
            type: 'info'
          }

          this.$store.dispatch('notify/open', notifyData)
          this.$gtm.push({ event: 'create-quiz' })
        }

        this.btnLoading = false
        this.$root.$emit('closeModal')
      }).catch(err => {
        if (err && err.response && err.response.data) {
          console.error(err.response.data)
        } else {
          console.error(err)
        }

        this.btnLoading = false
        this.errorLoading = true
      })
    },
    updateQuiz () {
      this.btnLoading = true

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

          const notifyData = {
            val: updateQuiz,
            type: 'info'
          }

          this.$store.dispatch('notify/open', notifyData)
          this.$gtm.push({ event: 'update-quiz' })
        }

        this.btnLoading = false
        this.$root.$emit('closeModal')
      }).catch(err => {
        if (err && err.response && err.response.data) {
          console.error(err.response.data)
        } else {
          console.error(err)
        }

        const notifyData = {
          type: 'error',
          val: err && err.response && err.response.data
            ? err.response.data
            : err
        }

        this.$store.dispatch('notify/open', notifyData)

        this.btnLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~s/global';

.test-el {
  display: flex;
  flex-direction: column;
  height: 100%;

  div:not(:last-child) {
    margin-bottom: 20px;
  }

  &__err-msg {
    margin-top: 5px;
    margin-left: 5px;
    color: $color-red;
  }

  .i-button {
    margin-top: auto;
  }
}
</style>
