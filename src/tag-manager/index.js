import config from '#/config'
import Vue from 'vue'
import VueTagManager from 'vue-tag-manager'

Vue.use(VueTagManager, {
  gtmId: config.google.tagManagerId
})
