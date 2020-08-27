<template>
  <div class="bug container">
    
    <div class="row border-bottom border-info mt-2">
      <div class="col-12">
        <h1><i class="fas fa-bug"></i> <u>{{bug.title}}</u></h1>
      </div>
      <div class="col-12 border-bottom border-info">
        <h6>Reported By:  {{bug.creatorEmail}}</h6>
      </div>
    </div>
    
    <div class="row">
      <div class="col-12 my-2 border border-info bg-secondary">
        <p>{{bug.description}}<i v-if="userIsCreator && !bug.closed" class="fas mr-2 mt-2 fa-edit pointer float-right" @click="editBugForm = !editBugForm"></i></p>
      </div>
      <div class="col-12 bg-info border border-warning" v-if="editBugForm">
        <form class="form-inline my-2" @submit.prevent="editBug">
          <div class="form-group">
            <input style="width: 60vw" type="text" name="" id="" class="form-control" placeholder="Edit Your Bug Report" aria-describedby="helpId" v-model="bug.description">
          </div>
          <button type="submit" class="ml-2 btn btn-warning"><i class="far fa-save mr-1"></i>   Save</button>
        </form>
      </div>
    </div>
    
    <div class="row border-bottom border-info">
      <div class="col-12 border-bottom border-info">
        <h5>Status: <span v-if='bug.closed == false' class="text-success">OPEN</span><span v-else class="text-danger">CLOSED</span></h5>
        <!--TODO LINK THE CLOSE BUTTON TO CHANGE THE CLOSED STATUS TO TRUE AND DO THE PUT REQUEST THRU THE STORE-->
        <button v-if="!bug.closed" class="btn btn-info float-right mb-2" @click="closeBug">CLOSE BUG</button>
      </div>
    </div>

    <div class="row mt-2 ">
      <div class="col-12">
        <h3>Notes:</h3>
      </div>
      <div class="col-12">
        <button type="button" class="btn btn-info my-2" @click="noteForm = true">ADD NOTE</button>
      </div>
    </div>
    <div class="row my-2" v-if="noteForm">
      <form class="form-inline" @submit.prevent="createNote">
        <div class="form-group">
          <input type="text" name="content" id="content" class="form-control" placeholder="New Note..." aria-describedby="helpId" v-model="newNote.content">
        </div>
        <button type="submit" class="mx-2 btn btn-success">Submit</button>
        <button type="button" class="mx-2 btn btn-danger" @click="noteForm = false">Cancel</button>
      </form>
    </div>

  <div class="row mt-2 border-bottom border-info bg-light" v-if="notes.length > 0">
    <div id="bug-title" class="col-4 col-md-3 border text-left py-1"><b>NAME</b></div>
    <div id="bug-creator" class="col-6 col-md-7 border text-left py-1"><b>MESSAGE</b></div>
    <div id="bug-date" class="col-2 border text-center py-1"><b>EDIT / DELETE</b></div>
  </div>
  
  <NotesComponent v-for="note in notes" :key="note.id" :noteProp="note"/>






  </div> <!--NOTE end of container-->
</template>

<script>
import NotesComponent from "../components/NotesComponent";
export default {
  name: "Bug",
  data(){
    return{
      newNote: {
        bugId: this.$route.params.bugId,
      },
      noteForm : false,
      editNoteForm: false,
      editBugForm: false,
    }
  },
  computed: {
    bug(){
      return this.$store.state.activeBug;
    },
    notes(){
      return this.$store.state.notes
    },
    userIsCreator(){
      return this.$store.state.profile.email == this.bug.creatorEmail
    },
  },
  methods:{
    createNote(){
      this.$store.dispatch("createNote", this.newNote);
      this.newNote = {bugId: this.$route.params.bugId,};
    },
    closeBug(){
      // console.log(this.bug)
      let close = confirm("Are You Sure You Want To Close This Bug?")
      if(close == true){
        this.bug.closed = true;
        this.$store.dispatch("editBug", this.bug)
      }
      return
      // console.log(this.bug)
    },
    editBug(){
      this.$store.dispatch("editBug", this.bug);
      this.editBugForm = false;
    }
  },
  mounted(){
    this.$store.dispatch("getBugById", this.$route.params.bugId);
    this.$store.dispatch("getNotesByBugId", this.$route.params.bugId);
  },
  props: ["bugId"],
  components: {
    NotesComponent
  },
}
</script>