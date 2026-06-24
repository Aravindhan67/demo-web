import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#f4f6fc',
  text: '#1e293b',
  textLight: '#64748b',
  cardBg: 'rgba(255, 255, 255, 0.75)',
  cardBorder: 'rgba(255, 255, 255, 0.5)',
  sidebarBg: 'rgba(255, 255, 255, 0.8)',
  sidebarActiveBg: 'rgba(59, 130, 246, 0.15)',
  sidebarActiveText: '#2563eb',
  shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
  glassBlur: 'blur(16px)',
  primary: '#2563eb',
  primaryHover: '#1d4ed8',
  danger: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  borderColor: 'rgba(226, 232, 240, 0.8)',
  inputBg: '#ffffff',
  scrollTrack: '#f1f5f9',
  scrollThumb: '#cbd5e1'
};

export const darkTheme = {
  body: '#0b111e',
  text: '#f8fafc',
  textLight: '#94a3b8',
  cardBg: 'rgba(15, 23, 42, 0.65)',
  cardBorder: 'rgba(255, 255, 255, 0.05)',
  sidebarBg: 'rgba(15, 23, 42, 0.8)',
  sidebarActiveBg: 'rgba(59, 130, 246, 0.25)',
  sidebarActiveText: '#60a5fa',
  shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
  glassBlur: 'blur(16px)',
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  danger: '#f87171',
  success: '#34d399',
  warning: '#fbbf24',
  borderColor: 'rgba(255, 255, 255, 0.08)',
  inputBg: 'rgba(30, 41, 59, 0.5)',
  scrollTrack: '#1e293b',
  scrollThumb: '#475569'
};

export const GlobalStyles = createGlobalStyle<{ theme?: typeof lightTheme | typeof darkTheme }>`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollTrack};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollThumb};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary};
  }

  /* Smooth fading animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animated-fade {
    animation: fadeIn 0.4s ease forwards;
  }
`;
