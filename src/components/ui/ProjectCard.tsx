// src/components/ui/ProjectCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg h-full flex flex-col transition-colors duration-200"
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={project.thumbnail || '/images/projects/placeholder.jpg'}
          alt={project.title}
          fill
          style={{ 
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 500ms'
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {project.featured && (
          <span className="absolute top-3 right-3 bg-yellow-400 dark:bg-yellow-500 text-yellow-900 dark:text-yellow-950 text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow transition-colors duration-200">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-200">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        
        <div className="flex justify-between">
          {project.sourceUrl && (
            <a 
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-blue-400 hover:underline text-sm flex items-center gap-1 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </a>
          )}
          
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary dark:text-purple-400 hover:underline text-sm flex items-center gap-1 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}