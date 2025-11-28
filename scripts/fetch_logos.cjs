const fs = require('fs');
const path = require('path');

// Mock products list (simplified for the script)
const products = [
    { name: "Beautiful AI", slug: "beautiful-ai-1y" },
    { name: "Perplexity Pro", slug: "perplexity-pro-1y" },
    { name: "ChatGPT Plus", slug: "chatgpt-plus-1m" },
    { name: "Autodesk", slug: "autodesk-1y" },
    { name: "iLovePDF + IMG", slug: "ilovepdf-1y" },
    { name: "Adobe Creative Cloud", slug: "adobe-creative-cloud-4m" },
    { name: "Coursera", slug: "coursera-1y" },
    { name: "Granola Business", slug: "granola-business-1y" },
    { name: "Linear Business", slug: "linear-business-1y" },
    { name: "Superhuman Starter", slug: "superhuman-starter-1y" },
    { name: "Notion", slug: "notion-6m" },
    { name: "Raycast Pro", slug: "raycast-pro-1y" },
    { name: "ChatPRD Pro", slug: "chatprd-pro-1y" },
    { name: "Magic Patterns Hobby", slug: "magic-patterns-hobby-1y" },
    { name: "Mobbin Pro", slug: "mobbin-pro-1y" },
    { name: "ElevenLabs", slug: "elevenlabs-3m" },
    { name: "Lumion Pro", slug: "lumion-pro-1y" },
    { name: "JetBrains", slug: "jetbrains-1y" },
    { name: "Make.com", slug: "make-1y" },
    { name: "Bolt Pro", slug: "bolt-pro-1y" },
    { name: "Wispr Flow Pro", slug: "wispr-flow-pro-1y" },
    { name: "Devine Core", slug: "devine-core-1y" },
    { name: "Lovable Pro", slug: "lovable-pro-1y" },
    { name: "Replit Core", slug: "replit-core-1y" },
    { name: "n8n Cloud Starter", slug: "n8n-cloud-starter-1y" },
    { name: "Descript Creator", slug: "descript-creator-1y" },
    { name: "Warp Pro", slug: "warp-pro-1y" },
    { name: "Gamma Pro", slug: "gamma-pro-1y" },
    { name: "PicsArt Pro", slug: "picsart-pro-1y" },
    { name: "Grammarly Pro", slug: "grammarly-pro-1y" },
    { name: "Freepik Premium", slug: "freepik-premium-1y" },
    { name: "Envato Elements", slug: "envato-elements-1y" },
    { name: "FlutterFlow", slug: "flutterflow-1y" },
    { name: "Adobe Express", slug: "adobe-express-1y" },
    { name: "Wedflow", slug: "wedflow-1y" },
    { name: "edX Enterprises", slug: "edx-enterprises-1y" },
    { name: "InVideo Studio", slug: "invideo-studio-3y" },
    { name: "CapCut Pro", slug: "capcut-pro-6m" },
    { name: "LinkedIn Career", slug: "linkedin-career-3m" },
    { name: "LinkedIn Business", slug: "linkedin-business-3m" },
    { name: "LinkedIn Ads Credit", slug: "linkedin-ads-10k" },
    { name: "Canva Pro", slug: "canva-pro-1m" },
    { name: "Filmora Pro", slug: "filmora-pro-lifetime" },
    { name: "Pngtree", slug: "pngtree-lifetime" },
    { name: "Pikbest", slug: "pikbest-lifetime" },
    { name: "Microsoft Office 365", slug: "microsoft-office-365-lifetime" }
];

