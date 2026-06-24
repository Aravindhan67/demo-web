import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    text: string;
    textLight: string;
    cardBg: string;
    cardBorder: string;
    sidebarBg: string;
    sidebarActiveBg: string;
    sidebarActiveText: string;
    shadow: string;
    glassBlur: string;
    primary: string;
    primaryHover: string;
    danger: string;
    success: string;
    warning: string;
    borderColor: string;
    inputBg: string;
    scrollTrack: string;
    scrollThumb: string;
  }
}
