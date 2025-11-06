
import React from 'react';
import { StepHeader } from './StepHeader';
import { GalleryItem } from './GalleryItem';
import type { UploadedImage, AspectRatio, GeneratedImage } from '../types';

interface ResultsGalleryProps {
    images: GeneratedImage[];
    aspectRatio: AspectRatio;
    logo: UploadedImage | null;
}

export const ResultsGallery: React.FC<ResultsGalleryProps> = ({ images, aspectRatio, logo }) => {
    return (
        <div id="results-section">
            <StepHeader
                step={3}
                title="Your Results"
                description="Hover over any image to download your 4K shot."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map(image => (
                    <GalleryItem
                        key={image.index}
                        imageUrl={image.imageUrl}
                        index={image.index}
                        aspectRatio={aspectRatio}
                        logo={logo}
                    />
                ))}
            </div>
        </div>
    );
};
