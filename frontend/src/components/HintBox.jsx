import React, { useState } from 'react';
import axios from 'axios';
import { colors, spacing, borderRadius, commonStyles } from '../styles';

const HintBox = ({ assignmentId, userSQL }) => {
  const [hint, setHint] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetHint = async () => {
    if (!assignmentId) {
      setError('Assignment ID is required');
      return;
    }

    setIsLoading(true);
    setError(null);
    setHint(null);

    try {
      const response = await axios.post('/api/hint/generate', {
        assignmentId,
        userSQL: userSQL || ''
      });

      if (response.data.success) {
        setHint(response.data.data.hint);
        setError(null);
      } else {
        setError(response.data.error || 'Failed to generate hint');
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || 'Failed to generate hint';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = {
    ...commonStyles.card,
    marginBottom: spacing.lg,
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    border: `1px solid ${colors.warning}`,
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
    color: colors.textPrimary,
    fontSize: '20px',
    fontWeight: 600,
  };

  const hintContentStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderLeft: `4px solid ${colors.warning}`,
  };

  const hintTextStyle = {
    margin: 0,
    color: colors.textPrimary,
    lineHeight: 1.6,
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
        <h3 style={titleStyle}>💡 Need Help?</h3>
        <button
          style={{
            ...commonStyles.button(colors.warning),
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
          onClick={handleGetHint}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Get Hint'}
        </button>
      </div>
      {hint && (
        <div style={hintContentStyle}>
          <p style={hintTextStyle}>{hint}</p>
        </div>
      )}
      {error && (
        <div style={errorStyle}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default HintBox;
