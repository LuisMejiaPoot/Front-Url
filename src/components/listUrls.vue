<template>
  <div>
    <!-- v-for="(item, index) of urls" :key="index" -->
    <div class="col-lg-11 mx-auto">
      <b-pagination
        v-model="actual"
        :total-rows="totales"
        :per-page="porPagina"
        aria-controls="url-table"
      ></b-pagination>

      <!-- <p class="mt-3">Current Page: {{ actual }}</p> -->
          <div v-if="loading">
            <b-spinner type="grow" label="Loading..."></b-spinner>
            <br>
            <h3>Loading</h3>
          </div>
        <div v-if="!loading">
          <b-table striped  :items="urls" :fields="fields" responsive="sm" id="url-table" :per-page="porPagina" :current-page="actual" >

        <template #cell(shortUrl)="data" class="text-danger">
          <a :href="`${data.value}`" target="_blank">{{ data.value }}</a>
        </template>

        <template #cell(longUrl)="data">
          <a :href="`${data.value}`" class="btn-link">Url original</a>
        </template>

        <template #cell(actions)="data"> 
        <b-button size="sm"  class="mr-1" variant="primary" >
          Update  
        </b-button>
        <b-button size="sm"  class="mr-1" variant="danger" @click="deleteRow(data.item.id)"  >
          Delete 
        </b-button>
        <!-- <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button> -->
      </template>
      </b-table>
        </div>
    </div>
  </div>
</template>

<style >
  .miclase{
    background-color: red;
  }
</style>
<script>
import { mapState } from "vuex";
export default {
  name: "ListUrls",
  data() {
    return {
      loading:true,
      fields: [
      { key: "number", label: "Number", tdClass: 'nameOfTheClass'},
      { key: "shortUrl", label: "ShortUrl" , tdClass: 'nameOfTheClass'},
      { key: "longUrl", label: "LongUrl" , tdClass: 'nameOfTheClass',thStyle: { "word-wrap": "break-word","overflow-wrap":"break-word"}},
      { key: "Actions", label: "Actions" , tdClass: 'nameOfTheClass'}
],
      urls: [],
      total: 0,
      porPagina: 10,
      actual: 1,
      confirModal : false,
    };
  },
  computed: {
    ...mapState(["token"]),
    totales() {
      return (this.total = this.urls.length);
    },
  },
  methods: {
    async getUrls() {
      const urls = await fetch(
        "https://api-node-url.herokuapp.com/api/url/allUrl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": this.token,
          },
          
        }
      )
        .then((response) => response.json())
        .catch((error) => console.log(error))
        .then((response) => {
          // console.log(response);
          //   this.urls = response.datos;
          const data = [];
          const contador = 0;
          // console.log(response)
          response.datos.forEach((item, i) => {
            //   contador+=1;
            const datos = {
              number: i,
              shortUrl: item.shortUrl,
              longUrl: this.getNameUrl(item.longUrl),
              id:item._id,
             
              
            };
            data.push(datos);
          });
          this.urls = data;
          this.loading=false
        });
    },
    getNameUrl(url){
      return url;
    },
    async deleteRow(id){
        const respModal = false
     await this.$bvModal.msgBoxConfirm('Are you sure?')
          .then(value => {
            this.confirModal =  value
          })
          .catch(err => {
            
          })
      if(!this.confirModal) return "";
       
      const urlslist = this.urls
      const deleteUrl =  await fetch("https://api-node-url.herokuapp.com/api/url/deleteUrl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": this.token,
          },
          body:JSON.stringify({ id:id }),
        
      }).then((response) => response.json())
        .catch((error) => console.log(error))
      .then((response)=>{
          if (!response.error) {
      this.$bvModal.msgBoxOk(response.message, {
          title: 'Confirmation',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
            urlslist.splice(id,1)
            this.urls =  urlslist
          }
      })
    }
  },
  created() {
    this.getUrls();
  },
};
</script>

