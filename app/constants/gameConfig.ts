import { VocabWord, Difficulty } from '../types/vocab';

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

export const VOCABULARY_BY_LEVEL: Record<Difficulty, VocabWord[]> = {
  easy: [
    { english: "cat", thai: "แมว" },
    { english: "dog", thai: "สุนัข" },
    { english: "bird", thai: "นก" },
    { english: "fish", thai: "ปลา" },
    { english: "book", thai: "หนังสือ" },
    { english: "pen", thai: "ปากกา" },
    { english: "car", thai: "รถยนต์" },
    { english: "house", thai: "บ้าน" },
    { english: "tree", thai: "ต้นไม้" },
    { english: "sun", thai: "ดวงอาทิตย์" }
  ],
  medium: [
    { english: "computer", thai: "คอมพิวเตอร์" },
    { english: "telephone", thai: "โทรศัพท์" },
    { english: "hospital", thai: "โรงพยาบาล" },
    { english: "restaurant", thai: "ร้านอาหาร" },
    { english: "teacher", thai: "ครู" },
    { english: "student", thai: "นักเรียน" },
    { english: "airport", thai: "สนามบิน" },
    { english: "library", thai: "ห้องสมุด" },
    { english: "mountain", thai: "ภูเขา" },
    { english: "beach", thai: "ชายหาด" }
  ],
  hard: [
    { english: "extraordinary", thai: "พิเศษมาก" },
    { english: "sophisticated", thai: "ซับซ้อน" },
    { english: "phenomenon", thai: "ปรากฏการณ์" },
    { english: "enthusiasm", thai: "ความกระตือรือร้น" },
    { english: "determination", thai: "ความมุ่งมั่น" },
    { english: "opportunity", thai: "โอกาส" },
    { english: "experience", thai: "ประสบการณ์" },
    { english: "achievement", thai: "ความสำเร็จ" },
    { english: "environment", thai: "สิ่งแวดล้อม" },
    { english: "technology", thai: "เทคโนโลยี" }
  ]
}; 