<template>
  <div class="sidebar col-sm-2">
    <h4><img :src="user.photoURL" alt="">   {{user.displayName}}</h4>
    <button v-on:click="testDb">Test</button>
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
        'logged_in',
        'userDb'
      ])
    },
    methods: {
      ...mapMutations([
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
      },
      testDb: function () {
        this.userDb.update({test:'test2'})
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
  .sidebar {
    background-color: #999;
    height: 100vh;
  }

  img {
    height: 40px;
    border-radius: 20px;
  }

</style>
