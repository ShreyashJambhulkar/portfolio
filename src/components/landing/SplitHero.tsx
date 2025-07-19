// src/components/landing/SplitHero.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimationControls } from 'framer-motion';

export default function SplitHero() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!leftRef.current || !rightRef.current) return;
      
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      if (scrollY < viewportHeight) {
        const movePercent = (scrollY / viewportHeight) * 30;
        leftRef.current.style.transform = `translateX(-${movePercent}%)`;
        rightRef.current.style.transform = `translateX(${movePercent}%)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="h-screen overflow-hidden relative">
      <div className="absolute inset-0 flex">
        {/* Left side - Vishwatej */}
        <div 
          ref={leftRef}
          className="w-1/2 relative bg-gradient-to-br from-blue-900 to-purple-900 transition-transform duration-100"
        >
          <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-8 z-10 text-white">
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Vishwatej Shende
            </motion.h2>
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-cyan-300 mb-8"
            >
              Information Technology Student
            </motion.p>
            <Link href="/profile/vishwatej">
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="px-6 py-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all cursor-pointer flex items-center gap-2"
              >
                View Profile
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </Link>
          </div>
        </div>
        
        {/* Right side - Shreyash */}
        <div 
          ref={rightRef}
          className="w-1/2 relative bg-gradient-to-br from-emerald-900 to-teal-900 transition-transform duration-100"
        >
          <div className="absolute inset-0 bg-emerald-900 opacity-50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-8 z-10 text-white">
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Shreyash Jambhulkar
            </motion.h2>
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-teal-300 mb-8"
            >
              Information Technology Student
            </motion.p>
            <Link href="/profile/shreyash">
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="px-6 py-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all cursor-pointer flex items-center gap-2"
              >
                View Profile
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Central Logo/Title */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 1.2, 
            duration: 0.8, 
            ease: [0.16, 1.16, 0.4, 1] // Spring-like bounce
          }}
          className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-2xl transition-colors duration-200"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Code Greek
          </h1>
        </motion.div>
      </div>
    </section>
  );
}