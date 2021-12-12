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
        {{ meal }}
      </li>
    </ul>
    <!-- {{ meals }} -->
    <!-- <ul>
      <li v-for="meal in meals">
        {{ meal }}
      </li>
    </ul> -->
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
    <!-- <dialog id="show-modal">
      <form method="dialog">
        <ul>
          <li v-for="recipe in recipeInfo">
            <p>Title: {{ recipe.title }}</p>
            <p>
              Ingredients: 
              <ul>
                <li v-for="product in recipe.extendedIngredients">
                  <p>{{ product.amount }} {{ product.unit }} of {{ product.name }}</p>
                </li>
              </ul>
            </p>
            <p>{{ recipe.instructions }}</p>
          </li>
        </ul>
        <button>Close</button>
      </form>
    </dialog> -->
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
        allMeals: []
      };
    },
    created: function () {
      this.mealPlanShow();
      // this.recipeShow();
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
        setTimeout(() => {
          // console.log(this.meals.length)
          for (var i = 0; i < this.meals.length; i++) {
            axios 
              .get(`https://api.spoonacular.com/recipes/informationBulk?ids=${this.meals[i].recipe_id}&apiKey=${this.apiKey4}&includeNutrition=true`)
              .then(response => {
                console.log(response.data);
                this.allMeals = response.data;
              })
          }
        }, 1000)
      },
      recipeShow: function() { 

      }
    },
  };
</script>
