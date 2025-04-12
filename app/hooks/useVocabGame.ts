import { useState, useRef, useEffect } from 'react';
import { VocabWord, GameResult, FeedbackState } from '../types/vocab';
import { GAME_CONFIG, WORD_PROMPTS, VOCABULARY_LIST } from '../constants/gameConfig';

export function useVocabGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledList, setShuffledList] = useState<VocabWord[]>([]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.COUNTDOWN_TIME);
  const [results, setResults] = useState<GameResult[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState>({ 
    show: false, 
    correct: false, 
    message: "" 
  });
  const [headphonesConfirmed, setHeadphonesConfirmed] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [countdownActive, setCountdownActive] = useState(false);
  const [currentWord, setCurrentWord] = useState<VocabWord | null>(null);
  const [showMeaning, setShowMeaning] = useState(false);
  const [isChangingWord, setIsChangingWord] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCorrectRef = useRef<HTMLAudioElement>(null);
  const audioIncorrectRef = useRef<HTMLAudioElement>(null);
  const audioCompletedRef = useRef<HTMLAudioElement>(null);
  const currentWordRef = useRef<VocabWord | null>(null);
  const currentIndexRef = useRef<number>(0);

  useEffect(() => {
    currentWordRef.current = currentWord;
    currentIndexRef.current = currentWordIndex;
  }, [currentWord, currentWordIndex]);

  // สร้างฟังก์ชันสุ่มคำศัพท์
  const shuffleVocabulary = () => {
    const shuffled = [...VOCABULARY_LIST];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledList(shuffled);
    return shuffled;
  };

  // ฟังก์ชันเล่นเสียงประกอบ
  const playSound = (type: 'correct' | 'incorrect' | 'completed') => {
    try {
      const audioRef = type === 'correct' ? audioCorrectRef.current :
                      type === 'incorrect' ? audioIncorrectRef.current :
                      audioCompletedRef.current;
      
      if (audioRef) {
        audioRef.currentTime = 0;
        audioRef.play().catch(err => {
          console.log("ไม่สามารถเล่นเสียงได้:", err);
        });
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  // Move to next word
  const moveToNextWord = () => {
    if (isChangingWord) return;
    
    setIsChangingWord(true);
    setCountdownActive(false);
    setIsSpeaking(false);
    setIsTimeUp(false);
    setShowMeaning(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    const nextIndex = currentIndexRef.current + 1;
    
    if (nextIndex < shuffledList.length) {
      setCurrentWordIndex(nextIndex);
      currentIndexRef.current = nextIndex;
      setUserInput("");
      
      const nextWord = shuffledList[nextIndex];
      setCurrentWord(nextWord);
      currentWordRef.current = nextWord;
      
      setTimeout(() => {
        if (nextWord) {
          speak(nextWord.english, true);
        }
        setIsChangingWord(false);
      }, GAME_CONFIG.NEXT_WORD_DELAY);
    } else {
      setIsChangingWord(false);
      endGame();
    }
  };

  // Voice synthesis with prompt
  const speak = (text: string, withPrompt: boolean = false) => {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      setCountdownActive(false);
      setShowMeaning(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      setTimeLeft(GAME_CONFIG.COUNTDOWN_TIME);
      
      if (withPrompt) {
        const randomPrompt = WORD_PROMPTS[Math.floor(Math.random() * WORD_PROMPTS.length)];
        const promptUtterance = new SpeechSynthesisUtterance(randomPrompt);
        promptUtterance.lang = "en-US";
        promptUtterance.rate = 0.9;
        
        const wordUtterance = new SpeechSynthesisUtterance(text);
        wordUtterance.lang = "en-US";
        wordUtterance.rate = GAME_CONFIG.PRONUNCIATION_RATE;

        promptUtterance.onend = () => {
          setTimeout(() => {
            window.speechSynthesis.speak(wordUtterance);
          }, 300);
        };
        
        wordUtterance.onend = () => {
          setIsSpeaking(false);
          
          if (inputRef.current) {
            inputRef.current.focus();
          }
          
          startCountdown();
          setTimeout(() => {
            setShowMeaning(true);
          }, 100);
        };
        
        window.speechSynthesis.speak(promptUtterance);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = GAME_CONFIG.PRONUNCIATION_RATE;
        
        utterance.onend = () => {
          setIsSpeaking(false);
          
          if (inputRef.current) {
            inputRef.current.focus();
          }
          
          startCountdown();
          setTimeout(() => {
            setShowMeaning(true);
          }, 100);
        };
        
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Start countdown timer
  const startCountdown = () => {
    let currentTime = GAME_CONFIG.COUNTDOWN_TIME;
    setCountdownActive(true);
    
    timerRef.current = setInterval(() => {
      currentTime -= 1;
      setTimeLeft(currentTime);
      
      if (currentTime <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        handleTimeUp();
      }
    }, 1000);
  };

  // Handle time up
  const handleTimeUp = () => {
    if (feedback.show || isChangingWord) return;
    
    setCountdownActive(false);
    setIsTimeUp(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    const currentVocab = shuffledList[currentIndexRef.current];
    
    if (!currentVocab) {
      moveToNextWord();
      return;
    }
    
    playSound('incorrect');
    
    setResults(prev => [...prev, {
      word: currentVocab.english,
      correct: false,
      time: GAME_CONFIG.COUNTDOWN_TIME
    }]);
    
    setFeedback({
      show: true,
      correct: false,
      message: `หมดเวลา! คำตอบคือ (${currentVocab.english})`
    });
    
    setTimeout(() => {
      setFeedback({ show: false, correct: false, message: "" });
      setIsTimeUp(false);
      moveToNextWord();
    }, GAME_CONFIG.WRONG_ANSWER_DELAY);
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSpeaking || isTimeUp || feedback.show || isChangingWord) return;
    
    const currentVocab = shuffledList[currentWordIndex];
    
    if (!currentVocab) return;
    
    const timeSpent = GAME_CONFIG.COUNTDOWN_TIME - timeLeft;
    const isCorrect = userInput.trim().toLowerCase() === currentVocab.english.trim().toLowerCase();
    
    setCountdownActive(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    playSound(isCorrect ? 'correct' : 'incorrect');
    
    setResults(prev => [...prev, {
      word: currentVocab.english,
      correct: isCorrect,
      time: timeSpent
    }]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setIsChangingWord(true);
    
    setFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect ? "ถูกต้อง! 🎉" : `ไม่ถูกต้อง คำตอบคือ (${currentVocab.english})`
    });
    
    setTimeout(() => {
      setFeedback({ show: false, correct: false, message: "" });
      moveToNextWord();
    }, isCorrect ? GAME_CONFIG.FEEDBACK_DELAY : GAME_CONFIG.WRONG_ANSWER_DELAY);
  };

  // Reset game
  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCurrentWordIndex(0);
    setUserInput("");
    setScore(0);
    setTimeLeft(GAME_CONFIG.COUNTDOWN_TIME);
    setResults([]);
    setFeedback({ show: false, correct: false, message: "" });
    setIsTimeUp(false);
    setIsSpeaking(false);
    setCountdownActive(false);
    setCurrentWord(null);
    setShowMeaning(false);
    setIsChangingWord(false);
    currentWordRef.current = null;
    currentIndexRef.current = 0;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    shuffleVocabulary();
  };

  // Start game
  const startGame = () => {
    resetGame();
    setGameStarted(true);
    
    const shuffled = shuffleVocabulary();
    const firstWord = shuffled[0];
    setCurrentWord(firstWord);
    currentWordRef.current = firstWord;
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    
    setCountdownActive(false);
    
    setTimeout(() => {
      if (firstWord) {
        speak(firstWord.english, true);
      }
    }, 500);
  };

  // End game
  const endGame = () => {
    setGameEnded(true);
    setGameStarted(false);
    playSound('completed');
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    window.speechSynthesis.cancel();
  };

  // Repeat word
  const repeatWord = () => {
    if (gameStarted && !gameEnded && currentWordRef.current && !isChangingWord) {
      // พูดคำศัพท์อย่างเดียว ไม่ต้องยุ่งกับ timer
      const utterance = new SpeechSynthesisUtterance(currentWordRef.current.english);
      utterance.lang = "en-US";
      utterance.rate = GAME_CONFIG.PRONUNCIATION_RATE;
      
      // ยกเลิกเสียงที่กำลังพูดอยู่ (ถ้ามี)
      window.speechSynthesis.cancel();
      
      // พูดคำใหม่
      window.speechSynthesis.speak(utterance);
    }
  };

  // Clean up
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  return {
    // State
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
    isTimeUp,
    isSpeaking,
    countdownActive,
    currentWord,
    showMeaning,
    isChangingWord,
    
    // Refs
    inputRef,
    audioCorrectRef,
    audioIncorrectRef,
    audioCompletedRef,
    
    // Actions
    setHeadphonesConfirmed,
    setUserInput,
    startGame,
    handleSubmit,
    repeatWord,
    resetGame
  };
} 