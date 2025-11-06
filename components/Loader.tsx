
import React from 'react';

interface LoaderProps {
    message: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white/80 backdrop-blur-sm">
            <div className="w-16 h-16 border-5 border-gray-200 border-t-brand-primary rounded-full animate-spin"></div>
            <p className="mt-6 text-xl font-semibold text-gray-800 text-center px-4">{message}</p>
        </div>
    );
};
