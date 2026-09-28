import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  Layers,
  Clock,
  Wrench,
  HelpCircle,
  Check,
  Copy,
  SlidersHorizontal,
  ArrowRight,
  RefreshCw,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Cpu,
  Hammer,
  Palette,
  Calculator,
  Info,
  Lightbulb,
} from 'lucide-react';
import { SteamProjectAlternative, SteamFormData } from '../types';
import { formatProjectSummaryToMarkdown } from '../utils/exportUtils';

interface ProjectAlternativesListProps {
  projects: SteamProjectAlternative[];
  formData: SteamFormData;
  onSelectProject: (project: SteamProjectAlternative) => void;
  onCompareProjects: () => void;
  onRegenerate: () => void;
  onReset: () => void;
  isDetailLoading: boolean;
}

export const ProjectAlternativesList: React.FC<ProjectAlternativesListProps> = ({
  projects,
  formData,
  onSelectProject,
  onCompareProjects,
  onRegenerate,
  onReset,
  isDetailLoading,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id || null);

  const handleCopySummary = (project: SteamProjectAlternative, e: React.MouseEvent) => {
    e.stopPropagation();
    const md = formatProjectSummaryToMarkdown(project);
    navigator.clipboard.writeText(md);
    setCopiedId(project.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-100 border-emerald-300';
    if (score >= 80) return 'text-blue-700 bg-blue-100 border-blue-300';
    if (score >= 70) return 'text-amber-800 bg-amber-100 border-amber-300';
    return 'text-slate-700 bg-slate-100 border-slate-300';
  };

  const topPick = projects.find((p) => p.isRecommendedPick) || projects[0];

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="bg-white rounded-3xl border-2 border-blue-100 p-6 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
              {formData.grade}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {formData.duration} • Kompleksitas: {formData.complexity}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Rekomendasi Projek STEAM ({projects.length} Alternatif)
          </h2>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
            Berdasarkan CP: "{formData.cp}"
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onCompareProjects}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-blue-200 hover:border-blue-300 bg-white text-slate-700 text-xs font-bold hover:bg-blue-50/50 transition-all shadow-2xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>Bandingkan Alternatif</span>
          </button>

          <button
            onClick={onRegenerate}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-blue-200 hover:border-blue-300 bg-white text-slate-700 text-xs font-bold hover:bg-blue-50/50 transition-all shadow-2xs cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-slate-600" />
            <span>Regenerasi</span>
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Baru</span>
          </button>
        </div>
      </div>

      {/* Alternatives Cards List */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => {
          const isExpanded = expandedId === project.id;
          const isRecommended = project.isRecommendedPick || index === 0;

          return (
            <div
              key={project.id || `proj-${index}`}
              className={`bg-white rounded-3xl border-2 transition-all duration-200 overflow-hidden shadow-sm flex flex-col ${
                isRecommended
                  ? 'border-blue-600 ring-2 ring-blue-200/60'
                  : 'border-blue-100 hover:border-blue-400'
              }`}
            >
              {/* Card Banner / Header */}
              <div className="p-6 sm:p-7 pb-4 border-b border-blue-100 bg-white">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>

                    {isRecommended && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#38BDF8] text-slate-950 border border-sky-300 shadow-2xs">
                        <Award className="w-3.5 h-3.5 text-slate-950" />
                        Rekomendasi Utama AI
                      </span>
                    )}

                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Sesuai CP: {project.suitabilityMatrix.cpAlignment}%
                    </span>

                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                      {project.difficultyLevel}
                    </span>

                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {project.estimatedDuration}
                    </span>
                  </div>

                  {/* S-T-E-A-M mini circular badges */}
                  <div className="flex items-center gap-1.5">
                    <span title="Science" className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black text-[10px] flex items-center justify-center">
                      S
                    </span>
                    <span title="Technology" className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-black text-[10px] flex items-center justify-center">
                      T
                    </span>
                    <span title="Engineering" className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-black text-[10px] flex items-center justify-center">
                      E
                    </span>
                    <span title="Arts" className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 font-black text-[10px] flex items-center justify-center">
                      A
                    </span>
                    <span title="Mathematics" className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-black text-[10px] flex items-center justify-center">
                      M
                    </span>

                    {/* Quick Copy Button */}
                    <button
                      onClick={(e) => handleCopySummary(project, e)}
                      className="ml-1 inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-white px-2.5 py-1 rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer font-bold"
                      title="Salin ringkasan projek"
                    >
                      {copiedId === project.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                  {project.title}
                </h3>

                {/* Driving Question */}
                <div className="mt-3 p-4 rounded-2xl bg-blue-50/70 border-2 border-blue-200 text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  <span className="font-bold text-blue-700 mr-1.5">Pertanyaan Pemantik:</span>
                  "{project.drivingQuestion}"
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-6">
                {/* 1. Alasan Keselarasan CP */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    Kesesuaian dengan Capaian Pembelajaran (CP)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-blue-50/40 p-4 rounded-2xl border border-blue-100">
                    {project.cpAlignmentReason}
                  </p>
                </div>

                {/* 2. S-T-E-A-M Breakdown Chips */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    Integrasi 5 Pilar STEAM
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {/* Science */}
                    <div className="p-3 rounded-2xl border border-blue-200 bg-blue-50/60">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 mb-1">
                        <FlaskConical className="w-4 h-4 text-blue-600" />
                        <span>Science</span>
                      </div>
                      <p className="text-[11px] text-blue-950 leading-relaxed line-clamp-3">
                        {project.steamIntegration.science}
                      </p>
                    </div>

                    {/* Technology */}
                    <div className="p-3 rounded-2xl border border-indigo-200 bg-indigo-50/60">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 mb-1">
                        <Cpu className="w-4 h-4 text-indigo-600" />
                        <span>Technology</span>
                      </div>
                      <p className="text-[11px] text-indigo-950 leading-relaxed line-clamp-3">
                        {project.steamIntegration.technology}
                      </p>
                    </div>

                    {/* Engineering */}
                    <div className="p-3 rounded-2xl border border-sky-200 bg-sky-50/60">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900 mb-1">
                        <Hammer className="w-4 h-4 text-sky-600" />
                        <span>Engineering</span>
                      </div>
                      <p className="text-[11px] text-sky-950 leading-relaxed line-clamp-3">
                        {project.steamIntegration.engineering}
                      </p>
                    </div>

                    {/* Arts */}
                    <div className="p-3 rounded-2xl border border-pink-200 bg-pink-50/60">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-pink-900 mb-1">
                        <Palette className="w-4 h-4 text-pink-600" />
                        <span>Arts</span>
                      </div>
                      <p className="text-[11px] text-pink-950 leading-relaxed line-clamp-3">
                        {project.steamIntegration.arts}
                      </p>
                    </div>

                    {/* Mathematics */}
                    <div className="p-3 rounded-2xl border border-emerald-200 bg-emerald-50/60">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
                        <Calculator className="w-4 h-4 text-emerald-600" />
                        <span>Mathematics</span>
                      </div>
                      <p className="text-[11px] text-emerald-950 leading-relaxed line-clamp-3">
                        {project.steamIntegration.mathematics}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Produk Akhir & Aktivitas Utama */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-blue-100 bg-white">
                    <h4 className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-blue-600" />
                      Produk / Karya Nyata
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                      {project.productOutcome}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-blue-100 bg-white">
                    <h4 className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-blue-600" />
                      Alat & Bahan Utama
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {project.toolsAndMaterials.slice(0, 4).join(', ')}
                      {project.toolsAndMaterials.length > 4 ? ` + ${project.toolsAndMaterials.length - 4} lainnya` : ''}
                    </p>
                  </div>
                </div>

                {/* Toggle Additional Details */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  <span>{isExpanded ? 'Sembunyikan Matriks & Rincian' : 'Tampilkan Matriks & Catatan Penyesuaian'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Expanded Content: Matriks Kesesuaian AI & Notes */}
                {isExpanded && (
                  <div className="pt-4 border-t border-blue-100 space-y-4 animate-in fade-in duration-150">
                    {/* AI Suitability Radar/Metrics */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          Matriks Kesesuaian (Indikator Rekomendasi AI)
                        </h4>
                        <span className="text-[11px] text-slate-400 italic">
                          Bukan penilaian resmi
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        <div className="p-3 rounded-2xl border border-blue-100 bg-white text-center">
                          <div className="text-[11px] text-slate-500 font-medium mb-1">Kesesuaian CP</div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-black border ${getScoreColor(project.suitabilityMatrix.cpAlignment)}`}>
                            {project.suitabilityMatrix.cpAlignment}%
                          </span>
                        </div>

                        <div className="p-3 rounded-2xl border border-blue-100 bg-white text-center">
                          <div className="text-[11px] text-slate-500 font-medium mb-1">Kesesuaian Usia</div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-black border ${getScoreColor(project.suitabilityMatrix.ageAppropriateness)}`}>
                            {project.suitabilityMatrix.ageAppropriateness}%
                          </span>
                        </div>

                        <div className="p-3 rounded-2xl border border-blue-100 bg-white text-center">
                          <div className="text-[11px] text-slate-500 font-medium mb-1">Kekuatan STEAM</div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-black border ${getScoreColor(project.suitabilityMatrix.steamIntegrationStrength)}`}>
                            {project.suitabilityMatrix.steamIntegrationStrength}%
                          </span>
                        </div>

                        <div className="p-3 rounded-2xl border border-blue-100 bg-white text-center">
                          <div className="text-[11px] text-slate-500 font-medium mb-1">Kelayakan Kerja</div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-black border ${getScoreColor(project.suitabilityMatrix.feasibility)}`}>
                            {project.suitabilityMatrix.feasibility}%
                          </span>
                        </div>

                        <div className="p-3 rounded-2xl border border-blue-100 bg-white text-center">
                          <div className="text-[11px] text-slate-500 font-medium mb-1">Kesesuaian Durasi</div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-black border ${getScoreColor(project.suitabilityMatrix.durationFit)}`}>
                            {project.suitabilityMatrix.durationFit}%
                          </span>
                        </div>

                        <div className="p-3 rounded-2xl border border-blue-100 bg-white text-center">
                          <div className="text-[11px] text-slate-500 font-medium mb-1">Kecocokan Bahan</div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-black border ${getScoreColor(project.suitabilityMatrix.resourceFit)}`}>
                            {project.suitabilityMatrix.resourceFit}%
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 mt-2.5 italic bg-sky-50 p-3 rounded-xl border border-sky-200">
                        "{project.suitabilityMatrix.overallNote}"
                      </p>
                    </div>

                    {/* Aktivitas Utama & Catatan Usia */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 mb-2">
                          Alur Aktivitas Utama:
                        </h5>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {project.mainActivities.map((act, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="font-bold text-blue-600">{i + 1}.</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h5 className="text-xs font-bold text-slate-800 mb-1">
                            Bentuk Asesmen Awal:
                          </h5>
                          <p className="text-xs text-slate-600 bg-blue-50/40 p-2.5 rounded-xl border border-blue-100">
                            {project.assessmentOverview}
                          </p>
                        </div>

                        <div>
                          <h5 className="text-xs font-bold text-slate-800 mb-1">
                            Catatan Penyesuaian Usia ({formData.grade}):
                          </h5>
                          <p className="text-xs text-slate-600 bg-blue-50/40 p-2.5 rounded-xl border border-blue-100">
                            {project.ageAdjustmentNotes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 sm:p-6 bg-blue-50/40 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500 font-medium">
                  Pilih projek ini untuk melihat modul RPP, rubrik asesmen, dan alur 8 tahapan terperinci.
                </div>

                <button
                  onClick={() => onSelectProject(project)}
                  disabled={isDetailLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>Lihat Rancangan Modul Lengkap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Wawasan AI Banner at the bottom */}
      {topPick && (
        <div className="mt-8 p-6 sm:p-7 bg-blue-50 border-2 border-blue-200 rounded-3xl">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-xs">
              💡
            </div>
            <h4 className="font-bold text-slate-900 text-base">Wawasan AI untuk Guru</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Projek <strong>'{topPick.title}'</strong> sangat direkomendasikan karena mengintegrasikan konsep <em>Science</em> ({topPick.steamIntegration.science.slice(0, 60)}...) dengan <em>Engineering</em> secara seimbang untuk jenjang {formData.grade}. Pastikan ketersediaan bahan daur ulang seperti kardus dan botol plastik sebelum memulai agar eksplorasi siswa maksimal.
          </p>
        </div>
      )}
    </div>
  );
};

