
import React from 'react';

interface ModalProps {
    message: string;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
                <p className="text-lg text-gray-800 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-gradient-to-r from-brand-secondary to-brand-primary text-white font-semibold px-8 py-2 rounded-lg transition-transform hover:scale-105"
                >
                    OK
                </button>
            </div>
        </div>
    );
};
