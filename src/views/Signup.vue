<template>
   <!-- Header-->
   <div class="signup">
    <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Signup</h1>
                <br>
                <form v-on:submit.prevent="submit()">
                  <h1>Signup</h1>
                  <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                  </ul>
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Name:</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="newUserParams.name">
                  </div>
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Email:</span>
                    <input type="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="newUserParams.email">
                  </div>
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Password:</span>
                    <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="newUserParams.password">
                  </div>
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Password Confirmation:</span>
                    <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="newUserParams.password_confirmation">
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
        newUserParams: {},
        errors: []
      };
    },
    methods: {
      submit: function () {
        axios
          .post("/users", this.newUserParams)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/login");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    }
  };
</script>