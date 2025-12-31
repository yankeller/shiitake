import { MessageType } from "./api-const";
import type { MessageBuffer } from "./message-buffer";

export class AudioAPI {
    private messageBuffer: MessageBuffer;

    constructor(messageBuffer: MessageBuffer) {
        this.messageBuffer = messageBuffer;
    }

    public playFrequency(frequency: number) {
        const payload = new Uint8Array(4);
        const view = new DataView(payload.buffer);

        view.setFloat32(0, frequency, true);

        return this.messageBuffer.send(MessageType.PLAY_FREQUENCY, payload);
    }
}
