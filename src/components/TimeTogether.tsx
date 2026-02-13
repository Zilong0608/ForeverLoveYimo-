import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const TimeTogether = () => {
  // Mock start date: 2023-02-14 (Change this to your actual anniversary)
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const startDate = new Date('2024-09-03T10:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <motion.div 
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl md:text-5xl font-bold text-rose-600 font-serif"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className="text-xs md:text-sm text-rose-400 uppercase tracking-widest mt-1">{label}</div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", duration: 1.2, bounce: 0.3 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl max-w-3xl mx-auto my-12 border border-rose-100"
    >
      <h3 className="text-center text-rose-800 text-xl font-medium mb-6 tracking-wide">我们需要在一起的时间</h3>
      <div className="flex justify-center flex-wrap">
        <TimeUnit value={time.days} label="Days" />
        <TimeUnit value={time.hours} label="Hours" />
        <TimeUnit value={time.minutes} label="Minutes" />
        <TimeUnit value={time.seconds} label="Seconds" />
      </div>
    </motion.div>
  );
};

export default TimeTogether;
