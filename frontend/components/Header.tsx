'use client';

import { useAuthStore, useAppStore } from '../store/useStore';
import { Menu, User, Zap } from 'lucide-react';
import { useSocket } from './providers/SocketProvider';

export default function Header() {
  const { user } = useAuthStore();
  const { toggleSidebar } = useAppStore();
  const { isConnected } = useSocket();

  return (
    <header className="h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 mr-4 text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-zinc-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium text-zinc-400">
            {isConnected ? 'System Live' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center text-sm text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
          <Zap className="w-4 h-4 text-yellow-500 mr-2" />
          Simulation Active
        </div>
        
        <div className="flex items-center space-x-3 border-l border-zinc-800 pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-zinc-200">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-zinc-500 capitalize">{user?.role || 'admin'}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <User className="w-5 h-5 text-zinc-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
