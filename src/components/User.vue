<template>
  <div class="user">
    <h1>{{ msg }} <span>{{ id }}</span></h1>
    <hr>
    <div class="smallBox">
      <hBar :data='data1' />
    </div>
    <div class="smallBox">
      <lineChart :data='data2' />
    </div>
    <div class="smallBox">
      <hBar :data='data3' />
    </div>
    <div class="bigBox"></div>
    <hr>
    <ul>
      <li><a href="/#/">Back Home</a></li>
    </ul>
  </div>
</template>

<script>
  import hBar from "./hBar"
  import lineChart from './lineChart'
  var firebase = require("firebase");
  // if (firebase.apps.length === 0) {
  //   console.log("Jag kom hit");
  //   var user = firebase.auth().currentUser;
  //   console.log("Och hit!");
  // }
  export default {
    name: 'user',
    components : {hBar, lineChart},
    props: ['id'],
    data () {
      return {
        msg: this.getUserName(),
        data1: this.getTweetsData(),
        data2: this.getInteractionData(),
        data3: "",
      }
    },
    methods:{
      getUserName: function(){
        var user = firebase.auth().currentUser;

        if(user) {
          return user.displayName;
        }
        else {
          return 'Not signed in';
        }
      },
      getTweetsData: function () {
        console.log(firebase.auth().currentUser);
        var query = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=t"+this.getUserName()+"&count=2"
        var testData = {
          labels: ['1', '2'],
          datasets: [
            {
              label: 'Testlabel',
              backgroundColor: '#f87979',
              data: [3, 2]
            }
          ]
        }
        return testData
      },
      getInteractionData: function () {
        return "";
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
