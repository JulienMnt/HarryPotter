import express from 'express';

import auth from './routes/authroute.js';
import user from './routes/userroute.js';
import inventory from './routes/inventoryroute.js';

const router = express.Router();

router.use('/user', user);
router.use('/auth', auth);
router.use('/inventory', inventory);

export default router;