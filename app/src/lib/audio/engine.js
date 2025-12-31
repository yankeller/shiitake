/**
 * @description
 */
class EngineProcessor extends AudioWorkletProcessor {
    constructor(options) {
        super();

        this.initialized = false;
        this.lastWritePointer = 0;

        const { wasmBytes, linkerCode, messageBuffer } =
            options.processorOptions;

        // Load linker code since importing is not possible
        globalThis.loadLinkerCode(linkerCode);

        const { initSync, Engine, init_debug } = globalThis;

        initSync(wasmBytes);

        init_debug();

        this.messageBuffer = new Int32Array(messageBuffer);

        const bufferView = new Uint8Array(messageBuffer);
        this.engine = new Engine(bufferView);
        this.initialized = true;
    }

    process(inputs, outputs, parameters) {
        if (!this.initialized) return true;

        let messageFlag = false;
        const write = Atomics.load(this.messageBuffer, 1);
        if (write !== this.lastWritePointer) {
            messageFlag = true;
            this.lastWritePointer = write;
        }

        this.engine.process(outputs[0][0], messageFlag);

        return true;
    }
}

registerProcessor("engine-processor", EngineProcessor);
