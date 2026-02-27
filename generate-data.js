#!/usr/bin/env node

/**
 * 📄 DATA.JSON GENERATOR
 * Tự động quét ảnh từ các thư mục và tạo data.json
 * 
 * Sử dụng: node generate-data.js
 *          hoặc: npm run generate-data
 */

const fs = require('fs');
const path = require('path');

// ============================================
// CONFIG
// ============================================

const IMAGE_DIR = path.join(__dirname, 'assets', 'images');

const PORTFOLIO_CATEGORIES = {
    'executive': {
        name: 'Executive Portraits',
        defaultTitle: (num) => `Executive Portrait ${num}`,
        defaultSubtitle: (num) => `CEO & Leadership Series`
    },
    'corporate': {
        name: 'Corporate Profiles',
        defaultTitle: (num) => `Corporate Profile ${num}`,
        defaultSubtitle: (num) => `Professional Headshot Series`
    },
    'entrepreneur': {
        name: 'Entrepreneur Portraits',
        defaultTitle: (num) => `Entrepreneur Portrait ${num}`,
        defaultSubtitle: (num) => `Startup & Business Founder`
    },
    'influencer': {
        name: 'Influencer Personal Branding',
        defaultTitle: (num) => `Personal Branding ${num}`,
        defaultSubtitle: (num) => `Content Creator Series`
    }
};

const BEFORE_AFTER_PATTERNS = {
    'executive': 'Executive Portraits',
    'corporate': 'Corporate Profiles',
    'influencer': 'Influencer Branding'
};

const BLOG_CATEGORIES = {
    'executive': { title: 'Bộ Sưu Tập Executive', category: 'Executive', description: '40+ ảnh chuyên nghiệp cho CEO, Founder, Director' },
    'corporate': { title: 'Bộ Sưu Tập Corporate', category: 'Corporate', description: 'Hình ảnh chuyên nghiệp cho nhân sự công ty' },
    'entrepreneur': { title: 'Bộ Sưu Tập Entrepreneur', category: 'Entrepreneur', description: 'Ảnh branding cho startup và kinh doanh' },
    'influencer': { title: 'Bộ Sưu Tập Personal Branding', category: 'Influencer', description: 'Ảnh content creator & social media' },
    'tips-1': { title: 'Mẹo Chụp Ảnh Profile Hiệu Quả', category: 'Tips', description: 'Hướng dẫn cách tạo ảnh profile chuyên nghiệp' },
    'tips-2': { title: 'Cách Chuẩn Bị Cho Buổi Chụp', category: 'Tips', description: 'Lời khuyên từ chuyên gia về chuẩn bị studio' }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Scan folder and get all image files
 */
function getImageFiles(folderPath) {
    if (!fs.existsSync(folderPath)) {
        return [];
    }
    
    const files = fs.readdirSync(folderPath);
    return files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    }).sort((a, b) => {
        // Sort by filename
        const aNum = parseInt(a) || 0;
        const bNum = parseInt(b) || 0;
        return aNum - bNum;
    });
}

/**
 * Extract number from filename (e.g., "1.jpg" -> 1)
 */
function extractNumber(filename) {
    const match = filename.match(/^\d+/);
    return match ? parseInt(match[0]) : null;
}

/**
 * Check if files match before/after pattern
 */
function findBeforeAfterPairs(folderPath) {
    if (!fs.existsSync(folderPath)) {
        return [];
    }
    
    const files = fs.readdirSync(folderPath);
    const pairs = [];
    const processed = new Set();
    
    files.forEach(file => {
        if (processed.has(file)) return;
        
        const baseName = file.replace(/-(before|after)\.(jpg|jpeg|png|webp)$/i, '');
        const beforeFile = file.includes('before') ? file : null;
        const afterFile = file.includes('after') ? file : null;
        
        if (beforeFile && afterFile) {
            pairs.push({
                before: beforeFile,
                after: afterFile,
                base: baseName
            });
            processed.add(file);
        } else if (beforeFile) {
            // Check if matching after file exists
            const possibleAfter = file.replace('before', 'after');
            if (files.includes(possibleAfter)) {
                pairs.push({
                    before: file,
                    after: possibleAfter,
                    base: baseName
                });
                processed.add(file);
                processed.add(possibleAfter);
            }
        }
    });
    
    return pairs;
}

/**
 * Capitalize first letter
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert filename to title
 */
function filenameToTitle(filename) {
    // Remove extension
    let name = path.basename(filename, path.extname(filename));
    
    // Replace common separators with spaces
    name = name.replace(/[-_]/g, ' ');
    
    // Capitalize words
    name = name.split(' ').map(word => capitalize(word)).join(' ');
    
    return name || 'Untitled Image';
}

// ============================================
// GENERATE DATA.JSON
// ============================================

