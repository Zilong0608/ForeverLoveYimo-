import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Music, Volume2, VolumeX } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import TimeTogether from './components/TimeTogether';
import PhotoGallery from './components/PhotoGallery';
import LoveLetter from './components/LoveLetter';
import LuckyWheel from './components/LuckyWheel';

// 🎵 这里放回了网络链接模式
// 默认填入了一首非常浪漫的钢琴曲（Pixabay免版权），确保100%能播放
// 如果你之后有了 Jar of Love 的直链（比如来自 Dropbox/Google Drive），直接替换下面这个引号里的地址即可
const MUSIC_URL = "/bgm.mp3";
const MUSIC_TITLE = "Romantic Moment (For My Love)";

const HeroSection = () => {
  const line1 = "Happy Valentine's Day";
  const line2 = "To My One and Only";

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center relative z-10 px-4">
      <motion.div 
        className="text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-hidden flex flex-wrap justify-center gap-x-2 md:gap-x-4 mb-4">
          {line1.split(" ").map((word, index) => (
             <motion.span variants={child} key={index} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-rose-800">
               {word}
             </motion.span>
          ))}
        </div>
        
        <div className="overflow-hidden flex justify-center">
          <motion.div 
            variants={child} 
            className="text-xl md:text-3xl text-rose-500 font-light tracking-widest mt-4"
          >
            —— {line2} ——
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce"
      >
        <div className="w-6 h-10 border-2 border-rose-300 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-rose-400 rounded-full animate-ping"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [clicks, setClicks] = useState<{id: number, x: number, y: number}[]>([]);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playMusic = async () => {
      if (audioRef.current && isPlaying) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.log("等待交互后播放");
        }
      } else if (audioRef.current && !isPlaying) {
        audioRef.current.pause();
      }
    };
    playMusic();
  }, [isPlaying]);

  const toggleMusic = (e?: React.MouseEvent) => {
    e?.stopPropagation(); 
    setIsPlaying(!isPlaying);
  };

  const handleBurst = (e: React.MouseEvent) => {
    if (audioRef.current && audioRef.current.paused && isPlaying) {
      audioRef.current.play().catch(e => console.error(e));
    }

    const id = Date.now();
    const { clientX, clientY } = e;
    setClicks([...clicks, { id, x: clientX, y: clientY }]);
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== id));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100 relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      <FloatingHearts />
      <LuckyWheel isOpen={isWheelOpen} onClose={() => setIsWheelOpen(false)} />
      
      <audio ref={audioRef} loop autoPlay>
        <source src={MUSIC_URL} type="audio/mpeg" />
      </audio>

      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-rose-100 hidden md:block"
            >
              <div className="flex items-center gap-2">
                <span className="flex gap-0.5 items-end h-3">
                   <motion.span animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-0.5 bg-rose-500 rounded-full" />
                   <motion.span animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.1 }} className="w-0.5 bg-rose-500 rounded-full" />
                   <motion.span animate={{ height: [6, 10, 6] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-0.5 bg-rose-500 rounded-full" />
                </span>
                <span className="text-xs text-rose-800 font-medium truncate max-w-[150px]">{MUSIC_TITLE}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={toggleMusic}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 ${isPlaying ? 'bg-rose-500 text-white rotate-180 shadow-rose-300/50' : 'bg-white text-rose-500 hover:bg-rose-50'}`}
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 size={24} />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-200"></span>
              </span>
            </div>
          ) : (
            <VolumeX size={24} />
          )}
        </button>
      </div>

      <main className="relative z-10" onClick={handleBurst}>
        <HeroSection />
        
        <div className="container mx-auto px-4 space-y-24 pb-32">
          <TimeTogether />
          <PhotoGallery />
          <LoveLetter />
          
          <div className="text-center pb-20">
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-rose-300 hover:bg-rose-700 transition-colors flex items-center gap-2 mx-auto"
              onClick={(e) => {
                e.stopPropagation();
                setIsWheelOpen(true);
              }}
            >
              <Heart className="fill-current" /> 点我有惊喜
            </motion.button>
            <p className="mt-4 text-rose-400 text-sm">Design with love for you</p>
          </div>
        </div>
      </main>
      
      <AnimatePresence>
        {clicks.map(({ id, x, y }) => (
           <div key={id} style={{ left: x, top: y }} className="fixed pointer-events-none z-50">
             {[...Array(12)].map((_, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                 animate={{ 
                   opacity: 0, 
                   scale: Math.random() * 1 + 0.5,
                   x: (Math.random() - 0.5) * 400,
                   y: (Math.random() - 0.5) * 400
                 }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 className="absolute"
               >
                 <Heart className="text-rose-500 fill-rose-500 w-8 h-8" />
               </motion.div>
             ))}
           </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
