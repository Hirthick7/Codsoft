/**
 * Quizify — main.js
 * Handles:
 *  1. Mobile navigation toggle
 *  2. Scroll-triggered entry animations
 *  3. Quiz creation — dynamic question builder
 *  4. Client-side form validation (register / login / create quiz)
 *  5. Quiz taking — option selection, navigation, submission
 */

/* ── 1. Mobile Navigation Toggle ──────────────────────────── */
;(function initNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ── 2. Scroll-Triggered Animations ───────────────────────── */
;(function initAnimations() {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();


/* ── 3. Dynamic Quiz Creation Form ────────────────────────── */
;(function initQuizCreator() {
  const container    = document.getElementById('questionsContainer');
  const addBtn       = document.getElementById('addQuestionBtn');
  const formEl       = document.getElementById('createQuizForm');
  const template     = document.getElementById('questionTemplate');

  if (!container || !addBtn || !template) return; // not on create page

  let questionCount = 0;

  /**
   * Render a new question card from the <template> element.
   * Replaces __IDX__ and __NUM__ placeholders with live values.
   */
  function addQuestion() {
    questionCount++;
    const idx  = questionCount;
    const num  = questionCount;
    const html = template.innerHTML
      .replace(/__IDX__/g,  idx)
      .replace(/__NUM__/g,  num);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    const card = wrapper.firstElementChild;

    // Animate in
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    container.appendChild(card);

    requestAnimationFrame(() => {
      card.style.transition = 'opacity .35s ease, transform .35s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });

    // Remove button
    const removeBtn = card.querySelector('.btn-remove-question');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => removeQuestion(card));
    }

    // Option card highlight (radio selection)
    const radios = card.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        card.querySelectorAll('.option-group').forEach(og => og.classList.remove('option-group--selected'));
        if (radio.checked) {
          radio.closest('.option-group').classList.add('option-group--selected');
        }
      });
    });
  }

  function removeQuestion(card) {
    if (container.querySelectorAll('.question-card').length <= 1) {
      alert('You must have at least one question.');
      return;
    }
    card.style.transition = 'opacity .25s ease, transform .25s ease';
    card.style.opacity = '0';
    card.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      card.remove();
      renumberQuestions();
    }, 250);
  }

  function renumberQuestions() {
    const cards = container.querySelectorAll('.question-card');
    cards.forEach((card, i) => {
      const badge = card.querySelector('.q-num');
      if (badge) badge.textContent = i + 1;
    });
  }

  addBtn.addEventListener('click', addQuestion);

  // Add the first question on load
  addQuestion();

  // ── Client-side form validation for create quiz ──────────────
  if (formEl) {
    formEl.addEventListener('submit', (e) => {
      const title = document.getElementById('title');
      let valid = true;

      // Validate title
      if (!title.value.trim()) {
        document.getElementById('titleError').textContent = 'Quiz title is required.';
        title.focus();
        valid = false;
      } else {
        document.getElementById('titleError').textContent = '';
      }

      // Validate each question card
      const cards = container.querySelectorAll('.question-card');
      cards.forEach((card, i) => {
        const qText   = card.querySelector('textarea');
        const opts    = card.querySelectorAll('input[type="text"]');
        const correct = card.querySelectorAll('input[type="radio"]');
        const errSpan = card.querySelector('.field-error');

        if (qText && !qText.value.trim()) {
          if (errSpan) errSpan.textContent = 'Question text is required.';
          valid = false;
        } else if (errSpan) {
          errSpan.textContent = '';
        }

        opts.forEach(opt => {
          if (!opt.value.trim()) {
            opt.style.borderColor = 'var(--clr-danger)';
            valid = false;
          } else {
            opt.style.borderColor = '';
          }
        });

        const anyChecked = Array.from(correct).some(r => r.checked);
        if (!anyChecked) {
          const hint = card.querySelector('.option-hint');
          if (hint) hint.style.color = 'var(--clr-danger)';
          valid = false;
        }
      });

      if (!valid) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
})();


/* ── 4. Auth Form Validation ───────────────────────────────── */
;(function initAuthForms() {

  // Register form
  const regForm = document.getElementById('registerForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      let valid = true;
      const name    = document.getElementById('name');
      const email   = document.getElementById('email');
      const pass    = document.getElementById('password');
      const confirm = document.getElementById('confirm_password');

      const setErr = (id, msg) => { document.getElementById(id).textContent = msg; };

      if (!name.value.trim() || name.value.trim().length < 2) {
        setErr('nameError', 'Please enter your full name.');
        valid = false;
      } else { setErr('nameError', ''); }

      if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
        setErr('emailError', 'Please enter a valid email address.');
        valid = false;
      } else { setErr('emailError', ''); }

      if (pass.value.length < 6) {
        setErr('passwordError', 'Password must be at least 6 characters.');
        valid = false;
      } else { setErr('passwordError', ''); }

      if (confirm.value !== pass.value) {
        setErr('confirmError', 'Passwords do not match.');
        valid = false;
      } else { setErr('confirmError', ''); }

      if (!valid) e.preventDefault();
    });
  }

  // Login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      let valid = true;
      const email = document.getElementById('email');
      const pass  = document.getElementById('password');

      const setErr = (id, msg) => { document.getElementById(id).textContent = msg; };

      if (!email.value.trim()) {
        setErr('emailError', 'Email is required.');
        valid = false;
      } else { setErr('emailError', ''); }

      if (!pass.value.trim()) {
        setErr('passwordError', 'Password is required.');
        valid = false;
      } else { setErr('passwordError', ''); }

      if (!valid) e.preventDefault();
    });
  }
})();


