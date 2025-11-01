import { Router } from 'express';
import {
  createSession,
  deleteAllSessions,
  deleteLastSession,
} from '../controllers/session.controller.js';

export const sessionRouter = Router();

sessionRouter.route('/create').post(createSession);
sessionRouter.route('/delete-single').delete(deleteLastSession);
sessionRouter.route('/delete-all').delete(deleteAllSessions);
