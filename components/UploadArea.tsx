
import React, { useState, useCallback, useRef } from 'react';
import type { UploadedImage } from '../types';

interface UploadAreaProps {
    id: string;
    title: string;
    isRequired?: boolean;
    onFileChange: (file: File, id: string) => void;
    previewUrl?: string | null;
    isLogo?: boolean;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ id, title, isRequired, onFileChange, previewUrl, isLogo = false }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFileChange(e.dataTransfer.files[0], id);
        }
    }, [id, onFileChange]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileChange(e.target.files[0], id);
        }
    };
    
    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleBrowseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        inputRef.current?.click();
    };

    const handlePreviewClick = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        inputRef.current?.click();
    };
    
    const baseClasses = "relative rounded-2xl cursor-pointer border-3 border-dashed transition-all duration-300 flex flex-col justify-center items-center p-6";
    const logoClasses = "min-h-[150px] p-4";
    const garmentClasses = "min-h-[300px]";
    const dragOverClasses = isDragOver ? "border-brand-primary bg-pink-50" : "border-gray-300 bg-gray-50";

    return (
        <div
            className={`${baseClasses} ${isLogo ? logoClasses : garmentClasses} ${dragOverClasses}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            {!isLogo && (
                <h3 className="text-lg font-semibold text-gray-800 absolute top-4 left-4">
                    {title} {isRequired && <span className="text-red-500">*</span>}
                </h3>
            )}
            
            {!previewUrl && (
                 <div className="text-center">
                    <i className={`fas ${isLogo ? 'fa-image' : 'fa-cloud-upload-alt'} text-5xl text-gray-400`}></i>
                    <p className="mt-4 text-lg font-semibold text-gray-700">Drag & drop {isLogo ? 'Logo' : title}</p>
                    <p className="text-gray-500">or</p>
                    <button onClick={handleBrowseClick} className="mt-2 font-semibold text-white bg-gray-600 px-6 py-2 rounded-lg hover:bg-gray-700 transition">
                        Browse
                    </button>
                </div>
            )}

            {previewUrl && (
                <img
                    src={previewUrl}
                    alt={`${title} Preview`}
                    className={`object-contain w-full rounded-lg mx-auto ${isLogo ? 'max-h-[100px]' : 'max-h-[250px]'}`}
                    onClick={handlePreviewClick}
                />
            )}
            
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
            />
        </div>
    );
};
