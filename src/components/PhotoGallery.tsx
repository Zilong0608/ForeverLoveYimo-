import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import firstPhoto from 'figma:asset/cf9d23c806c2bed68f4256921fb2ae3d0196fe2e.png';
import secondPhoto from 'figma:asset/3aaa84cad4eef810f942f6826f2566e710e6d39c.png';
import thirdPhoto from 'figma:asset/8126d150d3dd6e8ebda2c59f385b8146310a1598.png';
import fourthPhoto from 'figma:asset/39933fba748e40b7372ec43aade242a39349e760.png';
import fifthPhoto from 'figma:asset/ebcc577578148837e229437f36d8d2d1e84a102d.png';
import sixthPhoto from 'figma:asset/1fba10be5b32972eb894b3bc0015a0c31fcd83b8.png';

const photos = [
  {
    url: firstPhoto,
    caption: "我们的第一张合影"
  },
  {
    url: secondPhoto,
    caption: "我们第一次出远门玩"
  },
  {
    url: thirdPhoto,
    caption: "我们第一次回新西兰"
  },
  {
    url: fourthPhoto,
    caption: "我们第一次出国旅行"
  },
  {
    url: fifthPhoto,
    caption: "我们第一次户外照片"
  },
  {
    url: sixthPhoto,
    caption: "在星空下许愿我要和你在一起一辈子"
  }
];

const PhotoGallery = () => {
  return (
    <div className="py-20 px-4">
      <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl text-center text-rose-900 font-serif mb-12"
      >
        我们的甜蜜瞬间
      </motion.h2>
      
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.15, duration: 0.8, type: "spring", bounce: 0.4 }}
            whileHover={{ y: -20, rotate: index % 2 === 0 ? 3 : -3, transition: { duration: 0.3 } }}
            className="bg-white p-3 pb-8 rounded-sm shadow-lg hover:z-10 relative group w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
            style={{ transformOrigin: "center" }}
          >
            <div className="overflow-hidden aspect-[3/4] mb-4 bg-gray-100">
               <ImageWithFallback 
                 src={photo.url} 
                 alt={photo.caption}
                 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
               />
            </div>
            <p className="text-center font-handwriting text-rose-800 text-lg font-medium px-2">{photo.caption}</p>
            <div className="absolute top-0 left-0 w-full h-full bg-rose-500/0 group-hover:bg-rose-500/10 transition-colors duration-300 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
