"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function PiercingGallery() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/piercings")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="piercing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Piercing munkáim
          </h2>
          <a
            href="/PiercingWork"
            className="relative text-gray-700 transition-colors duration-300 hover:text-gray-400 font-bold
              after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-gray-400 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 
              after:transition-all after:duration-300 hover:after:w-full"
          >
            További munkáim →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={3000}
            freeMode={true}
            slidesPerView={1} // mobilon 1
            spaceBetween={30}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={`http://localhost:5000${img}`}
                    alt={`Piercing ${idx + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
