import { motion } from "framer-motion";
import { GameResult } from "../types/vocab";

interface GameResultProps {
  score: number;
  totalWords: number;
  results: GameResult[];
  onRestart: () => void;
}

export default function GameResultView({ score, totalWords, results, onRestart }: GameResultProps) {
  return (
    <motion.div
      className="text-center bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-800">ผลคะแนน</h2>
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <p className="text-3xl font-bold mb-2 text-purple-900">
          {score} / {totalWords}
        </p>
        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
            style={{ width: `${(score / totalWords) * 100}%` }}
          />
        </div>
        <p className="text-gray-600">
          {score === totalWords 
            ? "เยี่ยมมาก! คะแนนเต็ม" 
            : score > totalWords / 2 
              ? "ดีมาก! ลองอีกครั้งเพื่อทำให้ดีขึ้น" 
              : "พยายามต่อไป! คุณสามารถทำได้ดีกว่านี้"}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-bold mb-3 text-purple-800 text-xl">รายละเอียด:</h3>
        <div className="space-y-3 p-4 max-h-80 overflow-y-auto">
          {results.map((result, index) => (
            <motion.div 
              key={index} 
              className={`p-3 rounded-lg flex justify-between items-center ${
                result.correct ? "bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500" : "bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500"
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="font-medium text-gray-800">
                {result.word} {result.correct ? "✅" : "❌"}
              </span>
              <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                {result.time} วินาที
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <motion.button
          onClick={onRestart}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          เล่นอีกครั้ง
        </motion.button>
      </div>
    </motion.div>
  );
} 