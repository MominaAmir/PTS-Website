// Color schemes for easy switching
export const colorSchemes = {
  modernLuxury: {
    primary: '#1a365d',
    primaryLight: '#2d4a8a',
    primaryDark: '#0f1e3d',
    secondary: '#c9a96e',
    secondaryLight: '#d4b78a',
    secondaryDark: '#b89446',
  },
  elegantEarth: {
    primary: '#2c5530',
    primaryLight: '#3c7341',
    primaryDark: '#1c371f',
    secondary: '#d4a96e',
    secondaryLight: '#e3c49c',
    secondaryDark: '#c59450',
  },
  sophisticatedNeutral: {
    primary: '#4a5568',
    primaryLight: '#718096',
    primaryDark: '#2d3748',
    secondary: '#cbd5e0',
    secondaryLight: '#e2e8f0',
    secondaryDark: '#a0aec0',
  },
  warmMinimalist: {
    primary: '#7c3aed',
    primaryLight: '#8b5cf6',
    primaryDark: '#5b21b6',
    secondary: '#f59e0b',
    secondaryLight: '#fbbf24',
    secondaryDark: '#d97706',
  },
  coastalInspired: {
    primary: '#0e7490',
    primaryLight: '#0891b2',
    primaryDark: '#155e75',
    secondary: '#fbbf24',
    secondaryLight: '#fcd34d',
    secondaryDark: '#f59e0b',
  },
}

// Current active scheme (change this to switch)
export const currentScheme = colorSchemes.modernLuxury

// Helper function to get CSS variables
export function getColorVariables(scheme: keyof typeof colorSchemes = 'modernLuxury') {
  return colorSchemes[scheme]
}