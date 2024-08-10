module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        blue_gray: { 100: "#d1d4d8", 400: "#8e8e8e", 900: "#2b2d42" },
        white: { A700: "#ffffff", A700_7f: "#ffffff7f", A700_b2: "#ffffffb2" },
        black: { 900: "#000000", "900_7f": "#0000007f", "900_4c": "#0000004c", "900_99": "#00000099" },
        deep_purple: { A700: "#3d0ef9" },
        orange: { A700: "#f9630e" },
        amber: { A100: "#ffe174" },
        red: { 900: "#b01b24" },
        gray: { 50: "#f8f7fc", 100: "#f6f6f6", 900: "#222226" },
        green: { 700: "#1eb01b" },
        deep_orange: { A400: "#f9250f" },
        purple: { 500: "#ad1bb0" },
        white_A700_4f: "#ffffff4f",
        dark_blue:"#2B2D42"
      },
      boxShadow: {},
      fontFamily: { inter: "Inter", poppins: "Poppins" },
      backgroundImage: {
        gradient: "linear-gradient(180deg, #00000000,#000000a5)",
        gradient1: "linear-gradient(180deg, #00000000,#000000cc)",
        gradient2: "linear-gradient(180deg, #00000000,#000000)",
        gradient3: "linear-gradient(180deg, #00000000,#0000007f)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
