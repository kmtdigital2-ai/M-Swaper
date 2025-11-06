
import React from 'react';
import type { AspectRatioInfo, AspectRatio } from './types';

export const POSE_PROMPTS = [
    // 6 Model Poses
    "The model stands straight, facing the camera. Hands relaxed by the side or lightly on hips. Focus: full outfit front view, showing fit and cut clearly. This is a classic catalogue pose.",
    "The model turns slightly (about 45°) to one side. One leg in front, shoulders angled. Shows garment shape and drape.",
    "The model stands side-on to the camera. Can place one hand on the hip or play with hair. Highlights garment silhouette and sleeves. The AI should intelligently use the uploaded 'side' view for reference if provided.",
    "The model walks slowly toward or across the camera. Natural leg and arm movement. Flow of fabric and real-life fit visible.",
    "The model turns back  slightly toward the camera, looking over their shoulder with a soft expression. Back design and neckline shown elegantly. The AI should intelligently use the uploaded 'back' view for reference if provided.",
    "The model sits elegantly on a stool, chair, or step. One knee bent, arms relaxed, adding personality and a premium lifestyle feel.",
    
    // 3 Detail Shots
    "generate an ultra-detailed, close-up shot of the model wearing the garment, focusing on the fabric texture, stitching, and embellishments. The model's face may be partially or fully out of frame. The AI should intelligently use the uploaded 'detail' view for reference if provided.",
    "create a detailed shot of the model wearing the garment, focusing on a unique feature like a collar, cuff, pocket, or intricate pattern. The shot should be from the waist up or a close-up on the specific detail. The AI should intelligently use the uploaded 'detail' view for reference if provided.",
    "generate a close-up shot of the model's torso while wearing the garment, clearly showing the details of the buttons, zippers, or craftsmanship. The model should be in a subtle pose. The AI should intelligently use the uploaded 'detail' view for reference if provided."
];

export const NEWBORN_POSE_PROMPTS = [
    "The baby is lying comfortably on their back, facing up. Focus: full outfit front view.",
    "The baby is lying gently on their side. Shows garment shape.",
    "A view of the baby lying on their stomach, showing the back of the garment.",
    "The baby is nestled in a soft blanket, showing the garment.",
    "The baby is lying peacefully, sleeping, in a comfortable position.",
    "A close-up shot of the baby's outfit while being held (no holder visible).",
    // Detail shots
    "generate an ultra-detailed, close-up shot of the baby wearing the garment, focusing on the fabric texture or stitching. The AI should intelligently use the uploaded 'detail' view for reference if provided.",
    "create a detailed shot of the baby wearing the garment, focusing on a unique feature like a collar, cuff, or pattern. The AI should intelligently use the uploaded 'detail' view for reference if provided.",
    "generate a close-up shot of the baby's torso while wearing the garment, clearly showing the details of buttons or craftsmanship. The AI should intelligently use the uploaded 'detail' view for reference if provided."
];

export const MODEL_CATEGORIES = ["Female", "Gents", "Girls", "Boys", "Newborn"];

