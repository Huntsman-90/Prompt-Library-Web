import React from 'react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-slate-950 shadow-lg animate-bounce">
      <WifiOff className="w-3.5 h-3.5" />
      <span>Offline Mode — All features fully active</span>
    </div>
  );
};
