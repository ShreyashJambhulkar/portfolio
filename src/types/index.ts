// src/types/index.ts

// src/types/index.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
  teamMembers: string[]; // IDs of team members involved
}

// Add other types here

// src/types/index.ts
// Add this to your existing types file

export interface ExtracurricularActivity {
  id: string;
  title: string;
  organization?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  description: string;
  images: string[];
  tags: string[];
  link?: string;
}

// src/types/index.ts
// Add this to your existing types file

export interface CompetitiveCoding {
  memberId: string;
  platform: string;
  username: string;
  profileUrl: string;
  rating?: number;
  rank?: string;
  solved?: number;
  achievements?: string[];
}

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
};

export type SocialLink = {
  platform: string;
  url: string;
  icon: string;
};

export type Education = {
  memberId: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa?: string;
};

export type Experience = {
  memberId: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  technologies?: string[];
};

export type Skill = {
  memberId: string;
  name: string;
  level: number; // 1-5 or 1-100
  category: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
  teamMembers: string[]; // IDs of team members involved
};

export type Achievement = {
  id: string;
  memberId: string;
  title: string;
  issuer?: string;
  date: string;
  description?: string;
  url?: string;
};

export type Publication = {
  id: string;
  memberId: string;
  title: string;
  authors: string[];
  conference: string;
  date: string;
  abstract?: string;
  url?: string;
};

export type ExtracurricularActivity = {
  id: string;
  title: string;
  organization?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  images: string[];
  tags: string[];
  link?: string;
};

export type CompetitiveCoding = {
  memberId: string;
  platform: string;
  username: string;
  profileUrl: string;
  rating?: number;
  rank?: string;
  solved?: number;
  achievements?: string[];
};
