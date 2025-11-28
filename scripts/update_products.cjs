const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/lib/products.ts');
const logosPath = path.join(__dirname, 'logos.json');

const logos = JSON.parse(fs.readFileSync(logosPath, 'utf8'));
let content = fs.readFileSync(productsPath, 'utf8');

logos.forEach(meta => {
    // Find the product block by name
    // We look for name: "Software Name"
    const nameRegex = new RegExp(`name: "${meta.softwareName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');

    if (content.match(nameRegex)) {
        // We found the product. Now we need to update its fields.
        // This is a bit hacky with regex but should work for the structured file we have.
        // We'll look for the block starting with this name and update specific fields.

        // Actually, simpler: split by the name, then look ahead for the fields.
        // But we have multiple fields.

        // Let's try to replace the specific lines for this product.
        // We assume the file structure is consistent:
        // name: "...",
        // ...
        // logoUrl: null,
        // canUseInAppUI: false,
        // brandNotes: "..."

        // We will replace the whole block of 3 lines if we can find it nearby.
        // But the distance might vary.

        // Alternative: Read the file, find the index of the name, then find the next logoUrl, etc.

        const nameIndex = content.indexOf(`name: "${meta.softwareName}"`);
        if (nameIndex !== -1) {
            // Find the closing brace of this object to limit search
            // This is risky if we don't parse correctly.

            // Let's use a safer replacement.
            // We will replace `logoUrl: null` with the new value *only* if it follows this name.
            // But `replace` only replaces the first occurrence if we use a string or non-global regex.
            // We can construct a regex that matches the name and then the fields.

            const regex = new RegExp(
                `(name: "${meta.softwareName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?)logoUrl: [^,]+,([\\s\\S]*?)brandNotes: "[^"]+"`,
                'm'
            );

            const logoVal = meta.logoUrl ? `"${meta.logoUrl}"` : 'null';
            const notesVal = meta.notes ? `"${meta.notes}"` : '""';
            const websiteVal = meta.officialWebsite ? `"${meta.officialWebsite}"` : 'null';

            // We also want to add officialWebsite.
            // We'll append it after brandNotes.

            if (content.match(regex)) {
                content = content.replace(regex, (match, p1, p2) => {
                    return `${p1}logoUrl: ${logoVal},${p2}brandNotes: ${notesVal},\n        officialWebsite: ${websiteVal}`;
                });
            }
        }
    }
});

fs.writeFileSync(productsPath, content, 'utf8');
console.log('Updated products.ts');
