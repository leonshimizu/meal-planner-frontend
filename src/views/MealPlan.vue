<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>{{ meal_plan }}</p>
    <ul>
      <li v-for="meal in meals">
        {{ meal }}
      </li>
    </ul>
  </div>
</template>

<style></style>

<script>
  import axios from 'axios'
  export default {
    data: function () {
      return {
        message: "Welcome to Personal Meal Plan Page!",
        meal_plan: {},
        meals: {}
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
            this.meal_plan = response.data;
          })
        axios 
          .get('http://localhost:3000/meals.json')
          .then(response => {
            console.log(response.data);
            this.meals = response.data;
          })
      }
    },
  };
</script>
