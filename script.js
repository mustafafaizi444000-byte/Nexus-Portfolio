   // ── CURSOR ──
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
    (function animCursor() {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animCursor);
    })();
    document.querySelectorAll('a,button,.skill-badge,.project-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });

    // ── NAV SCROLL ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── MOBILE NAV ──
    function openMobileNav() { document.getElementById('mobileNav').classList.add('open'); }
    function closeMobileNav() { document.getElementById('mobileNav').classList.remove('open'); }
    document.getElementById('mobileClose').addEventListener('click', closeMobileNav);

    // ── INTERSECTION OBSERVER (reveal + skill bars) ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          // stagger children if grid
          const children = e.target.querySelectorAll('.reveal');
          children.forEach((c, i) => { c.style.transitionDelay = i * 0.1 + 's'; c.classList.add('in-view'); });
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal,.skill-badge').forEach(el => observer.observe(el));

    // ── FORM SUBMIT ──
    function submitForm() {
      const n = document.getElementById('fname').value.trim();
      const e = document.getElementById('femail').value.trim();
      const m = document.getElementById('fmessage').value.trim();
      if (!n || !e || !m) { return; }
      const success = document.getElementById('formSuccess');
      success.style.display = 'block';
      ['fname', 'femail', 'fsubject', 'fmessage'].forEach(id => document.getElementById(id).value = '');
      setTimeout(() => success.style.display = 'none', 5000);
    }

    // ── PARALLAX HERO ORB ──
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      document.addEventListener('mousemove', e => {
        const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
        heroVisual.style.transform = `translateY(-50%) translate(${dx * 12}px,${dy * 8}px)`;
      });
    }

    // ── SKILL BADGE HOVER GLOW ──
    document.querySelectorAll('.skill-badge').forEach(badge => {
      badge.addEventListener('mousemove', e => {
        const r = badge.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        badge.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,245,255,0.07), rgba(13,20,35,0.55) 60%)`;
      });
      badge.addEventListener('mouseleave', () => { badge.style.background = ''; });
    });

    // ── PROJECT CARD TILT ──
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-8px) scale(1.01) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });