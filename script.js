document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('my-form-button');
  const statusEl = document.getElementById('form-status');
  const loadTime = Date.now();
  const URL = 'https://script.google.com/macros/s/AKfycbyEbeCKN-YZjYWwf8x2sa1HJb0KGSNKO0OgFmIS_Hq3kJ0k2nk-LvnoS_paFMCsxDMFFw/exec';

  window.onCaptchaSolved = () => {
    btn.disabled = false;
  };

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
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => {
        if (json.result === 'success') {
          statusEl.style.color = 'green';
          statusEl.textContent = 'Your message has been sent. You will receive a confirmation email shortly.';
          form.reset();
          btn.disabled = true;
          grecaptcha.reset();
        } else {
          statusEl.style.color = 'red';
          statusEl.textContent = json.message;
        }
      })
      .catch(err => {
        statusEl.style.color = 'red';
        statusEl.textContent = 'Network error. Please try again.';
        console.error(err);
      });
  });

  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.modal-close');
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

  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  const links = document.querySelectorAll('nav a[href^="/"], .social-link[href^="https"]');
  links.forEach(link => {
    link.addEventListener('click', e => {
      if (link.target === '_blank') return;
      e.preventDefault();
      document.documentElement.style.opacity = '0';
      setTimeout(() => {
        window.location.href = link.getAttribute('href');
      }, 400);
    });
  });
});
