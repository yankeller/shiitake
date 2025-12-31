use crate::api_consts::MessageType;
use crate::message_buffer::read;
use js_sys::Uint8Array;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use web_sys::console;

#[wasm_bindgen]
pub struct Engine {
    message_buffer: Uint8Array,

    current_frequency: f32,
    phase: f32,
    phase_increment: f32,
}

#[wasm_bindgen]
impl Engine {
    #[wasm_bindgen(constructor)]
    pub fn new(message_buffer: Uint8Array) -> Engine {
        Engine {
            message_buffer,
            current_frequency: 440.0,
            phase: 0.0,
            phase_increment: 2.0 * std::f32::consts::PI * 440.0 / 44100.0,
        }
    }

    pub fn process(&mut self, output: &mut [f32], message_flag: bool) {
        // !TODO read all messages
        if message_flag {
            let buffer_len = self.message_buffer.length() as usize;
            let mut buffer_data = vec![0u8; buffer_len];
            self.message_buffer.copy_to(&mut buffer_data);

            if let Some((message_type, payload)) = read(&mut buffer_data) {
                // Update shared buffer with updated read pointer value
                let read_ptr = Uint8Array::new_with_length(4);
                read_ptr.copy_from(&buffer_data[0..4]);
                self.message_buffer.set(&read_ptr, 0);

                match message_type {
                    MessageType::PlayFrequency => {
                        let freq =
                            f32::from_le_bytes([payload[0], payload[1], payload[2], payload[3]]);

                        self.current_frequency = freq;
                        self.phase_increment = 2.0 * std::f32::consts::PI * freq / 44100.0;
                    }
                    _ => {}
                }
            };
        }

        for sample in output.iter_mut() {
            *sample = self.phase.sin();

            self.phase = (self.phase + self.phase_increment) % (2.0 * std::f32::consts::PI);
        }
    }
}
