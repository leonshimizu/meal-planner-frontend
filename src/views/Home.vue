<template>
  <div class="home">
    <!-- Header -->
    <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder" v-if="user !== null">Welcome {{ user.name}}, to your Meal Plan Generator!</h1>
                <h1 class="display-4 fw-bolder" v-if="user === null">Planning your meals just got easier!</h1>
                <p class="lead fw-normal text-white-50 mb-0" v-if="user === null">Feel free to try our Meal Plan Generator:</p>
                <p class="lead fw-normal text-white-50 mb-0" v-if="user !== null">Please select from the following diets and then input your desired calories and if you have any allergies:</p>
                <p class="fw-normal text-white-50 mb-0">Diets: Gluten Free, Ketogenic, Vegetarian, Lacto-Vegetarian, Ovo-Vegetarian, Vegan, Pescetarian, Paleo, Primal, low FODMAP, or Whole30 (for more infomation, visit <a href="https://spoonacular.com/food-api/docs#Diets">Diets)</a></p>
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
                <br v-if="saved === true">
                <p class="fw-normal text-white-50 mb-0" v-if="saved === true">Meal Plan Saved!</p>
                <p class="fw-normal text-white-50 mb-0" v-if="user === null">To save this meal plan, please <a href="/signup">create an account</a> and/or <a href="/login">login</a>. Thank you!</p>
            </div>
        </div>
    </header>

    <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="test-download"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"

        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
            {{ days }}
        </section>
    </vue-html2pdf>
    <!-- <button v-on:click="generateReport()">Download</button> -->
    
    <!-- Section -->
    <LoadingScreen v-if="isLoading"></LoadingScreen>
    <section class="py-5">
        <div class="container px-4 px-lg-10 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div class="col mb-5" v-for="(value, key, $index) in days" v-if="$index < 7">
                    <div class="card h-100 border-dark mb-3">
                        <!-- Product images -->
                        <!-- Carousel -->
                        <div v-bind:id="`carouselExampleIndicators${$index}`" class="carousel slide" data-bs-ride="carousel">
                          <div class="carousel-indicators">
                            <button type="button" v-bind:data-bs-target="`#carouselExampleIndicators${$index}`" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" v-bind:data-bs-target="`#carouselExampleIndicators${$index}`" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" v-bind:data-bs-target="`#carouselExampleIndicators${$index}`" data-bs-slide-to="2" aria-label="Slide 3"></button>
                          </div>
                          <div class="carousel-inner">
                            <div class="carousel-item active"> 
                              <img v-bind:src="days.image_urls[$index]" class="d-block w-100" v-if="$index === 0">
                              <img v-bind:src="days.image_urls[$index + 2]" class="d-block w-100" v-if="$index === 1">
                              <img v-bind:src="days.image_urls[$index + 4]" class="d-block w-100" v-if="$index === 2">
                              <img v-bind:src="days.image_urls[$index + 6]" class="d-block w-100" v-if="$index === 3">
                              <img v-bind:src="days.image_urls[$index + 8]" class="d-block w-100" v-if="$index === 4">
                              <img v-bind:src="days.image_urls[$index + 10]" class="d-block w-100" v-if="$index === 5">
                              <img v-bind:src="days.image_urls[$index + 12]" class="d-block w-100" v-if="$index === 6">
                            </div>
                            <div class="carousel-item"> 
                              <img v-bind:src="days.image_urls[$index + 1]" class="d-block w-100" v-if="$index === 0">
                              <img v-bind:src="days.image_urls[$index + 3]" class="d-block w-100" v-if="$index === 1">
                              <img v-bind:src="days.image_urls[$index + 5]" class="d-block w-100" v-if="$index === 2">
                              <img v-bind:src="days.image_urls[$index + 7]" class="d-block w-100" v-if="$index === 3">
                              <img v-bind:src="days.image_urls[$index + 9]" class="d-block w-100" v-if="$index === 4">
                              <img v-bind:src="days.image_urls[$index + 11]" class="d-block w-100" v-if="$index === 5">
                              <img v-bind:src="days.image_urls[$index + 13]" class="d-block w-100" v-if="$index === 6">
                            </div>
                            <div class="carousel-item"> 
                              <img v-bind:src="days.image_urls[$index + 2]" class="d-block w-100" v-if="$index === 0">
                              <img v-bind:src="days.image_urls[$index + 4]" class="d-block w-100" v-if="$index === 1">
                              <img v-bind:src="days.image_urls[$index + 6]" class="d-block w-100" v-if="$index === 2">
                              <img v-bind:src="days.image_urls[$index + 8]" class="d-block w-100" v-if="$index === 3">
                              <img v-bind:src="days.image_urls[$index + 10]" class="d-block w-100" v-if="$index === 4">
                              <img v-bind:src="days.image_urls[$index + 12]" class="d-block w-100" v-if="$index === 5">
                              <img v-bind:src="days.image_urls[$index + 14]" class="d-block w-100" v-if="$index === 6">
                            </div>
                          </div>
                          <button class="carousel-control-prev" type="button" v-bind:data-bs-target="`#carouselExampleIndicators${$index}`" data-bs-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" v-bind:data-bs-target="`#carouselExampleIndicators${$index}`" data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <!-- Product -->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">{{ key.charAt(0).toUpperCase() + key.slice(1) }}</h5>
                                <!-- Product details -->
                                <p><strong>Breakfast:</strong> {{ value.meals[0].title }}</p>
                                <p><strong>Lunch:</strong> {{ value.meals[1].title }}</p>
                                <p><strong>Dinner:</strong> {{ value.meals[2].title }}</p>
                                <button type="button" class="btn btn-dark" v-on:click="showRecipeInfo(value)">More Info</button>
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
                      <p class="card-text" v-if="recipe.preparationMinutes !== 0 && recipe.cookingMinutes !== undefined && recipe.cookingMinutes <= 60">
                        <b>Prep Time:</b> {{ recipe.preparationMinutes }} minutes, <b>Cook Time:</b> {{ recipe.cookingMinutes }} minutes
                      </p>
                      <p class="card-text" v-if="recipe.preparationMinutes > 60 ">
                        <b>Prep Time:</b> {{ (recipe.preparationMinutes / 60).toFixed(2) }} hours, <b>Cook Time:</b> {{ recipe.cookingMinutes }} minutes
                      </p>
                      <p class="card-text" v-if="recipe.cookingMinutes > 60 ">
                        <b>Prep Time:</b> {{ recipe.preparationMinutes }} minutes, <b>Cook Time:</b> {{ (recipe.cookingMinutes / 60).toFixed(2) }} hours
                      </p>
                      <p class="card-text" v-if="recipe.preparationMinutes > 60 && recipe.cookingMinutes > 60">
                        <b>Prep Time:</b> {{ (recipe.preparationMinutes / 60).toFixed(2) }} minutes, <b>Cook Time:</b> {{ (recipe.cookingMinutes / 60).toFixed(2) }} hours
                      </p>
                      <p class="card-text" v-if="recipe.servings >= 2">
                        <b>Servings:</b> {{ recipe.servings }}
                      </p>
                      <p class="card-text" v-if="recipe.servings < 2">
                        <b>Serving:</b> {{ recipe.servings }}
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
  import VueHtml2pdf from 'vue-html2pdf'
  export default {
    name: 'Home',
    components: {
      LoadingScreen,
      VueHtml2pdf
    },
    data: function() {
      return {
        welcomeMessage: "Welcome to the Meal Plan Generator!",
        days: [],
        diet: "",
        calories: "",
        allergies: "",
        currentMealPlan: {},
        recipeInfo: {},
        mealPlan: {},
        user: {},
        isLoading: false,
        saved: false,
        clicked: false,
      }
    },
    created: function() {
      // this.createMealPlan();
      axios
        .get('/current_user')
        .then(response => {
          console.log(response.data);
          this.user = response.data;
        })    
    },
    methods: {
      createMealPlan: function() {
        this.isLoading = true;
        console.log("in the index/create meal plan function");
        axios
          .get(`/meal_plans_generate?diet=${this.diet}&calories=${this.calories}&allergies=${this.allergies}`)
          .then(response => {
            console.log(response.data);
            this.isLoading = false;
            this.clicked = true;
            this.days = response.data;
            this.scrollDown();
            // this.convertDaysToArray();
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
            timeFrame: "Week",
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
            this.saved = true;
            this.$router.push("/meal_plans");
          })
      },
      scrollToTop: function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      scrollDown: function() {
        window.scrollTo(0, 3000);
      },
      generateReport () {
        this.$refs.html2Pdf.generatePdf()
      }
    }
  }
</script>