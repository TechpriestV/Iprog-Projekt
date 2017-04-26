<template>
  <div class="sidebar col-sm-2">
    <div class="profile-info">
      <img :src="user.photoURL" alt="">
      <h4>{{user.displayName}}</h4>
    </div>
    <div class="navigation">
      <ul>
        <router-link :to="{name:'User'}" tag="li" active-class="active">Dashboard</router-link>
        <router-link :to="{name:'Profile'}" tag="li" active-class="active">Profile</router-link>
        <router-link :to="{name:'Search'}" tag="li" active-class="active">Search</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  import { auth_provider, db, auth } from '../fb'
  import { mapGetters } from 'vuex'

  export default {
    name: 'sidebar',
    computed: {
      ...mapGetters([
        'user'
      ])
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sidebar {
    background-color: #f5f5f5;
    padding: 0;
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

  li {
    margin: 20px;
    border: 0px;
    border-radius: 14px;
  }

  li:hover {
    background-color: white;
    text-decoration: none;
    cursor: pointer;
    border: 0px;
    border-radius: 14px;
  }

  .active {
    background-color: white;
    text-decoration: none;
  }

</style>
