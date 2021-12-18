<template>
  <div class="home">
    <!-- Header-->
    <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder" v-if="user !== null">Welcome {{ user.name}}, to your Meal Plan Generator!</h1>
                <h1 class="display-4 fw-bolder" v-if="user === null">Welcome to the Meal Plan Generator!</h1>
                <p class="lead fw-normal text-white-50 mb-0">Please select from the following diets:</p>
                <p class="fw-normal text-white-50 mb-0">Diets: Gluten Free, Ketogenic, Vegetarian, Lacto-Vegetarian, Ovo-Vegetarian, Vegan, Pescetarian, Paleo, Primal, low FODMAP, or Whole30 (for more infomation, visit <a href="https://spoonacular.com/food-api/docs#Diets">Diets)</a></p>
                <p class="fw-normal text-white-50 mb-0">Please, input your filters of choice:</p>
                <br>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Diet</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="diet">
                </div>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Calories</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="calories">
                </div>
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Allergies</span>
                  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="allergies">
                </div>
                <button type="button" class="btn btn-success" v-on:click="createMealPlan()">Generate Meal Plan</button>
                <br>
                <br>
                <button type="button" class="btn btn-success" v-on:click="saveMealPlan()" v-if="user !== null">Save Meal Plan</button>
                <p class="fw-normal text-white-50 mb-0" v-if="user === null">To save this meal plan, please create an account and signin. Thank you!</p>
            </div>
        </div>
    </header>
    <!-- Section-->
    <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div class="col mb-5" v-for="(value, key, $index) in days" v-if="$index < 7">
                    <div class="card h-100">
                        <!-- Product images -->
                        <!-- <img class="card-img-top" v-bind:src="days.image_urls[$index]" style="height:300px" /> -->
                        <!-- Carousel -->
                        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
                          <div class="carousel-inner">
                            <div class="carousel-item active"> 
                              <!-- <img v-bind:src="days.image_urls[$index]" class="d-block w-100" v-if="$index < 1">
                              <img v-bind:src="days.image_urls[$index + 1]" class="d-block w-100" v-if="$index < 1">
                              <img v-bind:src="days.image_urls[$index + 2]" class="d-block w-100" v-if="$index < 1">
                              <img v-bind:src="days.image_urls[$index + 3]" class="d-block w-100" v-if="$index >= 1">
                              <img v-bind:src="days.image_urls[$index + 4]" class="d-block w-100" v-if="$index >= 1">
                              <img v-bind:src="days.image_urls[$index + 5]" class="d-block w-100" v-if="$index >= 1"> -->
                              <!-- Make loop that adds 3 every iteration of the loop to make it as dry as possible -->
                              <img v-bind:src="days.image_urls[$index]" class="d-block w-100" alt="..." v-if="$index === 0">
                              <img v-bind:src="days.image_urls[$index + 3]" class="d-block w-100" alt="..." v-if="$index === 1">
                              <img v-bind:src="days.image_urls[$index + 6]" class="d-block w-100" alt="..." v-if="$index === 2">
                              <img v-bind:src="days.image_urls[$index + 9]" class="d-block w-100" alt="..." v-if="$index === 3">
                              <img v-bind:src="days.image_urls[$index + 12]" class="d-block w-100" alt="..." v-if="$index === 4">
                              <img v-bind:src="days.image_urls[$index + 15]" class="d-block w-100" alt="..." v-if="$index === 5">
                              <img v-bind:src="days.image_urls[$index + 18]" class="d-block w-100" alt="..." v-if="$index === 6">
                            </div>
                            <div class="carousel-item active">
                              <img v-bind:src="days.image_urls[$index + 1]" class="d-block w-100" alt="..." v-if="$index === 0">
                              <img v-bind:src="days.image_urls[$index + 4]" class="d-block w-100" alt="..." v-if="$index === 1">
                              <img v-bind:src="days.image_urls[$index + 7]" class="d-block w-100" alt="..." v-if="$index === 2">
                              <img v-bind:src="days.image_urls[$index + 10]" class="d-block w-100" alt="..." v-if="$index === 3">
                              <img v-bind:src="days.image_urls[$index + 13]" class="d-block w-100" alt="..." v-if="$index === 4">
                              <img v-bind:src="days.image_urls[$index + 16]" class="d-block w-100" alt="..." v-if="$index === 5">
                              <img v-bind:src="days.image_urls[$index + 19]" class="d-block w-100" alt="..." v-if="$index === 6">
                            </div>
                            <div class="carousel-item active">
                              <img v-bind:src="days.image_urls[$index + 2]" class="d-block w-100" alt="..." v-if="$index === 0">
                              <img v-bind:src="days.image_urls[$index + 5]" class="d-block w-100" alt="..." v-if="$index === 1">
                              <img v-bind:src="days.image_urls[$index + 8]" class="d-block w-100" alt="..." v-if="$index === 2">
                              <img v-bind:src="days.image_urls[$index + 11]" class="d-block w-100" alt="..." v-if="$index === 3">
                              <img v-bind:src="days.image_urls[$index + 14]" class="d-block w-100" alt="..." v-if="$index === 4">
                              <img v-bind:src="days.image_urls[$index + 17]" class="d-block w-100" alt="..." v-if="$index === 5">
                              <img v-bind:src="days.image_urls[$index + 20]" class="d-block w-100" alt="..." v-if="$index === 6">
                            </div>
                          </div>
                          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                          </button>
                          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                          </button>
                        </div>
                        <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">{{ key.charAt(0).toUpperCase() + key.slice(1) }}</h5>
                                <!-- Product price-->
                                <!-- <p>{{ days.image_urls }}</p> -->
                                <p>Breakfast: {{ value.meals[0].title }}</p>
                                <p>Lunch: {{ value.meals[1].title }}</p>
                                <p>Dinner: {{ value.meals[2].title }}</p>
                                <button type="button" class="btn btn-primary" v-on:click="showRecipeInfo(value)" v-if="user !== null">Show More Info</button>
                            </div>
                        </div>
                        <!-- Product actions-->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>      
    <!-- Show Modal -->
    <dialog id="show-modal">
      <form method="dialog">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
              <div class="col mb-5" v-for="recipe in recipeInfo">
                <div class="card h-100">
                  <img v-bind:src="recipe.image" alt="..." style="max-width: 500px; text-align:center">
                  <div class="card-header">
                    <strong>{{ recipe.title }}</strong>
                  </div>
                  <div class="card-body p-3">
                    <div class="text-center">
                      <p class="card-text">
                      <b>Ingredients: </b>
                      <span v-for="product in recipe.extendedIngredients">
                        {{ product.amount.toFixed(2) }} {{ product.unit }} of {{ product.name }}, 
                      </span>
                      </p>
                      <p class="card-text" v-if="recipe.preparationMinutes !== null || recipe.cookingMinutes !== null">
                        <b>Prep Time:</b> {{ recipe.preparationMinutes }} minutes, <b>Cook Time:</b> {{ recipe.cookingMinutes }} minutes
                      </p>
                      <p class="card-text">
                        <b>Servings:</b> {{ recipe.servings }}, <b>Price Per Serving:</b> ${{ recipe.pricePerServing }}
                      </p>
                      <p class="card-text"><strong>Instructions:</strong> {{ recipe.instructions }}</p>
                      <p class="card-text">
                        <b>Nutritional Facts: </b>
                        <span v-for="info,$index in recipe.nutrition.nutrients" v-if="$index !== 2 && $index !== 4 && $index < 10">
                          {{ info.title }}: {{ info.amount }}{{ info.unit }}, 
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>  
              <br>
              <button class="btn btn-warning">Close</button>
            </div>
        </div>
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
      diet: "Gluten Free",
      calories: "1200",
      allergies: "Peanut",
      currentMealPlan: {},
      recipeInfo: {},
      mealPlan: {},
      user: {}
    }
  },
  created: function() {
    this.createMealPlan();
  },
  methods: {
    createMealPlan: function() {
      console.log("in the index/create meal plan function");
      axios
        .get(`/meal_plans_generate?diet=${this.diet}&calories=${this.calories}&allergies=${this.allergies}`)
        .then(response => {
          console.log(response.data);
          this.days = response.data;
        })
      axios
        .get('/current_user')
        .then(response => {
          console.log(response.data);
          this.user = response.data;
        })
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
      axios 
        .post('/meals', this.days)
        .then(response => {
          console.log(response.data);
        })
    }
  }
}
</script>

<!-- CAROUSEL - doesn't loop properly
<div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://thestayathomechef.com/wp-content/uploads/2019/01/Pot-Roast-1.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="https://www.jocooks.com/wp-content/uploads/2019/10/coconut-chicken-curry-1-10.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="https://therecipecritic.com/wp-content/uploads/2021/07/streettacos-500x500.jpg" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> -->