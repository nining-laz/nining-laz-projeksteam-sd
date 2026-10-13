import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy/safe initialization for Google GenAI
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint 1: Generate 3-5 STEAM Project Alternatives
app.post('/api/generate-steam-projects', async (req, res) => {
  try {
    const { grade, cp, subject, theme, duration, resources, complexity } = req.body;

    if (!grade || !cp || typeof cp !== 'string' || cp.trim().length === 0) {
      return res.status(400).json({
        error: 'Jenjang/Kelas dan Capaian Pembelajaran (CP) wajib diisi.',
      });
    }

    const ai = getGeminiClient();

    const systemInstruction = `
Peran: Anda adalah konsultan ahli perancangan pembelajaran STEAM untuk Sekolah Dasar (SD) kelas 1–4 di Indonesia (Fase A: Kelas 1-2, Fase B: Kelas 3-4).
Tujuan: Membantu guru mengubah Capaian Pembelajaran (CP) yang diberikan menjadi 3–5 alternatif rancangan projek STEAM yang otentik, realistis, dan bermakna.

Prinsip & Aturan Utama:
1. Bahasa: Gunakan Bahasa Indonesia yang jelas, profesional, komunikatif, dan ramah guru SD.
2. Keselarasan CP: Utamakan ketercapaian CP yang dimasukkan guru. Jangan mengarang CP resmi atau menambah tuntutan di luar cakupan yang wajar. Jelaskan alasan keterhubungannya secara logis.
3. Integrasi STEAM yang Otentik: Integrasikan Science, Technology, Engineering, Arts, dan Mathematics secara bermakna. Jangan sekadar menempelkan label STEAM jika aktivitasnya tidak relevan.
   - Science: Pengamatan fenomena alam, sifat bahan, konsep sains riil sesuai usia.
   - Technology: Penggunaan alat sederhana, teknologi tepat guna, pengamatan mekanik, atau pencatatan visual/digital.
   - Engineering: Proses rekayasa (merancang sketsa, membangun prototipe, menguji coba, memperbaiki kegagalan/iterasi).
   - Arts: Kreativitas visual, estetika bentuk, komunikasi visual rancangan, keselarasan warna/ekspresi.
   - Mathematics: Pola, bentuk geometri, perbandingan ukuran, pengukuran sederhana, hitungan jumlah/data.
4. Kesesuaian Usia Anak SD (Kelas 1–4):
   - Kelas 1–2 (Fase A): Pengamatan indrawi langsung, motorik halus dasar, alat aman (gunting tumpul, perekat ramah anak), instruksi konkret langkah-demi-langkah.
   - Kelas 3–4 (Fase B): Mulai mampu menalar sebab-akibat, perancangan prototipe bertahap, pengukuran dengan skala/satuan, pengujian variabel sederhana.
5. Kepatuhan Batasan: Sesuaikan dengan durasi dan sumber daya yang disediakan guru. Utamakan bahan mudah didapat/daur ulang jika sumber daya terbatas.
6. Privasi & Etika: Jangan meminta atau menghasilkan data pribadi siswa. Hasil adalah indikator rekomendasi AI yang perlu ditinjau oleh guru.

Format Output: Kembalikan respon strictly dalam JSON sesuai schema yang didefinisikan.
`;

    const userPrompt = `
Berikut adalah konteks pembelajaran dari guru:
- Jenjang / Kelas: ${grade}
- Capaian Pembelajaran (CP): "${cp}"
- Mata Pelajaran / Bidang Terkait: ${subject || 'Tematik / IPAS / Matematika'}
- Tema / Konteks yang diinginkan: ${theme || 'Lingkungan sekitar & kehidupan sehari-hari'}
- Alokasi Durasi Projek: ${duration || '2–3 pertemuan'}
- Kondisi & Sumber Daya Tersedia di Sekolah: ${resources || 'Bahan daur ulang di sekolah (kardus, botol bekas, kertas, stik es krim), alat tulis standar'}
- Tingkat Kompleksitas: ${complexity || 'Dasar'}

Tugas:
Analisis Capaian Pembelajaran tersebut dan hasilkan 3 hingga 5 alternatif projek STEAM yang bervariasi (misal: satu berbasis eksplorasi alam, satu berbasis konstruksi/alat rekayasa, satu berbasis seni interaktif/matematika). Berikan skor indikator rekomendasi AI (skala 1-100) untuk masing-masing projek secara obyektif berdasarkan kesesuaian CP, usia, kekuatan STEAM, kelayakan, durasi, dan sumber daya. Tandai 1 projek sebagai "Rekomendasi Utama" (isRecommendedPick: true).
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  drivingQuestion: { type: Type.STRING },
                  targetedCp: { type: Type.STRING },
                  cpAlignmentReason: { type: Type.STRING },
                  steamIntegration: {
                    type: Type.OBJECT,
                    properties: {
                      science: { type: Type.STRING },
                      technology: { type: Type.STRING },
                      engineering: { type: Type.STRING },
                      arts: { type: Type.STRING },
                      mathematics: { type: Type.STRING },
                    },
                    required: ['science', 'technology', 'engineering', 'arts', 'mathematics'],
                  },
                  productOutcome: { type: Type.STRING },
                  mainActivities: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  estimatedDuration: { type: Type.STRING },
                  toolsAndMaterials: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  difficultyLevel: { type: Type.STRING },
                  assessmentOverview: { type: Type.STRING },
                  ageAdjustmentNotes: { type: Type.STRING },
                  suitabilityMatrix: {
                    type: Type.OBJECT,
                    properties: {
                      cpAlignment: { type: Type.NUMBER },
                      ageAppropriateness: { type: Type.NUMBER },
                      steamIntegrationStrength: { type: Type.NUMBER },
                      feasibility: { type: Type.NUMBER },
                      durationFit: { type: Type.NUMBER },
                      resourceFit: { type: Type.NUMBER },
                      overallNote: { type: Type.STRING },
                    },
                    required: [
                      'cpAlignment',
                      'ageAppropriateness',
                      'steamIntegrationStrength',
                      'feasibility',
                      'durationFit',
                      'resourceFit',
                      'overallNote',
                    ],
                  },
                  isRecommendedPick: { type: Type.BOOLEAN },
                  recommendationReason: { type: Type.STRING },
                },
                required: [
                  'id',
                  'title',
                  'drivingQuestion',
                  'targetedCp',
                  'cpAlignmentReason',
                  'steamIntegration',
                  'productOutcome',
                  'mainActivities',
                  'estimatedDuration',
                  'toolsAndMaterials',
                  'difficultyLevel',
                  'assessmentOverview',
                  'ageAdjustmentNotes',
                  'suitabilityMatrix',
                ],
              },
            },
          },
          required: ['projects'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('AI tidak menghasilkan output.');
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating STEAM projects:', error);
    return res.status(500).json({
      error: error.message || 'Terjadi kesalahan saat meminta rekomendasi AI.',
    });
  }
});

// Endpoint 2: Generate Detailed Project Plan / Teaching Module
app.post('/api/generate-project-detail', async (req, res) => {
  try {
    const { selectedProject, formData } = req.body;

    if (!selectedProject || !formData) {
      return res.status(400).json({
        error: 'Data projek dan formulir diperlukan untuk menyusun rancangan detail.',
      });
    }

    const ai = getGeminiClient();

    const systemInstruction = `
Peran: Anda adalah konsultan senior kurikulum STEAM Sekolah Dasar (SD Kelas 1–4).
Tugas: Menyusun Rancangan Pelaksanaan Pembelajaran (RPP) / Modul Projek STEAM Lengkap dan Siap Pakai berdasarkan salah satu alternatif projek yang telah dipilih guru.

Rancangan harus sangat rinci, mencakup:
1. Identitas Projek & Tujuan Pembelajaran (TP) yang diturunkan secara terukur dari CP.
2. Pertanyaan Pemantik utama dan sub-pertanyaan inkuiri untuk siswa SD.
3. Analisis Peran STEAM Konkret: Jelaskan kontribusi nyata konsep Science, Technology, Engineering, Arts, dan Mathematics, serta berikan catatan otentisitas (agar tidak terjadi pemaksaan unsur/gimmick).
4. Alur & Tahapan Projek Berurutan (6–8 tahapan: Orientasi, Eksplorasi, Perencanaan, Perancangan Desain, Pembuatan/Uji Coba, Perbaikan/Iterasi, Presentasi Karya, Refleksi). Sertakan alokasi waktu dan tips bimbingan guru.
5. Daftar Alat & Bahan terperinci dan terorganisir per kategori.
6. Tips Keamanan Siswa & Fasilitasi Kelas SD.
7. Panduan Asesmen Lengkap:
   - Indikator keberhasilan yang terukur
   - Bukti belajar yang dapat diobservasi langsung oleh guru
   - Rubrik Penilaian Holistik (Skala 1-4: Perlu Bimbingan, Cukup, Baik, Sangat Berkembang) untuk aspek Proses, Produk, dan Sikap/Kolaborasi.
8. Panduan Diferensiasi: Bimbingan perancah (scaffolding) untuk siswa yang butuh bantuan ekstra, serta kegiatan pengayaan untuk siswa yang cepat paham.

Kembalikan respon strictly dalam format JSON sesuai schema.
`;

    const userPrompt = `
Berikut data projek yang dipilih oleh guru:
Judul Projek: ${selectedProject.title}
Jenjang / Kelas: ${formData.grade}
Capaian Pembelajaran (CP): "${formData.cp}"
Mata Pelajaran: ${formData.subject || selectedProject.targetedCp}
Tema: ${formData.theme || 'Kontekstual Sekolah'}
Durasi yang Tersedia: ${formData.duration}
Sumber Daya Tersedia: ${formData.resources || 'Alat tulis & bahan daur ulang'}
Tingkat Kompleksitas: ${formData.complexity}
Pertanyaan Pemantik Awal: ${selectedProject.drivingQuestion}
Produk Akhir: ${selectedProject.productOutcome}

Buatkan rancangan modul pembelajaran projek STEAM yang lengkap, terstruktur, dan aplikatif untuk guru SD!
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projectId: { type: Type.STRING },
            projectIdentity: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                grade: { type: Type.STRING },
                subject: { type: Type.STRING },
                targetedCp: { type: Type.STRING },
                theme: { type: Type.STRING },
                duration: { type: Type.STRING },
                complexity: { type: Type.STRING },
              },
              required: ['title', 'grade', 'subject', 'targetedCp', 'theme', 'duration', 'complexity'],
            },
            learningObjectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            drivingQuestions: {
              type: Type.OBJECT,
              properties: {
                mainQuestion: { type: Type.STRING },
                subQuestions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['mainQuestion', 'subQuestions'],
            },
            steamBreakdown: {
              type: Type.OBJECT,
              properties: {
                science: {
                  type: Type.OBJECT,
                  properties: {
                    concept: { type: Type.STRING },
                    concreteContribution: { type: Type.STRING },
                    authenticityNote: { type: Type.STRING },
                  },
                  required: ['concept', 'concreteContribution'],
                },
                technology: {
                  type: Type.OBJECT,
                  properties: {
                    concept: { type: Type.STRING },
                    concreteContribution: { type: Type.STRING },
                    authenticityNote: { type: Type.STRING },
                  },
                  required: ['concept', 'concreteContribution'],
                },
                engineering: {
                  type: Type.OBJECT,
                  properties: {
                    concept: { type: Type.STRING },
                    concreteContribution: { type: Type.STRING },
                    authenticityNote: { type: Type.STRING },
                  },
                  required: ['concept', 'concreteContribution'],
                },
                arts: {
                  type: Type.OBJECT,
                  properties: {
                    concept: { type: Type.STRING },
                    concreteContribution: { type: Type.STRING },
                    authenticityNote: { type: Type.STRING },
                  },
                  required: ['concept', 'concreteContribution'],
                },
                mathematics: {
                  type: Type.OBJECT,
                  properties: {
                    concept: { type: Type.STRING },
                    concreteContribution: { type: Type.STRING },
                    authenticityNote: { type: Type.STRING },
                  },
                  required: ['concept', 'concreteContribution'],
                },
              },
              required: ['science', 'technology', 'engineering', 'arts', 'mathematics'],
            },
            projectFlow: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stageNumber: { type: Type.INTEGER },
                  stageName: { type: Type.STRING },
                  purpose: { type: Type.STRING },
                  studentActivities: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  teacherGuidance: { type: Type.STRING },
                  estimatedTime: { type: Type.STRING },
                  deliverableOrOutput: { type: Type.STRING },
                },
                required: [
                  'stageNumber',
                  'stageName',
                  'purpose',
                  'studentActivities',
                  'teacherGuidance',
                  'estimatedTime',
                  'deliverableOrOutput',
                ],
              },
            },
            materialsList: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING },
                  category: { type: Type.STRING },
                  estimatedQty: { type: Type.STRING },
                },
                required: ['item', 'category'],
              },
            },
            safetyAndFacilitationTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            assessmentGuide: {
              type: Type.OBJECT,
              properties: {
                successIndicators: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                observableEvidence: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                rubrics: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      criterion: { type: Type.STRING },
                      aspect: { type: Type.STRING },
                      levels: {
                        type: Type.OBJECT,
                        properties: {
                          perluBimbingan: { type: Type.STRING },
                          cukup: { type: Type.STRING },
                          baik: { type: Type.STRING },
                          sangatBaik: { type: Type.STRING },
                        },
                        required: ['perluBimbingan', 'cukup', 'baik', 'sangatBaik'],
                      },
                    },
                    required: ['criterion', 'aspect', 'levels'],
                  },
                },
              },
              required: ['successIndicators', 'observableEvidence', 'rubrics'],
            },
            differentiationScaffolding: {
              type: Type.OBJECT,
              properties: {
                supportForBeginner: { type: Type.STRING },
                enrichmentForAdvanced: { type: Type.STRING },
              },
              required: ['supportForBeginner', 'enrichmentForAdvanced'],
            },
          },
          required: [
            'projectId',
            'projectIdentity',
            'learningObjectives',
            'drivingQuestions',
            'steamBreakdown',
            'projectFlow',
            'materialsList',
            'safetyAndFacilitationTips',
            'assessmentGuide',
            'differentiationScaffolding',
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('AI tidak menghasilkan output rancangan lengkap.');
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating project detail:', error);
    return res.status(500).json({
      error: error.message || 'Terjadi kesalahan saat menyusun rancangan detail projek.',
    });
  }
});

// Vite middleware & SPA fallback
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`STEAM Project Designer server listening on http://localhost:${PORT}`);
  });
}

startServer();
