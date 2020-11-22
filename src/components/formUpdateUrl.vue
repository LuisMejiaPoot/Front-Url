<template>
    <div class="container mx-auto border border-danger">
        <!-- <h2 class="tex-center">Datos {{ $route.params.id }}</h2> -->
        <br /><br /><br />
        <b-form v-if="!loading" class="col-lg-6 col-md-10 col-sm-11 mx-auto" @submit="onSubmit">
            <div v-if="exists">
                <b-form-group id="input-group-2" label="URL" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.url" class="text-center" required placeholder="url">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="input-urlCode" label="Url code" label-for="urlCode">
                    <b-form-input id="urlCode" v-model="urlCode" class="text-center" readonly placeholder="url code">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="input-shor-url" label="Short Url" label-for="short-url">
                    <b-form-input id="short-url" readonly v-model="shortUrl" class="text-center"
                        placeholder="short Url"></b-form-input>
                </b-form-group>

            </div>
            <div v-if="!exists">
                <div>
                    <h3 class="text-center text-danger">El id no existe</h3>
                    <p class="text-center text-danger">{{message}}</p>
                </div>
            </div>
            <div class="col-8 mx-auto">
                <div class="row justify-content-center align-items-center container mx-auto">
                    <div class="col-lg-4 col-md-6 col-sm-6  border mb-3">
                        <b-button :to="{ name: 'Urls' }">Back</b-button>
                    </div>

                    <div class="col-lg-4 col-md-6 col-sm-6 border mb-3" v-if="exists ">
                        <b-button type="submit" variant="primary">Update</b-button>
                    </div>
                </div>
            </div>
        </b-form>
        <div v-else-if="loading">
            <b-spinner type="grow" label="Loading..."></b-spinner>
            <p class="text-center"><b>Loading information</b></p>
            <br><br><br>
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
                loading: true,
                shortUrl: "",
                exists: true,
                message: "",
                urlCode: "",
                form: {
                    url: "hohla"
                }
            }
        },
        computed: {
            ...mapState(['token']),
        },
        methods: {
            async fetchApiUrl() {
                // this.url.path = ""
                try {
                    const resp = await fetch(process.env.VUE_APP_API_URL + "/url/getUrl", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "auth-token": this.token
                            },
                            body: JSON.stringify({
                                id: this.$route.params.id
                            })
                        }).then((response) => response.json())
                        .catch((error) => console.log(error))
                        .then((response) => {
                            console.log(response)
                            if (response.error) {
                                console.log("error")
                                this.exists = false
                                this.message = response.message

                            } else {
                                this.form.url = response.data.longUrl
                                this.shortUrl = response.data.shortUrl
                                this.urlCode = response.data.urlCode
                            }
                            this.loading = false;
                            return;



                        })

                } catch (error) {
                    console.log(error)
                }
            },
            async onSubmit(evt) {
                evt.preventDefault()
                // alert()
                try {
                    const resp = await fetch(process.env.VUE_APP_API_URL + "/url/updateUrl", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "auth-token": this.token
                            },
                            body: JSON.stringify({
                                id: this.$route.params.id,
                                url: this.form.url
                            })

                        }).then((response) => response.json())
                        .catch((error) => console.log(error))
                        .then((response) => {
                            console.log(response)
                            // return ;
                            if (response.error) {
                                this.showModal(response.message)
                            } else {
                                this.onReset(evt)
                                this.showModal("Url updated")
                            }
                        })
                } catch (error) {
                    console.log(error)
                }

            },
            onReset(evt) {
                evt.preventDefault()
                // this.form.url = ""
                this.loading = true
                this.$nextTick(() => {
                    this.loading = false
                })
            },
            showModal(msg) {
                
                this.$bvModal.msgBoxOk(msg)
                    .then(value => {
                       
                    })
                    .catch(err => {
                        // An error occurred
                    })
            }

        },
        created() {
            // alert("hola")
            this.fetchApiUrl()
        }
    }
</script>