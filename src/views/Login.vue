<template>
  <div class="login">
    <header class="bg-dark py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="text-center text-white">
          <form v-on:submit.prevent="submit()">
            <h1 class="display-4 fw-bolder">Login</h1>
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
            <div>
              <label class="lead fw-normal text-white-50 mb-0">Email:</label>
              <input type="email" v-model="newSessionParams.email" />
            </div>
            <div>
              <label class="lead fw-normal text-white-50 mb-0">Password:</label>
              <input type="password" v-model="newSessionParams.password" />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data: function () {
      return {
        newSessionParams: {},
        errors: []
      };
    },
    methods: {
      submit: function () {
        axios
          .post("/sessions", this.newSessionParams)
          .then((response) => {
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.jwt;
            localStorage.setItem("jwt", response.data.jwt);
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error.response);
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          });
      }
    }
  };
</script>