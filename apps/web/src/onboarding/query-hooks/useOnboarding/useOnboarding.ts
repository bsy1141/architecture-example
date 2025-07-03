import { useState, useEffect, useCallback } from 'react';
import {
    onboardingApi,
    OnboardingData,
    SaveOnboardingRequest,
} from './useOnboarding/onboarding.api';

export const useOnboarding = () => {
    const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(
        null,
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(1);

    const fetchOnboardingData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await onboardingApi.getOnboardingData();
            setOnboardingData(data);
            setCurrentStep(data.step);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : '온보딩 데이터를 불러오는데 실패했습니다.',
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const saveOnboardingData = useCallback(
        async (data: SaveOnboardingRequest) => {
            try {
                setLoading(true);
                setError(null);
                const updatedData =
                    await onboardingApi.saveOnboardingData(data);
                setOnboardingData(updatedData);
                setCurrentStep(updatedData.step);
                return { success: true, data: updatedData };
            } catch (err) {
                const error =
                    err instanceof Error
                        ? err.message
                        : '온보딩 데이터 저장에 실패했습니다.';
                setError(error);
                return { success: false, error };
            } finally {
                setLoading(false);
            }
        },
        [],
    );

    const completeOnboarding = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            await onboardingApi.completeOnboarding();
            setOnboardingData(prev =>
                prev ? { ...prev, completed: true } : null,
            );
            return { success: true };
        } catch (err) {
            const error =
                err instanceof Error
                    ? err.message
                    : '온보딩 완료에 실패했습니다.';
            setError(error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    }, []);

    const resetOnboarding = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            await onboardingApi.resetOnboarding();
            setOnboardingData(null);
            setCurrentStep(1);
            return { success: true };
        } catch (err) {
            const error =
                err instanceof Error
                    ? err.message
                    : '온보딩 초기화에 실패했습니다.';
            setError(error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    }, []);

    const goToNextStep = useCallback(() => {
        setCurrentStep(prev => Math.min(prev + 1, 3)); // 총 3단계 가정
    }, []);

    const goToPreviousStep = useCallback(() => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    }, []);

    const goToStep = useCallback((step: number) => {
        setCurrentStep(Math.max(1, Math.min(step, 3)));
    }, []);

    useEffect(() => {
        fetchOnboardingData();
    }, [fetchOnboardingData]);

    return {
        onboardingData,
        loading,
        error,
        currentStep,
        saveOnboardingData,
        completeOnboarding,
        resetOnboarding,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        refetch: fetchOnboardingData,
    };
};
