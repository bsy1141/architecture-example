export interface OnboardingState {
    currentStep: number;
    totalSteps: number;
    completedSteps: number[];
    data: OnboardingFormData;
    isCompleted: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface OnboardingFormData {
    personalInfo: PersonalInfo;
    preferences: UserPreferences;
    goals: UserGoals;
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    age: number;
    occupation: string;
    experience: ExperienceLevel;
    profileImage?: string;
}

export interface UserPreferences {
    learningStyle: LearningStyle;
    studyTime: StudyTime;
    difficulty: DifficultyLevel;
    language: Language;
    notifications: NotificationSettings;
    themes: ThemePreference;
}

export interface UserGoals {
    primaryGoal: string;
    targetSkills: string[];
    timeCommitment: number; // hours per week
    deadline?: string;
    motivations: string[];
    successMetrics: string[];
}

export interface NotificationSettings {
    email: boolean;
    push: boolean;
    sms: boolean;
    weeklyDigest: boolean;
    achievementAlerts: boolean;
}

export type ExperienceLevel =
    | 'beginner'
    | 'intermediate'
    | 'advanced'
    | 'expert';
export type LearningStyle = 'visual' | 'auditory' | 'kinesthetic' | 'reading';
export type StudyTime =
    | 'morning'
    | 'afternoon'
    | 'evening'
    | 'night'
    | 'flexible';
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'adaptive';
export type Language = 'ko' | 'en' | 'ja' | 'zh';
export type ThemePreference = 'light' | 'dark' | 'system';

export interface OnboardingStep {
    id: number;
    title: string;
    description: string;
    component: string;
    isOptional: boolean;
    estimatedTime: number; // minutes
    validationRules?: ValidationRule[];
}

export interface ValidationRule {
    field: string;
    rule: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';
    value?: any;
    message: string;
}

export interface OnboardingProgress {
    currentStep: number;
    totalSteps: number;
    completedSteps: number[];
    progressPercentage: number;
    estimatedTimeRemaining: number; // minutes
}

export interface OnboardingAnalytics {
    totalUsers: number;
    completionRate: number;
    averageCompletionTime: number;
    dropOffPoints: { step: number; rate: number }[];
    commonSkippedSteps: number[];
}
