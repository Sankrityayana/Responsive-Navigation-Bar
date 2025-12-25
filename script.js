// Get elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const searchToggle = document.getElementById('searchToggle');
const navSearch = document.getElementById('navSearch');
const searchInput = document.getElementById('searchInput');
const navLinks = document.querySelectorAll('.nav-link');
const dropdownToggles = document.querySelectorAll('.has-dropdown');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Search toggle for mobile
searchToggle.addEventListener('click', () => {
    navSearch.classList.toggle('active');
    if (navSearch.classList.contains('active')) {
        searchInput.focus();
    }
});

// Mobile dropdown functionality
dropdownToggles.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    toggle.addEventListener('click', (e) => {
        // Only prevent default on mobile
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdownToggles.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });
        }
    });
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close if it's a dropdown toggle
        if (!link.classList.contains('dropdown-toggle')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navSearch.classList.remove('active');
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Sticky navbar on scroll
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for shadow effect
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navSearch.classList.remove('active');
    }
});

// Search functionality
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
    performSearch();
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        console.log(`Searching for: ${searchTerm}`);
        
        // Highlight sections that match the search term
        const sections = document.querySelectorAll('.content-section');
        let found = false;
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(searchTerm.toLowerCase())) {
                section.style.background = '#fff9e6';
                section.style.border = '2px solid #f39c12';
                found = true;
                
                // Scroll to first match
                if (!section.classList.contains('highlighted')) {
                    section.classList.add('highlighted');
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    section.style.background = '';
                    section.style.border = '';
                    section.classList.remove('highlighted');
                }, 3000);
            }
        });
        
        if (!found) {
            alert(`No results found for "${searchTerm}"`);
        }
        
        searchInput.value = '';
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just '#'
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('.content-section, .hero-section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

window.addEventListener('scroll', updateActiveLink);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press '/' to focus search
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        
        // Show search on mobile if hidden
        if (window.innerWidth <= 768) {
            navSearch.classList.add('active');
        }
        
        searchInput.focus();
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navSearch.classList.remove('active');
        searchInput.blur();
    }
});

// Dropdown menu accessibility
dropdownToggles.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    // Keyboard navigation
    toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Window resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navSearch.classList.remove('active');
            dropdownToggles.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }, 250);
});

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-item, .service-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Log navigation info
console.log('🚀 Responsive Navigation Bar loaded successfully!');
console.log('📱 Features: Mobile menu, Search, Dropdowns, Smooth scroll');
console.log('⌨️  Keyboard shortcuts: "/" for search, "Escape" to close menu');

// Track menu interactions (for analytics)
let menuInteractions = 0;

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuInteractions++;
        console.log(`Menu interactions: ${menuInteractions}`);
    });
});

// Service Worker registration (optional - for PWA)
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(registration => console.log('SW registered'))
    //         .catch(err => console.log('SW registration failed'));
    // });
}

// Add touch-friendly hover effects on mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.nav-link, .cta-btn, .dropdown-item').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Prevent dropdown from closing when clicking inside (desktop)
dropdownToggles.forEach(dropdown => {
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (menu) {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});

// Auto-hide navbar on scroll down (optional feature)
// Uncomment to enable
/*
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);
*/
