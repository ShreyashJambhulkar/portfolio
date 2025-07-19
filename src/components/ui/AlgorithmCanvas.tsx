// src/components/ui/AlgorithmCanvas.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface AlgorithmCanvasProps {
  className?: string;
}

export default function AlgorithmCanvas({ className = '' }: AlgorithmCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Array for sorting visualization
    const barCount = 40;
    const bars = Array.from({ length: barCount }, () => Math.random());
    let sortedBars = [...bars];
    let animationStep = 0;
    const maxAnimationSteps = 120;
    const animationStates: number[][] = [];
    
    // Generate sorting animation states
    const generateSortingStates = () => {
      // Clone the original array
      const array = [...bars];
      animationStates.push([...array]);
      
      // Bubble sort algorithm - recording each state
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          if (array[j] > array[j + 1]) {
            // Swap elements
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            // Save current state
            animationStates.push([...array]);
          }
        }
      }
      
      sortedBars = [...array];
    };
    
    generateSortingStates();
    
    // Graph visualization nodes
    const nodeCount = 20;
    const nodes: { x: number; y: number; vx: number; vy: number; connections: number[] }[] = [];
    
    // Initialize nodes
    const initializeNodes = () => {
      nodes.length = 0;
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: []
        });
      }
      
      // Create connections (edges)
      for (let i = 0; i < nodes.length; i++) {
        const connectionCount = Math.floor(Math.random() * 3) + 1;
        
        for (let j = 0; j < connectionCount; j++) {
          let target;
          
          do {
            target = Math.floor(Math.random() * nodes.length);
          } while (target === i || nodes[i].connections.includes(target));
          
          nodes[i].connections.push(target);
        }
      }
    };
    
    initializeNodes();
    
    // DFS traversal variables
    let currentTraversalIndex = 0;
    let visitedNodes: number[] = [];
    let traversalPath: number[] = [];
    
    // Generate DFS traversal
    const generateDFSTraversal = () => {
      visitedNodes = [];
      traversalPath = [];
      
      const dfs = (node: number) => {
        if (visitedNodes.includes(node)) return;
        
        visitedNodes.push(node);
        traversalPath.push(node);
        
        for (const connection of nodes[node].connections) {
          dfs(connection);
        }
      };
      
      dfs(0);
    };
    
    generateDFSTraversal();
    
    // Animation
    let lastTime = 0;
    let animationMode = 'sort'; // 'sort' or 'graph'
    let modeChangeTimeout: number | null = null;
    
    const switchMode = () => {
      animationMode = animationMode === 'sort' ? 'graph' : 'sort';
      animationStep = 0;
      currentTraversalIndex = 0;
      
      if (animationMode === 'graph') {
        initializeNodes();
        generateDFSTraversal();
      }
      
      // Schedule next mode change
      if (modeChangeTimeout) clearTimeout(modeChangeTimeout);
      modeChangeTimeout = window.setTimeout(switchMode, 10000);
    };
    
    // Start with a mode switch timeout
    modeChangeTimeout = window.setTimeout(switchMode, 10000);
    
    const animate = (timestamp: number) => {
      if (!ctx) return;
      
      // Calculate delta time
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set colors based on theme
      const primaryColor = isDarkMode ? 'rgba(59, 130, 246, 0.7)' : 'rgba(37, 99, 235, 0.7)';
      const secondaryColor = isDarkMode ? 'rgba(139, 92, 246, 0.7)' : 'rgba(124, 58, 237, 0.7)';
      const backgroundColor = isDarkMode ? 'rgba(17, 24, 39, 0.1)' : 'rgba(249, 250, 251, 0.1)';
      const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
      
      // Draw background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw visualization based on mode
      if (animationMode === 'sort') {
        const stateIndex = Math.min(
          Math.floor((animationStep / maxAnimationSteps) * animationStates.length),
          animationStates.length - 1
        );
        
        const currentState = animationStates[stateIndex];
        const barWidth = canvas.width / barCount;
        const maxBarHeight = canvas.height * 0.6;
        
        // Draw array
        currentState.forEach((value, index) => {
          // Gradient for bars
          const gradient = ctx.createLinearGradient(0, 0, 0, maxBarHeight * value);
          gradient.addColorStop(0, primaryColor);
          gradient.addColorStop(1, secondaryColor);
          
          ctx.fillStyle = gradient;
          ctx.fillRect(
            index * barWidth,
            canvas.height - maxBarHeight * value,
            barWidth - 1,
            maxBarHeight * value
          );
        });
        
        // Draw algorithm name
        ctx.fillStyle = textColor;
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Bubble Sort Visualization', canvas.width / 2, 30);
        
        // Update animation step
        animationStep = (animationStep + 1) % maxAnimationSteps;
      } else {
        // Graph visualization
        
        // Update node positions
        nodes.forEach((node) => {
          // Bounce off edges
          if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
          if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;
          
          // Apply velocity
          node.x += node.vx;
          node.y += node.vy;
        });
        
        // Draw edges
        ctx.strokeStyle = isDarkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(107, 114, 128, 0.2)';
        ctx.lineWidth = 1;
        
        nodes.forEach((node, i) => {
          node.connections.forEach((targetIndex) => {
            const target = nodes[targetIndex];
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          });
        });
        
        // Draw nodes
        nodes.forEach((node, index) => {
          const isVisited = visitedNodes.slice(0, currentTraversalIndex + 1).includes(index);
          const isActive = traversalPath[currentTraversalIndex] === index;
          
          if (isActive) {
            // Active node
            ctx.fillStyle = secondaryColor;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Pulse effect
            ctx.strokeStyle = secondaryColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 12 + Math.sin(timestamp / 200) * 3, 0, Math.PI * 2);
            ctx.stroke();
          } else if (isVisited) {
            // Visited node
            ctx.fillStyle = primaryColor;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Unvisited node
            ctx.fillStyle = isDarkMode ? 'rgba(209, 213, 219, 0.5)' : 'rgba(75, 85, 99, 0.5)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        
        // Update traversal index occasionally
        if (timestamp % 30 < 16) {
          currentTraversalIndex = (currentTraversalIndex + 1) % traversalPath.length;
        }
        
        // Draw algorithm name
        ctx.fillStyle = textColor;
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Graph Traversal (DFS)', canvas.width / 2, 30);
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      if (modeChangeTimeout) clearTimeout(modeChangeTimeout);
    };
  }, [isDarkMode]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`} 
      aria-hidden="true"
    />
  );
}