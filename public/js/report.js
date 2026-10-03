/**
 * AuraPalm Sacred Destiny Blueprint Report Controller
 * Handles interactive line inspector, bilingual English/Hindi interpretations,
 * PDF language selection modal, and share functionality.
 */

import { getLanguage, setLanguage } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  const lineToggles = document.querySelectorAll('.hand-line-toggle');
  const svgPaths = document.querySelectorAll('.line-path-svg');
  const inspectorDetailBox = document.getElementById('inspector-detail-box');
  const btnDownloadPdf = document.getElementById('btn-download-pdf');
  const btnShareSummary = document.getElementById('btn-share-summary');
  const shareModal = document.getElementById('share-modal');
  const closeShareModal = document.getElementById('close-share-modal');
  const copyShareLink = document.getElementById('btn-copy-share-link');

  // PDF Language Modal Elements
  const pdfLangModal = document.getElementById('pdf-lang-modal');
  const closePdfLangModal = document.getElementById('close-pdf-lang-modal');
  const btnExportPdfEn = document.getElementById('btn-export-pdf-en');
  const btnExportPdfHi = document.getElementById('btn-export-pdf-hi');

  // Report Language Switcher buttons directly on report
  const btnReportLangEn = document.getElementById('btn-report-lang-en');
  const btnReportLangHi = document.getElementById('btn-report-lang-hi');

  let currentLineKey = 'heart';

  // Bilingual Palm Line Database (English & Vedic Hindi)
  const lineData = {
    en: {
      heart: {
        name: 'Heart Line (Resonance & Devotion)',
        element: 'Water • Element of Soul',
        confidence: '98.4% Confidence • Deep Curvature',
        summary: 'Your Heart Line sweeps upwards in a graceful arc towards the Mount of Jupiter. This signifies high emotional vulnerability balanced by deep devotion, intuitive empathy, and an unbreakable standard for spiritual partnership.',
        timing: 'Key Karmic Harmonization: Ages 27 to 34.'
      },
      head: {
        name: 'Head Line (Intellect & Visionary Bifurcation)',
        element: 'Air • Element of Mind',
        confidence: '97.2% Confidence • Dual Fork Termination',
        summary: 'Your Head Line demonstrates a classic Writer’s Fork (Mercury Bifurcation) terminating between Upper Mars and Moon mounts. This grants both analytical acumen and vivid lateral imagination—ideal for synthesis, philosophy, and strategic architecture.',
        timing: 'Major Creative Renaissance: Ages 31 to 38.'
      },
      life: {
        name: 'Life Line (Vitality Arc & Prana Shield)',
        element: 'Earth • Element of Somatic Stamina',
        confidence: '96.8% Confidence • Wide Lunar Sweep',
        summary: 'An unbroken, deeply etched curve encompassing the Mount of Venus with a secondary sister line (Mars Sister Line). This represents extraordinary physical resilience, rapid immune recovery, and an innate spiritual safeguard during crises.',
        timing: 'Peak Grounding & Vital Prana: Ages 24 through 68+.'
      },
      fate: {
        name: 'Fate Line (Saturnian Dharma & Destiny Axis)',
        element: 'Ether • Element of Vocation',
        confidence: '94.6% Confidence • Lunar Origin',
        summary: 'Rising from the Mount of the Moon towards Saturn, your Fate Line indicates a destiny driven by public magnetism, creative autonomy, and synchronistic mentors rather than rigid hereditary family traditions.',
        timing: 'Breakthrough Epoch: Ages 32 to 37.'
      },
      apollo: {
        name: 'Apollo / Sun Line & Planetary Mounts',
        element: 'Fire • Solar Radiance',
        confidence: '92.1% Confidence • Ascending Pillar',
        summary: 'Clear vertical striations ascending beneath the ring finger signify recognized mastery, aesthetic appreciation, and financial elevation through personal authenticity and sacred creative projects.',
        timing: 'Recognition Zenith: Ages 36 onward.'
      }
    },
    hi: {
      heart: {
        name: 'हृदय रेखा (प्रेम, दांपत्य व भावनात्मक योग)',
        element: 'जल तत्व • आत्मिक समर्पण',
        confidence: '98.4% सटीकता • गुरु पर्वत की ओर झुकाव',
        summary: 'आपकी हृदय रेखा एक सुंदर चाप बनाकर देवगुरु बृहस्पति के पर्वत की ओर अग्रसर है। यह निश्छल प्रेम, उच्च नैतिक मूल्य, गहरी संवेदनशीलता और दांपत्य जीवन में पवित्र निष्ठा का सूचक है।',
        timing: 'मुख्य कर्म चक्र फल: 27 से 34 वर्ष की आयु में।'
      },
      head: {
        name: 'मस्तिष्क रेखा (बुद्धि, विवेक व निर्णय शक्ति)',
        element: 'वायु तत्व • प्रखर मेधा',
        confidence: '97.2% सटीकता • बुध द्विमुख सिरा',
        summary: 'आपकी मस्तिष्क रेखा का अंत चंद्र व मंगल पर्वत के संगम पर द्विमुखी होकर समाप्त होता है। यह तार्किक बुद्धि के साथ-साथ उत्कृष्ट दूरदर्शिता, रचनात्मक लेखन और रणनीतिक व्यापारिक दक्षता प्रदान करता है।',
        timing: 'बौद्धिक व व्यापारिक उत्कर्ष: 31 से 38 वर्ष।'
      },
      life: {
        name: 'जीवन रेखा (प्राण शक्ति व स्वास्थ्य बल)',
        element: 'पृथ्वी तत्व • उत्तम स्वास्थ्य',
        confidence: '96.8% सटीकता • शुक्र पर्वत को घेरती रेखा',
        summary: 'शुक्र पर्वत को घेरती हुई स्पष्ट, निर्दोष जीवन रेखा के साथ सहायक मंगल रेखा उपस्थित है। यह उत्कृष्ट रोग प्रतिरोधक क्षमता, दीर्घायु बल और संकटों में अदृश्य दैवीय रक्षा का प्रतीक है।',
        timing: 'स्थिर ऊर्जा व स्वास्थ्य काल: 24 से 68+ वर्ष।'
      },
      fate: {
        name: 'भाग्य रेखा (करियर, आजीविका व धन योग)',
        element: 'आकाश तत्व • स्वअर्जित सफलता',
        confidence: '94.6% सटीकता • चंद्र पर्वत से उद्गम',
        summary: 'चंद्र पर्वत से शनि पर्वत तक जाने वाली स्पष्ट भाग्य रेखा यह दर्शाती है कि आपका भाग्योदय जन-सहयोग, कला, व्यापार अथवा स्वतंत्र उद्यम द्वारा होगा। आपको पैतृक सीमाओं से परे अपार यश प्राप्त होगा।',
        timing: 'महत्वपूर्ण भाग्योदय काल: 32 से 37 वर्ष।'
      },
      apollo: {
        name: 'सूर्य रेखा (मान-सम्मान, पद व राजकीय ख्याति)',
        element: 'अग्नि तत्व • सूर्य तेज',
        confidence: '92.1% सटीकता • ऊर्ध्वगामी रेखा',
        summary: 'अनामिका उंगली के नीचे स्पष्ट सूर्य रेखा समाज में प्रतिष्ठा, उच्च पद, वित्तीय संपन्नता और आपकी प्रतिभा को राष्ट्रीय पहचान दिलाने का सशक्त योग बनाती है।',
        timing: 'सर्वोच्च सम्मान योग: 36 वर्ष से आगे।'
      }
    }
  };

  function updateReportLangUI(lang) {
    if (btnReportLangEn && btnReportLangHi) {
      if (lang === 'hi') {
        btnReportLangHi.classList.add('btn-primary');
        btnReportLangHi.classList.remove('btn-secondary');
        btnReportLangEn.classList.remove('btn-primary');
        btnReportLangEn.classList.add('btn-secondary');
      } else {
        btnReportLangEn.classList.add('btn-primary');
        btnReportLangEn.classList.remove('btn-secondary');
        btnReportLangHi.classList.remove('btn-primary');
        btnReportLangHi.classList.add('btn-secondary');
      }
    }

    // Update toggles labels if in Hindi
    lineToggles.forEach(btn => {
      const line = btn.dataset.line;
      if (lang === 'hi') {
        if (line === 'heart') btn.innerText = 'हृदय रेखा (भावना)';
        if (line === 'head') btn.innerText = 'मस्तिष्क रेखा (बुद्धि)';
        if (line === 'life') btn.innerText = 'जीवन रेखा (स्वास्थ्य)';
        if (line === 'fate') btn.innerText = 'भाग्य रेखा (धन)';
        if (line === 'apollo') btn.innerText = 'सूर्य व ग्रह पर्वत';
      } else {
        if (line === 'heart') btn.innerText = 'Heart Line (Resonance)';
        if (line === 'head') btn.innerText = 'Head Line (Intellect)';
        if (line === 'life') btn.innerText = 'Life Line (Vitality)';
        if (line === 'fate') btn.innerText = 'Fate Line (Destiny)';
        if (line === 'apollo') btn.innerText = 'Apollo & Mounts';
      }
    });

    selectLine(currentLineKey);
  }

  function selectLine(lineKey) {
    currentLineKey = lineKey;
    const lang = getLanguage();
    const localizedData = (lineData[lang] || lineData.en)[lineKey];

    // Update toggle buttons
    lineToggles.forEach(btn => {
      if (btn.dataset.line === lineKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update SVG paths
    svgPaths.forEach(path => {
      if (path.dataset.line === lineKey) {
        path.classList.add('active');
        path.setAttribute('stroke-width', '6');
      } else {
        path.classList.remove('active');
        path.setAttribute('stroke-width', '3');
      }
    });

    // Update detail box
    if (localizedData && inspectorDetailBox) {
      inspectorDetailBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;">
          <h4 style="color:var(--color-gold-primary); font-size:1.05rem;">${localizedData.name}</h4>
          <span style="font-size:0.72rem; color:var(--color-cyan-biometric); font-weight:700;">${localizedData.confidence}</span>
        </div>
        <p style="font-size:0.86rem; color:var(--color-text-secondary); line-height:1.6; margin-bottom:10px;">${localizedData.summary}</p>
        <div style="font-size:0.78rem; color:var(--color-gold-primary); font-weight:600;">✦ ${localizedData.timing}</div>
      `;
      if (window.SoundFX) window.SoundFX.scanPulse();
    }
  }

  // Bind toggle click
  lineToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      selectLine(btn.dataset.line);
    });
  });

  // Bind SVG line click
  svgPaths.forEach(path => {
    path.addEventListener('click', () => {
      selectLine(path.dataset.line);
    });
  });

  // Report Language Switcher Event Listeners
  if (btnReportLangEn) {
    btnReportLangEn.addEventListener('click', () => {
      setLanguage('en');
      updateReportLangUI('en');
      if (window.showToast) window.showToast('Report updated to English.');
    });
  }

  if (btnReportLangHi) {
    btnReportLangHi.addEventListener('click', () => {
      setLanguage('hi');
      updateReportLangUI('hi');
      if (window.showToast) window.showToast('रिपोर्ट हिन्दी में परिवर्तित कर दी गई है।');
    });
  }

  // Listen to global language change
  window.addEventListener('aurapalm:langchange', (e) => {
    updateReportLangUI(e.detail.lang);
  });

  // Initialize line inspector
  updateReportLangUI(getLanguage());

  // PDF Export Flow with Language Prompt Modal
  if (btnDownloadPdf && pdfLangModal) {
    btnDownloadPdf.addEventListener('click', () => {
      pdfLangModal.classList.add('open');
      if (window.SoundFX) window.SoundFX.chime();
    });
  }

  if (closePdfLangModal && pdfLangModal) {
    closePdfLangModal.addEventListener('click', () => {
      pdfLangModal.classList.remove('open');
    });
  }

  // Export English PDF
  if (btnExportPdfEn) {
    btnExportPdfEn.addEventListener('click', () => {
      setLanguage('en');
      updateReportLangUI('en');
      pdfLangModal.classList.remove('open');
      if (window.SoundFX) window.SoundFX.chime();
      setTimeout(() => {
        window.print();
      }, 300);
    });
  }

  // Export Hindi PDF
  if (btnExportPdfHi) {
    btnExportPdfHi.addEventListener('click', () => {
      setLanguage('hi');
      updateReportLangUI('hi');
      pdfLangModal.classList.remove('open');
      if (window.SoundFX) window.SoundFX.chime();
      setTimeout(() => {
        window.print();
      }, 300);
    });
  }

  // Share Cosmic Summary
  if (btnShareSummary && shareModal) {
    btnShareSummary.addEventListener('click', () => {
      shareModal.classList.add('open');
      if (window.SoundFX) window.SoundFX.chime();
    });
  }

  if (closeShareModal && shareModal) {
    closeShareModal.addEventListener('click', () => {
      shareModal.classList.remove('open');
    });
  }

  if (copyShareLink) {
    copyShareLink.addEventListener('click', () => {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl).then(() => {
        if (window.showToast) window.showToast('Sacred Blueprint link copied to clipboard!');
      }).catch(() => {
        if (window.showToast) window.showToast('Link ready: ' + shareUrl);
      });
    });
  }
});
