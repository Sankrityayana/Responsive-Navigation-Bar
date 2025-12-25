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
if (searchToggle) {
    searchToggle.addEventListener('click', () => {
        navSearch.classList.toggle('active');
        if (navSearch.classList.contains('active')) {
            searchInput.focus();
        }
    });
}

// Mobile dropdown functionality
dropdownToggles.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    toggle.addEventListener('click', (e) => {
        // Only prevent default and toggle on mobile
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
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navSearch.classList.remove('active');
    }
});

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

// Touch-friendly hover effects on mobile
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

console.log('🚀 Responsive Navigation Bar loaded!');
