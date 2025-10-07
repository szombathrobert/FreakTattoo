'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type ImageItem = {
  id: string;
  url: string;
  type: 'tattoo' | 'piercing';
};

export default function ManageImages() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
  const router = useRouter();

  // Jogosultság ellenőrzés
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowUnauthorizedModal(true); // Modal megjelenítése
    }
  }, []);

  // Képek betöltése
  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/images');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Kép törlése
  const handleDelete = async (img: ImageItem) => {
    if (!confirm('Biztosan törölni szeretnéd a képet?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `http://localhost:5000/api/images/${img.id}?type=${img.type}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        setImages(images.filter((i) => i.id !== img.id));
        window.location.reload();
      } else {
        alert('Hiba a törlés során!');
      }
    } catch (err) {
      console.error(err);
      alert('Hálózati hiba!');
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Betöltés...</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Feltöltött képek kezelése
      </h1>

      <div className="mb-6 text-center">
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
        >
          ← Vissza a Dashboardra
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <motion.div
            key={`${img.type}-${img.id}`} // unique key
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden relative border border-gray-200"
          >
            <img src={`http://localhost:5000${img.url}`} alt={img.type} className="w-full h-64 object-cover" />
            <div className="p-4 flex justify-between items-center">
              <span className="capitalize font-semibold text-gray-700">{img.type}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(img)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg shadow hover:bg-red-700 transition"
              >
                Törlés
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Jogosultság hiány modal */}
      {showUnauthorizedModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Háttér blur + fekete átlátszó overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xl"></div>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200/30 text-center z-10"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Nincs jogosultságod!
            </h2>
            <p className="mb-6 text-gray-600">
              Ehhez az oldalhoz csak admin felhasználó férhet hozzá.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/admin')}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Vissza a bejelentkezéshez
            </motion.button>
          </motion.div>
        </div>
      )}

    </div>
  );
}
