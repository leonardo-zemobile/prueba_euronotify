'use client'

import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-scaleIn">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="aspect-video flex items-center justify-center bg-slate-900">
          {/* Placeholder for actual video embed */}
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
            </div>
            <h3 className="text-xl font-bold">Demo de EuroNotify</h3>
            <p className="text-slate-400 mt-2">Simulación de reproducción de video (YouTube/Vimeo)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;