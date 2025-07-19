// src/data/team.ts
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  longBio: string[];
  avatar: string;
  coverImage: string;
  education: {
    degree: string;
    institution: string;
    duration: string;
    location: string;
    gpa: string;
  }[];
  experience: {
    title: string;
    company: string;
    duration: string;
    location?: string;
    description: string[];
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  interests: string[];
  achievements: string[];
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

export const teamMembers: Record<string, TeamMember> = {
  vishwatej: {
    id: 'vishwatej',
    name: 'Vishwatej Mahesh Shende',
    role: 'Competitive Programmer & ML Enthusiast',
    bio: 'Information Technology student with expertise in competitive programming, machine learning, and embedded systems.',
    longBio: [
      'I am Vishwatej Shende, a dedicated Information Technology student with a strong foundation in algorithms, data structures, and competitive programming. My passion for solving complex problems has led me to excel in multiple coding competitions and hackathons.',
      'Beyond competitive programming, I\'m deeply interested in machine learning and AI applications, having worked on projects ranging from computer vision to predictive analytics. I enjoy building systems that can make a real-world impact through technology.',
      'My technical journey includes experience with embedded systems, development of IoT solutions, and implementation of efficient algorithms for resource-constrained environments.',
    ],
    avatar: '/images/team/vishwatej-avatar.jpg',
    coverImage: '/images/team/vishwatej-cover.jpg',
    education: [
      {
        degree: 'B.Tech in Information Technology',
        institution: 'Vishwakarama Institute of Technology',
        duration: '2023 - 2027',
        location: 'Pune, Maharashtra',
        gpa: '8.93/10',
      },
    ],
    experience: [
      {
        title: 'Summer Intern',
        company: 'Siemens Industry Software',
        duration: 'May 2024 - July 2024',
        location: 'Pune, India',
        description: [
          'Developed Python scripts for automating backend testing processes',
          'Built a tool to validate Swagger files against API implementations',
          'Wrote comprehensive test cases for backend APIs',
          'Improved test coverage by 15% through additional automated test cases',
        ],
      },
      {
        title: 'Technical Head',
        company: 'Math & Programming Club, VIT Pune',
        duration: 'Aug 2023 - Present',
        description: [
          'Lead programming workshops and competitive coding sessions',
          'Organized inter-college competitive programming contests',
          'Mentored junior students in algorithmic problem solving',
          'Increased club membership by 40% through engaging activities',
        ],
      },
    ],
    skills: [
      {
        category: 'Programming Languages',
        items: ['C++', 'Python', 'Java', 'C'],
      },
      {
        category: 'Development',
        items: ['Data Structures', 'Algorithms', 'Machine Learning', 'Computer Vision'],
      },
      {
        category: 'Tools & Technologies',
        items: ['Git', 'Docker', 'Arduino', 'TensorFlow', 'OpenCV'],
      },
    ],
    interests: ['Competitive Programming', 'Machine Learning', 'IoT', 'Embedded Systems', 'Reading'],
    achievements: [
      'Expert rating (1711) on Codeforces',
      '4-star coder on CodeChef with 1842 rating',
      'Global rank 214 in Codeforces Round #805',
      'Patent for Spit Detection and Alert System using YOLOv5',
      'Published papers in ASIANCON, ICPCS, and ICSCNA conferences',
    ],
    socialLinks: [
      {
        platform: 'GitHub',
        url: 'https://github.com/vishwatej',
        icon: 'github',
      },
      {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/vishwatej-shende-shende2005',
        icon: 'linkedin',
      },
      // {
      //   platform: 'Twitter',
      //   url: 'https://twitter.com/vishwatej',
      //   icon: 'twitter',
      // },
    ],
  },

  shreyash: {
    id: 'shreyash',
    name: 'Shreyash Jambhulkar',
    role: 'Web Developer & UI/UX Designer',
    bio: 'Information Technology student specializing in web development, UI/UX design, and data analysis.',
    longBio: [
      'I am Shreyash Jambhulkar, an Information Technology undergraduate with a passion for creating beautiful, functional web experiences. My journey in tech started with frontend development and gradually expanded to full-stack development with a focus on modern JavaScript frameworks.',
      'I\'m particularly interested in the intersection of design and functionality, creating user interfaces that are not only visually appealing but also highly usable and accessible. My approach combines technical expertise with an eye for design detail.',
      'Besides development, I enjoy working with data and have experience in data analysis and visualization. I believe that insights derived from data can significantly enhance user experiences and business outcomes.',
    ],
    avatar: '/images/team/shreyash-avatar.jpg',
    coverImage: '/images/team/shreyash-cover.jpg',
    education: [
      {
        degree: 'B.Tech in Information Technology',
        institution: 'Vishwakarama Institute of Technology',
        duration: '2023 - 2027',
        location: 'Pune, Maharashtra',
        gpa: '8.93/10',
      },
    ],
    experience: [
      {
        title: 'Web Development Intern',
        company: 'TechInnovate Solutions',
        duration: 'June 2023 - August 2023',
        location: 'Remote',
        description: [
          'Developed responsive web interfaces using React.js and Next.js',
          'Implemented UI designs using Tailwind CSS and styled-components',
          'Collaborated with backend developers to integrate REST APIs',
          'Optimized website performance achieving 40% faster load times',
        ],
      },
      {
        title: 'UI/UX Design Volunteer',
        company: 'NGO Tech Support Program',
        duration: 'March 2023 - Present',
        description: [
          'Redesigned websites for 3 local non-profit organizations',
          'Created user-friendly interfaces with accessibility in mind',
          'Conducted user testing sessions to validate design decisions',
          'Trained organization staff on content management systems',
        ],
      },
    ],
    skills: [
      {
        category: 'Frontend',
        items: ['HTML/CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
      },
      {
        category: 'Backend',
        items: ['Node.js', 'Express', 'MongoDB', 'Firebase', 'REST APIs'],
      },
      {
        category: 'Design & Tools',
        items: ['Figma', 'Adobe XD', 'Git', 'Vercel', 'Netlify'],
      },
    ],
    interests: ['Web Development', 'UI/UX Design', 'Data Visualization', 'Teaching', 'Music'],
    achievements: [
      'Finalist at E-Summit Design Odyssey, IIT Indore',
      'Developed BookWellCare healthcare platform with 1000+ users',
      'Guardian badge in SQL on LeetCode',
      'Completed over 325 problems on LeetCode',
      'Contributed to open-source projects during Hacktoberfest 2023',
    ],
    socialLinks: [
      {
        platform: 'GitHub',
        url: 'https://github.com/ShreyashJambhulkar',
        icon: 'github',
      },
      {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/shreyash-jambhulkar-3ba340288/',
        icon: 'linkedin',
      },
      {
        platform: 'Dribbble',
        url: 'https://dribbble.com/shreyashj',
        icon: 'dribbble',
      },
    ],
  },
};