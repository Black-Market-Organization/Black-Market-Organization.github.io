function setLanguage(lang) {
    var elements = document.querySelectorAll('[data-en], [data-ar]');
    elements.forEach(function(element) {
        if (lang === 'en') {
            element.innerText = element.getAttribute('data-en');
        } else if (lang === 'ar') {
            element.innerText = element.getAttribute('data-ar');
        }
    });
    if (lang === 'ar') {
        document.body.classList.add('arabic');
    } else {
        document.body.classList.remove('arabic');
    }
    localStorage.setItem('lang', lang);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for all anchor links
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    var headerOffset = 80;
                    var elementPosition = target.getBoundingClientRect().top;
                    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    var nav = document.querySelector('nav');
                    var menuToggle = document.querySelector('.menu-toggle');
                    if (nav && nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // Mobile menu toggle
    var menuToggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            var isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Change icon
            var icon = menuToggle.querySelector('i');
            if (icon) {
                if (isExpanded) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                var icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Scroll animations using Intersection Observer
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animation
    var sections = document.querySelectorAll('.features, .benefits, .download, .contact');
    sections.forEach(function(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});

window.onload = function() {
    var savedLang = localStorage.getItem('lang');
    var defaultLang = 'ar';
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        setLanguage(defaultLang); // Default to Arabic
    }
    // Initialize language selector
    var langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = savedLang || defaultLang;
    }
};

var langSelect = document.getElementById('lang-select');
if (langSelect) {
    langSelect.addEventListener('change', function() {
        var lang = this.value;
        setLanguage(lang);
    });
}
