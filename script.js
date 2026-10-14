/**
 * ===================================================================
 * UDAY PATIL - AI & DATA SCIENCE PORTFOLIO JAVASCRIPT
 * Modern, Lightweight, Interactive & Transparent Client-side Logic
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Typewriter Effect for Hero Section
  const roles = [
    'AI & Data Science Student',
    'Aspiring Software Developer',
    'C, C++ & Java Programmer',
    'Curious Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedRoleEl = document.getElementById('typedRole');

  function typeRoleEffect() {
    if (!typedRoleEl) return;
    const currentWord = roles[roleIndex];

    if (isDeleting) {
      typedRoleEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedRoleEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 35 : 75;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 2000; // Pause at completion of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 350; // Pause before typing new phrase
    }

    setTimeout(typeRoleEffect, speed);
  }
  typeRoleEffect();

  // 3. Theme Toggle (Dark & Light Mode)
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  // Default to clean White & Blue (light) theme
  const storedTheme = 'light';

  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('uday-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fa-solid fa-moon';
      } else {
        themeIcon.className = 'fa-solid fa-sun';
      }
    }
  }

  // Initialize saved theme
  setTheme(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
      showToast(current === 'dark' ? 'Switched to Light Mode' : 'Switched to Dark Mode');
    });
  }

  // 4. Mobile Navigation Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu upon navigation link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 5. Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // 6. Toast Notification Helper
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message, duration = 3500) {
    if (!toastEl) return;
    if (toastTimer) clearTimeout(toastTimer);

    toastEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    toastEl.classList.add('show');

    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  }

  // 7. Clipboard Copy Buttons (Email & Phone)
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('udaypatil4431@gmail.com')
        .then(() => showToast('Email copied: udaypatil4431@gmail.com'))
        .catch(() => showToast('Email: udaypatil4431@gmail.com'));
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+919730854327')
        .then(() => showToast('Phone number copied: +91 9730854327'))
        .catch(() => showToast('Phone: +91 9730854327'));
    });
  }

  // 8. Contact Form Handling (Strictly Honest: Launches Email Draft, No Fake Backend Claims)
  const contactForm = document.getElementById('contactForm');
  const formStatusBox = document.getElementById('formStatusBox');
  const userNameInput = document.getElementById('userName');
  const userEmailInput = document.getElementById('userEmail');
  const userMessageInput = document.getElementById('userMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm && formStatusBox) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Reset error indicators
      [userNameInput, userEmailInput, userMessageInput].forEach(inp => inp && inp.classList.remove('invalid'));
      [nameError, emailError, messageError].forEach(err => {
        if (err) {
          err.textContent = '';
          err.classList.remove('show');
        }
      });
      formStatusBox.className = 'form-status-box';
      formStatusBox.textContent = '';

      // Validate Name
      const nameVal = userNameInput ? userNameInput.value.trim() : '';
      if (!nameVal) {
        isValid = false;
        if (userNameInput) userNameInput.classList.add('invalid');
        if (nameError) {
          nameError.textContent = 'Please enter your name.';
          nameError.classList.add('show');
        }
      }

      // Validate Email
      const emailVal = userEmailInput ? userEmailInput.value.trim() : '';
      if (!emailVal || !validateEmail(emailVal)) {
        isValid = false;
        if (userEmailInput) userEmailInput.classList.add('invalid');
        if (emailError) {
          emailError.textContent = 'Please enter a valid email address.';
          emailError.classList.add('show');
        }
      }

      // Validate Message
      const messageVal = userMessageInput ? userMessageInput.value.trim() : '';
      if (!messageVal) {
        isValid = false;
        if (userMessageInput) userMessageInput.classList.add('invalid');
        if (messageError) {
          messageError.textContent = 'Please write a message.';
          messageError.classList.add('show');
        }
      }

      if (!isValid) return;

      // Construct direct mailto URI
      const subject = encodeURIComponent(`Portfolio Inquiry from ${nameVal}`);
      const body = encodeURIComponent(
        `Hi Uday,\n\nName: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}\n\n---\nSent from Portfolio Website`
      );
      const mailtoUrl = `mailto:udaypatil4431@gmail.com?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoUrl;

      // Display authentic status message (no fake delivery claims)
      formStatusBox.className = 'form-status-box success show';
      formStatusBox.innerHTML = `
        <i class="fa-solid fa-circle-check"></i> 
        <span>Opening your email client to send directly to <strong>udaypatil4431@gmail.com</strong>. If your email application didn't open automatically, you can email Uday directly at <a href="mailto:udaypatil4431@gmail.com" style="text-decoration:underline;">udaypatil4431@gmail.com</a>.</span>
      `;
    });
  }

  // 9. Resume Buttons Notice
  const resumeNavBtn = document.getElementById('resumeNavBtn');
  const heroDownloadResumeBtn = document.getElementById('heroDownloadResumeBtn');

  function handleResumeClick(e) {
    // If resume.pdf exists, browser will download/view it.
    // Otherwise, show helpful info toast.
    showToast('To request Uday Patil\'s resume, reach out at udaypatil4431@gmail.com!');
  }

  if (resumeNavBtn) {
    resumeNavBtn.addEventListener('click', handleResumeClick);
  }
  if (heroDownloadResumeBtn) {
    heroDownloadResumeBtn.addEventListener('click', handleResumeClick);
  }

  // 10. Configurable LinkedIn Button Notice
  const connectLinkedInBtn = document.getElementById('connectLinkedInBtn');
  const footerLinkedInBtn = document.getElementById('footerLinkedInBtn');

  function handleLinkedInClick(e) {
    const currentHref = this.getAttribute('href');
    if (!currentHref || currentHref === '#' || currentHref === 'https://www.linkedin.com') {
      showToast('LinkedIn profile button is configurable. Update with your custom URL in index.html!');
    }
  }

  if (connectLinkedInBtn) {
    connectLinkedInBtn.addEventListener('click', handleLinkedInClick);
  }
  if (footerLinkedInBtn) {
    footerLinkedInBtn.addEventListener('click', handleLinkedInClick);
  }

  // 11. Project Live Demo Button Notice
  const projectDemoBtn = document.getElementById('projectDemoBtn');
  if (projectDemoBtn) {
    projectDemoBtn.addEventListener('click', () => {
      showToast('Live demo will be made accessible once project deployment is live!');
    });
  }

});
