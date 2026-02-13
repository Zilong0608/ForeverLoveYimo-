import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 0] }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          className="absolute text-pink-200/40 text-4xl"
          style={{ left: `${heart.left}%` }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
