// src/components/sections/Projects.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // Extract all unique technologies used in projects
  const allTechnologies = Array.from(
    new Set(
      projects.flatMap((project) => project.technologies)
    )
  ).sort();
  
  // Update filtered projects when filter changes
  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else if (filter === 'vishwatej' || filter === 'shreyash') {
      setFilteredProjects(
        projects.filter((project) => project.teamMembers.includes(filter))
      );
    } else {
      // Filter by technology
      setFilteredProjects(
        projects.filter((project) => project.technologies.includes(filter))
      );
    }
  }, [filter]);
  
  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Our Projects
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12 transition-colors duration-200">
          Explore our technical projects that showcase our skills, creativity, and problem-solving abilities.
        </p>
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition-all ${
              filter === 'all'
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200'
            }`}
          >
            All Projects
          </button>
          
          <button
            onClick={() => setFilter('vishwatej')}
            className={`px-4 py-2 rounded-full transition-all ${
              filter === 'vishwatej'
                ? 'bg-primary text-white'
                : 'bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50'
            }`}
          >
            Vishwatej's Projects
          </button>
          
          <button
            onClick={() => setFilter('shreyash')}
            className={`px-4 py-2 rounded-full transition-all ${
              filter === 'shreyash'
                ? 'bg-secondary text-white'
                : 'bg-purple-50 dark:bg-purple-900/30 text-secondary dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50'
            }`}
          >
            Shreyash's Projects
          </button>
          
          {/* Technology filters */}
          <div className="w-full flex justify-center mt-4">
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {allTechnologies.slice(0, 10).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    filter === tech
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {tech}
                </button>
              ))}
              {allTechnologies.length > 10 && (
                <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                  +{allTechnologies.length - 10} more
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <h3 className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
                  No projects found with this filter
                </h3>
                <button
                  onClick={() => setFilter('all')}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  View all projects
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}