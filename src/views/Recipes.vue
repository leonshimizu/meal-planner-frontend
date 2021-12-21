<template>
  <div class="recipes">
    <!-- Header-->
    <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Welcome to the Recipe Generator!</h1>
                <!-- <p class="lead fw-normal text-white-50 mb-0"></p> -->
                <p class="fw-normal text-white-50 mb-0">Diets: Gluten Free, Ketogenic, Vegetarian, Lacto-Vegetarian, Ovo-Vegetarian, Vegan, Pescetarian, Paleo, Primal, low FODMAP, or Whole30 (for more infomation, visit <a href="https://spoonacular.com/food-api/docs#Diets">Diets)</a></p>
                <p class="fw-normal text-white-50 mb-0">Cuisines: African, American, British, Cajun, Caribbean, chinese, Eastern European, European, French, German, Greek, Indian, Irish, Italian, Japanese, Jewish, Korean, Latin American, Mediterranean, Mexican, Middle Eastern, Nordic, Southern, Spanish, Thai, and Vietnamese</p>
                <p class="fw-normal text-white-50 mb-0">Allergies/Intolerances: Dairy, Egg, Gluten, Grain, Peanut, Seafood, Sesame, Shellfish, Soy, Sulfite, Tree Nut, and Wheat</p>
                <p class="fw-normal text-white-50 mb-0">Please, input your selection in at least one of the next 3 boxes, the last 2 are optional:</p>
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
                  <span class="input-group-text" id="inputGroup-sizing-sm">Allergies (Optional)</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="allergies">
                </div>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">How Many<small>(Default: 1)</small></span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="number"> 
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
        <div class="container px-4 px-lg-10 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl- justify-content-center">
                <div class="col mb-5" v-for="meal,$index in recipes">
                    <div class="card h-100 border-dark mb-3">
                        <!-- Product image -->
                        <img v-bind:src="meal.image" class="card-img-top" alt="..." style="max-width: 500px; text-align:center">
                        <!-- Product -->
                        <div class="card-body p-3">
                            <div class="text-center">
                              <!-- Product name -->
                              <h5 class="fw-bolder">{{ meal.title }}</h5>
                              <!-- Product details -->
                              <p v-if="meal.preparationMinutes !== 0 && meal.preparationMinutes !== undefined && meal.preparationMinutes <= 60">Prep Time: {{ meal.preparationMinutes }} minutes</p>
                              <p v-if="meal.preparationMinutes > 60">Prep Time: {{ (meal.preparationMinutes / 60).toFixed(2) }} minutes</p>
                              <p v-if="meal.cookingMinutes !== 0 && meal.cookingMinutes !== undefined && meal.cookingMinutes <= 60">Cook Time: {{ meal.cookingMinutes }} minutes</p>
                              <p v-if="meal.cookingMinutes > 60">Cook Time: {{ (meal.cookingMinutes / 60).toFixed(2) }} hours</p>
                              <p v-if="meal.servings >= 2">Servings: {{ meal.servings }}</p>
                              <p v-if="meal.servings < 2">Serving: {{ meal.servings }}</p>
                              <button type="button" class="btn btn-dark" v-on:click="extraInfo(meal)">Show More Info</button>
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <button id="scrollToTopBtn" v-on:click="scrollToTop()" v-if="clicked == true">☝️</button>


    <!-- Extra Modal -->
    <dialog id="extra-modal">
      <form method="dialog">
        <div class="card text-center">
          <div class="card-header">
            <strong>{{ info.title }}</strong>
          </div>
          <div class="card-body">
            <p class="card-text">
              <b>Ingredients: </b>
              <span v-for="product in info.extendedIngredients">
                {{ product.amount.toFixed(2) }} {{ product.unit }} of {{ product.name }}, 
              </span>
            </p>
            <p class="card-text" v-if="info.preparationMinutes !== 0 && info.preparationMinutes !== undefined">
              <b>Prep Time:</b> {{ info.preparationMinutes }} minutes, <b>Cook Time:</b> {{ info.cookingMinutes }} minutes
            </p>
            <p class="card-text">
              <b>Servings:</b> {{ info.servings }}
            </p>
            <p class="card-text"><strong>Instructions:</strong> {{ info.instructions }}</p>
            <p class="card-text">
              <b>Nutritional Facts: </b>
              <span v-for="nutrition,$index in info.nutrition.nutrients" v-if="$index !== 2 && $index !== 4 && $index < 10">
                {{ nutrition.title }}: {{ nutrition.amount }}{{ nutrition.unit }}, 
              </span>
            </p>
          </div>
        </div>  
        <br>
        <button class="btn btn-warning">Close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
  #scrollToTopBtn {
    background-color: black;
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    font-size: 25px;
    line-height: 48px;
    width: 48px;
  }
</style>

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
        recipes: {},
        query: "",
        cuisine: "",
        diet: "",
        allergies: "",
        number: "1",
        isLoading: false,
        currentRecipe: {},
        info: {
          nutrition: {
            nutrients: []
          }
        },
        clicked: false
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
            this.clicked = true;
            this.scrollDown();
          })
      },
      extraInfo: function(theRecipe) {
        console.log("in the extra info function");
        document.querySelector("#extra-modal").showModal();
        this.currentRecipe = theRecipe;
        axios 
          .get(`/extra_info?meal_id=${this.currentRecipe.id}`)
          .then(response => {
            console.log(response.data);
            this.info = response.data[0];
          })
      },
      scrollToTop: function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      scrollDown: function() {
        window.scrollTo(0, 600);
      }
    }
  }
</script>