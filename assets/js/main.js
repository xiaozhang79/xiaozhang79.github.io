(() => {
  const navigation = document.querySelector('.greedy-nav');
  const navigationToggle = document.querySelector('.nav-toggle');
  const navigationLinks = document.querySelector('.visible-links');
  const lightbox = document.querySelector('#image-lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('[data-lightbox-close]');
  let previouslyFocusedElement;

  function setNavigationOpen(isOpen) {
    navigation?.classList.toggle('nav-open', isOpen);
    navigationToggle?.setAttribute('aria-expanded', String(isOpen));
  }

  navigationToggle?.addEventListener('click', () => {
    setNavigationOpen(!navigation.classList.contains('nav-open'));
  });

  navigationLinks?.addEventListener('click', event => {
    if (event.target.closest('a')) setNavigationOpen(false);
  });

  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 20,
        behavior: 'smooth'
      });
      window.history.replaceState(null, '', url.hash);
    });
  });

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    previouslyFocusedElement?.focus();
  }

  document.querySelectorAll('[data-lightbox-image]').forEach(link => {
    link.addEventListener('click', event => {
      if (!lightbox || !lightboxImage) return;
      event.preventDefault();
      previouslyFocusedElement = link;
      lightboxImage.src = link.href;
      lightboxImage.alt = link.querySelector('img')?.alt || 'Expanded image';
      lightbox.hidden = false;
      document.body.classList.add('lightbox-open');
      lightboxClose?.focus();
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLightbox();
  });
})();
