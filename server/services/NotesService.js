import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService{
  async create(newNote) {
    let data = await dbContext.Notes.create(newNote)
    return data;
  }

  async getNotesByBugId(id){
    let data = await dbContext.Notes.find({bugId: id})
    if(!data){
      throw new BadRequest("Invalid ID");
    }
    return data;
  }

  async editNote(id, userEmail, editedNote){
    let data = await dbContext.Notes.findOneAndUpdate({_id: id, creatorEmail: userEmail}, editedNote, { new: true})
    if(!data){
      throw new BadRequest("Invalid ID or Not your Note")
    }
    return data;
  }

  async deleteNote(id,userEmail){
    let data = await dbContext.Notes.findOneAndDelete({_id: id, creatorEmail: userEmail})
    if(!data){
      throw new BadRequest("Invalid ID or Not your Note")
    }
  }




}


export const notesService = new NotesService();