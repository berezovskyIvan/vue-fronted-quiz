<template lang="pug">
  .quiz-dashboard
    span.quiz-dashboard__title {{ item.description }}
    i-svg-icon(icon="rocket" font-size="25px" custom-class-name="quiz-dashboard__icon" @click="click")
</template>

<script>
  import ISvgIcon from '@/components/IComponents/ISvgIcon'

  export default {
    name: 'QuizDashboard',
    components: {
      ISvgIcon
    },
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      click ($event) {
        console.log('click', $event)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .quiz-dashboard {
    @include flex-center;
    width: 250px;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid $color-silver;

    &__title {
      margin-right: 20px;
    }

    >>> {
      .quiz-dashboard__icon {
        fill: $color-blue-gray;
        cursor: pointer;

        &:hover {
          fill: $color-silver-dark;
        }
      }
    }
  }
</style>
