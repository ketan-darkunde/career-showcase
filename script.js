const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'dark') {
  body.dataset.theme = 'dark';
  themeToggle.querySelector('.theme-icon').textContent = '☀️';
} else {
  body.dataset.theme = 'light';
}

themeToggle.addEventListener('click', () => {
  const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = nextTheme;
  localStorage.setItem('portfolio-theme', nextTheme);
  themeToggle.querySelector('.theme-icon').textContent = nextTheme === 'dark' ? '☀️' : '🌙';
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

const validateField = (id, message) => {
  const field = document.getElementById(id);
  const errorNode = document.getElementById(`${id}Error`);
  const value = field.value.trim();

  if (!value) {
    errorNode.textContent = message;
    return false;
  }

  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errorNode.textContent = 'Enter a valid email address.';
    return false;
  }

  errorNode.textContent = '';
  return true;
};

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const isNameValid = validateField('name', 'Please enter your name.');
  const isEmailValid = validateField('email', 'Please enter your email.');
  const isMessageValid = validateField('message', 'Please enter your message.');

  if (isNameValid && isEmailValid && isMessageValid) {
    formStatus.textContent = 'Thank you! Your message has been submitted.';
    contactForm.reset();
  } else {
    formStatus.textContent = 'Please fix the highlighted fields and try again.';
  }
});
