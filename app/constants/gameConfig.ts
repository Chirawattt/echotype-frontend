export const GAME_CONFIG = {
  COUNTDOWN_TIME: 7, // เวลาในการตอบคำถาม (วินาที)
  FEEDBACK_DELAY: 1500, // เวลาแสดงผลตอบกลับเมื่อตอบถูก (มิลลิวินาที)
  TIMEOUT_DELAY: 2000, // เวลาแสดงผลตอบกลับเมื่อหมดเวลา (มิลลิวินาที)
  WRONG_ANSWER_DELAY: 1500, // เวลาแสดงผลตอบกลับเมื่อตอบผิด (มิลลิวินาที)
  NEXT_WORD_DELAY: 1000, // เวลารอก่อนแสดงคำถัดไป (มิลลิวินาที)
  PRONUNCIATION_RATE: 0.8 // อัตราเร็วในการพูด (0.1-1.0)
};

export const WORD_PROMPTS = [
  "The next word is...",
  "Listen carefully. The word is...",
  "Here comes your next word...",
  "Now, spell this word...",
  "Your next word to guess is...",
  "Are you ready for this one?",
  "Let's try this word...",
  "Focus and listen to...",
  "The next challenge is...",
  "Get ready to spell...",
];

export const VOCABULARY_LIST = [
  { english: "hello", thai: "สวัสดี" },
  { english: "goodbye", thai: "ลาก่อน" },
  { english: "thank you", thai: "ขอบคุณ" },
  { english: "water", thai: "น้ำ" },
  { english: "food", thai: "อาหาร" },
  { english: "friend", thai: "เพื่อน" },

]; 