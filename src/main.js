// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
var firebase = require("firebase");


var config = {
    apiKey: "AIzaSyBynTwG2BgbHOpTu8Wg0EICpnQaTM1ijBA",
    authDomain: "iprog-project-be9e4.firebaseapp.com",
    databaseURL: "https://iprog-project-be9e4.firebaseio.com",
    projectId: "iprog-project-be9e4",
    storageBucket: "iprog-project-be9e4.appspot.com",
    messagingSenderId: "593475791620"
  };
firebase.initializeApp(config);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
