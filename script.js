/**
 * =====================================================
 * Manpower Supply  
 * script.js — Interactions, Animations & Form Validation
 * =====================================================
 */

'use strict';

/* ===================================================
   1. NAVBAR — Scroll Behavior & Active Link
   =================================================== */
const navbar = document.getElementById('mainNavbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const navToggler = document.getElementById('navToggler');

/**
 * Update navbar shadow & size on scroll
 */
function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/**
 * Highlight the active nav link based on scroll position
 */
function updateActiveNavLink() {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* Close mobile menu on nav-link click */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.getElementById('navbarContent');
    if (collapse && collapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});

/* Throttled scroll event */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleNavbarScroll();
      updateActiveNavLink();
      ticking = false;
    });
    ticking = true;
  }
});

// Initial calls
handleNavbarScroll();
updateActiveNavLink();


/* ===================================================
   2. SMOOTH SCROLL — Override anchor behavior
   =================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || !href) return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ===================================================
   3. INTERSECTION OBSERVER — Scroll Reveal Animations
   =================================================== */
const revealElements = document.querySelectorAll(
  '.reveal-fade, .reveal-slide-up, .reveal-scale'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, stop observing for performance
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  }
);

revealElements.forEach(el => revealObserver.observe(el));


/* ===================================================
   4. CHART BARS ANIMATION — Approach Section
   =================================================== */
const chartBars = document.querySelectorAll('.achart-fill');

const chartObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        chartObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

chartBars.forEach(bar => chartObserver.observe(bar));


/* ===================================================
   5. BACK TO TOP BUTTON
   =================================================== */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}, { passive: true });

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ===================================================
   6. DYNAMIC FOOTER YEAR
   =================================================== */
const copyYear = document.getElementById('copyYear');
if (copyYear) {
  copyYear.textContent = new Date().getFullYear();
}


/* ===================================================
   7. CONTACT FORM VALIDATION & SUBMISSION
   =================================================== */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccessMsg = document.getElementById('formSuccessMsg');

/**
 * Validation rules for each field
 */
const validationRules = {
  fullName: {
    el: document.getElementById('fullName'),
    errorEl: document.getElementById('nameError'),
    validate(val) {
      if (!val.trim()) return 'Full name is required.';
      if (val.trim().length < 2) return 'Name must be at least 2 characters.';
      if (!/^[a-zA-Z\s.'-]+$/.test(val.trim())) return 'Please enter a valid name.';
      return '';
    }
  },
  email: {
    el: document.getElementById('emailAddr'),
    errorEl: document.getElementById('emailError'),
    validate(val) {
      if (!val.trim()) return 'Email address is required.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val.trim())) return 'Please enter a valid email address.';
      return '';
    }
  },
  phone: {
    el: document.getElementById('phoneNum'),
    errorEl: document.getElementById('phoneError'),
    validate(val) {
      if (!val.trim()) return 'Phone number is required.';
      const cleaned = val.replace(/[\s\-().+]/g, '');
      if (!/^\d{10,15}$/.test(cleaned)) return 'Enter a valid 10-digit phone number.';
      return '';
    }
  },
  message: {
    el: document.getElementById('messageText'),
    errorEl: document.getElementById('messageError'),
    validate(val) {
      if (!val.trim()) return 'Please enter your message.';
      if (val.trim().length < 10) return 'Message must be at least 10 characters.';
      return '';
    }
  }
};

/**
 * Show validation error/success state for a field
 */
function setFieldState(fieldKey, error) {
  const { el, errorEl } = validationRules[fieldKey];
  if (error) {
    el.classList.add('error-input');
    el.classList.remove('success-input');
    errorEl.textContent = error;
  } else {
    el.classList.remove('error-input');
    el.classList.add('success-input');
    errorEl.textContent = '';
  }
}

/**
 * Validate a single field and return error message or empty string
 */
function validateField(fieldKey) {
  const { el, validate } = validationRules[fieldKey];
  const val = el ? el.value : '';
  return validate(val);
}

/**
 * Real-time validation on blur
 */
Object.keys(validationRules).forEach(key => {
  const { el } = validationRules[key];
  if (!el) return;

  el.addEventListener('blur', () => {
    const error = validateField(key);
    setFieldState(key, error);
  });

  el.addEventListener('input', () => {
    // Clear error on input if it was previously in error
    if (el.classList.contains('error-input')) {
      const error = validateField(key);
      setFieldState(key, error);
    }
  });
});

/**
 * Full form validation — returns true if all fields pass
 */
function validateForm() {
  let isValid = true;

  Object.keys(validationRules).forEach(key => {
    const error = validateField(key);
    setFieldState(key, error);
    if (error) isValid = false;
  });

  return isValid;
}

/**
 * Simulate form submission (replace with real API call or EmailJS)
 */
function submitForm() {
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  // Simulate network delay
  setTimeout(() => {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;

    // Show success message
    formSuccessMsg.textContent = '✅ Thank you! Your message has been sent. Our team will get back to you within 24 hours.';
    formSuccessMsg.classList.add('visible');

    // Reset form
    contactForm.reset();

    // Remove validation classes
    Object.keys(validationRules).forEach(key => {
      const { el, errorEl } = validationRules[key];
      if (el) {
        el.classList.remove('success-input', 'error-input');
      }
      if (errorEl) errorEl.textContent = '';
    });

    // Auto-hide success message after 6 seconds
    setTimeout(() => {
      formSuccessMsg.classList.remove('visible');
    }, 6000);
  }, 1800);
}

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Hide any existing success message
    formSuccessMsg.classList.remove('visible');

    if (validateForm()) {
      submitForm();
    } else {
      // Scroll to first error
      const firstError = contactForm.querySelector('.error-input');
      if (firstError) {
        const top = firstError.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: 'smooth' });
        firstError.focus();
      }
    }
  });
}


