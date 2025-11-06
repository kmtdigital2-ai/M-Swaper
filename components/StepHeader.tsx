
import React from 'react';

interface StepHeaderProps {
    step: number;
    title: string;
    description: string;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ step, title, description }) => {
    return (
        <div className="mb-6 flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="bg-brand-primary text-white font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                {step}
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};
