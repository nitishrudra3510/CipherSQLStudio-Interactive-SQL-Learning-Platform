import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Assignment from './pages/Assignment';
import { colors, spacing, typography, shadows, borderRadius } from './styles';

function App() {
  const appStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizeBase,
    color: colors.textPrimary,
    backgroundColor: colors.bgSecondary,
    lineHeight: 1.6,
  };

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const headerStyle = {
    background: colors.bgPrimary,
    borderBottom: `1px solid ${colors.border}`,
    padding: isMobile ? spacing.md : `${spacing.lg} ${spacing.xl}`,
    boxShadow: shadows.sm,
  };

  const headerTitleStyle = {
    marginBottom: spacing.xs,
    color: colors.primary,
    fontSize: typography.fontSizeXl3,
    fontWeight: 600,
    lineHeight: 1.2,
    margin: 0,
  };

  const headerSubtitleStyle = {
    color: colors.textSecondary,
    fontSize: typography.fontSizeSm,
    margin: 0,
  };

  const mainStyle = {
    flex: 1,
    padding: isMobile ? spacing.md : spacing.xl,
    maxWidth: '1400px',
    width: '100%',
    margin: '0 auto',
  };

  const footerStyle = {
    background: colors.bgPrimary,
    borderTop: `1px solid ${colors.border}`,
    padding: `${spacing.lg} ${spacing.xl}`,
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: typography.fontSizeSm,
    marginTop: 'auto',
  };

  return (
    <Router>
      <div style={appStyle}>
        <header style={headerStyle}>
          <h1 style={headerTitleStyle}>CipherSQLStudio</h1>
          <p style={headerSubtitleStyle}>Learn SQL by Practice</p>
        </header>
        <main style={mainStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assignment/:id" element={<Assignment />} />
          </Routes>
        </main>
        <footer style={footerStyle}>
          <p>&copy; 2024 CipherSQLStudio. Learn SQL with confidence.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
