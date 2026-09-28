export type GradeLevel = 'Kelas 1' | 'Kelas 2' | 'Kelas 3' | 'Kelas 4';

export type ProjectDuration =
  | '1 pertemuan'
  | '2–3 pertemuan'
  | '1 minggu'
  | '2 minggu'
  | 'Lebih dari 2 minggu';

export type ComplexityLevel = 'Dasar' | 'Menengah' | 'Lebih menantang';

export interface SteamFormData {
  grade: GradeLevel;
  cp: string;
  subject: string;
  theme: string;
  duration: ProjectDuration;
  resources: string;
  complexity: ComplexityLevel;
}

export interface SteamSuitabilityMatrix {
  cpAlignment: number; // 1-100
  ageAppropriateness: number; // 1-100
  steamIntegrationStrength: number; // 1-100
  feasibility: number; // 1-100
  durationFit: number; // 1-100
  resourceFit: number; // 1-100
  overallNote: string;
}

export interface SteamIntegrationSummary {
  science: string;
  technology: string;
  engineering: string;
  arts: string;
  mathematics: string;
}

export interface SteamProjectAlternative {
  id: string;
  title: string;
  drivingQuestion: string;
  targetedCp: string;
  cpAlignmentReason: string;
  steamIntegration: SteamIntegrationSummary;
  productOutcome: string;
  mainActivities: string[];
  estimatedDuration: string;
  toolsAndMaterials: string[];
  difficultyLevel: ComplexityLevel;
  assessmentOverview: string;
  ageAdjustmentNotes: string;
  suitabilityMatrix: SteamSuitabilityMatrix;
  isRecommendedPick?: boolean;
  recommendationReason?: string;
}

export interface ProjectFlowStage {
  stageNumber: number;
  stageName: string;
  purpose: string;
  studentActivities: string[];
  teacherGuidance: string;
  estimatedTime: string;
  deliverableOrOutput: string;
}

export interface RubricLevel {
  perluBimbingan: string; // 1
  cukup: string;          // 2
  baik: string;           // 3
  sangatBaik: string;     // 4
}

export interface RubricItem {
  criterion: string;
  aspect: 'Proses' | 'Produk' | 'Sikap & Kolaborasi';
  levels: RubricLevel;
}

export interface SteamDetailedRole {
  concept: string;
  concreteContribution: string;
  authenticityNote?: string;
}

export interface SteamProjectDetail {
  projectId: string;
  projectIdentity: {
    title: string;
    grade: GradeLevel;
    subject: string;
    targetedCp: string;
    theme: string;
    duration: string;
    complexity: ComplexityLevel;
  };
  learningObjectives: string[];
  drivingQuestions: {
    mainQuestion: string;
    subQuestions: string[];
  };
  steamBreakdown: {
    science: SteamDetailedRole;
    technology: SteamDetailedRole;
    engineering: SteamDetailedRole;
    arts: SteamDetailedRole;
    mathematics: SteamDetailedRole;
  };
  projectFlow: ProjectFlowStage[];
  materialsList: {
    item: string;
    category: string;
    estimatedQty?: string;
  }[];
  safetyAndFacilitationTips: string[];
  assessmentGuide: {
    successIndicators: string[];
    observableEvidence: string[];
    rubrics: RubricItem[];
  };
  differentiationScaffolding: {
    supportForBeginner: string;
    enrichmentForAdvanced: string;
  };
}
