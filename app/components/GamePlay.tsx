import { RefObject } from 'react';
import { motion } from "framer-motion";
import { VocabWord, FeedbackState, Difficulty } from "../types/vocab";
import { GAME_CONFIG } from "../constants/gameConfig";

interface GamePlayProps {
  currentWordIndex: number;
  totalWords: number;
  timeLeft: number;
  isSpeaking: boolean;
  showMeaning: boolean;
  currentWord: VocabWord | null;
  feedback: FeedbackState;
  userInput: string;
  countdownActive: boolean;
  inputRef: RefObject<HTMLInputElement>;
  onRepeatWord: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  difficulty: Difficulty;
}

export default function GamePlay({
  currentWordIndex,
  totalWords,
  timeLeft,
  isSpeaking,
  showMeaning,
  currentWord,
  feedback,
  userInput,
  countdownActive,
  inputRef,
  onRepeatWord,
  onSubmit,
  onInputChange,
  difficulty
}: GamePlayProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyText = () => {
    switch (difficulty) {
      case 'easy':
        return 'ระดับง่าย';
      case 'medium':
        return 'ระดับปานกลาง';
      case 'hard':
        return 'ระดับยาก';
      default:
        return '';
    }
  };

  // Get background gradient based on feedback
  const getBackgroundGradient = () => {
    if (feedback.show) {
      if (feedback.correct) {
        return "from-emerald-50/90 to-green-50/90";
      } else {
        return "from-rose-50/90 to-red-50/90";
      }
    }
    return "";
  };

  // Add keypress sound effect
  const playKeypressSound = () => {
    const audio = new Audio('/keypress.mp3');
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(error => console.log('Error playing sound:', error));
  };

  // Enhanced input change handler with sound
  const handleInputWithSound = (e: React.ChangeEvent<HTMLInputElement>) => {
    playKeypressSound();
    onInputChange(e);
  };

  // Get container color based on feedback
  const getMeaningContainerStyles = () => {
    if (feedback.show) {
      if (feedback.correct) {
        return "bg-emerald-100/50 border-emerald-200/40";
      } else {
        return "bg-rose-100/50 border-rose-200/40";
      }
    }
    return "bg-white/30 border-amber-200/30";
  };

  // Get input styles based on feedback
  const getInputStyles = () => {
    if (feedback.show) {
      if (feedback.correct) {
        return "bg-emerald-50/80 border-emerald-300/70 focus:ring-emerald-500 focus:border-emerald-400";
      } else {
        return "bg-rose-50/80 border-rose-300/70 focus:ring-rose-500 focus:border-rose-400";
      }
    }
    return "bg-white/70 border-amber-200/40 focus:ring-amber-500 focus:border-amber-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`transition-all duration-300 ${getBackgroundGradient()}`}
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-amber-800 text-xl">คำที่ {currentWordIndex + 1}/{totalWords}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor()}`}>
              {getDifficultyText()}
            </span>
          </div>
          <span className="font-bold text-amber-800 text-xl">เวลา: {timeLeft} วินาที</span>
        </div>
        <div className="h-4 w-full bg-white/50 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            className={`h-full ${timeLeft > GAME_CONFIG.COUNTDOWN_TIME * 0.3 
              ? 'bg-gradient-to-r from-amber-400 to-rose-400' 
              : 'bg-gradient-to-r from-red-400 to-rose-500'}`}
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / GAME_CONFIG.COUNTDOWN_TIME) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {isSpeaking && (
        <div className="mb-6 text-center">
          <div className="bg-amber-100/50 text-amber-800 px-6 py-3 rounded-xl inline-flex items-center border border-amber-200/50">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium">กำลังพูด... กรุณารอสักครู่</span>
          </div>
        </div>
      )}

      <div className={`mb-8 p-6 ${getMeaningContainerStyles()} backdrop-blur-sm rounded-xl border shadow-sm text-center transition-colors duration-300`}>
        <p className="text-lg text-amber-700 mb-3 font-medium">ความหมาย:</p>
        
        {showMeaning ? (
          <motion.p 
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {currentWord?.thai}
          </motion.p>
        ) : (
          <div className="h-12 flex items-center justify-center">
            {isSpeaking ? (
              <p className="text-amber-400 italic">กรุณารอฟังคำศัพท์...</p>
            ) : (
              <div className="bg-amber-100/50 rounded-lg h-8 w-3/4 animate-pulse mx-auto"></div>
            )}
          </div>
        )}
        
        <motion.button 
          onClick={onRepeatWord}
          className="mt-4 px-6 py-3 bg-amber-100/40 text-amber-700 hover:bg-amber-200/50 rounded-xl flex items-center mx-auto font-medium border border-amber-200/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSpeaking || feedback.show}
        >
          <span className="mr-2 text-2xl">🔊</span> ฟังอีกครั้ง (Alt+R)
        </motion.button>
      </div>

      {feedback.show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl text-center ${
            feedback.correct 
              ? "bg-emerald-100/40 text-emerald-800 border border-emerald-200/30" 
              : "bg-rose-100/40 text-rose-800 border border-rose-200/30"
          }`}
        >
          <p className="font-medium text-lg">{feedback.message}</p>
        </motion.div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputWithSound}
          placeholder="พิมพ์คำศัพท์ภาษาอังกฤษ..."
          className={`w-full p-5 ${getInputStyles()} backdrop-blur-sm border-2 rounded-xl text-lg font-medium text-amber-900 focus:outline-none focus:ring-2 shadow-sm transition-colors duration-300`}
          autoComplete="off"
          disabled={feedback.show}
        />
        <motion.button
          type="submit"
          className={`w-full font-bold py-4 rounded-xl shadow-md transition-all text-xl ${
            isSpeaking || feedback.show 
            ? "bg-gray-400/80 text-white cursor-not-allowed" 
            : "bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white hover:shadow-lg"
          }`}
          whileHover={isSpeaking || feedback.show ? {} : { scale: 1.02 }}
          whileTap={isSpeaking || feedback.show ? {} : { scale: 0.98 }}
          disabled={isSpeaking || feedback.show}
        >
          {isSpeaking ? "กรุณารอ..." : "ส่งคำตอบ"}
        </motion.button>
      </form>

      {!countdownActive && !feedback.show && !isSpeaking && 
        <div className="text-center mt-4 text-amber-700/80">
          <p>เวลาจะเริ่มนับหลังจากได้ยินคำศัพท์</p>
        </div>
      }
    </motion.div>
  );
} 