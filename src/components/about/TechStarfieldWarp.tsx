// src/components/about/TechStarfieldWarp.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

interface DataPacket {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  shape: 'square' | 'circle' | 'triangle';
  rotation: number;
  rotationSpeed: number;
}

export default function TechStarfieldWarp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check if dark mode is active
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Tech-themed color palette
    const colors = {
      stars: [
        '#3B82F6', // blue-500
        '#8B5CF6', // violet-500
        '#2DD4BF', // teal-400
        '#60A5FA', // blue-400
        '#A78BFA'  // violet-400
      ],
      dataPackets: [
        '#3B82F6', // blue-500
        '#EC4899', // pink-500
        '#10B981', // emerald-500
        '#F59E0B', // amber-500
        '#8B5CF6'  // violet-500
      ],
      background: isDarkMode ? '#0B1120' : '#111827'
    };
    
    const stars: Star[] = [];
    const dataPackets: DataPacket[] = [];
    const starCount = Math.min(1000, Math.floor((width * height) / 1000));
    const dataPacketCount = 10;
    let warpSpeed = 3;
    let warpSpeedTarget = 3;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 3,
        y: (Math.random() - 0.5) * height * 3,
        z: Math.random() * 2000 + 1000,
        size: Math.random() * 1.5 + 0.5,
        color: colors.stars[Math.floor(Math.random() * colors.stars.length)]
      });
    }
    
    // Create data packets (special elements that fly by)
    for (let i = 0; i < dataPacketCount; i++) {
      const shapes = ['square', 'circle', 'triangle'] as const;
      dataPackets.push({
        x: (Math.random() - 0.5) * width * 5,
        y: (Math.random() - 0.5) * height * 5,
        z: Math.random() * 2000 + 2000,
        size: Math.random() * 8 + 4,
        color: colors.dataPackets[Math.floor(Math.random() * colors.dataPackets.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4
      });
    }
    
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    
    // Subtle speed change based on scroll position
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollPercent = Math.min(scrollY / viewportHeight, 1);
      
      warpSpeedTarget = 3 + scrollPercent * 4;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle mouse movement to add interactivity
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Subtle speed variation based on mouse position
      const mouseXPercent = mouseX / width;
      const mouseYPercent = mouseY / height;
      
      warpSpeedTarget = 3 + mouseXPercent * 2;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    function animate() {
      // Smoothly adjust speed
      warpSpeed += (warpSpeedTarget - warpSpeed) * 0.05;
      
      // Create space background
      if(ctx==null) return;
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, width, height);
      
      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        // Move star closer to viewer
        star.z -= warpSpeed;
        
        // Reset star if it's too close
        if (star.z <= 0) {
          star.z = Math.random() * 1000 + 1000;
          star.x = (Math.random() - 0.5) * width * 3;
          star.y = (Math.random() - 0.5) * height * 3;
        }
        
        // Project star position onto 2D screen
        const factor = 400 / star.z;
        const x = star.x * factor + width / 2;
        const y = star.y * factor + height / 2;
        const sizeFactor = Math.max(0, (2000 - star.z) / 2000);
        
        // Skip if outside screen
        if (x < 0 || x > width || y < 0 || y > height) continue;
        
        // Draw star
        const size = star.size * sizeFactor * 3;
        const opacity = sizeFactor * 0.8;
        
        // Create trail effect for closer stars
        if (star.z < 800) {
          const tailLength = (1 - star.z / 800) * 20 * (warpSpeed / 3);
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x - (star.x * factor * tailLength / 100),
            y - (star.y * factor * tailLength / 100)
          );
          ctx.lineWidth = size;
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = opacity;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = opacity;
          ctx.fill();
        }
      }
      
      // Draw data packets
      for (let i = 0; i < dataPackets.length; i++) {
        const packet = dataPackets[i];
        
        // Move packet closer to viewer
        packet.z -= warpSpeed * 1.5;
        packet.rotation += packet.rotationSpeed;
        
        // Reset packet if it's too close
        if (packet.z <= 0) {
          packet.z = Math.random() * 2000 + 2000;
          packet.x = (Math.random() - 0.5) * width * 5;
          packet.y = (Math.random() - 0.5) * height * 5;
        }
        
        // Project packet position onto 2D screen
        const factor = 800 / packet.z;
        const x = packet.x * factor + width / 2;
        const y = packet.y * factor + height / 2;
        const sizeFactor = Math.max(0, (4000 - packet.z) / 4000);
        
        // Skip if outside screen
        if (x < 0 || x > width || y < 0 || y > height) continue;
        
        // Draw packet
        const size = packet.size * sizeFactor * 6;
        const opacity = sizeFactor * 0.9;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(packet.rotation * Math.PI / 180);
        ctx.globalAlpha = opacity;
        
        switch (packet.shape) {
          case 'square':
            ctx.fillStyle = packet.color;
            ctx.fillRect(-size/2, -size/2, size, size);
            
            // Add tech details
            ctx.strokeStyle = '#ffffff';
            ctx.globalAlpha = opacity * 0.6;
            ctx.lineWidth = 1 * sizeFactor;
            ctx.strokeRect(-size/2 + size/4, -size/2 + size/4, size/2, size/2);
            break;
            
          case 'circle':
            ctx.fillStyle = packet.color;
            ctx.beginPath();
            ctx.arc(0, 0, size/2, 0, Math.PI * 2);
            ctx.fill();
            
            // Add tech details
            ctx.strokeStyle = '#ffffff';
            ctx.globalAlpha = opacity * 0.6;
            ctx.lineWidth = 1 * sizeFactor;
            ctx.beginPath();
            ctx.arc(0, 0, size/4, 0, Math.PI * 2);
            ctx.stroke();
            break;
            
          case 'triangle':
            ctx.fillStyle = packet.color;
            ctx.beginPath();
            ctx.moveTo(0, -size/2);
            ctx.lineTo(size/2, size/2);
            ctx.lineTo(-size/2, size/2);
            ctx.closePath();
            ctx.fill();
            
            // Add tech details
            ctx.strokeStyle = '#ffffff';
            ctx.globalAlpha = opacity * 0.6;
            ctx.lineWidth = 1 * sizeFactor;
            ctx.beginPath();
            ctx.moveTo(0, -size/4);
            ctx.lineTo(size/4, size/4);
            ctx.lineTo(-size/4, size/4);
            ctx.closePath();
            ctx.stroke();
            break;
        }
        
        // Add tech data lines
        if (size > 10) {
          ctx.globalAlpha = opacity * 0.4;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.5 * sizeFactor;
          
          ctx.beginPath();
          ctx.moveTo(-size/2, 0);
          ctx.lineTo(size/2, 0);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(0, -size/2);
          ctx.lineTo(0, size/2);
          ctx.stroke();
        }
        
        ctx.restore();
      }
      
      // Add subtle vignette effect
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width / 1.5
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDarkMode]);
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="text-center p-8 backdrop-blur-lg bg-black/30 rounded-2xl border border-white/10 shadow-xl max-w-4xl mx-4">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-white mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Code Greek
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto"
          >
            Bringing together competitive programming expertise and web development 
            skills to create innovative solutions and unforgettable digital experiences.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vishwatej */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition-all"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Vishwatej Shende</h3>
              <p className="text-blue-300 text-lg mb-3">Competitive Programmer</p>
              <p className="text-gray-300 mb-4">
                Expert on Codeforces with a rating of 1711. Specializes in algorithms, 
                data structures, and efficient problem-solving.
              </p>
              <Link href="/profile/vishwatej">
                <div className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  View Profile
                  <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
            
            {/* Shreyash */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition-all"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Shreyash Jambhulkar</h3>
              <p className="text-emerald-300 text-lg mb-3">Web Developer</p>
              <p className="text-gray-300 mb-4">
                Skilled in modern web development with expertise in React, Next.js, 
                and UI/UX design. Creator of BookWellCare platform.
              </p>
              <Link href="/profile/shreyash">
                <div className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors">
                  View Profile
                  <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}