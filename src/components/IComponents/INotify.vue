<template lang="pug">
  .i-notify
    span.i-notify__value {{ value }}
    .i-notify__icon-block(:class="`i-notify__icon-block--${type}`")
      i-svg-icon(:icon="type" font-size="17px")
</template>

<script>
import ISvgIcon from '@/components/IComponents/ISvgIcon'
import { mapState } from 'vuex'

export default {
  name: 'INotify',
  components: {
    ISvgIcon
  },
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
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: fixed;
  z-index: 1;
  width: 250px;
  top: 150px;
  right: calc(50% - 700px);
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  text-align: center;
  line-height: 22px;
  animation: move 6000ms forwards;
  background-color: $color-black;
  font-weight: bold;
  color: white;

  &__value {
    max-width: calc(100% - 60px);
  }

  &__icon-block {
    @include flex-center;
    width: 40px;
    height: 40px;
    margin-left: auto;
    border-radius: 50%;
    background-color: $color-white;

    &--info {
      background-color: $color-white;
    }

    &--warning {
      background-color: $color-orange;
    }

    &--error {
      background-color: $color-red;
    }
  }
}
</style>
