<template>
  <div class="recipes">
     <!-- Header-->
    <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Welcome to the Recipe Generator!</h1>
                <p class="lead fw-normal text-white-50 mb-0">Here are some example recipes, if you choose to, here are some filters you can use:</p>
                <p class="fw-normal text-white-50 mb-0">Diets: Gluten Free, Ketogenic, Vegetarian, Lacto-Vegetarian, Ovo-Vegetarian, Vegan, Pescetarian, Paleo, Primal, low FODMAP, or Whole30 (for more infomation, visit <a href="https://spoonacular.com/food-api/docs#Diets">Diets)</a></p>
                <p class="fw-normal text-white-50 mb-0">Cuisines: African, American, British, Cajun, Caribbean, chinese, Eastern European, European, French, German, Greek, Indian, Irish, Italian, Japanese, Jewish, Korean, Latin American, Mediterranean, Mexican, Middle Eastern, Nordic, Southern, Spanish, Thai, and Vietnamese</p>
                <p class="fw-normal text-white-50 mb-0">Allergies/Intolerances: Dairy, Egg, Gluten, Grain, Peanut, Seafood, Sesame, Shellfish, Soy, Sulfite, Tree Nut, and Wheat</p>
                <p class="fw-normal text-white-50 mb-0">Please, input your filters of choice:</p>
                <br>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Query</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="query">
                </div>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Cuisine</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="cuisine">
                </div>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Diet</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="diet">
                </div>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Allergies</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="allergies">
                </div>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Number of Recipes Shown</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="number"> <!-- write that it defaults to 1 -->
                </div>
                <button type="button" class="btn btn-success" v-on:click="generateRecipes()">Generate Recipes</button>
                <br>
                <br>
            </div>
        </div>
    </header>

    <!-- Section -->
    <LoadingScreen v-if="isLoading"></LoadingScreen>
    <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
                <div class="col mb-5" v-for="recipe,$index in recipes">
                    <div class="card h-100">
                        <!-- Product image -->
                        <!-- <img v-bind:src="meal.image" class="card-img-top" alt="..." style="max-width: 500px; text-align:center"> -->
                        <!-- Product -->
                        <div class="card-body p-3">
                            <div class="text-center">
                              {{ recipe }}
                              <!-- Product name -->
                              <!-- <h5 class="fw-bolder">{{ mealData[$index].day_of_week.charAt(0).toUpperCase() + mealData[$index].day_of_week.slice(1) }} - {{ mealData[$index].meal_type.charAt(0).toUpperCase() + mealData[$index].meal_type.slice(1) }}</h5> -->
                              <!-- <h5 class="fw-bolder">{{ meal.title }}</h5> -->
                              <!-- Product details -->
                              <!-- <p v-if="meal.preparationMinutes !== 0 && meal.preparationMinutes !== undefined && meal.preparationMinutes <= 60">Prep Time: {{ meal.preparationMinutes }} minutes</p>
                              <p v-if="meal.preparationMinutes > 60">Prep Time: {{ (meal.preparationMinutes / 60).toFixed(2) }} minutes</p>
                              <p v-if="meal.cookingMinutes !== 0 && meal.cookingMinutes !== undefined && meal.cookingMinutes <= 60">Cook Time: {{ meal.cookingMinutes }} minutes</p>
                              <p v-if="meal.cookingMinutes > 60">Cook Time: {{ (meal.cookingMinutes / 60).toFixed(2) }} hours</p>
                              <p v-if="meal.servings >= 2">Servings: {{ meal.servings }}</p>
                              <p v-if="meal.servings < 2">Serving: {{ meal.servings }}</p>
                              <button type="button" class="btn btn-primary" v-on:click="extraInfo(meal)">Show More Info</button> -->
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>  
  </div>
</template>

<script>
import LoadingScreen from "../components/LoadingScreen.vue"
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    LoadingScreen
  },
  data: function() {
    return {
      message: "Hello World",
      recipes: {},
      query: "",
      cuisine: "",
      diet: "",
      allergies: "",
      number: "1",
      isLoading: false
    }
  },
  created: function() {},
  methods: {
    generateRecipes: function() {
      console.log("in the index function");
      this.isLoading = true;
      axios
        .get(`/recipes_generate?query=${this.query}&cuisine=${this.cuisine}&diet=${this.diet}&intolerances=${this.allergies}&number=${this.number}`)
        .then(response => {
          console.log(response.data.results);
          this.recipes = response.data.results;
          this.isLoading = false;
        })
    },
    showInfo: function() {
      console.log("in the show info function");
    }
  }
}
</script>

    <!-- <h1>Welcome to the Recipe Generator!</h1>
    <h3>Here are some example recipes, if you choose to, here are some filters you can use:</h3>
    <p>Diets: Gluten Free, Ketogenic, Vegetarian, Lacto-Vegetarian, Ovo-Vegetarian, Vegan, Pescetarian, Paleo, Primal, low FODMAP, and Whole30 (for more infomation, visit <a href="https://spoonacular.com/food-api/docs#Diets">Diets)</a></p>
    <p>Cuisines: African, American, British, Cajun, Caribbean, chinese, Eastern European, European, French, German, Greek, Indian, Irish, Italian, Japanese, Jewish, Korean, Latin American, Mediterranean, Mexican, Middle Eastern, Nordic, Southern, Spanish, Thai, and Vietnamese</p>
    <p>Allergies/Intolerances: Dairy, Egg, Gluten, Grain, Peanut, Seafood, Sesame, Shellfish, Soy, Sulfite, Tree Nut, and Wheat</p>
    <p>Meal Tyes: Main Course, Side dish, Dessert, Appetizer, Salad, Bread, Breakfast, Soup, Beverage, Sauce, Marinade, Fingerfood, Snack, and Drink</p>
    <p>For more sorting options, visit <a href="https://spoonacular.com/food-api/docs#Recipe-Sorting-Options">Sorting Options</a></p>
    <hr>
    <ol>
      <li v-for="recipe in recipes.products">
        {{ recipe.title }}
        {{ recipe.price }}
        <button v-on:click="showInfo()">Show More Info</button>
      </li>
    </ol> -->
    <!-- {{ recipes.products }} -->