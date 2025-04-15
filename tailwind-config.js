/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette de couleurs pour les nœuds
        'idea': {
          50: '#e0f2fe',
          100: '#bae6fd',
          200: '#7dd3fc',
          500: '#38bdf8',
        },
        'synopsis': {
          50: '#dbeafe',
          100: '#bfdbfe',
          200: '#93c5fd',
          500: '#3b82f6',
        },
        'storyboard': {
          50: '#e0e7ff',
          100: '#c7d2fe',
          200: '#a5b4fc',
          500: '#6366f1',
        },
        'prompt': {
          50: '#ede9fe',
          100: '#ddd6fe',
          200: '#c4b5fd',
          500: '#8b5cf6',
        },
        'image': {
          50: '#fae8ff',
          100: '#f5d0fe',
          200: '#f0abfc',
          500: '#d946ef',
        },
        'camera': {
          50: '#fce7f3',
          100: '#fbcfe8',
          200: '#f9a8d4',
          500: '#ec4899',
        },
      },
    },
  },
  plugins: [],
}
