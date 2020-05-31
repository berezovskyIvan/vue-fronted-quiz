import { mapState } from 'vuex'

export default {
  name: 'AuthMixin',
  computed: {
    ...mapState({
      wasCheckedAuthStatus: state => state.auth.wasCheckedAuthStatus,
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
        this.checkAuth()
      }
    }
  },
  methods: {
    checkAuth () {
      if (this.requiredAuth && !this.isSignedIn) {
        this.$router.push({ name: 'main' })
      }
    }
  }
}
