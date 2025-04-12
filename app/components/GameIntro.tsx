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
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="flex flex-col items-center relative"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, type: 'spring', damping: 10 }}
        >
          {/* Decorative circles */}
          <motion.div 
            className="absolute w-32 h-32 rounded-full bg-amber-200/30 blur-md"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            style={{ top: '-10%', left: '15%' }}
          />
          <motion.div 
            className="absolute w-24 h-24 rounded-full bg-rose-200/30 blur-md"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -5, 0],
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            style={{ bottom: '10%', right: '10%' }}
          />
          
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
              className="text-8xl lg:text-9xl mb-2 relative z-10"
            >
              🎯
            </motion.div>
            <motion.div
              className="absolute -bottom-3 w-20 h-6 bg-amber-200/60 rounded-full blur-md -z-10 mx-auto left-0 right-0"
              animate={{ 
                width: ['5rem', '6rem', '5rem'],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          </div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent my-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            ฟังเสียงและพิมพ์คำศัพท์ภาษาอังกฤษให้ถูกต้อง
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 relative"
        >
          <div className="flex justify-center mb-8">
            <h3 className="font-bold text-2xl text-amber-800 relative inline-block">
              วิธีเล่น
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-amber-400 to-rose-400 w-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left max-w-3xl mx-auto mb-12">
            {[
              { 
                icon: '🔊', 
                title: 'ฟังเสียง', 
                description: 'ฟังคำศัพท์ภาษาอังกฤษที่ถูกอ่านออกมา',
                delay: 0.7,
                color: 'from-amber-100 to-yellow-100'
              },
              { 
                icon: '⌨️', 
                title: 'พิมพ์คำตอบ', 
                description: 'พิมพ์คำศัพท์ที่ได้ยินให้ถูกต้อง',
                delay: 0.8,
                color: 'from-orange-100 to-amber-100'
              },
              { 
                icon: '⏱️', 
                title: 'จับเวลา', 
                description: 'คุณมีเวลา 10 วินาทีในการตอบแต่ละคำ',
                delay: 0.9,
                color: 'from-rose-100 to-pink-100'
              },
              { 
                icon: '🔄', 
                title: 'ฟังซ้ำ', 
                description: 'กด Alt + R เพื่อฟังคำศัพท์อีกครั้ง',
                delay: 1.0,
                color: 'from-teal-100 to-emerald-100'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-start gap-4 bg-white/30 backdrop-blur-sm p-5 rounded-xl border border-white/40 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay }}
                whileHover={{ y: -5, transition: { delay: 0 } }}
              >
                <div className={`bg-gradient-to-br ${item.color} rounded-xl p-3 text-amber-700 flex items-center justify-center h-12 w-12 shrink-0 shadow-sm`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-amber-900">{item.title}</h4>
                  <p className="text-amber-800">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button
          onClick={onStart}
          className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xl font-bold py-5 px-16 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <span className="relative z-10">เริ่มเกม</span>
          <motion.span 
            className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-amber-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <motion.span
            className="absolute -inset-1 rounded-xl opacity-30 blur-md bg-gradient-to-r from-amber-400 to-rose-400 group-hover:opacity-50 transition-opacity"
          />
        </motion.button>
      </div>
    </motion.div>
  );
} 