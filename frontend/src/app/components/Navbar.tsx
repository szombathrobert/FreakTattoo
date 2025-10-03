'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 left-0 shadow">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo.png" width={100} height={40} alt="Logo" />
        </Link>

        <div className="hidden md:flex flex-1 justify-center space-x-12">
          <Link href="#home" className="text-gray-700 hover:text-blue-700 font-bold">Kezdőlap</Link>
          <Link href="#about" className="text-gray-700 hover:text-blue-700 font-bold">Rólam</Link>
          <Link href="#services" className="text-gray-700 hover:text-blue-700 font-bold">Munkáim</Link>
          <Link href="#contact" className="text-gray-700 hover:text-blue-700 font-bold">Kapcsolat</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">
            <FaFacebookF size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-600">
            <FaInstagram size={20} />
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <span className="sr-only">Open menu</span>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center px-4 pb-4 text-gray-700 space-y-2">
          <Link href="#home" className="block py-2 text-gray-700">Kezdőlap</Link>
          <Link href="#about" className="block py-2 text-gray-700">Rólam</Link>
          <Link href="#services" className="block py-2 text-gray-700">Munkáim</Link>
          <Link href="#contact" className="block py-2 text-gray-700">Kapcsolat</Link>
          {/* Social ikonok mobilon */}
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">
              <FaFacebookF size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-600">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
