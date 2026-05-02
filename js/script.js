// ============================================
// NAVIGATION MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================
// NAVIGATION ACTIVE STATE ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
// EMAIL CONFIGURATION (EmailJS)
// ============================================

// Initialize EmailJS
// Get your Public Key from emailjs.com after signup
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual Public Key

const EMAILJS_CONFIG = {
    serviceID: 'YOUR_SERVICE_ID',      // Gmail or other email service
    templateID: 'YOUR_TEMPLATE_ID',     // Email template ID
    recipientEmail: 'tr.nhutuan@gmail.com'
};

// ============================================
// CONTACT FORM SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Basic validation
        if (!formData.name || !formData.service) {
            showNotification('Vui lòng điền đủ các trường bắt buộc', 'error');
            return;
        }
        
        // Show loading notification
        showNotification('Đang gửi yêu cầu...', 'info');
        
        try {
            // Send email via EmailJS
            await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                {
                    to_email: EMAILJS_CONFIG.recipientEmail,
                    from_name: formData.name,
                    from_phone: formData.phone,
                    from_company: formData.company || 'Không cập nhật',
                    service: formData.service,
                    message: formData.message || 'Không có lời nhắn'
                }
            );
            
            // Show success message
            showNotification('✅ Cảm ơn! Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ với bạn trong 2 tiếng làm việc.', 'success');
            
            // Reset form
            this.reset();
            
            console.log('Email sent successfully:', formData);
        } catch (error) {
            console.error('EmailJS error:', error);
            showNotification('❌ Lỗi gửi yêu cầu. Vui lòng thử lại hoặc gọi trực tiếp: 0379 031 662', 'error');
        }
    });
}


// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Check if mobile (window width < 768px)
    const isMobile = window.innerWidth < 768;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        ${isMobile ? 'bottom: 15px; right: 15px; left: 15px;' : 'bottom: 30px; right: 30px;'}
        background: ${type === 'success' ? '#4caf50' : type === 'info' ? '#2196F3' : '#f44336'};
        color: white;
        padding: ${isMobile ? '14px 16px' : '16px 24px'};
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        max-width: ${isMobile ? 'none' : '400px'};
        font-size: ${isMobile ? '13px' : '14px'};
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ============================================
// ADD ANIMATIONS KEYFRAMES
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// LAZY LOADING FOR IMAGES (FUTURE USE)
// ============================================

// You can implement lazy loading here when you add actual images
// For example, using Intersection Observer API

// ============================================
// ADD SCROLL ANIMATION FOR ELEMENTS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.gallery-item, .service-card, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease-out';
    observer.observe(element);
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow to navbar when scrolling
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// FORM INPUT VALIDATION
// ============================================

// ============================================
// PHONE INPUT FORMATTING
// ============================================

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + ' ' + value.slice(3);
            } else if (value.length <= 9) {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
            } else {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
            }
        }
        
        e.target.value = value;
    });
}

// ============================================
// BEFORE/AFTER SLIDER
// ============================================

const sliderHandles = document.querySelectorAll('.slider-handle');

sliderHandles.forEach(slider => {
    const updateSlider = (e) => {
        const value = e.target ? e.target.value : e.value;
        const afterImage = e.target?.parentElement?.querySelector('.img-after') || slider.parentElement.querySelector('.img-after');
        afterImage.style.width = value + '%';
    };

    slider.addEventListener('input', updateSlider);
    slider.addEventListener('touch', updateSlider);
    
    // Set initial value
    slider.value = 50;
    const afterImage = slider.parentElement.querySelector('.img-after');
    afterImage.style.width = '50%';

    // Add touch support for better mobile interaction
    slider.addEventListener('touchstart', (e) => {
        slider.classList.add('active');
    });

    slider.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const rect = slider.getBoundingClientRect();
        const percent = Math.min(Math.max(0, (touch.clientX - rect.left) / rect.width), 1) * 100;
        slider.value = percent;
        updateSlider({ target: slider });
    });

    slider.addEventListener('touchend', (e) => {
        slider.classList.remove('active');
    });
});

// ============================================
// GALLERY FILTER FUNCTIONALITY
// ============================================

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

// ============================================
// PRICING TABLE INTERACTIONS
// ============================================

const pricingButtons = document.querySelectorAll('.btn-table');

pricingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceName = button.closest('tr').querySelector('.service-name').textContent.trim();
        showNotification(`Bạn đã chọn: ${serviceName}. Vui lòng điền form liên hệ để xác nhận đơn hàng.`, 'success');
        
        // Scroll to contact form
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// TIMELINE SCROLL ANIMATION
// ============================================

const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, timelineObserverOptions);

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    timelineObserver.observe(item);
});

// ============================================
// BLOG CARD INTERACTIONS
// ============================================

const blogCards = document.querySelectorAll('.blog-card');
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

