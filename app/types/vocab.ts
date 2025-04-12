export type Difficulty = 'easy' | 'medium' | 'hard';

export interface VocabWord {
  english: string;
  thai: string;
}

export interface GameResult {
  correctCount: number;
  totalQuestions: number;
  results: {
    word: string;
    correct: boolean;
    time: number;
  }[];
}

export interface FeedbackState {
  show: boolean;
  correct: boolean;
  message: string;
} 