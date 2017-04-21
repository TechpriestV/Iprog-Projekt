import Vue from 'vue'
import Vuex from 'vuex'
import {db} from './fb'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: false,
    logged_in: false,
    userDb: false
  },
  getters: {
    user: state => state.user,
    logged_in: state => state.logged_in,
    userDb: state => state.userDb
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.userDb = db.ref('user/'+user.uid)
    },
    setLoggedIn(state, value) {
      state.logged_in = value
    }
  }
})
