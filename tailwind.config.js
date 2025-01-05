/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,vue,ts}", "./app.vue"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        xuelecom: {
          primary: "#0E0C40",
          secondary: "#303473",
          accent: "#F2D649",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
