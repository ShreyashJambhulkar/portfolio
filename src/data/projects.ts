// src/data/projects.ts
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'healthcareplatform',
    title: 'BookWellCare',
    description: 'A healthcare platform connecting patients with doctors and services',
    longDescription: 'BookWellCare is a comprehensive healthcare platform that allows patients to book appointments with specialized doctors, order medicines, and access medical services seamlessly. The platform features a responsive design, real-time availability updates, and integrated payment systems.',
    thumbnail: '/images/projects/healthcare.jpg',
    images: ['/images/projects/healthcare-1.jpg', '/images/projects/healthcare-2.jpg'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
    liveUrl: 'https://bookwellcare.life',
    sourceUrl: 'https://github.com/ShreyashJambhulkar',
    featured: true,
    teamMembers: ['shreyash']
  },
  {
    id: 'agriconnect',
    title: 'Agri-Connect',
    description: 'Agricultural web platform connecting farmers with resources',
    longDescription: 'Agri-Connect is a web platform designed to bridge the gap between farmers and agricultural resources. It provides weather forecasts, crop recommendations, marketplace for selling produce, and expert consultation services.',
    thumbnail: '/images/projects/agriculture.jpg',
    images: ['/images/projects/agriculture-1.jpg', '/images/projects/agriculture-2.jpg'],
    technologies: ['Next.js', 'Tailwind CSS', 'Firebase', 'Weather API'],
    liveUrl: 'https://agriconnect.example.com',
    sourceUrl: 'https://github.com/example/agriconnect',
    featured: true,
    teamMembers: ['shreyash', 'vishwatej']
  },
  {
    id: 'spitdetection',
    title: 'Spit Detection System',
    description: 'Computer vision system to detect and alert about spitting in public areas',
    longDescription: 'An AI-powered system that uses YOLOv5 for real-time detection of spitting in public areas. The system is designed for public health monitoring and can be integrated with existing CCTV infrastructure to send automatic alerts to authorities.',
    thumbnail: '/images/projects/spitdetection.jpg',
    images: ['/images/projects/spitdetection-1.jpg', '/images/projects/spitdetection-2.jpg'],
    technologies: ['Python', 'YOLOv5', 'OpenCV', 'TensorFlow', 'Raspberry Pi'],
    sourceUrl: 'https://github.com/example/spitdetection',
    featured: true,
    teamMembers: ['vishwatej']
  },
  {
    id: 'sparepartsforecasting',
    title: 'Spare Parts Demand Forecasting',
    description: 'ML model for predicting spare parts demand in manufacturing',
    longDescription: 'A machine learning solution that predicts demand for spare parts in manufacturing industries. The system uses historical data and various predictive models to optimize inventory levels and reduce costs while maintaining high service levels.',
    thumbnail: '/images/projects/forecasting.jpg',
    images: ['/images/projects/forecasting-1.jpg', '/images/projects/forecasting-2.jpg'],
    technologies: ['Python', 'XGBoost', 'Random Forest', 'LSTM', 'SARIMA', 'Pandas'],
    sourceUrl: 'https://github.com/example/demandforecasting',
    featured: false,
    teamMembers: ['shreyash']
  },
  {
    id: 'garbagecollector',
    title: 'Garbage Collecting Robot',
    description: 'Arduino-based robot that detects and collects garbage',
    longDescription: 'An autonomous robot built using Arduino that can detect and collect small pieces of garbage. The robot uses ultrasonic sensors for navigation and a simple computer vision system to identify garbage items.',
    thumbnail: '/images/projects/robot.jpg',
    images: ['/images/projects/robot-1.jpg', '/images/projects/robot-2.jpg'],
    technologies: ['Arduino', 'C++', 'Sensors', 'Motors', 'Computer Vision'],
    sourceUrl: 'https://github.com/example/garbagerobot',
    featured: false,
    teamMembers: ['vishwatej']
  }
];