'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuthStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !user) {
      router.push('/login');
    }
  }, [hydrated, user, router]);

  // Wait for hydration before rendering anything
  if (!hydrated) return null;
  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-zinc-950/50">
          {children}
        </main>
      </div>
    </div>
  );
}
