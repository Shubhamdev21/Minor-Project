'use client';

import { useAuthStore, useAppStore } from '../store/useStore';
import { Menu, User, Zap } from 'lucide-react';
import { useSocket } from './providers/SocketProvider';

export default function Header() {
  const { user } = useAuthStore();
  const { toggleSidebar } = useAppStore();
  const { isConnected } = useSocket();

  return (
    <header className="h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-3 sm:px-6 sticky top-0 z-10 flex-shrink-0">
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={toggleSidebar} className="p-2 text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-zinc-800 transition-colors flex-shrink-0">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-xs sm:text-sm font-medium text-zinc-400">
            {isConnected ? 'System Live' : 'Disconnected'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center text-xs sm:text-sm text-zinc-400 bg-zinc-900 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-zinc-800">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 mr-1.5 sm:mr-2 flex-shrink-0" />
          <span className="hidden md:inline">Simulation Active</span>
          <span className="md:hidden">Sim</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 border-l border-zinc-800 pl-2 sm:pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs sm:text-sm font-medium text-zinc-200 truncate max-w-[120px]">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-zinc-500 capitalize">{user?.role || 'admin'}</p>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
