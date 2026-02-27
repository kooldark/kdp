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

// ============================================
// NEWSLETTER FORM HANDLING
// ============================================

const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification('Cảm ơn bạn đã đăng ký nhận tin tức!', 'success');
            this.reset();
        }
    });
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 16px 24px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
        font-size: 14px;
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
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Any initialization code can go here
    console.log('KD PROFILE Website loaded successfully');
});
