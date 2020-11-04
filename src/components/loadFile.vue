<template>
  <div>
    <label class="text-reader">
      <input type="file" @change="readTxtFile" />
    </label>
    <br />
    <h5>Cantidad de lineas {{ getLines }}</h5>
    <br />
    <b-button variant="primary" @click="sendUrls()">Send</b-button>
    <!-- <div  v-for="(item, index) of toSend" :key="index">
        <span>{{item}}</span>
    </div> -->
    <div style="height: 20px"></div>
    <div v-if="reading">
      <b-spinner type="grow" label="Spinning"></b-spinner>
      <div style="height: 10px"></div>
      <h3 class="mb-2"><strong>Reading</strong></h3>
    </div>
    <!-- 
    <div v-if="write">
      <div class="container border text-justify">
        <h3 class="">Urls to send</h3>
        <div v-for="(url, index) of toSend" :key="index">
          <span>{{ url }}</span>
        </div>
      </div>
      <div class="mt-3 container border text-justify">
        <h3>repeated urls</h3>
        <div v-for="(url, index) of repeats" :key="index">
          <span>{{ url }}</span>
        </div>
      </div>

      <div class="mt-3 container border text-justify">
        <h3>Incorrects urls</h3>
        <div v-for="(url, index) of incorrects" :key="index">
          <span>{{ url }}</span>
        </div>
      </div>
    </div> -->

    <div class="accordion text-left container mx-auto" role="tablist" v-if="write">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="link"
            >Urls to send</b-button
          >
        </b-card-header>
        <b-collapse
          id="accordion-1"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>

            <div v-for="(url, index) of toSend" :key="index">
              <span>{{ url }}</span>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="link"
            >Repeats Url</b-button
          >
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div v-for="(url, index) of repeats" :key="index">
              <span>{{ url }}</span>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-3 variant="link"
            >Incorrects urls</b-button
          >
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div v-for="(url, index) of incorrects" :key="index">
              <span>{{ url }}</span>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LoadFile",
  data() {
    return {
      reading: false,
      file: "",
      lines: [],
      repeats: [],
      toSend: [],
      incorrects: [],
      textContent: "",
      write: false,
    };
  },
  computed: {
    ...mapState(["token"]),
    getLines() {
      this.toSend = [];
      this.incorrects = [];
      this.repeats = [];
      this.lines = this.textContent.split("\n");

      console.log(this.lines[this.lines.length - 1]);
      for (let i = 0; i < this.lines.length; i++) {
        if (this.isValidURL(this.lines[i])) {
          if (this.toSend.indexOf(this.lines[i]) === -1) {
            this.toSend.push(this.lines[i]);
          } else {
            this.repeats.push(this.lines[i]);
          }
        } else {
          this.incorrects.push(this.lines[i]);
        }
      }

      return this.lines.length;
    },
  },
  methods: {
    readTxtFile(ev) {
      this.reading = true;
      const file = ev.target.files[0];
      // console.log(file);
      if (file.type != "text/plain") {
        alert("Formato de archivo incorrecto");
        return "";
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        this.$emit("load", e.target.result);
        this.textContent = e.target.result;
        this.reading = false;
        this.write = true;
      };
      reader.readAsText(file);
    },
    isValidURL(string) {
      var res = string.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      return res !== null;
    },
    async sendUrls() {
      if (this.toSend.length == 0) {
        alert("There are not items to send ");
        return;
      }
      const data = JSON.stringify({ longUrls: this.toSend });
      const clearing = data.replaceAll("\\r", "").replaceAll(" ", "");

      const resp = await fetch(
        "https://api-node-url.herokuapp.com/api/url/registerBulk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": this.token,
          },
          body: clearing,
        }
      )
        .then((response) => response.json())
        .catch((error) => console.log(error))
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>