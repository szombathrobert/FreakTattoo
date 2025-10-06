"use client";

import { motion } from "framer-motion";
import Image from "next/image";


export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Mivel foglalkozok
        </motion.h2>

        <div className="md:flex md:justify-center md:space-x-16 space-y-8 md:space-y-0">
          {/* Tetoválás */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="bg-red-300 text-white p-6 rounded-full text-4xl mb-4 shadow-lg">
            <Image
                src="/tattoo_icon.png" // ide a saját képed
                alt="tattoo icon"
                width={70}
                height={70}
            />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Tetoválás</h3>
            <p className="text-gray-600 max-w-xs">
              Egyedi, profi tetoválások minden stílusban, mindig precíz és
              biztonságos kivitelezésben.
            </p>
          </motion.div>

          {/* Piercing */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="bg-emerald-400 text-white p-6 rounded-full text-4xl mb-4 shadow-lg">
            <Image
                src="/piercing_icon.png" // ide a saját képed
                alt="Piercing icon"
                width={70}
                height={70}    
            />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Piercing szúrás</h3>
            <p className="text-gray-600 max-w-xs">
              Precíz piercingek, higiénikus környezetben, egyedi igények szerint.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
