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
    // Update document title based on selected language
    var titleEl = document.querySelector('title');
    if (titleEl) {
        var titleText = lang === 'en' ? titleEl.getAttribute('data-en') : titleEl.getAttribute('data-ar');
        if (titleText) {
            titleEl.innerText = titleText;
        }
    }

    localStorage.setItem('lang', lang);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language as early as possible
    var savedLang = localStorage.getItem('lang');
    var defaultLang = 'ar';
    setLanguage(savedLang || defaultLang);
    var langSelectInit = document.getElementById('lang-select');
    if (langSelectInit) {
        langSelectInit.value = savedLang || defaultLang;
    }

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
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation utility classes
    var animatedElements = document.querySelectorAll('.fade-up, .fade-in-scale');
    animatedElements.forEach(function(el) {
        observer.observe(el);
    });

    // Language selector change handling
    var langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', function() {
            var lang = this.value;
            setLanguage(lang);
        });
    }
});
