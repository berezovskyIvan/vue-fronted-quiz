<template lang="pug">
  .test-el
    .test-el__input
      .test-el__input__info-msg Ключ должен начинаться с латинской буквы. Может содеражть в себе только латинские буквы, цифры и символ "-"
      i-input(v-model="key.model" :placeholder="key.placeholder" :width="400" @enter="enter")
      .test-el__input__err-msg(v-if="haveError") Некорректное наименование ключа
    i-button(value="Publish"
      background-color="#212121"
      color="white"
      :height="50"
      :width="135"
      :loading="publishLoading"
      :disabled="disabled"
      @click="click")
</template>

<script>
import IInput from '@/components/IComponents/IInput'
import IButton from '@/components/IComponents/IButton'
import { mapState } from 'vuex'

export default {
  name: 'QuizPublishModal',
  components: {
    IInput,
    IButton
  },
  data () {
    return {
      key: {
        placeholder: 'Введите ключ страницы quiz',
        model: ''
      },
      publishLoading: false
    }
  },
  computed: {
    ...mapState({
      modal: state => state.modal
    }),
    disabled () {
      return !this.key.model
    },
    haveError () {
      if (!this.key.model) {
        return false
      } else {
        const req = /^[a-z][a-z0-9-]*$/i
        return !req.test(this.key.model)
      }
    }
  },
  methods: {
    click () {
      this.publishQuiz()
    },
    enter () {
      if (!this.disabled) {
        this.publishQuiz()
      }
    },
    publishQuiz () {
      this.publishLoading = true

      const obj = {
        sheetId: this.modal.data.sheet_id,
        key: this.key.model
      }

      this.$store.dispatch('quiz/publish', obj).then(res => {
        if (res && res.data) {
          this.$store.commit('quiz/publish', obj)
          this.$router.push({
            name: 'quiz',
            params: {
              key: obj.key
            }
          })

          this.$gtm.push({ event: 'publish-quiz' })
        }

        this.publishLoading = false
        this.$root.$emit('closeModal')
      }).catch(err => {
        if (err && err.response && err.response.data) {
          console.error(err.response.data)

          const notifyData = {
            type: 'error',
            val: err.response.data
          }

          this.$store.dispatch('notify/open', notifyData)
        } else {
          console.error(err)
        }

        if (err.response && err.response.status === 409) {
          this.conflictKeyError = true
        } else {
          this.$root.$emit('closeModal')
        }

        this.publishLoading = false
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

  &__input {
    height: 140px;

    &__info-msg {
      margin-bottom: 10px;
      margin-left: 5px;
    }

    &__err-msg {
      margin-top: 10px;
      margin-left: 5px;
      color: $color-red;
    }
  }
}
</style>
