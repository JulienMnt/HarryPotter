import express from 'express';
import {onLight} from "../controllers/iotcontroller.js";

const router = express.Router();

router.get('/light', onLight);

export default router;
