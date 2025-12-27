
export type Language = 'es' | 'en' | 'zh' | 'pt';

export type Certification = 
  | 'None' 
  | 'Play & Stay or equivalent' 
  | 'Level 1 or equivalent' 
  | 'Level 2 or equivalent' 
  | 'Level 3 or equivalent' 
  | 'Others';

export type PlayerLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'High performance';

export interface CoachInfo {
  name: string;
  age: number | '';
  country: string;
  yearsExperience: number | '';
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
  country: string;
  yearsExperience: string;
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
  certifications: Record<Certification, string>;
  options: {
    practice: Record<string, ManualDefinition>;
    instruction: Record<string, ManualDefinition>;
    feedback: Record<string, ManualDefinition>;
  };
}
