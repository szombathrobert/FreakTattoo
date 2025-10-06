'use client';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Nincs jogosúltságod!');
      router.push('/admin');
    }
  }, [router])

  // Logout példa
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white py-4 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition-colors"
            onClick={() => router.push('/admin/upload/tattoo')}
          >
            Tetoválás kép feltöltés
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white py-4 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition-colors"
            onClick={() => router.push('/admin/upload/piercing')}
          >
            Piercing kép feltöltés
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-600 text-white py-4 rounded-lg font-semibold shadow-md hover:bg-gray-700 transition-colors"
            onClick={() => router.push('/admin/manage')}
          >
            Meglévő képek szerkesztése / törlése
          </motion.button>
        </div>

        <div className="mt-10 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white py-2 px-6 rounded-lg font-semibold shadow-md hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            Kijelentkezés
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
