RUSTFLAGS="-C target-feature=+atomics,+bulk-memory,+mutable-globals" \
cargo build --target wasm32-unknown-unknown --release

wasm-bindgen target/wasm32-unknown-unknown/release/wasm_audio.wasm \
  --target web \
  --out-dir ./pkg