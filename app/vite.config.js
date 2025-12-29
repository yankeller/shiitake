import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        sveltekit(),
        tailwindcss()
    ],
    build: {
        target: "ES2022"
    },
    server: {
        headers: {
            "Cross-Origin-Embedder-Policy": "require-corp", // for shared WebAssembly.Memory
            "Cross-Origin-Opener-Policy": "same-origin" // see https://web.dev/articles/coop-coep
        },
        fs: {
            allow: [".."]
        }
    }
});