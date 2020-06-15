import express from 'express';
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider"
// @ts-ignore
import { bugsService } from "../services/BugsService";
import { notesService } from "../services/NotesService";
import { dbContext } from "../db/DbContext";
// @ts-ignore
// import { notesService } from "../services/NotesService";


//PUBLIC
export class BugsController extends BaseController{
  constructor(){
    super("api/bugs")
    this.router
    .get('', this.getAll)
    .use(auth0provider.getAuthorizedUserInfo)
    .get('/:id', this.getById)
      .get('/:id/notes', this.getNotesByBugId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next){
    try {
      let data = await bugsService.getAll()
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  
  async getById(req, res, next){
    try {
      let data = await bugsService.getById(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next){
    try {
      let data = await notesService.getNotesByBugId(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }

  }

  async create(req, res, next){
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await bugsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next){
    try {
      let data = await bugsService.editBug(req.params.id, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next){
    try {
      let data = await bugsService.deleteBug(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}