
import type { AspectRatio, UploadedImage } from '../types';

export function calculateMaxDimensions(ratioString: AspectRatio, maxDimension: number = 4096) {
    const [ratioW, ratioH] = ratioString.split(':').map(Number);

    if (ratioW > ratioH) {
        const targetWidth = maxDimension;
        const targetHeight = Math.round((maxDimension * ratioH) / ratioW);
        return { targetWidth, targetHeight };
    } else if (ratioH > ratioW) {
        const targetHeight = maxDimension;
        const targetWidth = Math.round((maxDimension * ratioW) / ratioH);
        return { targetWidth, targetHeight };
    } else {
        return { targetWidth: maxDimension, targetHeight: maxDimension };
    }
}

export function resizeAndDisplayImage(
    imageUrl: string,
    targetWidth: number,
    targetHeight: number,
    canvas: HTMLCanvasElement,
    logo: UploadedImage | null
): Promise<void> {
    return new Promise((resolve, reject) => {
        const mainImage = new Image();
        mainImage.crossOrigin = "Anonymous";
        mainImage.src = imageUrl;

        mainImage.onload = () => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error("Could not get canvas context"));

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            const srcRatio = mainImage.width / mainImage.height;
            const targetRatio = targetWidth / targetHeight;

            let cropX = 0, cropY = 0, cropWidth = mainImage.width, cropHeight = mainImage.height;

            if (srcRatio > targetRatio) { // Image is wider than target
                cropWidth = mainImage.height * targetRatio;
                cropX = (mainImage.width - cropWidth) / 2;
            } else if (srcRatio < targetRatio) { // Image is taller than target
                cropHeight = mainImage.width / targetRatio;
                cropY = (mainImage.height - cropHeight) / 2;
            }

            ctx.drawImage(mainImage, cropX, cropY, cropWidth, cropHeight, 0, 0, targetWidth, targetHeight);

            if (logo) {
                const logoImage = new Image();
                logoImage.src = logo.dataUrl;
                logoImage.onload = () => {
                    const logoMaxWidth = targetWidth * 0.15;
                    const logoScale = logoMaxWidth / logoImage.width;
                    const logoWidth = logoMaxWidth;
                    const logoHeight = logoImage.height * logoScale;
                    const padding = targetWidth * 0.02;

                    ctx.drawImage(logoImage, padding, padding, logoWidth, logoHeight);
                    resolve();
                };
                logoImage.onerror = (err) => {
                    console.error("Failed to load logo", err);
                    resolve(); // Resolve anyway so app doesn't break
                };
            } else {
                resolve();
            }
        };

        mainImage.onerror = (err) => reject(new Error("Failed to load the generated image."));
    });
}
