
import React, { useRef, useEffect } from 'react';
import type { UploadedImage, AspectRatio } from '../types';
import { resizeAndDisplayImage, calculateMaxDimensions } from '../utils/imageUtils';

interface GalleryItemProps {
    imageUrl: string;
    index: number;
    aspectRatio: AspectRatio;
    logo: UploadedImage | null;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ imageUrl, index, aspectRatio, logo }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const processImage = async () => {
            if (canvasRef.current && imageUrl) {
                try {
                    const { targetWidth, targetHeight } = calculateMaxDimensions(aspectRatio);
                    await resizeAndDisplayImage(imageUrl, targetWidth, targetHeight, canvasRef.current, logo);
                } catch (e) {
                    console.error(`Failed to process image ${index}:`, e);
                    // Optionally draw an error message on the canvas
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        const { targetWidth, targetHeight } = calculateMaxDimensions(aspectRatio);
                        canvas.width = targetWidth;
                        canvas.height = targetHeight;
                        ctx.fillStyle = "black";
                        ctx.font = "16px Poppins, sans-serif";
                        ctx.fillText("Error loading image", 10, 30);
                    }
                }
            }
        };

        processImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageUrl, aspectRatio, logo]);

    const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (!canvasRef.current) return;

        const dataUrl = canvasRef.current.toDataURL('image/png');
        const link = document.createElement('a');
        const ratioFilename = aspectRatio.replace(':', 'x');
        link.download = `model-image-${index + 1}_${ratioFilename}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const [w, h] = aspectRatio.split(':');
    const aspectRatioStyle = { aspectRatio: `${w} / ${h}` };

    return (
        <div style={aspectRatioStyle} className="group relative bg-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
            <canvas ref={canvasRef} className="w-full h-full object-cover" />
            <a
                href="#"
                onClick={handleDownload}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transform scale-80 group-hover:scale-100 transition-all duration-300
                           hover:bg-brand-primary"
                aria-label="Download image"
            >
                <i className="fas fa-download"></i>
            </a>
        </div>
    );
};
