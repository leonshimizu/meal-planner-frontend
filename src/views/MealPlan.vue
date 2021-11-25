<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
</template>

<style></style>

<script>
  import axios from 'axios'
  export default {
    data: function () {
      return {
        message: "Welcome to Personal Meal Plan Page",
      };
    },
    created: function () {
      this.indexFunction();
    },
    methods: {
      indexFunction: function() {
        console.log("in the index function - personal meal plan page");
        axios 
          .get('http://localhost:3000/meal_plans.json')
          .then(response => {
            console.log(response.data);
          })
        axios 
          .get('http://localhost:3000/meals.json')
          .then(response => {
            console.log(response.data);
          })
      }
    },
  };
</script>
