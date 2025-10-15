import { Router } from 'express';
import db from '../db/db.js';
import * as controller from './../controller/controller.js';

const router = Router();


router.get('/courts/:sport', controller.getGamesBySport);
router.get('/games/:gameId', controller.getGameById);
router.get('/courts/', controller.getAllGames);

router.post('/new', controller.createGame);


export default router