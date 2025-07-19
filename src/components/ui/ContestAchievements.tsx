// src/components/ui/ContestAchievements.tsx
import { motion } from 'framer-motion';

interface ContestProps {
  title: string;
  results: string[];
}

export default function ContestAchievements({ 
  contests 
}: { 
  contests: ContestProps[] 
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
      <h3 className="text-2xl font-bold mb-6 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Contest Achievements
        </span>
      </h3>
      
      <div className="space-y-8">
        {contests.map((contest, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="border-l-4 border-accent pl-4"
          >
            <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{contest.title}</h4>
            <ul className="space-y-1">
              {contest.results.map((result, index) => (
                <li 
                  key={index}
                  className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                >
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {result}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}