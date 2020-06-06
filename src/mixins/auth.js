import { mapState } from 'vuex'

export default {
  name: 'AuthMixin',
  data () {
    return {
      loading: false
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
        this.loading = false
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
  },
  created () {
    if (!this.wasCheckedAuthStatus) {
      this.loading = true
    }
  }
}
