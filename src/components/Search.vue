<template>
  <div class="search">
    <h1>{{ msg }}</h1>
    <input
        v-model.trim="newItem"
        @keyup.enter="addItem"
        placeholder="Add new item"
      >
    <ul>
        <li v-for="item in items">
          <input
            :value="item.text"
            @input="updateItem(item, $event.target.value)"
          >
          <button @click="removeItem(item)">X</button>
        </li>
      </ul>
    <ul>
      <li><a href="/#/">Back Home</a></li>
    </ul>
  </div>
</template>

<script>
  import { auth_provider, db, auth } from '../fb'
  var itemRef = db.ref('/items');
  export default {
    name: 'search',
    data () {
      return {
        msg: 'Search page',
        newItem: ''
      }
    },
    firebase: {
      items: itemRef.limitToLast(25)
    },
    methods: {
      addItem: function () {
        if (this.newItem) {
          itemRef.push({
            text: this.newItem
          })
          this.newItem = ''
        }
      },
      updateItem: function (item, newText) {
        itemRef.child(item['.key']).child('text').set(newText)
      },
      removeTodo: function (item) {
        itemRef.child(item['.key']).remove()
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
