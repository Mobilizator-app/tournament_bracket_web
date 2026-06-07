import type { Config } from 'tailwindcss';

// Colors reference CSS variables (defined in app/globals.css). This lets a
// LiveSnapshot's `render.colors` override them at runtime without a rebuild,
// while Tailwind utility classes (bg-surface, text-accent-green, ...) keep working.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--c-bg)',
        surface: 'var(--c-surface)',
        'surface-border': 'var(--c-border)',
        'accent-red': 'var(--c-accent-red)',
        'accent-green': 'var(--c-accent-green)',
        'text-primary': 'var(--c-text-primary)',
        'text-secondary': 'var(--c-text-secondary)',
      },
      fontFamily: {
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '7px',
        input: '12px',
        'table-header': '16px',
      },
    },
  },
  plugins: [],
};

export default config;
