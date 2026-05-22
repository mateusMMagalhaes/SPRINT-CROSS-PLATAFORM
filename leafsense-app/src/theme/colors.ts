// LeafSense Design Tokens — Tema escuro profissional

export const colors = {
  // Backgrounds
  background: '#0A1628',
  surface: '#112240',
  surfaceLight: '#1A3158',
  surfaceHover: '#1E3A6A',

  // Primary — verde (vegetação)
  primary: '#00C896',
  primaryDark: '#00A87D',
  primaryLight: '#33D4AB',
  primaryGlow: 'rgba(0, 200, 150, 0.15)',

  // Status
  success: '#00C896',
  warning: '#F5A623',
  warningLight: 'rgba(245, 166, 35, 0.15)',
  danger: '#E74C3C',
  dangerLight: 'rgba(231, 76, 60, 0.15)',
  successLight: 'rgba(0, 200, 150, 0.15)',

  // Text
  textPrimary: '#E8F4FD',
  textSecondary: '#8BA7C7',
  textMuted: '#5A7A9A',

  // Borders
  border: '#1E3A6A',
  borderLight: '#2A4A7A',

  // Gradients
  gradientStart: '#0A1628',
  gradientEnd: '#112240',
  headerGradientStart: '#00C896',
  headerGradientEnd: '#00A87D',
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  button: {
    shadowColor: '#00C896',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
