import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      rutaEsProtegida:true
    }
  },
  {
    path:'/urls',
    name:'Urls',
    component: () =>import(/* webpackChunkName: "urls" */ '@/views/Urls.vue'),
    meta:{
      rutaEsProtegida:true
    }
  },
  {
    path:'/urlBulk',
    name:'UrlBulk',
    component:()=>import(/* webpackChunkName: "urlBulk" */  '@/views/UrlBulk.vue'),meta:{
      rutaEsProtegida:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (to,from,next) => {
const rutaEsProtegida = to.matched.some(item =>item.meta.rutaEsProtegida)
// mensaje = (rutaEsProtegida) ? "es protegida" :  " no es protegida"

if (rutaEsProtegida && store.state.token  === null) {
  next('/')
}else{
  next()
}

// console.log(mensaje)

})
export default router
