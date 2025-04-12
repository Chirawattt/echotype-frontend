import { motion } from 'framer-motion';
import { Difficulty } from '../types/vocab';

interface DifficultySelectProps {
  onSelect: (difficulty: Difficulty) => void;
}

const difficultyInfo = {
  easy: {
    title: 'ง่าย',
    description: 'เหมาะสำหรับผู้เริ่มต้น คำศัพท์พื้นฐานที่ใช้ในชีวิตประจำวัน',
    icon: '🌱',
    color: 'from-emerald-200 to-teal-200',
    hoverColor: 'from-emerald-300 to-teal-300',
    bgColor: 'bg-emerald-50/70',
    textColor: 'text-emerald-800'
  },
  medium: {
    title: 'ปานกลาง',
    description: 'สำหรับผู้ที่มีพื้นฐานภาษาอังกฤษ คำศัพท์ที่ใช้ทั่วไป',
    icon: '🌿',
    color: 'from-amber-200 to-yellow-200',
    hoverColor: 'from-amber-300 to-yellow-300',
    bgColor: 'bg-amber-50/70',
    textColor: 'text-amber-800'
  },
  hard: {
    title: 'ยาก',
    description: 'สำหรับผู้ที่มีทักษะภาษาอังกฤษดี คำศัพท์ที่ซับซ้อน',
    icon: '🌳',
    color: 'from-rose-200 to-pink-200',
    hoverColor: 'from-rose-300 to-pink-300',
    bgColor: 'bg-rose-50/70',
    textColor: 'text-rose-800'
  }
};

export default function DifficultySelect({ onSelect }: DifficultySelectProps) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-center text-amber-800 mb-8">เลือกระดับความยาก</h2>
      <div className="grid gap-6">
        {(Object.keys(difficultyInfo) as Difficulty[]).map((level, index) => (
          <motion.button
            key={level}
            onClick={() => onSelect(level)}
            className={`w-full p-6 rounded-2xl text-left ${difficultyInfo[level].bgColor} backdrop-blur-sm border border-${level === 'easy' ? 'emerald' : level === 'medium' ? 'amber' : 'rose'}-200/30 shadow-sm hover:shadow-md transition-all duration-300`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4">
              <div className={`text-4xl bg-gradient-to-r ${difficultyInfo[level].color} rounded-full p-4 w-16 h-16 flex items-center justify-center`}>
                {difficultyInfo[level].icon}
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${difficultyInfo[level].textColor}`}>
                  {difficultyInfo[level].title}
                </h3>
                <p className="text-lg text-amber-700">
                  {difficultyInfo[level].description}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
} 