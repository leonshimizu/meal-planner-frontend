<template>
  <!-- Header-->
  <div class="mealPlan">
    <header class="bg-dark py-5">
      <div class="container px-4 px-lg-5 my-5">
          <div class="text-center text-white">
              <h1 class="display-4 fw-bolder">{{ message }}</h1>
              <p class="lead fw-normal text-white-50 mb-0">Diet: {{ meal_plan[0].diet }}</p>
              <p class="lead fw-normal text-white-50 mb-0">Allergies: {{ meal_plan[0].allergies }}</p>
              <p class="lead fw-normal text-white-50 mb-0">Time Frame: {{ meal_plan[0].timeFrame }}</p>
              <p class="lead fw-normal text-white-50 mb-0">Calories: {{ meal_plan[0].calories }}</p>
              <p class="lead fw-normal text-white-50 mb-0">Created: {{ meal_plan[0].created_at }}</p>
          </div>
      </div>
    </header>

    <!-- Section-->
    <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
                <div class="col mb-5" v-for="meal in allMeals">
                    <div class="card h-100">
                        <!-- Product image-->
                        <img v-bind:src="meal.image" class="card-img-top" alt="..." style="max-width: 500px; text-align:center">
                        <!-- Product details-->
                        <div class="card-body p-3">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">Title: {{ meal.title }}</h5>
                                <!-- Product price-->
                                <p>Prep Time: {{ meal.preparationMinutes }}</p>
                                <p>Cook Time: {{ meal.cookingMinutes }}</p>
                                <p>Servings: {{ meal.servings }}</p>
                                <p>Price Per Serving: {{ meal.pricePerServing }}</p>
                                <!-- <button type="button" class="btn btn-primary" v-on:click="showRecipeInfo(value)">Show More Info</button> -->
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
<!-- 
    <ul>
      <li v-for="meal in allMeals">
        <p><strong>Title: {{ meal.title }}</strong></p>
        <img v-bind:src="meal.image">
        <p>Prep Time: {{ meal.preparationMinutes }}</p>
        <p>Cook Time: {{ meal.cookingMinutes }}</p>
        <p>Servings: {{ meal.servings }}</p>
        <p>Price Per Serving: {{ meal.pricePerServing }}</p>
        <button v-on:click="extraInfo(meal)">Show More Info</button>
      </li>
    </ul>
    <dialog id="extra-modal">
      <form method="dialog">
        <p>Instructions: {{ info.instructions }}</p>
        <p>Ingredients:</p>
        <p v-for="ingredient in info.extendedIngredients">
          {{ ingredient.amount }} {{ ingredient.unit }} of {{ ingredient.name }},
        </p>
        <p> 
          {{ info.nutrition && info.nutrition.nutrients[0].title }}: {{ info.nutrition && info.nutrition.nutrients[0].amount }} {{ info.nutrition && info.nutrition.nutrients[0].unit }}
          {{ info.nutrition && info.nutrition.nutrients[1].title }}: {{ info.nutrition && info.nutrition.nutrients[1].amount }} {{ info.nutrition && info.nutrition.nutrients[1].unit }}
          {{ info.nutrition && info.nutrition.nutrients[3].title }}: {{ info.nutrition && info.nutrition.nutrients[3].amount }} {{ info.nutrition && info.nutrition.nutrients[3].unit }}
          {{ info.nutrition && info.nutrition.nutrients[5].title }}: {{ info.nutrition && info.nutrition.nutrients[5].amount }} {{ info.nutrition && info.nutrition.nutrients[5].unit }}
          {{ info.nutrition && info.nutrition.nutrients[6].title }}: {{ info.nutrition && info.nutrition.nutrients[6].amount }} {{ info.nutrition && info.nutrition.nutrients[6].unit }}
          {{ info.nutrition && info.nutrition.nutrients[7].title }}: {{ info.nutrition && info.nutrition.nutrients[7].amount }} {{ info.nutrition && info.nutrition.nutrients[7].unit }}
          {{ info.nutrition && info.nutrition.nutrients[8].title }}: {{ info.nutrition && info.nutrition.nutrients[8].amount }} {{ info.nutrition && info.nutrition.nutrients[8].unit }}
          {{ info.nutrition && info.nutrition.nutrients[9].title }}: {{ info.nutrition && info.nutrition.nutrients[9].amount }} {{ info.nutrition && info.nutrition.nutrients[9].unit }}
        </p>
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
        allMeals: {},
        currentMeal: {},
        info: {
          nutrition: {
            nutrients: [0, 1, 3, 5, 6, 7, 8, 9]
          }
        },
        mealData: {}
        // nutrition: [0, 1, 3, 5, 6, 7, 8, 9] // array to make loop for nutrional data
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
            console.log(response.data);
            this.meal_plan = response.data;
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
        // console.log(this.currentMeal.id);
        axios 
          .get(`/extra_info?meal_id=${this.currentMeal.id}`)
          .then(response => {
            console.log(response.data);
            this.info = response.data[0];
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