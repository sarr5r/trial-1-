// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-menu a').forEach(navLink => {
            navLink.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Pricing Calculator
    const calculateBtn = document.getElementById('calculate-btn');
    const priceResult = document.getElementById('price-result');
    
    if (calculateBtn && priceResult) {
        calculateBtn.addEventListener('click', function() {
            calculatePrice();
        });
    }
    
    function calculatePrice() {
        const storageType = document.getElementById('storage-type').value;
        const storageDuration = document.getElementById('storage-duration').value;
        
        let basePrice = 0;
        
        // Set base price based on storage type
        switch(storageType) {
            case 'small':
                basePrice = 8;
                break;
            case 'medium':
                basePrice = 12;
                break;
            case 'large':
                basePrice = 16;
                break;
            case 'vehicle':
                basePrice = 20;
                break;
            default:
                basePrice = 10;
        }
        
        // Apply multiplier based on duration
        let multiplier = 1;
        let unit = '/day';
        
        switch(storageDuration) {
            case 'weekly':
                multiplier = 6; // One day free for weekly
                unit = '/week';
                break;
            case 'monthly':
                multiplier = 20; // Better rate for monthly
                unit = '/month';
                break;
            default:
                multiplier = 1;
                unit = '/day';
        }
        
        const finalPrice = basePrice * multiplier;
        
        // Animate the price change
        animateValue(priceResult, 0, finalPrice, 500, unit);
    }
    
    function animateValue(element, start, end, duration, unit) {
        let startTimestamp = null;
        
        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = `$${value}${unit}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    if (testimonialSlides.length > 0 && dots.length > 0) {
        // Function to show a specific slide
        function showSlide(index) {
            testimonialSlides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            testimonialSlides[index].style.display = 'block';
            dots[index].classList.add('active');
        }
        
        // Initial display
        showSlide(currentSlide);
        
        // Auto-advance slides
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
        
        // Click on dots to change slides
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }
    
    // Form submission handling
    const storageForm = document.getElementById('storageForm');
    
    if (storageForm) {
        storageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const storageNeeds = document.getElementById('storage-needs').value;
            
            // Simple validation
            if (!name || !email || !storageNeeds) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Mock form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                storageForm.reset();
                
                // Show success message
                alert('Thanks for your message! We\'ll get back to you soon.');
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }, 1500);
        });
    }
    
    // Activate nav links based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Initialize the active nav link on page load
    setActiveNavLink();
});

