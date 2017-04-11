<template>
  <div class="login">
    <h1>{{ user.displayName }}</h1>
    <ul>
      <li v-if="!logged_in"><button v-on:click="loginTwitter">Logga in med twitter</button>
      <li v-if="logged_in"><button v-on:click="logout">Logga ut </button></li>
    </ul>
  </div>
</template>

<script>
  import {auth_provider, db, auth} from '../fb'
  import { mapMutations } from 'vuex'
  import { mapGetters} from 'vuex'

  export default {
    name: 'login',
    computed: {
      ...mapGetters([
    		  'user',
          'logged_in'
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
          self.setUserToken(result.credential.accessToken);
          self.setUserSecret(result.credential.secret);
          // The signed-in user info.
          self.setUser(result.user);

          self.setLoggedIn(true);

        }).catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;

          console.log('Nu blir det error' + errorMessage);

        })
      },
      logout: function () {

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
