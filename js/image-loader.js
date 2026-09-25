// ============================================
// PEXELS PORTFOLIO LOADER
// ============================================

const PEXELS_API_KEY = 'JYx8GlEAwyAcirMKQ3AedyN0Cy1z8DfhlJ66nOCP6YJwuVDXNIK8X4oP';
const PEXELS_PROFILE_URL = 'https://www.pexels.com/@kooldark';
const PEXELS_QUERIES = [
    { key: 'executive', query: 'Tran Nhu Tuan executive portrait' },
    { key: 'corporate', query: 'Tran Nhu Tuan corporate portrait' },
    { key: 'entrepreneur', query: 'Tran Nhu Tuan entrepreneur portrait' },
    { key: 'influencer', query: 'Tran Nhu Tuan influencer portrait' }
];

function normalizePexelsImage(photo) {
    const source = photo?.src?.large2x || photo?.src?.large || photo?.src?.medium || photo?.src?.original;
    if (!source) return '';

    try {
        const url = new URL(source);
        url.searchParams.set('w', '1024');
        url.searchParams.set('auto', 'compress');
        url.searchParams.set('cs', 'tinysrgb');
        return url.toString();
    } catch (error) {
        return source;
    }
}

function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const show = filter === 'all' || filter === category;
                item.style.display = show ? 'block' : 'none';
            });
        });
    });
}

async function loadImageData() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    try {
        const items = [];

        const seenPhotoIds = new Set();

        for (const item of PEXELS_QUERIES) {
            for (let page = 1; page <= 2; page++) {
                const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(item.query)}&per_page=12&page=${page}`, {
                    headers: {
                        Authorization: PEXELS_API_KEY
                    }
                });

                if (!response.ok) {
                    throw new Error(`Pexels request failed: ${response.status}`);
                }

                const data = await response.json();
                if (!Array.isArray(data.photos)) continue;

                data.photos
                    .filter(photo => (photo.photographer_url || '').toLowerCase().includes('/@kooldark'))
                    .forEach(photo => {
                    const normalized = normalizePexelsImage(photo);
                    if (!normalized || seenPhotoIds.has(photo.id)) return;
                    seenPhotoIds.add(photo.id);
                    if (!items.some(entry => entry.key === photo.id)) {
                        items.push({
                            key: photo.id,
                            category: item.key,
                            src: normalized,
                            alt: photo.alt || item.query,
                            title: photo.photographer || 'KDProfile'
                        });
                    }
                });

                if (items.length >= 12) {
                    break;
                }
            }
        }

        if (!items.length) {
            throw new Error('No photos returned from Pexels');
        }

        galleryGrid.innerHTML = items.map(item => `
            <div class="gallery-item" data-category="${item.category}">
                <div class="gallery-image">
                    <img src="${item.src}" alt="${item.alt}" class="gallery-img" style="width:100%;height:100%;object-fit:cover;">
                    <div class="gallery-overlay">
                        <a href="https://www.pexels.com/" target="_blank" class="gallery-link" title="Xem ảnh">
                            <i class="fas fa-expand"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        setupGalleryFilters();
        return;
    } catch (error) {
        console.error('Pexels gallery load failed:', error);
        const fallbackImages = [
            'assets/images/executive/kdp (1).JPEG',
            'assets/images/corporate/kdp (1).jpg',
            'assets/images/entrepreneur/kdp (3).jpg',
            'assets/images/influencer/kdp (4).jpg',
            'assets/images/executive/kdp (5).JPG',
            'assets/images/corporate/kdp (2).jpg'
        ];

        galleryGrid.innerHTML = fallbackImages.map((src, index) => `
            <div class="gallery-item" data-category="${index % 2 === 0 ? 'executive' : 'corporate'}">
                <div class="gallery-image">
                    <img src="${src}" alt="Portfolio" class="gallery-img" style="width:100%;height:100%;object-fit:cover;">
                    <div class="gallery-overlay">
                        <a href="#" class="gallery-link" title="Xem toàn bộ">
                            <i class="fas fa-expand"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        setupGalleryFilters();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadImageData();
});
