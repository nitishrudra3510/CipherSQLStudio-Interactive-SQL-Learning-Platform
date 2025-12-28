import pg from 'pg';
import dotenv from 'dotenv';
import { getWorkspaceSchema } from '../utils/schemaManager.js';

dotenv.config();

const { Pool } = pg;

export const postgresPool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export const executeQuery = async (userId, sql) => {
  const client = await postgresPool.connect();

  try {
    const schemaName = await getWorkspaceSchema(userId);

    await client.query(`SET search_path TO ${schemaName}`);

    const result = await client.query(sql);

    return {
      success: true,
      rows: result.rows,
      rowCount: result.rowCount,
      columns: result.fields?.map(field => ({
        name: field.name,
        dataType: field.dataTypeID
      })) || []
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      rows: [],
      rowCount: 0,
      columns: []
    };
  } finally {
    client.release();
  }
};

export const testConnection = async () => {
  try {
    const client = await postgresPool.connect();
    await client.query('SELECT NOW()');
    client.release();
    return true;
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    return false;
  }
};
