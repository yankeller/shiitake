/// Any changes must also be applied to api-consts.ts
use num_enum::TryFromPrimitive;

#[derive(Debug, Clone, Copy, PartialEq, Eq, TryFromPrimitive)]
#[repr(u8)]
pub enum MessageType {
    PlayFrequency = 0,
    Stop,
}
