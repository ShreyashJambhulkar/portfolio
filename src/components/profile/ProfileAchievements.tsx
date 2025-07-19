// src/components/profile/ProfileAchievements.tsx
import { TeamMember } from '@/data/team';

interface ProfileAchievementsProps {
  member: TeamMember;
}

export default function ProfileAchievements({ member }: ProfileAchievementsProps) {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Achievements</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-200">
          <ul className="space-y-4">
            {member.achievements.map((achievement, index) => (
              <li 
                key={index}
                className="flex items-start gap-3"
              >
                <span className="text-primary dark:text-blue-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-gray-300 text-lg">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}