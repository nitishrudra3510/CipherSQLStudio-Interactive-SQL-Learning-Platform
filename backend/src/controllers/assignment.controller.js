import { getAssignment, getAllAssignments } from '../services/mongo.service.js';
import { createSampleTables } from '../utils/schemaManager.js';

export const getAllAssignmentsController = async (req, res) => {
  try {
    const assignments = await getAllAssignments();
    res.json({
      success: true,
      data: assignments
    });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch assignments'
    });
  }
};

export const getAssignmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await getAssignment(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }

    res.json({
      success: true,
      data: assignment
    });
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch assignment'
    });
  }
};

export const initializeAssignmentController = async (req, res) => {
  try {
    const { assignmentId } = req.body;
    const userId = req.userId || req.headers['user-id'] || 'default';

    if (!assignmentId) {
      return res.status(400).json({
        success: false,
        error: 'Assignment ID is required'
      });
    }

    const assignment = await getAssignment(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }

    if (assignment.sampleTables && assignment.sampleTables.length > 0) {
      await createSampleTables(userId, assignment.sampleTables);
    }

    res.json({
      success: true,
      message: 'Workspace initialized successfully'
    });
  } catch (error) {
    console.error('Error initializing assignment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initialize assignment workspace'
    });
  }
};
