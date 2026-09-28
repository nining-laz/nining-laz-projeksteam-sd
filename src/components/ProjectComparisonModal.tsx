import React from 'react';
import { X, Award, ArrowRight } from 'lucide-react';
import { SteamProjectAlternative } from '../types';

interface ProjectComparisonModalProps {
  projects: SteamProjectAlternative[];
  onClose: () => void;
  onSelectProject: (project: SteamProjectAlternative) => void;
}

export const ProjectComparisonModal: React.FC<ProjectComparisonModalProps> = ({
  projects,
  onClose,
  onSelectProject,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-blue-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-blue-100 flex items-center justify-between bg-blue-50/60">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Matriks Perbandingan Alternatif Projek STEAM
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Bandingkan keselarasan, beban kerja, dan integrasi pilar STEAM sebelum menentukan pilihan.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-blue-100/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Table Area */}
        <div className="p-4 sm:p-6 overflow-auto">
          <div className="min-w-[760px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-blue-100">
                  <th className="p-3 font-bold text-slate-600 uppercase tracking-wider w-40 bg-blue-50/50 rounded-tl-xl">
                    Aspek Penilaian
                  </th>
                  {projects.map((proj, idx) => (
                    <th
                      key={proj.id || idx}
                      className={`p-3 font-bold text-slate-900 w-64 ${
                        proj.isRecommendedPick ? 'bg-blue-50/80 border-x-2 border-blue-200' : 'bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-black">
                          {idx + 1}
                        </span>
                        {proj.isRecommendedPick && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-[#38BDF8] text-slate-950 border border-sky-300">
                            <Award className="w-3 h-3 text-slate-950" />
                            Utama
                          </span>
                        )}
                      </div>
                      <div className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2">
                        {proj.title}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100/60">
                {/* 1. Pertanyaan Pemantik */}
                <tr>
                  <td className="p-3 font-bold text-slate-800 bg-blue-50/30 align-top">
                    Pertanyaan Pemantik
                  </td>
                  {projects.map((p) => (
                    <td key={p.id} className="p-3 text-slate-700 italic align-top">
                      "{p.drivingQuestion}"
                    </td>
                  ))}
                </tr>

                {/* 2. Produk Akhir */}
                <tr>
                  <td className="p-3 font-bold text-slate-800 bg-blue-50/30 align-top">
                    Produk / Karya
                  </td>
                  {projects.map((p) => (
                    <td key={p.id} className="p-3 text-slate-900 font-bold align-top">
                      {p.productOutcome}
                    </td>
                  ))}
                </tr>

                {/* 3. Integrasi Sains & Teknologi */}
                <tr>
                  <td className="p-3 font-bold text-slate-800 bg-blue-50/30 align-top">
                    Science & Tech
                  </td>
                  {projects.map((p) => (
                    <td key={p.id} className="p-3 text-slate-600 space-y-1 align-top">
                      <div><strong className="text-blue-700 font-bold">S:</strong> {p.steamIntegration.science}</div>
                      <div><strong className="text-indigo-700 font-bold">T:</strong> {p.steamIntegration.technology}</div>
                    </td>
                  ))}
                </tr>

                {/* 4. Rekayasa, Seni, Matematika */}
                <tr>
                  <td className="p-3 font-bold text-slate-800 bg-blue-50/30 align-top">
                    Eng, Arts, Math
                  </td>
                  {projects.map((p) => (
                    <td key={p.id} className="p-3 text-slate-600 space-y-1 align-top">
                      <div><strong className="text-sky-700 font-bold">E:</strong> {p.steamIntegration.engineering}</div>
                      <div><strong className="text-pink-700 font-bold">A:</strong> {p.steamIntegration.arts}</div>
                      <div><strong className="text-emerald-700 font-bold">M:</strong> {p.steamIntegration.mathematics}</div>
                    </td>
                  ))}
                </tr>

                {/* 5. Durasi & Tingkat Kesulitan */}
                <tr>
                  <td className="p-3 font-bold text-slate-800 bg-blue-50/30 align-top">
                    Durasi & Tingkat
                  </td>
                  {projects.map((p) => (
                    <td key={p.id} className="p-3 text-slate-700 align-top">
                      <div className="font-bold text-slate-800">{p.estimatedDuration}</div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-900 font-bold text-[11px]">
                        {p.difficultyLevel}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 6. Alat & Bahan Utama */}
                <tr>
                  <td className="p-3 font-bold text-slate-800 bg-blue-50/30 align-top">
                    Kebutuhan Bahan
                  </td>
                  {projects.map((p) => (
                    <td key={p.id} className="p-3 text-slate-600 align-top">
                      <ul className="list-disc list-inside space-y-0.5">
                        {p.toolsAndMaterials.slice(0, 3).map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* 7. Matriks Skor AI */}
                <tr>
                  <td className="p-3 font-bold text-slate-800 bg-blue-50/30 align-top">
                    Matriks AI (Rekomendasi)
                  </td>
                  {projects.map((p) => (
                    <td key={p.id} className="p-3 text-slate-700 align-top space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span>Kesesuaian CP:</span>
                        <span className="font-black text-blue-600">{p.suitabilityMatrix.cpAlignment}%</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span>Kesesuaian Usia:</span>
                        <span className="font-black text-blue-600">{p.suitabilityMatrix.ageAppropriateness}%</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span>Kekuatan STEAM:</span>
                        <span className="font-black text-blue-600">{p.suitabilityMatrix.steamIntegrationStrength}%</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span>Kelayakan:</span>
                        <span className="font-black text-blue-600">{p.suitabilityMatrix.feasibility}%</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 8. Action Row */}
                <tr>
                  <td className="p-3 bg-blue-50/50 font-bold text-slate-800">
                    Aksi
                  </td>
                  {projects.map((p) => (
                    <td key={p.id} className="p-3">
                      <button
                        onClick={() => {
                          onSelectProject(p);
                          onClose();
                        }}
                        className="w-full inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Pilih Projek</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-blue-100 bg-blue-50/50 flex items-center justify-between text-xs text-slate-600">
          <span>* Klik "Pilih Projek" untuk membuka rancangan modul pembelajaran lengkap.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border-2 border-blue-200 hover:bg-blue-100/60 text-slate-800 font-bold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

