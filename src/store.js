import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: false,
    logged_in: false,
    user_token: false,
    user_secret: false
  },
  getters: {
    user: state => state.user,
    logged_in: state => state.logged_in,
    user_token: state => state.user_token,
    user_secret: state => state.user_secret
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setLoggedIn(state, value) {
      state.logged_in = value
    },
    setUserToken(state, token) {
      state.user_token = token
    },
    setUserSecret(state, secret) {
      state.user_secret = secret
    }
  }
})
