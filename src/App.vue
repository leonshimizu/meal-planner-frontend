<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-4 px-lg-5">
          <a class="navbar-brand" href="/">Hafa Adai!</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li class="nav-item"><a class="nav-link active" aria-current="page" href="/meal_plans">Personal Meal Plan Page</a></li>
                <li class="nav-item"><a class="nav-link active" aria-current="page" href="/recipes">Recipes</a></li>
                <li class="nav-item"><a class="nav-link" href="/about">About</a></li>
            </ul>
            <span class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Authentication</a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="/signup" v-if="user === null">Signup</a></li>
                    <li v-if="user === null"><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="/login" v-if="user === null">Login</a></li>
                    <li><a class="dropdown-item" href="/logout" v-if="user !== null">Logout</a></li>
                </ul>
            </span>
          </div>
      </div>
    </nav>
    
    <!-- Router View -->
    <router-view/>

    <button id="scrollToTopBtn" v-on:click="scrollToTop()">☝️</button>

    <!-- Footer -->
    <footer class="py-5 bg-dark">
        <div class="container"><p class="m-0 text-center text-white">Adios!</p></div>
    </footer>    
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data: function() {
            return {
                user: {}
            }
        },
        mounted: function() {
            axios 
                .get('/current_user')
                .then(response => {
                    console.log(response.data);
                    this.user = response.data;
                })
        },
        methods: {
            scrollToTop: function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } 
    }
</script>

<style>
    #scrollToTopBtn {
    background-color: black;
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    font-size: 16px;
    line-height: 48px;
    width: 48px;
    }
</style>