import React, { useState } from 'react';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { SteamWizardForm } from './components/SteamWizardForm';
import { ProjectAlternativesList } from './components/ProjectAlternativesList';
import { ProjectComparisonModal } from './components/ProjectComparisonModal';
import { ProjectDetailView } from './components/ProjectDetailView';
import { LoadingIndicator } from './components/LoadingIndicator';
import {
  SteamFormData,
  SteamProjectAlternative,
  SteamProjectDetail,
} from './types';
import { AlertCircle, RefreshCw, Compass } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState<SteamFormData>({
    grade: 'Kelas 4',
    cp: 'Peserta didik menganalisis hubungan antara bentuk serta fungsi bagian tubuh pada manusia (pancaindra). Peserta didik dapat membuat simulasi menggunakan alat bantu sederhana.',
    subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    theme: 'Pancaindra Manusia & Alat Bantu Sederhana',
    duration: '2–3 pertemuan',
    resources: 'Kardus bekas, botol plastik, balon, selang plastik, stik es krim, lem kertas, kertas gambar',
    complexity: 'Dasar',
  });

  const [viewMode, setViewMode] = useState<
    'form' | 'loading-alternatives' | 'alternatives' | 'loading-detail' | 'detail' | 'error'
  >('form');

  const [projects, setProjects] = useState<SteamProjectAlternative[]>([]);
  const [selectedProject, setSelectedProject] = useState<SteamProjectAlternative | null>(null);
  const [projectDetail, setProjectDetail] = useState<SteamProjectDetail | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Generate 3-5 Alternatives
  const handleGenerateProjects = async () => {
    setViewMode('loading-alternatives');
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-steam-projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server merespon dengan status ${response.status}`);
      }

      const data = await response.json();
      if (!data.projects || !Array.isArray(data.projects) || data.projects.length === 0) {
        throw new Error('AI tidak berhasil menyusun alternatif projek. Silakan coba lagi.');
      }

      setProjects(data.projects);
      setViewMode('alternatives');
    } catch (err: any) {
      console.error('Failed to generate STEAM alternatives:', err);
      setErrorMsg(err.message || 'Terjadi gangguan saat memproses rekomendasi AI.');
      setViewMode('error');
    }
  };

  // Generate Full Project Detail Module
  const handleSelectProject = async (project: SteamProjectAlternative) => {
    setSelectedProject(project);
    setViewMode('loading-detail');
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-project-detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedProject: project,
          formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server merespon dengan status ${response.status}`);
      }

      const detailData = await response.json();
      setProjectDetail(detailData);
      setViewMode('detail');
    } catch (err: any) {
      console.error('Failed to generate project detail:', err);
      setErrorMsg(err.message || 'Gagal memuat rancangan modul lengkap projek ini.');
      setViewMode('error');
    }
  };

  const handleReset = () => {
    setViewMode('form');
    setProjects([]);
    setSelectedProject(null);
    setProjectDetail(null);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-[#F0F6FF] text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-200 selection:text-blue-950">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Ethics & Privacy Notice */}
        <DisclaimerBanner />

        {/* VIEW 1: Input Form */}
        {viewMode === 'form' && (
          <div className="animate-in fade-in duration-200">
            <SteamWizardForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleGenerateProjects}
              isLoading={false}
            />
          </div>
        )}

        {/* VIEW 2: Loading Alternatives */}
        {viewMode === 'loading-alternatives' && (
          <div className="py-8 animate-in fade-in duration-200">
            <LoadingIndicator type="alternatives" />
          </div>
        )}

        {/* VIEW 3: Alternatives List */}
        {viewMode === 'alternatives' && projects.length > 0 && (
          <div className="animate-in fade-in duration-200">
            <ProjectAlternativesList
              projects={projects}
              formData={formData}
              onSelectProject={handleSelectProject}
              onCompareProjects={() => setIsCompareModalOpen(true)}
              onRegenerate={handleGenerateProjects}
              onReset={handleReset}
              isDetailLoading={false}
            />
          </div>
        )}

        {/* VIEW 4: Loading Detail */}
        {viewMode === 'loading-detail' && (
          <div className="py-8 animate-in fade-in duration-200">
            <LoadingIndicator type="detail" />
          </div>
        )}

        {/* VIEW 5: Project Detail View */}
        {viewMode === 'detail' && projectDetail && (
          <div className="animate-in fade-in duration-200">
            <ProjectDetailView
              detail={projectDetail}
              onBack={() => setViewMode('alternatives')}
            />
          </div>
        )}

        {/* VIEW 6: Error State */}
        {viewMode === 'error' && (
          <div className="bg-white rounded-3xl border-2 border-red-100 p-8 shadow-sm text-center max-w-lg mx-auto my-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Gagal Memproses Rekomendasi
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {errorMsg || 'Terjadi kendala saat menghubungkan ke layanan AI. Pastikan format Capaian Pembelajaran sudah sesuai.'}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  if (selectedProject) {
                    handleSelectProject(selectedProject);
                  } else {
                    handleGenerateProjects();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Coba Lagi</span>
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl border-2 border-blue-200 hover:bg-blue-50 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Kembali ke Formulir
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Comparison Modal */}
      {isCompareModalOpen && projects.length > 0 && (
        <ProjectComparisonModal
          projects={projects}
          onClose={() => setIsCompareModalOpen(false)}
          onSelectProject={(proj) => {
            setIsCompareModalOpen(false);
            handleSelectProject(proj);
          }}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-blue-100 bg-white/90 py-4 text-center text-xs text-slate-600 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span className="font-bold text-blue-700">STEAM Studio SD • Kelas 1–4 (Fase A & Fase B)</span>
          <span className="text-slate-500">Rekomendasi AI untuk Asistensi Guru • Tanpa Database</span>
        </div>
      </footer>
    </div>
  );
}
