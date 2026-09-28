import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

interface LoadingIndicatorProps {
  type?: 'alternatives' | 'detail';
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ type = 'alternatives' }) => {
  const alternativeSteps = [
    'Menganalisis tuntutan kompetensi dalam Capaian Pembelajaran (CP)...',
    'Memetakan karakteristik dan kesiapan kognitif/motorik siswa SD...',
    'Mengintegrasikan pilar Science, Technology, Engineering, Arts, dan Mathematics...',
    'Menyesuaikan kelayakan dengan batasan durasi dan sumber daya sekolah...',
    'Menyusun matriks kesesuaian dan rekomendasi alternatif projek STEAM...',
  ];

  const detailSteps = [
    'Menyusun identitas modul dan menurunkan Tujuan Pembelajaran (TP)...',
    'Merumuskan pertanyaan pemantik inkuiri yang merangsang rasa ingin tahu...',
    'Mendokumentasikan alur 8 tahapan projek terperinci untuk guru...',
    'Menyusun daftar alat-bahan dan panduan keselamatan kelas...',
    'Merancang rubrik asesmen holistik (proses & produk) 4 tingkat pencapaian...',
  ];

  const steps = type === 'alternatives' ? alternativeSteps : detailSteps;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2200);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="bg-white rounded-3xl border-2 border-blue-100 p-8 shadow-sm text-center max-w-xl mx-auto my-6">
      <div className="relative inline-flex items-center justify-center mb-5">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-blue-200 text-blue-600 flex items-center justify-center animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute -top-1 -right-1">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        </div>
      </div>

      <h3 className="text-lg font-black text-slate-900 mb-2">
        {type === 'alternatives'
          ? 'Sedang Merancang Alternatif Projek STEAM...'
          : 'Sedang Menyusun Rancangan Modul Lengkap...'}
      </h3>
      <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
        AI menganalisis keterkaitan kurikulum dan menyelaraskan unsur STEAM yang otentik untuk siswa SD.
      </p>

      <div className="bg-blue-50/50 rounded-2xl p-4 text-left border border-blue-100 space-y-2.5">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <div
              key={step}
              className={`flex items-center gap-2.5 text-xs transition-colors ${
                isCurrent
                  ? 'text-blue-950 font-bold'
                  : isDone
                  ? 'text-slate-400 font-medium'
                  : 'text-slate-300'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-blue-200 shrink-0" />
              )}
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

