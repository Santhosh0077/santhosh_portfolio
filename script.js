/**
 * =============================================
 * Santhosh S - Portfolio JavaScript
 * Premium Interactive Features
 * =============================================
 */

// ============ PRELOADER ============
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        // Remove from DOM after animation
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }, 1500);
});

// ============ CUSTOM CURSOR ============
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

// Only enable custom cursor on non-touch devices
if (window.matchMedia('(pointer: fine)').matches) {
    let cursorX = 0, cursorY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
    });

    // Smooth trailing effect for outline
    function animateCursorOutline() {
        outlineX += (cursorX - outlineX) * 0.15;
        outlineY += (cursorY - outlineY) * 0.15;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateCursorOutline);
    }
    animateCursorOutline();

    // Cursor hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .skill-category, .tech-icon');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'rgba(124, 58, 237, 0.6)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'rgba(124, 58, 237, 0.3)';
        });
    });
} else {
    // Hide custom cursor on touch devices
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
}


// ============ TYPING ANIMATION ============
const typedTextElement = document.getElementById('typed-text');
const titles = [
    'Software Developer',
    'Java Developer',
    'Full Stack Developer',
    'Problem Solver'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        // Pause at end of word
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing after preloader
setTimeout(typeEffect, 1800);


// ============ FLOATING PARTICLES ============
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 4 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 20;
        const opacity = Math.random() * 0.3 + 0.05;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        particle.style.opacity = opacity;

        // Randomly assign colors
        const colors = [
            'rgba(124, 58, 237, 0.6)',
            'rgba(6, 182, 212, 0.6)',
            'rgba(16, 185, 129, 0.6)',
            'rgba(236, 72, 153, 0.5)',
            'rgba(245, 158, 11, 0.4)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
    }
}
createParticles();


// ============ NAVBAR ============
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navLinkElements = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile nav on link click
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Active section highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav);


// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// ============ SCROLL REVEAL ANIMATION ============
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
// Trigger on load for elements already visible
window.addEventListener('load', () => {
    setTimeout(revealOnScroll, 1600);
});


// ============ STATS COUNTER ANIMATION ============
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-grid');

    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 60;
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + '+';
                }
            };
            updateCount();
        });
    }
}
window.addEventListener('scroll', animateStats);


// ============ SKILL BAR ANIMATION ============
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;

    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
        skillsAnimated = true;
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 100);
        });
    }
}
window.addEventListener('scroll', animateSkillBars);


// ============ PROJECT MODAL ============
const projectData = {
    fraudDetection: {
        title: 'E-Commerce Fraud Detection System',
        subtitle: 'Machine Learning & Java Application',
        description: `
            <p>Built an e-commerce fraud detection system using Autoencoder and Naive Bayes to identify fraudulent transactions in real-time.</p>
            <h4>Key Features</h4>
            <ul>
                <li>Spring Boot backend for robust server-side processing</li>
                <li>JWT authentication for secure access</li>
                <li>MySQL database integration for efficient data storage</li>
                <li>REST APIs for real-time transaction analysis and review classification</li>
                <li>Machine Learning models (Autoencoder, Naive Bayes) for high-accuracy fraud detection</li>
            </ul>
        `,
        tech: ['Java', 'Spring Boot', 'Machine Learning', 'React', 'MySQL', 'JWT', 'REST API'],
        role: 'Full Stack Java Developer',
        year: '2024'
    },
    expenseTracker: {
        title: 'AI Enhanced Expense Tracker',
        subtitle: 'Java Spring Boot & React Application',
        description: `
            <p>AI-enhanced expense tracker that helps users manage transactions, budgets, and analytics with an integrated chatbot assistant.</p>
            <h4>Key Features</h4>
            <ul>
                <li>Spring Boot backend with React frontend</li>
                <li>JWT authentication for secure user and admin workflows</li>
                <li>MySQL database integration for user data and transactions</li>
                <li>Interactive dashboard for budget and analytics</li>
                <li>AI Chatbot Assistant for instant help and summaries</li>
            </ul>
        `,
        tech: ['Java', 'Spring Boot', 'React', 'MySQL', 'JWT'],
        role: 'Full Stack Java Developer',
        year: '2024'
    },
    iot: {
        title: 'IoT Monitoring & Automation System',
        subtitle: 'Hardware-Software Integrated Smart System',
        description: `
            <p>A comprehensive IoT-based monitoring and automation system that seamlessly integrates 
            hardware components with a modern web application. This project demonstrates the power 
            of combining embedded systems with full-stack web technologies for real-time device 
            control and monitoring.</p>
            <h4>Key Features</h4>
            <ul>
                <li>ESP32 microcontroller for real-time device communication</li>
                <li>Servo motor integration for automated mechanical control</li>
                <li>IR sensor implementation for object detection and smart triggering</li>
                <li>LCD display for real-time device status and sensor values</li>
                <li>React.js frontend with interactive monitoring dashboards</li>
                <li>Node.js backend with REST API for device data processing</li>
                <li>SQLite database for local data storage and management</li>
                <li>Real-time data visualization and control interface</li>
            </ul>
            <h4>Impact</h4>
            <ul>
                <li>Successfully demonstrated real-time IoT monitoring and automation</li>
                <li>Built a functional smart system with hardware-software integration</li>
                <li>Efficient and scalable IoT solution with real-time interaction</li>
                <li>Enhanced understanding of embedded systems and IoT architecture</li>
            </ul>
        `,
        tech: ['ESP32', 'React.js', 'Node.js', 'SQLite', 'Servo Motor', 'IR Sensor', 'LCD Display', 'REST API'],
        role: 'IoT & Full-Stack Developer',
        year: '2024–2025'
    }
};

