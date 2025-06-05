document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }


  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  if (form && statusEl) {
    const SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbzfivK0vYUysNWprXvPXWE_LMzCN49rRSwehqweo3C6Gk6TvlJwxAAx16V4OhhZjne1Bg/exec";

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.hidden = false;
      statusEl.style.color = "black";
      statusEl.textContent = "Sending…";

      const formData = new FormData(form);
      fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.result === "success") {
            statusEl.style.color = "green";
            statusEl.textContent = "Thank you! Your message has been sent. You will receive the confirmation email shortly.";
            form.reset();
          } else {
            statusEl.style.color = "red";
            statusEl.textContent = "Sorry, there was an error. Please try again.";
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          statusEl.style.color = "red";
          statusEl.textContent = "Error sending. Please check your connection or try again later.";
        });
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


