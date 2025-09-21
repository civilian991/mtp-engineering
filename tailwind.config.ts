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
        // Primary Colors - Engineering Navy/Slate
        primary: {
          50: '#F8FAFC',    // Background white
          100: '#F1F5F9',   // Near white
          200: '#E2E8F0',   // Very light slate
          300: '#CBD5E1',   // Lighter slate
          400: '#94A3B8',   // Light slate
          500: '#64748B',   // Slate - Body text
          600: '#475569',   // Medium slate
          700: '#334155',   // Dark slate
          800: '#1E293B',   // Navy - Primary text
          900: '#0F172A',   // Deep Navy - Headers
        },
        // Accent Colors - Engineering Blue
        accent: {
          100: '#E0F2FE',   // Light background
          400: '#38BDF8',   // Active state
          500: '#0EA5E9',   // Hover state
          600: '#0284C7',   // Primary CTA
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