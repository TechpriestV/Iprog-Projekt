<template>
  <div class="linnea">
    <h1>{{ msg }}</h1>
    <hr>
    <div class="smallBox">
      <hBar :data='data1' />
    </div>
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
  import hBar from "./hBar"
  export default {
    components : {hBar},
    name: 'linnea',
    data () {
      return {
        msg: 'Hello Linnea!',
        data1: {
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
  .linnea {
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
