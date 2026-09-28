import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-xs text-slate-700 flex items-start gap-3 shadow-xs">
      <div className="p-2 rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5">
        <ShieldAlert className="w-4 h-4 text-blue-700" />
      </div>
      <div className="space-y-0.5">
        <p className="font-bold text-slate-900 text-xs sm:text-sm">
          Panduan Etika & Penggunaan Rekomendasi AI:
        </p>
        <p className="leading-relaxed text-slate-600 text-xs">
          Rancangan projek dihasilkan oleh AI sebagai alternatif ide awal. Guru memegang kendali penuh untuk meninjau, menyelaraskan, dan menyesuaikan kegiatan dengan kondisi nyata siswa dan sarana sekolah. <strong className="text-slate-800">Jangan memasukkan data pribadi siswa</strong> (nama lengkap, NIS, alamat) ke dalam input.
        </p>
      </div>
    </div>
  );
};


