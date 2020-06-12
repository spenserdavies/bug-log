<template>
  <nav class="d-flex bug-font navbar navbar-expand-lg navbar-light bg-dark border-bottom border-info">
    
    <router-link class="navbar-brand  text-light " :to="{ name: 'Home' }"
      >  Bug-Log </router-link
    >
    <button
      class="navbar-toggler text-light border border-light"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span><i class="fas fa-bug"></i></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto ">
        <li class="nav-item text-light " :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link text-light"
            >Home</router-link
          >
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Profile' }"
        >
          <router-link class="nav-link text-light" :to="{ name: 'Profile' }"
            >Profile</router-link
          >
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-info "
          @click="login"
          v-if="!$auth.isAuthenticated"
        >
          Login
        </button>
        <button class="btn btn-danger" @click="logout" v-else>logout</button>
      </span>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
      this.$store.dispatch("getProfile");
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({returnTo: window.location.origin});
    }
  }
};
</script>

<style>
.bug-font{
  font-family: 'Press Start 2P', cursive;
}
</style>
