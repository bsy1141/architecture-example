import { ApiClient } from '../../../shared/api/client';

export interface OnboardingData {
    step: number;
    completed: boolean;
    data: {
        personalInfo?: PersonalInfo;
        preferences?: UserPreferences;
        goals?: UserGoals;
    };
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    age: number;
    occupation: string;
    experience: 'beginner' | 'intermediate' | 'advanced';
}

export interface UserPreferences {
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    studyTime: 'morning' | 'afternoon' | 'evening' | 'night';
    difficulty: 'easy' | 'medium' | 'hard';
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
}

export interface UserGoals {
    primaryGoal: string;
    targetSkills: string[];
    timeCommitment: number; // hours per week
    deadline?: string;
}

export interface SaveOnboardingRequest {
    step: number;
    data: Partial<OnboardingData['data']>;
}

export const onboardingApi = {
    getOnboardingData: async (): Promise<OnboardingData> => {
        const response = await ApiClient.get('/onboarding');
        return response.data;
    },

    saveOnboardingData: async (
        data: SaveOnboardingRequest,
    ): Promise<OnboardingData> => {
        const response = await ApiClient.post('/onboarding', data);
        return response.data;
    },

    completeOnboarding: async (): Promise<void> => {
        await ApiClient.post('/onboarding/complete');
    },

    resetOnboarding: async (): Promise<void> => {
        await ApiClient.delete('/onboarding');
    },

    getOnboardingProgress: async (): Promise<{
        currentStep: number;
        totalSteps: number;
        completedSteps: number[];
    }> => {
        const response = await ApiClient.get('/onboarding/progress');
        return response.data;
    },
};
