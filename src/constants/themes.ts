const lightTheme = {
  colors: {
    // Brand
    primary: '#1e4ed8',
    primaryDark: '#1a3fa8',
    primary600: '#2556dd',
    primaryTint: '#eef3ff',
    primaryTint2: '#dbe5ff',
    // Semantic
    success: '#16a34a',
    successTint: '#dcfce7',
    warning: '#f59e0b',
    warningTint: '#fef3c7',
    error: '#dc2626',
    errorTint: '#fee2e2',
    // Surface & text
    surface: '#ffffff',
    background: '#f6f8fb',
    text: '#0f172a',
    text2: '#334155',
    muted: '#64748b',
    border: '#e6ebf2',
    border2: '#eef2f7',
  },
  notificationBell: {
    width: 39,
    height: 39,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    sm: 10,
    md: 16,
    lg: 22,
    full: 999,
  },
  shadow: {
    sm: {
      shadowColor: '#0f172a',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#1e4ed8',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 14,
      elevation: 4,
    },
    lg: {
      shadowColor: '#1e4ed8',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 32,
      elevation: 10,
    },
  },
  typography: {
    h1: 28,
    h2: 22,
    h3: 18,
    body: 15,
    caption: 13,
  },
  borderWidth: {
    thin: 1,
  },
  fontWeight: {
    light: '300' as const,
    regular: '500' as const,
    bold: '700' as const,
  },
  avatar: {
    width: 44,
    height: 44,
  },
  backButton: {
    width: 40,
    height: 40,
  },
};

export const themes = {
  light: lightTheme,
};

export type AppThemes = typeof themes;
