/**
 * AuraPalm Interactive Scanner Controller
 * Chiromancy Engine 3.4
 * Handles camera stream, photo upload, biometric HUD tracking, step transitions, and synthesis.
 */

document.addEventListener('DOMContentLoaded', () => {
  const videoFeed = document.getElementById('camera-feed');
  const imageFeed = document.getElementById('image-feed');
  const scanBtn = document.getElementById('btn-scan-trigger');
  const uploadInput = document.getElementById('file-upload-input');
  const uploadBtn = document.getElementById('btn-upload-trigger');
  const toggleFlashBtn = document.getElementById('btn-toggle-flash');
  const toggleReticleBtn = document.getElementById('btn-toggle-reticle');
  const polarityBtns = document.querySelectorAll('.polarity-btn');
  const resonanceFill = document.getElementById('resonance-bar-fill');
  const resonanceVal = document.getElementById('resonance-percent-val');
  const statusCrease = document.getElementById('status-crease');
  const statusVectors = document.getElementById('status-vectors');
  const stepChips = document.querySelectorAll('.step-chip');

  let currentPolarity = 'right'; // default to right hand
  let currentGender = 'all';
  let isScanning = false;
  let cameraStream = null;

  // Polarity switch
  polarityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      polarityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPolarity = btn.dataset.polarity;
      SoundFX.scanPulse();
      showToast(`Active hand polarity set to ${btn.dataset.polarity.toUpperCase()} HAND`);
    });
  });

  // Camera initialization with polite fallback
  async function initCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        cameraStream = stream;
        if (videoFeed) {
          videoFeed.srcObject = stream;
          videoFeed.style.display = 'block';
          if (imageFeed) imageFeed.style.display = 'none';
        }
      } catch (err) {
        console.warn('Camera access denied or unavailable, using calibrated studio palm asset.', err);
        showFallbackImage();
      }
    } else {
      showFallbackImage();
    }
  }

  function showFallbackImage() {
    if (videoFeed) videoFeed.style.display = 'none';
    if (imageFeed) {
      imageFeed.style.display = 'block';
      imageFeed.src = 'images/palm-base.jpg';
    }
  }

  // File upload trigger
  if (uploadBtn && uploadInput) {
    uploadBtn.addEventListener('click', () => uploadInput.click());
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (videoFeed) videoFeed.style.display = 'none';
          if (imageFeed) {
            imageFeed.style.display = 'block';
            imageFeed.src = event.target.result;
          }
          SoundFX.scanPulse();
          showToast('Custom palm specimen uploaded. Biometric vectors locked.');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Scanner Laser & HUD Reticle Toggles
  if (toggleReticleBtn) {
    toggleReticleBtn.addEventListener('click', () => {
      const hud = document.querySelector('.hud-overlay');
      if (hud) {
        hud.style.opacity = hud.style.opacity === '0.2' ? '1' : '0.2';
        SoundFX.scanPulse();
      }
    });
  }

  if (toggleFlashBtn) {
    toggleFlashBtn.addEventListener('click', () => {
      const chamber = document.querySelector('.scanner-chamber');
      if (chamber) {
        chamber.classList.toggle('flash-boost');
        SoundFX.scanPulse();
        showToast('Spectral lighting compensation adjusted.');
      }
    });
  }

  // Scan & Align Meridian Execution Flow
  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      if (isScanning) return;
      isScanning = true;
      scanBtn.disabled = true;
      scanBtn.innerHTML = `
        <svg class="spin-anim" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <span>Synthesizing Palm Meridiams...</span>
      `;

      SoundFX.scanPulse();

      // Step 2 to Step 3: Meridian Detection
      setTimeout(() => {
        updateStep(3, 'Meridian Detection');
        if (resonanceFill) resonanceFill.style.width = '64%';
        if (resonanceVal) resonanceVal.innerText = '64%';
        if (statusCrease) {
          statusCrease.innerText = 'Mapped (98.4%)';
          statusCrease.className = 'metric-status status-identified';
        }
        SoundFX.scanPulse();
      }, 1000);

      // Step 3 to Step 4: Destiny Synthesis
      setTimeout(() => {
        updateStep(4, 'Destiny Synthesis');
        if (resonanceFill) resonanceFill.style.width = '96%';
        if (resonanceVal) resonanceVal.innerText = '96%';
        if (statusVectors) {
          statusVectors.innerText = 'Synthesized';
          statusVectors.className = 'metric-status status-identified';
        }
        SoundFX.chime();
      }, 2200);

      // Complete & navigate to Destiny Blueprint Report
      setTimeout(() => {
        if (resonanceFill) resonanceFill.style.width = '100%';
        if (resonanceVal) resonanceVal.innerText = '100%';
        SoundFX.complete();

        // Save scan session payload
        const scanPayload = {
          polarity: currentPolarity,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          score: 94,
          timestamp: Date.now()
        };
        sessionStorage.setItem('aurapalm_scan_result', JSON.stringify(scanPayload));

        showToast('Meridian decoding complete! Generating Sacred Destiny Blueprint...');
        setTimeout(() => {
          window.location.href = 'report.html';
        }, 800);
      }, 3400);
    });
  }

  function updateStep(stepIndex, title) {
    stepChips.forEach((chip, i) => {
      chip.classList.remove('active');
      if (i + 1 < stepIndex) {
        chip.classList.add('completed');
        const statusEl = chip.querySelector('.step-status');
        if (statusEl) statusEl.innerText = 'Completed';
      } else if (i + 1 === stepIndex) {
        chip.classList.add('active');
        const statusEl = chip.querySelector('.step-status');
        if (statusEl) statusEl.innerText = 'Active Stage';
      }
    });
  }

  // Attempt camera on load
  initCamera();
});
