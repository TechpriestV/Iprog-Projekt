import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire);

const config = {
  apiKey: "AIzaSyBynTwG2BgbHOpTu8Wg0EICpnQaTM1ijBA",
  authDomain: "iprog-project-be9e4.firebaseapp.com",
  databaseURL: "https://iprog-project-be9e4.firebaseio.com",
  projectId: "iprog-project-be9e4",
  storageBucket: "iprog-project-be9e4.appspot.com",
  messagingSenderId: "593475791620"
};

const firebaseApp = Firebase.initializeApp(config);



// Authentication
const auth = Firebase.auth();
const auth_provider = new Firebase.auth.TwitterAuthProvider();

// Database
const db = firebaseApp.database();

export {auth_provider, db, auth};
