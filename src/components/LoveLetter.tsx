import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, type: "spring", bounce: 0.2 }}
      className="py-20 flex flex-col items-center justify-center relative z-10"
    >
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white shadow-2xl p-8 max-w-2xl w-full mx-4 cursor-pointer relative overflow-hidden transition-all duration-700 ${isOpen ? 'rounded-2xl' : 'rounded-lg hover:shadow-rose-300/50'}`}
        initial={{ borderRadius: "1rem" }}
      >
        {!isOpen ? (
          <div className="flex flex-col items-center py-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="w-16 h-16 text-rose-500 fill-current" />
            </motion.div>
            <h3 className="mt-6 text-2xl text-rose-800 font-serif">点击开启给你的信</h3>
            <p className="mt-2 text-rose-400">To: My Love</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Heart className="w-40 h-40 text-rose-300 fill-current" />
            </div>
            
            <h2 className="text-3xl font-serif text-rose-900 mb-8 font-bold">亲爱的小公主 ：</h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed font-serif text-lg">
              <p>
                在这个特别的日子里，我想告诉你，遇见你是我这辈子最幸运的事。
              </p>
              <p>
                即使我们在一起很久了，每次看到你的笑容，我的心跳还是会不由自主地加速。谢谢你包容我的小缺点，谢谢你陪我度过每一个平凡或不平凡的日子。
              </p>
              <p>
                我想和你一起看遍世间所有的风景，从日出到日落，从春夏到秋冬。未来的路还很长，但我知道，只要牵着你的手，就没有什么是不可能的。
              </p>
              <p>
                小公主 姐姐 宝宝 老婆 媳妇儿 我好爱你 可能我确实有的时候做的有问题 但我不断地加油努力 让你成为全世界最幸福的人 我想让你在我身边一辈子无忧无虑 可能现在说这个话没有依据 但我的心非常的坚定 希望你可以相信我
              </p>
              <p>
                情人节快乐，我的唯一。
              </p>
            </div>
            
            <div className="mt-10 text-right">
              <p className="text-rose-800 font-bold text-xl">永远爱你的</p>
              <p className="text-rose-600 mt-2">小骑士</p>
            </div>
            
            <div className="mt-8 text-center">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
              >
                收起信件
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LoveLetter;
