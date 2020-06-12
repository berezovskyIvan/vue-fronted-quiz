<template lang="pug">
  img.i-svg-icon(
    v-show="successLoad"
    :src="path"
    :style="style"
    @load="successLoad = true"
    @error="errorLoad = true"
    @click="$event => $emit('click', $event)"
  )
</template>

<script>
  import { getStr, getNumeric } from '@/utlis'

  export default {
    name: 'ISvgIcon',
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
          width: this.strFontSize,
          height: this.strFontSize
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .i-svg-icon {

  }
</style>
