<template lang="pug">
  .test-el
    i-input(v-model="description.model" :placeholder="description.placeholder" :width="400")
    i-input(v-model="gslUrl.model" :placeholder="gslUrl.placeholder" :width="400")
    i-button(
      value="Sync"
      background-color="#8aacc8"
      :height="50"
      color="#fef9ff"
      :disabled="saveDisabled"
      @click="saveClick"
    )
</template>

<script>
  import IInput from '@/components/IComponents/IInput'
  import IButton from '@/components/IComponents/IButton'

  export default {
    name: 'TestEl',
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
        gslUrl: {
          model: '',
          placeholder: `Ссылка "Google Spreadsheet Link"`
        }
      }
    },
    computed: {
      saveDisabled () {
        return !this.description.model || !this.gslUrl.model
      }
    },
    methods: {
      saveClick () {
        const obj = {
          description: this.description.model,
          url: this.gslUrl.model
        }

        this.$store.dispatch('quiz/create', obj)
      }
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
