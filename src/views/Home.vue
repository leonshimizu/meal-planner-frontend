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
    <button v-on:click="saveMealPlan()">Save Meal Plan</button>
    <br>
    <ul>
      <li v-for="(value, key) in days">
        <p><b>{{ key.charAt(0).toUpperCase() + key.slice(1) }}</b></p>
        <p>Breakfast: {{ value.meals[0].title }}</p>
        <p>Lunch: {{ value.meals[1].title }}</p>
        <p>Dinner: {{ value.meals[2].title }}</p>
        <button v-on:click="showRecipeInfo(value)">Show More Info</button>
        <hr>
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
  components: {},
  data: function() {
    return {
      welcomeMessage: "Welcome to the Meal Plan Generator!",
      days: [],
      diet: "GlutenFree",
      calories: "1200",
      allergies: "Peanut",
      currentMealPlan: {},
      recipeInfo: {},
      mealPlan: {},
    }
  },
  created: function() {
    this.createMealPlan();
  },
  methods: {
    createMealPlan: function() {
      console.log("in the index/create meal plan function");
      // words with spaces do not work - have to input without spaces
      axios
        .get(`/meal_plans_generate?diet=${this.diet}&calories=${this.calories}&allergies=${this.allergies}`)
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
        .get(`/meals_generate?meal1=${this.currentMealPlan.meals[0].id}&meal2=${this.currentMealPlan.meals[1].id}&meal3=${this.currentMealPlan.meals[2].id}`)
        .then(response => {
          console.log(response.data);
          this.recipeInfo = response.data;
        })
    },
    saveMealPlan: function() {
      console.log("in the process of saving the meal plan");
      axios 
        .post(`/meal_plans`, {
          diet: this.diet,
          allergies: this.allergies, 
          timeFrame: "week",
          calories: this.calories
        })
        .then(response => {
          console.log(response.data);
          this.mealPlan = response.data;
        })
      // console.log(this.days);
      axios 
        .post('/meals', this.days)
        .then(response => {
          console.log(response.data);
        })
    }
  }
}
</script>