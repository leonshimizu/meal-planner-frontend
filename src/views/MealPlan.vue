<template>
  <!-- Header -->
  <div class="mealPlan">
    <header class="bg-dark py-5" v-if="user !== null">
      <div class="container px-4 px-lg-5 my-5">
          <div class="text-center text-white">
              <h1 class="display-4 fw-bolder">{{ user.name }}'s Meal Plan:</h1>
              <p class="lead fw-normal text-white-50 mb-0">Diet: {{ meal_plan[0].diet }}</p>
              <p class="lead fw-normal text-white-50 mb-0" v-if="meal_plan[0].allergies !== ''">Allergies: {{ meal_plan[0].allergies }}</p>
              <p class="lead fw-normal text-white-50 mb-0">Time Frame: {{ meal_plan[0].timeFrame }}</p>
              <p class="lead fw-normal text-white-50 mb-0">Calories: {{ meal_plan[0].calories }}</p>
              <p class="lead fw-normal text-white-50 mb-0">Created: {{ meal_plan[0].created_at[5] }}{{ meal_plan[0].created_at[6] }}/{{ meal_plan[0].created_at[8] }}{{ meal_plan[0].created_at[9] }}/{{ meal_plan[0].created_at[0] }}{{ meal_plan[0].created_at[1] }}{{ meal_plan[0].created_at[2] }}{{ meal_plan[0].created_at[3] }}</p>
          </div> 
      </div>
    </header>
    <header class="bg-dark py-5" v-if="user == null">
      <div class="container px-4 px-lg-5 my-5">
          <div class="text-center text-white">
              <h1 class="display-4 fw-bolder">Please create an account to view your personal meal plan. Thank you!</h1>
          </div>
      </div>
    </header>
    
    <!-- Section -->
    <LoadingScreen v-if="isLoading"></LoadingScreen>
    <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
                <div class="col mb-5" v-for="meal,$index in allMeals">
                    <div class="card h-100">
                        <!-- Product image -->
                        <img v-bind:src="meal.image" class="card-img-top" alt="..." style="max-width: 500px; text-align:center">
                        <!-- Product -->
                        <div class="card-body p-3">
                            <div class="text-center">
                                <!-- Product name -->
                                <h5 class="fw-bolder">{{ mealData[$index].day_of_week.charAt(0).toUpperCase() + mealData[$index].day_of_week.slice(1) }} - {{ mealData[$index].meal_type.charAt(0).toUpperCase() + mealData[$index].meal_type.slice(1) }}</h5>
                                <h5 class="fw-bolder">{{ meal.title }}</h5>
                                <!-- Product details -->
                                <p v-if="meal.preparationMinutes !== 0 && meal.preparationMinutes !== undefined && meal.preparationMinutes <= 60">Prep Time: {{ meal.preparationMinutes }} minutes</p>
                                <p v-if="meal.preparationMinutes > 60">Prep Time: {{ (meal.preparationMinutes / 60).toFixed(2) }} minutes</p>
                                <p v-if="meal.cookingMinutes !== 0 && meal.cookingMinutes !== undefined && meal.cookingMinutes <= 60">Cook Time: {{ meal.cookingMinutes }} minutes</p>
                                <p v-if="meal.cookingMinutes > 60">Cook Time: {{ (meal.cookingMinutes / 60).toFixed(2) }} hours</p>
                                <p v-if="meal.servings >= 2">Servings: {{ meal.servings }}</p>
                                <p v-if="meal.servings < 2">Serving: {{ meal.servings }}</p>
                                <button type="button" class="btn btn-primary" v-on:click="extraInfo(meal)">Show More Info</button>
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>  

    <button id="scrollToTopBtn" v-on:click="scrollToTop()">☝️</button>

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
    data: function () {
      return {
        meal_plan: {
          diet: [],
          allergies: [],
          timeFrame: [],
          calories: [],
          created_at: []
        },
        allMeals: {},
        currentMeal: {},
        info: {
          nutrition: {
            nutrients: []
          }
        },
        mealData: {},
        user: {},
        isLoading: false
      };
    },
    components: {
      LoadingScreen
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
            console.log(response.data);
            this.meal_plan = response.data;
          })
        axios
          .get('/current_user')
          .then(response => {
            console.log(response.data);
            this.user = response.data;
          })
      },
      recipeShow: function() { 
        this.isLoading = true;
        console.log("in the meals show");
        axios 
          .get('/all_meals')
          .then(response => {
            console.log(response.data);
            this.isLoading = false;
            this.allMeals = response.data;
            this.scrollDown();
          })
        axios 
          .get('/meals')
          .then(response => {
            console.log(response.data);
            this.mealData = response.data;
          })
      },
      extraInfo: function(theMeal) {
        console.log("in the extra info function");
        document.querySelector("#extra-modal").showModal();
        this.currentMeal = theMeal;
        axios 
          .get(`/extra_info?meal_id=${this.currentMeal.id}`)
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
    },
  };
</script>