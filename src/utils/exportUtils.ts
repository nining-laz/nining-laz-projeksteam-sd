import { SteamProjectDetail, SteamProjectAlternative } from '../types';

export function formatProjectSummaryToMarkdown(p: SteamProjectAlternative): string {
  return `# PROJEK STEAM: ${p.title}
**Jenjang:** ${p.targetedCp} | **Durasi:** ${p.estimatedDuration} | **Tingkat:** ${p.difficultyLevel}

## Pertanyaan Pemantik
> "${p.drivingQuestion}"

## Keselarasan Capaian Pembelajaran (CP)
- **CP Dituju:** ${p.targetedCp}
- **Alasan Keselarasan:** ${p.cpAlignmentReason}

## Integrasi STEAM
- **Science (Sains):** ${p.steamIntegration.science}
- **Technology (Teknologi):** ${p.steamIntegration.technology}
- **Engineering (Rekayasa):** ${p.steamIntegration.engineering}
- **Arts (Seni):** ${p.steamIntegration.arts}
- **Mathematics (Matematika):** ${p.steamIntegration.mathematics}

## Produk / Karya Akhir
${p.productOutcome}

## Aktivitas Utama
${p.mainActivities.map((a, i) => `${i + 1}. ${a}`).join('\n')}

## Alat & Bahan
${p.toolsAndMaterials.map((m) => `- ${m}`).join('\n')}

## Bentuk Asesmen
${p.assessmentOverview}

## Catatan Penyesuaian Usia
${p.ageAdjustmentNotes}

---
*Dokumen ini merupakan rekomendasi AI perancangan pembelajaran STEAM untuk ditinjau oleh guru.*
`;
}

export function formatProjectDetailToMarkdown(detail: SteamProjectDetail): string {
  const { projectIdentity, learningObjectives, drivingQuestions, steamBreakdown, projectFlow, materialsList, safetyAndFacilitationTips, assessmentGuide, differentiationScaffolding } = detail;

  let md = `# RANCANGAN MODUL PEMBELAJARAN PROJEK STEAM SD
**Judul Projek:** ${projectIdentity.title}
**Jenjang / Fase:** ${projectIdentity.grade} | **Mata Pelajaran:** ${projectIdentity.subject}
**Tema:** ${projectIdentity.theme} | **Alokasi Waktu:** ${projectIdentity.duration} | **Kompleksitas:** ${projectIdentity.complexity}

---

## 1. CAPAIAN & TUJUAN PEMBELAJARAN
**Capaian Pembelajaran (CP) yang Dituju:**
> "${projectIdentity.targetedCp}"

**Tujuan Pembelajaran (TP):**
${learningObjectives.map((tp, i) => `${i + 1}. ${tp}`).join('\n')}

---

## 2. PERTANYAAN PEMANTIK
- **Pertanyaan Utama:** "${drivingQuestions.mainQuestion}"
- **Sub-Pertanyaan Penyelidikan:**
${drivingQuestions.subQuestions.map((q) => `  * ${q}`).join('\n')}

---

## 3. INTEGRASI DAN PERAN UNSUR STEAM
- **🔬 Science (Sains):**
  * *Konsep:* ${steamBreakdown.science.concept}
  * *Kontribusi Nyata:* ${steamBreakdown.science.concreteContribution}
  ${steamBreakdown.science.authenticityNote ? `* *Catatan:* ${steamBreakdown.science.authenticityNote}` : ''}

- **💻 Technology (Teknologi):**
  * *Konsep/Alat:* ${steamBreakdown.technology.concept}
  * *Kontribusi Nyata:* ${steamBreakdown.technology.concreteContribution}
  ${steamBreakdown.technology.authenticityNote ? `* *Catatan:* ${steamBreakdown.technology.authenticityNote}` : ''}

- **⚙️ Engineering (Rekayasa/Desain):**
  * *Konsep/Proses:* ${steamBreakdown.engineering.concept}
  * *Kontribusi Nyata:* ${steamBreakdown.engineering.concreteContribution}
  ${steamBreakdown.engineering.authenticityNote ? `* *Catatan:* ${steamBreakdown.engineering.authenticityNote}` : ''}

- **🎨 Arts (Seni & Kreativitas):**
  * *Konsep/Ekspresi:* ${steamBreakdown.arts.concept}
  * *Kontribusi Nyata:* ${steamBreakdown.arts.concreteContribution}
  ${steamBreakdown.arts.authenticityNote ? `* *Catatan:* ${steamBreakdown.arts.authenticityNote}` : ''}

- **📐 Mathematics (Matematika):**
  * *Konsep/Pengukuran:* ${steamBreakdown.mathematics.concept}
  * *Kontribusi Nyata:* ${steamBreakdown.mathematics.concreteContribution}
  ${steamBreakdown.mathematics.authenticityNote ? `* *Catatan:* ${steamBreakdown.mathematics.authenticityNote}` : ''}

---

## 4. ALUR & TAHAPAN PELAKSANAAN PROJEK
${projectFlow
  .map(
    (stage) => `### ${stage.stageName} (Estimasi: ${stage.estimatedTime})
- **Tujuan Tahap:** ${stage.purpose}
- **Aktivitas Siswa:**
${stage.studentActivities.map((act) => `  * ${act}`).join('\n')}
- **Bimbingan & Fasilitasi Guru:** ${stage.teacherGuidance}
- **Bukti / Hasil Tahap:** ${stage.deliverableOrOutput}
`
  )
  .join('\n')}

---

## 5. DAFTAR ALAT DAN BAHAN
${materialsList.map((m) => `- **${m.item}** (${m.category})${m.estimatedQty ? ` - Estimasi: ${m.estimatedQty}` : ''}`).join('\n')}

---

## 6. TIPS FASILITASI & KEAMANAN SISWA SD
${safetyAndFacilitationTips.map((tip) => `- ${tip}`).join('\n')}

---

## 7. PANDUAN ASESMEN & RUBRIK PENILAIAN
### Indikator Keberhasilan:
${assessmentGuide.successIndicators.map((ind, i) => `${i + 1}. ${ind}`).join('\n')}

### Bukti Belajar Teramati:
${assessmentGuide.observableEvidence.map((ev, i) => `${i + 1}. ${ev}`).join('\n')}

### Rubrik Penilaian:
| Kriteria | Aspek | Perlu Bimbingan (1) | Cukup (2) | Baik (3) | Sangat Berkembang (4) |
| :--- | :--- | :--- | :--- | :--- | :--- |
${assessmentGuide.rubrics
  .map(
    (r) =>
      `| ${r.criterion} | ${r.aspect} | ${r.levels.perluBimbingan} | ${r.levels.cukup} | ${r.levels.baik} | ${r.levels.sangatBaik} |`
  )
  .join('\n')}

---

## 8. PANDUAN DIFERENSIASI
- **Perancah untuk Siswa yang Membutuhkan Bantuan:**
  ${differentiationScaffolding.supportForBeginner}
- **Pengayaan untuk Siswa Cepat:**
  ${differentiationScaffolding.enrichmentForAdvanced}

---
*Catatan: Dokumen ini disusun dengan asistensi AI sebagai draf rancangan awal. Guru berwenang penuh memverifikasi, menyesuaikan, dan menyempurnakan implementasi di kelas.*
`;

  return md;
}

export function downloadTextFile(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
