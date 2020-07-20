import { mapState } from 'vuex'

export default {
  name: 'AuthMixin',
  data () {
    return {
      authLoading: false
    }
  },
  computed: {
    ...mapState({
      wasCheckedAuthStatus: state => state.auth.wasCheckedStatus,
      isSignedIn: state => state.auth.isSignedIn
    }),
    requiredAuth () {
      return this.$route.meta.requiredAuth
    },
    showPage () {
      if (!this.requiredAuth) {
        return true
      }

      return this.wasCheckedAuthStatus && this.isSignedIn
    }
  },
  watch: {
    wasCheckedAuthStatus (val) {
      if (val) {
        if (this.$route.name === 'main') {
          if (this.isSignedIn) {
            this.$router.push({ name: 'dashboard' })
          } else {
            this.$router.push({ name: 'login' })
          }
        }

        this.authLoading = false
        this.checkAuth()
      }
    }
  },
  methods: {
    checkAuth () {
      if (this.requiredAuth && !this.isSignedIn) {
        this.$router.push({ name: 'login' })
      }
    }
  },
  created () {
    if (!this.wasCheckedAuthStatus) {
      this.authLoading = true
    }
  }
}
