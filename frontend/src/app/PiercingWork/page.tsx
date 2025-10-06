"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function PiercingWork() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/piercings")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Piercing munkáim</h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1} // mobilon 1
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 3 }, // tablet + desktop
        }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <motion.div
              className="overflow-hidden rounded-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={`http://localhost:5000${img}`}
                alt={`Piercing ${idx + 1}`}
                className="w-full h-64 object-cover"
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
