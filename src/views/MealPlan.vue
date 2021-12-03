<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>Diet: {{ meal_plan[0].diet }}</p>
    <p>Allergies: {{ meal_plan[0].allergies }}</p>
    <p>Time Frame: {{ meal_plan[0].timeFrame }}</p>
    <p>Calories: {{ meal_plan[0].calories }}</p>
    <p>Created: {{ meal_plan[0].created_at }}</p>
    <ul>
      <li v-for="meal in meals">
        <p>Day: {{ meal.day_of_week }}</p> 
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
        message: "Your Meal Plan!",
        meal_plan: {},
        meals: {},
        apiKey3: process.env.VUE_APP_SPOONACULAR_API_KEY_THREE,
        allMeals: []
      };
    },
    created: function () {
      this.mealPlanShow();
      this.recipeShow();
    },
    methods: {
      mealPlanShow: function() {
        console.log("in the mealPlan show");
        axios 
          .get('http://localhost:3000/meal_plans.json')
          .then(response => {
            // console.log(response.data);
            this.meal_plan = response.data;
          })
        axios 
          .get('http://localhost:3000/meals.json')
          .then(response => {
            // console.log(response.data);
            this.meals = response.data;
          })
      },
      recipeShow: function() { 
        // create loop that is the length of the meals array and store it into a new variable and then render it in the html
        // to display meals in order - potentially create loop with conditionals to group meals together (depending on the day of the week) - if that doesn't work, probably will have to figure out how to save all the meals in the same order they were received
        setTimeout(() => {
          console.log("in the recipe show");
          // console.log(this.meals);
          var recipes = this.meals
          for (var i = 0; i < recipes.length; i++) {
            var id = recipes[i].recipe_id;
            // console.log(id);
            axios 
              .get(`https://api.spoonacular.com/recipes/informationBulk?ids=${id}&apiKey=${this.apiKey3}&includeNutrition=true`)
              .then(response => {
                console.log(response.data);
              })
          }
        }, 2000)
      }
    },
  };
</script>
