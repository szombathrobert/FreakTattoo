"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Kapcsolat
        </motion.h2>

        <div className="md:flex md:space-x-16 space-y-8 md:space-y-0">
          {/* Elérhetőségek */}
          <motion.div
            className="flex-1 bg-gray-50 p-6 rounded-lg shadow-lg text-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Elérhetőség</h3>
            <p className="mb-2 text-gray-700">
              Cím: 9024. Győr, Marcalvárosi Aluljáró 2672/126/C
            </p>
            <p className="mb-2 text-gray-700">Telefon: +36 70/375-8511</p>
            <p className="mb-2 text-gray-700">Email: antikviar@gmail.com</p>
            <p className="mt-4 text-gray-700">Nyitvatartás: H–P 10:00–18:00</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
