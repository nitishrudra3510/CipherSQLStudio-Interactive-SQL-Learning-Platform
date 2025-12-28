import React from 'react';
import { colors, spacing, borderRadius, commonStyles } from '../styles';

const ResultTable = ({ result }) => {
  if (!result || !result.rows || result.rows.length === 0) {
    const emptyStyle = {
      padding: spacing.xl,
      textAlign: 'center',
      color: colors.textSecondary,
    };

    return (
      <div style={emptyStyle}>
        <p>No results to display. Execute a query to see results.</p>
      </div>
    );
  }

  const columns = result.columns || Object.keys(result.rows[0] || {});

  const containerStyle = {
    ...commonStyles.card,
    marginTop: spacing.lg,
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

  const countStyle = {
    color: colors.textSecondary,
    fontSize: '14px',
  };

  const wrapperStyle = {
    overflowX: 'auto',
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.md,
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    background: colors.bgPrimary,
  };

  const thStyle = {
    padding: spacing.md,
    textAlign: 'left',
    fontWeight: 600,
    color: colors.textPrimary,
    borderBottom: `2px solid ${colors.border}`,
    backgroundColor: colors.bgTertiary,
  };

  const tdStyle = {
    padding: spacing.md,
    color: colors.textPrimary,
    borderBottom: `1px solid ${colors.border}`,
  };

  const trHoverStyle = {
    backgroundColor: colors.bgSecondary,
  };

  const nullValueStyle = {
    color: colors.textLight,
    fontStyle: 'italic',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>Query Results</h3>
        <span style={countStyle}>
          {result.rowCount || result.rows.length} row(s)
        </span>
      </div>
      <div style={wrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} style={thStyle}>
                  {typeof col === 'string' ? col : col.name || `Column ${index + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  ...tdStyle,
                  borderBottom: rowIndex === result.rows.length - 1 ? 'none' : `1px solid ${colors.border}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {columns.map((col, colIndex) => {
                  const colName = typeof col === 'string' ? col : col.name;
                  const value = row[colName] ?? row[colIndex] ?? '';
                  return (
                    <td key={colIndex} style={tdStyle}>
                      {value === null || value === undefined ? (
                        <span style={nullValueStyle}>NULL</span>
                      ) : (
                        String(value)
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
