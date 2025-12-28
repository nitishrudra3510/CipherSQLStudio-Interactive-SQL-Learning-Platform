import express from 'express';
import {
  getAllAssignmentsController,
  getAssignmentController,
  initializeAssignmentController
} from '../controllers/assignment.controller.js';

const router = express.Router();

router.get('/', getAllAssignmentsController);

router.get('/:id', getAssignmentController);

router.post('/initialize', initializeAssignmentController);

export default router;
