
export type Language = 'es' | 'en' | 'zh';

export type Certification = 'Play & Stay' | 'Nivel 1' | 'Nivel 2' | 'Nivel 3';

export type PlayerLevel = 'Iniciación' | 'Intermedio' | 'Competición' | 'Alta Competición';

export interface CoachInfo {
  name: string;
  age: number | '';
  certification: Certification;
}

export interface SessionInfo {
  date: string;
  numPlayers: number | '';
  playerLevel: PlayerLevel;
}

export interface ActivityData {
  id: string;
  title: string;
  practiceOrganization: string[];
  instruction: string[];
  feedback: string[];
}

export interface SessionRecord {
  id: string;
  coach: CoachInfo;
  session: SessionInfo;
  activities: ActivityData[];
  createdAt: string;
}

export interface ManualDefinition {
  label: string;
  definition: string;
}

export interface Translations {
  title: string;
  coachSection: string;
  sessionSection: string;
  activitySection: string;
  name: string;
  age: string;
  certification: string;
  date: string;
  numPlayers: string;
  playerLevel: string;
  addActivity: string;
  updateActivity: string;
  cancelEdit: string;
  removeActivity: string;
  editActivity: string;
  saveSession: string;
  loadSession: string;
  exportCSV: string;
  history: string;
  noHistory: string;
  practiceOrg: string;
  instruction: string;
  feedback: string;
  activityTitle: string;
  registeredActivities: string;
  actions: string;
  helpInstructions: string[];
  methodology: string;
  levels: Record<PlayerLevel, string>;
  certifications: string[];
  options: {
    practice: Record<string, ManualDefinition>;
    instruction: Record<string, ManualDefinition>;
    feedback: Record<string, ManualDefinition>;
  };
  aiAnalysis: string;
  getInsights: string;
  loading: string;
}
