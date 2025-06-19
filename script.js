// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-list a');
const sections = document.querySelectorAll('section');

// Mobile menu toggle
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });
}

// Smooth scroll and active section handling
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    
    // Close mobile menu if open
    navToggle?.classList.remove('active');
    nav?.classList.remove('active');
    
    // Get the target section
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // Smooth scroll to section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Update active section on scroll
function updateActiveSection() {
  const scrollPosition = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // Offset for header
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav-list a[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      correspondingLink?.classList.add('active');
    }
  });
}

// Throttle scroll event for better performance
let isScrolling = false;
window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      updateActiveSection();
      isScrolling = false;
    });
    isScrolling = true;
  }
});

// Projects slider
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const projectsWrapper = document.querySelector('.projects-wrapper');
const projects = document.querySelectorAll('.project');

if (prevBtn && nextBtn && projectsWrapper && projects.length > 0) {
  let currentIndex = 0;

  function updateSlider() {
    const offset = currentIndex * 100;
    projectsWrapper.style.transform = `translateX(-${offset}%)`;
    
    // Update active state
    projects.forEach((project, index) => {
      if (index === currentIndex) {
        project.classList.add('active');
      } else {
        project.classList.remove('active');
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % projects.length;
    updateSlider();
  });

  // Initialize first slide
  updateSlider();
}

// Contact form validation (only initialize if on contact page)
if (window.location.pathname.includes('contact')) {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formSuccess = document.getElementById('form-success');

  if (form) {
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
  }
}

// Theme switching functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference, otherwise use system preference
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme
const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  // Update icon
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
};

// Initialize theme
setTheme(getPreferredTheme());

// Handle theme toggle click
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

