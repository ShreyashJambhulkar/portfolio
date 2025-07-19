// src/components/about/CodeRacer.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Code snippets for different difficulty levels
const CODE_CHALLENGES = {
  easy: [
    {
      language: 'javascript',
      code: 'function isPrime(num) {\n  if (num <= 1) return false;\n  if (num <= 3) return true;\n  if (num % 2 === 0 || num % 3 === 0) return false;\n  for (let i = 5; i * i <= num; i += 6) {\n    if (num % i === 0 || num % (i + 2) === 0) return false;\n  }\n  return true;\n}',
      description: 'Check if a number is prime'
    },
    {
      language: 'python',
      code: 'def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []',
      description: 'Find two numbers that add up to target'
    }
  ],
  medium: [
    {
      language: 'cpp',
      code: '#include <vector>\nint maxSubArray(vector<int>& nums) {\n    int current_sum = nums[0];\n    int max_sum = nums[0];\n    \n    for (int i = 1; i < nums.size(); i++) {\n        current_sum = max(nums[i], current_sum + nums[i]);\n        max_sum = max(max_sum, current_sum);\n    }\n    \n    return max_sum;\n}',
      description: 'Maximum Subarray (Kadane\'s Algorithm)'
    }
  ],
  hard: [
    {
      language: 'cpp',
      code: '#include <vector>\n#include <queue>\nvector<int> dijkstra(vector<vector<pair<int, int>>>& graph, int start) {\n    int n = graph.size();\n    vector<int> dist(n, INT_MAX);\n    dist[start] = 0;\n    \n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;\n    pq.push({0, start});\n    \n    while (!pq.empty()) {\n        auto [d, u] = pq.top();\n        pq.pop();\n        \n        if (d > dist[u]) continue;\n        \n        for (auto [v, w] : graph[u]) {\n            if (dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    \n    return dist;\n}',
      description: 'Dijkstra\'s Shortest Path Algorithm'
    }
  ]
};

// Player characters
const CHARACTERS = [
  { 
    id: 'vishwatej',
    name: 'Vishwatej',
    carImage: '/images/cars/blue-car.png',
    color: 'blue',
    specialty: 'Faster in algorithm challenges'
  },
  {
    id: 'shreyash',
    name: 'Shreyash',
    carImage: '/images/cars/purple-car.png',
    color: 'purple',
    specialty: 'Faster in web development challenges'
  }
];

// Tracks
const TRACKS = [
  {
    id: 'beginner',
    name: 'Beginner Track',
    background: '/images/tracks/beginner-track.jpg',
    difficulty: 'easy'
  },
  {
    id: 'advanced',
    name: 'Advanced Track',
    background: '/images/tracks/advanced-track.jpg',
    difficulty: 'medium'
  },
  {
    id: 'expert',
    name: 'Expert Track',
    background: '/images/tracks/expert-track.jpg',
    difficulty: 'hard'
  }
];

