import express from 'express';
import {getUser} from '../controllers/usercontroller.js';

const router = express.Router();

router.get('/', getUser);

export default router;