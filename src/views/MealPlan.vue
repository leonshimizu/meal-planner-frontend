<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>Diet: {{ meal_plan[0].diet }}</p>
    <p>Allergies: {{ meal_plan[0].allergies }}</p>
    <p>Time Frame: {{ meal_plan[0].timeFrame }}</p>
    <p>Calories: {{ meal_plan[0].calories }}</p>
    <p>Created: {{ meal_plan[0].created_at }}</p>
    <hr>
    <ul>
      <li v-for="meal in allMeals">
        <p>Title: {{ meal["title"] }}</p>
        <p>Image: {{ meal.image }}</p>
        <p>Prep Time: {{ meal.preparationMinutes }}</p>
        <p>Cook Time: {{ meal.cookingMinutes }}</p>
        <p>Servings: {{ meal.servings }}</p>
        <p>Price Per Serving: {{ meal.pricePerServing }}</p>
        <button v-on:click="extraInfo(meal)">Show More Info</button>
      </li>
    </ul>
    <dialog id="extra-modal">
      <form method="dialog">
        <!-- {{ info[0].instructions }} -->
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>

<script>
  import axios from 'axios'
  export default {
    data: function () {
      return {
        message: "Your Meal Plan!",
        meal_plan: {
          diet: [],
          allergies: [],
          timeFrame: [],
          calories: [],
          created_at: []
        },
        meals: {},
        apiKey1: process.env.VUE_APP_SPOONACULAR_API_KEY_ONE,
        apiKey2: process.env.VUE_APP_SPOONACULAR_API_KEY_TWO,
        apiKey3: process.env.VUE_APP_SPOONACULAR_API_KEY_THREE,
        apiKey4: process.env.VUE_APP_SPOONACULAR_API_KEY_FOUR,
        allMeals: {},
        currentMeal: {},
        info: {}
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
          .get('/meal_plans')
          .then(response => {
            // console.log(response.data);
            this.meal_plan = response.data;
          })
        axios 
          .get('/meals')
          .then(response => {
            // console.log(response.data);
            this.meals = response.data;
          })
      },
      recipeShow: function() { 
        console.log("in the meals show");
        axios 
          .get('/all_meals')
          .then(response => {
            console.log(response.data);
            this.allMeals = response.data;
          })
      },
      extraInfo: function(theMeal) {
        console.log("in the extra info function");
        document.querySelector("#extra-modal").showModal();
        this.currentMeal = theMeal;
        console.log(this.currentMeal.id);
        axios 
          .get(`https://api.spoonacular.com/recipes/informationBulk?ids=${this.currentMeal.id}&apiKey=${this.apiKey4}&includeNutrition=true`)
          .then(response => {
            console.log(response.data);
            this.info = response.data;
          })
      }
    },
  };
</script>
    <!-- <ul>
      <li v-for="(value, key) in days">
        <p><b>{{ key.charAt(0).toUpperCase() + key.slice(1) }}</b></p>
        <p>Breakfast: {{ value.meals[0].title }}</p>
        <p>Lunch: {{ value.meals[1].title }}</p>
        <p>Dinner: {{ value.meals[2].title }}</p>
        <button v-on:click="showRecipeInfo(value)">Show More Info</button>
        <hr>
      </li>
    </ul> -->