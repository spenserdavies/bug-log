import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";
import { STATES } from "mongoose";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    notes: [],
    activeNotes: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, data){
      state.bugs = data;
    },
    setActiveBug(state, data){
      state.activeBug = data;
    },
    setNotes(state, data){
      state.notes = data;
    },
    deleteNote(state, id){
      state.notes = state.notes.filter(n => n.id != id)
    },
    sortStatus(state){
       state.bugs = state.bugs.sort(function(a,b){
        let bug1 = a.closed,
            bug2 = b.closed;
        if(bug1 < bug2) return -1;
        if(bug2 < bug1) return 1;
        return 0;
      });
    },
    sortDate(state){
      state.bugs = state.bugs.sort(function(a, b) {
        var date1 = new Date(a.updatedAt),
            date2 = new Date(b.updatedAt);
        if (date1 > date2) return -1;
        if (date1 < date2) return 1;
        return 0;
      })
    }
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    sortStatus({commit, dispatch}){
      commit("sortStatus")
      // dispatch("getBugs") I GUESS THIS BREAKS IT
    },
    sortDate({commit, dispatch}){
      commit("sortDate")
      // dispatch("getBugs") SO DOES THIS LOL
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugs({commit, dispatch}){
      try {
        let res = await api.get('bugs')
        commit("setBugs", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getBugById({commit, dispatch}, id){
      try {
        let res = await api.get('bugs/' + id)
        commit("setActiveBug", res.data);
      } catch (error) {
        console.error(error)
      }
    },
    async createBug({commit, dispatch}, newBug) {
      try {
        console.log(newBug)
        let res = await api.post('bugs', newBug);
        dispatch("getBugs");
        router.push({ name: "bug", params: { bugId: res.data._id } });
      } catch (error) {
        console.error(error)
      }
    },
    async editBug({commit, dispatch}, editedBug){
      try {
        let res = await api.put("bugs/" + editedBug.id, editedBug);
      } catch (error) {
        console.error(error)
      }
    },
    
    // N O T E S N O T E S N O T E S N O T E S N O T E S N O T E S N O T E S N O T E S
    
    async createNote({commit,dispatch}, newNote){
      try {
        let res = await api.post('notes', newNote);
        dispatch("getNotesByBugId", newNote.bugId)
      } catch (error) {
        console.error(error)
      }
    },
    async getNotesByBugId({commit,dispatch}, bugId){
      try {
        let res = await api.get('bugs/' + bugId + '/notes')
        commit("setNotes", res.data)
      } catch (error) {
        console.error(error)        
      }
    },
    async editNote({commit, dispatch}, editedNote){
      try {
        let res = await api.put('notes/' + editedNote.id, editedNote);
        dispatch("getNotesByBugId", editedNote.bugId)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteNote({commit,dispatch}, note){
      try {
        let res = await api.delete("notes/" + note.id)
        commit("deleteNote", res.data)
        dispatch("getNotesByBugId", note.bugId)
      } catch (error) {
        console.error(error)
      }
    },
  }
});
