#!/usr/bin/env node

/**
 * Auto-generate data.json from images in folders
 * Run: node auto-generate-data.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const IMAGES_DIR = './assets/images';
const OUTPUT_FILE = './assets/data.json';

// Category labels for display
const categoryLabels = {
    executive: 'Executive',
    corporate: 'Corporate',
    entrepreneur: 'Entrepreneur',
    influencer: 'Influencer'
};

const subtitleMap = {
    executive: 'Executive Portrait',
    corporate: 'Corporate Profile',
    entrepreneur: 'Entrepreneur Portrait',
    influencer: 'Influencer Profile'
};

// ============================================
// MAIN FUNCTION
// ============================================

async function generateDataJson() {
    console.log('🔍 Scanning image directories...\n');

    const data = {
        portfolio: {},
        beforeAfter: [],
        blog: []
    };

    // 1. Process portfolio categories
    const portfolioCategories = ['executive', 'corporate', 'entrepreneur', 'influencer'];
    
    for (const category of portfolioCategories) {
        const categoryPath = path.join(IMAGES_DIR, category);
        if (!fs.existsSync(categoryPath)) continue;

        const images = fs.readdirSync(categoryPath)
            .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
            .sort();

        if (images.length > 0) {
            data.portfolio[category] = [];
            images.forEach((image, index) => {
                data.portfolio[category].push({
                    id: data.portfolio[category].length + 1,
                    title: `${categoryLabels[category]} Portrait ${index + 1}`,
                    subtitle: subtitleMap[category],
                    image: `assets/images/${category}/${image}`,
                    category: category
                });
            });

            console.log(`✅ ${categoryLabels[category]}: Found ${images.length} image(s)`);
        }
    }

    // 2. Process before/after images
    const beforeAfterDir = path.join(IMAGES_DIR, 'before-after');
    if (fs.existsSync(beforeAfterDir)) {
        const images = fs.readdirSync(beforeAfterDir)
            .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
            .sort();

        // Group before/after pairs
        const pairs = new Map();
        
        images.forEach(image => {
            const baseName = image.replace(/-(before|after)\.(jpg|jpeg|png|webp)$/i, '');
            if (!pairs.has(baseName)) {
                pairs.set(baseName, {});
            }
            
            if (image.toLowerCase().includes('-before')) {
                pairs.get(baseName).before = `assets/images/before-after/${image}`;
            } else if (image.toLowerCase().includes('-after')) {
                pairs.get(baseName).after = `assets/images/before-after/${image}`;
            }
        });

        // Create before/after entries
        let id = 1;
        pairs.forEach((pair, baseName) => {
            if (pair.before && pair.after) {
                const titleParts = baseName.split('-');
                const title = titleParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
                
                data.beforeAfter.push({
                    id: id++,
                    title: `${title} Transformation`,
                    before: pair.before,
                    after: pair.after
                });
            }
        });

        if (data.beforeAfter.length > 0) {
            console.log(`✅ Before/After: Found ${data.beforeAfter.length} pair(s)`);
        }
    }

    // 3. Process blog images
    const blogDir = path.join(IMAGES_DIR, 'blog');
    if (fs.existsSync(blogDir)) {
        const images = fs.readdirSync(blogDir)
            .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
            .sort();

        const blogCategories = ['Executive', 'Corporate', 'Entrepreneur', 'Influencer'];
        let id = 1;

        images.forEach((image, index) => {
            const fileName = path.parse(image).name;
            const category = blogCategories.find(cat => 
                fileName.toLowerCase().includes(cat.toLowerCase())
            ) || 'Portfolio';

            data.blog.push({
                id: id++,
                title: `${category} Profile Collection`,
                category: category,
                description: `Professional ${category.toLowerCase()} portraits and portfolio images`,
                image: `assets/images/blog/${image}`,
                link: `#portfolio`
            });
        });

        if (data.blog.length > 0) {
            console.log(`✅ Blog: Found ${data.blog.length} image(s)`);
        }
    }

    // 4. Save to JSON file
    const jsonContent = JSON.stringify(data, null, 2);
    fs.writeFileSync(OUTPUT_FILE, jsonContent);

    console.log(`\n✨ Successfully generated: ${OUTPUT_FILE}`);
    console.log(`\n📊 Summary:`);
    console.log(`   - Portfolio items: ${Object.values(data.portfolio).reduce((sum, arr) => sum + arr.length, 0)}`);
    console.log(`   - Before/After pairs: ${data.beforeAfter.length}`);
    console.log(`   - Blog entries: ${data.blog.length}`);
    console.log(`\n✅ Auto-generation complete!`);
}

// ============================================
// ERROR HANDLING & RUN
// ============================================

try {
    generateDataJson();
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
