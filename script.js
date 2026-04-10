// Core interactions: reveal on scroll, counters, basic parallax, form validation
document.addEventListener('DOMContentLoaded', function(){
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  navToggle && navToggle.addEventListener('click', ()=>{
    const nav = document.querySelector('.main-nav');
    if(nav.style.display === 'block') nav.style.display = '';
    else nav.style.display = 'block';
  });

  // Intersection Observer for reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  reveals.forEach(r => io.observe(r));

  // Animated counters
  const counters = document.querySelectorAll('.count');
  function animateCounter(el){
    const target = +el.dataset.target || 0;
    let current = 0;
    const step = Math.max(1, Math.floor(target/120));
    const tick = () => {
      current += step;
      if(current >= target){ el.textContent = target; }
      else{ el.textContent = current; requestAnimationFrame(tick); }
    };
    tick();
  }
  const co = new IntersectionObserver((entries, ob)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ animateCounter(e.target); ob.unobserve(e.target); }
    });
  },{threshold:0.6});
  counters.forEach(c => co.observe(c));

  // Simple parallax on elements with data-parallax
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', () => {
    const sc = window.scrollY;
    parallaxEls.forEach(el =>{
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      el.style.transform = `translateY(${sc * speed}px)`;
    });
  }, {passive:true});

  // Contact form validation and fake submit
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      formMsg.textContent = '';
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!name || !emailRe.test(email) || phone.length < 7 || !message){
        formMsg.textContent = 'Please fill the form correctly.';
        return;
      }
      // simulate async send
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true; submitBtn.textContent = 'Sending...';
      setTimeout(()=>{
        submitBtn.disabled = false; submitBtn.textContent = 'Send Message';
        form.reset();
        formMsg.textContent = 'Thank you — your message has been received. We will contact you shortly.';
      }, 900);
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        const el = document.querySelector(href);
        if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
      }
    });
  });
});
