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
  const router = useRouter();

  // Jogosultság ellenőrzés
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Nincs jogosúltságod!');
      router.push('/admin');
    }
  }, [router]);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
{images.map((img) => (
  <motion.div
    key={`${img.type}-${img.id}`} // <-- itt a unique key
    whileHover={{ scale: 1.03 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden relative border border-gray-200"
  >
    <img src={img.url} alt={img.type} className="w-full h-64 object-cover" />
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
    </div>
  );
}
