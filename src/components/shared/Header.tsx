// src/components/shared/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Resume', path: '/#resume' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Activities', path: '/#extracurricular' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white dark:bg-gray-800 shadow-md py-2' 
        : 'bg-transparent dark:bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="h-8 w-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">TS</span>
          </span>
          <span className="font-bold text-lg dark:text-white">Code Greek</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors ${
                  pathname === link.path ? 'text-primary dark:text-primary font-medium' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          
          <button 
            className="text-gray-800 dark:text-white" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
                  pathname === link.path 
                    ? 'text-primary dark:text-primary font-medium' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}