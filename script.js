// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.querySelector('.contact-form');
const header = document.querySelector('.header');
const loader = document.getElementById('loader');
const heroDescription = document.querySelector('.hero-description'); // Element for typewriter effect

// Initialize the application after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeTypewriter(); // Initialize the new typewriter effect
    initializeAnimations(); // Initialize animations for sections like "How It Works"
    initializeFAQ();
});

// Hide loading screen when the page is fully loaded
window.addEventListener('load', function() {
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Navigation functionality (mobile menu and smooth scrolling)
function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // A special check to avoid errors if a link like "#" is clicked
            if (targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll effects for the header
function initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Add 'scrolled' class to header for background change
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction change
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)'; // Hide
        } else {
            header.style.transform = 'translateY(0)'; // Show
        }
        
        lastScrollY = scrollY;
    });
}

// Contact Form functionality to redirect to WhatsApp
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // 1. Replace this with your WhatsApp number
            const whatsappNumber = '966501234567'; 

            // 2. Collect data from the form fields
            const name = document.getElementById('name').value;
            const serviceSelect = document.getElementById('service');
            const service = serviceSelect.options[serviceSelect.selectedIndex].text;
            const message = document.getElementById('message').value;

            // 3. Format the message
            const whatsappMessage = `
طلب خدمة جديد من موقع منصة الثقة:
---------------------------------
*الاسم الكامل:* ${name}
*نوع الخدمة:* ${service}
*تفاصيل المشروع:*
${message}
            `;

            // 4. Create the WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage )}`;

            // 5. Open the URL in a new tab
            window.open(whatsappURL, '_blank');

            showNotification('تم تجهيز رسالتك. قم بإرسالها الآن عبر واتساب.', 'success');
            this.reset();
        });
    }
}

// Typewriter effect for the hero description
function initializeTypewriter() {
    if (heroDescription) {
        const originalText = heroDescription.textContent.trim();
        heroDescription.textContent = ''; // Clear the text initially
        let i = 0;

        function type() {
            if (i < originalText.length) {
                heroDescription.textContent += originalText.charAt(i);
                i++;
                setTimeout(type, 50); // Typing speed
            }
        }
        
        setTimeout(type, 1000); // Start after 1 second
    }
}
// FAQ Accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');

        if (questionButton) {
            questionButton.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Optional: Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // Toggle the current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Animation on scroll with Intersection Observer
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after it's visible
            }
        });
    }, observerOptions);

    // Select all elements you want to animate
    document.querySelectorAll('.step, .service-card, .portfolio-item, .faq-item, .contact-item, .stat-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}


// Notification system to show success/error messages
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '9999',
        transform: 'translateX(120%)',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    });
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}
document.addEventListener('DOMContentLoaded', function() {
    // ... (كل الأكواد الأخرى) ...

    // Automatically update footer year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
