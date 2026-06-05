/* ================================================================
   SQI COLLEGE OF ICT — HOMEPAGE CLONE
   script.js
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     1. FRAUD WARNING POPUP — show on load after 800ms
     ============================================================ */
  const fraudModal = document.getElementById('fraudModal');
  if (fraudModal) {
    const modal = new bootstrap.Modal(fraudModal, {
      keyboard: true,
      backdrop: true,
    });
    setTimeout(function () {
      modal.show();
    }, 800);
  }


  /* ============================================================
     2. STICKY NAVBAR — add shadow class on scroll
     ============================================================ */
  const navbar = document.getElementById('sqiNavbar');
  function handleNavbarScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();


  /* ============================================================
     3. CLOSE MOBILE MENU ON NAV LINK CLICK
     ============================================================ */
  const navCollapse = document.getElementById('sqiNavMenu');
  const navLinks = document.querySelectorAll('.sqi-nav-list .nav-link:not(.dropdown-toggle)');
  const dropdownItems = document.querySelectorAll('.sqi-dropdown-menu .dropdown-item');

  function closeMobileMenu() {
    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
    if (bsCollapse && window.innerWidth < 992) {
      bsCollapse.hide();
    }
  }

  navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
  dropdownItems.forEach(item => item.addEventListener('click', closeMobileMenu));


  /* ============================================================
     4. DROPDOWN — rotate chevron icon on open/close
     ============================================================ */
  const dropdownEls = document.querySelectorAll('.sqi-dropdown');
  dropdownEls.forEach(function (el) {
    el.addEventListener('show.bs.dropdown', function () {
      const icon = el.querySelector('.fa-chevron-down');
      if (icon) icon.style.transform = 'rotate(180deg)';
    });
    el.addEventListener('hide.bs.dropdown', function () {
      const icon = el.querySelector('.fa-chevron-down');
      if (icon) icon.style.transform = 'rotate(0deg)';
    });
  });


  /* ============================================================
     5. TESTIMONIALS SWIPER
     ============================================================ */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.testimonial-pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.testimonial-prev',
        nextEl: '.testimonial-next',
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
      },
    });
  }


  /* ============================================================
     6. BACK TO TOP BUTTON
     ============================================================ */
  const backToTopBtn = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  if (backToTopBtn) {
    window.addEventListener('scroll', handleBackToTop, { passive: true });
    handleBackToTop();

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ============================================================
     7. SCROLL REVEAL ANIMATION
     ============================================================ */
  const revealEls = document.querySelectorAll(
    '.prog-card, .course-card, .why-card, .news-card, .compare-col, .review-card, .faq-section .col-lg-4, .faq-section .col-lg-8'
  );

  // Add reveal class
  revealEls.forEach(function (el, i) {
    el.classList.add('reveal');
    // Stagger delay for grid children
    const delay = (i % 4) * 80;
    el.style.transitionDelay = delay + 'ms';
  });

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ============================================================
     8. HERO IMAGE — fade in on load
     ============================================================ */
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    heroImg.style.opacity = '0';
    heroImg.style.transform = 'translateY(20px)';
    heroImg.style.transition = 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s';
    heroImg.addEventListener('load', function () {
      heroImg.style.opacity = '1';
      heroImg.style.transform = 'translateY(0)';
    });
    // Trigger if already cached
    if (heroImg.complete) {
      heroImg.style.opacity = '1';
      heroImg.style.transform = 'translateY(0)';
    }
  }


  /* ============================================================
     9. ACTIVE NAV LINK (highlight current page)
     ============================================================ */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sqi-nav-link').forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active-nav');
    }
  });


  /* ============================================================
     10. SMOOTH HOVER SHADOW on navbar
     ============================================================ */
  const style = document.createElement('style');
  style.textContent = `
    .sqi-navbar.scrolled {
      box-shadow: 0 4px 20px rgba(0,0,0,0.14);
    }
    .active-nav {
      color: var(--green-primary) !important;
      background: var(--green-light) !important;
    }
  `;
  document.head.appendChild(style);

});
