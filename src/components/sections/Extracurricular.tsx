// src/components/sections/Extracurricular.tsx
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { activities } from '@/data/extracurricular';
import ActivityCard from '@/components/ui/ActivityCard';

export default function Extracurricular() {
  const [filter, setFilter] = useState('all');
  
  // Get all unique tags for filtering
  const allTags = Array.from(
    new Set(
      activities.flatMap(activity => activity.tags || [])
    )
  ).sort();
  
  // Filter activities based on the selected tag
  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.tags?.includes(filter));
  
  return (
    <section id="extracurricular" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Extracurricular Activities
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-200">
            Beyond academics and coding, we engage in various activities that shape our leadership, teamwork, and problem-solving abilities.
          </p>
        </div>
        
        {/* Tag filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition-all ${
              filter === 'all'
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200'
            }`}
          >
            All Activities
          </button>
          
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === tag
                  ? 'bg-accent text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Activities grid */}
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
            
            {filteredActivities.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <p className="text-xl text-gray-500 dark:text-gray-400">No activities found with this filter.</p>
                <button
                  onClick={() => setFilter('all')}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Show all activities
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}