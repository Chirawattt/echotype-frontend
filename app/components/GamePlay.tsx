import { RefObject } from 'react';
import { motion } from "framer-motion";
import { VocabWord, FeedbackState } from "../types/vocab";
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
  onInputChange
}: GamePlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl shadow-md"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-purple-700 text-lg">คำที่ {currentWordIndex + 1}/{totalWords}</span>
          <span className="font-bold text-purple-700 text-lg">เวลา: {timeLeft} วินาที</span>
        </div>
        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            className={`h-full ${timeLeft > GAME_CONFIG.COUNTDOWN_TIME * 0.3 ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / GAME_CONFIG.COUNTDOWN_TIME) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {isSpeaking && (
        <div className="mb-4 text-center">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>กำลังพูด... กรุณารอสักครู่</span>
          </div>
        </div>
      )}

      <div className="mb-6 p-5 bg-white rounded-xl border border-purple-200 shadow-sm text-center">
        <p className="text-gray-600 mb-2 font-medium">ความหมาย:</p>
        
        {showMeaning ? (
          <motion.p 
            className="text-2xl font-bold mb-3 text-purple-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {currentWord?.thai}
          </motion.p>
        ) : (
          <div className="h-10 flex items-center justify-center">
            {isSpeaking ? (
              <p className="text-gray-400 italic">กรุณารอฟังคำศัพท์...</p>
            ) : (
              <div className="bg-gray-200 rounded-md h-8 w-3/4 animate-pulse mx-auto"></div>
            )}
          </div>
        )}
        
        <motion.button 
          onClick={onRepeatWord}
          className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full flex items-center mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSpeaking || feedback.show}
        >
          <span className="mr-2 text-xl">🔊</span> ฟังอีกครั้ง (Alt+R)
        </motion.button>
      </div>

      {feedback.show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 p-3 rounded-lg text-center ${
            feedback.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          <p className="font-medium">{feedback.message}</p>
        </motion.div>
      )}

      <form onSubmit={onSubmit} className="mb-4">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={onInputChange}
          placeholder="พิมพ์คำศัพท์ภาษาอังกฤษ..."
          className="w-full p-4 border-2 border-purple-400 rounded-xl mb-3 text-lg font-medium text-indigo-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
          autoComplete="off"
        />
        <motion.button
          type="submit"
          className={`w-full font-bold py-3 rounded-xl shadow-md transition-all hover:shadow-lg text-lg ${
            isSpeaking || feedback.show 
            ? "bg-gray-400 text-white cursor-not-allowed" 
            : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          }`}
          whileHover={isSpeaking || feedback.show ? {} : { scale: 1.02 }}
          whileTap={isSpeaking || feedback.show ? {} : { scale: 0.98 }}
          disabled={isSpeaking || feedback.show}
        >
          {isSpeaking ? "กรุณารอ..." : "ส่งคำตอบ"}
        </motion.button>
      </form>

      {!countdownActive && !feedback.show && !isSpeaking && 
        <div className="text-center text-sm text-gray-500">
          <p>เวลาจะเริ่มนับหลังจากได้ยินคำศัพท์</p>
        </div>
      }
    </motion.div>
  );
} 