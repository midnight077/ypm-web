import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config & {daisyui: import('daisyui').Config}} */
export default {
    content: ["./src/app/**/*.jsx", "./src/components/**/*.jsx"],
    plugins: [typography, daisyui],
    daisyui: {
        themes: ["retro"],
    },
};
