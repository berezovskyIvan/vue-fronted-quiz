<template lang="pug">
  .i-modal-background(@click.self="close" :class="{ 'i-modal-background--close-animation': animation }")
    .i-modal-background__window(:class="{ 'i-modal-background__window--loading': modalWindow.loading.is }" :style="style")
      i-loader(v-show="modalWindow.loading.is" :width="modalWindow.loading.width" :height="modalWindow.loading.height")

      i-button.i-modal-background__window__close-button(v-show="!modalWindow.loading.is"
        height="35px"
        width="35px"
        have-border
        round
        @click="close")
        template(slot="content")
          i-svg-icon(icon="close" font-size="13px")

      component(v-show="!modalWindow.loading.is" :is="modalWindow.component")
</template>

<script>
  import ILoader from '@/components/IComponents/ILoader'
  import IButton from '@/components/IComponents/IButton'
  import ISvgIcon from '@/components/IComponents/ISvgIcon'
  import { mapState } from 'vuex'
  import { getNumeric, getStr } from '@/utlis'

  export default {
    name: 'IModalWindow',
    components: {
      ILoader,
      IButton,
      ISvgIcon
    },
    data () {
      return {
        animation: false
      }
    },
    computed: {
      ...mapState({
        modalWindow: state => state.modal
      }),
      strWidth () {
        return getStr(this.modalWindow.width)
      },
      strHeight () {
        return getStr(this.modalWindow.height)
      },
      numericWidth () {
        return getNumeric(this.modalWindow.width)
      },
      numericHeight () {
        return getNumeric(this.modalWindow.height)
      },
      style () {
        return {
          width: this.strWidth,
          height: this.strHeight,
          visibility: this.animation ? 'hidden' : 'visible'
        }
      }
    },
    methods: {
      keydownHandler ($event) {
        if ($event.code === 'Escape') {
          this.close()
        }
      },
      close () {
        this.animation = true

        setTimeout(() => {
          this.$store.dispatch('modal/close')
          this.animation = false
        }, 500)
      }
    },
    beforeMount () {
      addEventListener('keydown', this.keydownHandler)
      this.$root.$on('closeModal', this.close)
    },
    beforeDestroy () {
      removeEventListener('keydown', this.keydownHandler)
      this.$root.$off('closeModal', this.close)
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';
  @import '~s/icons';

  @keyframes close-modal {
    from {
      background-color: rgba(0, 0, 0, 0.55);
    }

    to {
      background-color: rgba(0, 0, 0, 0);
    }
  }

  .i-modal-background {
    position: fixed;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.55);

    &--close-animation {
      animation: close-modal 500ms;
    }

    &__window {
      position: sticky;
      box-sizing: border-box;
      border-radius: 10px;
      background-color: $color-white;
      padding: 30px;

      &--loading {
        @include flex-center;
        // height: 100%;
      }

      &__close-button {
        position: absolute;
        top: 15px;
        right: 15px;
        color: $color-silver-dark;
      }
    }
  }
</style>