function generateData() {
    console.log('📊 Generating data.json from images...\n');
    
    const data = {
        portfolio: {},
        beforeAfter: [],
        blog: []
    };
    
    let portfolioId = 1;
    let beforeAfterId = 1;
    let blogId = 1;
    
    // ============================================
    // PORTFOLIO GALLERIES
    // ============================================
    
    console.log('📁 Scanning portfolio folders...');
    
    Object.keys(PORTFOLIO_CATEGORIES).forEach(category => {
        const categoryPath = path.join(IMAGE_DIR, category);
        const images = getImageFiles(categoryPath);
        
        data.portfolio[category] = [];
        
        images.forEach(image => {
            const num = extractNumber(image);
            const config = PORTFOLIO_CATEGORIES[category];
            
            data.portfolio[category].push({
                id: portfolioId++,
                title: config.defaultTitle(num || ''),
                subtitle: config.defaultSubtitle(num || ''),
                image: `assets/images/${category}/${image}`,
                category: category
            });
        });
        
        if (images.length > 0) {
            console.log(`  ✓ ${category}: ${images.length} images`);
        } else {
            console.log(`  ⚠ ${category}: No images found`);
        }
    });
    
    console.log('');
    
    // ============================================
    // BEFORE/AFTER SLIDERS
    // ============================================
    
    console.log('📁 Scanning before/after folder...');
    
    const beforeAfterPath = path.join(IMAGE_DIR, 'before-after');
    const pairs = findBeforeAfterPairs(beforeAfterPath);
    
    pairs.forEach(pair => {
        const baseName = pair.base
            .replace(/-(before|after)$/i, '')
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(w => capitalize(w))
            .join(' ');
        
        data.beforeAfter.push({
            id: beforeAfterId++,
            title: `${baseName} Transformation`,
            before: `assets/images/before-after/${pair.before}`,
            after: `assets/images/before-after/${pair.after}`
        });
    });
    
    if (pairs.length > 0) {
        console.log(`  ✓ Found ${pairs.length} before/after pairs`);
    } else {
        console.log(`  ⚠ No before/after pairs found`);
    }
    
    console.log('');
    
    // ============================================
    // BLOG/CATEGORIES
    // ============================================
    
    console.log('📁 Scanning blog folder...');
    
    const blogPath = path.join(IMAGE_DIR, 'blog');
    const blogImages = getImageFiles(blogPath);
    
    blogImages.forEach(image => {
        const baseName = path.basename(image, path.extname(image));
        const config = BLOG_CATEGORIES[baseName];
        
        if (config) {
            data.blog.push({
                id: blogId++,
                title: config.title,
                category: config.category,
                description: config.description,
                image: `assets/images/blog/${image}`,
                link: `#${baseName}-portfolio`
            });
        } else {
            // Fallback for unknown blog images
            data.blog.push({
                id: blogId++,
                title: filenameToTitle(image),
                category: 'Gallery',
                description: `Portfolio collection - ${capitalize(baseName)}`,
                image: `assets/images/blog/${image}`,
                link: '#portfolio'
            });
        }
    });
    
    if (blogImages.length > 0) {
        console.log(`  ✓ ${blogImages.length} blog/category images`);
    } else {
        console.log(`  ⚠ No blog images found`);
    }
    
    console.log('');
    
    return data;
}

// ============================================
// SAVE DATA.JSON
// ============================================

function saveData(data) {
    const outputPath = path.join(__dirname, 'assets', 'data.json');
    const jsonString = JSON.stringify(data, null, 2);
    
    try {
        fs.writeFileSync(outputPath, jsonString, 'utf8');
        
        console.log('✅ SUCCESS!');
        console.log(`📝 Saved: ${outputPath}`);
        console.log('\n📊 Summary:');
        console.log(`  • Portfolio items: ${Object.values(data.portfolio).flat().length}`);
        console.log(`  • Before/After pairs: ${data.beforeAfter.length}`);
        console.log(`  • Blog entries: ${data.blog.length}`);
        console.log(`\n🚀 Reload website to see changes!`);
        
        return true;
    } catch (error) {
        console.error('❌ Error saving data.json:', error.message);
        return false;
    }
}

// ============================================
// MAIN
// ============================================

function main() {
    console.log('╔════════════════════════════════════╗');
    console.log('║  🔧 DATA.JSON AUTO GENERATOR  ║');
    console.log('╚════════════════════════════════════╝\n');
    
    // Check if images directory exists
    if (!fs.existsSync(IMAGE_DIR)) {
        console.error('❌ Error: assets/images folder not found!');
        process.exit(1);
    }
    
    // Generate data
    const data = generateData();
    
    // Save to file
    const success = saveData(data);
    
    process.exit(success ? 0 : 1);
}

// Run
if (require.main === module) {
    main();
}

module.exports = { generateData, saveData };
