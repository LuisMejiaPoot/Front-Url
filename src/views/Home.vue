<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>Login</h1>

    <form action="" @submit.prevent="login(usuario)">
      <input type="text" placeholder="Email" v-model="usuario.email" />
      <input type="password" placeholder="Password" v-model="usuario.password" />
      <button type="submit">Acceder</button>
    </form>
    {{usuario.email}}
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {mapActions} from 'vuex';

export default {
  data() {
    return {
      usuario: {
        email:'pruebas_heroku1@gmail.com',
        password:'1234567890',
      },
    };
  },
  methods:{
    ...mapActions(['login'])
  }
};
</script>
