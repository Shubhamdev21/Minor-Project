'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore, useAppStore } from '../store/useStore';
import { Activity, Bell, LayoutDashboard, Settings, ShieldAlert, LogOut, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const { isSidebarOpen, toggleSidebar } = useAppStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  useEffect(() => {
    if (window.innerWidth < 1024 && isSidebarOpen) {
      toggleSidebar();
    }
  }, [pathname]);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Alerts', href: '/alerts', icon: Bell },
    { name: 'Analytics', href: '/analytics', icon: Activity },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-zinc-950 border-r border-zinc-800 text-zinc-100 flex flex-col h-screen transition-transform duration-300',
          'lg:static lg:translate-x-0 lg:z-auto',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800 flex-shrink-0">
          <div className="flex items-center">
            <ShieldAlert className="w-7 h-7 text-red-500 mr-3 animate-pulse flex-shrink-0" />
            <h1 className="font-bold text-lg tracking-wider text-red-500">INTRUDER</h1>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden p-1 text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-3 rounded-lg transition-colors group',
                  isActive ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                )}
              >
                <item.icon className={cn('w-5 h-5 mr-3 flex-shrink-0', isActive ? 'text-red-500' : 'group-hover:text-zinc-100')} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-zinc-800 flex-shrink-0">
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
