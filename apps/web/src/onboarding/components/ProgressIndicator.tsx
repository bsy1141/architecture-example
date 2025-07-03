import React from 'react';

interface ProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
    steps: { title: string; description?: string }[];
    orientation?: 'horizontal' | 'vertical';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
    currentStep,
    totalSteps,
    steps,
    orientation = 'horizontal',
}) => {
    return (
        <div
            className={`progress-indicator progress-indicator--${orientation}`}
        >
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;
                const isUpcoming = stepNumber > currentStep;

                return (
                    <div
                        key={stepNumber}
                        className={`progress-step ${
                            isCompleted
                                ? 'progress-step--completed'
                                : isCurrent
                                  ? 'progress-step--current'
                                  : 'progress-step--upcoming'
                        }`}
                    >
                        <div className="progress-step__indicator">
                            <div className="progress-step__circle">
                                {isCompleted ? (
                                    <svg
                                        className="progress-step__check"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                ) : (
                                    <span className="progress-step__number">
                                        {stepNumber}
                                    </span>
                                )}
                            </div>

                            {stepNumber < totalSteps && (
                                <div className="progress-step__line" />
                            )}
                        </div>

                        <div className="progress-step__content">
                            <h4 className="progress-step__title">
                                {step.title}
                            </h4>
                            {step.description && (
                                <p className="progress-step__description">
                                    {step.description}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
