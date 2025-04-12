"use client";

import { motion } from "framer-motion";
import { useVocabGame } from "../hooks/useVocabGame";
import GameIntro from "./GameIntro";
import GamePlay from "./GamePlay";
import GameResultView from "./GameResult";
import { RefObject } from "react";

export default function VocabGame() {
  const {
    gameStarted,
    gameEnded,
    currentWordIndex,
    shuffledList,
    userInput,
    score,
    timeLeft,
    results,
    feedback,
    headphonesConfirmed,
    isSpeaking,
    countdownActive,
    currentWord,
    showMeaning,
    inputRef,
    audioCorrectRef,
    audioIncorrectRef,
    audioCompletedRef,
    setHeadphonesConfirmed,
    setUserInput,
    startGame,
    handleSubmit,
    repeatWord,
    resetGame
  } = useVocabGame();

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-purple-100">
      {/* Audio Elements */}
      <audio ref={audioCorrectRef} src="/correct.mp3" preload="auto" />
      <audio ref={audioIncorrectRef} src="/incorrect.mp3" preload="auto" />
      <audio ref={audioCompletedRef} src="/completed.wav" preload="auto" />
      
      <motion.h1 
        className="text-3xl font-bold text-center mb-8 text-purple-800 bg-gradient-to-r from-purple-200 to-blue-100 p-4 rounded-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        คำศัพท์ภาษาอังกฤษ
      </motion.h1>

      {!gameStarted && !gameEnded && !headphonesConfirmed && (
        <GameIntro onStart={() => setHeadphonesConfirmed(true)} />
      )}

      {!gameStarted && !gameEnded && headphonesConfirmed && (
        <motion.div
          className="text-center bg-blue-50 p-6 rounded-xl border border-blue-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-6xl mb-4">🎧</div>
          <h2 className="text-xl font-bold mb-3 text-blue-800">โปรดใส่หูฟังเพื่อเล่นเกมนี้</h2>
          <p className="mb-6 text-gray-700">
            เกมนี้จะมีการออกเสียงคำศัพท์ภาษาอังกฤษ การใส่หูฟังจะช่วยให้คุณได้ยินชัดเจนและเล่นได้อย่างมีประสิทธิภาพมากขึ้น
          </p>
          <div className="flex gap-3 justify-center">
            <motion.button
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ฉันพร้อมแล้ว
            </motion.button>
          </div>
        </motion.div>
      )}

      {gameStarted && (
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
        />
      )}

      {gameEnded && (
        <GameResultView
          score={score}
          totalWords={shuffledList.length}
          results={results}
          onRestart={resetGame}
        />
      )}
    </div>
  );
} 