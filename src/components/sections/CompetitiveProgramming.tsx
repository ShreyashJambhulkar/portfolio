// src/components/sections/CompetitiveProgramming.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vishwatejProfiles, shreyashProfiles, codingContestAchievements } from '@/data/competitive';
import CodingProfileCard from '@/components/ui/CodingProfileCard';
import ContestAchievements from '@/components/ui/ContestAchievements';
import AlgorithmCanvas from '@/components/ui/AlgorithmCanvas';

export default function CompetitiveProgramming() {
  const [activeTab, setActiveTab] = useState('vishwatej');
  
  return (
    <section id="competitive" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200 relative overflow-hidden">
      {/* Algorithm Animation Background */}
      <AlgorithmCanvas />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Competitive Programming
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-200">
            Explore our competitive programming profiles, ratings, and achievements across various coding platforms.
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors duration-200">
            <button
              onClick={() => setActiveTab('vishwatej')}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === 'vishwatej'
                  ? 'bg-primary text-white shadow'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Vishwatej
            </button>
            <button
              onClick={() => setActiveTab('shreyash')}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === 'shreyash'
                  ? 'bg-secondary text-white shadow'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Shreyash
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'vishwatej' && (
            <motion.div
              key="vishwatej"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
            >
              {vishwatejProfiles.map((profile) => (
                <CodingProfileCard key={profile.platform} profile={profile} />
              ))}
            </motion.div>
          )}
          
          {activeTab === 'shreyash' && (
            <motion.div
              key="shreyash"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
            >
              {shreyashProfiles.map((profile) => (
                <CodingProfileCard key={profile.platform} profile={profile} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Contest Achievements - Shown below profiles */}
        <div className="mt-16 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl">
          <ContestAchievements contests={codingContestAchievements} />
        </div>
      </div>
    </section>
  );
}