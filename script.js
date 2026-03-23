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

// Observe all cards
document.querySelectorAll('.about-card, .finding-card, .storyboard-vertical-item, .prototype-card, .team-card-main').forEach(card => {
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

  sections.forEach(current => {
    const sectionTop = current.offsetTop;
    const sectionHeight = current.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      navLinks.forEach(link => {
        link.style.color = '';
      });
      const activeLink = document.querySelector(`.nav-link[href="#${current.getAttribute('id')}"]`);
      if (activeLink) {
        activeLink.style.color = 'var(--primary-color)';
      }
    }
  });
});
