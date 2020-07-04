<template lang="pug">
  .i-notify(:class="`i-notify--${type}`")
    | {{ value }}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'INotify',
    computed: {
      ...mapState({
        value: state => state.notify.val,
        type: state => state.notify.type
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  @keyframes move {
    0% {
      top: 20px;
    }
    15% {
      top: 150px;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .i-notify {
    @include flex-center;
    position: fixed;
    z-index: 1;
    width: 250px;
    top: 150px;
    right: calc(50% - 700px);
    padding-top: 25px;
    padding-bottom: 25px;
    box-sizing: border-box;
    border-radius: 10px;
    text-align: center;
    line-height: 22px;
    animation: move 6000ms forwards;

    &--info {
      background-color: $color-white;
      border: 1px solid $color-black;
    }

    &--warning {
      background-color: $color-orange;
      color: $color-white;
    }

    &--error {
      background-color: $color-red;
      color: $color-white;
    }
  }
</style>
