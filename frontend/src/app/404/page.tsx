"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-white px-4 text-gray-900 overflow-hidden">
      {/* 404 kép */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image 
          src="/404.png" 
          width={200} 
          height={200} 
          alt="404 Not Found" 
          loading="lazy"
        />
      </motion.div>

      {/* Leírás */}
      <motion.p
        className="text-center text-lg md:text-xl text-gray-900 mb-8 max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        A keresett oldal nem található. Kérlek térj vissza az előző vagy a főoldalra.
      </motion.p>

      {/* Visszatérés gomb */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          href="/"
          className="bg-gray-600 hover:bg-gray-800 transition-colors px-6 py-3 rounded-lg font-semibold shadow-lg text-white"
        >
          Vissza a kezdőlapra
        </Link>
      </motion.div>
    </div>
  );
}
