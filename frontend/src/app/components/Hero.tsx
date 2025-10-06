"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Háttérkép arányosan, mindig teljesen látszik */}
      <motion.img
        src="/banner.jpg"
        alt="Tattoo banner"
        className="absolute max-w-none w-auto h-full object-contain left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Sötét overlay, hogy a szöveg jobban látszódjon */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Szöveges tartalom */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Üdv a Freak Tattoo weblapján
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-6 text-lg md:text-xl text-gray-200"
        >
          Egyedi tetoválások, profi kivitelezés, barátságos környezet.
        </motion.p>

        {/* Le nyíl animáció */}
        <motion.div
          className="mt-16 flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
