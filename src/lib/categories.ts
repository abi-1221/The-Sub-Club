import { products } from "./products";

export interface Category {
    id: string;
    label: string;
    description: string;
    productIds: string[];
}

export const categories: Category[] = [
    {
        id: "ai-automation",
        label: "AI & Automation",
        description: "AI copilots, chat assistants, and automation platforms.",
        productIds: [
            "chatgpt-plus-1m",
            "perplexity-pro-1y",
            "beautiful-ai-1y",
            "make-1y",
            "n8n-cloud-starter-1y",
            "wispr-flow-pro-1y",
            "elevenlabs-3m",
            "gamma-pro-1y",
            "chatprd-pro-1y",
            "granola-business-1y",
            "devine-core-1y"
        ]
    },
    {
        id: "design-creative",
        label: "Design & Creative",
        description: "Tools for graphic design, UI, branding, and creative assets.",
        productIds: [
            "adobe-creative-cloud-4m",
            "adobe-creative-cloud-1y",
            "canva-pro-1m",
            "autodesk-1y",
            "lumion-pro-1y",
            "picsart-pro-1y",
            "freepik-premium-1y",
            "envato-elements-1y",
            "adobe-express-1y",
            "wedflow-1y",
            "pngtree-lifetime",
            "pikbest-lifetime",
            "magic-patterns-hobby-1y",
            "mobbin-pro-1y",
            "lovable-pro-1y"
        ]
    },
    {
        id: "developer-tools",
        label: "Developer Tools",
        description: "IDEs, coding assistants, and app builders.",
        productIds: [
            "jetbrains-1y",
            "replit-core-1y",
            "warp-pro-1y",
            "bolt-pro-1y",
            "flutterflow-1y"
        ]
    },
    {
        id: "video-media",
        label: "Video & Media",
        description: "Video editing, recording, and media production tools.",
        productIds: [
            "descript-creator-1y",
            "invideo-studio-3y",
            "capcut-pro-6m",
            "filmora-pro-lifetime"
        ]
    },
    {
        id: "productivity-office",
        label: "Productivity & Office",
        description: "Tools to organize tasks, documents, and daily work.",
        productIds: [
            "notion-6m",
            "microsoft-office-365-lifetime",
            "ilovepdf-1y",
            "superhuman-starter-1y",
            "raycast-pro-1y",
            "grammarly-pro-1y"
        ]
    },
    {
        id: "business-career",
        label: "Business & Career",
        description: "Tools for growing your business, sales, and teams.",
        productIds: [
            "linear-business-1y",
            "linkedin-career-3m",
            "linkedin-business-3m",
            "linkedin-ads-10k"
        ]
    },
    {
        id: "learning-education",
        label: "Learning & Education",
        description: "Platforms for upskilling, courses, and certifications.",
        productIds: [
            "coursera-1y",
            "edx-enterprises-1y"
        ]
    }
];

export function getProductsByCategory(categoryId: string) {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return [];
    return products.filter(p => category.productIds.includes(p.id));
}
