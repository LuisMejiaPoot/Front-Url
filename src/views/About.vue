<template>
  <div class="about">
    <h3>New URL</h3>

<!-- 
    <form action="" @submit.prevent="addUrl(url)">
      <input type="text" placeholder="Agregar una Url" v-model="url.path" />
      <div></div>
      <br>
      <button type="submit" class="btn btn-primary">Agregar</button>
 
    </form>
    <br>
    <h4 style="color:red">{{data_response.message}}</h4> -->
   
    <FormAddUrl />
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue'
import FormAddUrl from '@/components/FormAddUrl.vue'
import { mapState } from "vuex";

export default {
  components:{
    FormAddUrl
},
  data(){
    return {
      mensaje:""
    }
  }
  
};
</script>
