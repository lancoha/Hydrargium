document.addEventListener('DOMContentLoaded', () => {
  const form     = document.getElementById('contact-form');
  const btn      = document.getElementById('my-form-button');
  const statusEl = document.getElementById('form-status');
  const loadTime = Date.now();
  const URL      = 'https://script.google.com/macros/s/AKfycb…/exec';

  window.onCaptchaSolved = () => btn.disabled = false;

  form.addEventListener('submit', e => {
    e.preventDefault();
    statusEl.hidden = false;

    if (Date.now() - loadTime < 5000) {
      statusEl.style.color = 'red';
      statusEl.textContent = 'Please wait at least 5 seconds before submitting.';
      return;
    }
    if (!grecaptcha.getResponse()) {
      statusEl.style.color = 'red';
      statusEl.textContent = 'Please solve the CAPTCHA.';
      return;
    }

    statusEl.style.color = 'black';
    statusEl.textContent = 'Sending…';

    fetch(URL, { method: 'POST', body: new FormData(form) })
      .then(res => res.json())
      .then(json => {
        if (json.result === 'success') {
          statusEl.style.color = 'green';
          statusEl.textContent = 'Your message has been sent. You will receive a confirmation email shortly.';
          form.reset();
          btn.disabled = true;
          grecaptcha.reset();
        } else {
          statusEl.style.color = 'red';
          statusEl.textContent = json.message || 'There was an error. Please try again.';
        }
      })
      .catch(() => {
        statusEl.style.color = 'red';
        statusEl.textContent = 'Network error. Please try again.';
      });
  });
});


  const modal     = document.getElementById('imgModal');
  const modalImg  = document.getElementById('modalImg');
  const closeBtn  = document.querySelector('.modal-close');
  const zoomables = document.querySelectorAll('.zoomable');
  if (modal && modalImg && closeBtn && zoomables.length > 0) {
    zoomables.forEach(img => {
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
      });
    });
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      modalImg.src = '';
    });
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        modalImg.src = '';
      }
    });
  }

  const links = document.querySelectorAll('nav a[href^="/"], .social-link[href^="https"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      if (link.target === '_blank') return;
      e.preventDefault();
      const href = link.getAttribute('href');
      document.documentElement.style.opacity = '0';
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });
});
