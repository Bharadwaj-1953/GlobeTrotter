// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll animation for cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and storyboards
document.querySelectorAll('.about-card, .finding-card, .storyboard-full, .prototype-card, .team-card-main').forEach(card => {
  card.style.opacity = '0';
  observer.observe(card);
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Active nav link highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentSection = '';

  sections.forEach(current => {
    const sectionTop = current.offsetTop;
    const sectionHeight = current.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      currentSection = current.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.style.color = 'var(--primary-color)';
    }
  });
});

// Storyboard image lazy loading
const storyboardImages = document.querySelectorAll('.storyboard-image');
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.src;
        img.style.opacity = '1';
        observer.unobserve(img);
      }
    });
  });

  storyboardImages.forEach(img => {
    img.style.opacity = '0';
    imageObserver.observe(img);
  });
}

// Smooth hover effects on prototype cards
const prototypeCards = document.querySelectorAll('.prototype-card');
prototypeCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Add parallax effect to hero section
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (heroSection) {
    const scrollPosition = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
      const speed = 0.5 + (index * 0.1);
      orb.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    // Menu closes automatically due to smooth scroll
  });
});

// Prevent navbar from hiding on scroll for better UX
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  lastScrollTop = window.pageYOffset;
});

// Add hover effects to finding cards
const findingCards = document.querySelectorAll('.finding-card');
findingCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.boxShadow = 'var(--shadow-lg)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.boxShadow = 'var(--shadow-md)';
  });
});

// Add hover effects to about cards
const aboutCards = document.querySelectorAll('.about-card');
aboutCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
    this.style.boxShadow = 'var(--shadow-lg)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'var(--shadow-md)';
  });
});

// Add hover effects to storyboard cards
const storyboardCards = document.querySelectorAll('.storyboard-full');
storyboardCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
    this.style.boxShadow = 'var(--shadow-lg)';
    const img = this.querySelector('.storyboard-image');
    if (img) {
      img.style.transform = 'scale(1.02)';
    }
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'var(--shadow-md)';
    const img = this.querySelector('.storyboard-image');
    if (img) {
      img.style.transform = 'scale(1)';
    }
  });
});

// Enhanced scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Detect user preference for reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.documentElement.style.scrollBehavior = 'auto';
  // Remove animations for users who prefer reduced motion
  style.textContent += `
    * {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }
  `;
}

// Console message for fun
console.log('%cWelcome to GlobeTrotter! 🌍✈️', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cExplore the platform and help us make travel planning easier for students everywhere.', 'color: #6b7280; font-size: 14px;');
