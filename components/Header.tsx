
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center p-8 sm:p-12 bg-gray-50 border-b border-gray-200">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">
                M SWAP
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Upload your product photo to instantly generate professional model images for your brand.
            </p>
        </header>
    );
};
