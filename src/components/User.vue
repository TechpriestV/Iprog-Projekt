<template>
  <div class="user">
    <h1>{{ msg }} <span>{{ tmp.displayName }}</span></h1>
    {{ getUser }}
    <hr>
    <div class="smallBox">
      <!-- <hBar :data='data1'/> -->
      <hBar :data='data1' :height='175' />
    </div>
    <div class="smallBox">
      <lineChart :data='data2' :height='175' />
    </div>
    <div class="smallBox">
      <dNutChart :data='data3' :height='175' />
    </div>
    <div class="bigBox">

      <barChart :data='data4' :height='175'/>
      <!-- <lineChart :data='data4' :height='175' /> -->
    </div>
    <hr>
    <ul>
      <li><router-link to="/">Back Home</router-link></li>
    </ul>
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
  import Twitter from 'twitter'

  var self = this;
  console.log("Trasig?");
  console.log(this.user_token);
  console.log("Inte trasig!");
  var client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  })

  export default {
    name: 'user',
    components : {hBar, lineChart, dNutChart, barChart},
    computed: {
      ...mapGetters([
        'logged_in',
        'user_token',
        'user_secret'
      ]),
      ...mapGetters({
         // map this.user to store.getters.tmp
        tmp: 'user'
      }),
      getUser: function () {
        console.log("Här borde user sevret komma> ")
        console.log(this.user_secret);
        console.log(this.user_token);

        if (this.user_token && this.user_secret) {
          var tweetInfo = {
            consumer_key: '45QA0HdFT6J2DDgvScJs6FKxb',
            consumer_secret: '7Qm1KywGDIDVyVfG0JfgAZifZNPzPuudi4AjOL6nlIUB56QNLi',
            access_token: this.user_token,
            access_token_secret: this.user_secret
          }
          var serverURL = 'http://localhost:5000/api/gettweets'
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
          // client.get('favorites/list', function(error, tweets, response) {
          //   if(error) throw error;
          //     console.log(tweets);  // The favorites.
          //     console.log(response);  // Raw response object.
          // });
        }else(
          console.log("Not signed in! Should kick user back!")
        )


        // console.log(this.tmp.uid);
        // console.log(this.tmp.apiKey);
        // this.formatHeader();
        // "https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=D9TA5vPci6OA4ishOUH1yhkEAB02&screen_name=vikced"
        // var timeLineURL = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
        // var options = {
        //   url: timeLineURL,
        //   headers: {
        //
        //   },
        //   body: {
        //     user_id: this.tmp.uid,
        //     screen_name: this.tmp.displayName
        //   }
        // };
        //
        // this.$http.get('/tmp', [options]).then(respone => {
        //   //sucess callback
        // }, {
        //   //error callback
        // });

        // $.ajax({
        //   url: timeLineURL,
        //   data:
        //
        // })

        return "this.tmp"
      }
    },
    data () {
      return {
        msg: 'User Id: ',
        data1: this.getTweetsData(),
        data2: this.getInteractionData(),
        data3: this.getGoalData(),
        data4: this.historicalData(),
      }
    },
    methods:{
      formatHeader: function () {
        // This function formats a header for Twitters API
        // https://dev.twitter.com/oauth/overview/authorizing-requests
        // oauth_consumer_key       - param
        // oauth_nonce              - generated
        // oauth_signature          - generated
        // oauth_signature_method   - hard coded = HMAC-SHA1
        // oauth_timestamp          - generated
        // oauth_token              - param
        // oauth_version            - hard coded = 1.0
      },
      getTweetsData: function () {
        // console.log(getUser());
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
      getGoalData: function () {
        return {
          labels: [
            "Favs",
            "Replies",
            "Retweets"
          ],
          datasets: [

               {
              data: [300, 50, 100],
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

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
  max-width: 800px;
  margin: 0 auto;
  }
.bigBox {
  width: 96%;
  height: 300px;
  background-color: #f0f0f0;
  margin: 6px auto;
}
.smallBox {
  width: 30%;
  height: 180px;
  background-color: #f0f0f0;
  display: inline-block;
  margin: 10px;
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
