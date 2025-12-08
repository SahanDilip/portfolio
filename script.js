// DOM Elements
const sideMenu = document.querySelector('#sideMenu');
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");

// Mobile Menu Functions
function openMenu() {
    sideMenu.style.transform = 'translateX(-16rem)';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeMenu() {
    sideMenu.style.transform = 'translateX(16rem)';
    document.body.style.overflow = ''; // Restore scroll
}

// Enhanced Navigation Scroll Effects
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Navigation background effect
    if (currentScrollY > 50) {
        navBar.classList.add('bg-white/90', 'backdrop-blur-lg', 'shadow-lg', 'dark:bg-gray-900/90');
        navLinks?.classList.remove('bg-white/80', 'shadow-lg', 'dark:border', 'dark:border-white/20', 'dark:bg-black/20');
        navLinks?.classList.add('bg-white/95', 'shadow-xl', 'dark:bg-black/40');
    } else {
        navBar.classList.remove('bg-white/90', 'backdrop-blur-lg', 'shadow-lg', 'dark:bg-gray-900/90');
        navLinks?.classList.add('bg-white/80', 'shadow-lg', 'dark:border', 'dark:border-white/20', 'dark:bg-black/20');
        navLinks?.classList.remove('bg-white/95', 'shadow-xl', 'dark:bg-black/40');
    }
    
    // Hide/show navigation on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navBar.style.transform = 'translateY(-100%)';
    } else {
        navBar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
    
    // Trigger fade-in animations for sections
    triggerFadeInAnimations();
});

// Fade-in animations for sections
function triggerFadeInAnimations() {
    const sections = document.querySelectorAll('.fade-in-section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('visible');
        }
    });
}

// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            closeMenu();
        }
    }
});



//-------------------light and dark theme-------------------

// On page load or when changing themes, best to add inline in `head` to avoid FOUC

// Default to dark mode on first visit unless user explicitly chose light previously.
// This makes "dark" the normal / default theme at launch.
if (localStorage.theme === 'light') {
    document.documentElement.classList.remove('dark');
} else {
    // if localStorage.theme === 'dark' OR not set -> enable dark mode
    document.documentElement.classList.add('dark');
    if (!('theme' in localStorage)) {
        // persist the default choice so subsequent loads remain consistent
        localStorage.theme = 'dark';
    }
}

function toggleTheme(){
    // Toggle dark class and persist the actual resulting state
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
}

// ---------------- Enhanced Project Modals ----------------
function openProject(id) {
    const modal = document.getElementById('modal-' + id);
    if (!modal) return;
    
    // Store scroll position
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    // Show modal with proper display
    modal.classList.remove('hidden');
    modal.style.display = 'block';
    
    // Auto-scroll to top of modal content
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.scrollTop = 0;
    }
    
    // Add opening animation class
    setTimeout(() => {
        modal.classList.add('animate-modal-fade-in');
    }, 10);
}

function closeProject(id) {
    const modal = document.getElementById('modal-' + id);
    if (!modal) return;
    
    // Restore scroll position
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    
    // Hide modal
    modal.classList.add('hidden');
    modal.style.display = 'none';
    modal.classList.remove('animate-modal-fade-in');
}

function closeAllModals() {
    document.querySelectorAll('[id^="modal-"]').forEach(modal => {
        if (!modal.classList.contains('hidden')) {
            const id = modal.id.replace('modal-', '');
            closeProject(id);
        }
    });
}

// Enhanced Event Delegation
document.addEventListener('click', (e) => {
    // Open project modals
    const projectBtn = e.target.closest('[data-project]');
    if (projectBtn) {
        e.preventDefault();
        const id = projectBtn.getAttribute('data-project');
        openProject(id);
        return;
    }

    // Close project modals
    const closeBtn = e.target.closest('[data-close]');
    if (closeBtn) {
        e.preventDefault();
        const id = closeBtn.getAttribute('data-close');
        closeProject(id);
        return;
    }

    // Close when clicking on modal backdrop
    const modalBackdrop = e.target.closest('.modal-backdrop');
    if (modalBackdrop && e.target === modalBackdrop) {
        const id = modalBackdrop.id.replace('modal-', '');
        closeProject(id);
        return;
    }
});

// Enhanced Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// Prevent scroll on modal background
document.addEventListener('touchmove', (e) => {
    const openModal = document.querySelector('[id^="modal-"]:not(.hidden)');
    if (openModal && !e.target.closest('.modal-content')) {
        e.preventDefault();
    }
}, { passive: false });

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial fade-in animations
    triggerFadeInAnimations();
    
    // Add intersection observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered animation delay for child elements
                const children = entry.target.querySelectorAll('.animate-fade-in-up, .animate-slide-in-left');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all fade-in sections
    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
});

// Enhanced smooth scrolling with offset calculation
function smoothScrollTo(target, offset = 80) {
    const targetPosition = target.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = Math.min(Math.abs(distance) / 2, 1000); // Dynamic duration, max 1s
    
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    // Easing function for smooth animation
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    
    requestAnimationFrame(animation);
}