// ============================================
// GALLERY MODAL/LIGHTBOX
// ============================================

// Create modal HTML for gallery
function createGalleryModal() {
    if (document.getElementById('galleryModal')) {
        return;
    }

    const modal = document.createElement('div');
    modal.id = 'galleryModal';
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="lightbox-container">
            <button class="lightbox-close" aria-label="Close">&times;</button>
            
            <div class="lightbox-content">
                <div class="lightbox-image-wrapper">
                    <img id="modalImage" class="lightbox-image" src="" alt="Gallery Image" loading="lazy" />
                    <div class="lightbox-loader"></div>
                </div>
            </div>

            <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="lightbox-nav lightbox-next" aria-label="Next image">
                <i class="fas fa-chevron-right"></i>
            </button>

            <div class="lightbox-info">
                <div class="lightbox-counter">
                    <span id="imageCounter"></span>
                </div>
                <div class="lightbox-description">
                    <span id="imageTitle"></span>
                </div>
            </div>

            <div class="lightbox-thumbnails" id="lightboxThumbnails"></div>
        </div>
    `;

    const styles = document.createElement('style');
    styles.textContent = `
        .gallery-modal {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            opacity: 0;
            transition: opacity 0.3s ease;
            overflow: hidden;
        }

        .gallery-modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
        }

        .lightbox-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            animation: zoomIn 0.4s cubic-bezier(0.23, 1, 0.320, 1);
        }

        @keyframes zoomIn {
            from {
                transform: scale(0.95);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }

        @keyframes zoomOut {
            from {
                transform: scale(1);
                opacity: 1;
            }
            to {
                transform: scale(0.95);
                opacity: 0;
            }
        }

        .lightbox-content {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 95vw;
            max-height: 90vh;
            margin: 0 auto;
            touch-action: none;
            user-select: none;
        }

        .lightbox-image-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .lightbox-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            animation: slideIn 0.5s cubic-bezier(0.23, 1, 0.320, 1);
            will-change: transform;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: scale(0.98);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        .lightbox-loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.2);
            border-top-color: var(--secondary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            opacity: 0;
            pointer-events: none;
        }

        .lightbox-image-wrapper.loading .lightbox-loader {
            opacity: 1;
        }

        @keyframes spin {
            to {
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }

        .lightbox-close {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            font-size: 32px;
            cursor: pointer;
            border-radius: 50%;
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
            backdrop-filter: blur(5px);
            line-height: 1;
        }

        .lightbox-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }

        .lightbox-close:active {
            transform: rotate(90deg) scale(0.95);
        }

        .lightbox-nav {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            border-radius: 50%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
            backdrop-filter: blur(5px);
        }

        .lightbox-nav:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-50%) scale(1.1);
        }

        .lightbox-nav:active {
            transform: translateY(-50%) scale(0.95);
        }

        .lightbox-prev {
            left: 20px;
        }

        .lightbox-next {
            right: 20px;
        }

        .lightbox-info {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            color: white;
            z-index: 10000;
            backdrop-filter: blur(5px);
            background: rgba(0, 0, 0, 0.3);
            padding: 12px 20px;
            border-radius: 25px;
            max-width: 90%;
        }

        .lightbox-counter {
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.5px;
            color: rgba(255, 255, 255, 0.8);
        }

        .lightbox-description {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 4px;
        }

        .lightbox-thumbnails {
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            justify-content: center;
            flex-wrap: wrap;
            max-width: 90%;
            z-index: 10000;
            backdrop-filter: blur(5px);
            padding: 10px 15px;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.3);
            max-height: 100px;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }

        .lightbox-thumbnails::-webkit-scrollbar {
            width: 6px;
        }

        .lightbox-thumbnails::-webkit-scrollbar-track {
            background: transparent;
        }

        .lightbox-thumbnails::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 3px;
        }

        .thumbnail-item {
            width: 70px;
            height: 70px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            cursor: pointer;
            overflow: hidden;
            flex-shrink: 0;
            transition: all 0.2s;
            opacity: 0.7;
        }

        .thumbnail-item:hover,
        .thumbnail-item.active {
            opacity: 1;
            border-color: var(--secondary-color);
            transform: scale(1.05);
        }

        .thumbnail-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .lightbox-nav {
                width: 45px;
                height: 45px;
                font-size: 16px;
            }

            .lightbox-prev {
                left: 10px;
            }

            .lightbox-next {
                right: 10px;
            }

            .lightbox-close {
                width: 45px;
                height: 45px;
                font-size: 28px;
                top: 10px;
                right: 10px;
            }

            .lightbox-info {
                bottom: 10px;
                padding: 10px 16px;
                font-size: 12px;
            }

            .lightbox-thumbnails {
                display: none;
            }

            .lightbox-content {
                max-height: 85vh;
            }
        }

        @media (max-width: 480px) {
            .lightbox-nav {
                display: none;
            }

            .lightbox-info {
                background: rgba(0, 0, 0, 0.5);
                padding: 8px 12px;
            }
        }
    `;
    document.head.appendChild(styles);
    document.body.appendChild(modal);
}

// Initialize gallery modal
createGalleryModal();

// Gallery images data
let galleryImages = [];
let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

// Collect gallery images with actual image data
function initializeGalleryImages() {
    const galleryLinks = document.querySelectorAll('.gallery-link, .featured-link');
    
    galleryLinks.forEach((link) => {
        // Remove any existing event listeners by cloning and replacing
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Set href to prevent navigation
        newLink.setAttribute('href', 'javascript:void(0);');
        newLink.style.cursor = 'pointer';
        
        // Add event listener
        newLink.addEventListener('click', handleGalleryClick);
    });
}

function handleGalleryClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Get the closest gallery/featured item
    const link = e.currentTarget;
    const galleryItem = link.closest('.gallery-item, .featured-item');
    
    if (galleryItem) {
        const index = Array.from(document.querySelectorAll('.gallery-item, .featured-item')).indexOf(galleryItem);
        openGalleryModal(index);
    }
    
    return false;
}

function getImageSrcFromItem(item) {
    const img = item?.querySelector('img');
    return img?.src || '';
}

function getImageTitleFromItem(item) {
    const title = item?.querySelector('h3');
    return title?.textContent || '';
}

function openGalleryModal(index) {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const imageWrapper = document.querySelector('.lightbox-image-wrapper');
    
    // Get all gallery items
    const allItems = document.querySelectorAll('.gallery-item, .featured-item');
    galleryImages = Array.from(allItems);
    currentImageIndex = Math.max(0, Math.min(index, galleryImages.length - 1));
    
    // Load and display image
    loadImage(currentImageIndex);
    
    // Generate thumbnails
    generateThumbnails();
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function loadImage(index) {
    if (index < 0 || index >= galleryImages.length) return;
    
    const item = galleryImages[index];
    const imgSrc = getImageSrcFromItem(item);
    const title = getImageTitleFromItem(item);
    const modalImage = document.getElementById('modalImage');
    const imageWrapper = document.querySelector('.lightbox-image-wrapper');
    const imageTitle = document.getElementById('imageTitle');
    
    currentImageIndex = index;
    updateImageCounter();
    
    if (imageTitle) {
        imageTitle.textContent = title;
    }
    
    // Show loader
    imageWrapper?.classList.add('loading');
    
    // Preload image
    const img = new Image();
    img.onload = () => {
        modalImage.src = imgSrc;
        imageWrapper?.classList.remove('loading');
    };
    img.onerror = () => {
        imageWrapper?.classList.remove('loading');
        console.warn('Failed to load image:', imgSrc);
    };
    img.src = imgSrc;
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateImageCounter() {
    const counter = document.getElementById('imageCounter');
    counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

function navigateGallery(direction) {
    if (galleryImages.length === 0) return;
    
    let newIndex = currentImageIndex + direction;
    if (newIndex >= galleryImages.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = galleryImages.length - 1;
    }
    
    loadImage(newIndex);
}

function generateThumbnails() {
    const thumbnailsContainer = document.getElementById('lightboxThumbnails');
    if (!thumbnailsContainer) return;
    
    thumbnailsContainer.innerHTML = '';
    
    galleryImages.forEach((item, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail-item';
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        }
        
        const img = item.querySelector('img');
        if (img) {
            const thumbImg = document.createElement('img');
            thumbImg.src = img.src;
            thumbImg.alt = `Thumbnail ${index + 1}`;
            thumbnail.appendChild(thumbImg);
            
            thumbnail.addEventListener('click', () => {
                loadImage(index);
                // Update active thumbnail
                document.querySelectorAll('.thumbnail-item').forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        }
        
        thumbnailsContainer.appendChild(thumbnail);
    });
}

// Modal controls with touch/swipe support
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const imageWrapper = document.querySelector('.lightbox-image-wrapper');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeGalleryModal);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateGallery(-1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateGallery(1));
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });

        // Touch support for swipe gestures
        if (imageWrapper) {
            imageWrapper.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);

            imageWrapper.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeGalleryModal();
            if (e.key === 'ArrowLeft') navigateGallery(-1);
            if (e.key === 'ArrowRight') navigateGallery(1);
        });
    }

    initializeGalleryImages();

    // Load image data when DOM is ready
    loadImageData();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - show next image
            navigateGallery(1);
        } else {
            // Swiped right - show previous image
            navigateGallery(-1);
        }
    }
}

// ============================================
// LOAD IMAGE DATA
// ============================================

function loadImageData() {
    // This function can be used to load images from data.json
    // For now, it's a placeholder for future enhancement
    // Images are loaded dynamically from the DOM
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Any initialization code can go here
    console.log('Professional Photography Portfolio loaded successfully');
});
