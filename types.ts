
import type React from 'react';

export interface UploadedImage {
    base64: string;
    type: string;
    name: string;
    dataUrl: string;
}

export interface GeneratedImage {
    imageUrl: string;
    index: number;
}

export type AspectRatio = 
    '1:1' | '9:16' | '16:9' | '4:5' | '5:4' | 
    '3:4' | '4:3' | '2:3' | '3:2' | '5:7' | '7:5' | '1:2' | '2:1';

export interface AspectRatioInfo {
    value: AspectRatio;
    // Fix: Changed JSX.Element to React.ReactElement to resolve namespace error.
    svg: React.ReactElement;
}
