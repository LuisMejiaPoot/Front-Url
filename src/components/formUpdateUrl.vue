<template>
    <div class="container mx-auto border border-danger">
        <!-- <h2 class="tex-center">Datos {{ $route.params.id }}</h2> -->
        <br /><br /><br />
        <b-form v-if="loading" class="col-10 mx-auto">
            <b-form-group id="input-group-2" label="URL" label-for="input-2">
                <b-form-input id="input-2" v-model="url" class="text-center" required placeholder="Enter name"></b-form-input>
            </b-form-group>
            <b-form-group id="input-shor-url" label="Short Url" label-for="short-url">
                <b-form-input id="short-url" readonly v-model="shortUrl" class="text-center" required placeholder="short Url"></b-form-input>
            </b-form-group>
        </b-form>
        <div v-else-if="!loading">
            <b-spinner type="grow" label="Loading..."></b-spinner>
            <p class="text-center"><b>Loading information</b></p>
                    <br><br><br>
        </div>

        <div class="row justify-content-center align-items-center container mx-auto">
            <div class="col-lg-4 border">
                <b-button :to="{ name: 'Urls' }">Back</b-button>
            </div>
            <div class="col-lg-4 border">
                <b-button variant="primary" >Update</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: "formUpdateUrl",
    data() {
        return {
            url: "",
            loading:false,
            shortUrl:""
        }
    },
    computed:{
        ...mapState(['token']),
    },
    methods: {
        async fetchApiUrl() {
            this.url = ""
            try {
                const resp = await fetch(process.env.VUE_APP_API_URL+"/url/getUrl",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "auth-token":this.token
                    },
                    body:JSON.stringify({id:this.$route.params.id})
                }).then((response)=>response.json())
                .catch((error)=>console.log(error))
                .then((response)=>{
                    this.url = response.data.longUrl
                    this.shortUrl = response.data.shortUrl
                    this.loading=true
                    console.log(response)
                })
                
            } catch (error) {
                console.log(error)
            }
        }
    },created(){
        // alert("hola")
        this.fetchApiUrl()
    }
}
</script>