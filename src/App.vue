<template>
  <div id="app">
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-4 px-lg-5">
          <a class="navbar-brand" href="/">Hafa Adai!</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                  <li class="nav-item"><a class="nav-link active" aria-current="page" href="/meal_plans">Personal Meal Plan Page</a></li>
                  <li class="nav-item"><a class="nav-link" href="/about">About</a></li>
              </ul>
          </div>
      </div>
    </nav>
    
    <!-- Router View -->
    <router-view/>

    <!-- Footer-->
    <footer class="py-5 bg-dark">
        <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2021</p></div>
    </footer>    
  </div>
</template>

<style>

</style>

<!-- <li class="nav-item dropdown"> EXTRA DROP DOWN MENU
    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="#!">All Products</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#!">Popular Items</a></li>
        <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
    </ul>
</li> -->

<!-- <form class="d-flex"> EXTRA FORM 
    <button class="btn btn-outline-dark" type="submit">
        <i class="bi-cart-fill me-1"></i>
        Cart
        <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
    </button>
</form> -->