<template lang="pug">
  .my-quiz(:class="{ 'my-quiz--loading': loading }")
    i-loader(v-if="loading" width="70px" height="70px")
    template(v-else)
      .my-quiz__icons
        i-svg-icon(icon="bin", @click="deleteQuiz")
        i-svg-icon(icon="edit" @click="editQuiz")
      .my-quizzes__el__attr
        span.my-quiz__attr__title Описание
        span.my-quiz__attr__value {{ item.description }}
      .my-quiz__attr
        span.my-quiz__attr__title Путь
        span.my-quiz__attr__value {{ item.url }}
</template>

<script>
  import ILoader from '@/components/IComponents/ILoader'
  import ISvgIcon from '@/components/IComponents/ISvgIcon'
  import TestEl from '@/pages/Dashboard/TestEl'

  export default {
    name: 'MyQuiz',
    components: {
      ILoader,
      ISvgIcon
    },
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        loading: false
      }
    },
    methods: {
      deleteQuiz () {
        this.loading = true

        const obj = {
          userId: this.item.user_id
        }
        const gidIndex = this.item.url.indexOf('gid=')

        if (gidIndex !== -1) {
          obj.url = this.item.url.substr(0, gidIndex - 1)
          obj.gid = this.item.url.substr(gidIndex + 4, this.item.url.length)
        } else {
          obj.url = this.item.url
        }

        this.$store.dispatch('quiz/delete', obj).then(res => {
          if (res && res.data) {
            this.$store.commit('quiz/delete', {
              userId: this.item.user_id,
              url: this.item.url
            })
          }

          this.loading = false
        }).catch(err => {
          if (err.response && err.response.statusText) {
            console.error(err.response.statusText)
          } else {
            console.error(err)
          }

          this.loading = false
        })
      },
      editQuiz () {
        const obj = {
          isOpen: true,
          width: 700,
          height: 400,
          component: TestEl,
          oldData: {
            description: this.item.description,
            url: this.item.url
          }
        }

        this.$store.dispatch('modal/open', obj)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .my-quiz {
    position: sticky;
    box-sizing: border-box;
    width: 700px;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid $color-silver;

    &--loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 118px;
    }

    &__icons {
      position: absolute;
      top: 15px;
      right: 15px;

      .i-svg-icon {
        cursor: pointer;

        &:first-child {
          margin-right: 10px;
        }
      }
    }

    &__attr {
      &:not(:last-child) {
        margin-bottom: 20px;
      }

      &__title {
        font-weight: 600;
        margin-right: 15px;
      }
    }
  }
</style>
