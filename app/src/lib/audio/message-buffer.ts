/**
 * @description Ring buffer for sending messages between main thread and audio worklet
 *
 * Packet structure: [type: u8][length: u8][payload: u8[]]
 */
export class MessageBuffer {
    private buffer: SharedArrayBuffer;
    private pointers: Int32Array;
    private data: Uint8Array;

    private static readonly SIZE = 256; // ring buffer size
    private static readonly HEADER = 8; // space for read/write pointers
    private static readonly MASK = MessageBuffer.SIZE - 1;

    /**
     * @param buffer - optional SharedArrayBuffer to use
     */
    constructor(buffer?: SharedArrayBuffer) {
        if (buffer) {
            this.buffer = buffer;
        } else {
            this.buffer = new SharedArrayBuffer(
                MessageBuffer.HEADER + MessageBuffer.SIZE,
            );
        }
        this.pointers = new Int32Array(this.buffer, 0, 2);
        this.data = new Uint8Array(this.buffer, MessageBuffer.HEADER);
    }

    /**
     * @returns SharedArrayBuffer
     */
    public getBuffer(): SharedArrayBuffer {
        return this.buffer;
    }

    /**
     * @description Add message to buffer
     * @returns true on success, false if buffer is full
     */
    public send(type: number, payload: Uint8Array): boolean {
        const read = Atomics.load(this.pointers, 0);
        const write = Atomics.load(this.pointers, 1);

        const length = 2 + payload.byteLength;
        const available =
            (read - write - 1 + MessageBuffer.SIZE) & MessageBuffer.MASK;

        if (length > available) {
            return false;
        }

        this.data[write] = type;
        this.data[(write + 1) & MessageBuffer.MASK] = payload.length;

        for (let i = 0; i < payload.length; i++) {
            this.data[(write + 2 + i) & MessageBuffer.MASK] = payload[i];
        }

        Atomics.store(this.pointers, 1, (write + length) & MessageBuffer.MASK);
        console.log("Message sent:", type, payload);
        console.log(read, write);
        return true;
    }

    /**
     *
     */
    public read() {}
}
