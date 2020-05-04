<template>
  <div id="app">
    <app-navbar></app-navbar>
    <vue-confirm-dialog></vue-confirm-dialog>
    <div class="site-content">
      <b-container class="mt-2">
        <router-view></router-view>
      </b-container>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: 'App',
  components: {
    appNavbar: Navbar,
    appFooter: Footer
  }
}
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: #182834;
    color: #eff7fd;
  }
  .success-uploaded {
    padding: 20px;
    width: 100%;
    color: #1d651d;
    background-color: #b8ff91;
    text-align: center;
    border-radius: 10px;
  }
  .error-block {
    margin-top: 20px;
    padding: 20px;
    color: #e52727;
    background-color: #ffbcbc;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .close-edit {
    color: #eff7fd;
    background-color: #ff5b5b;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
  }
  .close-edit:hover {
    color: #eff7fd;
    text-decoration: none;
    background-color: #e52727;
  }
  button {
    border: none!important;
    border-radius: 5px;
    padding: 7px;
  }
  .site-content {
    min-height: 800px;
  }
</style>
