<template>
  <div class="sidebar col-sm-2">
    <div class="profile-info">
      <h4><img :src="user.photoURL" alt=""> {{user.displayName}}</h4>
    </div>
    <div class="navigation">
      <ul>
        <li><router-link :to="{name:'User'}">Dashboard</router-link></li>
        <li><router-link :to="{name:'Retweets'}">Retweets</router-link></li>
        <li><router-link :to="{name:'Retweets'}">Favorites</router-link></li>
        <li><router-link :to="{name:'Retweets'}">Profile</router-link></li>
        <li><router-link :to="{name:'Retweets'}">Search</router-link></li>
      </ul>
    </div>
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
    background-color: #f5f5f5;
    height: 100vh;
  }

  img {
    height: 40px;
    border-radius: 20px;
  }

  .profile-info {
    margin: 30px 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

</style>
