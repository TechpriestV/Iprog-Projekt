import Vue from 'vue'
import Vuex from 'vuex'
import {db} from './fb'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: false,
    logged_in: false,
    userDb: false,
    lastWeekTWeets: [0,0,1,0,1,0,0]
  },
  getters: {
    user: state => state.user,
    logged_in: state => state.logged_in,
    userDb: state => state.userDb,
    lastWeekTWeets: state => state.lastWeekTWeets
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.userDb = db.ref('user/'+user.uid)
    },
    setLoggedIn(state, value) {
      state.logged_in = value
    },
    uppdateLastWeekTweets(state, tweets) {
      console.log("HEJ");
      state.lastWeekTWeets = tweets
      console.log('LastWeek');
    },
    getLastWeekTweets(state){
      return state.lastWeekTWeets
    }
  }
})
