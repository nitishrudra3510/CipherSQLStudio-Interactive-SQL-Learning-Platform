export const colors = {
  primary: '#2563eb',
  primaryHover: '#1d4ed8',
  secondary: '#64748b',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  bgPrimary: '#ffffff',
  bgSecondary: '#f8fafc',
  bgTertiary: '#f1f5f9',
  textPrimary: '#1e293b',
  textSecondary: '#64748b',
  textLight: '#94a3b8',
  border: '#e2e8f0',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xl2: '48px',
};

export const typography = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSizeSm: '14px',
  fontSizeBase: '16px',
  fontSizeLg: '18px',
  fontSizeXl: '20px',
  fontSizeXl2: '24px',
  fontSizeXl3: '30px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
};

export const commonStyles = {
  button: (bgColor = colors.primary, textColor = '#ffffff') => ({
    backgroundColor: bgColor,
    color: textColor,
    border: 'none',
    borderRadius: borderRadius.md,
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: typography.fontSizeBase,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  }),
  card: {
    background: colors.bgPrimary,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.md,
    padding: spacing.lg,
    border: `1px solid ${colors.border}`,
  },
  input: {
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSizeBase,
    fontFamily: typography.fontFamily,
    transition: 'all 0.2s ease',
  },
};
