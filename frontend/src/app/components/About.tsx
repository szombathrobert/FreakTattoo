"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:flex md:items-center md:space-x-12">
        {/* Kép bal oldalon */}
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/about_image.jpg" // ide a saját képed
            alt="Rólam kép"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </motion.div>

        {/* Szöveg jobbra */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Üdvözöllek Németh Gergely vagyok a Freak Tattoo tulajdonosa
          </h2>
          <p className="text-gray-700 mb-4">
            Évek óta foglalkozom tetoválással és piercinggel, mindig a
            minőségre és a részletekre figyelve. Egyedi mintákat készítek,
            amelyek tükrözik a vendégek személyiségét.
          </p>
          <p className="text-gray-700">
            Minden munkámat precíz, biztonságos környezetben végzem, ahol a
            kreativitás és a kényelem kéz a kézben jár.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
