import React from 'react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="bg-white p-2.5 rounded-2xl text-blue-700 shadow-sm flex items-center justify-center">
            <Compass className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                STEAM-Gen SD
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-xs">
                Kelas 1–4 • Fase A & B
              </span>
            </div>
            <p className="text-xs text-blue-100 font-medium">
              Penentu & Perancang Projek STEAM Berbasis Capaian Pembelajaran (CP)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-blue-50 bg-white/15 px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-blue-200" />
            <span>Tanpa Database • Privasi Terjaga</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-[#38BDF8] px-3 py-1.5 rounded-xl shadow-xs border border-sky-300">
            <Sparkles className="w-4 h-4 text-slate-900" />
            <span>Didukung AI Gemini</span>
          </div>
        </div>
      </div>
    </header>
  );
};


