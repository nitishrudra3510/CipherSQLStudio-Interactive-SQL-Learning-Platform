import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SQLExecutor from '../components/SQLExecutor';
import ResultTable from '../components/ResultTable';
import HintBox from '../components/HintBox';
import { colors, spacing, typography, borderRadius, commonStyles } from '../styles';

const Assignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [userSQL, setUserSQL] = useState('');
  const [initialized, setInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/assignments/${id}`);
      if (response.data.success) {
        setAssignment(response.data.data);
        setError(null);
        initializeWorkspace(response.data.data);
      } else {
        setError('Assignment not found');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load assignment');
      console.error('Error fetching assignment:', err);
    } finally {
      setLoading(false);
    }
  };

  const initializeWorkspace = async (assignmentData) => {
    try {
      await axios.post('/api/assignments/initialize', {
        assignmentId: id
      });
      setInitialized(true);
    } catch (err) {
      console.error('Error initializing workspace:', err);
      setInitialized(true);
    }
  };

  const handleResult = (queryResult) => {
    setResult(queryResult);
  };

  const handleSQLChange = (sql) => {
    setUserSQL(sql);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return colors.success;
      case 'medium':
        return colors.warning;
      case 'hard':
        return colors.error;
      default:
        return colors.secondary;
    }
  };

  const pageStyle = {
    width: '100%',
  };

  const headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  };

  const headerContentStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  };

  const titleStyle = {
    margin: 0,
    fontSize: typography.fontSizeXl2,
    fontWeight: 600,
  };

  const badgeStyle = {
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: borderRadius.md,
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    backgroundColor: assignment ? getDifficultyColor(assignment.difficulty) : colors.secondary,
  };

  const contentStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: spacing.xl,
  };

  const infoSectionStyle = {
    ...commonStyles.card,
    marginBottom: spacing.lg,
  };

  const sectionTitleStyle = {
    marginBottom: spacing.md,
    color: colors.primary,
    fontSize: typography.fontSizeXl,
    fontWeight: 600,
  };

  const sectionTextStyle = {
    color: colors.textPrimary,
    lineHeight: 1.6,
    marginBottom: spacing.md,
  };

  const sampleTableStyle = {
    marginBottom: spacing.md,
    padding: spacing.md,
    background: colors.bgTertiary,
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.border}`,
  };

  const preStyle = {
    background: colors.bgPrimary,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    fontSize: '14px',
    overflowX: 'auto',
    fontFamily: "'Courier New', Courier, monospace",
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: spacing.xl2,
    color: colors.textSecondary,
  };

  const errorStyle = {
    textAlign: 'center',
    padding: spacing.xl2,
    color: colors.textSecondary,
  };

  const buttonStyle = {
    ...commonStyles.button(colors.primary),
    marginTop: spacing.md,
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <p>Loading assignment...</p>
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div style={errorStyle}>
        <p>Error: {error || 'Assignment not found'}</p>
        <button style={buttonStyle} onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <button
          style={commonStyles.button(colors.secondary)}
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
        <div style={headerContentStyle}>
          <h2 style={titleStyle}>{assignment.title}</h2>
          <span style={badgeStyle}>
            {assignment.difficulty}
          </span>
        </div>
      </div>

      <div style={contentStyle}>
        <div>
          <div style={infoSectionStyle}>
            <h3 style={sectionTitleStyle}>Description</h3>
            <p style={sectionTextStyle}>{assignment.description}</p>
          </div>

          <div style={infoSectionStyle}>
            <h3 style={sectionTitleStyle}>Question</h3>
            <p style={sectionTextStyle}>{assignment.question}</p>
          </div>

          {assignment.sampleTables && assignment.sampleTables.length > 0 && (
            <div style={infoSectionStyle}>
              <h3 style={sectionTitleStyle}>Sample Tables</h3>
              <div>
                {assignment.sampleTables.map((table, index) => (
                  <div key={index} style={sampleTableStyle}>
                    <h4 style={{ marginBottom: spacing.sm, color: colors.textPrimary }}>
                      {table.name}
                    </h4>
                    <pre style={preStyle}>{table.schema}</pre>
                    {table.sampleData && table.sampleData.length > 0 && (
                      <div style={{ marginTop: spacing.md }}>
                        <p style={{ fontWeight: 600, marginBottom: spacing.sm }}>
                          Sample Data:
                        </p>
                        <pre style={preStyle}>
                          {JSON.stringify(table.sampleData, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <SQLExecutor
            onResult={handleResult}
            assignmentId={id}
            onSQLChange={handleSQLChange}
          />
          <HintBox assignmentId={id} userSQL={userSQL} />
          <ResultTable result={result} />
        </div>
      </div>
    </div>
  );
};

export default Assignment;
