export interface VocabWord {
  english: string;
  thai: string;
}

export interface GameResult {
  word: string;
  correct: boolean;
  time: number;
}

export interface FeedbackState {
  show: boolean;
  correct: boolean;
  message: string;
} 