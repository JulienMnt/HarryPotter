import express from 'express';
import {onLight, postCard} from "../controllers/iotcontroller.js";

const router = express.Router();

router.get('/light', onLight);
router.post('/postcard', postCard);

export default router;
