import express from 'express';
import {createInventory, getInventory, getInventoryUser, addCard, recupLastCard} from '../controllers/inventorycontroller.js';

const router = express.Router();

router.post('/create', createInventory);
router.get('/get', getInventory);
router.get('/getuser', getInventoryUser);
router.post('/addcard', addCard);
router.get('/recuplastcard', recupLastCard);

export default router;