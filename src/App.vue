<template lang="pug">
  #app
    i-modal-window(v-if="modalWindow.isOpen")
    router-view
</template>

<script>
import { mapState } from 'vuex'
import IModalWindow from '@/components/IComponents/IModalWindow'

export default {
  name: 'App',
  components: {
    IModalWindow
  },
  computed: {
    ...mapState({
      modalWindow: state => state.modal
    })
  },
  beforeMount () {
    this.$store.dispatch('quiz/get')
  }
}
</script>

<style lang="scss">
  html, body , #app{
    width: 100%;
    height: 100%;
  }

  html, body {
    display: flex;
  }

  html {
    font-family: sans-serif;
  }

  body {
    margin: 0;
  }

  #app {
    display: grid;
  }
</style>
