'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function UploadTattoo() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
    const router = useRouter();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Nincs jogosúltságod!');
        router.push('/admin');
      }
    }, [router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Kérlek válassz ki egy képet!');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/upload/tattoo', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('Sikeres feltöltés!');
        setFile(null);
      } else {
        setMessage('Hiba történt a feltöltés során.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Hiba történt a szerverrel.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Tetoválás kép feltöltése
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
            className="bg-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition-colors"
          >
            Feltöltés
          </motion.button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ← Vissza a Dashboardra
          </button>
        </div>
      </motion.div>
    </div>
  );
}
