import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null
  },
  mutations: {
    setToken(state,payLoad){
      state.token = payLoad
    }
  },
  actions: {
    // las acciones llaman a las mutaciones
    async login({commit},usuario){
      // console.log(usuario)
      try {
        const res =  await fetch('https://api-node-url.herokuapp.com/api/user/login',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(usuario)
        })
        const respDB = await res.json();
        console.log(respDB)
        if (respDB.error == null) {
          commit('setToken',respDB.data.token)
          console.log("haciendo el storage")
          localStorage.setItem('token',respDB.data.token)
        }

      } catch (error) {
        console.log(error)
      }

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