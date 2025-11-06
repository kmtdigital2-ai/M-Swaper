
import { GoogleGenAI, Modality } from "@google/genai";
import type { UploadedImage, GeneratedImage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function getConsistentModelDetails(category: string) {
    const femaleHairstyles = ["with long, flowing hair", "with elegant, wavy hair", "with a chic updo", "with sleek, straight hair", "with a stylish bob", "with soft curls"];
    const femaleBuilds = ["with a slender build", "with an athletic build", "with graceful curves"];
    const maleHairstyles = ["with short, styled hair", "with wavy hair", "with a classic cut", "with slightly long hair", "with a buzz cut"];
    const maleBuilds = ["with an athletic build", "with a slender build", "with a muscular build"];
    const childHairstyles = ["with neat hair", "with curly hair", "with straight hair", "with a playful haircut"];
    const childBuilds = ["with a healthy build", "with a slender build"];
    const newbornHairstyles = ["with a wisp of fine hair", "who is bald", "with a little bit of hair"];
    const newbornBuilds = ["a healthy newborn"];
    
    const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

    switch (category) {
        case 'Female':
            return { modelDescription: "a beautiful, photorealistic young Indian woman", hairstyle: getRandomItem(femaleHairstyles), build: getRandomItem(femaleBuilds) };
        case 'Gents':
            return { modelDescription: "a handsome, photorealistic young Indian man", hairstyle: getRandomItem(maleHairstyles), build: getRandomItem(maleBuilds) };
        case 'Girls':
            return { modelDescription: "a photorealistic young Indian girl (around 8-10 years old)", hairstyle: getRandomItem(childHairstyles), build: getRandomItem(childBuilds) };
        case 'Boys':
            return { modelDescription: "a photorealistic young Indian boy (around 8-10 years old)", hairstyle: getRandomItem(childHairstyles), build: getRandomItem(childBuilds) };
        case 'Newborn':
            return { modelDescription: "a photorealistic newborn baby", hairstyle: getRandomItem(newbornHairstyles), build: getRandomItem(newbornBuilds) };
        default:
            return { modelDescription: "a photorealistic model", hairstyle: "", build: "" };
    }
}

async function callApi(prompt: string, images: Record<string, UploadedImage | null>): Promise<string> {
    const imageParts = Object.values(images)
        .filter((img): img is UploadedImage => img !== null)
        .map(img => ({
            inlineData: { mimeType: img.type, data: img.base64 }
        }));
    
    if (imageParts.length === 0) {
        throw new Error("No images provided for generation.");
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }, ...imageParts],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const b64Data = part.inlineData.data;
                if (b64Data) {
                    return `data:image/png;base64,${b64Data}`;
                }
            }
        }
        throw new Error("No image data found in API response.");

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        throw new Error(error.message || "Failed to generate image from API.");
    }
}

export const generateModelImages = async (
    uploadedImages: Record<string, UploadedImage | null>,
    modelCategory: string,
    backgroundTheme: string,
    posePrompts: string[],
    onProgress: (index: number) => void
): Promise<GeneratedImage[]> => {
    
    const { modelDescription, hairstyle, build } = getConsistentModelDetails(modelCategory);
    
    let backgroundPrompt = backgroundTheme === "AI's Choice"
        ? "Place the model in a sophisticated, aesthetically pleasing background suitable for a high-fashion editorial (like an architectural interior, or a soft, minimalist studio setting)."
        : `Place the model ${backgroundTheme}.`;

    let basePrompt = `Using the uploaded images of a garment on a mannequin (front, side, back, and detail views as provided), replace the mannequin with ${modelDescription} ${hairstyle} and ${build}. The garment must be perfectly fitted to the model. ${backgroundPrompt}`;
    if (modelCategory === 'Newborn') {
        basePrompt = `Using the uploaded images of a garment (front, side, back, and detail views as provided), show the garment on ${modelDescription} ${hairstyle} and ${build}. The garment must be fitted comfortably. ${backgroundPrompt}`;
    }

    const apiPromises = posePrompts.map((posePrompt, index) => {
        let fullPrompt;
        const isDetailShot = index >= 6; // First 6 are model poses

        if (isDetailShot) {
            let detailModelDesc = `The model is ${modelDescription} ${hairstyle} and ${build}.`;
            if (modelCategory === 'Newborn') {
                detailModelDesc = `The model is ${modelDescription} ${hairstyle}.`;
            }
            fullPrompt = `Using the uploaded images, ${posePrompt} ${detailModelDesc} ${backgroundPrompt} The background must be beautifully blurred. The image should be 4K resolution.`;
        } else {
            fullPrompt = `${basePrompt} ${posePrompt} The final image must be ultra-realistic, 4K resolution, for Instagram.`;
        }
        
        return callApi(fullPrompt, uploadedImages)
            .then(imageUrl => {
                onProgress(index);
                return { imageUrl, index };
            });
    });

    const results = await Promise.all(apiPromises);
    results.sort((a, b) => a.index - b.index); // Ensure order is maintained
    return results;
};
