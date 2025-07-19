// src/components/profile/ProfileSkills.tsx
import { TeamMember } from '@/data/team';

interface ProfileSkillsProps {
  member: TeamMember;
}

export default function ProfileSkills({ member }: ProfileSkillsProps) {
  return (
    <section className="py-12 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Skills & Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {member.skills.map((skillCategory, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-sm transition-colors duration-200"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {skillCategory.category}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {skillCategory.items.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full text-sm shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}