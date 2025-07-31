document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('my-form-button');
  const statusEl  = document.getElementById('form-status');
  const loadTime  = Date.now();

  window.handleFormResponse = function(json) {
    if (json.result === 'success') {
      statusEl.style.color = 'green';
      statusEl.textContent = 'Your message has been sent. You will receive a confirmation email shortly.';
      form.reset();
    } else {
      statusEl.style.color = 'red';
      statusEl.textContent = json.message || 'There was an error. Please try again.';
    }
    statusEl.hidden = false;
  };

  window.onCaptchaSolved = function() {
    submitBtn.disabled = false;
  };

  if (form && submitBtn && statusEl) {
    form.addEventListener('submit', e => {
      if (Date.now() - loadTime < 5000) {
        e.preventDefault();
        statusEl.hidden      = false;
        statusEl.style.color = 'red';
        statusEl.textContent = 'Please wait at least 5 seconds before submitting.';
        return;
      }

      const cap = form.querySelector('[name="g-recaptcha-response"]').value;
      if (!cap) {
        e.preventDefault();
        statusEl.hidden      = false;
        statusEl.style.color = 'red';
        statusEl.textContent = 'Please solve the CAPTCHA.';
        return;
      }

      statusEl.hidden      = false;
      statusEl.style.color = 'black';
      statusEl.textContent = 'Sending…';
    });
  }

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
