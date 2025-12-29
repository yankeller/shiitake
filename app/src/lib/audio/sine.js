class SineProcessor extends AudioWorkletProcessor {
    constructor(options) {
        super();

        this.initialized = false;

        const { wasmBytes, linkerCode, sampleRate } = options.processorOptions;

        // Load linker code since importing is not possible
        globalThis.loadLinkerCode(linkerCode);

        const { initSync, SineOscillator } = globalThis;

        initSync(wasmBytes);

        this.oscillator = new SineOscillator(440.0, sampleRate);
        this.initialized = true;
    }

    process(inputs, outputs) {
        if (!this.initialized) return true;

        this.oscillator.process(outputs[0][0]);

        return true;
    }
}

registerProcessor("sine-processor", SineProcessor);
