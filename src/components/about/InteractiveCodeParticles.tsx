// src/components/about/InteractiveCodeParticles.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Competitive Programming code snippets
const CODE_SNIPPETS = [
  "vector<int>", "sort(v.begin(), v.end())", "priority_queue<int>", 
  "binary_search", "lower_bound", "upper_bound", "BFS", "DFS",
  "dp[i] = max(dp[i-1], dp[i-2] + arr[i])", "while(l<=r)", "quicksort",
  "O(n log n)", "for(int i=0; i<n; i++)", "map<int, int>", "int main()",
  "return 0;", "gcd(a, b)", "lcm(a, b)", "struct Node", "class Solution",
  "void solve()", "ModuloDivision", "segment tree", "lazy propagation",
  "fenwick tree", "DSU", "trie", "suffix array", "two pointers", "sliding window"
];

// Algorithm visualization shapes
const ALGO_SHAPES = [
  { type: 'circle', size: 8, color: '#60A5FA' }, // blue-400
  { type: 'square', size: 10, color: '#F472B6' }, // pink-400
  { type: 'triangle', size: 12, color: '#34D399' }, // emerald-400
  { type: 'diamond', size: 9, color: '#FBBF24' }, // yellow-400
  { type: 'hexagon', size: 11, color: '#A78BFA' }  // violet-400
];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  content: string | null;
  shape: typeof ALGO_SHAPES[number] | null;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export default function InteractiveCodeParticles() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check dark mode
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);
  
  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
    
    const particlesArray: Particle[] = [];
    const count = Math.min(50, Math.floor((rect.width * rect.height) / 10000));
    
    for (let i = 0; i < count; i++) {
      // Decide whether to create a code snippet or algorithm shape
      const isCodeSnippet = Math.random() > 0.5;
      
      particlesArray.push({
        id: i,
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: isCodeSnippet ? 0 : Math.random() * 5 + 5,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        content: isCodeSnippet ? CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)] : null,
        shape: !isCodeSnippet ? ALGO_SHAPES[Math.floor(Math.random() * ALGO_SHAPES.length)] : null,
        opacity: Math.random() * 0.5 + 0.1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      });
    }
    
    setParticles(particlesArray);
  }, []);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
      
      // Adjust particle positions to fit within new dimensions
      setParticles(prevParticles => 
        prevParticles.map(p => ({
          ...p,
          x: Math.min(p.x, rect.width),
          y: Math.min(p.y, rect.height)
        }))
      );
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animate particles
  useEffect(() => {
    if (particles.length === 0 || !dimensions.width || !dimensions.height) return;
    
    const animateParticles = () => {
      setParticles(prevParticles => {
        return prevParticles.map(p => {
          let { x, y, speedX, speedY, rotation } = p;
          const rotationSpeed=p.rotationSpeed;
          
          // Distance from mouse
          const dx = mousePosition.x - x;
          const dy = mousePosition.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply force based on mouse position
          const maxDistance = 200;
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            speedX -= (dx / distance) * force * 0.2;
            speedY -= (dy / distance) * force * 0.2;
          }
          
          // Apply speed
          x += speedX;
          y += speedY;
          rotation += rotationSpeed;
          
          // Boundary checks
          if (x < 0) { x = 0; speedX *= -1; }
          if (x > dimensions.width) { x = dimensions.width; speedX *= -1; }
          if (y < 0) { y = 0; speedY *= -1; }
          if (y > dimensions.height) { y = dimensions.height; speedY *= -1; }
          
          // Apply friction
          speedX *= 0.99;
          speedY *= 0.99;
          
          return { ...p, x, y, speedX, speedY, rotation };
        });
      });
    };
    
    const intervalId = setInterval(animateParticles, 16); // ~60 FPS
    
    return () => clearInterval(intervalId);
  }, [particles, mousePosition, dimensions]);
  
  // Render particles
  const renderParticles = () => {
    return particles.map((p) => {
      // For code snippets
      if (p.content) {
        return (
          <motion.div
            key={p.id}
            className={`absolute font-mono text-xs ${
              isDarkMode ? 'text-blue-300' : 'text-blue-600'
            } whitespace-nowrap pointer-events-none`}
            style={{
              left: p.x,
              top: p.y,
              opacity: p.opacity,
              transform: `rotate(${p.rotation}deg)`
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: [p.opacity, p.opacity + 0.2, p.opacity],
              scale: [1, 1.03, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            {p.content}
          </motion.div>
        );
      }
      
      // For algorithm shapes
      if (p.shape) {
        const { type, size, color } = p.shape;
        
        // Adjust opacity based on dark mode
        const shapeColor = isDarkMode 
          ? color
          : color; // You could adjust color for light mode if needed
        
        // Render different shapes
        switch(type) {
          case 'circle':
            return (
              <motion.div
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: p.x,
                  top: p.y,
                  width: size * p.size / 5,
                  height: size * p.size / 5,
                  backgroundColor: shapeColor,
                  opacity: p.opacity,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [p.opacity, p.opacity + 0.3, p.opacity],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4 + Math.random() * 3,
                  ease: "easeInOut",
                }}
              />
            );
          case 'square':
            return (
              <motion.div
                key={p.id}
                className="absolute pointer-events-none"
                style={{
                  left: p.x,
                  top: p.y,
                  width: size * p.size / 5,
                  height: size * p.size / 5,
                  backgroundColor: shapeColor,
                  opacity: p.opacity,
                  transform: `rotate(${p.rotation}deg)`
                }}
                animate={{
                  rotate: p.rotation + 360,
                  opacity: [p.opacity, p.opacity + 0.2, p.opacity],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "linear",
                }}
              />
            );
          case 'triangle':
            return (
              <motion.div
                key={p.id}
                className="absolute pointer-events-none"
                style={{
                  left: p.x,
                  top: p.y,
                  width: 0,
                  height: 0,
                  borderLeft: `${size * p.size / 10}px solid transparent`,
                  borderRight: `${size * p.size / 10}px solid transparent`,
                  borderBottom: `${size * p.size / 5}px solid ${shapeColor}`,
                  opacity: p.opacity,
                  transform: `rotate(${p.rotation}deg)`
                }}
                animate={{
                  rotate: p.rotation + 360,
                  opacity: [p.opacity, p.opacity + 0.2, p.opacity],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: "linear",
                }}
              />
            );
          case 'diamond':
            return (
              <motion.div
                key={p.id}
                className="absolute pointer-events-none"
                style={{
                  left: p.x,
                  top: p.y,
                  width: size * p.size / 5,
                  height: size * p.size / 5,
                  backgroundColor: shapeColor,
                  opacity: p.opacity,
                  transform: `rotate(45deg) translate(${p.rotation}deg)`
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [p.opacity, p.opacity + 0.3, p.opacity],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5 + Math.random() * 3,
                  ease: "easeInOut",
                }}
              />
            );
          case 'hexagon':
            return (
              <motion.div
                key={p.id}
                className="absolute pointer-events-none"
                style={{
                  left: p.x,
                  top: p.y,
                  width: size * p.size / 5,
                  height: size * p.size / 5 * 0.866,  // cos(30°) for proper hexagon shape
                  backgroundColor: shapeColor,
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  opacity: p.opacity,
                  transform: `rotate(${p.rotation}deg)`
                }}
                animate={{
                  rotate: [p.rotation, p.rotation + 180, p.rotation + 360],
                  opacity: [p.opacity, p.opacity + 0.2, p.opacity],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: "linear",
                }}
              />
            );
          default:
            return null;
        }
      }
      
      return null;
    });
  };

  return (
    <div className="min-h-screen py-16 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 transition-colors">
      <div className="container px-4 text-center mb-12">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
          Code Greek
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Bringing together competitive programming expertise and web development skills to create innovative solutions.
        </p>
      </div>
      
      {/* Interactive Canvas */}
      <div
        ref={canvasRef}
        className="relative w-full max-w-6xl h-[60vh] rounded-xl overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl border border-white/20 dark:border-gray-700/50 mb-8"
      >
        {renderParticles()}
        
        {/* Mouse follower effect */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ 
            left: mousePosition.x,
            top: mousePosition.y,
            x: "-50%",
            y: "-50%"
          }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-md"></div>
        </motion.div>
      </div>
      
      {/* Team Intro */}
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all hover:shadow-lg hover:scale-105">
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Vishwatej Shende</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Competitive Programmer with expertise in algorithms and data structures. Expert on Codeforces with a rating of 1711.</p>
            <a href="/profile/vishwatej" className="inline-flex items-center text-primary hover:underline">
              View Full Profile
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all hover:shadow-lg hover:scale-105">
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Shreyash Jambhulkar</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Web Developer specializing in modern frontend frameworks and UI/UX design. Developed several web applications including BookWellCare.</p>
            <a href="/profile/shreyash" className="inline-flex items-center text-secondary hover:underline">
              View Full Profile
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}