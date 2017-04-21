<template>
  <div class="search col-sm-10">
    <h1>Search Page</h1>
    <input v-model="searchInput"
        @keyup.enter="search"
        placeholder="Search tweets">
    <h2>Search history</h2>
    <ul>
      <li v-for="searchpost in searches">{{ searchpost.search }}</li>
    </ul>
  </div>
</template>

<script>
  import { auth_provider, db, auth } from '../fb'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: 'search',
    computed: {
      ...mapGetters([
        'user',
        'userDb',
        'logged_in'
      ])
    },
    mounted: function () {
      var ref = this.userDb.child('searchhistory')
      this.userTweetRef = ref;
    },
    firebase: function() {
      var ref = this.userDb.child('searchhistory');
      return {
        searches: ref.limitToLast(25)
      }  
    },
    data () {
      return {
        searchInput: '',
        userTweetRef: ''
      }
    },
    methods:{
      search: function () {
        if (this.searchInput) {
          this.userTweetRef.push({
            search: this.searchInput
          })
          this.searchInput = '';
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
  text-align: left;
}
hr {
  border-top: #f0f0f0;
  border-left: none;
  border-right: none;
  padding: 10px;
  width: 100%;
  }
h1, h2 {
  font-weight: normal;
  }
h4 {
    font-weight: lighter;
    font-style: italic;
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
