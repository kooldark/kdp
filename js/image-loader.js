// ============================================
// IMAGE DATA LOADER
// ============================================

let galleryData = {};

// Load data from JSON file
async function loadImageData() {
    try {
        const response = await fetch('assets/data.json');
        galleryData = await response.json();
        console.log('Image data loaded successfully', galleryData);
        
        // Render all galleries after data loaded
        renderPortfolioGallery();
        renderBeforeAfterSliders();
        renderBlogCards();
    } catch (error) {
        console.error('Error loading image data:', error);
    }
}

// ============================================
// RENDER PORTFOLIO GALLERY
// ============================================

function renderPortfolioGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    // Flatten all portfolio categories
    const allItems = Object.values(galleryData.portfolio || {}).flat();
    
    allItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', item.category);
        
        galleryItem.innerHTML = `
            <div class="gallery-image">
                <img src="${item.image}" alt="${item.title}" class="gallery-img" onerror="this.src='assets/images/placeholder.jpg'">
                <div class="gallery-overlay">
                    <a href="${item.image}" class="gallery-link" title="Xem toàn bộ">
                        <i class="fas fa-expand"></i>
                    </a>
                </div>
            </div>
            <div class="gallery-info">
                <h3>${item.title}</h3>
                <p>${item.subtitle}</p>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
    
    // Re-attach filter event listeners
    setupGalleryFilters();
}

// ============================================
// RENDER BEFORE/AFTER SLIDERS
// ============================================

function renderBeforeAfterSliders() {
    const beforeAfterGallery = document.querySelector('.before-after-gallery');
    if (!beforeAfterGallery) return;
    
    beforeAfterGallery.innerHTML = '';
    
    const beforeAfterItems = galleryData.beforeAfter || [];
    
    beforeAfterItems.forEach((item, index) => {
        const sliderItem = document.createElement('div');
        sliderItem.className = 'before-after-item';
        
        sliderItem.innerHTML = `
            <div class="before-after-slider">
                <div class="img-before">
                    <img src="${item.before}" alt="Before - ${item.title}" class="before-img" onerror="this.src='assets/images/placeholder.jpg'">
                </div>
                <div class="img-after">
                    <img src="${item.after}" alt="After - ${item.title}" class="after-img" onerror="this.src='assets/images/placeholder.jpg'">
                </div>
                <input type="range" min="0" max="100" value="50" class="slider-handle">
            </div>
            <p class="ba-label">${item.title}</p>
        `;
        
        beforeAfterGallery.appendChild(sliderItem);
    });
    
    // Re-initialize before/after sliders
    setupBeforeAfterSliders();
}

// ============================================
// RENDER BLOG CARDS
// ============================================

function renderBlogCards() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;
    
    blogGrid.innerHTML = '';
    
    const blogItems = galleryData.blog || [];
    
    blogItems.forEach(item => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        
        blogCard.innerHTML = `
            <div class="blog-image">
                <img src="${item.image}" alt="${item.title}" class="blog-img" onerror="this.src='assets/images/placeholder.jpg'">
                <span class="blog-category">${item.category}</span>
            </div>
            <div class="blog-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="${item.link}" class="read-more">Xem Danh Sách →</a>
            </div>
        `;
        
        blogGrid.appendChild(blogCard);
    });
    
    // Re-observe blog cards
    observeBlogCards();
}

// ============================================
// SETUP BEFORE/AFTER SLIDERS
// ============================================

function setupBeforeAfterSliders() {
    const sliderHandles = document.querySelectorAll('.slider-handle');
    
    sliderHandles.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            const afterImage = e.target.parentElement.querySelector('.img-after');
            afterImage.style.width = value + '%';
        });
        
        // Set initial value
        slider.value = 50;
        const afterImage = slider.parentElement.querySelector('.img-after');
        afterImage.style.width = '50%';
    });
}

// ============================================
// SETUP GALLERY FILTERS
// ============================================

function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// OBSERVE BLOG CARDS FOR ANIMATION
// ============================================

function observeBlogCards() {
    const blogCards = document.querySelectorAll('.blog-card');
    const timelineObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const blogObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, timelineObserverOptions);
    
    blogCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        blogObserver.observe(card);
    });
}

// ============================================
// LOAD DATA ON DOCUMENT READY
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    await loadImageData();
});
