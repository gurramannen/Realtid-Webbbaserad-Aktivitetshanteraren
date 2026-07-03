module.exports = {
  // Using single light theme to match Windows Task Manager
  content: ['./src/**/*.{js,jsx,ts,tsx}', '../**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto'],
      },
    },
  },
  plugins: [],
};
