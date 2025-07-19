// src/components/sections/Resume.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Icons as components
const AcademicCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  </svg>
);

const CodeBracketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DocumentTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
  </svg>
);

export default function Resume() {
  const [activeTab, setActiveTab] = useState('vishwatej');
  const [activeSection, setActiveSection] = useState('experience');
  
  const sections = ['experience', 'education', 'skills', 'achievements', 'publications'];
  
  return (
    <section id="resume" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Resume
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our academic journey, professional experiences, and research contributions
          </p>
        </div>
        
        {/* Person Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setActiveTab('vishwatej')}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === 'vishwatej'
                  ? 'bg-primary text-white shadow'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Vishwatej
            </button>
            <button
              onClick={() => setActiveTab('shreyash')}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === 'shreyash'
                  ? 'bg-secondary text-white shadow'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Shreyash
            </button>
          </div>
        </div>
        
        {/* Section Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto scrollbar-hide">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 sm:px-6 py-2 whitespace-nowrap rounded-lg transition-all ${
                  activeSection === section
                    ? activeTab === 'vishwatej' 
                      ? 'bg-primary text-white shadow'
                      : 'bg-secondary text-white shadow'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {activeTab === 'vishwatej' && (
            <motion.div
              key={`vishwatej-${activeSection}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Experience Section */}
              {activeSection === 'experience' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-center mb-6">
                    <div className="text-primary mr-3">
                      <BriefcaseIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Professional Experience</h3>
                  </div>
                  
                  <div className="border-l-2 border-primary pl-6 space-y-10">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-md mb-2">
                        Summer 2023
                      </span>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-100">Summer Intern</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">Siemens Industry Software</p>
                      <ul className="text-gray-500 dark:text-gray-400 list-disc list-inside space-y-2">
                        <li>Developed Python scripts for data processing and analysis</li>
                        <li>Built a tool to validate Swagger files for API documentation</li>
                        <li>Wrote test cases for backend APIs using pytest</li>
                        <li>Collaborated with senior developers to optimize backend services</li>
                        <li>Received recognition for identifying and fixing a critical bug in the CI pipeline</li>
                      </ul>
                    </div>
                    
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-md mb-2">
                        2022 - Present
                      </span>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-100">Technical Head</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">Math & Programming Club, VIT Pune</p>
                      <ul className="text-gray-500 dark:text-gray-400 list-disc list-inside space-y-2">
                        <li>Organized coding competitions and workshops for 300+ participants</li>
                        <li>Mentored junior students in competitive programming</li>
                        <li>Led a team of 10 technical volunteers</li>
                        <li>Conducted weekly algorithm training sessions</li>
                        <li>Developed problem sets for internal coding competitions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-md mb-2">
                        Summer 2022
                      </span>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-100">Research Intern</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">Computer Vision Lab, VIT Pune</p>
                      <ul className="text-gray-500 dark:text-gray-400 list-disc list-inside space-y-2">
                        <li>Researched and developed a spit detection system using YOLOv5</li>
                        <li>Collected and annotated a dataset of 1000+ images</li>
                        <li>Achieved 91% accuracy in real-time detection</li>
                        <li>Implemented an alert system using Arduino and Python</li>
                        <li>Work led to a publication at ASIANCON and a patent application</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Education Section */}
              {activeSection === 'education' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-center mb-6">
                    <div className="text-primary mr-3">
                      <AcademicCapIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Education</h3>
                  </div>
                  
                  <div className="border-l-2 border-primary pl-6 space-y-10">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-md mb-2">
                        2020 - Present
                      </span>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-100">B.Tech in Information Technology</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">Vishwakarama Institute of Technology, Pune</p>
                      <p className="text-gray-500 dark:text-gray-400 mb-3">
                        Current CGPA: 8.85/10
                      </p>
                      <div className="mt-3">
                        <h5 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">Key Courses</h5>
                        <div className="flex flex-wrap gap-2">
                          {['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 
                            'Computer Networks', 'Machine Learning', 'Computer Vision', 'Embedded Systems'].map((course) => (
                            <span key={course} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 
                              dark:text-blue-300 text-sm rounded-full">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-md mb-2">
                        2018 - 2020
                      </span>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-100">Higher Secondary Education</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">Shivaji Science College, Nagpur</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        Percentage: 92.46%
                      </p>
                    </div>
                    
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-md mb-2">
                        Additional Education
                      </span>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-100">Online Courses & Certifications</h4>
                      <ul className="text-gray-500 dark:text-gray-400 list-disc list-inside space-y-2 mt-2">
                        <li>Deep Learning Specialization - Coursera</li>
                        <li>Algorithms and Data Structures - Princeton University</li>
                        <li>Competitive Programmer's Core Skills - ITMO University</li>
                        <li>Level 1 Workshop by The Robotic Forum (TRF) at VIT</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Skills Section */}
              {activeSection === 'skills' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-center mb-6">
                    <div className="text-primary mr-3">
                      <CodeBracketIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Technical Skills</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-100">Programming Languages</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">C++</span>
                            <span className="text-gray-600 dark:text-gray-300">Expert</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">Python</span>
                            <span className="text-gray-600 dark:text-gray-300">Advanced</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">Java</span>
                            <span className="text-gray-600 dark:text-gray-300">Intermediate</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">C</span>
                            <span className="text-gray-600 dark:text-gray-300">Advanced</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold mb-3 mt-6 text-gray-700 dark:text-gray-100">Frameworks & Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {['OpenCV', 'PyTorch', 'TensorFlow', 'Git', 'Docker', 'Arduino', 'Raspberry Pi', 'Linux'].map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 
                            dark:text-blue-200 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-100">Technical Expertise</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">Data Structures & Algorithms</span>
                            <span className="text-gray-600 dark:text-gray-300">Expert</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">Machine Learning</span>
                            <span className="text-gray-600 dark:text-gray-300">Advanced</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">Computer Vision</span>
                            <span className="text-gray-600 dark:text-gray-300">Advanced</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">Embedded Systems</span>
                            <span className="text-gray-600 dark:text-gray-300">Intermediate</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold mb-3 mt-6 text-gray-700 dark:text-gray-100">Soft Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Problem Solving', 'Team Leadership', 'Technical Writing', 'Public Speaking', 
                        'Mentoring', 'Project Management'].map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 
                            dark:text-blue-200 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Achievements Section */}
              {activeSection === 'achievements' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-center mb-6">
                    <div className="text-primary mr-3">
                      <TrophyIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Achievements</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                          <span className="text-primary font-bold">CP</span>
                        </span>
                        Competitive Programming
                      </h4>
                      <ul className="text-gray-500 dark:text-gray-400 space-y-3">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <CheckCircleIcon />
                          </div>
                          <span><strong>Expert on Codeforces</strong> with a rating of 1711</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <CheckCircleIcon />
                          </div>
                          <span><strong>5★ coder on CodeChef</strong> (max rating 1954)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <CheckCircleIcon />
                          </div>
                          <span>Solved <strong>1000+ problems</strong> across various coding platforms</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <CheckCircleIcon />
                          </div>
                          <span><strong>Top 100 in CodeChef Starters</strong> multiple times</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <CheckCircleIcon />
                          </div>
                          <span><strong>Ranked 3rd in VIT's Annual Coding Contest</strong> (2022)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                          <span className="text-primary font-bold">⚙️</span>
                        </span>
                        Technical Achievements
                      </h4>
                      <ul className="text-gray-500 dark:text-gray-400 space-y-3">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <CheckCircleIcon />
                          </div>
                          <span><strong>Patent filed</strong> for spit detection and alert system</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <CheckCircleIcon />
                          </div>
                          <span><strong>Finalist at E-Summit Design Odyssey</strong> at IIT Indore</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <CheckCircleIcon />
                          </div>
                          <span><strong>Best Technical Innovation Award</strong> at VIT Tech Expo 2022</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <CheckCircleIcon />
                          </div>
                          <span><strong>Winner, Smart India Hackathon (Internal Round)</strong> at VIT</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <CheckCircleIcon />
                          </div>
                          <span><strong>Recognition from Siemens</strong> for exceptional internship work</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                        <span className="text-primary font-bold">🏆</span>
                      </span>
                      Academic & Leadership
                    </h4>
                    <ul className="text-gray-500 dark:text-gray-400 space-y-3 max-w-3xl">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <CheckCircleIcon />
                        </div>
                        <span>Maintained <strong>8.85 CGPA</strong> while actively participating in technical activities</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <CheckCircleIcon />
                        </div>
                        <span><strong>Technical Head of Math & Programming Club</strong>, mentoring 50+ students</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <CheckCircleIcon />
                        </div>
                        <span><strong>3 research papers published</strong> in international conferences</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Publications Section */}
              {activeSection === 'publications' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-center mb-6">
                    <div className="text-primary mr-3">
                      <DocumentTextIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Publications & Patents</h3>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">Conference Publications</h4>
                      
                      <div className="space-y-6">
                        <div className="border-l-4 border-primary pl-4 py-1">
                          <h5 className="text-base font-semibold text-gray-700 dark:text-gray-100">Spit Detection and Alert System Using YOLOv5 and Arduino</h5>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="text-primary">ASIANCON 2023</span> - IEEE Asian Conference on Innovation in Technology
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 mt-2">
                            A real-time system for detecting spitting incidents in public places using computer vision and IoT technologies.
                          </p>
                          <div className="mt-2">
                            <a href="#" className="text-sm text-primary hover:underline">View Paper</a>
                            <span className="text-gray-400 mx-2">|</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Citation: 4</span>
                          </div>
                        </div>
                        
                        <div className="border-l-4 border-primary pl-4 py-1">
                          <h5 className="text-base font-semibold text-gray-700 dark:text-gray-100">Optimized Routing Algorithms for IoT Sensor Networks</h5>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="text-primary">ICPCS 2022</span> - International Conference on Pervasive Computing and Smart Systems
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Novel routing strategies for extending battery life and improving data transmission in IoT sensor networks.
                          </p>
                          <div className="mt-2">
                            <a href="#" className="text-sm text-primary hover:underline">View Paper</a>
                            <span className="text-gray-400 mx-2">|</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Citation: 2</span>
                          </div>
                        </div>
                        
                        <div className="border-l-4 border-primary pl-4 py-1">
                          <h5 className="text-base font-semibold text-gray-700 dark:text-gray-100">Energy-Efficient Deep Learning for Edge Computing Devices</h5>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="text-primary">ICSCNA 2022</span> - International Conference on Smart Computing, Networks and Analytics
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Techniques for optimizing neural networks to run efficiently on resource-constrained edge devices.
                          </p>
                          <div className="mt-2">
                            <a href="#" className="text-sm text-primary hover:underline">View Paper</a>
                            <span className="text-gray-400 mx-2">|</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Citation: 3</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">Patents</h4>
                      
                      <div className="border-l-4 border-primary pl-4 py-1">
                        <h5 className="text-base font-semibold text-gray-700 dark:text-gray-100">Spit Detection and Alert System</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="text-primary">Patent Filed</span> - Indian Patent Office, Application No. 202XXXXXXXXX
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          A system and method for detecting spitting incidents in public places using computer vision and automatically generating alerts.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Status: Under Review (Filed in 2022)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'shreyash' && (
            <motion.div
              key={`shreyash-${activeSection}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Experience Section */}
              {activeSection === 'experience' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-center mb-6">
                    <div className="text-secondary mr-3">
                      <BriefcaseIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Professional Experience</h3>
                  </div>
                  
                  <div className="border-l-2 border-secondary pl-6 space-y-10">
                    <div>
                      <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-semibold rounded-md mb-2">
                        Summer 2023
                      </span>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-100">Web Development Intern</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">Healthcare Solutions Ltd.</p>
                      <ul className="text-gray-500 dark:text-gray-400 list-disc list-inside space-y-2">
                        <li>Developed frontend components for BookWellCare platform using React</li>
                        <li>Implemented responsive design using Tailwind CSS</li>
                        <li>Integrated REST APIs with frontend components</li>
                        <li>Created user authentication and appointment booking flows</li>
                        <li>Optimized site performance, improving load time by 40%</li>
                      </ul>
                    </div>
                    
                    <div>
                      <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-semibold rounded-md mb-2">
                        2022 - Present
                      </span>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-100">UI/UX Design Lead</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">Student Design Club, VIT Pune</p>
                      <ul className="text-gray-500 dark:text-gray-400 list-disc list-inside space-y-2">
                        <li>Led design for various college websites and applications</li>
                        <li>Conducted UI/UX workshops for junior students</li>
                        <li>Created design systems and component libraries</li>
                        <li>Collaborated with developers to ensure design implementation</li>
                        <li>Mentored a team of 5 junior designers</li>
                      </ul>
                    </div>
                    
                    <div>
                      <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-semibold rounded-md mb-2">
                        Jan 2022 - May 2022
                      </span>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-100">Machine Learning Research Assistant</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">Data Science Lab, VIT Pune</p>
                      <ul className="text-gray-500 dark:text-gray-400 list-disc list-inside space-y-2">
                        <li>Developed forecasting models for spare parts demand prediction</li>
                        <li>Implemented various ML algorithms including XGBoost, Random Forest, and LSTM</li>
                        <li>Collected and preprocessed time series data from multiple sources</li>
                        <li>Achieved 87% prediction accuracy, improving inventory management</li>
                        <li>Created visualization dashboards for business insights</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Education Section */}
              {activeSection === 'education' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-center mb-6">
                    <div className="text-secondary mr-3">
                      <AcademicCapIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Education</h3>
                  </div>
                  
                  <div className="border-l-2 border-secondary pl-6 space-y-10">
                    <div>
                      <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-semibold rounded-md mb-2">
                        2020 - Present
                      </span>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-100">B.Tech in Information Technology</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">Vishwakarama Institute of Technology, Pune</p>
                      <p className="text-gray-500 dark:text-gray-400 mb-3">
                        Current CGPA: 8.93/10
                      </p>
                      <div className="mt-3">
                        <h5 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">Key Courses</h5>
                        <div className="flex flex-wrap gap-2">
                          {['Data Structures & Algorithms', 'Web Technologies', 'Database Management Systems', 
                            'Software Engineering', 'Machine Learning', 'UI/UX Design', 'Cloud Computing'].map((course) => (
                            <span key={course} className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 
                              dark:text-purple-300 text-sm rounded-full">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-semibold rounded-md mb-2">
                        2018 - 2020
                      </span>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-100">Higher Secondary Education</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">Shri Niketan Jr. College</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        Percentage: 90.15%
                      </p>
                    </div>
                    
                    <div>
                      <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-semibold rounded-md mb-2">
                        Additional Education
                      </span>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-100">Online Courses & Certifications</h4>
                      <ul className="text-gray-500 dark:text-gray-400 list-disc list-inside space-y-2 mt-2">
                        <li>Complete Web Developer in 2023 - Zero to Mastery</li>
                        <li>Advanced JavaScript Concepts - Udemy</li>
                        <li>Level 1 Workshop by The Robotic Forum (TRF) at VIT</li>
                        <li>Machine Learning A-Z - Udemy</li>
                        <li>UI/UX Design Specialization - Coursera</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Rest of Shreyash's sections follow the same pattern... */}
              {/* Skills Section */}
              {activeSection === 'skills' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-center mb-6">
                    <div className="text-secondary mr-3">
                      <CodeBracketIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Technical Skills</h3>
                  </div>
                  
                  {/* Skills content... */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-100">Web Development</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">JavaScript / React</span>
                            <span className="text-gray-600 dark:text-gray-300">Advanced</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-secondary h-2 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">HTML & CSS</span>
                            <span className="text-gray-600 dark:text-gray-300">Expert</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-secondary h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">Tailwind CSS</span>
                            <span className="text-gray-600 dark:text-gray-300">Advanced</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-secondary h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">REST APIs</span>
                            <span className="text-gray-600 dark:text-gray-300">Intermediate</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-secondary h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold mb-3 mt-6 text-gray-700 dark:text-gray-100">Frameworks & Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Next.js', 'Tailwind CSS', 'Git', 'Figma', 'Adobe XD', 'VS Code', 'npm'].map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 
                            dark:text-purple-200 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-100">Programming & Other Skills</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">Python</span>
                            <span className="text-gray-600 dark:text-gray-300">Intermediate</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-secondary h-2 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">SQL</span>
                            <span className="text-gray-600 dark:text-gray-300">Intermediate</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-secondary h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">UI/UX Design</span>
                            <span className="text-gray-600 dark:text-gray-300">Advanced</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-secondary h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-300">Machine Learning</span>
                            <span className="text-gray-600 dark:text-gray-300">Intermediate</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-secondary h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold mb-3 mt-6 text-gray-700 dark:text-gray-100">Soft Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Problem Solving', 'Team Work', 'Communication', 'UI Design', 
                        'User Testing', 'Project Management'].map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 
                            dark:text-purple-200 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Achievements Section for Shreyash */}
{activeSection === 'achievements' && (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
    <div className="flex items-center mb-6">
      <div className="text-secondary mr-3">
        <TrophyIcon />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Achievements</h3>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100 flex items-center">
          <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-2">
            <span className="text-secondary font-bold">💻</span>
          </span>
          Technical Projects
        </h4>
        <ul className="text-gray-500 dark:text-gray-400 space-y-3">
          <li className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircleIcon />
            </div>
            <span><strong>BookWellCare</strong> - Healthcare platform with 2000+ active users and 15+ partnered hospitals</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircleIcon />
            </div>
            <span><strong>Agri-Connect</strong> - Web platform connecting 500+ farmers with buyers, reducing middleman costs by 20%</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircleIcon />
            </div>
            <span><strong>Demand Forecasting System</strong> - ML model that reduced inventory costs by 15% and improved supply chain efficiency</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircleIcon />
            </div>
            <span><strong>VIT Department Websites</strong> - Revamped 5 department websites, increasing student engagement by 35%</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircleIcon />
            </div>
            <span><strong>Tailwind Component Library</strong> - Created custom UI library used by 10+ college projects</span>
          </li>
        </ul>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100 flex items-center">
          <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-2">
            <span className="text-secondary font-bold">🏆</span>
          </span>
          Competitions & Awards
        </h4>
        <ul className="text-gray-500 dark:text-gray-400 space-y-3">
          <li className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircleIcon />
            </div>
            <span><strong>Finalist at E-Summit Design Odyssey</strong> at IIT Indore for BookWellCare platform design</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircleIcon />
            </div>
            <span><strong>1st Runner-up in Smart India Hackathon 2022</strong> (Internal Round) at VIT</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircleIcon />
            </div>
            <span><strong>Best UI/UX Design Award</strong> at VIT's Annual Project Showcase 2023</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircleIcon />
            </div>
            <span><strong>2nd Place</strong> in National Web Design Challenge at TechFest 2022</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircleIcon />
            </div>
            <span><strong>Dean's List</strong> for academic excellence for 3 consecutive semesters</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div className="mt-8">
      <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100 flex items-center">
        <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-2">
          <span className="text-secondary font-bold">🎓</span>
        </span>
        Academic & Leadership
      </h4>
      <ul className="text-gray-500 dark:text-gray-400 space-y-3 max-w-3xl">
        <li className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <CheckCircleIcon />
          </div>
          <span>Maintained <strong>8.93 CGPA</strong> while actively participating in technical activities</span>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <CheckCircleIcon />
          </div>
          <span><strong>UI/UX Design Lead</strong> at Student Design Club, mentoring 5+ junior designers</span>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <CheckCircleIcon />
          </div>
          <span>Conducted <strong>3 workshops</strong> on modern web development technologies with 100+ attendees</span>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <CheckCircleIcon />
          </div>
          <span><strong>Healthcare UX Research Grant</strong> recipient for innovative patient interaction design</span>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <CheckCircleIcon />
          </div>
          <span><strong>Student Ambassador</strong> for Microsoft Student Partners program 2021-22</span>
        </li>
      </ul>
    </div>
  </div>
)}

{/* Publications Section for Shreyash */}
{activeSection === 'publications' && (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
    <div className="flex items-center mb-6">
      <div className="text-secondary mr-3">
        <DocumentTextIcon />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Publications & Research</h3>
    </div>
    
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">Research Papers</h4>
        
        <div className="space-y-6">
          <div className="border-l-4 border-secondary pl-4 py-1">
            <h5 className="text-base font-semibold text-gray-700 dark:text-gray-100">Machine Learning Approaches for Agricultural Crop Price Forecasting</h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="text-secondary">ICAAI 2023</span> - International Conference on Automation and Artificial Intelligence
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              A comparative analysis of different machine learning algorithms for predicting crop prices to help farmers make informed decisions about when to sell their produce for maximum profit.
            </p>
            <div className="mt-2">
              <a href="#" className="text-sm text-secondary hover:underline">View Paper</a>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Citation: 3</span>
            </div>
          </div>
          
          <div className="border-l-4 border-secondary pl-4 py-1">
            <h5 className="text-base font-semibold text-gray-700 dark:text-gray-100">UI/UX Design Principles for Healthcare Applications: A Study on User Accessibility</h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="text-secondary">ICHCI 2022</span> - International Conference on Human-Computer Interaction
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Research on user interface design patterns that improve accessibility and usability in healthcare applications, with a focus on elderly users and those with disabilities.
            </p>
            <div className="mt-2">
              <a href="#" className="text-sm text-secondary hover:underline">View Paper</a>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Citation: 5</span>
            </div>
          </div>
          
          <div className="border-l-4 border-secondary pl-4 py-1">
            <h5 className="text-base font-semibold text-gray-700 dark:text-gray-100">A Comparative Study of React.js and Angular for Building Progressive Web Applications</h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="text-secondary">ICST 2022</span> - International Conference on Software Technologies
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              An in-depth analysis of the performance, developer experience, and user experience when building progressive web applications using React.js versus Angular.
            </p>
            <div className="mt-2">
              <a href="#" className="text-sm text-secondary hover:underline">View Paper</a>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Citation: 4</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">Technical Documentation</h4>
        
        <div className="space-y-6">
          <div className="border-l-4 border-secondary pl-4 py-1">
            <h5 className="text-base font-semibold text-gray-700 dark:text-gray-100">Building Accessible Web Applications with React</h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="text-secondary">Technical Guide</span> - Published on college repository
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Comprehensive guide on implementing WCAG 2.1 standards in React applications, including practical examples and best practices for creating accessible web interfaces.
            </p>
            <div className="mt-2">
              <a href="#" className="text-sm text-secondary hover:underline">View Documentation</a>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Downloads: 1200+</span>
            </div>
          </div>
          
          <div className="border-l-4 border-secondary pl-4 py-1">
            <h5 className="text-base font-semibold text-gray-700 dark:text-gray-100">Modern Web Design System: Tailwind CSS Implementation Guide</h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="text-secondary">Design System Documentation</span> - Used by Student Design Club
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              A detailed guide on creating and implementing design systems using Tailwind CSS, with focus on consistency, reusability, and developer experience.
            </p>
            <div className="mt-2">
              <a href="#" className="text-sm text-secondary hover:underline">View Documentation</a>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Adopted by 8+ projects</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">Ongoing Research</h4>
        
        <div className="border-l-4 border-secondary pl-4 py-1">
          <h5 className="text-base font-semibold text-gray-700 dark:text-gray-100">Time Series Forecasting Methods for Medical Inventory Management</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="text-secondary">Research Project</span> - In collaboration with Healthcare Solutions Ltd.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Investigating advanced forecasting techniques including LSTM neural networks, ARIMA models, and ensemble methods to optimize medical inventory management in healthcare facilities.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Status: In Progress (Expected publication in 2024)
          </p>
        </div>
      </div>
    </div>
  </div>
)}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Download Resume Buttons */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Download Complete Resume
          </h3>
          <div className="flex justify-center space-x-4">
            <a 
              href="/files/Vishwatej_Shende_Resume.jpg"
              target="_blank"
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === 'vishwatej'
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Vishwatej's Resume
            </a>
            <a 
              href="/files/Shreyash_Jambhulkar_Resume.pdf"
              target="_blank"
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === 'shreyash'
                  ? 'bg-secondary text-white hover:bg-secondary/90'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Shreyash's Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}