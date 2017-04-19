<template>
  <div class="hello">
    <img src="../assets/logo3.png" height="100px">
    <h1>{{ msg }}</h1>
    <!-- <TestCharts :data='testData' /> -->
    <login/>
  </div>
</template>

<script>
  import Login from "./Login"

  export default {
    components: {Login},
    name: 'hello',
    data () {
      return {
        msg: 'Iprog Project'
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
