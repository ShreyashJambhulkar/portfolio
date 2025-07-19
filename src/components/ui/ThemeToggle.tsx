// src/components/ui/ThemeToggle.tsx
'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center transition duration-300 focus:outline-none shadow"
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 26 : 2,
          backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      >
        {theme === 'dark' ? (
          <svg className="w-3 h-3 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3a9 9 0 109 9 9.1 9.1 0 00-9-9zm0 16a7 7 0 117-7 7 7 0 01-7 7z"></path>
            <path d="M12 19a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zm0-17a1 1 0 01-1-1V1a1 1 0 012 0v1a1 1 0 01-1 1zm8.66 3.34a1 1 0 01-1.41 0l-.71-.71a1 1 0 011.41-1.41l.71.71a1 1 0 010 1.41zm-18.61.71l.71-.71a1 1 0 011.41 1.41l-.71.71a1 1 0 01-1.41-1.41zM12 6a6 6 0 106 6 6 6 0 00-6-6zm12 5h-1a1 1 0 010-2h1a1 1 0 010 2zM3 11a1 1 0 01-1-1H1a1 1 0 010-2h1a1 1 0 011 1zm16.95 7.05a1 1 0 01-1.41 0l-.71-.71a1 1 0 011.41-1.41l.71.71a1 1 0 010 1.41zm-16.9 0a1 1 0 01-1.41-1.41l.71-.71a1 1 0 011.41 1.41z"></path>
          </svg>
        ) : (
          <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm9 9h-1a1 1 0 110-2h1a1 1 0 110 2zm-9 9a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-7.07-7.07a1 1 0 01-.71-.29l-.71-.71a1 1 0 011.41-1.41l.71.71a1 1 0 01-.71 1.71zM12 6a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8zM3.07 3.05a1 1 0 011.41 0l.71.71a1 1 0 01-1.41 1.41l-.71-.71a1 1 0 010-1.41z"></path>
          </svg>
        )}
      </motion.div>
    </button>
  );
}