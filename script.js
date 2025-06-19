// Navigation toggle for mobile
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

// Project slider
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const projectsWrapper = document.querySelector('.projects-wrapper');
const projects = document.querySelectorAll('.project');

let currentIndex = 0;

function updateSlider() {
  projectsWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % projects.length;
  updateSlider();
});

// Contact form validation
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  // Name validation
  if (nameInput.value.trim().length < 2) {
    nameError.textContent = 'Please enter at least 2 characters.';
    valid = false;
  } else {
    nameError.textContent = '';
  }

  // Email validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  } else {
    emailError.textContent = '';
  }

  // Message validation
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = 'Please enter at least 10 characters.';
    valid = false;
  } else {
    messageError.textContent = '';
  }

  if (valid) {
    formSuccess.textContent = 'Thank you for your message!';
    form.reset();
  } else {
    formSuccess.textContent = '';
  }
});

