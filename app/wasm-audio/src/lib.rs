use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct SineOscillator {
    phase: f32,
    phase_increment: f32
}

#[wasm_bindgen]
impl SineOscillator {
    #[wasm_bindgen(constructor)]
    pub fn new(frequency: f32, sample_rate: f32) -> SineOscillator {
        SineOscillator {
            phase: 0.0,
            phase_increment: 2.0 * std::f32::consts::PI * frequency / sample_rate
        }
    }

    pub fn process(&mut self, output: &mut [f32]) {
        for sample in output.iter_mut() {
            *sample = self.phase.sin();

            self.phase = (self.phase + self.phase_increment) % (2.0 * std::f32::consts::PI);
        }
    }
}