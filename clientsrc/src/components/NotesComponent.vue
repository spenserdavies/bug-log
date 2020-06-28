<template>
  <div class="NotesComponent row bg-light">
    <div id="note-creator" class="col-4 col-md-3 border text-left py-1">{{noteProp.creatorEmail}}</div>
    <div id="note-content" class="col-6 col-md-7 border text-left py-1">{{noteProp.content}}</div>
    <div id="note-buttons" class="col-2 border text-center py-1"><i v-if="userIsCreator" class="fas mr-2 fa-edit pointer" @click="editNoteForm = !editNoteForm"></i><i v-if="userIsCreator" class="far fa-trash-alt ml-2 pointer" @click="deleteNote"></i></div>
    <div class="col-12 my-2" v-if="editNoteForm">
      <form class="form-inline" @submit.prevent="editNote">
        <div class="form-group ml-auto">
          <input type="text" name="content" id="content" class=" mr-2 form-control" placeholder="Edit Note Content" aria-describedby="helpId" v-model="noteProp.content">
        </div>
        <button type="submit" class="btn btn-outline-success mr-auto">submit</button> 
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotesComponent",
  props: ["noteProp"],
  data(){
    return{
      editNoteForm: false,
    }
  },
  computed: {
    userIsCreator(){
      return this.$store.state.profile.email == this.noteProp.creatorEmail
    },
  },
  methods: {
    editNote(){
      this.$store.dispatch("editNote", this.noteProp);
      this.editNoteForm = false;
    },
    deleteNote(){
      let close = confirm("Are You Sure You Want To Delete This Note?")
      if(close == true){
        this.$store.dispatch("deleteNote", this.noteProp)
      }
      return
    }
  }
}
</script>
<style scoped>

</style>