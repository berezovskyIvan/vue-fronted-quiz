<template lang="pug">
  #app
    i-modal-window(v-if="modalWindow.isOpen")
    i-notify(v-if="notify.isOpen")
    router-view
</template>

<script>
import { mapState } from 'vuex'
import IModalWindow from '@/components/IComponents/IModalWindow'
import INotify from '@/components/IComponents/INotify'
import AuthMixin from '@/mixins/auth'

export default {
  name: 'App',
  mixins: [AuthMixin],
  components: {
    IModalWindow,
    INotify
  },
  computed: {
    ...mapState({
      modalWindow: state => state.modal,
      notify: state => state.notify
    })
  }
}
</script>

<style lang="scss">
  @import '~s/global';

  html, body , #app{
    width: 100%;
    height: 100%;
  }

  html, body {
    display: flex;
    justify-content: center;
  }

  html {
    font-family: Helvetica;
    color: $color-black;
  }

  body {
    margin: 0;
  }

  #app {
    display: grid;
    width: 1000px;
  }
</style>
