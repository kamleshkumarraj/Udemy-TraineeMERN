import {Router} from 'express'
import { getMyProfile } from '../controllers/profile.controller.js';

export const userProfileRouter = Router();

userProfileRouter.route('/my-profile').get(getMyProfile)