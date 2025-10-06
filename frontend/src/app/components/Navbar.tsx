'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Menü bezárása ha a user máshova kattint
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white fixed w-full z-50 top-0 left-0 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo.png" width={100} height={40} alt="Logo" priority />
        </Link>

        {/* Center links (desktop) */}
        <div className="hidden md:flex flex-1 justify-center space-x-12">
          {[
            { href: '#home', label: 'Kezdőlap' },
            { href: '#about', label: 'Rólam' },
            { href: '#services', label: 'Munkáim' },
            { href: '#contact', label: 'Kapcsolat' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-gray-700 transition-colors duration-300 hover:text-gray-400 font-bold
              after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-gray-400 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 
              after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social icons (desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-gray-700 transition-colors duration-300 hover:text-gray-400 font-bold
              after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-gray-400 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 
              after:transition-all after:duration-300 hover:after:w-full"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-gray-700 transition-colors duration-300 hover:text-gray-400 font-bold
              after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-gray-400 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 
              after:transition-all after:duration-300 hover:after:w-full"
          >
            <FaInstagram size={20} />
          </a>
        </div>

        {/* Mobile toggle button */}
        <button
          className="md:hidden hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="md:hidden bg-white overflow-hidden shadow-inner"
          >
            <div className="flex flex-col items-center px-4 py-4 text-gray-700 space-y-2 font-semibold">
              {[
                { href: '#home', label: 'Kezdőlap' },
                { href: '#about', label: 'Rólam' },
                { href: '#services', label: 'Munkáim' },
                { href: '#contact', label: 'Kapcsolat' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="relative text-gray-700 transition-colors duration-300 hover:text-gray-400 font-bold
              after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-gray-400 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 
              after:transition-all after:duration-300 hover:after:w-full block py-4"
                >
                  {link.label}
                </Link>
              ))}

              {/* Social icons on mobile */}
              <div className="flex space-x-6 pt-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-gray-700 transition-colors duration-300 hover:text-gray-400 font-bold
              after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-gray-400 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 
              after:transition-all after:duration-300 hover:after:w-full block py-4"
                >
                  <FaFacebookF size={22} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-gray-700 transition-colors duration-300 hover:text-gray-400 font-bold
              after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-gray-400 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 
              after:transition-all after:duration-300 hover:after:w-full block py-4"
                >
                  <FaInstagram size={22} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
