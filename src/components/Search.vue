<template>
  <div class="search col-sm-10">
    <h1>Search Page</h1>
    <input v-model="searchInput"
        @keyup.enter="search"
        placeholder="Search user">
    <div class="searchResults">
      <h2>Result</h2>
        <div class="searchResults__tweet">
          <div class="displayName"><h3>{{ user.name }} - @{{ user.screen_name }}</h3></div>
          <!-- <div class="displayText">{{ tweet.text }}</div> -->
        </div>
    </div>
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
        searches: ref.limitToLast(5)
      }  
    },
    data () {
      return {
        searchInput: '',
        userTweetRef: '',
        user : {}
      }
    },
    methods:{
      search: function () {
        this.displayTweets = []
        var self = this;
        if (this.searchInput) {
          this.userTweetRef.push({
            search: this.searchInput
          })
          this.getSearchTweets(this.searchInput, function(user){
              self.user = user;
              console.log(user);
          });
          this.searchInput = '';
        }
      },
      getSearchTweets: function(searchterm, cb) {
        var ref = this.userDb.child('searchhistory')
        this.userTweetRef = ref;

        var self = this;
        var userTokenRef = this.userDb.child('token')
        var userSecretRef = this.userDb.child('secret')
        userTokenRef.once('value').then( function (snapshot) {
          var token = snapshot.val();
          userSecretRef.once('value').then(function (snapshot) {
            var secret = snapshot.val();
            twitterReq(token, secret);
          });
        });
        function twitterReq(token, secret) {
          if (token && secret) {
            const tweetInfo = {
              consumer_key: '45QA0HdFT6J2DDgvScJs6FKxb',
              consumer_secret: '7Qm1KywGDIDVyVfG0JfgAZifZNPzPuudi4AjOL6nlIUB56QNLi',
              access_token: token,
              access_token_secret: secret,
              term: searchterm
            };
            const serverURL = 'http://localhost:5000/api/search';
            self.$http.post(serverURL, tweetInfo).then(response => {
              self.someData = response.body;
              // Return the tweets
              cb(JSON.parse(self.someData));
            }, response => {
              // error callback
              console.log("Error");
              if (response.body) {
                console.log(response.body.message);
              }
            });
          } else {
            console.log("Not signed in! Should kick user back!")
          }
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
  .searchResults__tweet {
    padding: 15px;
    margin-bottom: 10px;
    border:1px solid red;
  }
</style>
