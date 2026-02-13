import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Sparkles } from 'lucide-react';

interface LuckyWheelProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRIZES = [
  "一张瑟瑟小裸照",
  "舔jiojio一次",
  "给姐姐看一次起飞",
  "小红包一个",
  "这次可惜咯",
  "叫好老公就可以再抽一次",
  "满足姐姐一个变态小愿望"
];

const COLORS = [
  "#FF99A8", // Light Pink
  "#FF6B8B", // Rose Pink
  "#FF3366", // Reddish Pink
  "#E63946", // Red
  "#FB6F92", // Hot Pink
  "#FF8FA3", // Soft Pink
  "#FFB3C1"  // Pale Pink
];

const LuckyWheel: React.FC<LuckyWheelProps> = ({ isOpen, onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<string | null>(null);
  const [hasSpun, setHasSpun] = useState(false);

  // 每次打开弹窗时，重置状态，允许重新抽奖
  useEffect(() => {
    if (isOpen) {
      setIsSpinning(false);
      setPrize(null);
      setHasSpun(false);
      setRotation(0);
    }
  }, [isOpen]);

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    
    // Randomize result
    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    const selectedPrize = PRIZES[randomIndex];
    
    const segmentAngle = 360 / PRIZES.length;
    // Add extra spins (5-10 full spins)
    const extraSpins = 360 * (5 + Math.floor(Math.random() * 5));
    
    const segmentCenter = (randomIndex * segmentAngle) + (segmentAngle / 2);
    const targetRotation = 270 - segmentCenter + extraSpins;
    
    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setPrize(selectedPrize);
      setHasSpun(true);
    }, 4000); // Animation duration
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-serif text-rose-800 font-bold flex items-center justify-center gap-2">
                <Gift className="text-rose-500" /> 惊喜大转盘
              </h3>
              <p className="text-rose-400 text-sm mt-1">亲爱的小公主，看看你会抽到什么！</p>
            </div>

            {!prize && !hasSpun ? (
              <div className="relative w-64 h-64 mx-auto mb-8">
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
                  <div className="w-4 h-8 bg-rose-600 rounded-b-full shadow-md border-2 border-white"></div>
                </div>

                {/* Wheel */}
                <motion.div
                  className="w-full h-full rounded-full border-4 border-rose-200 shadow-xl overflow-hidden relative"
                  animate={{ rotate: rotation }}
                  transition={{ duration: 4, ease: "circOut" }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {PRIZES.map((item, index) => {
                      const angle = 360 / PRIZES.length;
                      const startAngle = index * angle;
                      const endAngle = (index + 1) * angle;
                      
                      const x1 = 50 + 50 * Math.cos(Math.PI * startAngle / 180);
                      const y1 = 50 + 50 * Math.sin(Math.PI * startAngle / 180);
                      const x2 = 50 + 50 * Math.cos(Math.PI * endAngle / 180);
                      const y2 = 50 + 50 * Math.sin(Math.PI * endAngle / 180);
                      
                      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
                      
                      return (
                        <g key={index}>
                          <path d={pathData} fill={COLORS[index % COLORS.length]} />
                          <text
                            x="50"
                            y="50"
                            fill="white"
                            fontSize="4"
                            fontWeight="bold"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            transform={`rotate(${startAngle + angle / 2}, 50, 50) translate(25, 0)`}
                          >
                            {item.length > 4 ? item.substring(0, 4) + '...' : item}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </motion.div>
                
                {/* Center Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                   <button
                     onClick={spinWheel}
                     disabled={isSpinning}
                     className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-rose-100 text-rose-600 font-bold text-sm hover:scale-105 transition-transform disabled:opacity-80 disabled:hover:scale-100"
                   >
                     {isSpinning ? "..." : "开始"}
                   </button>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-rose-500" />
                </div>
                <h4 className="text-xl text-gray-600 mb-2">恭喜你获得</h4>
                <div className="text-3xl font-bold text-rose-600 mb-6 font-serif">{prize}</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={spinWheel} 
                  className="px-6 py-2 bg-rose-500 text-white rounded-full text-sm font-bold shadow-lg hover:bg-rose-600 transition-colors hidden"
                >
                  再玩一次
                </motion.button>
                <p className="text-gray-400 text-sm">快去找你的小骑士兑换奖励吧！</p>
                <button 
                  onClick={() => {
                     // Reset internal state to play again immediately without closing
                     setIsSpinning(false);
                     setPrize(null);
                     setHasSpun(false);
                     setRotation(0);
                  }}
                  className="mt-6 text-rose-400 text-xs underline hover:text-rose-600"
                >
                  不满意？再抽一次
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LuckyWheel;
