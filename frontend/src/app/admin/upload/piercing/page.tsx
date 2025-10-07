'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function UploadPiercing() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
    const router = useRouter();
  
    // Jogosultság ellenőrzés
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        setShowUnauthorizedModal(true); // Modal megjelenítése
      }
    }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage('📁 Kérlek válassz ki egy képet!');

    setLoading(true);
    setMessage('');

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', 'piercing'); // <- fontos, mert így tudja hova menteni

    try {
      const res = await fetch('http://localhost:5000/api/piercings/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Sikeres feltöltés!');
        setFile(null);
        setTimeout(() => router.push('/admin/manage'), 1500);
      } else {
        setMessage(`❌ Hiba: ${data.message || 'Ismeretlen hiba történt.'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Szerver hiba a feltöltés során.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full border border-gray-200"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Piercing kép feltöltése
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-2"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`${
              loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'
            } text-white py-3 rounded-lg font-semibold shadow-md transition-colors`}
          >
            {loading ? 'Feltöltés folyamatban...' : 'Feltöltés'}
          </motion.button>
        </form>

        {message && (
          <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ← Vissza a Dashboardra
          </button>
        </div>
      </motion.div>
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
