<template>
  <div class="login">
    <div v-if="logged_in">
      <h1>Welcome back {{ user.displayName }}!</h1>
      <button v-on:click="start">Start!</button>
      <button v-on:click="logout">Logga ut </button>
    </div>
    <div v-if="!logged_in">
      <h1>Welcome, please log in!</h1>
      <button v-on:click="loginTwitter">Logga in med twitter</button>
    </div>
  </div>
</template>

<script>
  import { auth_provider, db, auth } from '../fb'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: 'login',
    computed: {
      ...mapGetters([
    		  'user',
          'logged_in',
          'userDb'
        ])
    },
    methods: {
      ...mapMutations([
        'setUserToken',
        'setUserSecret',
        'setUser',
        'setLoggedIn'
      ]),
    	loginTwitter: function () {
      	const self = this;
    		auth.signInWithPopup(auth_provider).then(function(result) {
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.
          self.setUser(result.user);
          self.userDb.update({token: result.credential.accessToken, seccret: result.credential.secret})
        }).catch(function(error) {
          console.log('Nu blir det error' + error);
        })
      },
      logout: function () {
        auth.signOut().then(function() {
          // Sign-out successful.
          console.log('Signed out!')
        }).catch(function(error) {
          console.log(error)
        });
      },
      start: function () {
        this.$router.push({name: 'User'})
      }
    },
    mounted: function () {
    	const self = this;
      auth.onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          self.setUser(user);
          self.setLoggedIn(true);

        } else {

          self.setUser(false);
          self.setLoggedIn(false);

        }
      });
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
