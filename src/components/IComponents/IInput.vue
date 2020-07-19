<template lang="pug">
  .i-input(:style="style")
    input(:value="value"
      ref="input"
      :placeholder="placeholder"
      @input="input"
      @keydown.enter="enter")
</template>

<script>
import { getStr, getNumeric } from '@/utlis'

export default {
  name: 'IInput',
  model: {
    type: 'input',
    prop: 'value'
  },
  props: {
    value: {
      type: String,
      default: '',
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    width: {
      type: [Number, String],
      required: false,
      default: 250
    },
    height: {
      type: [Number, String],
      required: false,
      default: 45
    }
  },
  computed: {
    strWidth () {
      return getStr(this.width)
    },
    strHeight () {
      return getStr(this.height)
    },
    numericWidth () {
      return getNumeric(this.width)
    },
    numericHeight () {
      return getNumeric(this.height)
    },
    style () {
      return {
        width: this.strWidth,
        height: this.strHeight
      }
    }
  },
  methods: {
    input () {
      this.$emit('input', this.$refs.input.value)
    },
    enter ($event) {
      this.$emit('enter', $event)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~s/global.scss";

.i-input {
  @include flex-center;
  box-sizing: border-box;
  margin: 5px;
  border-radius: 8px;

  input {
    height: 100%;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    outline: none;
    border-radius: inherit;
    font-size: 16px;
    border: 1px solid $color-silver;
  }
}
</style>
