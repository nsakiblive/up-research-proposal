(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const dialog = document.querySelector('.evidence-dialog');
  const image = dialog.querySelector('.dialog-image');
  const caption = dialog.querySelector('#evidence-caption');
  let opener;
  document.querySelectorAll('.image-preview').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      image.src = button.dataset.image;
      image.alt = button.querySelector('img').alt;
      caption.textContent = button.dataset.caption;
      dialog.showModal();
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect=dialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => opener?.focus());

  const copy = document.querySelector('[data-copy-email]');
  const status = document.querySelector('.copy-status');
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copy.dataset.copyEmail);
      status.textContent = 'Email address copied.';
      copy.innerHTML = 'Copied <span aria-hidden="true">✓</span>';
    } catch {
      status.textContent = 'Please copy the email address shown above.';
    }
  });
})();
