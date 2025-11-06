
import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { GenerationControls } from './components/GenerationControls';
import { ResultsGallery } from './components/ResultsGallery';
import { Loader } from './components/Loader';
import { Modal } from './components/Modal';
import { generateModelImages } from './services/geminiService';
import type { UploadedImage, AspectRatio, GeneratedImage } from './types';
import { POSE_PROMPTS, NEWBORN_POSE_PROMPTS } from './constants';

const App: React.FC = () => {
    const [uploadedImages, setUploadedImages] = useState<Record<string, UploadedImage | null>>({
        front: null,
        side: null,
        back: null,
        detail: null,
    });
    const [uploadedLogo, setUploadedLogo] = useState<UploadedImage | null>(null);
    const [modelCategory, setModelCategory] = useState<string>('');
    const [backgroundTheme, setBackgroundTheme] = useState<string>("AI's Choice");
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('4:5');
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loaderMessage, setLoaderMessage] = useState<string>('');
    const [modal, setModal] = useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });

    const showModal = (message: string) => {
        setModal({ isOpen: true, message });
    };

    const handleFileChange = useCallback((file: File, id: string) => {
        if (!file.type.startsWith('image/')) {
            showModal('Please upload an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            const [, data] = result.split(',');
            const newImage: UploadedImage = { base64: data, type: file.type, name: file.name, dataUrl: result };

            if (id === 'logo') {
                setUploadedLogo(newImage);
            } else {
                setUploadedImages(prev => ({ ...prev, [id]: newImage }));
            }
        };
        reader.readAsDataURL(file);
    }, []);

    const isGenerateButtonEnabled = useMemo(() => {
        return !!uploadedImages.front && modelCategory !== '';
    }, [uploadedImages.front, modelCategory]);

    const handleGenerate = async () => {
        if (!isGenerateButtonEnabled) {
            if (!uploadedImages.front) showModal("Please upload the 'Garment Front' image to proceed.");
            else if (!modelCategory) showModal("Please select a model category to proceed.");
            return;
        }

        setIsLoading(true);
        setLoaderMessage('AI is getting ready for the photoshoot...');
        setGeneratedImages([]);

        const posePrompts = modelCategory === 'Newborn' ? NEWBORN_POSE_PROMPTS : POSE_PROMPTS;

        try {
            const onProgress = (index: number) => {
                setLoaderMessage(`Generated ${index + 1} of ${posePrompts.length} images...`);
            };

            const images = await generateModelImages(
                uploadedImages,
                modelCategory,
                backgroundTheme,
                posePrompts,
                onProgress
            );
            
            setGeneratedImages(images);

        } catch (error) {
            console.error("Image generation failed:", error);
            showModal(error instanceof Error ? error.message : "Sorry, an error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
                <Header />
                <main className="p-6 sm:p-10 space-y-12">
                    <UploadSection onFileChange={handleFileChange} uploadedImages={uploadedImages} uploadedLogo={uploadedLogo} />
                    <GenerationControls
                        modelCategory={modelCategory}
                        setModelCategory={setModelCategory}
                        backgroundTheme={backgroundTheme}
                        setBackgroundTheme={setBackgroundTheme}
                        aspectRatio={aspectRatio}
                        setAspectRatio={setAspectRatio}
                        onGenerate={handleGenerate}
                        isEnabled={isGenerateButtonEnabled}
                    />
                    {generatedImages.length > 0 && (
                        <ResultsGallery
                            images={generatedImages}
                            aspectRatio={aspectRatio}
                            logo={uploadedLogo}
                        />
                    )}
                </main>
            </div>
            {isLoading && <Loader message={loaderMessage} />}
            {modal.isOpen && (
                <Modal message={modal.message} onClose={() => setModal({ isOpen: false, message: '' })} />
            )}
        </div>
    );
};

export default App;
