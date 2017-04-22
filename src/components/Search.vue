<template>
  <div class="search col-sm-10">
    <h1>Search Page</h1>
    <input v-model="searchInput"
        @keyup.enter="search"
        placeholder="Search user">

    <div class="row">
      <div class="smallBox col">
        <hBar :data='data1' :height='175' />
      </div>
      <div class="smallBox col">
        <lineChart :data='data2' :height='175' />
      </div>
      <div class="smallBox col">
        <dNutChart :chart-data='goalData' :height='175' />
      </div>
    </div>
    <div class="row">
      <div class="bigBox col">

        <barChart :data='data4' :height='175'/>
        <!-- <lineChart :data='data4' :height='175' /> -->
      </div>
    </div>
    <div class="row">
      <h2>Search history</h2>
      <ul>
        <li v-for="searchpost in searches">{{ searchpost.search }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import hBar from "./hBar"
  import lineChart from './lineChart'
  import dNutChart from './dNutChart'
  import barChart from './barChart'
  import { auth_provider, db, auth } from '../fb'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: 'search',
    components : {hBar, lineChart, dNutChart, barChart},
    computed: {
      ...mapGetters([
        'user',
        'userDb',
        'logged_in'
      ])
    },
    mounted: function () {
      this.createGoalChart();

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
        tweetList : [],
        data1: this.getTweetsData(),
        data2: this.getInteractionData(),
        goalData: {},
        data4: this.historicalData(),
      }
    },
    methods:{
      search: function () {
        this.tweetList = []
        var self = this;
        if (this.searchInput) {
          this.userTweetRef.push({
            search: this.searchInput
          })
          this.getSearchTweets(this.searchInput, function(user){
              // self.user = user;
              // console.log(user);
              // Populate tweetList
              var i;
              for (i in user){
                self.tweetList.push(user[i]);
              }
              // Now we can create the charts. 
              self.createGoalChart();
              
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
              cb(self.someData);
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
      },
      createGoalChart: function(){
          var i;
          var favs = 100;
          var replies = 50;
          var retweets = 100;
          for (i in this.tweetList){
            if (this.tweetList[i].favorite_count){
              favs += this.tweetList[i].favorite_count;
            }
            if (this.tweetList[i].retweet_count){
              retweets += this.tweetList[i].retweet_count;
            }

          }
          console.log(favs);
          console.log(retweets);

          this.goalData = {
            labels: [
              "Favs",
              "Replies",
              "Retweets"
            ],
            datasets: [

                 {
                data: [favs, replies, retweets],
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
                ]
              }
            ]
          }
          console.log(this.goalData);

      },
      getTweetsData: function () {
        return {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [
            {
              label: 'Tweets',
              backgroundColor: '#f87979',
              data: [3, 2,3,1,3,0,1]
            }
          ]
        }
      },
      getInteractionData: function () {
        return {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [
            {
              label: 'Interactions',
              fill: false,
              backgroundColor: '#36A2EB',
              data: [1, 0,2,0,1,0,1]
            }
          ]
        }
      },
      historicalData: function () {
        var data = {
          labels: ["January", "Feburai", "Mars", "April", "May", "June", "July", "Agust", "September", "October", "November", "December"],
          datasets: [
            {
              label: "Tweets",
              backgroundColor: "#f87979",
              fill: false,
              data: [32,17,24, 20, 14, 10,41,24,17,29,11,32]
            },
            {
              label: "Interactions",
              backgroundColor: "#36A2EB",
              fill: false,
              data: [40,13,25,17,22,34,46,11,22,35,31,42]
            }
          ]
        };
      return data

      }
      // Last method
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
