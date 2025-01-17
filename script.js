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

window.onload = function() {
    var savedLang = localStorage.getItem('lang');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        setLanguage('en'); // Default to English
    }
    // Initialize language selector
    var langSelect = document.getElementById('lang-select');
    langSelect.value = savedLang || 'en';
};

document.getElementById('lang-select').addEventListener('change', function() {
    var lang = this.value;
    setLanguage(lang);
});
