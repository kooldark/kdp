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
        return; // Modal already exists
    }

    const modal = document.createElement('div');
    modal.id = 'galleryModal';
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-image">
                <img id="modalImage" src="" alt="Gallery Image" />
            </div>
            <div class="modal-nav">
                <button id="prevBtn" class="modal-btn">&larr; Previous</button>
                <span id="imageCounter"></span>
                <button id="nextBtn" class="modal-btn">Next &rarr;</button>
            </div>
        </div>
    `;

    // Add styles for modal
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
            background-color: rgba(0, 0, 0, 0.95);
            animation: fadeIn 0.3s ease;
        }

        .gallery-modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90vh;
            background: var(--white);
            border-radius: 8px;
            overflow: hidden;
        }

        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 35px;
            font-weight: bold;
            color: var(--primary-color);
            cursor: pointer;
            z-index: 10000;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            transition: all 0.3s;
        }

        .modal-close:hover {
            background: var(--secondary-color);
            color: var(--white);
        }

        .modal-image {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-height: 75vh;
            background: linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%);
        }

        .modal-image img {
            max-width: 100%;
            max-height: 75vh;
            object-fit: contain;
        }

        .modal-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: var(--light-bg);
            gap: 15px;
        }

        .modal-btn {
            background: var(--secondary-color);
            color: var(--white);
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.3s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .modal-btn:hover {
            background: var(--accent-color);
            transform: scale(1.05);
        }

        #imageCounter {
            font-size: 14px;
            color: var(--text-dark);
            font-weight: 600;
            min-width: 100px;
            text-align: center;
        }

        @media (max-width: 768px) {
            .modal-content {
                max-width: 95%;
                max-height: 95vh;
            }

            .modal-close {
                top: 10px;
                right: 10px;
                font-size: 28px;
            }

            .modal-nav {
                flex-direction: column;
                gap: 10px;
            }

            .modal-btn {
                width: 100%;
                padding: 12px 15px;
            }
        }
    `;
    document.head.appendChild(styles);
    document.body.appendChild(modal);
}

// Initialize gallery modal
createGalleryModal();

// Gallery images data (can be populated from actual images)
let galleryImages = [];

// Collect gallery images
function initializeGalleryImages() {
    const galleryLinks = document.querySelectorAll('.gallery-link, .featured-link');
    galleryLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openGalleryModal(index);
        });
    });
}

let currentImageIndex = 0;

function openGalleryModal(index) {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    
    // Get all gallery items
    const allImages = document.querySelectorAll('.gallery-item, .featured-item');
    galleryImages = Array.from(allImages);
    currentImageIndex = index;
    
    // Update modal image (using placeholder for now, can be replaced with real images)
    const imagePlaceholder = galleryImages[currentImageIndex]?.querySelector('.image-placeholder-small, .image-placeholder-featured');
    if (imagePlaceholder) {
        // For demo: show placeholder background color
        modalImage.style.background = window.getComputedStyle(imagePlaceholder).background;
        modalImage.alt = galleryImages[currentImageIndex]?.querySelector('h3')?.textContent || 'Gallery Image';
    }
    
    updateImageCounter();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
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
    
    currentImageIndex += direction;
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const imagePlaceholder = galleryImages[currentImageIndex]?.querySelector('.image-placeholder-small, .image-placeholder-featured');
    
    if (imagePlaceholder) {
        modalImage.style.background = window.getComputedStyle(imagePlaceholder).background;
    }
    
    updateImageCounter();
}

// Modal controls
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

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

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeGalleryModal();
            if (e.key === 'ArrowLeft') navigateGallery(-1);
            if (e.key === 'ArrowRight') navigateGallery(1);
        });
    }

    initializeGalleryImages();

// ============================================
// LOAD IMAGES FROM DATA.JSON ON PAGE LOAD
// ============================================

// Load image data when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadImageData);
} else {
    loadImageData();
}
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Any initialization code can go here
    console.log('Professional Photography Portfolio loaded successfully');
});
