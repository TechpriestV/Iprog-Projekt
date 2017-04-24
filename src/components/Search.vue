<template>
  <div class="search col-sm-10">
    <h1>Search Page</h1>
    <input v-model="searchInput"
        @keyup.enter="search"
        placeholder="Search user">
    <h2>{{ latestSearch }}</h2>

    <div class="row">
      <div class="smallBox col">
        <hBar :chart-data='tweetsData' :height='175' />
      </div>
      <div class="smallBox col">
        <lineChart :chart-data='interactionData' :height='175' />
      </div>
      <div class="smallBox col">
        <dNutChart :chart-data='goalData' :height='175' />
      </div>
    </div>
    <div class="row">
      <div class="bigBox col">

        <barChart :chart-data='historicalData' :height='175'/>
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
      this.createInteractionChart();
      this.createTweetsChart();
      this.createHistoricalChart();

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
        tweetsData: {},
        interactionData: {},
        goalData: {},
        historicalData: {},
        latestSearch: ''
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
              self.createTweetsChart(); 
              self.createInteractionChart();
              self.createGoalChart();
              self.createHistoricalChart();
              
          });

          this.latestSearch = this.searchInput;
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
          var favs = 0;
          // var replies = 0;
          var retweets = 0;
          for (i in this.tweetList){
            if (this.tweetList[i].favorite_count){
              favs += this.tweetList[i].favorite_count;
            }
            if (this.tweetList[i].retweet_count){
              retweets += this.tweetList[i].retweet_count;
            }
          }

          this.goalData = {
            labels: [
              "Favorites",
              // "Replies",
              "Retweets"
            ],
            datasets: [
                 {
                // data: [favs, replies, retweets],
                data: [favs, retweets],
                backgroundColor: [
                  "#FF6384",
                  // "#36A2EB",
                  "#FFCE56"
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  // "#36A2EB",
                  "#FFCE56"
                ]
              }
            ]
          }

      },
      createTweetsChart: function () {
        var i;
        var dataArray = [0,0,0,0,0,0,0];
        for (i in this.tweetList){
          var timestamp = this.tweetList[i].created_at.split('');

          if (timestamp[0] == 'M'){
            dataArray[0] += 1;
          }
          else if(timestamp[0] == 'T'){
            if (timestamp[1] == 'u'){
              // Tuesday
              dataArray[1] += 1;
            }
            else {
              //Thursday
              dataArray[3] += 1;
            }
          }
          else if(timestamp[0] == 'W'){
            // Wednesday
            dataArray[2] +=+ 1;
          }
          else if(timestamp[0] == 'F') {
            // Friday
            dataArray[4] += 1;
          }
          else if (timestamp[0] == 'S'){
            if (timestamp[1] == 'a'){
              // Saturday
              dataArray[5] += 1;
            }
            else {
              dataArray[6] += 1;
            }
          }
        }

        this.tweetsData = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [
            {
              label: 'Tweets',
              backgroundColor: '#f87979',
              data: dataArray
            }
          ]
        }
      },
      createInteractionChart: function () {
        var i;
        var dataArray = [0,0,0,0,0,0,0];
        for (i in this.tweetList){
          var favs = this.tweetList[i].favorite_count;
          if (!favs){
            // If no favs, set it to zero
            favs = 0;
          }
          var rts = this.tweetList[i].retweet_count;
          if (!rts){
            rts = 0;
          }
          var tot = favs + rts;

          var timestamp = this.tweetList[i].created_at.split(' ');

          if (timestamp[0] == 'Mon'){
            // Monday
            dataArray[0] += tot;
          }
          else if(timestamp[0] == 'Tue'){
            // Tuesday
            dataArray[1] += tot;
          }
          else if(timestamp[0] == 'Wed'){
            // Wednesday
            dataArray[2] += tot;
          }
          else if(timestamp[0] == 'Thu') {
            // Friday
            dataArray[3] += tot;
          }
          else if(timestamp[0] == 'Fri') {
            // Friday
            dataArray[4] += tot;
          }
          else if (timestamp[0] == 'Sat'){
            // Saturday
            dataArray[5] += tot;
          }
          else if (timestamp[0] == 'Sun'){
            // Sunday
            dataArray[6] += tot;
          }
        }

        this.interactionData = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [
            {
              label: 'Interactions',
              fill: false,
              backgroundColor: '#36A2EB',
              data: dataArray
            }
          ]
        }
      },
      createHistoricalChart: function () {
        var i;
        var interactionArray = [0, 0, 0, 0];
        var tweetArray = [0, 0, 0, 0];

        for (i in this.tweetList){
          var timestamp = this.tweetList[i].created_at.split(' ');
          
          if (timestamp[5] == 2017){
            var favs = this.tweetList[i].favorite_count;
            if (!favs){
              // If no favs, set it to zero
              favs = 0;
            }
            var rts = this.tweetList[i].retweet_count;
            if (!rts){
              rts = 0;
            }
            var interactions = favs + rts;

            if (timestamp[1] == 'Jan'){
              interactionArray[0] += interactions;
              tweetArray[0] += 1;
            }
            else if (timestamp[1] == 'Feb'){
              interactionArray[1] += interactions;
              tweetArray[1] += 1;
            }
            else if (timestamp[1] == 'Mar'){
              interactionArray[2] += interactions;
              tweetArray[2] += 1;
            }
            else if (timestamp[1] == 'Apr'){
              interactionArray[3] += interactions;
              tweetArray[3] += 1;
            }
          }
        }


        this.historicalData = {
          labels: ["January", "Feburai", "Mars", "April"],
          datasets: [
            {
              label: "Tweets",
              backgroundColor: "#f87979",
              fill: false,
              data: tweetArray
            },
            {
              label: "Interactions",
              backgroundColor: "#36A2EB",
              fill: false,
              data: interactionArray
            }
          ]
        };

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
