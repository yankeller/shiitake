use crate::api_consts::MessageType;
use std::sync::atomic::{compiler_fence, Ordering};
use wasm_bindgen::JsValue;
use web_sys::console;

const BUFFER_SIZE: usize = 256;
const MASK: usize = BUFFER_SIZE - 1;

/// Utility function to parse i32 from bytes (little endian)
#[inline]
fn read_i32(data: &[u8], offset: usize) -> i32 {
    unsafe {
        let b0 = std::ptr::read(&data[offset]) as i32;
        let b1 = std::ptr::read(&data[offset + 1]) as i32;
        let b2 = std::ptr::read(&data[offset + 2]) as i32;
        let b3 = std::ptr::read(&data[offset + 3]) as i32;
        b0 | (b1 << 8) | (b2 << 16) | (b3 << 24)
    }
}

#[inline]
fn write_i32(data: &mut [u8], offset: usize, val: i32) {
    unsafe {
        std::ptr::write(&mut data[offset], val as u8);
        std::ptr::write(&mut data[offset + 1], (val >> 8) as u8);
        std::ptr::write(&mut data[offset + 2], (val >> 16) as u8);
        std::ptr::write(&mut data[offset + 3], (val >> 24) as u8);
    }
}

pub fn read(buffer: &mut [u8]) -> Option<(MessageType, Vec<u8>)> {
    // Is this sufficient for atomics?
    compiler_fence(Ordering::Acquire);

    // Must read bytes individually because address may not be aligned
    let read_ptr = read_i32(buffer, 0) as usize;
    let write_ptr = read_i32(buffer, 4) as usize;

    console::log_1(&JsValue::from_str(&format!(
        "read: {}, write: {}",
        read_ptr, write_ptr
    )));

    if read_ptr == write_ptr {
        return None;
    }

    let data = &buffer[8..];

    let message_type_raw = data[read_ptr & MASK];
    let message_type = MessageType::try_from(message_type_raw).ok()?;
    let payload_length = data[(read_ptr + 1) & MASK] as usize;

    let mut payload = Vec::with_capacity(payload_length);

    for i in 0..payload_length {
        payload.push(data[(read_ptr + 2 + i) & MASK]);
    }

    // Update read pointer
    let new_read_ptr = ((read_ptr + 2 + payload_length) & MASK) as i32;
    write_i32(buffer, 0, new_read_ptr);

    compiler_fence(Ordering::Release);

    Some((message_type, payload))
}
