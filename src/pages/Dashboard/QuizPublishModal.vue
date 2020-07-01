<template lang="pug">
  .test-el
    .test-el__input
      .test-el__input__info-msg Ключ должен начинаться с латинской буквы. Может содеражть в себе только латинские буквы, цифры и символ "-"
      i-input(v-model="key.model" :placeholder="key.placeholder" :width="400" @enter="enter")
      .test-el__input__err-msg(v-if="haveError") {{ errorText }}
    i-button(value="Publish"
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

  export default {
    name: 'QuizModal',
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
        conflictKeyError: false
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
        return this.urlError || this.conflictKeyError
      },
      errorText () {
        if (this.urlError) {
          return 'Ошибка в наименовании ключа'
        } else if (this.conflictKeyError) {
          return 'Ключ с таким наименованием уже существует'
        }

        return ''
      },
      urlError () {
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
        this.$store.dispatch('modal/showLoader', {
          height: 100,
          width: 100
        })

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
          }

          this.$root.$emit('closeModal')
        }).catch(err => {
          if (err && err.response && err.response.data) {
            console.error(err.response.data)
          } else {
            console.error(err)
          }

          if (err.response && err.response.status === 409) {
            this.conflictKeyError = true
            this.$store.dispatch('modal/hideLoader')
          } else {
            this.$root.$emit('closeModal')
          }
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
