<template lang="pug">
  .dashboard(:class="{ 'dashboard--loading': loading }")
    template(v-if="loading")
      i-loader
    template(v-else)
      .dashboard__content
        .dashboard__content__header
          i-button.dashboard__content__header__back-button(
            height="50px"
            width="50px"
            background-color="white"
            round
            @click="goBack"
          )
            template(slot="content")
              i-svg-icon(icon="back" font-size="20px")
          h1.dashboard__content__header__title Admin dashboard
          google-auth-button.dashboard__content__header__logout-button
        .dashboard__content__body
          .dashboard__content__body__button-block
            i-button(
              value="Create quiz"
              background-color="#212121"
              color="white"
              height="45px"
              @click="openModal"
            )
        my-quizzes
</template>

<script>
  import AuthMixin from '@/mixins/auth'
  import ILoader from '@/components/IComponents/ILoader'
  import IButton from "@/components/IComponents/IButton"
  import GoogleAuthButton from '@/components/auth/GoogleAuthButton'
  import MyQuizzes from '@/pages/Dashboard/MyQuizzes'
  import QuizModal from '@/pages/Dashboard/QuizModal'
  import ISvgIcon from '@/components/IComponents/ISvgIcon'
  import { mapState } from 'vuex'

  export default {
    name: 'Dashboard',
    mixins: [AuthMixin],
    components: {
      ILoader,
      IButton,
      MyQuizzes,
      GoogleAuthButton,
      ISvgIcon
    },
    data () {
      return {
        myQuizzesLoading: false
      }
    },
    computed: {
      ...mapState({
        isSignedIn: state => state.auth.isSignedIn
      }),
      loading () {
        return this.authLoading || this.myQuizzesLoading
      }
    },
    watch: {
      isSignedIn (val) {
        if (val) {
          this.getMyQuizzes()
        }
      }
    },
    methods: {
      getMyQuizzes () {
        this.myQuizzesLoading = true

        this.$store.dispatch('quiz/get-my').then(({ data }) => {
          this.$store.commit('quiz/get-my', data)

          this.myQuizzesLoading = false
        }).catch(err => {
          if (err && err.response && err.response.data) {
            console.error(err.response.data)
          } else {
            console.error(err)
          }

          this.myQuizzesLoading = false
        })
      },
      openModal () {
        const obj = {
          isOpen: true,
          width: 550,
          height: 300,
          component: QuizModal
        }

        this.$store.dispatch('modal/open', obj)
      },
      goBack () {
        this.$router.go(-1)
      }
    },
    beforeMount () {
      if (this.isSignedIn) {
        this.getMyQuizzes()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~s/global';

  .dashboard {
    &--loading {
      @include flex-center;
      height: 100%;
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__header {
        position: absolute;
        width: 100%;
        height: 100px;
        background-color: $color-black;
        color: white;

        &__back-button {
          position: absolute;
          top: 20px;
          left: 50px;
          background-color: $color-white;
        }

        .i-button {
          &:hover {
            opacity: 1;

            >>> {
              .i-svg-icon {
                z-index: 1;
                fill: $color-white;
              }
            }

            &:before {
              content: '';
              position: absolute;
              height: 42px;
              width: 42px;
              border-radius: 50%;
              background-color: $color-black;
            }
          }
        }

        &__title {
          @include flex-center;
          font-size: 32px;
          font-weight: bold;
          height: 50px;
        }

        &__logout-button {
          position: absolute;
          right: 50px;
          top: 20px;
        }
      }

      &__body {
        display: flex;
        width: 700px;
        margin-bottom: 20px;
        margin-top: 150px;

        &__button-block {
          @include flex-center;
          height: 90px;
          width: 700px;
          border-radius: 10px;
          border: 1px dashed $color-black;
        }
      }
    }
  }
</style>
