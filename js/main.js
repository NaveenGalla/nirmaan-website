/* ============================================================
   SAI NIRMAAN ARCHITECTS — main.js v2.1
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Navbar scroll solidify ----- */
  const nav = document.getElementById('nav');
  const btt = document.getElementById('btt');

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('solid', y > 80);
    if (btt) btt.classList.toggle('show', y > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Back to top ----- */
  btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ----- Hamburger ----- */
  const burger   = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  burger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    if (spans.length >= 3) {
      spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)'   : '';
      spans[1].style.opacity   = open ? '0' : '1';
      spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
    }
    // Lock body scroll when mobile menu is open
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      burger?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    })
  );

  /* ----- Active nav link ----- */
  const page = location.pathname.split('/').pop() || 'index.html';
  navLinks?.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ----- Fade-in / fade-up on scroll (both class names) ----- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade-in, .fade-up').forEach(el => io.observe(el));

  /* ----- Portfolio filter ----- */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.pitem[data-category]').forEach(item => {
        const show = f === 'all' || f === '*' || item.dataset.category === f;
        item.style.transition   = 'opacity 0.3s, transform 0.3s';
        item.style.opacity      = show ? '1' : '0';
        item.style.transform    = show ? '' : 'scale(0.96)';
        item.style.pointerEvents = show ? '' : 'none';
      });
    });
  });

  /* ----- Portfolio modal ----- */
  const modalWrap  = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.pitem[data-title]').forEach(item => {
    item.addEventListener('click', () => {
      const d   = item.dataset;
      const img = item.querySelector('img');
      let imgSrc = img?.src || '';
      if (!imgSrc) {
        const bg = item.style.backgroundImage || getComputedStyle(item).backgroundImage;
        const m  = bg.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (m) imgSrc = m[1];
      }
      document.getElementById('modalImg').src              = imgSrc;
      document.getElementById('modalImg').alt              = img?.alt || d.title || '';
      document.getElementById('modalTag').textContent      = d.tag      || '';
      document.getElementById('modalTitle').textContent    = d.title    || '';
      document.getElementById('modalLocation').textContent = d.location || '';
      document.getElementById('modalDesc').textContent     = d.desc     || '';
      document.getElementById('mType').textContent         = d.type     || '—';
      document.getElementById('mArea').textContent         = d.area     || '—';
      document.getElementById('mYear').textContent         = d.year     || '—';
      document.getElementById('mStatus').textContent       = d.status   || '—';
      if (modalWrap) {
        modalWrap.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalWrap?.classList.remove('open');
    document.body.style.overflow = '';
  };
  modalClose?.addEventListener('click', closeModal);
  modalWrap?.addEventListener('click', e => { if (e.target === modalWrap) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ----- Contact form ----- */
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn  = form.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled    = true;

    setTimeout(() => {
      showNotif("Thank you — your message has been received. We'll be in touch within 24 hours.", 'success');
      form.reset();
      btn.textContent = orig;
      btn.disabled    = false;
    }, 1400);
  });

  /* ----- FAQ accordion — supports both .faq-q and .faq-question ----- */
  document.querySelectorAll('.faq-q, .faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (!item) return;
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* ----- Notification helper ----- */
  function showNotif(msg, type = '') {
    document.querySelectorAll('.notif').forEach(n => n.remove());
    const n       = document.createElement('div');
    n.className   = `notif ${type}`;
    n.textContent = msg;
    document.body.appendChild(n);
    requestAnimationFrame(() => n.classList.add('show'));
    setTimeout(() => { n.classList.remove('show'); setTimeout(() => n.remove(), 400); }, 5500);
  }

  /* ----- Smooth anchor scroll ----- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
