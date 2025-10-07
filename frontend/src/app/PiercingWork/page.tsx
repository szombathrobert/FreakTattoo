"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

export default function TattooWork() {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/piercings")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900">
        Piercing munkáim
      </h2>

            <div className="mb-6 text-center">
          <button
            onClick={() => router.push('/#')}
            className="text-gray-900 hover:text-gray-700 transition cursor-pointer"
          >
            ← Vissza a Kezdőlapra
          </button>
        </div>

      {images.length === 0 ? (
        <p className="text-center text-gray-500">Nincsenek feltöltött képek.</p>
      ) : (
        <div
          className="
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-3 
            lg:grid-cols-4
            gap-4
          "
        >
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={`http://localhost:5000${img}`}
                alt={`Tattoo ${idx + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
