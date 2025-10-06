'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useAdminAuth() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin'); // nincs token -> login
      return;
    }
    try {
      // Dekódoljuk a payloadot (nem ellenőrzi a signature-t, csak gyors check)
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.isAdmin) {
        router.push('/admin'); // nem admin
        return;
      }

      setLoading(false); // admin ok
    } catch (err) {
      console.error('Hibás token', err);
      router.push('/admin');
    }
  }, [router]);

  return { loading };
}
