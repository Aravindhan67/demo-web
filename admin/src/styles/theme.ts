import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#f8fafc',
  text: '#0f172a',
  textLight: '#64748b',
  cardBg: '#ffffff',
  cardBorder: '#e2e8f0',
  sidebarBg: '#ffffff',
  sidebarActiveBg: '#f1f5f9',
  sidebarActiveText: '#0f172a',
  shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  glassBlur: 'none',
  primary: '#0f172a',
  primaryHover: '#334155',
  primaryText: '#ffffff',
  danger: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  borderColor: '#e2e8f0',
  inputBg: '#ffffff',
  scrollTrack: '#f8fafc',
  scrollThumb: '#cbd5e1'
};

export const darkTheme = {
  body: '#09090b',
  text: '#fafafa',
  textLight: '#a1a1aa',
  cardBg: '#18181b',
  cardBorder: '#27272a',
  sidebarBg: '#09090b',
  sidebarActiveBg: '#27272a',
  sidebarActiveText: '#fafafa',
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
  glassBlur: 'none',
  primary: '#fafafa',
  primaryHover: '#e4e4e7',
  primaryText: '#09090b',
  danger: '#ef4444',
  success: '#10b981',
  warning: '#fbbf24',
  borderColor: '#27272a',
  inputBg: '#18181b',
  scrollTrack: '#09090b',
  scrollThumb: '#3f3f46'
};

export const GlobalStyles = createGlobalStyle<{ theme?: typeof lightTheme | typeof darkTheme }>`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease, color 0.2s ease;
    overflow-x: hidden;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollTrack};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollThumb};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.textLight};
  }

  /* Smooth fading animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animated-fade {
    animation: fadeIn 0.3s ease forwards;
  }
`;
