<template>
  <div class="home">
    <!-- Header-->
    <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Welcome to the Meal Plan Generator!</h1>
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
                <button type="button" class="btn btn-success" v-on:click="saveMealPlan()">Save Meal Plan</button>
            </div>
        </div>
    </header>
    <!-- Section-->
    <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div class="col mb-5" v-for="(value, key) in days">
                    <div class="card h-100">
                        <!-- Product image-->
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">{{ key.charAt(0).toUpperCase() + key.slice(1) }}</h5>
                                <!-- Product price-->
                                <p>Breakfast: {{ value.meals[0].title }}</p>
                                <p>Lunch: {{ value.meals[1].title }}</p>
                                <p>Dinner: {{ value.meals[2].title }}</p>
                                <button type="button" class="btn btn-primary" v-on:click="showRecipeInfo(value)">Show More Info</button>
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
        <div class="card text-center" v-for="recipe in recipeInfo">
          <div class="card-header">
            <strong>{{ recipe.title }}</strong>
          </div>
          <div class="card-body">
            <p class="card-text">
              <table>
                <th>
                  Ingredients: 
                </th>
                <td v-for="product in recipe.extendedIngredients">
                  {{ product.amount }} {{ product.unit }} of {{ product.name }}
                </td>
              </table>
            </p>
            <p class="card-text">Instructions: {{ recipe.instructions }}</p>
            <p> 
              {{ recipe.nutrition && recipe.nutrition.nutrients[0].title }}: {{ recipe.nutrition && recipe.nutrition.nutrients[0].amount }} {{ recipe.nutrition && recipe.nutrition.nutrients[0].unit }}
              {{ recipe.nutrition && recipe.nutrition.nutrients[1].title }}: {{ recipe.nutrition && recipe.nutrition.nutrients[1].amount }} {{ recipe.nutrition && recipe.nutrition.nutrients[1].unit }}
              {{ recipe.nutrition && recipe.nutrition.nutrients[3].title }}: {{ recipe.nutrition && recipe.nutrition.nutrients[3].amount }} {{ recipe.nutrition && recipe.nutrition.nutrients[3].unit }}
              {{ recipe.nutrition && recipe.nutrition.nutrients[5].title }}: {{ recipe.nutrition && recipe.nutrition.nutrients[5].amount }} {{ recipe.nutrition && recipe.nutrition.nutrients[5].unit }}
              {{ recipe.nutrition && recipe.nutrition.nutrients[6].title }}: {{ recipe.nutrition && recipe.nutrition.nutrients[6].amount }} {{ recipe.nutrition && recipe.nutrition.nutrients[6].unit }}
              {{ recipe.nutrition && recipe.nutrition.nutrients[7].title }}: {{ recipe.nutrition && recipe.nutrition.nutrients[7].amount }} {{ recipe.nutrition && recipe.nutrition.nutrients[7].unit }}
              <!-- {{ recipe.nutrition && recipe.nutrition.nutrients[8].title }}: {{ recipe.nutrition && recipe.nutrition.nutrients[8].amount }} {{ recipe.nutrition && recipe.nutrition.nutrients[8].unit }} -->
              <!-- {{ recipe.nutrition && recipe.nutrition.nutrients[9].title }}: {{ recipe.nutrition && recipe.nutrition.nutrients[9].amount }} {{ recipe.nutrition && recipe.nutrition.nutrients[9].unit }} -->
            </p>
          </div>
        </div>  
        <br>
        <button class="btn btn-warning">Close</button>
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