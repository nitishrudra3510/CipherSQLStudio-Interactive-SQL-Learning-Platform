import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const globalStyles = {
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  body: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '16px',
    color: '#1e293b',
    backgroundColor: '#f8fafc',
    lineHeight: 1.6,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = Object.entries(globalStyles)
  .map(([selector, styles]) => {
    const css = Object.entries(styles)
      .map(([prop, value]) => {
        const camelToKebab = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${camelToKebab}: ${value};`;
      })
      .join('\n');
    return `${selector} {\n${css}\n}`;
  })
  .join('\n\n');
document.head.appendChild(styleSheet);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
