import express from 'express';

import auth from './routes/authroute.js';
import user from './routes/userroute.js';

const router = express.Router();

router.use('/user', user);
router.use('/auth', auth);

export default router;