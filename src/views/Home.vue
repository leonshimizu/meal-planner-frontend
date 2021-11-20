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
    <button v-on:click="createMealPlan()">Submit Meal Plan</button>
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
      diet: "Vegetarian",
      calories: "2500",
      allergies: "Dairy",
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
      }
    }
  },
  created: function() {
    this.createMealPlan();
  },
  methods: {
    createMealPlan: function() {
      console.log("in the index/create meal plan function");
      // console.log(this.apiKey1);
      // console.log(this.apiKey2);
      axios
        .get(`https://api.spoonacular.com/mealplanner/generate?timeFrame=week&apiKey=${this.apiKey1}&targetCalories=${this.calories}&diet=${this.diet}&exlude=${this.allergies}`)
        .then(response => {
          console.log(response.data);
          this.days = response.data;
        })
    },
    showInfo: function(theMealPlan) {
      console.log("in the show info function");
      console.log(theMealPlan.meals[0].title);
      document.querySelector("#show-modal").showModal();
      // this.currentMealPlan = theMealPlan.meals;
      this.currentMealPlan = theMealPlan;
    },
    showRecipeInfo: function(theMealPlan) {
      console.log("in the recipe info function");
      document.querySelector("#show-modal").showModal();
      this.currentMealPlan = theMealPlan;
      console.log(this.currentMealPlan.meals[0].id);
      axios
        .get(`https://api.spoonacular.com/recipes/informationBulk?ids=${this.currentMealPlan.meals[0].id},${this.currentMealPlan.meals[1].id},${this.currentMealPlan.meals[2].id}&apiKey=${this.apiKey2}&includeNutrition=true`)
        .then(response => {
          console.log(response.data);
          this.recipeInfo = response.data;
        })
    }
  }
}
</script>

        <!-- <p>{{ currentMealPlan.meals[0].id }}</p> -->
        <!-- <ul>
          <li v-for="meal in currentMealPlan.meals">
            <p>{{ meal.title }}, {{ meal.readyInMinutes }} minutes to prepare, {{ meal.servings }} servings, and more info at {{ meal.sourceUrl }}</p>
          </li>
        </ul> -->
        <!-- <p>Total Calories: {{ currentMealPlan.nutrients["calories"] }}</p> -->
        <!-- <p>Total Calories: {{ currentMealPlan.nutrients.calories }}</p>
        <p>Total Protien: {{ currentMealPlan.nutrients.protein }}</p>
        <p>Total Fat: {{ currentMealPlan.nutrients.fat }}</p>
        <p>Total Carbohydrates: {{ currentMealPlan.nutrients.carbohydrates }}</p> -->
        <!-- <p>{{ currentMealPlan.nutrients }}</p> -->

            <!-- <button v-on:click="showInfo(key)">Show More Info</button> -->

    <!-- <ul>
      <li>
        <b>Monday:</b> 
        <ul>
          <li>
            Breakfast: {{ days.week.monday.meals[0].title }}
          </li>
          <li>
            Lunch: {{ days.week.monday.meals[1].title }}
          </li>
          <li>
            Dinner: {{ days.week.monday.meals[2].title }}
          </li>
        </ul>
      </li>
      <li>
        <b>Tuesday:</b> 
        <ul>
          <li>
            Breakfast: {{ days.week.tuesday.meals[0].title }}
          </li>
          <li>
            Lunch: {{ days.week.tuesday.meals[1].title }}
          </li>
          <li>
            Dinner: {{ days.week.tuesday.meals[2].title }}
          </li>
        </ul>
      </li>
            <li>
        <b>Wednesday:</b> 
        <ul>
          <li>
            Breakfast: {{ days.week.wednesday.meals[0].title }}
          </li>
          <li>
            Lunch: {{ days.week.wednesday.meals[1].title }}
          </li>
          <li>
            Dinner: {{ days.week.wednesday.meals[2].title }}
          </li>
        </ul>
      </li>
            <li>
        <b>Thursday:</b> 
        <ul>
          <li>
            Breakfast: {{ days.week.thursday.meals[0].title }}
          </li>
          <li>
            Lunch: {{ days.week.thursday.meals[1].title }}
          </li>
          <li>
            Dinner: {{ days.week.thursday.meals[2].title }}
          </li>
        </ul>
      </li>
      <li>
        <b>Friday:</b> 
        <ul>
          <li>
            Breakfast: {{ days.week.friday.meals[0].title }}
          </li>
          <li>
            Lunch: {{ days.week.friday.meals[1].title }}
          </li>
          <li>
            Dinner: {{ days.week.friday.meals[2].title }}
          </li>
        </ul>
      </li>
      <li>
        <b>Saturday:</b> 
        <ul>
          <li>
            Breakfast: {{ days.week.saturday.meals[0].title }}
          </li>
          <li>
            Lunch: {{ days.week.saturday.meals[1].title }}
          </li>
          <li>
            Dinner: {{ days.week.saturday.meals[2].title }}
          </li>
        </ul>
      </li>
      <li>
        <b>Sunday:</b> 
        <ul>
          <li>
            Breakfast: {{ days.week.sunday.meals[0].title }}
          </li>
          <li>
            Lunch: {{ days.week.sunday.meals[1].title }}
          </li>
          <li>
            Dinner: {{ days.week.sunday.meals[2].title }}
          </li>
        </ul>
      </li>
    </ul> -->