import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService{

  async getAll(){
    let data = await dbContext.Bugs.find().populate("creator", "name picture")
    console.log("data from getAll: ")
    console.log(data)
    return data;
  }

  async getById(id){
    let data = await dbContext.Bugs.findOne({_id: id})
    if(!data){
      throw new BadRequest("Invalid Id")
    }
    console.log("Data from getById: ")
    console.log(data)
    return data;
  }





  async create(newBug) {
    let data = await dbContext.Bugs.create(newBug)
    return data;
  }

  async editBug(bugId, editedBug){
    let data = await dbContext.Bugs.findOneAndUpdate({_id: bugId}, editedBug, {new: true})
    if(!data){
      throw new BadRequest("Invalid Id")
    }
    return data;
  }

  async deleteBug(bugId){
    let data = await dbContext.Bugs.findByIdAndDelete({_id: bugId})
    if(!data){
      throw new BadRequest("Invalid Id")
    }
  }
}

export const bugsService = new BugsService();