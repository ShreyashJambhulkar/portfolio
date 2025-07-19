// src/components/profile/ProfileBio.tsx
import { TeamMember } from '@/data/team';

interface ProfileBioProps {
  member: TeamMember;
}

export default function ProfileBio({ member }: ProfileBioProps) {
  return (
    <section className="py-12 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">About Me</h2>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {member.longBio.map((paragraph, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300 mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Interests */}
        {member.interests && member.interests.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {member.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}