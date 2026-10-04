/**
 * Hastarekha Archive — Scanner & Specimen Examination Controller
 * Folio VII • Hasta Pariksha Engine
 * Handles specimen upload, camera stream, archival examination frame,
 * historical progress sequence, and navigation to the personal folio.
 */

document.addEventListener('DOMContentLoaded', () => {
  const videoFeed = document.getElementById('camera-feed');
  const imageFeed = document.getElementById('image-feed');
  const scanBtn = document.getElementById('btn-scan-trigger');
  const uploadInput = document.getElementById('file-upload-input');
  const uploadBtn = document.getElementById('btn-upload-trigger');
  const polarityBtns = document.querySelectorAll('.polarity-btn');
  const scanningOverlay = document.getElementById('scanning-overlay');
  const scanStatusMsg = document.getElementById('scan-animated-msg');
  const statusItems = document.querySelectorAll('.scan-status-item');
  const examinationFrame = document.querySelector('.archival-examination-frame');
  const specimenPlate = document.getElementById('specimen-plate-container');

  let currentPolarity = 'right'; // default to right hand (कर्मक)
  let isScanning = false;
  let cameraStream = null;

  // Polarity switch
  polarityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      polarityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPolarity = btn.dataset.polarity || 'right';
      const label = currentPolarity === 'right' ? 'दायां हाथ (कर्मक)' : 'बायां हाथ (अकर्मक)';
      if (window.SoundFX) window.SoundFX.scanPulse();
      if (window.showToast) window.showToast(`हस्त ध्रुवता चयनित: ${label}`);
    });
  });

  // Camera initialization with polite fallback
  async function initCamera() {
    // By default, show calibrated manuscript specimen
    showFallbackImage();
  }

  function showFallbackImage() {
    if (videoFeed) videoFeed.style.display = 'none';
    if (imageFeed) {
      imageFeed.style.display = 'block';
      // If user had previously uploaded in session, restore it
      const savedImg = sessionStorage.getItem('aurapalm_scan_image');
      if (savedImg) {
        imageFeed.src = savedImg;
      } else {
        imageFeed.src = '/images/palm-base.jpg';
      }
    }
  }

  // Camera toggle if user explicitly clicks camera button
  const cameraBtn = document.getElementById('btn-toggle-camera');
  if (cameraBtn) {
    cameraBtn.addEventListener('click', async () => {
      if (videoFeed && videoFeed.style.display === 'block') {
        // Turn off camera
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
          cameraStream = null;
        }
        showFallbackImage();
        cameraBtn.classList.remove('active');
      } else {
        // Turn on camera
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
            cameraBtn.classList.add('active');
            if (window.showToast) window.showToast('हस्त परीक्षण हेतु कैमरा सक्रिय किया गया।');
          } catch (err) {
            console.warn('Camera access denied or unavailable', err);
            if (window.showToast) window.showToast('कैमरा उपलब्ध नहीं। अभिलेखीय प्रतिदर्श प्रयुक्त हो रहा है।');
            showFallbackImage();
          }
        }
      }
    });
  }

  // File upload trigger & handling
  if (uploadBtn && uploadInput) {
    uploadBtn.addEventListener('click', () => uploadInput.click());
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          if (window.showToast) window.showToast('कृपया 10 MB से कम आकार का चित्र चुनें।');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          if (videoFeed) videoFeed.style.display = 'none';
          if (imageFeed) {
            imageFeed.style.display = 'block';
            imageFeed.src = dataUrl;
          }
          // Store custom image in session
          try {
            sessionStorage.setItem('aurapalm_scan_image', dataUrl);
          } catch (storageErr) {
            console.warn('Image storage limit reached, proceeding in memory', storageErr);
          }

          if (specimenPlate) {
            specimenPlate.classList.add('specimen-loaded');
          }
          if (window.SoundFX) window.SoundFX.scanPulse();
          if (window.showToast) window.showToast('हस्तचिह्न सफलता पूर्वक स्वीकार किया गया। पठन प्रारम्भ करें।');
          
          // Scroll smoothly to examination preview if on mobile
          if (window.innerWidth < 768 && examinationFrame) {
            examinationFrame.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Drag and drop onto upload box
  const dropBox = document.getElementById('manuscript-upload-plate');
  if (dropBox && uploadInput) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropBox.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropBox.classList.add('drag-active');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropBox.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropBox.classList.remove('drag-active');
      }, false);
    });

    dropBox.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        uploadInput.files = files;
        const event = new Event('change', { bubbles: true });
        uploadInput.dispatchEvent(event);
      }
    });
  }

  // Scanning Experience Flow (Non-futuristic, Vedic manuscript examination)
  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      if (isScanning) return;
      isScanning = true;
      scanBtn.disabled = true;
      scanBtn.classList.add('scanning-active');

      // Reveal scanning overlay over the examination frame
      if (scanningOverlay) {
        scanningOverlay.classList.add('active');
      }
      if (examinationFrame) {
        examinationFrame.classList.add('is-scanning');
      }

      if (window.SoundFX) window.SoundFX.scanPulse();

      // Sequence of historical animated messages and statuses
      // 1. Initial: रेखा-संरचना अंकित की जा रही है...
      if (scanStatusMsg) {
        scanStatusMsg.innerText = 'रेखा-संरचना अंकित की जा रही है...';
      }

      // 1.0s: Step 1 complete -> Step 2
      setTimeout(() => {
        const item1 = document.getElementById('scan-status-lines');
        if (item1) {
          item1.classList.add('done');
          item1.querySelector('.status-glyph').innerText = '✓';
        }
        if (scanStatusMsg) {
          scanStatusMsg.innerText = 'प्रमुख पर्वतों का निरीक्षण...';
        }
        if (window.SoundFX) window.SoundFX.scanPulse();
      }, 1000);

      // 2.0s: Step 2 complete -> Step 3
      setTimeout(() => {
        const item2 = document.getElementById('scan-status-mounts');
        if (item2) {
          item2.classList.add('done');
          item2.querySelector('.status-glyph').innerText = '✓';
        }
        const item3 = document.getElementById('scan-status-direction');
        if (item3) {
          item3.classList.add('done');
          item3.querySelector('.status-glyph').innerText = '✓';
        }
        if (scanStatusMsg) {
          scanStatusMsg.innerText = 'प्राचीन संदर्भों से मिलान...';
        }
        if (window.SoundFX) window.SoundFX.chime();
      }, 2000);

      // 2.9s: Step 4
      setTimeout(() => {
        const item4 = document.getElementById('scan-status-signs');
        if (item4) {
          item4.classList.add('done');
          item4.querySelector('.status-glyph').innerText = '✓';
        }
        if (scanStatusMsg) {
          scanStatusMsg.innerText = 'व्यक्तिगत अभिलेख तैयार किया जा रहा है...';
        }
        if (window.SoundFX) window.SoundFX.chime();
      }, 2900);

      // 3.8s: Complete & Navigate to Personal Folio
      setTimeout(() => {
        if (window.SoundFX) window.SoundFX.complete();

        const scanPayload = {
          polarity: currentPolarity,
          date: new Date().toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
          score: 94,
          timestamp: Date.now()
        };
        sessionStorage.setItem('aurapalm_scan_result', JSON.stringify(scanPayload));

        if (window.showToast) window.showToast('हस्तपरीक्षा पूर्ण! अभिलेख पृष्ठ खोला जा रहा है...');
        setTimeout(() => {
          window.location.href = 'report.html';
        }, 600);
      }, 3800);
    });
  }

  // Attempt camera / fallback on load
  initCamera();
});
