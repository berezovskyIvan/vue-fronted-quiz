<template lang="pug">
  .i-svg-icon(@click="$event => $emit('click', $event)")
    simple-s-v-g(:src="path"
      :width="strFontSize"
      :height="strFontSize"
      :style="style"
      :custom-class-name="customClassName")
</template>

<script>
  import { SimpleSVG } from 'vue-simple-svg'
  import { getStr, getNumeric } from '@/utlis'

  export default {
    name: 'ISvgIcon',
    components: {
      SimpleSVG
    },
    props: {
      icon: {
        type: String,
        required: true,
        default: false
      },
      fontSize: {
        type: String,
        required: false,
        default: '15px'
      },
      fill: {
        type: String,
        required: false,
        default: ''
      },
      customClassName: {
        type: String,
        required: false,
        default: ''
      }
    },
    data () {
      return {
        successLoad: false,
        errorLoad: false
      }
    },
    computed: {
      path () {
        return `src/images/icons/${this.icon}.svg`
      },
      strFontSize () {
        return getStr(this.fontSize)
      },
      style () {
        return {
          fill: this.fill
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .i-svg-icon {
    display: flex;
  }
</style>
