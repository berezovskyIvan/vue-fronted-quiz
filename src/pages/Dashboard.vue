<template lang="pug">
  .dashboard(:class="{ 'dashboard--loading': loading }")
    template(v-if="loading")
      i-loader
    template(v-else)
      .dashboard__content
        .dashboard__content__header
          h1.dashboard__content__header__title My admin dashboard
          google-auth-button.dashboard__content__header__logout-button
        .dashboard__content__body
          .dashboard__content__body__button-block
            i-button(value="Create quiz"
              background-color="#f5f5f5"
              height="45px"
              @click="openModal")
        my-quizzes
</template>

<script>
  import AuthMixin from '@/mixins/auth'
  import ILoader from '@/components/IComponents/ILoader'
  import IButton from "@/components/IComponents/IButton"
  import GoogleAuthButton from '@/components/auth/GoogleAuthButton'
  import MyQuizzes from '@/pages/Dashboard/MyQuizzes'
  import QuizModal from '@/pages/Dashboard/QuizModal'
  import { mapState } from 'vuex'

  export default {
    name: 'Dashboard',
    mixins: [AuthMixin],
    components: {
      ILoader,
      IButton,
      MyQuizzes,
      GoogleAuthButton
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
        width: 100%;
        height: 120px;

        &__title {
          @include flex-center;
          font-size: 30px;
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

        &__button-block {
          @include flex-center;
          background: white;
          height: 90px;
          width: 700px;
          border-radius: 10px;
          border: 1px dashed $color-black;
        }
      }
    }
  }
</style>
