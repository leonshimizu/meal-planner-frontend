<template>
  <div class="home">
    <h1>Welcome to the Meal Plan Generator!</h1>
    <h3>Please select from the following diets:</h3>
    <p>Diets: Gluten Free, Ketogenic, Vegetarian, Lacto-Vegetarian, Ovo-Vegetarian, Vegan, Pescetarian, Paleo, Primal, low FODMAP, or Whole30 (for more infomation, visit <a href="https://spoonacular.com/food-api/docs#Diets">Diets)</a></p>
    <p>Now please, input your filters of choice:</p>
    <input type="text" v-model="diet">
    <input type="text" v-model="calories">
    <input type="text" v-model="allergies">
    <br>
    <button v-on:click="createMealPlan()">Generate Meal Plan</button>
    <br>
    <br>
    <button v-on:click="saveMealPlan()">Save Meal Plan</button>
    <hr>
    <ul>
      <li v-for="(key, value) in days.week">
        <ul><b>{{ value.charAt(0).toUpperCase() + value.slice(1) }}</b>
          <li>
            <p>Breakfast: {{ key.meals[0].title }}</p>
            <p>Lunch: {{ key.meals[1].title }}</p>
            <p>Dinner: {{ key.meals[2].title }}</p>
            <button v-on:click="showRecipeInfo(key)">Show More Info</button>
            <hr>
          </li>
        </ul>
      </li>
    </ul>
    <dialog id="show-modal">
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
    </dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
   mounted() {
    console.log(process.env.VUE_APP_TITLE)
  },
  components: {},
  data: function() {
    return {
      apiKey1: (process.env.VUE_APP_SPOONACULAR_API_KEY_ONE),
      apiKey2: process.env.VUE_APP_SPOONACULAR_API_KEY_TWO,
      welcomeMessage: "Welcome to the Meal Plan Generator!",
      days: [],
      diet: "Gluten Free",
      calories: "1200",
      allergies: "Peanut",
      currentMealPlan: {},
      recipeInfo: {
        preparationMinutes: [],
        cookingMinutes: [],
        pricePerServing: [],
        title: [],
        extendedIngredients: {},
        readyInMinutes: [],
        servings: [],
        summary: [],
        dishType: [],
        diets: [],
        winePairing: {},
        instructions: [],
        analyzedInstructions: {},
        spoonacularSourceUrl: []
      },
      mealPlan: {},
      // id: undefined
    }
  },
  created: function() {
    this.createMealPlan();
  },
  methods: {
    createMealPlan: function() {
      console.log("in the index/create meal plan function");
      axios
        .get(`https://api.spoonacular.com/mealplanner/generate?timeFrame=week&apiKey=${this.apiKey1}&targetCalories=${this.calories}&diet=${this.diet}&exlude=${this.allergies}`)
        .then(response => {
          console.log(response.data);
          this.days = response.data;
        })
    },
    showInfo: function(theMealPlan) {
      console.log("in the show info function");
      document.querySelector("#show-modal").showModal();
      this.currentMealPlan = theMealPlan;
    },
    showRecipeInfo: function(theMealPlan) {
      console.log("in the recipe info function");
      document.querySelector("#show-modal").showModal();
      this.currentMealPlan = theMealPlan;
      axios
        .get(`https://api.spoonacular.com/recipes/informationBulk?ids=${this.currentMealPlan.meals[0].id},${this.currentMealPlan.meals[1].id},${this.currentMealPlan.meals[2].id}&apiKey=${this.apiKey2}&includeNutrition=true`)
        .then(response => {
          console.log(response.data);
          this.recipeInfo = response.data;
        })
    },
    saveMealPlan: function() {
      console.log("in the process of saving the meal plan");
      axios 
        .post(`http://localhost:3000/meal_plans`, {
          diet: this.diet,
          allergies: this.allergies, 
          timeFrame: "week",
          calories: this.calories
        })
        .then(response => {
          console.log(response.data);
          this.mealPlan = response.data;
          // this.id = response.data.id
        })
      var meal = Object.entries(this.days.week);
      // console.log(meal[0][1].meals[0].id); // recipe id
      // console.log(meal[1][0]); // day of week
      // console.log(meal[0][1].meals[0]); // potentially meal type
      for (var i = 0; i < Object.entries(this.days.week).length; i++) {
        for (var j = 0; j < 3; j++) {
          var mealType = ""
          if (mealType === meal[0][1].meals[0]) {
            mealType = "breakfast"
          } else if (mealType === meal[0][1].meals[1]) {
            mealType = "lunch"
          } else if (mealType === meal[0][1].meals[2]) {
            mealType = "dinner"
          }

          axios 
            .post(`http://localhost:3000/meals`, {
              meal_plan_id: 16, // still need to make dynamic
              user_id: 1, // still need to make dynamic
              day_of_week: meal[i][0],
              meal_type: mealType, // need to fix - in rails c it says ""
              recipe_id: meal[i][1].meals[j].id
            })
            .then(response => {
              console.log(response.data);
            })
          }
        }
      // console.log(this.recipeInfo); // creating loop to save all meals into db
      // for (var i = 0; i < this.mealPlan.length; i ++) {
      //   axios 
      //     .post(`http://localhost:3000/meals`, {
      //       meal_plan_id: this.mealPlan.id
      //     })
      // }
    }
  }
}
</script>