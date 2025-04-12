"use client";

import { motion } from "framer-motion";
import { useVocabGame } from "../hooks/useVocabGame";
import GameIntro from "./GameIntro";
import GamePlay from "./GamePlay";
import GameResultView from "./GameResult";
import DifficultySelect from "./DifficultySelect";
import { RefObject } from "react";
import { Difficulty } from "../types/vocab";

export default function VocabGame() {
  const {
    gameStarted,
    gameEnded,
    currentWordIndex,
    shuffledList,
    userInput,
    timeLeft,
    results,
    feedback,
    headphonesConfirmed,
    isSpeaking,
    countdownActive,
    currentWord,
    showMeaning,
    isSelectingDifficulty,
    inputRef,
    audioCorrectRef,
    audioIncorrectRef,
    audioCompletedRef,
    setHeadphonesConfirmed,
    setUserInput,
    startGame,
    handleSubmit,
    repeatWord,
    resetGame,
    handleDifficultySelect,
    difficulty
  } = useVocabGame();

  // Handle going back to intro
  const handleBackToIntro = () => {
    resetGame();
    setHeadphonesConfirmed(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 p-4 md:p-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circles */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-yellow-200/20 blur-3xl"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-200/30 blur-3xl"></div>
        <div className="absolute top-[30%] right-[-15%] w-[40%] h-[40%] rounded-full bg-amber-200/20 blur-3xl"></div>
        
        {/* Floating elements */}
        <motion.div 
          className="absolute top-[10%] left-[5%] w-16 h-16 rounded-full bg-amber-300/30 backdrop-blur-sm"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-[20%] right-[15%] w-20 h-20 rounded-xl bg-rose-300/20 backdrop-blur-sm"
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-[40%] left-[15%] w-12 h-12 rounded-lg bg-orange-200/30 backdrop-blur-sm"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0],
            rotate: [0, 20, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 12,
            ease: "easeInOut"
          }}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-[15%] right-[20%] text-6xl opacity-10 rotate-12">🎯</div>
        <div className="absolute bottom-[10%] left-[10%] text-6xl opacity-10 -rotate-12">🎧</div>
        <div className="absolute top-[60%] right-[10%] text-6xl opacity-10 rotate-45">📝</div>
      </div>
      
      {/* Audio Elements */}
      <audio ref={audioCorrectRef} src="/correct.mp3" preload="auto" />
      <audio ref={audioIncorrectRef} src="/incorrect.mp3" preload="auto" />
      <audio ref={audioCompletedRef} src="/completed.wav" preload="auto" />
      
      <div className="relative max-w-6xl mx-auto z-10">
        {!gameStarted && !gameEnded && !headphonesConfirmed && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                English Vocabulary Game
              </span>
            </h1>
            <p className="text-2xl text-amber-800 font-medium">
              ฝึกคำศัพท์ภาษาอังกฤษแบบสนุกๆ
            </p>
          </motion.div>
        )}

        {(gameStarted || gameEnded || headphonesConfirmed || isSelectingDifficulty) && (
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                English Vocabulary Game
              </span>
            </h1>
            <p className="text-lg text-amber-800 font-medium">
              ฝึกคำศัพท์ภาษาอังกฤษแบบสนุกๆ
            </p>
          </motion.div>
        )}

        <div className="max-w-4xl mx-auto">
          {!gameStarted && !gameEnded && !headphonesConfirmed && (
            <GameIntro onStart={() => setHeadphonesConfirmed(true)} />
          )}

          {!gameStarted && !gameEnded && headphonesConfirmed && !isSelectingDifficulty && (
            <motion.div
              className="text-center p-8 md:p-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="text-8xl mb-8"
              >
                🎧
              </motion.div>
              <h2 className="text-3xl font-bold mb-6 text-amber-800">โปรดใส่หูฟังเพื่อเล่นเกมนี้</h2>
              <p className="mb-10 text-xl text-amber-700 max-w-2xl mx-auto">
                เกมนี้จะมีการออกเสียงคำศัพท์ภาษาอังกฤษ การใส่หูฟังจะช่วยให้คุณได้ยินชัดเจนและเล่นได้อย่างมีประสิทธิภาพมากขึ้น
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  onClick={startGame}
                  className="bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xl font-bold py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ฉันพร้อมแล้ว
                </motion.button>
                <motion.button
                  onClick={handleBackToIntro}
                  className="bg-white/50 backdrop-blur-sm text-amber-700 border border-amber-300/50 text-lg font-medium py-4 px-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  กลับไปหน้าแรก
                </motion.button>
              </div>
            </motion.div>
          )}

          {isSelectingDifficulty && (
            <motion.div
              className="p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-end mb-6">
                <motion.button
                  onClick={handleBackToIntro}
                  className="flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors px-4 py-2 rounded-lg hover:bg-amber-100/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                  กลับไปหน้าแรก
                </motion.button>
              </div>
              <DifficultySelect onSelect={handleDifficultySelect} />
            </motion.div>
          )}

          {gameStarted && (
            <motion.div
              className="p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-end mb-6">
                <motion.button
                  onClick={handleBackToIntro}
                  className="flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors px-4 py-2 rounded-lg hover:bg-amber-100/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                  กลับไปหน้าแรก
                </motion.button>
              </div>
              <GamePlay
                currentWordIndex={currentWordIndex}
                totalWords={shuffledList.length}
                timeLeft={timeLeft}
                isSpeaking={isSpeaking}
                showMeaning={showMeaning}
                currentWord={currentWord}
                feedback={feedback}
                userInput={userInput}
                countdownActive={countdownActive}
                onRepeatWord={repeatWord}
                onSubmit={handleSubmit}
                onInputChange={(e) => setUserInput(e.target.value)}
                inputRef={inputRef as RefObject<HTMLInputElement>}
                difficulty={difficulty as Difficulty}
              />
            </motion.div>
          )}

          {gameEnded && (
            <motion.div
              className="p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GameResultView
                totalWords={shuffledList.length}
                results={results}
                onRestart={resetGame}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 