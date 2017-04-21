<template>
  <div id="userpage">
    <div class="container-fluid">
      <div class="row">
        <sidebar/>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar.vue'

  export default {
    name: 'UserPage',
    components : {Sidebar}
  }
</script>

<style>

</style>
