import { GradeLevel, ComplexityLevel, ProjectDuration } from '../types';

export interface SamplePreset {
  id: string;
  grade: GradeLevel;
  subject: string;
  title: string;
  cp: string;
  theme: string;
  duration: ProjectDuration;
  resources: string;
  complexity: ComplexityLevel;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'preset-1',
    grade: 'Kelas 1',
    subject: 'IPAS & Seni (Fase A)',
    title: 'Mengenal Bagian Tumbuhan & Kebutuhan Hidupnya',
    cp: 'Peserta didik mengamati dan menceritakan bagian-bagian tubuh tumbuhan (akar, batang, daun, bunga) serta kebutuhan dasar tumbuhan (air, sinar matahari) melalui pengamatan langsung di lingkungan sekitar.',
    theme: 'Kebun Sekolah & Tanaman Sahabat Kita',
    duration: '2–3 pertemuan',
    resources: 'Pot plastik bekas/gelas plastik, kapas/tanah, biji kacang hijau, air, penggaris sederhana, kertas gambar, pewarna.',
    complexity: 'Dasar',
  },
  {
    id: 'preset-2',
    grade: 'Kelas 2',
    subject: 'Matematika & Seni Rupa (Fase A)',
    title: 'Pola Bangun Datar dan Pengukuran Panjang Benda',
    cp: 'Peserta didik dapat mengenal, menyusun pola bangun datar sederhana (segitiga, persegi, lingkaran), serta membandingkan dan mengukur panjang benda menggunakan satuan tidak baku dan satuan baku sederhana (cm).',
    theme: 'Arsitek Cilik: Rancang Rumah Impian Ramah Lingkungan',
    duration: '2–3 pertemuan',
    resources: 'Kardus bekas kemasan, gunting tumpul anak, lem kertas/kayu, sedotan kertas, penggaris, kertas origami.',
    complexity: 'Dasar',
  },
  {
    id: 'preset-3',
    grade: 'Kelas 3',
    subject: 'IPAS (Fase B)',
    title: 'Wujud Benda dan Perubahan Sifat Benda',
    cp: 'Peserta didik mengidentifikasi wujud zat (padat, cair, gas) dan perubahannya (mencair, membeku, menguap) dalam kehidupan sehari-hari serta menghubungkannya dengan peristiwa alam.',
    theme: 'Siklus Air & Penjernih Air Sederhana',
    duration: '1 minggu',
    resources: 'Botol plastik bekas 1.5L, kerikil kecil, pasir bersih, arang kayu, kapas/kain kasa, air keruh, wadah takar.',
    complexity: 'Menengah',
  },
  {
    id: 'preset-4',
    grade: 'Kelas 4',
    subject: 'IPAS & Matematika (Fase B)',
    title: 'Transformasi Energi dan Pemanfaatan Energi Ramah Lingkungan',
    cp: 'Peserta didik memahami konsep kekekalan energi dan mengidentifikasi ragam transformasi energi (angin/cahaya/gerak menjadi listrik atau kerja mekanik) serta merancang pemanfaatan energi terbarukan sederhana.',
    theme: 'Energi Bersih: Miniatur Kincir Angin Pembangkit Listrik / Pengangkat Beban',
    duration: '1 minggu',
    resources: 'Stik es krim, dinamo mainan bekas (opsional)/poros sedotan, karton tebal, lem tembak (didampingi guru), benang kasur, klip kertas/pemberat ringan.',
    complexity: 'Menengah',
  },
];

export const SUBJECT_OPTIONS = [
  'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
  'Matematika',
  'Seni Rupa & Kriya',
  'Bahasa Indonesia',
  'Pendidikan Pancasila',
  'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)',
  'Interdisipliner / Tematik',
];

export const DURATION_OPTIONS: ProjectDuration[] = [
  '1 pertemuan',
  '2–3 pertemuan',
  '1 minggu',
  '2 minggu',
  'Lebih dari 2 minggu',
];

export const COMPLEXITY_OPTIONS: ComplexityLevel[] = [
  'Dasar',
  'Menengah',
  'Lebih menantang',
];
