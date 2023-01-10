/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'auto-cols-auto', 
    { pattern:/grid-rows-./ },
    { pattern:/grid-cols-./, variants:['md', 'lg']},
    { pattern:/text-.xl/ },
    { pattern:/p-./},
  ],
  theme: {
    colors:{
      'black':'#484349',
      'white-primary':'#F7F7FF',
      'white-secondary':'#F9F9F9', // Background
      'white':'#FFFFFF',
      'red':'#FF4A4A',
      'orange':'#FF9551',
      'yellow':'#FFCE31',
      'green':'#00A878',
      'blue':'#266C92',
      'light-red':'#FFD6D6',
      'light-yellow':'#FFF5D6',
      'light-green':'#99FFE2',
      'light-blue':'#AED5EA',
    },
    fontFamily:{
      'fjalla-one':['Fjalla One', 'sans-serif'],
      'nunito':['Nunito', 'sans-serif'],
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
