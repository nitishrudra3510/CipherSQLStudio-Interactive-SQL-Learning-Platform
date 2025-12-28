import { generateHint } from '../services/llm.service.js';
import { getAssignment } from '../services/mongo.service.js';

export const generateHintController = async (req, res) => {
  try {
    const { assignmentId, userSQL } = req.body;

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

    const hint = await generateHint(assignment.question, userSQL || '');

    res.json({
      success: true,
      data: {
        hint
      }
    });
  } catch (error) {
    console.error('Error generating hint:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate hint'
    });
  }
};
