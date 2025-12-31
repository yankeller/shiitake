import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
    preprocess: vitePreprocess(),
    compilerOptions: {
        experimental: {
            async: true // remove in svelte 6
        }
    },
    kit: {
        alias: {
            "$wasm-audio": "wasm-audio/pkg/wasm_audio.js"
        }
    }
};