import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Black & Gold Theme from new design
        black: '#0B0B0C',
        gold: {
          300: '#E8D49C',   // Lighter gold
          400: '#D4C082',   // Light gold
          500: '#C9A646',   // MTP Gold - Primary
          600: '#B2903E',   // Medium gold
        },
        muted: {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          600: '#3E3E40',
          900: '#1A1A1C',
        },
        // Primary Colors - MTP Gold Theme
        primary: {
          50: '#FDFCF8',    // Background white with gold tint
          100: '#FAF8F2',   // Near white with warm tint
          200: '#F5F1E5',   // Very light gold
          300: '#E8E0CC',   // Lighter gold
          400: '#D4C597',   // Light gold
          500: '#B6A054',   // MTP Gold - Primary brand color
          600: '#9F8A3F',   // Medium gold
          700: '#7A6A2E',   // Dark gold
          800: '#5C5023',   // Deep gold
          900: '#3D3518',   // Darkest gold
        },
        // Accent Colors - MTP Gold Variations
        accent: {
          100: '#FAF8F2',   // Light background
          400: '#C4B05C',   // Active state
          500: '#B6A054',   // Hover state (MTP Gold)
          600: '#9F8A3F',   // Primary CTA
        },
        // Secondary Colors - Dark charcoal for text
        secondary: {
          50: '#FAFAFA',    // Background white
          100: '#F5F5F5',   // Near white
          200: '#E5E5E5',   // Very light gray
          300: '#D4D4D4',   // Lighter gray
          400: '#A3A3A3',   // Light gray
          500: '#737373',   // Gray - Body text
          600: '#525252',   // Medium gray
          700: '#404040',   // Dark gray
          800: '#262626',   // Charcoal - Primary text
          900: '#171717',   // Deep Charcoal - Headers
        },
        // Semantic Colors
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        arabic: ['IBM Plex Arabic', 'Noto Sans Arabic', 'sans-serif'],
      },
      fontSize: {
        // Custom type scale
        'h1': ['3.75rem', { lineHeight: '1', fontWeight: '800', letterSpacing: '-0.025em' }],
        'h2': ['3rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.025em' }],
        'h3': ['2.25rem', { lineHeight: '1.25', fontWeight: '700' }],
        'h4': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h5': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h6': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
        'caption': ['0.75rem', { letterSpacing: '0.05em', fontWeight: '500' }],
        'overline': ['0.625rem', { letterSpacing: '0.1em', fontWeight: '600' }],
      },
      spacing: {
        // Custom spacing scale based on 4px unit
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
        '26': '6.5rem',  // 104px
        '30': '7.5rem',  // 120px
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        'sm': '0.125rem',   // 2px
        DEFAULT: '0.25rem', // 4px
        'md': '0.375rem',   // 6px
        'lg': '0.5rem',     // 8px
        'xl': '0.75rem',    // 12px
        '2xl': '1rem',      // 16px
        '3xl': '1.5rem',    // 24px
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '999': '999',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config