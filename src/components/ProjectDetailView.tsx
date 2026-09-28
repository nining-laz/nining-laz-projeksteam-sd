import React, { useState } from 'react';
import {
  ArrowLeft,
  Printer,
  Copy,
  Download,
  Check,
  Sparkles,
  BookOpen,
  HelpCircle,
  FlaskConical,
  Cpu,
  Hammer,
  Palette,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Wrench,
  GraduationCap,
  Users,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { SteamProjectDetail } from '../types';
import {
  formatProjectDetailToMarkdown,
  downloadTextFile,
} from '../utils/exportUtils';

interface ProjectDetailViewProps {
  detail: SteamProjectDetail;
  onBack: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  detail,
  onBack,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'rancangan' | 'alur' | 'asesmen' | 'alat'>('rancangan');

  const {
    projectIdentity,
    learningObjectives,
    drivingQuestions,
    steamBreakdown,
    projectFlow,
    materialsList,
    safetyAndFacilitationTips,
    assessmentGuide,
    differentiationScaffolding,
  } = detail;

  const handleCopy = () => {
    const md = formatProjectDetailToMarkdown(detail);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const md = formatProjectDetailToMarkdown(detail);
    const safeTitle = projectIdentity.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    downloadTextFile(`Modul-STEAM-${safeTitle}.md`, md);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (hidden when printing) */}
      <div className="bg-white rounded-3xl border-2 border-blue-100 p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-3 print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-blue-700 hover:bg-blue-100 bg-blue-50 text-xs font-bold border border-blue-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Alternatif Projek</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border-2 border-blue-200 hover:border-blue-300 bg-white text-slate-700 text-xs font-bold hover:bg-blue-50/50 transition-colors shadow-2xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Salin Modul</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border-2 border-blue-200 hover:border-blue-300 bg-white text-slate-700 text-xs font-bold hover:bg-blue-50/50 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>Unduh (.md)</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Easy Reading (hidden on print) */}
      <div className="flex items-center gap-2 border-b border-blue-200/80 pb-2 overflow-x-auto print:hidden">
        <button
          onClick={() => setActiveTab('rancangan')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'rancangan'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-blue-100/60'
          }`}
        >
          1. Identitas & Peran STEAM
        </button>
        <button
          onClick={() => setActiveTab('alur')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'alur'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-blue-100/60'
          }`}
        >
          2. Alur 8 Tahapan Projek ({projectFlow.length} Tahap)
        </button>
        <button
          onClick={() => setActiveTab('asesmen')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'asesmen'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-blue-100/60'
          }`}
        >
          3. Panduan Asesmen & Rubrik
        </button>
        <button
          onClick={() => setActiveTab('alat')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'alat'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-blue-100/60'
          }`}
        >
          4. Alat, Bahan & Diferensiasi
        </button>
      </div>

      {/* Printable Document Container */}
      <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-sm p-6 sm:p-10 space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b border-blue-100 pb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white">
              {projectIdentity.grade}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200">
              Mata Pelajaran: {projectIdentity.subject}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
              Durasi: {projectIdentity.duration}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
              Kompleksitas: {projectIdentity.complexity}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            {projectIdentity.title}
          </h1>
          {projectIdentity.theme && (
            <p className="text-sm font-bold text-blue-700 mt-1">
              Tema / Konteks: {projectIdentity.theme}
            </p>
          )}
        </div>

        {/* SECTION 1: CP & TUJUAN PEMBELAJARAN */}
        {(activeTab === 'rancangan' || true) && (
          <section className={`space-y-6 ${activeTab !== 'rancangan' ? 'print:block hidden' : ''}`}>
            {/* CP Target */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Capaian Pembelajaran (CP) Rujukan
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                "{projectIdentity.targetedCp}"
              </p>
            </div>

            {/* Tujuan Pembelajaran (TP) */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                Tujuan Pembelajaran (TP)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {learningObjectives.map((tp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-blue-100 bg-white flex items-start gap-2.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                      {tp}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pertanyaan Pemantik Inkuiri */}
            <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-white" />
                Pertanyaan Pemantik & Inkuiri Siswa
              </div>
              <div className="text-base sm:text-lg font-bold leading-relaxed text-white">
                "{drivingQuestions.mainQuestion}"
              </div>
              {drivingQuestions.subQuestions?.length > 0 && (
                <div className="pt-3 border-t border-white/20 space-y-1.5">
                  <div className="text-xs font-bold text-blue-100">
                    Sub-Pertanyaan Penyelidikan Anak:
                  </div>
                  <ul className="space-y-1 text-xs text-white/95 list-disc list-inside">
                    {drivingQuestions.subQuestions.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* STEAM Concrete Roles */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Peran & Integrasi 5 Pilar STEAM yang Otentik
                </h3>
                <span className="text-xs text-slate-500 italic">
                  Bukan sekadar tempelan
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Science */}
                <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/60 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-900">
                    <FlaskConical className="w-4 h-4 text-blue-600" />
                    <span>Science (Sains)</span>
                  </div>
                  <div className="text-xs font-semibold text-blue-800">
                    Konsep: {steamBreakdown.science.concept}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {steamBreakdown.science.concreteContribution}
                  </p>
                  {steamBreakdown.science.authenticityNote && (
                    <div className="text-[11px] text-blue-900 italic pt-1.5 border-t border-blue-200">
                      💡 {steamBreakdown.science.authenticityNote}
                    </div>
                  )}
                </div>

                {/* Technology */}
                <div className="p-4 rounded-2xl border border-indigo-200 bg-indigo-50/60 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-indigo-900">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    <span>Technology (Teknologi)</span>
                  </div>
                  <div className="text-xs font-semibold text-indigo-800">
                    Konsep/Alat: {steamBreakdown.technology.concept}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {steamBreakdown.technology.concreteContribution}
                  </p>
                  {steamBreakdown.technology.authenticityNote && (
                    <div className="text-[11px] text-indigo-900 italic pt-1.5 border-t border-indigo-200">
                      💡 {steamBreakdown.technology.authenticityNote}
                    </div>
                  )}
                </div>

                {/* Engineering */}
                <div className="p-4 rounded-2xl border border-sky-200 bg-sky-50/60 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-sky-900">
                    <Hammer className="w-4 h-4 text-sky-600" />
                    <span>Engineering (Rekayasa)</span>
                  </div>
                  <div className="text-xs font-semibold text-sky-800">
                    Proses: {steamBreakdown.engineering.concept}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {steamBreakdown.engineering.concreteContribution}
                  </p>
                  {steamBreakdown.engineering.authenticityNote && (
                    <div className="text-[11px] text-sky-900 italic pt-1.5 border-t border-sky-200">
                      💡 {steamBreakdown.engineering.authenticityNote}
                    </div>
                  )}
                </div>

                {/* Arts */}
                <div className="p-4 rounded-2xl border border-pink-200 bg-pink-50/60 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-pink-900">
                    <Palette className="w-4 h-4 text-pink-600" />
                    <span>Arts (Seni & Kreativitas)</span>
                  </div>
                  <div className="text-xs font-semibold text-pink-800">
                    Bentuk Ekspresi: {steamBreakdown.arts.concept}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {steamBreakdown.arts.concreteContribution}
                  </p>
                  {steamBreakdown.arts.authenticityNote && (
                    <div className="text-[11px] text-pink-900 italic pt-1.5 border-t border-pink-200">
                      💡 {steamBreakdown.arts.authenticityNote}
                    </div>
                  )}
                </div>

                {/* Mathematics */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 space-y-2 md:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                    <Calculator className="w-4 h-4 text-emerald-600" />
                    <span>Mathematics (Matematika)</span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-800">
                    Pengukuran/Pola: {steamBreakdown.mathematics.concept}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {steamBreakdown.mathematics.concreteContribution}
                  </p>
                  {steamBreakdown.mathematics.authenticityNote && (
                    <div className="text-[11px] text-emerald-900 italic pt-1.5 border-t border-emerald-200">
                      💡 {steamBreakdown.mathematics.authenticityNote}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: ALUR 8 TAHAPAN PROJEK */}
        {(activeTab === 'alur' || true) && (
          <section className={`space-y-5 ${activeTab !== 'alur' ? 'print:block hidden' : ''}`}>
            <div className="border-t border-blue-100 pt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                Alur & Tahapan Pelaksanaan Projek ({projectFlow.length} Tahap)
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Panduan praktis langkah-demi-langkah bagi guru dalam memfasilitasi inkuiri siswa SD.
              </p>

              <div className="space-y-4">
                {projectFlow.map((stage) => (
                  <div
                    key={stage.stageNumber}
                    className="p-5 rounded-2xl border-2 border-blue-100 bg-white hover:border-blue-300 transition-colors shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-blue-100">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                          {stage.stageNumber}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                          {stage.stageName}
                        </h4>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-900 border border-blue-200">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {stage.estimatedTime}
                      </span>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm">
                      <div>
                        <span className="font-bold text-slate-700 mr-1.5">Tujuan Tahap:</span>
                        <span className="text-slate-600">{stage.purpose}</span>
                      </div>

                      <div>
                        <div className="font-bold text-slate-700 mb-1">Aktivitas Siswa:</div>
                        <ul className="space-y-1 text-slate-600 list-disc list-inside bg-blue-50/30 p-3 rounded-xl border border-blue-100">
                          {stage.studentActivities.map((act, i) => (
                            <li key={i} className="leading-relaxed">
                              {act}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs">
                          <span className="font-bold text-blue-900 block mb-0.5">
                            Bimbingan & Fasilitasi Guru:
                          </span>
                          <span className="text-slate-700 leading-relaxed">
                            {stage.teacherGuidance}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs">
                          <span className="font-bold text-slate-900 block mb-0.5">
                            Bukti / Output Tahap:
                          </span>
                          <span className="text-slate-800 leading-relaxed">
                            {stage.deliverableOrOutput}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: PANDUAN ASESMEN & RUBRIK */}
        {(activeTab === 'asesmen' || true) && (
          <section className={`space-y-6 ${activeTab !== 'asesmen' ? 'print:block hidden' : ''}`}>
            <div className="border-t border-blue-100 pt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Panduan Asesmen Holistik (Proses & Produk)
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Instrumen observasi dan rubrik kriteria penilaian berkala.
              </p>

              {/* Indikator & Bukti Belajar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Indikator Keberhasilan Pembelajaran
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {assessmentGuide.successIndicators.map((ind, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-blue-600">{i + 1}.</span>
                        <span className="leading-relaxed">{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-600" />
                    Bukti Belajar yang Diamati (Observasi Guru)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {assessmentGuide.observableEvidence.map((ev, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-blue-600">{i + 1}.</span>
                        <span className="leading-relaxed">{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Rubrik Penilaian Table */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Rubrik Penilaian Holistik (Skala 1–4)
                </h4>
                <div className="overflow-x-auto rounded-2xl border-2 border-blue-100">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-blue-50 border-b border-blue-200 text-slate-800">
                        <th className="p-3 font-bold w-36">Kriteria</th>
                        <th className="p-3 font-bold w-24">Aspek</th>
                        <th className="p-3 font-bold bg-rose-50/80 text-rose-900">
                          1: Perlu Bimbingan
                        </th>
                        <th className="p-3 font-bold bg-amber-50/80 text-amber-900">
                          2: Cukup
                        </th>
                        <th className="p-3 font-bold bg-blue-50/80 text-blue-900">
                          3: Baik (Sesuai Harapan)
                        </th>
                        <th className="p-3 font-bold bg-emerald-50/80 text-emerald-900">
                          4: Sangat Berkembang
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100">
                      {assessmentGuide.rubrics.map((r, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/20">
                          <td className="p-3 font-bold text-slate-900 align-top">
                            {r.criterion}
                          </td>
                          <td className="p-3 text-slate-600 align-top">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-blue-100/60 font-semibold text-[11px] text-blue-950">
                              {r.aspect}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600 bg-rose-50/30 align-top leading-relaxed">
                            {r.levels.perluBimbingan}
                          </td>
                          <td className="p-3 text-slate-600 bg-amber-50/30 align-top leading-relaxed">
                            {r.levels.cukup}
                          </td>
                          <td className="p-3 text-slate-800 font-medium bg-blue-50/30 align-top leading-relaxed">
                            {r.levels.baik}
                          </td>
                          <td className="p-3 text-slate-800 font-medium bg-emerald-50/30 align-top leading-relaxed">
                            {r.levels.sangatBaik}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: ALAT, BAHAN, KEAMANAN & DIFERENSIASI */}
        {(activeTab === 'alat' || true) && (
          <section className={`space-y-6 ${activeTab !== 'alat' ? 'print:block hidden' : ''}`}>
            <div className="border-t border-blue-100 pt-6">
              {/* Checklist Alat & Bahan */}
              <div className="mb-6">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-blue-600" />
                  Daftar Alat dan Bahan Projek
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {materialsList.map((mat, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl border border-blue-100 bg-white flex items-start justify-between gap-2"
                    >
                      <div>
                        <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                          {mat.item}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Kategori: {mat.category}
                        </div>
                      </div>
                      {mat.estimatedQty && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800">
                          {mat.estimatedQty}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety & Facilitation */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  Tips Keamanan & Fasilitasi Siswa SD ({projectIdentity.grade})
                </h4>
                <ul className="space-y-1 text-xs text-amber-950 list-disc list-inside">
                  {safetyAndFacilitationTips.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Differentiation & Scaffolding */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50">
                  <h4 className="text-xs font-bold text-blue-900 mb-1.5 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    Perancah (Bantuan untuk Siswa yang Butuh Bimbingan)
                  </h4>
                  <p className="text-xs text-blue-950 leading-relaxed">
                    {differentiationScaffolding.supportForBeginner}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50">
                  <h4 className="text-xs font-bold text-emerald-900 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Pengayaan (Tantangan Ekstra untuk Siswa Cepat)
                  </h4>
                  <p className="text-xs text-emerald-950 leading-relaxed">
                    {differentiationScaffolding.enrichmentForAdvanced}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Document Footer Note */}
        <div className="pt-6 border-t border-blue-100 text-xs text-slate-500 text-center leading-relaxed">
          <p>
            Modul Projek STEAM SD ini disusun dengan rekomendasi AI. Guru berwenang penuh untuk memverifikasi, mengadaptasi, dan menyelaraskan dengan sarana kelas nyata.
          </p>
        </div>
      </div>
    </div>
  );
};

