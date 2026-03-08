/**
 * Portfolio JavaScript for Saurav Parajuli
 * Handles interactions, animations, and scroll effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Smooth Scrolling for Navigation & CTA
    // ==========================================
    
    // Select all links that have an href starting with #
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate offset to account for sticky header
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==========================================
    // 2. Robot / Bot Animation (Bowing Effect)
    // ==========================================
    
    const robotContainer = document.querySelector('.robot-container');
    const robotAvatar = document.querySelector('.robot-avatar');

    if (robotContainer && robotAvatar) {
        // Add a class to trigger CSS animation
        robotContainer.classList.add('animate-bow');

        // Optional: Add a subtle floating effect via JS if CSS isn't enough
        // This creates a gentle bobbing motion
        let floatY = 0;
        let floatDirection = 1;
        
        function floatRobot() {
            if (window.innerWidth > 768) { // Only animate on desktop to save battery
                floatY += 0.02 * floatDirection;
                if (floatY > 5 || floatY < -5) floatDirection *= -1;
                robotAvatar.style.transform = `translateY(${floatY}px)`;
            }
            requestAnimationFrame(floatRobot);
        }
        
        // Start floating animation
        requestAnimationFrame(floatRobot);
    }

    // ==========================================
    // 3. Mobile Navigation Toggle
    // ==========================================
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon between hamburger and close (optional visual change)
            const icon = menuToggle.querySelector('span');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.textContent = '✕'; // Close icon
                } else {
                    icon.textContent = '☰'; // Hamburger icon
                }
            }
        });

        // Close menu when a link is clicked
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (menuToggle.querySelector('span')) {
                    menuToggle.querySelector('span').textContent = '☰';
                }
            });
        });
    }

    // ==========================================
    // 4. Section Animations (Intersection Observer)
    // ==========================================
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger CSS transitions
                entry.target.classList.add('visible');
                
                // Stop observing once visible (optional, remove if you want it to re-animate)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target all sections that should animate
    const animatedSections = document.querySelectorAll('#about, #skills, #projects, #creative, #contact');
    
    animatedSections.forEach(section => {
        // Add initial hidden state class
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // ==========================================
    // 5. Contact Form Handling
    // ==========================================
    
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate network delay
            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent successfully.`);
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ==========================================
    // 6. Dynamic Header Shadow on Scroll
    // ==========================================
    
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});