document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
});

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzfivK0vYUysNWprXvPXWE_LMzCN49rRSwehqweo3C6Gk6TvlJwxAAx16V4OhhZjne1Bg/exec";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
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
          statusEl.textContent = "Thank you! Your message has been sent. You will recieve the confirmation email shortly.";
          form.reset();
        } else {
          statusEl.style.color = "red";
          statusEl.textContent =
            "Sorry, there was an error. Please try again.";
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        statusEl.style.color = "red";
        statusEl.textContent =
          "Error sending. Please check your connection or try again later.";
      });
  });
});

const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.modal-close');

const zoomables = document.querySelectorAll('.zoomable');

zoomables.forEach((img) => {
  img.addEventListener('click', function() {
    modalImg.src = this.src;
    modal.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
  modalImg.src = '';
});

modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalImg.src = '';
  }
});

