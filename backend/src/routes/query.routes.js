import express from 'express';
import { executeQueryController } from '../controllers/query.controller.js';

const router = express.Router();

router.post('/execute', executeQueryController);

export default router;
