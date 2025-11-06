
import React from 'react';
import { StepHeader } from './StepHeader';
import type { AspectRatio } from '../types';
import { MODEL_CATEGORIES, BACKGROUND_THEMES, ASPECT_RATIOS } from '../constants';

interface GenerationControlsProps {
    modelCategory: string;
    setModelCategory: (value: string) => void;
    backgroundTheme: string;
    setBackgroundTheme: (value: string) => void;
    aspectRatio: AspectRatio;
    setAspectRatio: (value: AspectRatio) => void;
    onGenerate: () => void;
    isEnabled: boolean;
}

export const GenerationControls: React.FC<GenerationControlsProps> = ({
    modelCategory,
    setModelCategory,
    backgroundTheme,
    setBackgroundTheme,
    aspectRatio,
    setAspectRatio,
    onGenerate,
    isEnabled
}) => {
    
    const selectClasses = "w-full p-3.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary transition appearance-none";
    const selectStyle = {
        backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-chevron-down%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        backgroundSize: '1.25em',
    };

    return (
        <div>
            <StepHeader
                step={2}
                title="Generate Model Images"
                description="Click the button to create your professional photoshoot."
            />

            <div className="mb-8">
                <label htmlFor="model-category-select" className="block text-lg font-semibold text-gray-800 mb-3 ml-1">
                    Choose a Model Category <span className="text-red-500">*</span>
                </label>
                <select
                    id="model-category-select"
                    value={modelCategory}
                    onChange={(e) => setModelCategory(e.target.value)}
                    className={selectClasses}
                    style={selectStyle}
                >
                    <option value="" disabled>Please select a category...</option>
                    {MODEL_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            
            <div className="mb-8">
                <label htmlFor="background-select" className="block text-lg font-semibold text-gray-800 mb-3 ml-1">
                    Choose a Background Theme (Optional)
                </label>
                <select
                    id="background-select"
                    value={backgroundTheme}
                    onChange={(e) => setBackgroundTheme(e.target.value)}
                    className={selectClasses}
                    style={selectStyle}
                >
                   {BACKGROUND_THEMES.map(group =>
                        group.options ? (
                            <optgroup key={group.label} label={group.label}>
                                {group.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                            </optgroup>
                        ) : (
                            <option key={group.value} value={group.value}>{group.label}</option>
                        )
                    )}
                </select>
            </div>

            <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-800 mb-3 ml-1">
                    Choose an Aspect Ratio (Size) <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                    {ASPECT_RATIOS.map(ar => (
                        <button
                            key={ar.value}
                            onClick={() => setAspectRatio(ar.value)}
                            className={`flex flex-col items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition w-20 
                                ${aspectRatio === ar.value ? 'border-brand-primary bg-pink-50 text-brand-primary' : 'border-gray-200 text-gray-400 hover:border-brand-secondary'}`}
                        >
                            {ar.svg}
                            <span className={`font-semibold mt-2 text-sm ${aspectRatio === ar.value ? 'text-brand-primary' : 'text-current'}`}>{ar.value}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={onGenerate}
                    disabled={!isEnabled}
                    className="bg-gradient-to-r from-brand-secondary to-brand-primary text-white font-bold py-3 px-12 rounded-full text-lg shadow-lg transition-all duration-300 enabled:hover:transform enabled:hover:-translate-y-0.5 enabled:hover:shadow-xl disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                >
                    <i className="fas fa-magic mr-2"></i>Generate Photoshoot
                </button>
            </div>
        </div>
    );
};
