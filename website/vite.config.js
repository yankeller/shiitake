import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltePhosphorOptimize } from "phosphor-svelte/vite";

export default defineConfig({
    plugins: [
        sveltekit(),
        tailwindcss(),
        sveltePhosphorOptimize()
    ],
    build: {
        target: "ES2022"
    },
    server: {
        port: 5174
    }
});