use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn init_debug() {
    console_error_panic_hook::set_once();
}

mod api_consts;
mod engine;
mod message_buffer;
pub use engine::Engine;
