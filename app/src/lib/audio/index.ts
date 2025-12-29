export async function initialize() {
    const audioContext = new AudioContext({
        sampleRate: 44100,
        latencyHint: "interactive",
    });
    await audioContext.audioWorklet.addModule(
        new URL("./polyfill.js", import.meta.url).href,
    );
    await audioContext.audioWorklet.addModule(
        new URL("./sine.js", import.meta.url).href,
    );

    const wasmBytes = await fetch(
        new URL("../../../wasm-audio/pkg/wasm_audio_bg.wasm", import.meta.url)
            .href,
    ).then((res) => res.arrayBuffer());

    const linkerCode = await fetch(
        new URL("../../../wasm-audio/pkg/wasm_audio.js", import.meta.url).href,
    ).then((res) => res.text());

    const sineNode = new AudioWorkletNode(audioContext, "sine-processor", {
        processorOptions: {
            wasmBytes: wasmBytes,
            linkerCode: linkerCode,
            sampleRate: audioContext.sampleRate,
        },
    });

    sineNode.connect(audioContext.destination);
}
