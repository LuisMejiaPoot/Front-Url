<template>
  <div>
    <form action="" @submit.prevent="addUrl(url)" class="col-lg-6 mx-auto">
      <!-- <input type="text" placeholder="Agregar una Url" v-model="url.path" /> -->
      <br />
      <b-form-input
        id="url"
        v-model="url.path"
        type="text"
        required
        class="text-center"
        placeholder="Add an url"
        autocomplete="off"
      ></b-form-input>
      <div></div>
      <br />
      <button type="submit" class="btn btn-primary">Add</button>
    </form>
    <br />
    <div class="text-center">
      <div v-if="!loading">
        <b-spinner type="grow" label="Spinning"></b-spinner>
      </div>
      <div>
        <!-- <div v-if="data_response.error == null">
          <font-awesome-icon
            icon="check-circle"
            size="4x"
            class="text-success"
          />
        </div> -->
        <div class="data_response" v-if="data_response.error == null">
          <div class="container">
            <div class="mt-5"></div>
            <div class="d-flex justify-content-center flex-column align-items-center">
              <label for="range-1" ><strong >Url nueva</strong></label>
              <a class="text-link" v-bind:href="'' + data_response.url_new" target="_blank">{{ data_response.url_new }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
     <b-modal ref="my-modal" hide-footer title="">
      <div class="d-block text-center">
        <h5 style="font-family: 'Oswald', sans-serif;" v-bind:class="{'text-primary' : data_response.error === 'repeat','text-danger':data_response.error,'text-success':!data_response.error}">{{data_response.message}}</h5>
        <br>
        
        <div v-if="!data_response.error">
          <font-awesome-icon
            icon="check-circle"
            size="4x"
            class="text-success"
          />
        </div>

        <div v-else>
              <font-awesome-icon  icon="times" size="4x" class="text-danger" />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FormAddUrl",
  //   props: {
  //     msg: String,
  //   },

  data() {
    return {
      loading: true,
      data_response: {
        error: "",
        message: "",
        error_res: false,
        url_add: "",
        url_new: "",
        hash: "",
      },
      url: {
        path: "",
      },
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
     showModalRepeats() {
        this.$refs['my-modal'].show()
      },
    async addUrl(url) {
      this.data_response.message = "";
      this.data_response.error = "";
      if (url.path == "") {
        return "";
      }
      this.loading = false;
      try {
        const resp = await fetch(
          "https://api-node-url.herokuapp.com/api/url/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": this.token,
            },
            body: JSON.stringify({ longUrl: url.path }),
          }
        )
          .then((response) => response.json())
          .catch((error) => console.log(error))
          .then((response) => {
            // console.log(response);
            this.loading = true;
            this.data_response.message = response.message;
            this.data_response.error = response.error;
            if (response.error !== false) {
              // alert("repetido")
              this.showModalRepeats()
              return "";
            }
            
            
            this.data_response.url_new = response.url.shortUrl;
            
          });
      } catch (error) {}
    },
    color_text_message() {},
  },
  created() {
    // this.metodo
  },
};
</script>