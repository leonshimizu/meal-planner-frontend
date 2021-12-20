<template>
  <div id="loading">
    <img
      class="img"
      src="../assets/loader-2_food.gif"
      alt="loading..."
    />
  </div>
</template>

<script>
  export default {
    name: "Loading"
  };
</script>

<style>
  #loading {
    position: absolute;
    z-index: 1000;
    background-color: white;
    height: 100vh;
    width: 100vw;
    text-align: center;
    line-height: 1vh;
  }
  .img {
    position: relative;
    margin: auto;
    margin-top: 1%;
  }
</style>