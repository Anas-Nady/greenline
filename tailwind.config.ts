import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
      },
      backgroundImage: {
        "hero-background": "url('/assets/hero-background.jpg')",
      },
      colors: {
        "root-layout": "#f2f2f2",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