/* ── 5. Quiz Taking Engine ─────────────────────────────────── */
;(function initQuizTaker() {
  const quizContainer = document.getElementById('quizContainer');
  if (!quizContainer) return; // not on take quiz page

  const totalQuestions = parseInt(quizContainer.dataset.total, 10);
  const quizId         = quizContainer.dataset.quizId;

  // Map to store user answers: { questionIndex: optionIndex }
  const answers = {};

  /**
   * Show a specific question slide and hide others.
   */
  function showSlide(idx) {
    document.querySelectorAll('.question-slide').forEach(slide => {
      slide.classList.add('hidden');
    });
    const target = document.getElementById(`question_${idx}`);
    if (target) {
      target.classList.remove('hidden');
      updateProgress(idx);
    }
  }

  /**
   * Update the progress bar and label.
   */
  function updateProgress(idx) {
    const fill  = document.getElementById('progressFill');
    const label = document.getElementById('progressLabel');
    const bar   = document.getElementById('quizProgressBar');
    const pct   = Math.round(((idx) / totalQuestions) * 100);

    if (fill)  fill.style.width = `${pct}%`;
    if (label) label.textContent = `Question ${idx + 1} of ${totalQuestions}`;
    if (bar)   bar.setAttribute('aria-valuenow', idx + 1);
  }

  // ── Option card selection ──────────────────────────────────
  quizContainer.addEventListener('click', (e) => {
    const label = e.target.closest('.option-card');
    if (!label) return;

    const slide = label.closest('.question-slide');
    if (!slide) return;

    const qIdx     = parseInt(slide.dataset.qidx, 10);
    const radio    = label.querySelector('.option-radio');
    const optValue = parseInt(radio.value, 10);

    // Deselect all options in this slide
    slide.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));

    // Select clicked option
    label.classList.add('selected');
    radio.checked = true;

    // Store answer
    answers[qIdx] = optValue;
  });

  // ── Navigation: Next / Previous ───────────────────────────
  quizContainer.addEventListener('click', (e) => {
    const nextBtn = e.target.closest('.next-btn');
    const prevBtn = e.target.closest('.prev-btn');

    if (nextBtn) {
      const targetIdx = parseInt(nextBtn.dataset.target, 10);
      showSlide(targetIdx);
    }

    if (prevBtn) {
      const targetIdx = parseInt(prevBtn.dataset.target, 10);
      showSlide(targetIdx);
    }
  });

  // ── Submit ──────────────────────────────────────────────────
  const submitBtn = document.getElementById('submitQuizBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      // Build ordered answers array (use -1 for skipped)
      const answersArr = [];
      for (let i = 0; i < totalQuestions; i++) {
        answersArr.push(answers[i] !== undefined ? answers[i] : -1);
      }

      // Disable button to prevent double submission
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      try {
        const resp = await fetch('/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quiz_id: quizId, answers: answersArr })
        });

        const data = await resp.json();
        if (data.redirect) {
          window.location.href = data.redirect;
        } else {
          alert(data.error || 'Submission failed. Please try again.');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Quiz';
        }
      } catch (err) {
        console.error('Submission error:', err);
        alert('Network error. Please check your connection and try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Quiz';
      }
    });
  }

  // Initialize: show first question
  showSlide(0);
})();
