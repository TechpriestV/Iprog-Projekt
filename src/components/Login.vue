<template>
  <div class="login">
    <h1>{{ uname }}</h1>
    <ul>
      <li v-if="!isLoggedIn()"><button v-on:click="loginTwitter">Logga in med twitter</button>
      <li v-if="isLoggedIn()"><button v-on:click="logout">Logga ut </button></li>
      <li><a href="/#/">Back Home</a></li>
    </ul>
  </div>
</template>

<script>
  var firebase = require("firebase");
  var provider = new firebase.auth.TwitterAuthProvider();

  export default {
    name: 'login',
    data () {
      return {
        msg: 'Login page',
        uname: this.getUserName()
      }
    },
    methods: {
      loginTwitter: function(){
        var self = this; 
        firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // The signed-in user info.
        var twitterUser = result.user;

        self.uname = twitterUser.displayName;

        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        console.log('nu blir det error');
        // ...

      });
      },
      logout: function(){
        var self = this;
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('signed out');
        console.log(firebase.auth().currentUser);

        self.uname = 'Login page';

      }).catch(function(error) {
        // An error happened.
      });
      },
      isLoggedIn: function(){
          if (firebase.auth().currentUser){
            return true;
          }
          else {
            return false;
          }
      },
      getUserName: function(){
        var user = firebase.auth().currentUser;

        if(user) {
          return user.displayName;
        }
        else {
          return 'Login page';
        }
      }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
