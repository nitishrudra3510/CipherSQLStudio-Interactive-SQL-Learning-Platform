import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, shadows, borderRadius, commonStyles } from '../styles';

const AssignmentCard = ({ assignment }) => {
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate(`/assignment/${assignment.id}`);
  };

  const cardStyle = {
    ...commonStyles.card,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const cardHoverStyle = {
    ...cardStyle,
    transform: 'translateY(-2px)',
    boxShadow: shadows.lg,
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  };

  const titleStyle = {
    margin: 0,
    flex: 1,
    fontSize: '20px',
    fontWeight: 600,
  };

  const badgeStyle = {
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: borderRadius.md,
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    backgroundColor: getDifficultyColor(assignment.difficulty),
  };

  const descriptionStyle = {
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 1.6,
  };

  const footerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  };

  const buttonStyle = {
    ...commonStyles.button(colors.primary),
  };

  return (
    <div
      style={isHovered ? cardHoverStyle : cardStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={headerStyle}>
        <h3 style={titleStyle}>{assignment.title || 'Untitled Assignment'}</h3>
        <span style={badgeStyle}>
          {assignment.difficulty || 'N/A'}
        </span>
      </div>
      <p style={descriptionStyle}>
        {assignment.description || 'No description available'}
      </p>
      <div style={footerStyle}>
        <button style={buttonStyle}>Start Assignment</button>
      </div>
    </div>
  );
};

export default AssignmentCard;
