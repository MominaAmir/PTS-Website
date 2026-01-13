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
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // ✅ ACTIVE COLOR SCHEME - Modern Luxury
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
        
        // ALTERNATE SCHEMES (Comment out above and uncomment one below)
        
        // Elegant Earth Tones:
        // primary: { DEFAULT: '#2c5530', light: '#3c7341', dark: '#1c371f', foreground: '#ffffff' },
        // secondary: { DEFAULT: '#d4a96e', light: '#e3c49c', dark: '#c59450', foreground: '#000000' },
        
        // Sophisticated Neutral:
        // primary: { DEFAULT: '#4a5568', light: '#718096', dark: '#2d3748', foreground: '#ffffff' },
        // secondary: { DEFAULT: '#cbd5e0', light: '#e2e8f0', dark: '#a0aec0', foreground: '#000000' },
        
        // Default Tailwind colors (unchanged)
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
        
        // ✅ Added useful utility colors
        success: "#10b981",
        warning: "#f59e0b",
        info: "#3b82f6",
        error: "#ef4444",
      },
      
      // ✅ Practical animations for common UI patterns
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      // ✅ Useful box shadows
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 20px -3px rgba(0, 0, 0, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.04)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      
      // ✅ Extended spacing scale for more flexibility
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
      },
      
      // ✅ Better typography defaults
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      
      // ✅ Responsive borderRadius
      borderRadius: {
        '4xl': '2rem',
      },
      
      // ✅ Additional screen sizes
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      
      // ✅ Z-index scale for better management
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal': '1050',
        'popover': '1070',
        'tooltip': '1080',
      },
      
      // ✅ Transition properties for smooth animations
      transitionProperty: {
        'height': 'height',
        'width': 'width',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config