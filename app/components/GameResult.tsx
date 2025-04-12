import { motion } from "framer-motion";

interface GameResultProps {
  totalWords: number;
  results: {
    word: string;
    correct: boolean;
    time: number;
  }[];
  onRestart: () => void;
}

export default function GameResult({ totalWords, results, onRestart }: GameResultProps) {
  const correctCount = results.filter(r => r.correct).length;
  
  // Calculate score as a fraction instead of percentage
  const scoreDisplay = `${correctCount}/${totalWords}`;
  
  const getEmoji = () => {
    const percentage = (correctCount / totalWords) * 100;
    if (percentage >= 80) return '🎉';
    if (percentage >= 60) return '👏';
    if (percentage >= 40) return '🌟';
    return '💪';
  };

  const getMessage = () => {
    const percentage = (correctCount / totalWords) * 100;
    if (percentage >= 80) return 'ยอดเยี่ยมมาก!';
    if (percentage >= 60) return 'ทำได้ดีมาก!';
    if (percentage >= 40) return 'พยายามได้ดี!';
    return 'ไม่เป็นไร ลองใหม่อีกครั้ง!';
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="text-9xl mb-4"
        >
          {getEmoji()}
        </motion.div>

        <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-4">
          {getMessage()}
        </h2>

        <div className="text-2xl text-amber-800 font-medium mb-6">
          คะแนนของคุณ: {scoreDisplay}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-amber-200/30 shadow-sm">
            <div className="text-amber-600 text-2xl font-bold mb-1">{correctCount}</div>
            <div className="text-amber-700">ตอบถูก</div>
          </div>
          
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-amber-200/30 shadow-sm">
            <div className="text-amber-600 text-2xl font-bold mb-1">{totalWords - correctCount}</div>
            <div className="text-amber-700">ตอบผิด</div>
          </div>
          
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-amber-200/30 shadow-sm">
            <div className="text-amber-600 text-2xl font-bold mb-1">{totalWords}</div>
            <div className="text-amber-700">คำศัพท์ทั้งหมด</div>
          </div>
        </div>

        {/* Word results list */}
        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-amber-200/30 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-amber-800 mb-4 text-left">รายการคำศัพท์</h3>
          <div className="grid gap-2 max-h-64 overflow-y-auto">
            {results.map((result, index) => (
              <div 
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg ${
                  result.correct 
                    ? 'bg-emerald-100/50 border border-emerald-200/30' 
                    : 'bg-rose-100/50 border border-rose-200/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{result.correct ? '✅' : '❌'}</span>
                  <span className="font-medium text-amber-800">{result.word}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {result.time.toFixed(1)} วินาที
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.button
          onClick={onRestart}
          className="mt-4 px-10 py-4 text-xl font-medium text-white bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          เล่นอีกครั้ง
        </motion.button>
      </div>
    </motion.div>
  );
} 