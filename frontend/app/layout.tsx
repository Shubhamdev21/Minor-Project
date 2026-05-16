import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SocketProvider } from '@/components/providers/SocketProvider';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster as ShadcnToaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Intruder Alert System',
  description: 'Real-time motion detection and alert monitoring dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50`}>
        <SocketProvider>
          {children}
          <SonnerToaster theme="dark" position="top-right" />
          <ShadcnToaster />
        </SocketProvider>
      </body>
    </html>
  );
}
