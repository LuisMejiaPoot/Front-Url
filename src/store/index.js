import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import VueRouter from 'vue-router'

Vue.use(Vuex,router,VueRouter)

export default new Vuex.Store({
  state: {
    token:null,
    loading:false
  },
  mutations: {
    setToken(state,payLoad){
      state.token = payLoad
      
    },
    loadingLogin(state,payLoad){
      state.loading = payLoad
    }
  },
  // https://www.youtube.com/watch?v=rncY1tlWShM
  actions: {
    // las acciones llaman a las mutaciones
    async login({commit},usuario){
        // commit('loadingLogin',true)
        this.state.loading= true;
        const res =  await fetch('https://api-node-url.herokuapp.com/api/user/login',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(usuario)
        })
        const respDB = await res.json();
        if (respDB.error == null) {
          commit('setToken',respDB.data.token)
          localStorage.setItem('token',respDB.data.token)
          // this.$router.push({ name: 'Urls' })
          router.push('/urls');
         
          
        }

        this.state.loading= false;
      // } catch (error) {
      //   console.log(error)
      // }

    },
    leerToken( {commit} ){
      if(localStorage.getItem('token')){
        commit('setToken',localStorage.getItem('token'))
      }else{
        commit('setToken',null)
      }
    }
  },
  modules: {
  }
})
// https://www.youtube.com/watch?v=ALSd8t5Eje0&ab_channel=CodelyTV-Redescubrelaprogramaci%C3%B3n