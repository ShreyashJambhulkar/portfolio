// src/components/profile/ProfileHero.tsx
import Image from 'next/image';
import { TeamMember } from '@/data/team';

interface ProfileHeroProps {
  member: TeamMember;
}

export default function ProfileHero({ member }: ProfileHeroProps) {
  return (
    <section className="relative">
      {/* Cover Image */}
      <div className="relative h-[300px] md:h-[400px] w-full">
        <Image
          src={member.coverImage || '/images/profile-cover-default.jpg'}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
      </div>
      
      {/* Profile Content */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-32 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-12 z-10 pb-10">
          <div className="h-48 w-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
            <Image
              src={member.avatar || '/images/profile-avatar-default.jpg'}
              alt={member.name}
              width={192}
              height={192}
              className="object-cover h-full w-full"
            />
          </div>
          
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold">{member.name}</h1>
            <p className="text-xl md:text-2xl mt-2">{member.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}