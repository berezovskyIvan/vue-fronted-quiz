<template lang="pug">
  img(src="../../images/components/loader.gif" :style="style")
</template>

<script>
import { getStr, getNumeric } from '@/utlis'

export default {
  name: 'ILoader',
  props: {
    height: {
      type: [Number, String],
      required: false,
      default: 150
    },
    width: {
      type: [Number, String],
      required: false,
      default: 150
    }
  },
  computed: {
    strHeight () {
      return getStr(this.height)
    },
    strWidth () {
      return getStr(this.width)
    },
    numberHeight () {
      return getNumeric(this.height)
    },
    numberWidth () {
      return getNumeric(this.width)
    },
    style () {
      return {
        height: this.strHeight,
        width: this.strWidth
      }
    }
  }
}
</script>
