// src/app/profile/vishwatej/page.tsx
import { teamMembers } from '@/data/team';
import ProfileHero from '@/components/profile/ProfileHero';
import ProfileBio from '@/components/profile/ProfileBio';
import ProfileExperience from '@/components/profile/ProfileExperience';
import ProfileSkills from '@/components/profile/ProfileSkills';
import ProfileAchievements from '@/components/profile/ProfileAchievements';
import ProfileContact from '@/components/profile/ProfileContact';

export const metadata = {
  title: 'Vishwatej Shende - Code Greek Portfolio',
  description: 'Competitive programmer and ML enthusiast with expertise in algorithms, data structures, and machine learning.',
};

export default function VishwatejProfilePage() {
  const member = teamMembers.vishwatej;
  
  return (
    <main>
      <ProfileHero member={member} />
      <ProfileBio member={member} />
      <ProfileExperience member={member} />
      <ProfileSkills member={member} />
      <ProfileAchievements member={member} />
      <ProfileContact member={member} />
    </main>
  );
}