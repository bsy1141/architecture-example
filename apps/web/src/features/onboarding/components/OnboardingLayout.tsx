import React from 'react';

interface OnboardingLayoutProps {
    children: React.ReactNode;
    currentStep: number;
    totalSteps: number;
    title: string;
    subtitle?: string;
    onNext?: () => void;
    onPrevious?: () => void;
    onSkip?: () => void;
    nextLabel?: string;
    previousLabel?: string;
    skipLabel?: string;
    isNextDisabled?: boolean;
    isLoading?: boolean;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
    children,
    currentStep,
    totalSteps,
    title,
    subtitle,
    onNext,
    onPrevious,
    onSkip,
    nextLabel = '다음',
    previousLabel = '이전',
    skipLabel = '건너뛰기',
    isNextDisabled = false,
    isLoading = false,
}) => {
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="onboarding-layout">
            <div className="onboarding-layout__header">
                <div className="onboarding-layout__progress">
                    <div className="progress-bar">
                        <div
                            className="progress-bar__fill"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <span className="progress-text">
                        {currentStep} / {totalSteps}
                    </span>
                </div>

                <div className="onboarding-layout__title">
                    <h1>{title}</h1>
                    {subtitle && <p className="subtitle">{subtitle}</p>}
                </div>
            </div>

            <div className="onboarding-layout__content">{children}</div>

            <div className="onboarding-layout__footer">
                <div className="onboarding-layout__actions">
                    {currentStep > 1 && (
                        <button
                            className="btn btn--secondary"
                            onClick={onPrevious}
                            disabled={isLoading}
                        >
                            {previousLabel}
                        </button>
                    )}

                    <div className="onboarding-layout__actions-right">
                        {onSkip && (
                            <button
                                className="btn btn--text"
                                onClick={onSkip}
                                disabled={isLoading}
                            >
                                {skipLabel}
                            </button>
                        )}

                        <button
                            className="btn btn--primary"
                            onClick={onNext}
                            disabled={isNextDisabled || isLoading}
                        >
                            {isLoading ? '처리중...' : nextLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
