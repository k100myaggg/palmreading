/**
 * Hastarekha Archive — Scanner & Specimen Examination Controller
 * Folio VII • Hasta Pariksha Engine
 * Handles specimen upload, camera stream, archival examination frame,
 * real Gemini AI Vision analysis, and navigation to the personal folio.
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
  const examinationFrame = document.querySelector('.archival-examination-frame');
  const specimenPlate = document.getElementById('specimen-plate-container');

  // API Key Modal Elements
  const btnOpenApiKeyModal = document.getElementById('btn-open-apikey-modal');
  const apiKeyModal = document.getElementById('apikey-modal');
  const closeApiKeyModal = document.getElementById('close-apikey-modal');
  const btnSaveApiKey = document.getElementById('btn-save-apikey');
  const btnClearApiKey = document.getElementById('btn-clear-apikey');
  const inputGeminiKey = document.getElementById('input-gemini-key');
  const apiKeyStatusText = document.getElementById('apikey-status-text');

  let currentPolarity = 'right'; // default to right hand (कर्मक)
  let isScanning = false;
  let cameraStream = null;

  function updateApiKeyStatusUI() {
    const currentKey = window.AiPalmAnalyzer ? window.AiPalmAnalyzer.getApiKey() : '';
    if (apiKeyStatusText) {
      if (currentKey) {
        apiKeyStatusText.innerHTML = '✨ AI विज़न (सक्रिय)';
        apiKeyStatusText.parentElement.classList.add('key-active');
      } else {
        apiKeyStatusText.innerHTML = '⚙️ AI विज़न कुंजी (सेटअप)';
        apiKeyStatusText.parentElement.classList.remove('key-active');
      }
    }
  }
  updateApiKeyStatusUI();

  // API Key Modal Handlers
  if (btnOpenApiKeyModal && apiKeyModal) {
    btnOpenApiKeyModal.addEventListener('click', () => {
      if (inputGeminiKey && window.AiPalmAnalyzer) {
        inputGeminiKey.value = window.AiPalmAnalyzer.getApiKey();
      }
      apiKeyModal.classList.add('open');
      if (window.SoundFX) window.SoundFX.chime();
    });
  }

  if (closeApiKeyModal && apiKeyModal) {
    closeApiKeyModal.addEventListener('click', () => {
      apiKeyModal.classList.remove('open');
    });
  }

  if (btnSaveApiKey && inputGeminiKey) {
    btnSaveApiKey.addEventListener('click', () => {
      const keyVal = inputGeminiKey.value.trim();
      if (!keyVal) {
        if (window.showToast) window.showToast('कृपया मान्य Gemini API Key दर्ज करें।');
        return;
      }
      if (window.AiPalmAnalyzer) {
        window.AiPalmAnalyzer.setApiKey(keyVal);
      }
      updateApiKeyStatusUI();
      if (apiKeyModal) apiKeyModal.classList.remove('open');
      if (window.showToast) window.showToast('✨ Gemini AI विज़न कुंजी सफलतापूर्वक सुरक्षित की गई!');
      if (window.SoundFX) window.SoundFX.complete();
    });
  }

  if (btnClearApiKey) {
    btnClearApiKey.addEventListener('click', () => {
      if (window.AiPalmAnalyzer) {
        window.AiPalmAnalyzer.setApiKey('');
      }
      if (inputGeminiKey) inputGeminiKey.value = '';
      updateApiKeyStatusUI();
      if (apiKeyModal) apiKeyModal.classList.remove('open');
      if (window.showToast) window.showToast('कुंजी हटाई गई — डिफ़ॉल्ट शास्त्रीय मोड सक्रिय।');
    });
  }

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
    showFallbackImage();
  }

  function showFallbackImage() {
    if (videoFeed) videoFeed.style.display = 'none';
    if (imageFeed) {
      imageFeed.style.display = 'block';
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
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
        showFallbackImage();
        cameraBtn.innerHTML = '<span>कैनवास दृश्य</span>';
        if (window.showToast) window.showToast('कैमरा बंद किया गया।');
        return;
      }

      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('getUserMedia not supported');
        }
        cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        if (videoFeed) {
          videoFeed.srcObject = cameraStream;
          videoFeed.style.display = 'block';
          if (imageFeed) imageFeed.style.display = 'none';
        }
        cameraBtn.innerHTML = '<span>कैमरा बंद करें</span>';
        if (window.SoundFX) window.SoundFX.scanPulse();
        if (window.showToast) window.showToast('हस्त परीक्षण हेतु सीधा कैमरा सक्रिय।');
      } catch (err) {
        console.warn('Camera access declined or unavailable', err);
        showFallbackImage();
        if (window.showToast) {
          window.showToast('कैमरा अनुपलब्ध। कृपया हथेली का चित्र सीधे अपलोड करें।');
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

  // Scanning Experience Flow with Real AI Multimodal Vision Integration
  if (scanBtn) {
    scanBtn.addEventListener('click', async () => {
      if (isScanning) return;
      isScanning = true;
      scanBtn.disabled = true;
      scanBtn.classList.add('scanning-active');

      if (scanningOverlay) scanningOverlay.classList.add('active');
      if (examinationFrame) examinationFrame.classList.add('is-scanning');

      if (window.SoundFX) window.SoundFX.scanPulse();

      // Get current palm image data
      let palmImageData = sessionStorage.getItem('aurapalm_scan_image') || '';
      if (!palmImageData && imageFeed && imageFeed.src) {
        palmImageData = imageFeed.src;
      }

      // Step 1: Initial message
      if (scanStatusMsg) scanStatusMsg.innerText = 'हस्तचिह्न का विज़न स्कैन प्रारम्भ...';

      // Step 2 (1s): Line structure inspection
      setTimeout(() => {
        const item1 = document.getElementById('scan-status-lines');
        if (item1) {
          item1.classList.add('done');
          item1.querySelector('.status-glyph').innerText = '✓';
        }
        if (scanStatusMsg) scanStatusMsg.innerText = 'प्रमुख रेखाओं (आयु, मति, हृदय, भाग्य) का अंकन...';
        if (window.SoundFX) window.SoundFX.scanPulse();
      }, 1000);

      // Step 3 (2s): Mounts & Polarity
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
        if (scanStatusMsg) scanStatusMsg.innerText = 'वैदिक सामुद्रिक शास्त्र संहिता से वास्तविक मिलान...';
        if (window.SoundFX) window.SoundFX.chime();
      }, 2000);

      // Trigger AI Analysis in parallel
      let aiResult = null;
      try {
        if (window.AiPalmAnalyzer && palmImageData.startsWith('data:image/')) {
          aiResult = await window.AiPalmAnalyzer.analyze(palmImageData, currentPolarity);
        }
      } catch (err) {
        console.warn('AI analysis execution notice:', err);
      }

      // Step 4 (3s): Compiling manuscript
      setTimeout(() => {
        const item4 = document.getElementById('scan-status-signs');
        if (item4) {
          item4.classList.add('done');
          item4.querySelector('.status-glyph').innerText = '✓';
        }
        if (scanStatusMsg) {
          scanStatusMsg.innerText = aiResult && aiResult.isRealAi 
            ? '✨ वास्तविक AI विज़न विश्लेषण संकलित हो गया!' 
            : 'व्यक्तिगत पाण्डुलिपि अभिलेख तैयार किया जा रहा है...';
        }
        if (window.SoundFX) window.SoundFX.chime();
      }, 3000);

      // Final Navigation (3.8s)
      setTimeout(() => {
        if (window.SoundFX) window.SoundFX.complete();

        const scanPayload = {
          polarity: currentPolarity,
          date: new Date().toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
          score: (aiResult && aiResult.isRealAi && aiResult.data && aiResult.data.harmonyScore) ? aiResult.data.harmonyScore : 94,
          isRealAi: !!(aiResult && aiResult.isRealAi),
          timestamp: Date.now()
        };
        sessionStorage.setItem('aurapalm_scan_result', JSON.stringify(scanPayload));

        if (aiResult && aiResult.isRealAi && aiResult.data) {
          sessionStorage.setItem('aurapalm_ai_reading', JSON.stringify(aiResult.data));
          if (window.showToast) window.showToast('✨ आपकी हथेली का वास्तविक AI विज़न विश्लेषण पूर्ण!');
        } else {
          sessionStorage.removeItem('aurapalm_ai_reading');
          if (window.showToast) window.showToast('हस्तपरीक्षा पूर्ण! शास्त्रीय अभिलेख तैयार है।');
        }

        setTimeout(() => {
          window.location.href = 'report.html';
        }, 500);
      }, 3800);
    });
  }

  initCamera();
});
