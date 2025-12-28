import { validateSQL, sanitizeSQL } from '../utils/sanitizeSQL.js';
import { executeQuery } from '../services/postgres.service.js';

export const executeQueryController = async (req, res) => {
  try {
    const { sql } = req.body;
    const userId = req.userId || req.headers['user-id'] || 'default';

    if (!sql || typeof sql !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'SQL query is required'
      });
    }

    const validation = validateSQL(sql);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
        query: sql
      });
    }

    const sanitizedSQL = sanitizeSQL(sql);

    const result = await executeQuery(userId, sanitizedSQL);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error,
        query: sanitizedSQL
      });
    }

    res.json({
      success: true,
      data: {
        rows: result.rows,
        rowCount: result.rowCount,
        columns: result.columns
      },
      query: sanitizedSQL
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to execute query'
    });
  }
};
