// ============================================================
// MUSCLE LAB FITNESS CLUB — script.js
// Handles: nav scroll state, mobile menu toggle, scroll reveal
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAV: Scrolled state =====
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Run on load in case page is already scrolled


  // ===== MOBILE MENU TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close mobile menu when a link is clicked
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });

  // Close mobile menu when tapping outside the nav
  document.addEventListener('click', (e) => {
    if (navMobile.classList.contains('open') && !nav.contains(e.target)) {
      navMobile.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
  });


  // ===== SCROLL REVEAL =====
  // Elements with class .reveal animate in when they enter the viewport
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once revealed, stop observing (no re-animation on scroll back)
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12, // trigger when 12% of the element is visible
      rootMargin: '0px 0px -60px 0px', // slight bottom offset so it feels natural
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  // ===== SMOOTH SCROLL for anchor links =====
  // (CSS scroll-behavior: smooth handles most cases, but this catches edge cases)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

});