export const BACKGROUND_THEMES = [
    { label: "AI's Choice (Best Match)", value: "AI's Choice" },
    {
        label: "Studio & Minimal", options: [
            { value: "in a studio with a soft gradient beige to ivory background", label: "1. Soft gradient beige to ivory" },
            { value: "in a studio with a matte grey premium wall", label: "2. Matte grey premium studio wall" },
            { value: "in a studio with a smooth pastel pink background with soft shadows", label: "3. Smooth pastel pink with soft shadows" },
            { value: "in a studio with a warm neutral tone background with subtle fabric texture", label: "4. Warm neutral tone with subtle fabric texture" },
            { value: "in a classic white seamless studio", label: "5. Classic white seamless studio" },
            { value: "on a light cream luxury backdrop with floor reflection", label: "6. Light cream luxury backdrop with floor reflection" },
            { value: "in a studio with a monochrome black high-contrast background", label: "7. Monochrome black high-contrast background" },
            { value: "in a studio with a textured sandstone wall with studio lighting", label: "8. Textured sandstone wall with studio lighting" },
            { value: "in a studio with a silver metallic gradient background", label: "9. Silver metallic gradient background" },
            { value: "in an elegant matte navy blue studio setup", label: "10. Elegant matte navy blue studio setup" },
        ]
    },
    {
        label: "Natural & Outdoor", options: [
            { value: "in a garden with greenery and soft bokeh", label: "11. Garden greenery with soft bokeh" },
            { value: "in a stone courtyard with soft sunlight", label: "12. Stone courtyard with soft sunlight" },
            { value: "with a luxury resort poolside view", label: "13. Luxury resort poolside view" },
            { value: "in an urban street fashion look with a blurred city background", label: "14. Urban street fashion (blurred city)" },
            { value: "on a beach with a golden hour tone", label: "15. Beachside golden hour tone" },
            { value: "on a mountain-view luxury villa deck", label: "16. Mountain-view luxury villa deck" },
            { value: "with a palm-tree background with a premium tropical tone", label: "17. Palm-tree premium tropical tone" },
            { value: "on a classic European street (Paris, Milan style)", label: "18. Classic European street (Paris, Milan)" },
            { value: "on an elegant park walkway with morning light", label: "19. Elegant park walkway with morning light" },
            { value: "on a forest path with filtered sunlight", label: "20. Forest path with filtered sunlight" },
        ]
    },
    {
      label: "Architectural & Interior", options: [
        { value: "in front of a marble wall with gold accent", label: "21. Marble wall with gold accent" },
        { value: "inside a luxury boutique interior", label: "22. Luxury boutique interior" },
        { value: "in a designer studio with spotlight setup", label: "23. Designer studio with spotlight setup" },
        { value: "in front of a premium textured wooden panel wall", label: "24. Premium textured wooden panel wall" },
        { value: "in a modern apartment corner with sunlight", label: "25. Modern apartment corner with sunlight" },
        { value: "in a fashion runway environment", label: "26. Fashion runway environment" },
        { value: "in a grand hall with soft lighting", label: "27. Grand hall with soft lighting" },
        { value: "in a white arch hallway aesthetic", label: "28. White arch hallway aesthetic" },
        { value: "with a concrete wall minimal background", label: "29. Concrete wall minimal background" },
        { value: "with a glass window background with soft daylight", label: "30. Glass window background with soft daylight" },
      ]
    },
];

// Fix: Replaced JSX with React.createElement to avoid syntax errors in a .ts file.
const rectProps = {
    x: "5",
    y: "5",
    rx: "8",
    className: "stroke-current",
    strokeWidth: "6",
    fill: "currentColor",
    fillOpacity: "0.1",
};

export const ASPECT_RATIOS: AspectRatioInfo[] = [
    { value: '1:1', svg: React.createElement('svg', { className: "w-8 h-8", viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "90", height: "90" })) },
    { value: '9:16', svg: React.createElement('svg', { className: "w-6 h-8", viewBox: "0 0 90 160", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "80", height: "150" })) },
    { value: '16:9', svg: React.createElement('svg', { className: "w-8 h-6", viewBox: "0 0 160 90", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "150", height: "80" })) },
    { value: '4:5', svg: React.createElement('svg', { className: "w-8 h-8", viewBox: "0 0 80 100", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "70", height: "90" })) },
    { value: '5:4', svg: React.createElement('svg', { className: "w-8 h-8", viewBox: "0 0 100 80", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "90", height: "70" })) },
    { value: '3:4', svg: React.createElement('svg', { className: "w-7 h-8", viewBox: "0 0 60 80", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "50", height: "70" })) },
    { value: '4:3', svg: React.createElement('svg', { className: "w-8 h-7", viewBox: "0 0 80 60", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "70", height: "50" })) },
    { value: '2:3', svg: React.createElement('svg', { className: "w-6 h-8", viewBox: "0 0 40 60", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "30", height: "50" })) },
    { value: '3:2', svg: React.createElement('svg', { className: "w-8 h-6", viewBox: "0 0 60 40", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "50", height: "30" })) },
    { value: '5:7', svg: React.createElement('svg', { className: "w-7 h-8", viewBox: "0 0 50 70", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "40", height: "60" })) },
    { value: '7:5', svg: React.createElement('svg', { className: "w-8 h-7", viewBox: "0 0 70 50", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "60", height: "40" })) },
    { value: '1:2', svg: React.createElement('svg', { className: "w-5 h-8", viewBox: "0 0 30 60", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "20", height: "50" })) },
    { value: '2:1', svg: React.createElement('svg', { className: "w-8 h-5", viewBox: "0 0 60 30", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('rect', { ...rectProps, width: "50", height: "20" })) },
];