/* ===================================================
   8. HERO BAR CHART — Animated on load
   =================================================== */
function animateHeroBars() {
  const bars = document.querySelectorAll('.hmc-bar');
  bars.forEach((bar, i) => {
    bar.style.opacity = '0';
    bar.style.transform = 'scaleY(0)';
    bar.style.transformOrigin = 'bottom';
    bar.style.transition = `transform 0.6s ease ${i * 0.1}s, opacity 0.4s ease ${i * 0.1}s`;

    setTimeout(() => {
      bar.style.opacity = '1';
      bar.style.transform = 'scaleY(1)';
    }, 600 + i * 100);
  });
}

// Run hero bar animation shortly after page load
window.addEventListener('load', () => {
  setTimeout(animateHeroBars, 300);
});


/* ===================================================
   9. COUNTER ANIMATION — Stat numbers in hero
   =================================================== */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const text = counter.textContent.trim();
    const hasPlus = text.endsWith('+');
    const target = parseInt(text.replace(/[^0-9]/g, ''), 10);

    if (isNaN(target)) return;

    counter.textContent = '0' + (hasPlus ? '+' : '');

    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      counter.textContent = start + (hasPlus ? '+' : '');
      if (start >= target) clearInterval(timer);
    }, 16);
  });
}

/* Use IntersectionObserver on hero stats to trigger once visible */
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  statsObserver.observe(heroStats);
}


/* ===================================================
   10. SERVICE CARD — Keyboard Accessibility
   =================================================== */
document.querySelectorAll('.service-card').forEach(card => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const link = card.querySelector('.service-link');
      if (link) link.click();
    }
  });
});


/* ===================================================
   11. CLIENTS TRACK — Pause on focus
   =================================================== */
const clientsSlide = document.querySelector('.clients-slide');
if (clientsSlide) {
  clientsSlide.addEventListener('focus', () => {
    clientsSlide.style.animationPlayState = 'paused';
  }, true);
  clientsSlide.addEventListener('blur', () => {
    clientsSlide.style.animationPlayState = 'running';
  }, true);
}


/* ===================================================
   12. MOBILE — Navbar toggle animation (bars → X)
   =================================================== */
const navbarCollapse = document.getElementById('navbarContent');
if (navbarCollapse && navToggler) {
  navbarCollapse.addEventListener('show.bs.collapse', () => {
    const bars = navToggler.querySelectorAll('.toggler-bar');
    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  });

  navbarCollapse.addEventListener('hide.bs.collapse', () => {
    const bars = navToggler.querySelectorAll('.toggler-bar');
    bars[0].style.transform = '';
    bars[1].style.opacity = '';
    bars[2].style.transform = '';
  });
}


/* ===================================================
   13. LAZY LOAD IMAGES — Performance Helper
   =================================================== */
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for older browsers
  const lazyImages = document.querySelectorAll('img[data-src]');
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        lazyObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => lazyObserver.observe(img));
}


/* ===================================================
   14. CONSOLE BRANDING
   =================================================== */
console.log(
  '%c Manpower Supply India Pvt. Ltd. ',
  'background: linear-gradient(135deg, #1a56db, #6c63ff); color: white; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 4px;'
);
console.log('%c Website crafted with precision and care.', 'color: #6b7a99; font-size: 12px;');
