export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface UserSkillLevel {
  skillId: string;
  skillName: string;
  level: number; // 0-5 scale
  lastUpdated?: string;
  confidence?: number;
}

export interface TrainingRecommendation {
  skillId: string;
  skillName: string;
  gap: number;
  resources: {
    type: "course" | "article" | "practice" | "mentorship";
    title: string;
    url: string;
    provider: string;
    duration?: string;
    difficulty: "beginner" | "intermediate" | "advanced";
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  professionalHeadline?: string;
  imageUrl?: string;
  skills: UserSkillLevel[];
  learningHistory?: LearningHistoryItem[];
}

export interface LearningHistoryItem {
  skillName: string;
  previousLevel: number;
  newLevel: number;
  date: string;
  method: string;
  duration?: string;
}

export interface SkillComparison {
  userA: Genome | null;
  userB: Genome | null;
  skillsShared: Strength[];
  skillsUnique: Strength[];
  skillGaps: Strength[];
  trainingRecommendations: TrainingRecommendation[];
}
export interface Genome {
  person: Person;
  stats: Stats;
  strengths: Strength[];
  interests: any[];
  experiences: Award[];
  awards: Award[];
  jobs: Award[];
  projects: Award[];
  publications: Award[];
  education: Award[];
  opportunities: any[];
  preferences: Preferences;
  languages: Language[];
}
export interface Strength {
  id: string;
  code: number;
  name: string;
  proficiency: Proficiency;
  implicitProficiency: boolean;
  weight: number;
  recommendations: number;
  media: Media[];
  supra: boolean;
  created: Date;
  hits: number;
  relatedExperiences: string[];
  pin: boolean;
  additionalInfo?: string;
}
export interface Award {
  id: string;
  category: Category;
  name: string;
  organizations: Organization[];
  responsibilities: any[];
  fromMonth?: string;
  fromYear?: string;
  toMonth?: string;
  toYear?: string;
  additionalInfo: string;
  highlighted: boolean;
  weight: number;
  verifications: number;
  recommendations: number;
  media: Media[];
  rank: number;
  strengths: any[];
  remote?: boolean;
}

export enum Category {
  Awards = "awards",
  Education = "education",
  Jobs = "jobs",
  Projects = "projects",
  Publications = "publications",
}

export interface Media {
  group: string;
  mediaType: MediaType;
  description: string;
  mediaItems: MediaItem[];
}

export interface MediaItem {
  id: string;
  address: string;
  metadata?: string;
}

export enum MediaType {
  Link = "link",
  Media = "media",
}

export interface Organization {
  id: number;
  name: string;
  publicId: string;
  picture?: string;
  theme: Theme;
  serviceType: ServiceType;
  professionalHeadline?: string;
  websiteUrl?: string;
  about?: string;
  perks?: string;
}

export enum ServiceType {
  SelfService = "self_service",
}

export enum Theme {
  Amber600 = "amber600",
  Default = "default",
  Lime500 = "lime500",
}

export interface Language {
  code: string;
  language: string;
  fluency: string;
}

export interface Person {
  professionalHeadline: string;
  completion: number;
  showPhone: boolean;
  created: Date;
  verified: boolean;
  flags: { [key: string]: boolean };
  weight: number;
  ggId: string;
  completionStage: CompletionStage;
  locale: string;
  subjectId: number;
  picture: string;
  hasEmail: boolean;
  isTest: boolean;
  name: string;
  links: Link[];
  location: Location;
  theme: string;
  id: string;
  pictureThumbnail: string;
  claimant: boolean;
  summaryOfBio: string;
  weightGraph: string;
  publicId: string;
}

export interface CompletionStage {
  stage: number;
  progress: number;
}

export interface Link {
  id: string;
  name: string;
  address: string;
}

export interface Location {
  name: string;
  shortName: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  placeId: string;
}

export interface Preferences {
  jobsFullTime: FlexibleJobs;
  flexibleJobs: FlexibleJobs;
  internships: FlexibleJobs;
}

export interface FlexibleJobs {
  active: boolean;
  private: boolean;
  notifications: string;
  desirableCompensation?: DesirableCompensation;
}

export interface DesirableCompensation {
  currency: string;
  implicit: boolean;
  amount?: number;
  onlyDisclosed?: boolean;
  periodicity?: string;
  publiclyVisible?: boolean;
}

export interface Stats {
  strengths: number;
  publications: number;
  awards: number;
  education: number;
  jobs: number;
  projects: number;
}

export enum Proficiency {
  Expert = "expert",
  Proficient = "proficient",
  Novice = "novice",
  NoExperienceInterested = "no-experience-interested",
}
