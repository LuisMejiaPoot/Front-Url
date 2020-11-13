<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">Add Url</router-link> |
      <router-link to="/urls">Urls</router-link> |
      <router-link to="/urlBulk">Upload File</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
require('@/assets/css/custom.css')
export default {
  methods:{
    ...mapActions(['leerToken'])
  },created(){
    this.leerToken()
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital@1&display=swap');

</style>
<style>
/* @import './assets/css/custom.css'; */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
