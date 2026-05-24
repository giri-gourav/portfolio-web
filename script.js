document.addEventListener('DOMContentLoaded', () => {
  // --- Scroll Animations (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, we don't need to observe it anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // triggers slightly before element is fully in viewport
  });

  revealElements.forEach(element => {
    revealOnScroll.observe(element);
  });

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  
  const handleNavbarScroll = () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(0, 0, 0, 0.85)';
      navbar.style.borderBottomColor = 'rgba(130, 255, 28, 0.1)';
    } else {
      navbar.style.background = 'rgba(0, 0, 0, 0.7)';
      navbar.style.borderBottomColor = 'var(--border-dark)';
    }
  };

  window.addEventListener('scroll', handleNavbarScroll);
  // Run once on load to set correct state
  handleNavbarScroll();

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburger && mobileNav) {
    const toggleMenu = () => {
      mobileNav.classList.toggle('open');
      
      // Animate hamburger lines
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (mobileNav.classList.contains('open')) {
        lines[0].style.transform = 'translateY(7px) rotate(45deg)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
      }
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileNav.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }

  // --- Contact Form Submission Handling ---
  const contactForm = document.getElementById('portfolioContactForm');
  const formSuccess = document.getElementById('formSuccessMessage');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic front-end validation check
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');
      const submitBtn = contactForm.querySelector('.form-submit-btn');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Please fill out all required fields.');
        return;
      }

      // Change button state to loading
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';
      submitBtn.style.opacity = '0.7';
      submitBtn.style.pointerEvents = 'none';

      // Simulate API request delay (1.5 seconds)
      setTimeout(() => {
        // Hide the form fields
        contactForm.style.display = 'none';
        
        // Show success overlay
        formSuccess.style.display = 'flex';
        formSuccess.style.animation = 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        
        // Scroll to top of form section smoothly
        const formContainer = contactForm.parentElement;
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1500);
    });
  }
});
