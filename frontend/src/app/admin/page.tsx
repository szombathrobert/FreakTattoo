'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Hibás adatok');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Hálózati hiba, próbáld újra.');
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Hero háttér */}
      <motion.img
        src="/banner.jpg"
        alt="Tattoo banner"
        className="absolute max-w-none w-auto h-full object-contain left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* Login kártya */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-10 z-10"
      >
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Admin Bejelentkezés</h1>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 mb-4 text-center font-semibold"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Felhasználónév"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-3 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/20 text-white placeholder-white"
            required
          />
          <input
            type="password"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/20 text-white placeholder-white"
            required
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition-colors"
          >
            Bejelentkezés
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
