// Polyfills for AudioWorklet environment
// https://github.com/wasm-bindgen/wasm-bindgen/issues/2367

if (typeof TextDecoder === "undefined") {
    globalThis.TextDecoder = class {
        constructor() {
            this.encoding = "utf-8";
        }
        decode(buffer) {
            return String.fromCharCode.apply(null, new Uint8Array(buffer));
        }
    };
}

if (typeof TextEncoder === "undefined") {
    globalThis.TextEncoder = class {
        constructor() {
            this.encoding = "utf-8";
        }
        encode(string) {
            const res = new Uint8Array(string.length);
            for (let i = 0; i < string.length; i++) {
                res[i] = string.charCodeAt(i);
            }
            return res;
        }
    };
}

// Never used when using initSync?
if (typeof globalThis.URL === "undefined") {
    globalThis.URL = class {};
}

/**
 * Helper to load wasm linker code from main thread to worklet
 * Note: Worklet cannot fetch or import()
 */
globalThis.loadLinkerCode = (linkerCode) => {
    // Update ES module to work in worklet scope
    const transformed = linkerCode
        // export class Foo -> globalThis.Foo = class Foo
        .replace(/^export class (\w+)/gm, "globalThis.$1 = class $1")

        // export function foo -> globalThis.foo = function foo
        .replace(/^export function (\w+)/gm, "globalThis.$1 = function $1")

        // export { initSync } -> globalThis.initSync = initSync
        .replace(
            /^export \{ initSync \};?/gm,
            "globalThis.initSync = initSync;",
        )

        // export default __wbg_init -> globalThis.init = __wbg_init
        .replace(/^export default (\w+);?/gm, "globalThis.init = $1;")

        // import.meta.url -> ''
        .replace(/import\.meta\.url/g, "''");

    // Run the linker code
    new Function(transformed)();
};
