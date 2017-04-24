<template>
  <div class="user col-sm-10">
    <h1>Dashboard</h1>
    <hr>
    <div class="row">
      <div class="smallBox col">
        <hBar :data='data1' :height='175' />
      </div>
      <div class="smallBox col">
        <lineChart :data='data2' :height='175' />
      </div>
      <div class="smallBox col">
        <dNutChart :chart-data='data3' :height='175' />
      </div>
    </div>
    <div class="row">
      <div class="bigBox col">

        <barChart :data='data4' :height='175'/>
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
        this.getGoalData();
        console.log("Här borde user sevret komma> ");

        if (this.user_token && this.user_secret) {
          const tweetInfo = {
            consumer_key: '45QA0HdFT6J2DDgvScJs6FKxb',
            consumer_secret: '7Qm1KywGDIDVyVfG0JfgAZifZNPzPuudi4AjOL6nlIUB56QNLi',
            access_token: false, // ska ändras till db ref
            access_token_secret: false, // ska ändras till db ref
          };

          const serverURL = 'http://localhost:5000/api/gettweets';
          this.$http.post(serverURL, tweetInfo).then(response => {
            this.someData = response.body;
            console.log(this.someData);
          }, response => {
            // error callback
            console.log("Error");
            if (response.body) {
              console.log(response.body.message);
            }
          });
        } else (
          console.log("Not signed in! Should kick user back!")
        )
        
      auth.onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("Inloggad");
          self.setUser(user);
          self.setLoggedIn(true);
          self.twitter()
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
        asd: [0,0,0,0,0,0],
        data1: this.getTweetsData(),
        data2: this.getInteractionData(),
        data3: {},
        data4: this.historicalData(),
      }
    },
    methods:{
      getTweetsData: function () {
        console.log("this: " + self);
        console.log("last:" + this.asd);
        return {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [
            {
              label: 'Tweets',
              backgroundColor: '#f87979',
              data: self.weekTweet
            }
          ]
        }
      },
      // ...mapMutations([
      //   'setUser',
      //   'setLoggedIn',
      //   'uppdateLastWeekTweets',
      //   'getLastWeekTweets'
      // ]),
      // getTweetsData: function () {
      //   console.log("this: " + self);
      //   console.log("last:" + this.asd);
      //   return {
      //     labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      //     datasets: [
      //       {
      //         label: 'Tweets',
      //         backgroundColor: '#f87979',
      //         data: self.weekTweet
      //       }
      //     ]
      //   }
      // },
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
      getGoalData: function () {
        var favs = 100;
        var rt = 200;
        var rep = 30;
        this.data3 = {
          labels: [
            "Favs",
            "Replies",
            "Retweets"
          ],
          datasets: [

               {
              data: [favs, rt, rep],
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

      },
      twitter: function () {

      	var self = this;
        var userTokenRef = this.userDb.child('token');
        var userSecretRef = this.userDb.child('secret');

        userTokenRef.once('value').then( function (snapshot) {
          var token = snapshot.val();
          console.log(token);

          userSecretRef.once('value').then(function (snapshot) {
            var secret = snapshot.val();
            console.log(secret);
            twitterReq(token, secret);
          });
        });
        console.log("Nu?");

        function twitterReq(token, secret) {
          console.log("token: " + token);
          console.log("secret: " + secret);
          if (token && secret) {
            const tweetInfo = {
              consumer_key: '45QA0HdFT6J2DDgvScJs6FKxb',
              consumer_secret: '7Qm1KywGDIDVyVfG0JfgAZifZNPzPuudi4AjOL6nlIUB56QNLi',
              access_token: token, // ska ändras till db ref
              access_token_secret: secret // ska ändras till db ref
            };

            const serverURL = 'http://localhost:5000/api/gettweets';
            self.$http.post(serverURL, tweetInfo).then(response => {
              self.someData = response.body;
              console.log(self.someData);
              self.uppdateLastWeekTweets(self.someData)
            }, response => {
              // error callback
              console.log("Error");
              if (response.body) {
                console.log(response.body.message);
              }
            });
          } else (
            console.log("Not signed in! Should kick user back!")
          )
        }
      }
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
}
.smallBox {
  height: 180px;
  background-color: #f0f0f0;
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
