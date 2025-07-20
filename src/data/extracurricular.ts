// src/data/extracurricular.ts
import { ExtracurricularActivitys } from '@/types';

export const activities: ExtracurricularActivitys[] = [
  {
    id: 'designodyssey',
    title: 'Design Odyssey Finalist',
    organization: 'E-Summit IIT Indore',
    role: 'Participant',
    date: 'February 2023',
    description: 'Participated in the Design Odyssey competition at IIT Indore\'s E-Summit and reached the finals. Designed and presented a comprehensive solution for a smart waste management system for urban areas.',
    images: [
      '/images/extracurricular/design-odyssey-1.jpg',
      '/images/extracurricular/design-odyssey-2.jpg'
    ],
    tags: ['Design', 'Competition', 'Smart Cities'],
    link: 'https://esummit.iiti.ac.in/'
  },
  {
    id: 'roboticsworkshop',
    title: 'Robotics Workshop',
    organization: 'The Robotics Forum (TRF)',
    role: 'Participant',
    startDate: 'September 2022',
    endDate: 'December 2022',
    description: 'Completed the Level 1 Robotics Workshop by The Robotics Forum (TRF) at VIT Pune. Learned about robotics fundamentals, Arduino programming, sensor integration, and built a line-following robot as part of the workshop.',
    images: [
      '/images/extracurricular/robotics-1.jpg',
      '/images/extracurricular/robotics-2.jpg',
      '/images/extracurricular/robotics-3.jpg'
    ],
    tags: ['Robotics', 'Workshop', 'Arduino'],
    link: 'https://trfvitpune.org/'
  },
  {
    id: 'mathclubhead',
    title: 'Technical Head of Math & Programming Club',
    organization: 'VIT Pune',
    role: 'Technical Head',
    startDate: 'August 2023',
    endDate: 'Present',
    description: 'Leading the technical initiatives of the Math & Programming Club at VIT Pune. Organized coding competitions, algorithm workshops, and mathematical problem-solving sessions for students. Increased member participation by 40% through engaging activities and collaborative learning opportunities.',
    images: [
      '/images/extracurricular/mathclub-1.jpg',
      '/images/extracurricular/mathclub-2.jpg'
    ],
    tags: ['Leadership', 'Club Activity', 'Programming'],
  },
  {
    id: 'hackathon',
    title: 'Smart India Hackathon Participant',
    organization: 'Ministry of Education',
    role: 'Team Lead',
    date: 'April 2023',
    description: 'Led a team of six in the Smart India Hackathon 2023, developing a mobile application for efficient waste management. Implemented features like waste pickup scheduling, recycling center locator, and gamification elements to encourage proper waste disposal.',
    images: [
      '/images/extracurricular/hackathon-1.jpg',
      '/images/extracurricular/hackathon-2.jpg',
      '/images/extracurricular/hackathon-3.jpg'
    ],
    tags: ['Hackathon', 'Team Work', 'Innovation'],
    link: 'https://www.sih.gov.in/'
  },
  {
    id: 'volunteering',
    title: 'Community Service: Teaching Underprivileged Children',
    organization: 'NGO Partner',
    role: 'Volunteer',
    startDate: 'January 2023',
    endDate: 'Present',
    description: 'Volunteering weekly to teach mathematics and computer fundamentals to underprivileged children. Developed a simplified curriculum to make technical concepts more accessible. Organized a fundraiser to provide basic computing devices to the children.',
    images: [
      '/images/extracurricular/volunteer-1.jpg',
      '/images/extracurricular/volunteer-2.jpg',
      '/images/extracurricular/volunteer-3.jpg'
    ],
    tags: ['Volunteering', 'Teaching', 'Social Responsibility'],
  }
];