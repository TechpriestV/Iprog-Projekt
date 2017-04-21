<template>
  <div class="user col-sm-10">
    <h1>Profile Page</h1>
    <textarea
        v-model="newPost"
        @input="addProfileText"
      >
      </textarea>
  </div>
</template>

<script>
  import { auth_provider, db, auth } from '../fb'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: 'user',
    computed: {
      ...mapGetters([
        'user',
        'userDb',
        'logged_in'
      ])
    },
    mounted: function () {
        var child = this.userDb.child('profiletext'); 
        var self = this;
        // console.log(this.userDb)
        child.on('value', function(snapshot) {
            self.newPost = snapshot.val()
        });

    },
    data () {
      return {
        newPost: ''
      }
    },
    methods:{
      addProfileText: function () {
        if (this.newPost) {
          this.userDb.update({
            profiletext: this.newPost
          })
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
