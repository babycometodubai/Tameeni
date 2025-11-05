// ================================
// ✅ MOBILE SHEET TOGGLE (Safe Version)
// ================================
const menuBtn = document.querySelector('.menu');
const sheet = document.getElementById('sheet');

if (menuBtn && sheet) {
  menuBtn.addEventListener('click', () => {
    sheet.style.display = 'block';
    sheet.removeAttribute('aria-hidden');
  });

  sheet.addEventListener('click', (e) => {
    if (e.target === sheet) {
      sheet.style.display = 'none';
      sheet.setAttribute('aria-hidden', 'true');
    }
  });
}

// ================================
// ✅ BRAND-SUB DYNAMIC UPDATE
// ================================
const brandSub = document.querySelector('.brand-sub');

// Desktop nav buttons
const navButtons = document.querySelectorAll('.nav-links .chip');
if (brandSub && navButtons.length > 0) {
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const text = button.textContent.trim();
      brandSub.textContent = `| ${text}`;
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
}

// Mobile sheet items
const mobileItems = document.querySelectorAll('.m-item');
if (brandSub && mobileItems.length > 0) {
  mobileItems.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.textContent.trim();
      brandSub.textContent = `| ${text}`;

      mobileItems.forEach(it => it.classList.remove('active'));
      item.classList.add('active');

      // Close sheet after selection
      if (sheet) {
        sheet.style.display = 'none';
        sheet.setAttribute('aria-hidden', 'true');
      }
    });
  });
}

// ================================
// ✅ CTA Button (Homepage)
// ================================
const ctaButton = document.getElementById('ctaButton');
if (ctaButton) {
  ctaButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}

// ================================
// ✅ LOGIN FORM HANDLER (login.html)
// ================================
const loginForm = document.querySelector('.login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value.trim();

    if (email === 'user@example.com' && password === '123456') {
      window.location.href = 'purchaseFlow.html';
    } else {
      alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  });
}

// ================================
// ✅ PURCHASE FLOW - Step Navigation (Optional)
// ================================
const stepCircles = document.querySelectorAll('.step-circle');
const progressBar = document.getElementById('prog');

if (stepCircles.length > 0 && progressBar) {
  stepCircles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
      // Activate clicked step
      stepCircles.forEach(c => c.classList.remove('active'));
      circle.classList.add('active');

      // Update progress bar width
      const progress = ((index + 1) / stepCircles.length) * 100;
      progressBar.style.width = `${progress}%`;
    });
  });
}


// ================================
// ✅ CTA Buttons (All "ابدأ الآن")
// ================================
const startButtons = document.querySelectorAll('.start-btn, .cta');
if (startButtons.length > 0) {
  startButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = 'purchaseFlow.html';
    });
  });
}

document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = 'purchaseFlow.html';
  });
});