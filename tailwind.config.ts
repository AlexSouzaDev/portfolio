import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-lift': 'var(--paper-lift)',
        'paper-shade': 'var(--paper-shade)',
        rule: 'var(--rule)',
        'ink-soft': 'var(--ink-soft)',
        ink: 'var(--ink)',
        seal: 'var(--seal)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Garamond', 'Times New Roman', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Mono micro-labels. Never set Garamond this small.
        micro: ['0.7rem', { letterSpacing: '0.16em', lineHeight: '1.4' }],
        mark: ['0.75rem', { letterSpacing: '0.14em', lineHeight: '1.5' }],
      },
      maxWidth: {
        measure: 'var(--measure)',
        sheet: '82rem',
      },
      aspectRatio: {
        card: '1.75 / 1',
      },
      transitionTimingFunction: {
        press: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
