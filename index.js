// ====================================
// Seeds of Hope - Interactive Features
// ====================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // Smooth Scrolling Navigation
    // ====================================
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const nav = document.querySelector('nav');
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-links');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (mobileToggle) {
                        mobileToggle.classList.remove('active');
                    }
                }
            }
        });
    });

    // ====================================
    // Mobile Menu Toggle
    // ====================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    // ====================================
    // Sticky Navigation on Scroll
    // ====================================
    const nav = document.querySelector('nav');
    
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ====================================
    // Scroll Animations (Fade in on scroll)
    // ====================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Observe all sections and cards for animation
    const animatedElements = document.querySelectorAll(
        'section, .child-card, .update-card, .story-card, .tier-card, .need-item'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ====================================
    // Active Navigation Highlighting
    // ====================================
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ====================================
    // Contact Form Handling
    // ====================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            if (!nameField || !emailField || !messageField) {
                alert('Please fill in all required fields.');
                return;
            }
            
            const formData = {
                name: nameField.value,
                email: emailField.value,
                message: messageField.value
            };
            
            // Create mailto link
            const emailLink = `mailto:seedsofhope.kakuma@gmail.com?subject=Message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
            
            // Open email client
            window.location.href = emailLink;
            
            // Show confirmation
            setTimeout(() => {
                alert('Thank you for your message! Your email client will open to send the message.');
            }, 100);
            
            // Reset form
            contactForm.reset();
        });
    }

    // ====================================
    // Donation Button Click Handlers
    // ====================================
    const donateButtons = document.querySelectorAll('.btn-primary');
    
    donateButtons.forEach(button => {
        const buttonText = button.textContent;
        if (buttonText.includes('Support') || buttonText.includes('Sponsor')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Scroll to contact section
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const nav = document.querySelector('nav');
                    const navHeight = nav ? nav.offsetHeight : 0;
                    const targetPosition = contactSection.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Show message
                    setTimeout(() => {
                        alert('To set up a sponsorship, please contact us via email at seedsofhope.kakuma@gmail.com or send a WhatsApp message. We will provide payment details and answer any questions you may have.');
                    }, 500);
                }
            });
        }
    });

    // ====================================
    // Scroll to Top Button
    // ====================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color, #d97706);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
    `;
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // ====================================
    // Card Hover Effects Enhancement
    // ====================================
    const cards = document.querySelectorAll('.child-card, .update-card, .story-card, .tier-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ====================================
    // Read More/Less Toggle for Stories
    // ====================================
    const storyParagraphs = document.querySelectorAll('.story-card p');
    
    storyParagraphs.forEach(paragraph => {
        const textContent = paragraph.textContent || '';
        if (textContent.length > 250) {
            const fullText = textContent;
            const shortText = fullText.substring(0, 250) + '...';
            
            paragraph.textContent = shortText;
            
            const readMoreBtn = document.createElement('button');
            readMoreBtn.textContent = 'Read More';
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.style.cssText = `
                background: none;
                border: none;
                color: var(--primary-color, #d97706);
                cursor: pointer;
                font-weight: 600;
                margin-top: 0.5rem;
                padding: 0.25rem 0;
                text-decoration: underline;
                transition: opacity 0.3s ease;
            `;
            
            paragraph.parentElement.appendChild(readMoreBtn);
            
            readMoreBtn.addEventListener('click', function() {
                const isExpanded = this.textContent === 'Read Less';
                if (isExpanded) {
                    paragraph.textContent = shortText;
                    this.textContent = 'Read More';
                } else {
                    paragraph.textContent = fullText;
                    this.textContent = 'Read Less';
                }
            });

            readMoreBtn.addEventListener('mouseenter', function() {
                this.style.opacity = '0.7';
            });

            readMoreBtn.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
            });
        }
    });

    // ====================================
    // Image Lazy Loading
    // ====================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // ====================================
    // Console Welcome Message
    // ====================================
    console.log('%c🌱 Seeds of Hope 🌱', 'font-size: 20px; color: #d97706; font-weight: bold;');
    console.log('%cSupporting 14 refugee children in Kakuma Refugee Camp, Kenya', 'font-size: 14px; color: #0891b2;');
    console.log('%cTo support this cause, email: seedsofhope.kakuma@gmail.com', 'font-size: 12px; color: #666;');

    // ====================================
    // Keyboard Navigation
    // ====================================
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.querySelector('.nav-links');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                }
            }
        }
    });

});
