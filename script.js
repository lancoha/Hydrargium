document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('contact-form')
  const submitBtn = document.getElementById('my-form-button')
  const statusEl  = document.getElementById('form-status')
  const loadTime  = Date.now()
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEbeCKN-YZjYWwf8x2sa1HJb0KGSNKO0OgFmIS_Hq3kJ0k2nk-LvnoS_paFMCsxDMFFw/exec'

  window.onCaptchaSolved = () => {
    submitBtn.disabled = false
  }

  window.handleFormResponse = data => {
    statusEl.hidden = false
    if (data.result === 'success') {
      statusEl.style.color = 'green'
      statusEl.textContent  = 'Your message has been sent. You will receive a confirmation email shortly.'
      form.reset()
    } else {
      statusEl.style.color = 'red'
      statusEl.textContent  = data.message || 'There was an error. Please try again.'
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault()
    statusEl.hidden = false

    if (Date.now() - loadTime < 5000) {
      statusEl.style.color  = 'red'
      statusEl.textContent  = 'Please wait at least 5 seconds before submitting.'
      return
    }

    const captcha = form.querySelector('[name="g-recaptcha-response"]').value
    if (!captcha) {
      statusEl.style.color  = 'red'
      statusEl.textContent  = 'Please solve the CAPTCHA.'
      return
    }

    statusEl.style.color  = 'black'
    statusEl.textContent  = 'Sending…'

    const params = new URLSearchParams()
    new FormData(form).forEach((v, k) => params.append(k, v))
    params.append('callback', 'handleFormResponse')

    const script = document.createElement('script')
    script.async = true
    script.src   = SCRIPT_URL + '?' + params.toString()
    script.onerror = () => {
      statusEl.style.color = 'red'
      statusEl.textContent = 'Network error. Please try again.'
    }
    document.body.appendChild(script)
  })
})

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
