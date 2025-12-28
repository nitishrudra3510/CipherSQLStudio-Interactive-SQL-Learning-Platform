import express from 'express';
import { generateHintController } from '../controllers/hint.controller.js';

const router = express.Router();

router.post('/generate', generateHintController);

export default router;
