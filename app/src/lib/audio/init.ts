import { AudioAPI } from "./api";
import { MessageBuffer } from "./message-buffer";

/**
 * @description
 */
export async function init() {
    const audioContext = new AudioContext({
        sampleRate: 44100,
        latencyHint: "interactive",
    });
    await audioContext.audioWorklet.addModule(
        new URL("./polyfill.js", import.meta.url).href,
    );
    await audioContext.audioWorklet.addModule(
        new URL("./engine.js", import.meta.url).href,
    );

    const wasmBytes = await fetch(
        new URL("../../../wasm-audio/pkg/wasm_audio_bg.wasm", import.meta.url)
            .href,
    ).then((res) => res.arrayBuffer());

    const linkerCode = await fetch(
        new URL("../../../wasm-audio/pkg/wasm_audio.js", import.meta.url).href,
    ).then((res) => res.text());

    const messageBuffer = new MessageBuffer();

    const engineNode = new AudioWorkletNode(audioContext, "engine-processor", {
        processorOptions: {
            wasmBytes: wasmBytes,
            linkerCode: linkerCode,
            messageBuffer: messageBuffer.getBuffer(),
        },
    });

    engineNode.connect(audioContext.destination);

    const api = new AudioAPI(messageBuffer);

    return { api };
}
