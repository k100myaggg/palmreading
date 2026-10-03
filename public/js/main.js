/**
 * AuraPalm Main Scripts & Utilities
 * Handles navigation, interactive components, audio synthesis, and modals.
 */

// Web Audio API Synthesizer for Mystical Chimes & Biometric Beeps
const SoundFX = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },
  playTone(freq = 528, type = 'sine', duration = 0.4, gainVal = 0.08) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  },
  chime() {
    this.playTone(528, 'sine', 0.8, 0.1);
    setTimeout(() => this.playTone(660, 'sine', 0.9, 0.08), 120);
    setTimeout(() => this.playTone(792, 'sine', 1.2, 0.06), 240);
  },
  scanPulse() {
    this.playTone(880, 'triangle', 0.15, 0.04);
  },
  complete() {
    this.playTone(523.25, 'sine', 0.5, 0.08); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.5, 0.08), 150); // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.5, 0.08), 300); // G5
    setTimeout(() => this.playTone(1046.50, 'sine', 0.9, 0.1), 450); // C6
  }
};

// Toast notification helper
function showToast(message, duration = 4000) {
  let toast = document.getElementById('aura-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'aura-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-primary)" stroke-width="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');
  SoundFX.chime();
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header Scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      document.body.classList.toggle('mobile-menu-open');
    });
  }

  // FAQ Accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherContent = other.querySelector('.faq-content');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });
        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
          SoundFX.scanPulse();
        }
      });
    }
  });

  // Newsletter Form
  const newsletterForms = document.querySelectorAll('.newsletter-box');
  newsletterForms.forEach(form => {
    const btn = form.querySelector('.newsletter-btn');
    const input = form.querySelector('.newsletter-input');
    if (btn && input) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (input.value && input.value.includes('@')) {
          showToast(`Astral dispatch subscription confirmed for ${input.value}`);
          input.value = '';
        } else {
          showToast('Please enter a valid celestial email address.');
        }
      });
    }
  });
});

window.SoundFX = SoundFX;
window.showToast = showToast;
