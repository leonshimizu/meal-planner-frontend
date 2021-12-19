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
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="recipeParams.query">
                </div>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Cuisine</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="recipeParams.cuisine">
                </div>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Diet</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="recipeParams.diet">
                </div>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Allergies</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="recipeParams.allergies">
                </div>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Number of Recipes Shown</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="recipeParams.number">
                </div>
                <button type="button" class="btn btn-success" v-on:click="generateRecipes()">Generate Recipes</button>
                <br>
                <br>
            </div>
        </div>
    </header>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  components: {},
  data: function() {
    return {
      message: "Hello World",
      recipes: {},
      recipeParams: {}
    }
  },
  created: function() {
    this.indexFunction();
  },
  methods: {
    generateRecipes: function() {
      console.log("in the index function");
      axios
        .get(`/recipes_generate?query=${this.query}&cuisine=${this.cuisine}&diet=${this.diet}&intolerances=${this.allergies}&number=${this.number}`)
        .then(response => {
          console.log(response.data);
          this.recipes = response.data;
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