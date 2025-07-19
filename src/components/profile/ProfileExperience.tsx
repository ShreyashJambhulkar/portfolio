// src/components/profile/ProfileExperience.tsx
import { TeamMember } from '@/data/team';

interface ProfileExperienceProps {
  member: TeamMember;
}

export default function ProfileExperience({ member }: ProfileExperienceProps) {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Experience & Education</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Experience</h3>
            
            <div className="space-y-10">
              {member.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 py-1">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {exp.duration} {exp.location && `| ${exp.location}`}
                  </p>
                  
                  <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Education</h3>
            
            <div className="space-y-10">
              {member.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-secondary pl-4 py-1">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{edu.institution}</h4>
                  <p className="text-secondary font-medium">{edu.degree}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {edu.duration} | {edu.location}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">GPA:</span> {edu.gpa}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}