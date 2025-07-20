// src/components/ui/ActivityCard.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageGallery from './ImageGallery';
import { ExtracurricularActivitys } from '@/types';

interface ActivityCardProps {
  activity: ExtracurricularActivitys;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const formattedDate = activity.date 
    ? activity.date 
    : activity.startDate && activity.endDate 
      ? `${activity.startDate} - ${activity.endDate}`
      : '';
  
  return (
    <motion.div
      layout
      className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{activity.title}</h3>
        
        {(activity.organization || activity.role || formattedDate) && (
          <div className="flex flex-wrap gap-y-2 mb-3 text-sm">
            {activity.organization && (
              <div className="w-full sm:w-auto sm:pr-3 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="dark:text-gray-300">{activity.organization}</span>
              </div>
            )}
            
            {activity.role && (
              <div className="w-full sm:w-auto sm:pr-3 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="dark:text-gray-300">{activity.role}</span>
              </div>
            )}
            
            {formattedDate && (
              <div className="w-full sm:w-auto flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="dark:text-gray-300">{formattedDate}</span>
              </div>
            )}
          </div>
        )}
        
        <div className={`${expanded ? 'max-h-none' : 'max-h-24 overflow-hidden'} relative`}>
          <p className="text-gray-600 dark:text-gray-300">
            {activity.description}
          </p>
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-700 to-transparent"></div>
          )}
        </div>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-primary hover:underline inline-flex items-center"
        >
          {expanded ? 'Show less' : 'Read more'}
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {activity.tags && (
          <div className="mt-4 flex flex-wrap gap-1">
            {activity.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {activity.images && activity.images.length > 0 && (
        <div className="p-6 pt-0">
          <ImageGallery images={activity.images} title={activity.title} />
        </div>
      )}
      
      {activity.link && (
        <div className="px-6 pb-4">
          <a 
            href={activity.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-secondary hover:underline"
          >
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </motion.div>
  );
}