export default function CodeRacer() {
  // Game states
  const [gameState, setGameState] = useState('menu'); // menu, selection, playing, finished
  const [difficulty, setDifficulty] = useState('easy');
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[0]);
  const [selectedTrack, setSelectedTrack] = useState(TRACKS[0]);
  const [currentChallenge, setCurrentChallenge] = useState(CODE_CHALLENGES.easy[0]);
  
  // Playing state
  const [typed, setTyped] = useState('');
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [carPosition, setCarPosition] = useState(0);
  const [speedBoost, setSpeedBoost] = useState(0);
  const [perfectStreak, setPerfectStreak] = useState(0);
  
  // Results
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  
  const codeRef = useRef(null);
  const inputRef = useRef(null);
  
  // Timer effect
  useEffect(() => {
    let intervalId;
    
    if (gameState === 'playing') {
      intervalId = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTime);
      }, 100);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [gameState, startTime]);
  
  // Calculate WPM and accuracy
  useEffect(() => {
    if (gameState === 'playing' && elapsedTime > 0) {
      const minutes = elapsedTime / 60000;
      const words = typed.length / 5; // Standard word length is 5 characters
      const calculatedWpm = Math.round(words / minutes);
      setWpm(calculatedWpm || 0);
      
      // Calculate accuracy
      const targetCode = currentChallenge.code;
      let correctChars = 0;
      
      for (let i = 0; i < typed.length && i < targetCode.length; i++) {
        if (typed[i] === targetCode[i]) {
          correctChars++;
        }
      }
      
      const calculatedAccuracy = typed.length > 0 
        ? Math.round((correctChars / typed.length) * 100) 
        : 100;
      
      setAccuracy(calculatedAccuracy);
      
      // Update car position based on progress
      setCarPosition(progress);
      
      // Handle perfect streak
      if (typed.length > 10 && calculatedAccuracy === 100) {
        setPerfectStreak(prev => prev + 1);
        if (perfectStreak > 5) {
          setSpeedBoost(prev => Math.min(prev + 0.5, 3)); // Maximum 3x boost
        }
      } else if (calculatedAccuracy < 90) {
        setPerfectStreak(0);
        setSpeedBoost(0);
      }
    }
  }, [typed, elapsedTime, gameState, currentChallenge.code, progress, perfectStreak]);
  
  // Handle typing
  const handleTyping = (e) => {
    if (gameState !== 'playing') return;
    
    const target = currentChallenge.code;
    const value = e.target.value;
    setTyped(value);
    
    // Calculate progress
    const newProgress = Math.min(100, Math.floor((value.length / target.length) * 100));
    setProgress(newProgress);
    
    // Check if race is finished
    if (value.length >= target.length) {
      setGameState('finished');
    }
  };
  
  // Start race
  const startRace = () => {
    // Select challenge based on difficulty
    const challenges = CODE_CHALLENGES[difficulty];
    const randomIndex = Math.floor(Math.random() * challenges.length);
    setCurrentChallenge(challenges[randomIndex]);
    
    // Reset race state
    setTyped('');
    setProgress(0);
    setErrors(0);
    setStartTime(Date.now());
    setElapsedTime(0);
    setCarPosition(0);
    setSpeedBoost(0);
    setPerfectStreak(0);
    
    setGameState('playing');
    
    // Focus input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };
  
  // Restart race
  const restartRace = () => {
    startRace();
  };
  
  // Return to menu
  const goToMenu = () => {
    setGameState('menu');
  };
  
  // Go to character selection
  const goToSelection = () => {
    setGameState('selection');
  };
  
  // Format time (mm:ss.ms)
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };
  
  // Render game based on state
  const renderGame = () => {
    switch (gameState) {
      case 'menu':
        return renderMenu();
      case 'selection':
        return renderSelection();
      case 'playing':
        return renderRace();
      case 'finished':
        return renderResults();
      default:
        return renderMenu();
    }
  };
  
  // Render menu screen
  const renderMenu = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto text-center"
    >
      <motion.h1 
        className="text-5xl font-bold mb-8"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Code Racer
        </span>
      </motion.h1>
      
      <motion.p 
        className="text-xl text-gray-600 dark:text-gray-300 mb-12"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Race against time by typing code snippets as fast and accurately as possible!
      </motion.p>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <Image 
          src="/images/code-racer-logo.png" 
          alt="Code Racer" 
          width={600} 
          height={300} 
          className="mx-auto"
        />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={goToSelection}
          className="px-8 py-4 bg-primary text-white rounded-lg text-xl font-bold hover:bg-primary/90 transition-colors"
        >
          Start Racing
        </button>
      </motion.div>
    </motion.div>
  );
  
  // Render character and track selection
  const renderSelection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Choose Your Racer & Track
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Character selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Choose Your Racer</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {CHARACTERS.map(character => (
              <button
                key={character.id}
                onClick={() => setSelectedCharacter(character)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedCharacter.id === character.id
                    ? character.color === 'blue'
                      ? 'border-primary bg-blue-50 dark:bg-blue-900/20'
                      : 'border-secondary bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="relative h-32 mb-3">
                  <Image 
                    src={character.carImage} 
                    alt={character.name}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-white">{character.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{character.specialty}</p>
              </button>
            ))}
          </div>
        </div>
        
        {/* Track selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Choose Your Track</h3>
          
          <div className="space-y-4">
            {TRACKS.map(track => (
              <button
                key={track.id}
                onClick={() => {
                  setSelectedTrack(track);
                  setDifficulty(track.difficulty);
                }}
                className={`flex items-center w-full p-3 rounded-lg border-2 transition-colors ${
                  selectedTrack.id === track.id
                    ? 'border-accent bg-cyan-50 dark:bg-cyan-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="w-24 h-16 relative overflow-hidden rounded-md mr-4">
                  <Image 
                    src={track.background} 
                    alt={track.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-800 dark:text-white">{track.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Difficulty: {track.difficulty.charAt(0).toUpperCase() + track.difficulty.slice(1)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={goToMenu}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Back to Menu
        </button>
        
        <button
          onClick={startRace}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Start Race
        </button>
      </div>
    </motion.div>
  );
  
  // Render race screen
  const renderRace = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {/* Race HUD */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image 
            src={selectedCharacter.carImage} 
            alt={selectedCharacter.name}
            width={60}
            height={30}
          />
          <span className="font-bold text-gray-800 dark:text-white">{selectedCharacter.name}</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Time:</span>
            <span className="ml-2 font-mono font-bold text-gray-800 dark:text-white">{formatTime(elapsedTime)}</span>
          </div>
          
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">WPM:</span>
            <span className="ml-2 font-mono font-bold text-gray-800 dark:text-white">{wpm}</span>
          </div>
          
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Accuracy:</span>
            <span className="ml-2 font-mono font-bold text-gray-800 dark:text-white">{accuracy}%</span>
          </div>
          
          {speedBoost > 0 && (
            <div className="bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full flex items-center">
              <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-yellow-600 dark:text-yellow-300">BOOST {speedBoost.toFixed(1)}x</span>
            </div>
          )}
        </div>
        
        <button
          onClick={restartRace}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
        >
          Restart
        </button>
      </div>
      
      {/* Race track */}
      <div className="relative h-36 mb-6 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${selectedTrack.background})` }}
        ></div>
        
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Progress indicators */}
        <div className="absolute inset-x-0 bottom-2 px-4">
          <div className="h-1 bg-white/30 rounded-full">
            <div 
              className="h-1 bg-white rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Car */}
        <motion.div
          className="absolute bottom-10"
          animate={{
            x: `calc(${carPosition}% - 30px)`
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15
          }}
        >
          <div className="relative">
            <Image 
              src={selectedCharacter.carImage} 
              alt={selectedCharacter.name}
              width={60}
              height={30}
            />
            
            {/* Speed boost effect */}
            {speedBoost > 0 && (
              <motion.div 
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-8"
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <div className="w-8 h-4 bg-gradient-to-l from-orange-500 to-transparent rounded-r-full"></div>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Finish line */}
        <div className="absolute top-0 bottom-0 right-8 w-1 bg-white"></div>
      </div>
      
      {/* Code challenge */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="mb-4">
          <h3 className="font-bold text-gray-800 dark:text-white text-lg">{currentChallenge.description}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Language: {currentChallenge.language}</p>
        </div>
        
        {/* Code display */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-hidden mb-6">
          <pre ref={codeRef} className="whitespace-pre-wrap">{currentChallenge.code}</pre>
        </div>
        
        {/* Input */}
        <div>
          <textarea
            ref={inputRef}
            value={typed}
            onChange={handleTyping}
            placeholder="Start typing the code..."
            className="w-full h-40 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg font-mono text-sm border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          ></textarea>
        </div>
      </div>
    </motion.div>
  );
  
  // Render results screen
  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Race Complete!
        </span>
      </h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <Image 
              src={selectedCharacter.carImage} 
              alt={selectedCharacter.name}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{formatTime(elapsedTime)}</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Speed</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{wpm} WPM</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{accuracy}%</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Characters</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{typed.length}</p>
          </div>
        </div>
        
        {/* Rating based on performance */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Rating</p>
          <div className="flex justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg 
                key={i} 
                className={`w-8 h-8 ${
                  i < Math.round(((wpm / 80) * 3 + (accuracy / 100) * 2) / 2)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={goToMenu}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Back to Menu
        </button>
        
        <button
          onClick={restartRace}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Race Again
        </button>
      </div>
    </motion.div>
  );
  
  return (
    <div className="min-h-screen py-16 flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950 transition-colors">
      <div className="container px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={gameState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderGame()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}