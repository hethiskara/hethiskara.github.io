// Modern Portfolio JavaScript - 2024
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initScrollAnimations();
        this.initTypingAnimation();
        this.initNavigation();
        this.initSmoothScrolling();
        this.initParallaxEffects();
        this.initLoadingScreen();
    }

    // Event Listeners
    setupEventListeners() {
        // Mobile menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', this.handleNavbarScroll.bind(this));
        
        // Active navigation highlighting
        window.addEventListener('scroll', this.updateActiveNavLink.bind(this));
    }

    // Navigation scroll effect - removed color change
    handleNavbarScroll() {
        // Keep header consistent - no color changes on scroll
    }

    // Update active navigation link
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scrolling
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Typing animation
    initTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = [
            'Software Engineer',
            'AI Specialist',
            'Full-Stack Developer',
            'Machine Learning Engineer',
            'Tech Innovator'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    // Scroll animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll', 'animated');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.hero-content, .about-content, .timeline-item, .project-card, .skill-category, .contact-content'
        );
        
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Parallax effects
    initParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-icon');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
  });
});
    }

    // Loading screen
    initLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading';
        loadingScreen.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loadingScreen);

        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1000);
        });
    }

    // Navigation initialization
    initNavigation() {
        // Add scroll spy functionality
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const scrollSpy = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', scrollSpy);
    }
}

// Initialize the portfolio app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Additional utility functions
const utils = {
    // Smooth reveal animation for elements
    revealOnScroll: () => {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    },

    // Counter animation for stats
    animateCounters: () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    },

    // Walking boy animation for experience timeline
    initWalkingBoy: () => {
        const walkingBoy = document.getElementById('walkingBoy');
        const expPoints = document.querySelectorAll('.exp-point');
        
        if (!walkingBoy || !expPoints.length) return;
        
        let currentPosition = 0;
        const totalPositions = expPoints.length - 1;
        
        // Auto-walk animation
        const autoWalk = () => {
            if (currentPosition < totalPositions) {
                currentPosition++;
            } else {
                currentPosition = 0;
            }
            
            const percentage = (currentPosition / totalPositions) * 100;
            walkingBoy.style.left = `${percentage}%`;
            
            // Highlight current experience
            expPoints.forEach((point, index) => {
                if (index === currentPosition) {
                    point.classList.add('active');
                } else {
                    point.classList.remove('active');
                }
            });
        };
        
        // Start auto-walk
        setInterval(autoWalk, 3000);
        
        // Click to move manually
        expPoints.forEach((point, index) => {
            point.addEventListener('click', () => {
                currentPosition = index;
                const percentage = (currentPosition / totalPositions) * 100;
                walkingBoy.style.left = `${percentage}%`;
                
                expPoints.forEach((p, i) => {
                    if (i === currentPosition) {
                        p.classList.add('active');
                    } else {
                        p.classList.remove('active');
                    }
                });
            });
        });
    }
};

// Initialize additional effects
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        '.hero-content, .about-content, .timeline-item, .project-card, .skill-category'
    );
    
    animateElements.forEach(el => {
        el.classList.add('reveal');
    });

    // Initialize counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                utils.animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Initialize walking boy animation
    utils.initWalkingBoy();

    // Add scroll reveal effect
    window.addEventListener('scroll', utils.revealOnScroll);
});

// Performance optimization
window.addEventListener('load', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});
