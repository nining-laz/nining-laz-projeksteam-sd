import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Layers,
  Clock,
  Wrench,
  Gauge,
  HelpCircle,
  CheckCircle2,
  Lightbulb,
  CornerDownRight,
  X,
  Zap,
} from 'lucide-react';
import {
  GradeLevel,
  ProjectDuration,
  ComplexityLevel,
  SteamFormData,
} from '../types';
import {
  SAMPLE_PRESETS,
  SUBJECT_OPTIONS,
  DURATION_OPTIONS,
  COMPLEXITY_OPTIONS,
  SamplePreset,
} from '../data/samplePresets';

interface SteamWizardFormProps {
  formData: SteamFormData;
  setFormData: React.Dispatch<React.SetStateAction<SteamFormData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

export const SteamWizardForm: React.FC<SteamWizardFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  isLoading,
}) => {
  const [showPresetsModal, setShowPresetsModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const gradeList: { level: GradeLevel; phase: string; ageRange: string; desc: string }[] = [
    {
      level: 'Kelas 1',
      phase: 'Fase A',
      ageRange: '6–7 Tahun',
      desc: 'Eksplorasi sensorik, motorik halus dasar, instruksi konkret.',
    },
    {
      level: 'Kelas 2',
      phase: 'Fase A',
      ageRange: '7–8 Tahun',
      desc: 'Mulai mengamati pola konkret, membandingkan bentuk & ukuran.',
    },
    {
      level: 'Kelas 3',
      phase: 'Fase B',
      ageRange: '8–9 Tahun',
      desc: 'Penalaran sebab-akibat sederhana, perancangan prototipe awal.',
    },
    {
      level: 'Kelas 4',
      phase: 'Fase B',
      ageRange: '9–10 Tahun',
      desc: 'Pengujian mandiri, pencatatan data bertahap, solusi terstruktur.',
    },
  ];

  const themeSuggestions = [
    'Lingkungan & Kebun Sekolah',
    'Pengelolaan Sampah & Daur Ulang',
    'Air Bersih & Siklus Air',
    'Energi Bersih Sederhana',
    'Arsitektur & Miniatur Ramah Lingkungan',
    'Transportasi Masa Depan',
    'Kekayaan Hayati & Satwa',
  ];

  const quickResources = [
    'Kardus & botol bekas',
    'Stik es krim & lem kertas',
    'Kebun & tanaman sekolah',
    'Kertas gambar & pewarna',
    'Smartphone/kamera guru',
    'Penggaris & timbangan sederhana',
    'Sedotan kertas & tali/benang',
  ];

  const handleApplyPreset = (preset: SamplePreset) => {
    setFormData({
      grade: preset.grade,
      cp: preset.cp,
      subject: preset.subject,
      theme: preset.theme,
      duration: preset.duration,
      resources: preset.resources,
      complexity: preset.complexity,
    });
    setShowPresetsModal(false);
    setErrorMsg(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.grade) {
      setErrorMsg('Silakan pilih jenjang/kelas terlebih dahulu.');
      return;
    }
    if (!formData.cp.trim()) {
      setErrorMsg('Capaian Pembelajaran (CP) wajib diisi.');
      return;
    }
    setErrorMsg(null);
    onSubmit();
  };

  const addResourceTag = (tag: string) => {
    const current = formData.resources.trim();
    if (!current) {
      setFormData((prev) => ({ ...prev, resources: tag }));
    } else if (!current.toLowerCase().includes(tag.toLowerCase())) {
      setFormData((prev) => ({ ...prev, resources: `${current}, ${tag}` }));
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-sm p-6 sm:p-8">
      {/* Top Section */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <span>Parameter & Konteks Pembelajaran</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Lengkapi informasi di bawah agar rekomendasi projek STEAM terukur dan realistis.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowPresetsModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all shadow-2xs cursor-pointer"
        >
          <Lightbulb className="w-4 h-4 text-blue-600" />
          <span>Gunakan Contoh CP Inspiratif</span>
        </button>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border-2 border-red-200 text-xs text-red-700 flex items-start gap-2.5">
          <div className="font-bold shrink-0">Peringatan:</div>
          <div>{errorMsg}</div>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* 1. JENJANG / KELAS */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            1. Jenjang / Kelas Sasaran <span className="text-blue-600">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {gradeList.map((g) => {
              const isSelected = formData.grade === g.level;
              return (
                <button
                  type="button"
                  key={g.level}
                  onClick={() => setFormData((prev) => ({ ...prev, grade: g.level }))}
                  className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-4 border-blue-600 bg-blue-50/90 text-blue-800 shadow-xs'
                      : 'border-2 border-blue-100 hover:border-blue-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base text-slate-900">{g.level}</span>
                    <span className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {g.phase}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    {g.ageRange}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {g.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. MATA PELAJARAN / BIDANG & TEMA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              2. Mata Pelajaran / Bidang Utama
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
            >
              {SUBJECT_OPTIONS.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* TEMA / KONTEKS */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              3. Tema atau Konteks Lingkungan (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Lingkungan dan Polusi Suara, Kebun Sekolah"
              value={formData.theme}
              onChange={(e) => setFormData((prev) => ({ ...prev, theme: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
            />
            {/* Quick theme suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Saran:</span>
              {themeSuggestions.slice(0, 4).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setFormData((prev) => ({ ...prev, theme: t }))}
                  className="text-[11px] px-2.5 py-0.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-medium transition-colors cursor-pointer border border-blue-200"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. CAPAIAN PEMBELAJARAN (CP) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              4. Capaian Pembelajaran (CP) yang Ingin Dicapai <span className="text-blue-600">*</span>
            </label>
            <span className="text-xs font-semibold text-slate-400">
              {formData.cp.length} karakter
            </span>
          </div>
          <textarea
            rows={4}
            required
            placeholder="Masukkan atau tempelkan Capaian Pembelajaran resmi yang ingin dicapai..."
            value={formData.cp}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, cp: e.target.value }));
              if (errorMsg) setErrorMsg(null);
            }}
            className="w-full p-4 rounded-2xl border border-blue-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 leading-relaxed placeholder:text-slate-400 transition-all"
          />
          <p className="text-xs text-slate-500 mt-1.5">
            Tempelkan kalimat capaian pembelajaran yang ingin diturunkan menjadi aktivitas STEAM konkret.
          </p>
        </div>

        {/* 5. DURASI, SUMBER DAYA & KOMPLEKSITAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-blue-100">
          {/* Durasi */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              5. Alokasi Durasi
            </label>
            <select
              value={formData.duration}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  duration: e.target.value as ProjectDuration,
                }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-blue-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              {DURATION_OPTIONS.map((dur) => (
                <option key={dur} value={dur}>
                  {dur}
                </option>
              ))}
            </select>
          </div>

          {/* Kompleksitas */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-blue-600" />
              6. Tingkat Kompleksitas
            </label>
            <select
              value={formData.complexity}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  complexity: e.target.value as ComplexityLevel,
                }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-blue-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              {COMPLEXITY_OPTIONS.map((comp) => (
                <option key={comp} value={comp}>
                  {comp}
                </option>
              ))}
            </select>
          </div>

          {/* Sumber daya cepat */}
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              7. Kondisi & Sumber Daya
            </label>
            <input
              type="text"
              placeholder="Contoh: Kardus bekas, botol plastik, stik es krim, lab/kebun"
              value={formData.resources}
              onChange={(e) => setFormData((prev) => ({ ...prev, resources: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-blue-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
        </div>

        {/* Quick Resource Tags */}
        <div className="flex flex-wrap items-center gap-1.5 -mt-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">Bahan umum:</span>
          {quickResources.map((res) => (
            <button
              type="button"
              key={res}
              onClick={() => addResourceTag(res)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 transition-colors cursor-pointer font-medium"
            >
              + {res}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium">
            * AI akan menghasilkan 3–5 alternatif projek dengan analisis kesesuaian STEAM lengkap.
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.cp.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-200/70 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Zap className="w-5 h-5 fill-current" />
            <span>{isLoading ? 'Menganalisis & Merancang...' : 'Buat Rekomendasi Projek STEAM'}</span>
          </button>
        </div>
      </form>

      {/* Preset Modal */}
      {showPresetsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border-2 border-blue-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-blue-100 flex items-center justify-between bg-blue-50/60">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Pilih Contoh Capaian Pembelajaran (Inspirasi)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Klik salah satu contoh untuk mengisi formulir secara otomatis.
                </p>
              </div>
              <button
                onClick={() => setShowPresetsModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3">
              {SAMPLE_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className="p-4 rounded-2xl border-2 border-blue-100 hover:border-blue-600 hover:bg-blue-50/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">
                      {preset.grade}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {preset.subject}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                    {preset.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed bg-white/90 p-2.5 rounded-xl border border-blue-100">
                    "{preset.cp}"
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-xs text-blue-700 font-bold">
                    <span>Tema: {preset.theme}</span>
                    <span className="inline-flex items-center gap-1 group-hover:underline">
                      Gunakan ini <CornerDownRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-blue-100 bg-blue-50/40 flex justify-end">
              <button
                onClick={() => setShowPresetsModal(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

