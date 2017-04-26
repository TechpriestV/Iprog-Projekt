<template>
<div class="page col-sm-10">
    <div class="searchbar col-sm-12">
      <input class="searchinput col-sm-12" v-model="searchInput"
        @keyup.enter="search"
        placeholder="Search">
        </div>
    <div class="search col-sm-12">
    <h1>User: {{ latestSearch }}</h1>
    <h3>The latest statistics</h3>
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
  </div>

    <div class="history row">
      <h4>Search history:</h4>
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
        tweetList: [],
        tweetList2: [],
        tweetsData: {},
        interactionData: {},
        goalData: {},
        historicalData: {},
        latestSearch: ''
      }
    },
    methods:{
      search: function () {
        this.tweetList = [];
        this.tweetList2 = [];
        var self = this;
        if (this.searchInput) {
          this.userTweetRef.push({
            search: this.searchInput
          })
          this.getSearchTweets(this.searchInput, function(user){
              // This is the callback from the call,
              // Populate tweetlist.
              var i;
              for (i in user){
                self.tweetList.push(user[i]);
              }
              // Now we can create the charts.
              self.createTweetsChart();
              self.createInteractionChart();
              self.createGoalChart();
          },
          function(user2){
            var i;
            for (i in user2){
              self.tweetList2.push(user2[i]);
            }
            self.createHistoricalChart();
          });

          this.latestSearch = this.searchInput;
          this.searchInput = '';
        }
      },
      getSearchTweets: function(searchterm, cb, cb2) {
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
            const serverURL = 'http://localhost:5000/api/lastseven';
            self.$http.post(serverURL, tweetInfo).then(response => {
              self.someData = response.body;
              // Return the tweets
              // console.log(self.someData);
              cb(self.someData);
            }, response => {
              // error callback
              console.log("Error");
              if (response.body) {
                console.log(response.body.message);
              }
            });
            const serverURL2 = 'http://localhost:5000/api/search';
            self.$http.post(serverURL2, tweetInfo).then(response => {
              self.someData = response.body;
              // Return the tweets
              // console.log(self.someData);
              cb2(self.someData);
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

        for (i in this.tweetList2){
          var timestamp = this.tweetList2[i].created_at.split(' ');

          if (timestamp[5] == 2017){
            var favs = this.tweetList2[i].favorite_count;
            if (!favs){
              // If no favs, set it to zero
              favs = 0;
            }
            var rts = this.tweetList2[i].retweet_count;
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
          labels: ["January", "Feburary", "Mars", "April"],
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
.searchbar {
  background-color: red;
  height: 50px;
  padding: 0px;
  box-sizing: border-box;
}
.searchinput {
  padding: 0px;
  height: 50px;
  box-sizing: border-box;
  padding-left: 25px;
  background-color: #f7f7f7;
  border: 0px;
}
.page {
  padding: 0;
}

.bigBox {
  height: 300px;
  background-color: #f0f0f0;
  margin: 0px 10px 0px 10px;
  box-sizing: border-box;
}
.smallBox {
  height: 180px;
  background-color: #f0f0f0;
  width: 30%;
  margin-left: 10px;
  margin-bottom: 10px;
  }
.smallBox:last-child{
  margin-right: 10px;
}
.history {
  padding: 0px;
  box-sizing: border-box;
  margin-left: 0px;
  margin-top: 10px;
  height: 60px;
  background-color: #f7f7f7;
  border: 0px;

}
hr {
  border-top: #f0f0f0;
  border-left: none;
  border-right: none;
  padding: 10px;
  width: 100%;
  }
h1 {
  margin-top: 20px;
  font-weight: normal;
  text-align: left;
  }
h4 {
    font-weight: lighter;
    font-style: italic;
    font-size: 17px;
    padding: 8px;
    text-align: left;
  }
h3 {
      font-weight: lighter;
      font-style: italic;
      font-size: 17px;
      text-align: left;
    }
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 6px;
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
