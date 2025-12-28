import { postgresPool } from '../services/postgres.service.js';

export const getWorkspaceSchema = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const schemaName = `workspace_${userId.replace(/[^a-zA-Z0-9_]/g, '_')}`;

  try {
    const checkQuery = `
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = $1
    `;

    const client = await postgresPool.connect();
    try {
      const result = await client.query(checkQuery, [schemaName]);

      if (result.rows.length === 0) {
        await client.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
      }

      return schemaName;
    } finally {
      client.release();
    }
  } catch (error) {
    throw new Error(`Failed to get workspace schema: ${error.message}`);
  }
};

export const setWorkspaceSchema = async (userId) => {
  const schemaName = await getWorkspaceSchema(userId);
  const client = await postgresPool.connect();

  try {
    await client.query(`SET search_path TO ${schemaName}`);
  } finally {
    client.release();
  }
};

export const createSampleTables = async (userId, tables) => {
  if (!tables || !Array.isArray(tables)) {
    return;
  }

  const schemaName = await getWorkspaceSchema(userId);
  const client = await postgresPool.connect();

  try {
    await client.query(`SET search_path TO ${schemaName}`);

    for (const table of tables) {
      if (!table.name || !table.schema) {
        continue;
      }

      await client.query(`DROP TABLE IF EXISTS ${table.name} CASCADE`);

      await client.query(`CREATE TABLE ${table.name} (${table.schema})`);

      if (table.sampleData && Array.isArray(table.sampleData) && table.sampleData.length > 0) {
        const columns = Object.keys(table.sampleData[0]);
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
        const columnNames = columns.join(', ');

        for (const row of table.sampleData) {
          const values = columns.map(col => row[col]);
          await client.query(
            `INSERT INTO ${table.name} (${columnNames}) VALUES (${placeholders})`,
            values
          );
        }
      }
    }
  } finally {
    client.release();
  }
};
