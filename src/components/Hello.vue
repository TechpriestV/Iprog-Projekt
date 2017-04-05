<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li><a href="/#/login">Login</a></li>
      <li><a href="/#/search">Search</a></li>
      <li><a href="/#/user">User</a></li>
    </ul>
    <!-- <TestCharts :data='testData' /> -->
  </div>
</template>

<script>
  import Login from "./Login";
  import TestCharts from "./TestCharts";
  export default {
    components: {Login, TestCharts}, name: 'hello',
    data () {
      return {
        msg: 'Iprog Project',
        testData: {
          labels: ['1', '2'],
          datasets: [
            {
              label: 'Testlabel',
              backgroundColor: '#f87979',
              data: [3, 2]
            }
          ]
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
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
