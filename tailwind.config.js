/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.vue",
    "./pages/**/*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        xuelecom: {
          primary: "#303473",
          secondary: "#F2D649",
          accent: "#0E0C40",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
