// src/app/profile/shreyash/page.tsx
import { teamMembers } from '@/data/team';
import ProfileHero from '@/components/profile/ProfileHero';
import ProfileBio from '@/components/profile/ProfileBio';
import ProfileExperience from '@/components/profile/ProfileExperience';
import ProfileSkills from '@/components/profile/ProfileSkills';
import ProfileAchievements from '@/components/profile/ProfileAchievements';
import ProfileContact from '@/components/profile/ProfileContact';

export const metadata = {
  title: 'Shreyash Jambhulkar - Code Greek Portfolio',
  description: 'Web developer and UI/UX designer specializing in creating beautiful, functional web experiences.',
};

export default function ShreyashProfilePage() {
  const member = teamMembers.shreyash;
  
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