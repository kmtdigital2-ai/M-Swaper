
import React from 'react';
import { StepHeader } from './StepHeader';
import { UploadArea } from './UploadArea';
import type { UploadedImage } from '../types';

interface UploadSectionProps {
    onFileChange: (file: File, id: string) => void;
    uploadedImages: Record<string, UploadedImage | null>;
    uploadedLogo: UploadedImage | null;
}

const uploadAreasConfig = [
    { id: 'front', title: 'Garment Front', isRequired: true },
    { id: 'side', title: 'Garment Side' },
    { id: 'back', title: 'Garment Back' },
    { id: 'detail', title: 'Garment Detail' },
];

export const UploadSection: React.FC<UploadSectionProps> = ({ onFileChange, uploadedImages, uploadedLogo }) => {
    return (
        <div>
            <StepHeader
                step={1}
                title="Upload Garment Photos"
                description="Upload the front image (required) and add side, back, or detail shots (recommended)."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {uploadAreasConfig.map(config => (
                    <UploadArea
                        key={config.id}
                        id={config.id}
                        title={config.title}
                        isRequired={config.isRequired}
                        onFileChange={onFileChange}
                        previewUrl={uploadedImages[config.id]?.dataUrl}
                    />
                ))}
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 ml-1">Upload Your Logo (Optional)</h3>
                <UploadArea
                    id="logo"
                    title="Logo"
                    onFileChange={onFileChange}
                    previewUrl={uploadedLogo?.dataUrl}
                    isLogo={true}
                />
            </div>
        </div>
    );
};
