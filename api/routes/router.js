import { Router } from 'express';
import db from '../db/db.js';
import * as controller from './../controller/controller.js';

const router = Router();

router.get('/', controller.getAllGames);
router.get('/courts/:sport', controller.getGamesBySport);
router.get('/games/:gameId', controller.getGameById);
// router.get('/new', (_req, res) => {

//     res.render('new_entry_form', { title: 'New Submission Form' });
// });

router.get('/courts/', controller.getAllgames);

//router.post("/new", createGame);
  




export default router