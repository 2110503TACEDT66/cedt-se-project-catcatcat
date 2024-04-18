/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#334155',
        'cyan-450': '#3EB9CA',
        'rose-red': '#FF5353'
      },
    },
  },
  plugins: [],
}

