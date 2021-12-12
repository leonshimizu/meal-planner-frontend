<template>
  <div id="app">
    <!-- Masthead-->
    <header class="masthead">
      <div class="container position-relative">
          <div class="row justify-content-center">
              <div class="col-xl-6">
                  <div class="text-center text-white">
                      <!-- Page heading-->
                      <h1 class="mb-5">Generate more leads with a professional landing page!</h1>
                      <!-- Signup form-->
                      <!-- * * * * * * * * * * * * * * *-->
                      <!-- * * SB Forms Contact Form * *-->
                      <!-- * * * * * * * * * * * * * * *-->
                      <!-- This form is pre-integrated with SB Forms.-->
                      <!-- To make this form functional, sign up at-->
                      <!-- https://startbootstrap.com/solution/contact-forms-->
                      <!-- to get an API token!-->
                      <form class="form-subscribe" id="contactForm" data-sb-form-api-token="API_TOKEN">
                          <!-- Email address input-->
                          <div class="row">
                              <div class="col">
                                  <input class="form-control form-control-lg" id="emailAddress" type="email" placeholder="Email Address" data-sb-validations="required,email" />
                                  <div class="invalid-feedback text-white" data-sb-feedback="emailAddress:required">Email Address is required.</div>
                                  <div class="invalid-feedback text-white" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
                              </div>
                              <div class="col-auto"><button class="btn btn-primary btn-lg disabled" id="submitButton" type="submit">Submit</button></div>
                          </div>
                          <!-- Submit success message-->
                          <!---->
                          <!-- This is what your users will see when the form-->
                          <!-- has successfully submitted-->
                          <div class="d-none" id="submitSuccessMessage">
                              <div class="text-center mb-3">
                                  <div class="fw-bolder">Form submission successful!</div>
                                  <p>To activate this form, sign up at</p>
                                  <a class="text-white" href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                              </div>
                          </div>
                          <!-- Submit error message-->
                          <!---->
                          <!-- This is what your users will see when there is-->
                          <!-- an error submitting the form-->
                          <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error sending message!</div></div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </header>

    <router-view/>

    <!-- Footer-->
    <footer class="footer bg-light">
      <div class="container">
          <div class="row">
              <div class="col-lg-6 h-100 text-center text-lg-start my-auto">
                  <ul class="list-inline mb-2">
                      <li class="list-inline-item"><a href="#!">About</a></li>
                      <li class="list-inline-item">⋅</li>
                      <li class="list-inline-item"><a href="#!">Contact</a></li>
                      <li class="list-inline-item">⋅</li>
                      <li class="list-inline-item"><a href="#!">Terms of Use</a></li>
                      <li class="list-inline-item">⋅</li>
                      <li class="list-inline-item"><a href="#!">Privacy Policy</a></li>
                  </ul>
                  <p class="text-muted small mb-4 mb-lg-0">&copy; Your Website 2021. All Rights Reserved.</p>
              </div>
              <div class="col-lg-6 h-100 text-center text-lg-end my-auto">
                  <ul class="list-inline mb-0">
                      <li class="list-inline-item me-4">
                          <a href="#!"><i class="bi-facebook fs-3"></i></a>
                      </li>
                      <li class="list-inline-item me-4">
                          <a href="#!"><i class="bi-twitter fs-3"></i></a>
                      </li>
                      <li class="list-inline-item">
                          <a href="#!"><i class="bi-instagram fs-3"></i></a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
