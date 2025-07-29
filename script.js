document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const loadTime = Date.now();
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  window.handleFormResponse = function(json) {
    const statusEl = document.getElementById('form-status');
    const form = document.getElementById('contact-form');
    if (json.result === 'success') {
      statusEl.style.color = 'green';
      statusEl.textContent = 'Thank you! Your message has been sent. You will receive the confirmation email shortly.';
      form.reset();
    } else {
      statusEl.style.color = 'red';
      statusEl.textContent = json.message || 'Sorry, there was an error. Please try again.';
    }
  };

  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  if (form && statusEl) {
    const SCRIPT_URL =
  "https://script.googleusercontent.com/macros/s/AKfycbyEbeCKN-YZjYWwf8x2sa1HJb0KGSNKO0OgFmIS_Hq3kJ0k2nk-LvnoS_paFMCsxDMFFw/exec";
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const now = Date.now();
      if (now - loadTime < 5000) {
        statusEl.hidden = false;
        statusEl.style.color = 'red';
        statusEl.textContent = 'Please wait at least 5 seconds before submitting.';
        return;
      }

      const formData = new FormData(form);
      const recaptcha = formData.get('g-recaptcha-response');
      if (!recaptcha) {
        statusEl.hidden = false;
        statusEl.style.color = 'red';
        statusEl.textContent = 'Please solve CAPTCHA.';
        return;
      }

      statusEl.hidden = false;
      statusEl.style.color = "black";
      statusEl.textContent = "Sending…";

      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        params.append(key, value);
      });
      params.append('callback', 'handleFormResponse');
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = SCRIPT_URL + '?' + params.toString();
      document.body.appendChild(script);
    });
  }

  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.modal-close');
  const zoomables = document.querySelectorAll('.zoomable');
  if (modal && modalImg && closeBtn && zoomables.length > 0) {
    zoomables.forEach((img) => {
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
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        modalImg.src = '';
      }
    });
  }

  const links = document.querySelectorAll('nav a[href^="/"], .social-link[href^="https"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
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
