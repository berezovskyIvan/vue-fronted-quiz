<template lang="pug">
  .i-button(
    :class="[{ 'i-button--border': haveBorder }, { 'i-button--disabled': disabled }]"
    :style="style" @click="click"
  )
    span(v-html="value")
    slot(v-if="!value" name="content")
</template>

<script>
  import { getStr, getNumeric } from '@/utlis'

  export default {
    name: 'IButton',
    props: {
      value: {
        type: String,
        required: false,
        default: ''
      },
      height: {
        type: [Number, String],
        required: false,
        default: ''
      },
      width: {
        type: [Number, String],
        required: false,
        default: ''
      },
      backgroundColor: {
        type: String,
        required: false,
        default: ''
      },
      color: {
        type: String,
        required: false,
        default: ''
      },
      haveBorder: {
        type: Boolean,
        required: false,
        default: false
      },
      round: {
        type: Boolean,
        required: false,
        default: false
      },
      disabled: {
        type: Boolean,
        requied: false,
        default: false
      }
    },
    computed: {
      strWidth () {
        return getStr(this.width)
      },
      strHeight () {
        return getStr(this.height)
      },
      numberWidth () {
        return getNumeric(this.width)
      },
      numberHeight () {
        return getNumeric(this.height)
      },
      style () {
        return {
          height: this.strHeight,
          width: this.strWidth,
          backgroundColor: this.backgroundColor,
          color: this.color,
          borderRadius: this.round ? '50%' : '',
          padding: this.round ? 0 : null
        }
      }
    },
    methods: {
      click ($event) {
        if (!this.disabled) {
          this.$emit('click', $event)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .i-button {
    @include flex-center;
    width: fit-content;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 5px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &--border {
      border: 1px solid $color-silver;

      &:hover {
        border: 1px solid $color-silver-dark
      }
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
</style>
