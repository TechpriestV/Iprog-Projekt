<template>
  <div class="user">
    <h1>{{ msg }} <span>{{ user.uid }}</span></h1>
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

  export default {
    name: 'user',
    components : {hBar, lineChart, dNutChart, barChart},
    computed: {
      ...mapGetters([
        'user',
        'logged_in'
      ])
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
    mounted: function() {
      this.twitterApiTests()
    },
    methods:{
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
