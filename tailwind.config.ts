import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // ⚡ CHOOSE YOUR COLOR SCHEME HERE ⚡
        
        // Option 1: Modern Luxury (Current)
        primary: {
          DEFAULT: '#1a365d', // Deep Navy Blue
          light: '#2d4a8a',
          dark: '#0f1e3d',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#c9a96e', // Warm Gold
          light: '#d4b78a',
          dark: '#b89446',
          foreground: '#000000',
        },
        
        // Option 2: Elegant Earth Tones (Uncomment to use)
        /*
        primary: {
          DEFAULT: '#2c5530', // Forest Green
          light: '#3c7341',
          dark: '#1c371f',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#d4a96e', // Terracotta
          light: '#e3c49c',
          dark: '#c59450',
          foreground: '#000000',
        },
        */
        
        // Option 3: Sophisticated Neutral (Uncomment to use)
        /*
        primary: {
          DEFAULT: '#4a5568', // Charcoal Gray
          light: '#718096',
          dark: '#2d3748',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#cbd5e0', // Light Gray
          light: '#e2e8f0',
          dark: '#a0aec0',
          foreground: '#000000',
        },
        */
        
        // Tailwind default colors (keep these)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // ... rest of your config
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config