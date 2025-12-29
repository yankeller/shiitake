import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
    preprocess: vitePreprocess(),
    kit: {
        alias: {
            "$wasm-audio": "wasm-audio/pkg/wasm_audio.js"
        }
    }
};