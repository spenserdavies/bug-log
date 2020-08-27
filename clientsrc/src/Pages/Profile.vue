<template>
  <div class="container bg-light shadow mt-3">
    <div class="row">
      <div class="col-12 mt-3">
        <p>This is your profile page! Here you can see all of the bugs you have reported!</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-3">
        <p>The email associated with your account is: <b>{{ profile.email}}</b></p>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-5">
        <p>Your bugs:</p>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <h5>Title</h5>
      </div>
      <div class="col-6">
        <h5>Description</h5>
      </div>
      <div class="col-2 text-center">
        <h5>Status</h5>
      </div>
    </div>
    <div class="row d-flex border-top" v-for="bug in bugs" :key="bug.id">
      <div class="col-4 py-2 border-right">
        <p> {{ bug.title }}</p>
      </div>
      <div class="col-6 py-2 border-right">
        <p> {{bug.description}}</p>
      </div>
      <div class="col-2 py-2 text-center">
        <p v-if="bug.closed" class="text-danger">CLOSED</p>
        <p v-else class="text-success">OPEN</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    bugs(){
      return this.$store.state.bugs.filter(b => b.creatorEmail == this.profile.email);
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
