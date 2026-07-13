import React, { createContext, useContext, type ReactNode } from 'react';

export const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  background: '#f5f5f5',
  card: '#ffffff',
  text: '#1c1c1e',
  subtext: '#8e8e93',
  border: '#e5e5ea',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const typography = {
  headline: { fontSize: 28, fontWeight: '700' as const },
  title: { fontSize: 22, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 14, fontWeight: '400' as const },
};

const ThemeContext = createContext({ colors, spacing, typography });

export const ThemeProvider = ({ children }: { children: ReactNode }) =>
  React.createElement(ThemeContext.Provider, { value: { colors, spacing, typography } }, children);

export const useTheme = () => useContext(ThemeContext);
