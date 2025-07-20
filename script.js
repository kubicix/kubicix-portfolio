// Initialize AOS
AOS.init({
  duration: 1000,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100
});

// Modern Hero Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // Typing animation for role text
  const roles = [
    'Backend Developer',
    'Mobile Developer', 
    '.NET Specialist',
    'Flutter Developer',
    'Full-Stack Engineer',
    'Problem Solver'
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const roleElement = document.getElementById('typed-role');
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;
  
  function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      roleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let speed = isDeleting ? deletingSpeed : typingSpeed;
    
    if (!isDeleting && charIndex === currentRole.length) {
      speed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    
    setTimeout(typeRole, speed);
  }
  
  // Start typing animation after a short delay
  setTimeout(typeRole, 1000);
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Button ripple effect
  document.querySelectorAll('.btn-modern').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = this.querySelector('.btn-ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.transform = 'scale(0)';
      
      // Trigger animation
      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(4)';
        ripple.style.opacity = '0';
      });
      
      setTimeout(() => {
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '';
      }, 600);
    });
  });
  
  // Tech stack hover effects with particles
  document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.05)';
      
      // Add particle effect
      for (let i = 0; i < 5; i++) {
        createParticle(this);
      }
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
  function createParticle(element) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.backgroundColor = 'var(--accent-purple)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    
    const rect = element.getBoundingClientRect();
    particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(particle);
    
    // Animate particle
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    const life = 1000;
    
    let opacity = 1;
    const startTime = Date.now();
    
    function animateParticle() {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / life;
      
      if (progress >= 1) {
        document.body.removeChild(particle);
        return;
      }
      
      const x = parseFloat(particle.style.left) + Math.cos(angle) * velocity;
      const y = parseFloat(particle.style.top) + Math.sin(angle) * velocity;
      
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.opacity = 1 - progress;
      
      requestAnimationFrame(animateParticle);
    }
    
    animateParticle();
  }
  
  // Parallax effect for floating shapes
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      document.querySelectorAll('.floating-shape').forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
      });
    });
    
    // Mouse movement parallax
    document.addEventListener('mousemove', function(e) {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      document.querySelectorAll('.floating-shape').forEach((shape, index) => {
        const speed = 0.02 + (index * 0.005);
        const currentTransform = shape.style.transform || '';
        const newTransform = currentTransform.replace(/translate\([^)]*\)/, '') + 
          ` translate(${(x - 50) * speed}px, ${(y - 50) * speed}px)`;
        shape.style.transform = newTransform;
      });
    });
  }
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 1s ease-out';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate on scroll
  document.querySelectorAll('.card, .glass-container').forEach(el => {
    if (!el.closest('#hero')) {
      observer.observe(el);
    }
  });
  
  // Add scroll indicator click handler
  document.querySelector('.scroll-indicator')?.addEventListener('click', function() {
    document.querySelector('#about').scrollIntoView({
      behavior: 'smooth'
    });
  });
  
  // Navigation active state
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Profile image loading animation
  const profileImg = document.querySelector('.profile-image');
  if (profileImg) {
    profileImg.addEventListener('load', function() {
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    });
  }
  
});

// Performance optimization: Debounced scroll handler
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
