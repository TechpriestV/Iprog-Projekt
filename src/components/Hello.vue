<template>
  <div class="hello">
    <img id="logo" src="../assets/logo3.png" height="100px">
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
        msg: 'Här borde vi ha ett coolt namn'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo {
  margin-top: 100px;
  margin-bottom: 40px;
}
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
