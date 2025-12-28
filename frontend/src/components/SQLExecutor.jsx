import React, { useState } from 'react';
import axios from 'axios';
import { colors, spacing, shadows, borderRadius, commonStyles } from '../styles';

const SQLExecutor = ({ onResult, assignmentId, onSQLChange }) => {
  const [sql, setSql] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState(null);

  const handleExecute = async () => {
    if (!sql.trim()) {
      setError('Please enter a SQL query');
      return;
    }

    setIsExecuting(true);
    setError(null);

    try {
      const response = await axios.post('/api/query/execute', {
        sql: sql.trim()
      });

      if (response.data.success) {
        onResult(response.data.data);
        setError(null);
      } else {
        setError(response.data.error || 'Query execution failed');
        onResult(null);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || 'Failed to execute query';
      setError(errorMessage);
      onResult(null);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleClear = () => {
    setSql('');
    setError(null);
    onResult(null);
  };

  const containerStyle = {
    ...commonStyles.card,
    marginBottom: spacing.lg,
  };

  const headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  };

  const titleStyle = {
    margin: 0,
    fontSize: '20px',
    fontWeight: 600,
  };

  const actionsStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing.sm,
  };

  const textareaStyle = {
    ...commonStyles.input,
    minHeight: '200px',
    fontFamily: "'Courier New', Courier, monospace",
    resize: 'vertical',
    marginBottom: spacing.md,
  };

  const errorStyle = {
    backgroundColor: `rgba(239, 68, 68, 0.1)`,
    border: `1px solid ${colors.error}`,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.error,
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>SQL Editor</h3>
        <div style={actionsStyle}>
          <button
            style={{
              ...commonStyles.button(colors.secondary),
              opacity: isExecuting ? 0.6 : 1,
              cursor: isExecuting ? 'not-allowed' : 'pointer',
            }}
            onClick={handleClear}
            disabled={isExecuting}
          >
            Clear
          </button>
          <button
            style={{
              ...commonStyles.button(colors.primary),
              opacity: (isExecuting || !sql.trim()) ? 0.6 : 1,
              cursor: (isExecuting || !sql.trim()) ? 'not-allowed' : 'pointer',
            }}
            onClick={handleExecute}
            disabled={isExecuting || !sql.trim()}
          >
            {isExecuting ? 'Executing...' : 'Execute Query'}
          </button>
        </div>
      </div>
      <textarea
        style={textareaStyle}
        value={sql}
        onChange={(e) => {
          setSql(e.target.value);
          if (onSQLChange) {
            onSQLChange(e.target.value);
          }
        }}
        placeholder="Write your SQL query here..."
        disabled={isExecuting}
      />
      {error && (
        <div style={errorStyle}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default SQLExecutor;
