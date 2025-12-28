const BLOCKED_KEYWORDS = [
  'INSERT',
  'UPDATE',
  'DELETE',
  'DROP',
  'ALTER',
  'TRUNCATE',
  'CREATE',
  'EXEC',
  'EXECUTE',
  'GRANT',
  'REVOKE',
  'COMMIT',
  'ROLLBACK'
];

export const validateSQL = (sql) => {
  if (!sql || typeof sql !== 'string') {
    return {
      isValid: false,
      error: 'SQL query is required and must be a string'
    };
  }

  const upperSQL = sql.trim().toUpperCase();

  for (const keyword of BLOCKED_KEYWORDS) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(sql)) {
      return {
        isValid: false,
        error: `Blocked command detected: ${keyword}. Only SELECT queries are allowed.`
      };
    }
  }

  const cleanedSQL = sql.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
  const upperCleaned = cleanedSQL.toUpperCase();

  if (!upperCleaned.startsWith('SELECT')) {
    return {
      isValid: false,
      error: 'Only SELECT queries are allowed. Query must start with SELECT.'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

export const sanitizeSQL = (sql) => {
  if (!sql || typeof sql !== 'string') {
    return '';
  }

  let sanitized = sql
    .replace(/--.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim();

  sanitized = sanitized.replace(/\s+/g, ' ');

  return sanitized;
};
