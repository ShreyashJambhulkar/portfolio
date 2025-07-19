// src/components/ui/CodingProfileCard.tsx
import { motion } from 'framer-motion';
import { CompetitiveCoding } from '@/types';

const platformColors: { [key: string]: string } = {
  'Codeforces': 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-400 dark:text-red-300',
  'CodeChef': 'bg-amber-100 border-amber-500 text-amber-800 dark:bg-amber-900/30 dark:border-amber-400 dark:text-amber-300',
  'LeetCode': 'bg-yellow-100 border-yellow-500 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-400 dark:text-yellow-300',
  'AtCoder': 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300',
  'GeeksforGeeks': 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-400 dark:text-green-300',
  'HackerRank': 'bg-emerald-100 border-emerald-500 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-400 dark:text-emerald-300',
  'default': 'bg-gray-100 border-gray-500 text-gray-800 dark:bg-gray-800 dark:border-gray-400 dark:text-gray-300',
};

const getPlatformColor = (platform: string) => {
  return platformColors[platform] || platformColors.default;
};

interface CodingProfileCardProps {
  profile: CompetitiveCoding;
}

export default function CodingProfileCard({ profile }: CodingProfileCardProps) {
  const platformColor = getPlatformColor(profile.platform);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`${platformColor} border-l-4 rounded-lg overflow-hidden shadow-md transition-colors duration-200`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold">{profile.platform}</h3>
            <a 
              href={profile.profileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:underline inline-flex items-center gap-1"
            >
              @{profile.username}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          
          {profile.rank && (
            <span className="px-2 py-1 bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 rounded-full text-xs font-medium transition-colors duration-200">
              {profile.rank}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {profile.rating && (
            <div className="text-center p-2 bg-white dark:bg-gray-700 bg-opacity-40 dark:bg-opacity-40 rounded transition-colors duration-200">
              <span className="block text-sm font-medium">Rating</span>
              <span className="block text-lg font-bold">{profile.rating}</span>
            </div>
          )}
          
          {profile.solved && (
            <div className="text-center p-2 bg-white dark:bg-gray-700 bg-opacity-40 dark:bg-opacity-40 rounded transition-colors duration-200">
              <span className="block text-sm font-medium">Problems Solved</span>
              <span className="block text-lg font-bold">{profile.solved}+</span>
            </div>
          )}
        </div>
        
        {profile.achievements && profile.achievements.length > 0 && (
          <div>
            <h4 className="text-sm font-bold mb-2">Achievements</h4>
            <ul className="space-y-1">
              {profile.achievements.map((achievement, index) => (
                <li 
                  key={index} 
                  className="text-xs flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}