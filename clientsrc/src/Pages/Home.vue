<template>
  <div class="home container">
    <div class="row">
      <div class="col-6 mx-auto pt-4 border-bottom border-warning">
        <h1 class="text-center">Bugs</h1>
      </div>
    </div>

        <div class="row my-4">
      <div class="col-10 mx-auto card shadow text-center py-1">
        <small>You can view Bugs and Notes without logging in.  However, to create/edit a bug report, add a note, or close a bug, you must log in.</small>
      </div>
    </div>

    <div class="row my-2">
      <div class="col-12 card shadow">
        <div class="row border-bottom border-info">
          <div class="col-3 border text-center py-1">Title</div>
          <div class="col-4 border text-center py-1">Reported By</div>
          <div class="col-2 border text-center py-1">
            <!-- TODO CREATE THE SORT FUNCTION AND @CLICK FOR STATUS -->
            Status
            <!-- <i class="fas fa-sort pointer text-warning float-right" @click="sortStatus"></i> -->
            <small class="text-warning float-right pointer" @click="sortStatus">sort</small>
          </div>
          <div class="col-3 border text-center py-1">
            <!-- TODO CREATE THE SORT FUNCTION AND @CLICK FOR MODIFIED DATE -->
            Last Modified
            <i class="fas fa-sort pointer text-warning float-right" @click="sortDate"></i>
          </div>
        </div>
        <!--NOTE End of banner -->

        <div v-for="bug in bugs" :key="bug.id" :bugProp="bug">
          <router-link :to="{name: 'bug', params: {bugId: bug.id}}">
            <div class="row">
              <div class="col-3 border text-left py-1">{{bug.title}}</div>
              <div id="bug-creator" class="col-4 border text-left py-1">{{bug.creatorEmail}}</div>
              <div id="bug-status" class="text-success col-2 border text-left py-1">
                <span v-if="bug.closed == false" class="text-success">OPEN</span><span v-else class="text-danger">CLOSED</span>
              </div>
              <div id="bug-date" class="col-3 border text-right py-1">{{bug.updatedAt}}</div>
            </div>
          </router-link>
        </div>

      </div> <!--NOTE end of card col-->
    </div> <!--NOTE end of card row-->



  </div> <!--NOTE end of container-->
</template>

<script>
export default {
  name: "home",
  mounted(){
    this.$store.dispatch("getBugs");
  },
  computed: {
    bugs(){
      return this.$store.state.bugs;
    }
  },
  methods:{
    sortStatus(){
      this.$store.dispatch("sortStatus");
    },
    sortDate(){
      this.$store.dispatch("sortDate");
    }
  }
};
</script>
<style>
.pointer{
  cursor: pointer;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
</style>
