// src/components/about/AlgorithmPlayground.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Algorithm types and initial data
const ALGORITHMS = [
  { id: 'bubble', name: 'Bubble Sort', category: 'sorting' },
  { id: 'insertion', name: 'Insertion Sort', category: 'sorting' },
  { id: 'selection', name: 'Selection Sort', category: 'sorting' },
  { id: 'quick', name: 'Quick Sort', category: 'sorting' },
  { id: 'linear', name: 'Linear Search', category: 'searching' },
  { id: 'binary', name: 'Binary Search', category: 'searching' }
];

export default function AlgorithmPlayground() {
  const [algorithm, setAlgorithm] = useState(ALGORITHMS[0]);
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [array, setArray] = useState<number[]>([]);
  const [sortingSteps, setSortingSteps] = useState<number[][]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<number | null>(null);
  
  // Check dark mode
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);
  
  // Generate random array
  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setCurrentStep(0);
    setSortingSteps([newArray]);
    setComparingIndices([]);
    setSwappingIndices([]);
    setFoundIndex(null);
    
    if (algorithm.category === 'searching') {
      // For search algorithms, pick a random value from the array
      const randomIndex = Math.floor(Math.random() * newArray.length);
      setSearchValue(newArray[randomIndex]);
    }
  }, [arraySize, algorithm]);
  
  // Generate array on mount and when size changes
  useEffect(() => {
    generateArray();
  }, [generateArray, arraySize]);
  
  // Simulate algorithm steps
  const generateSortingSteps = useCallback(() => {
    const steps: number[][] = [array.slice()];
    const compareEvents: number[][] = [];
    const swapEvents: number[][] = [];
    
    const arr = array.slice();
    
    switch (algorithm.id) {
      case 'bubble': {
        // Bubble sort implementation
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            compareEvents.push([j, j + 1]);
            if (arr[j] > arr[j + 1]) {
              swapEvents.push([j, j + 1]);
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              steps.push(arr.slice());
            }
          }
        }
        break;
      }
      
      case 'insertion': {
        // Insertion sort implementation
        for (let i = 1; i < arr.length; i++) {
          const current = arr[i];
          let j = i - 1;
          
          compareEvents.push([i, j]);
          
          while (j >= 0 && arr[j] > current) {
            swapEvents.push([j, j + 1]);
            arr[j + 1] = arr[j];
            steps.push(arr.slice());
            j--;
            
            if (j >= 0) {
              compareEvents.push([i, j]);
            }
          }
          
          arr[j + 1] = current;
          steps.push(arr.slice());
        }
        break;
      }
      
      case 'selection': {
        // Selection sort implementation
        for (let i = 0; i < arr.length - 1; i++) {
          let minIndex = i;
          
          for (let j = i + 1; j < arr.length; j++) {
            compareEvents.push([minIndex, j]);
            if (arr[j] < arr[minIndex]) {
              minIndex = j;
            }
          }
          
          if (minIndex !== i) {
            swapEvents.push([i, minIndex]);
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            steps.push(arr.slice());
          }
        }
        break;
      }
      
      case 'quick': {
        // Quick sort implementation (simplified for visualization)
        const quickSortRecursive = (low: number, high: number) => {
          if (low < high) {
            const pivotIndex = partition(low, high);
            quickSortRecursive(low, pivotIndex - 1);
            quickSortRecursive(pivotIndex + 1, high);
          }
        };
        
        const partition = (low: number, high: number): number => {
          const pivot = arr[high];
          let i = low - 1;
          
          for (let j = low; j <= high - 1; j++) {
            compareEvents.push([j, high]);
            
            if (arr[j] < pivot) {
              i++;
              swapEvents.push([i, j]);
              [arr[i], arr[j]] = [arr[j], arr[i]];
              steps.push(arr.slice());
            }
          }
          
          swapEvents.push([i + 1, high]);
          [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
          steps.push(arr.slice());
          
          return i + 1;
        };
        
        quickSortRecursive(0, arr.length - 1);
        break;
      }
    }
    
    setSortingSteps(steps);
    
    return { steps, compareEvents, swapEvents };
  }, [array, algorithm]);
  
  const generateSearchingSteps = useCallback(() => {
    if (!searchValue) return;
    
    const steps: number[][] = [array.slice()];
    const compareEvents: number[][] = [];
    let found: number | null = null;
    
    switch(algorithm.id) {
      case 'linear': {
        // Linear search
        for (let i = 0; i < array.length; i++) {
          compareEvents.push([i]);
          if (array[i] === searchValue) {
            found = i;
            break;
          }
        }
        break;
      }
      
      case 'binary': {
        // Sort the array first for binary search
        const sortedArray = [...array].sort((a, b) => a - b);
        setArray(sortedArray);
        
        // Binary search
        let left = 0;
        let right = sortedArray.length - 1;
        
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          compareEvents.push([mid]);
          
          if (sortedArray[mid] === searchValue) {
            found = mid;
            break;
          }
          
          if (sortedArray[mid] < searchValue) {
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
        break;
      }
    }
    
    return { compareEvents, found };
  }, [array, algorithm, searchValue]);
  
  // Play/pause the visualization
  const togglePlay = () => {
    if (!isPlaying) {
      if (algorithm.category === 'sorting') {
        const { steps } = generateSortingSteps();
        if (currentStep >= steps.length - 1) {
          setCurrentStep(0); // Reset to beginning if at end
        }
      } else if (algorithm.category === 'searching') {
        setFoundIndex(null); // Reset found index
      }
      
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };
  
  // Reset the visualization
  const resetVisualization = () => {
    setIsPlaying(false);
    generateArray();
  };
  
  // Step through the algorithm manually
  const stepForward = () => {
    if (algorithm.category === 'sorting') {
      if (currentStep < sortingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
  const stepBackward = () => {
    if (algorithm.category === 'sorting') {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    }
  };
  
  // Animation effect
  useEffect(() => {
    if (!isPlaying) return;
    
    let timeoutId: NodeJS.Timeout;
    
    if (algorithm.category === 'sorting') {
      if (currentStep < sortingSteps.length - 1) {
        timeoutId = setTimeout(() => {
          setCurrentStep(step => step + 1);
        }, 1000 - speed * 8);
      } else {
        setIsPlaying(false);
      }
    } else if (algorithm.category === 'searching') {
      const { compareEvents, found } = generateSearchingSteps();
      
      if (!compareEvents) return;
      
      let stepCount = 0;
      
      const runStep = () => {
        if (stepCount < compareEvents.length) {
          setComparingIndices(compareEvents[stepCount]);
          stepCount++;
          timeoutId = setTimeout(runStep, 1000 - speed * 8);
        } else {
          setFoundIndex(found);
          setIsPlaying(false);
        }
      };
      
      timeoutId = setTimeout(runStep, 100);
    }
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPlaying, currentStep, sortingSteps, speed, algorithm, generateSearchingSteps]);
  
  return (
    <div className="min-h-screen py-16 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Algorithm Playground
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Visualize and interact with different algorithms to understand how they work.
            Select an algorithm, adjust the settings, and watch the magic happen!
          </p>
        </div>
        
        {/* Control Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Algorithm Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Algorithm
              </label>
              <div className="grid grid-cols-1 gap-2">
                {ALGORITHMS.map(algo => (
                  <button
                    key={algo.id}
                    className={`px-4 py-2 rounded-lg text-left transition-colors ${
                      algorithm.id === algo.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => {
                      setAlgorithm(algo);
                      resetVisualization();
                    }}
                  >
                    {algo.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Controls */}
            <div className="space-y-4">
              {/* Array Size Control */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Array Size: {arraySize}
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={arraySize}
                  onChange={e => setArraySize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  disabled={isPlaying}
                />
              </div>
              
              {/* Speed Control */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Speed: {speed}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={speed}
                  onChange={e => setSpeed(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Search Value (for searching algorithms) */}
              {algorithm.category === 'searching' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search For: {searchValue}
                  </label>
                  <div className="flex items-center">
                    <button
                      className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                      onClick={() => {
                        const randomIndex = Math.floor(Math.random() * array.length);
                        setSearchValue(array[randomIndex]);
                        setFoundIndex(null);
                      }}
                      disabled={isPlaying}
                    >
                      Pick Random Value
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pause
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Play
                    </>
                  )}
                </button>
                
                <button
                  className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                  onClick={resetVisualization}
                  disabled={isPlaying}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
              </div>
              
              {algorithm.category === 'sorting' && (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button
                    className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                    onClick={stepBackward}
                    disabled={isPlaying || currentStep === 0}
                  >
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                    onClick={stepForward}
                    disabled={isPlaying || currentStep === sortingSteps.length - 1}
                  >
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
              
              {algorithm.category === 'sorting' && (
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                  Step {currentStep + 1} of {sortingSteps.length}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Visualization Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 overflow-hidden max-w-4xl mx-auto">
          <div className="h-[300px] flex items-end justify-center relative">
            {algorithm.category === 'sorting' && sortingSteps[currentStep] && (
              <AnimatePresence>
                {sortingSteps[currentStep].map((value, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / 100) * 280}px` }}
                    transition={{ duration: 0.3 }}
                    className={`w-[${100 / arraySize}%] mx-[1px] rounded-t-sm ${
                      comparingIndices.includes(index)
                        ? 'bg-yellow-400 dark:bg-yellow-500'
                        : swappingIndices.includes(index)
                          ? 'bg-green-400 dark:bg-green-500'
                          : 'bg-blue-400 dark:bg-blue-500'
                    }`}
                  >
                    {arraySize <= 20 && (
                      <div className="text-xs text-center mt-2">{value}</div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            
            {algorithm.category === 'searching' && (
              <AnimatePresence>
                {array.map((value, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ height: 0 }}
                    animate={{ 
                      height: `${(value / 100) * 280}px`,
                      backgroundColor: foundIndex === index 
                        ? '#10B981' // green-500
                        : comparingIndices.includes(index)
                          ? '#FBBF24' // yellow-400
                          : isDarkMode ? '#3B82F6' : '#60A5FA' // blue-500 or blue-400
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-[${100 / arraySize}%] mx-[1px] rounded-t-sm`}
                  >
                    {arraySize <= 20 && (
                      <div className="text-xs text-center mt-2">{value}</div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            
            {foundIndex !== null && algorithm.category === 'searching' && (
              <div className="absolute top-4 inset-x-0 text-center">
                <div className={`inline-block px-4 py-2 rounded-lg ${
                  foundIndex >= 0 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {foundIndex >= 0
                    ? `Found ${searchValue} at index ${foundIndex}!`
                    : `${searchValue} not found in array!`
                  }
                </div>
              </div>
            )}
          </div>
          
          {/* Status Bar */}
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Algorithm:</span> {algorithm.name} | 
              <span className="font-medium ml-2">Category:</span> {algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)} |
              <span className="font-medium ml-2">Array Size:</span> {arraySize} elements
              
              {algorithm.category === 'searching' && searchValue !== null && (
                <span> | <span className="font-medium">Searching for:</span> {searchValue}</span>
              )}
            </div>
            
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {algorithm.id === 'bubble' && 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.'}
              {algorithm.id === 'insertion' && 'Builds the sorted array one item at a time by inserting each new element at its correct position.'}
              {algorithm.id === 'selection' && 'Divides the array into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region.'}
              {algorithm.id === 'quick' && 'Uses a divide-and-conquer strategy by selecting a "pivot" element and partitioning the array around it.'}
              {algorithm.id === 'linear' && 'Sequentially checks each element of the list until a match is found or the whole list has been searched.'}
              {algorithm.id === 'binary' && 'Finds a target value by repeatedly dividing in half the section that could contain the target value.'}
            </div>
          </div>
        </div>
        
        {/* Information Section */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Vishwatej Shende</h3>
              <p className="text-gray-600 dark:text-gray-300">Competitive Programmer with expertise in algorithms and data structures. Expert on Codeforces with a rating of 1711.</p>
              <a href="/profile/vishwatej" className="mt-3 inline-flex items-center text-primary hover:underline">
                View Full Profile
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Shreyash Jambhulkar</h3>
              <p className="text-gray-600 dark:text-gray-300">Web Developer specializing in modern frontend frameworks and UI/UX design. Developed several web applications including BookWellCare.</p>
              <a href="/profile/shreyash" className="mt-3 inline-flex items-center text-secondary hover:underline">
                View Full Profile
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}