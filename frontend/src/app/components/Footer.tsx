import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Bal oldal – logó és copyright */}
        <div className="flex flex-col items-center md:items-start text-gray-600">
          <Link href="/" className="text-lg font-semibold text-gray-800">
            Freak Tattoo
          </Link>
          <span className="text-sm text-gray-500">© {new Date().getFullYear()} Minden jog fenntartva.</span>
        </div>

        {/* Középső rész – menü */}
        <ul className="flex flex-wrap justify-center space-x-6 text-sm font-medium text-gray-600">
          <li>
            <Link href="#home" className="relative text-gray-700 transition-colors duration-300 hover:text-gray-500 font-bold
            after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-purple-500 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Kezdőlap</Link>
          </li>
          <li>
            <Link href="#about" className="relative text-gray-700 transition-colors duration-300 hover:text-gray-500 font-bold
            after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-purple-500 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Rólam</Link>
          </li>
          <li>
            <Link href="#services" className="relative text-gray-700 transition-colors duration-300 hover:text-gray-500 font-bold
            after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-purple-500 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Munkáim</Link>
          </li>
          <li>
            <Link href="#contact" className="relative text-gray-700 transition-colors duration-300 hover:text-gray-500 font-bold
            after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-purple-500 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Kapcsolat</Link>
          </li>
        </ul>

        {/* Jobb oldal – közösségi ikonok */}
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/freaktattoogy/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-gray-700 transition-colors duration-300 hover:text-gray-500 font-bold
            after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-purple-500 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://www.instagram.com/_freaktattoo_/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-gray-700 transition-colors duration-300 hover:text-gray-500 font-bold
            after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-purple-500 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
