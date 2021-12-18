<template>
  <div class="recipes">
    <h1>Welcome to the Recipe Generator!</h1>
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
    </ol>
    <!-- {{ recipes.products }} -->
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
      recipes: []
    }
  },
  created: function() {
    this.indexFunction();
  },
  methods: {
    indexFunction: function() {
      console.log("in the index function");
      axios
        .get(`https://api.spoonacular.com/food/products/search?query=chicken&number=2&addProductInformation=true&apiKey=${}`)
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
