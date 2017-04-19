<template>
  <div class="sidebar col-sm-2">
    <img :src="user.photoURL" alt="">
    <h1>{{user.displayName}}</h1>
  </div>
</template>

<script>
  import { auth_provider, db, auth } from '../fb'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: 'sidebar',
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
      logout: function () {
        auth.signOut().then(function() {
          // Sign-out successful.
          console.log('Signed out!')
        }).catch(function(error) {
          console.log(error)
        });

      }
    },
    mounted: function () {
      const self = this;
      auth.onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log(user);
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
  .sidebar {
    background-color: #999;
    height: 100vh;
  }

</style>
