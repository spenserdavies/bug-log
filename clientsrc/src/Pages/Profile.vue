<template>
  <div class="about text-center">
    <h1 class="mt-3">Welcome To Your Profile!</h1>
    <h3 class="mt-3">{{ profile.name }}</h3>
    <img class="rounded mt-3" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
