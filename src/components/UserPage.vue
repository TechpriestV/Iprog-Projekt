<template>
  <div id="userpage">
    <div class="container-fluid">
      <div class="row">
        <sidebar/>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar.vue'
  import { auth_provider, db, auth } from '../fb'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: 'UserPage',
    components : {Sidebar},
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
      ])
    },
    created: function () {
    	console.log("hej");
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

<style>

</style>
