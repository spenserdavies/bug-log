<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-7 text-center rounded bg-light mx-auto mt-3 pt-2 shadow">
        <p>This is your profile page!</p>
        <p>Upon expansion of the main platform, the Home page will become crowded, <br> so come here to find the bugs you reported</p>
        <p>The email associated with your account is: <b>{{ profile.email}}</b></p>
      </div>
    </div>
    <div class="row">
      <div class="col-12 my-4 text-center">
        <h4><u>Your Bugs:</u></h4>
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
    <div v-for="bug in bugs" :key="bug.id" :bugProp="bug">
          <router-link :to="{name: 'bug', params: {bugId: bug.id}}">
            <div class="row  bg-light ">
              <div class="col-4 border text-left py-1">{{bug.title}}</div>
              <div class="col-6 border text-left py-1">{{bug.description}}</div>
              <div class="text-success col-2 border text-center py-1">
                <span v-if="bug.closed == false" class="text-success">OPEN</span><span v-else class="text-danger">CLOSED</span>
              </div>
            </div>
          </router-link>
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
