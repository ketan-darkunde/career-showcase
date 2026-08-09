const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const moonIcon = themeToggle.querySelector('.moon-icon');
const sunIcon = themeToggle.querySelector('.sun-icon');
const savedTheme = localStorage.getItem('portfolio-theme');

const syncThemeToggle = () => {
  const isDark = body.dataset.theme === 'dark';
  moonIcon.style.display = isDark ? 'none' : 'inline-block';
  sunIcon.style.display = isDark ? 'inline-block' : 'none';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
};

if (savedTheme === 'dark') {
  body.dataset.theme = 'dark';
} else {
  body.dataset.theme = 'light';
}

syncThemeToggle();

themeToggle.addEventListener('click', () => {
  const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = nextTheme;
  localStorage.setItem('portfolio-theme', nextTheme);
  syncThemeToggle();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll('.fade-in').forEach((element) => observer.observe(element));

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const FORMSPREE_ENDPOINT = contactForm.action;

const validateField = (id, message) => {
  const field = document.getElementById(id);
  const errorNode = document.getElementById(`${id}Error`);
  const value = field.value.trim();

  if (!value) {
    errorNode.textContent = message;
    return false;
  }f

  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errorNode.textContent = 'Enter a valid email address.';
    return false;
  }

  errorNode.textContent = '';
  return true;
};

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const isNameValid = validateField('name', 'Please enter your name.');
  const isEmailValid = validateField('email', 'Please enter your email.');
  const isMessageValid = validateField('message', 'Please enter your message.');

  if (!isNameValid || !isEmailValid || !isMessageValid) {
    formStatus.textContent = 'Please fix the highlighted fields and try again.';
    return;
  }

  try {
    formStatus.textContent = 'Sending...';

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: new FormData(contactForm),
    });

    if (!response.ok) {
      throw new Error('Submission failed.');
    }

    formStatus.textContent = 'Thank you! Your message has been submitted.';
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = 'Something went wrong. Please try again later.';
  }
});