const modalOverlay = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.project-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectKey = btn.getAttribute('data-project');
        const project = projectData[projectKey];

        if (project) {
            modalBody.innerHTML = `
                <span class="modal-badge">${project.role} • ${project.year}</span>
                <h2 class="modal-title">${project.title}</h2>
                <p class="modal-subtitle">${project.subtitle}</p>
                <div class="modal-description">${project.description}</div>
                <div class="modal-tech">
                    <h4>Technologies Used</h4>
                    <div class="modal-tech-tags">
                        ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
            `;
            modalOverlay.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    });
});

modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});




// ============ CONTACT FORM ============
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Show success feedback (in production, this would send to a server)
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-icon"><i class="fa-solid fa-circle-check"></i></span> Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
    }, 3000);

    // Log to console for development
    console.log('Form submitted:', { name, email, subject, message });
});


// ============ BACK TO TOP ============
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ============ SCROLL INDICATOR HIDE ============
const scrollIndicator = document.getElementById('scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});


// ============ KEYBOARD NAVIGATION ============
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        if (modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }
});


// ============ PARALLAX EFFECT ON HERO ============
window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    if (hero) {
        const scrolled = window.scrollY;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }
    }
});


// ============ TILT EFFECT ON CARDS ============
function addTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .service-card, .stat-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Initialize tilt effect after preloader
setTimeout(addTiltEffect, 2000);


// ============ GRADIENT MOUSE FOLLOW ON HERO ============
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        const glow1 = heroBg.querySelector('.hero-glow-1');
        const glow2 = heroBg.querySelector('.hero-glow-2');

        if (glow1) {
            glow1.style.left = `${x * 0.3}%`;
            glow1.style.top = `${y * 0.3}%`;
        }
        if (glow2) {
            glow2.style.right = `${(100 - x) * 0.3}%`;
            glow2.style.bottom = `${(100 - y) * 0.3}%`;
        }
    });
}


// ============ PERFORMANCE: THROTTLE SCROLL EVENTS ============
let ticking = false;
const allScrollHandlers = [revealOnScroll, animateStats, animateSkillBars, updateActiveNav];

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // All scroll handlers are already registered individually
            // This acts as a safety net
            ticking = false;
        });
        ticking = true;
    }
});


// ============ CONSOLE GREETING ============
console.log(
    '%c👋 Hey there! Welcome to Santhosh S\'s Portfolio',
    'color: #7c3aed; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cBuilt with ❤️ using vanilla HTML, CSS & JavaScript',
    'color: #06b6d4; font-size: 12px;'
);
