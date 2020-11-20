<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <h1>Login</h1> -->
    <transition name="fade">
      <div v-if="!this.$store.state.loading">
        <form action="" @submit.prevent="login(usuario)">
          <div class="d-flex justify-content-center align-items-center flex-column col-lg-4 mx-auto border mt-5"
            style="height: 350px">
            <input
              class="inputs"
              type="text"
              placeholder="Email"
              v-model="usuario.email"
            />
            <div style="height: 20px"></div>
            <input
              class="inputs"
              type="password"
              placeholder="Password"
              v-model="usuario.password"
            />
            <br />
            <button type="submit" class="btn btn-primary">Acceder</button>
          </div>
        </form>
      </div>
    </transition>

    <transition name="fade">
      <p v-if="this.$store.state.loading">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, ut
        officia atque assumenda voluptatum quidem ullam enim. Distinctio
        similique numquam quos quo , magni hic totam voluptatem unde, cumque
        consequatur ducimus!
      </p>
    </transition>

    <!-- {{usuario.email}} -->
  </div>
</template>



<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions, router } from "vuex";

// pruebas_heroku1@gmail.com
// 1234567890
export default {
  data() {
    return {
      loadingLogin: this.$store.state.loading,
      usuario: {
        email: "pruebas_heroku1@gmail.com",
        password: "1234567890",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
  },
};
</script>
