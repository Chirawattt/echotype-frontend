import { motion } from "framer-motion";

interface GameIntroProps {
  onStart: () => void;
}

export default function GameIntro({ onStart }: GameIntroProps) {
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <p className="mb-6 text-lg text-gray-700 font-medium">ฟังเสียงและพิมพ์คำศัพท์ภาษาอังกฤษให้ถูกต้อง</p>
      <div className="bg-indigo-50 rounded-xl p-4 mb-6 text-left">
        <h3 className="font-bold text-indigo-800 mb-2">วิธีเล่น:</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>กดปุ่ม &quot;เริ่มเกม&quot; เพื่อเริ่มเล่น</li>
          <li>ฟังเสียงและพิมพ์คำศัพท์ที่ได้ยิน</li>
          <li>กด Alt + R เพื่อฟังซ้ำ</li>
          <li>คุณมีเวลาคำละ 10 วินาที</li>
          <li>ตอบให้ถูกต้องเพื่อรับคะแนน</li>
        </ul>
      </div>
      <motion.button
        onClick={onStart}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all hover:shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        เริ่มเกม
      </motion.button>
    </motion.div>
  );
} 