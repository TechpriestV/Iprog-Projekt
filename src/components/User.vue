<template>
  <div class="user col-sm-10">
    <h1>Your dashboard for this week</h1>
    {{ errorMsg }}
    <hr>
    <div v-if="!errorMsg" class="row">
      <div class="smallBox col">
          <h2>This week's tweets</h2>
        <hBar :chart-data='tweetsData' :height='155' />
      </div>
      <div class="smallBox col">
          <h2>Interactions per day</h2>
        <lineChart :chart-data='interactionData' :height='155' />
      </div>
      <div class="smallBox col">
          <h2>Total interactions</h2>
        <dNutChart :chart-data='goalData' :height='155' />
      </div>
    </div>
    <div v-if="!errorMsg" class="row">
      <div class="bigBox col">
            <h5>Tweets and interactions over time</h5>
        <barChart :chart-data='historicalData' :height='195'/>
        <!-- <lineChart :data='data4' :height='175' /> -->
      </div>
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
    name: 'user',
    components : {hBar, lineChart, dNutChart, barChart},
    computed: {
      ...mapGetters([
        'user',
        'userDb',
        'logged_in',
        'lastWeekTWeets'
      ])
    },
    mounted: function () {
      var self = this;

      auth.onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("Inloggad");
          self.setUser(user);
          self.setLoggedIn(true);

          self.getTweets(function(returnedTweets){

            // This is the callback from the call,
            // Populate tweetlist.
            var i;
            for (i in returnedTweets){
              self.tweetList.push(returnedTweets[i]);
            }
            // Now we can create the charts.
            if (self.tweetList.length == 0){
              self.errorMsg = 'No tweets to show. (Only shows tweets from the current week)';
            }
            self.createTweetsChart();
            self.createInteractionChart();
            self.createGoalChart();
          },
          function(returnedTweets2){
            var i;
            for (i in returnedTweets2){
              self.tweetList2.push(returnedTweets2[i]);
            }
            self.createHistoricalChart();
          });

        } else {
          console.log("Utloggad");
          self.setUser(false);
          self.setLoggedIn(false);
          self.$router.push({name: 'Hello'})
        }
      })
    },
    data () {
      return {
        tweetList: [],
        tweetList2: [],
        tweetsData: {},
        interactionData: {},
        goalData: {},
        historicalData: {},
        errorMsg: ''
      }
    },
    methods:{
      ...mapMutations([
        'setUser',
        'setLoggedIn'
      ]),
      getTweets: function(cb, cb2) {

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
              access_token_secret: secret
            };
            const serverURL = 'http://178.62.102.83:5000/api/lastseven';
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
            const serverURL2 = 'http://178.62.102.83:5000/api/search';
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
  }
.bigBox {
  height: 300px;
  background-color: #f0f0f0;
  margin: 0px 10px 0px 10px;
  box-sizing: border-box;
}
.smallBox {
  height: 200px;
  background-color: #f0f0f0;
  width: 30%;
  margin-left: 10px;
  margin-bottom: 10px;
  }
.smallBox:last-child{
  margin-right: 10px;
}
hr {
  border-top: #f0f0f0;
  border-left: none;
  border-right: none;
  padding: 10px;
  width: 100%;
  }
h1 {
  margin-top: 30px;
  font-weight: normal;
  }
h2 {
      padding-top: 10px;
      font-weight: lighter;
      font-style: italic;
      font-size: 16px;
    }
h4 {
    font-weight: lighter;
    font-style: italic;
  }
h5 {
      font-weight: lighter;
      font-style: italic;
      font-size: 25px;
      margin: 30px 15px 30px 15px;
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
