document.addEventListener('DOMContentLoaded', () => {
    
// 1. Fetch Header and Footer asynchronously
    Promise.all([
        fetch('/header.html?v=' + new Date().getTime()).then(res => res.text()),
        fetch('/footer.html?v=' + new Date().getTime()).then(res => res.text())
    ])
    .then(([headerData, footerData]) => {
        
        // Inject the fetched HTML into the placeholders
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        if (headerPlaceholder) headerPlaceholder.innerHTML = headerData;
        if (footerPlaceholder) footerPlaceholder.innerHTML = footerData;
        
        // 2. Initialize all interactive elements now that the DOM is fully constructed
        initializeSite();
        
    }).catch(error => console.error('Error loading components:', error));
});

function initializeSite() {
    // 1. DARK MODE LOGIC
    const themeBtn = document.getElementById('theme-btn');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        if(themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme); 
            themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    // 2. MOBILE HAMBURGER MENU
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if(hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburgerBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // 2.5 MOBILE MEGA-MENU ACCORDION
    const servicesDropdownBtn = document.querySelector('.with-dropdown');
    const megaMenu = document.querySelector('.mega-menu');

    if (servicesDropdownBtn && megaMenu) {
        servicesDropdownBtn.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault(); 
                megaMenu.classList.toggle('mobile-open'); 
            }
        }); 
    }

// 3. SMART CONTACT BUTTON (Using ES6 Event Delegation)
    document.body.addEventListener('click', (e) => {
        // This checks if what we clicked is (or is inside) our smart button
        const smartBtn = e.target.closest('.smart-contact-btn');
        
        if (smartBtn) {
            e.preventDefault(); // Immediately stops the button from going to contact.html
            
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                // Instantly opens the phone dialer on mobile devices
                window.location.href = 'tel:+917010658650';
            } else {
                // Opens Gmail in a new tab with pre-filled details for desktop users
                const email = 'caspraveenkumars@gmail.com';
                const subject = encodeURIComponent('Consultation Inquiry - CS HARIHARAN & CO LLP');
                const body = encodeURIComponent('Hello,\n\nI would like to book a consultation to discuss my business requirements.\n\nRegards,');
                
                window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');
            }
        }
    });

    // 4. SCROLL ANIMATION OBSERVER
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // 5. HEADER SCROLL ANIMATION
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled'); 
            } else {
                header.classList.remove('scrolled'); 
            }
        });
    }

    // 6. CAREERS FORM API INTEGRATION
    const form = document.getElementById('career-form');
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            formData.append("_captcha", "false"); 

            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://formsubmit.co/ajax/yashvanthyk.16@gmail.com", {
                    method: "POST",
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Success! Application and resume sent.");
                    form.reset();
                } else {
                    console.error("API Rejected:", data);
                    alert("Error: " + (data.message || "Failed to send."));
                }
            } catch (error) {
                console.error("Network Error:", error);
                alert("Network error. Check your connection.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}