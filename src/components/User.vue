<template>
  <div class="user">
    <h1>{{ msg }} <span>{{ id }}</span></h1>
    <hr>
    <div class="smallBox"></div>
    <div class="smallBox"></div>
    <div class="smallBox"></div>
    <div class="bigBox"></div>
    <hr>
    <ul>
      <li><a href="/#/">Back Home</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'user',
    props: ['id'],
    data () {
      return {
        msg: 'User page'
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
