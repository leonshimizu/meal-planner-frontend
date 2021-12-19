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
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">Email:</span>
              <input type="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="newSessionParams.email">
            </div>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">Password:</span>
              <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="newSessionParams.password">
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
            window.location.reload();
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