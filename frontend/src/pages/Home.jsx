import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssignmentCard from '../components/AssignmentCard';
import { colors, spacing, typography, commonStyles } from '../styles';

const Home = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/assignments');
      if (response.data.success) {
        setAssignments(response.data.data);
        setError(null);
      } else {
        setError('Failed to load assignments');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load assignments');
      console.error('Error fetching assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    width: '100%',
  };

  const headerStyle = {
    marginBottom: spacing.xl,
    textAlign: 'center',
  };

  const titleStyle = {
    marginBottom: spacing.sm,
    fontSize: typography.fontSizeXl2,
    fontWeight: 600,
  };

  const subtitleStyle = {
    color: colors.textSecondary,
  };

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: spacing.lg,
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
        <p>Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={errorStyle}>
        <p>Error: {error}</p>
        <button style={buttonStyle} onClick={fetchAssignments}>Retry</button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>SQL Assignments</h2>
        <p style={subtitleStyle}>Practice SQL with hands-on assignments</p>
      </div>
      <div style={gridStyle}>
        {assignments.length === 0 ? (
          <div style={errorStyle}>
            <p>No assignments available. Check back later!</p>
          </div>
        ) : (
          assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
