/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e1e1e",
        secondary: "#9fe300",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "marquee-reverse": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "marquee-reverse": "marquee-reverse 45s linear infinite",
        "marquee-slow": "marquee 80s linear infinite",
        "spin-slow": "spin 6s linear infinite",
        "spin-slower": "spin 22s linear infinite",
      },
      screens: {
        'custom': '1240px',
        'custom870': '870px'
      }
    },
  },
  plugins: [],
}