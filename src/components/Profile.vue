<template>
  <div class="profile col-sm-10">
    <h1>Profile Page</h1>
    <h3>Description</h3>
    <textarea class="description"
        v-model="newPost"
        @input="addProfileText"
        placeholder="Add something about yourself"
      >
      </textarea>
  </div>
</template>

<script>
  import { auth_provider, db, auth } from '../fb'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: 'profile',
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
  text-align: left;
}
.profile {
  height: 100vh;
}
.description {
  display: block;
  background-color: #fff;
  height: 200px;
  width: 40%;
  border: 1px solid;
  border-color: #D8DAD3;
}
hr {
  border-top: #f0f0f0;
  border-left: none;
  border-right: none;
  padding: 10px;
  width: 100%;
  }
  h1 {
    margin-top: 20px;
    font-weight: normal;
    text-align: left;
    }
  h3 {
        font-weight: lighter;
        font-style: italic;
        font-size: 17px;
        text-align: left;
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