const domainMap = {
    "Beautiful AI": "https://www.beautiful.ai",
    "Perplexity Pro": "https://www.perplexity.ai",
    "ChatGPT Plus": "https://openai.com",
    "Autodesk": "https://www.autodesk.com",
    "iLovePDF + IMG": "https://www.ilovepdf.com",
    "Adobe Creative Cloud": "https://www.adobe.com",
    "Coursera": "https://www.coursera.org",
    "Granola Business": "https://granola.so",
    "Linear Business": "https://linear.app",
    "Superhuman Starter": "https://superhuman.com",
    "Notion": "https://www.notion.so",
    "Raycast Pro": "https://www.raycast.com",
    "ChatPRD Pro": "https://www.chatprd.ai",
    "Magic Patterns Hobby": "https://www.magicpatterns.com",
    "Mobbin Pro": "https://mobbin.com",
    "ElevenLabs": "https://elevenlabs.io",
    "Lumion Pro": "https://lumion.com",
    "JetBrains": "https://www.jetbrains.com",
    "Make.com": "https://www.make.com",
    "Bolt Pro": "https://bolt.new",
    "Wispr Flow Pro": "https://wisprflow.ai",
    "Devine Core": "https://devine.ai", // Best guess
    "Lovable Pro": "https://lovable.dev",
    "Replit Core": "https://replit.com",
    "n8n Cloud Starter": "https://n8n.io",
    "Descript Creator": "https://www.descript.com",
    "Warp Pro": "https://www.warp.dev",
    "Gamma Pro": "https://gamma.app",
    "PicsArt Pro": "https://picsart.com",
    "Grammarly Pro": "https://www.grammarly.com",
    "Freepik Premium": "https://www.freepik.com",
    "Envato Elements": "https://elements.envato.com",
    "FlutterFlow": "https://flutterflow.io",
    "Adobe Express": "https://www.adobe.com/express",
    "Wedflow": "https://wedflow.com",
    "edX Enterprises": "https://www.edx.org",
    "InVideo Studio": "https://invideo.io",
    "CapCut Pro": "https://www.capcut.com",
    "LinkedIn Career": "https://www.linkedin.com",
    "LinkedIn Business": "https://business.linkedin.com",
    "LinkedIn Ads Credit": "https://business.linkedin.com/marketing-solutions",
    "Canva Pro": "https://www.canva.com",
    "Filmora Pro": "https://filmora.wondershare.com",
    "Pngtree": "https://pngtree.com",
    "Pikbest": "https://pikbest.com",
    "Microsoft Office 365": "https://www.microsoft.com/microsoft-365"
};

async function findLogoOnSite(siteUrl) {
    if (!siteUrl) return null;

    try {
        const parsed = new URL(siteUrl);
        const base = `${parsed.protocol}//${parsed.host}`;
        const candidatePaths = [
            "/favicon.ico",
            "/logo.png",
            "/logo.svg",
            "/assets/logo.png",
            "/assets/logo.svg",
            "/static/images/logo.svg",
            "/static/logo.svg",
            "/images/logo.svg"
        ];

        for (const path of candidatePaths) {
            const logoUrl = base + path;
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2000);

                const resp = await fetch(logoUrl, {
                    method: 'HEAD',
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (resp.ok) {
                    const contentType = resp.headers.get("content-type") || "";
                    if (
                        contentType.startsWith("image/") ||
                        contentType.includes("svg") ||
                        contentType.includes("xml") ||
                        contentType.includes("icon")
                    ) {
                        return logoUrl;
                    }
                }
            } catch (e) {
                // ignore
            }
        }
    } catch (e) {
        // ignore invalid URLs
    }
    return null;
}

async function fetchLogoMetadata(product) {
    const officialWebsite = domainMap[product.name];
    let logoUrl = null;

    if (officialWebsite) {
        logoUrl = await findLogoOnSite(officialWebsite);
    }

    return {
        softwareName: product.name,
        officialWebsite,
        logoUrl,
        canUseInAppUI: false, // Always false as per instructions
        notes: logoUrl
            ? "Logo URL guessed from official domain. Review brand guidelines."
            : "No reliable official logo found automatically."
    };
}

(async () => {
    const results = [];
    console.log("Fetching logo metadata...");

    for (const product of products) {
        const meta = await fetchLogoMetadata(product);
        results.push(meta);
        // console.log(`Processed ${product.name}: ${meta.logoUrl || 'No logo'}`);
    }

    console.log(JSON.stringify(results, null, 2));
})();
