'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore, useAppStore } from '../store/useStore';
import { Activity, Bell, LayoutDashboard, Settings, ShieldAlert, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const { isSidebarOpen } = useAppStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Alerts', href: '/alerts', icon: Bell },
    { name: 'Analytics', href: '/analytics', icon: Activity },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  if (!isSidebarOpen) return null;

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 text-zinc-100 flex flex-col h-screen transition-all duration-300">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <ShieldAlert className="w-8 h-8 text-red-500 mr-3 animate-pulse" />
        <h1 className="font-bold text-xl tracking-wider text-red-500">INTRUDER</h1>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 rounded-lg transition-colors group',
                isActive 
                  ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
              )}
            >
              <item.icon className={cn('w-5 h-5 mr-3', isActive ? 'text-red-500' : 'group-hover:text-zinc-100')} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
