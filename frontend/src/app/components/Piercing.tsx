"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper stílusok
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function PiercingGallery() {
  // Dummy képek
  const images = [
    "/dummy1.jpg",
    "/dummy2.jpg",
    "/dummy3.jpg",
    "/dummy4.jpg",
    "/dummy5.jpg",
    "/dummy6.jpg",
    "/dummy7.jpg",
  ];

  return (
    <section id="tattoo" className="py-20 bg-gray-50">
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
            href="#"
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
            loop={true}                // végtelenített slider
            autoplay={{
              delay: 0,                // nincs szünet a slide-ok között
              disableOnInteraction: false,
            }}
            speed={3000}               // sebesség (ms) az egész slide áthúzásra
            freeMode={true}            // folyamatos mozgás, nem ugrik
            slidesPerView={3}          // egyszerre 3 slide látszik
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={img}
                    alt={`Tetoválás ${idx + 1}`}
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
