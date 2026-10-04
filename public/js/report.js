/**
 * Hastarekha Archive — Personal Folio Report Controller
 * Folio Ref: PERSONAL FOLIO • HASTA 001
 * Manages annotated palm inspection, archival folio panels,
 * bilingual rendering, PDF export modal, and summary transmission.
 */

import { getLanguage, setLanguage } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  const lineToggles = document.querySelectorAll('.hand-line-toggle');
  const svgPaths = document.querySelectorAll('.line-path-svg');
  const numberedMarkers = document.querySelectorAll('.annotated-marker-pin');
  const inspectorDetailBox = document.getElementById('inspector-detail-box');
  const palmImg = document.getElementById('annotated-palm-img');
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

  // Language Switcher Buttons
  const btnReportLangEn = document.getElementById('btn-report-lang-en');
  const btnReportLangHi = document.getElementById('btn-report-lang-hi');

  let currentLineKey = 'heart';

  // Restore uploaded image from session if present
  try {
    const savedImg = sessionStorage.getItem('aurapalm_scan_image');
    if (savedImg && palmImg) {
      palmImg.src = savedImg;
    }
  } catch (err) {
    console.warn('Could not read session image', err);
  }

  // Restore scan session metadata if present
  try {
    const scanDataStr = sessionStorage.getItem('aurapalm_scan_result');
    if (scanDataStr) {
      const scanData = JSON.parse(scanDataStr);
      const polarityBadge = document.getElementById('report-polarity-stamp');
      if (polarityBadge && scanData.polarity) {
        polarityBadge.innerText = scanData.polarity === 'left' ? 'वाम हस्त (बायां • अकर्मक)' : 'दक्षिण हस्त (दायां • कर्मक)';
      }
    }
  } catch (err) {
    console.warn('Could not parse scan data', err);
  }

  // Archival Palm Line Database (Vedic Samudrika & Classical Archival Interpretation)
  const lineData = {
    hi: {
      life: {
        num: '01',
        name: 'जीवन रेखा — AYUR REKHA',
        element: 'पृथ्वी तत्व • प्राण शक्ति एवं जीवनी ऊर्जा',
        confidence: 'स्पष्ट • निर्दोष चाप • ९६.८% शुद्धता',
        summary: 'शुक्र पर्वत को परिपूर्ण चाप में घेरती हुई यह जीवन रेखा दीर्घायु, सुदृढ़ जीवनी शक्ति तथा शारीरिक रोग प्रतिरोधक क्षमता का प्रत्यक्ष प्रमाण है। मध्य भाग में सूक्ष्म सहायक रेखा (मंगल रेखा) संकटों में दैवीय व कुल संरक्षण प्रदान करती है।',
        timing: 'स्थिर ऊर्जा व स्वास्थ्य काल: २४ से ६८+ वर्ष',
        archival: 'दीर्घ • निर्दोष • गहन'
      },
      head: {
        num: '02',
        name: 'मस्तिष्क रेखा — MATISHA REKHA',
        element: 'वायु तत्व • विवेक, प्रज्ञा एवं निर्णय क्षमता',
        confidence: 'द्विमुख अंत • प्रखर मेधा • ९७.२% शुद्धता',
        summary: 'मस्तिष्क रेखा का अंत चंद्र पर्वत की ओर मुड़कर सुंदर द्विमुखी (बुध-शाखा) बनाता है। यह तार्किक बुद्धि, गहन रचनात्मकता तथा दर्शन व व्यावहारिक उद्यमशीलता के समन्वय का सूचक है।',
        timing: 'बौद्धिक व व्यापारिक उत्कर्ष: ३१ से ३८ वर्ष',
        archival: 'द्विमुखी • प्रखर • संतुलित'
      },
      heart: {
        num: '03',
        name: 'हृदय रेखा — HRIDAYA REKHA',
        element: 'जल तत्व • आत्मीय निष्ठा एवं संवेदनशीलता',
        confidence: 'गुरु पर्वत गामी • ९८.४% शुद्धता',
        summary: 'हृदय रेखा का वक्र देवगुरु बृहस्पति के पर्वत पर प्रतिष्ठित होता है। यह निश्छल प्रेम, उच्च नैतिक आदर्श, निष्कपट निष्ठा तथा आत्मीय संबंधों में पवित्रता का अभिलेखीय लक्षण है।',
        timing: 'महत्वपूर्ण कर्म फल काल: २७ से ३४ वर्ष',
        archival: 'मध्यम • स्पष्ट • संतुलित'
      },
      fate: {
        num: '04',
        name: 'भाग्य रेखा — BHAGYA REKHA',
        element: 'आकाश तत्व • स्वतंत्र उद्यम एवं यश',
        confidence: 'चंद्र पर्वत से उद्गम • ९४.६% शुद्धता',
        summary: 'चंद्र पर्वत से प्रारंभ होकर शनि पर्वत की ओर ऊर्ध्वगामी होने वाली यह भाग्य रेखा दर्शाती है कि आपका भाग्योदय स्वअर्जित प्रतिभा, लोक-स्वीकृति तथा स्वतंत्र निर्णय क्षमता द्वारा होगा।',
        timing: 'महत्वपूर्ण भाग्योदय काल: ३२ से ३७ वर्ष',
        archival: 'ऊर्ध्वगामी • स्वतंत्र • तेजस्वी'
      },
      apollo: {
        num: '05',
        name: 'सूर्य रेखा व पर्वत — SURYA REKHA',
        element: 'अग्नि तत्व • कीर्ति, पद-प्रतिष्ठा एवं संपन्नता',
        confidence: 'ऊर्ध्वमुखी स्तंभ • ९२.१% शुद्धता',
        summary: 'अनामिका उंगली के नीचे ऊर्ध्वमुखी रेखा समाज में सम्मान, स्वाभिमान तथा कलात्मक व वित्तीय स्वायत्तता का संधान करती है।',
        timing: 'सर्वोच्च प्रतिष्ठा योग: ३६ वर्ष से आगे',
        archival: 'स्पष्ट • गरिमामयी • स्थिर'
      }
    },
    en: {
      life: {
        num: '01',
        name: 'AYUR REKHA — Life Line',
        element: 'Earth Element • Somatic Vitality & Prana',
        confidence: 'Deep Etch • Unbroken Arc • 96.8% Fidelity',
        summary: 'Encompassing the Mount of Venus in a graceful, sweeping perimeter, the Ayur Rekha indicates exceptional constitutional endurance, cellular recovery, and generational vitality shield.',
        timing: 'Peak Grounding & Vital Prana: Ages 24 through 68+',
        archival: 'Long • Unbroken • Profound'
      },
      head: {
        num: '02',
        name: 'MATISHA REKHA — Head Line',
        element: 'Air Element • Intellectual Acumen & Strategy',
        confidence: 'Bifurcated Apex • 97.2% Fidelity',
        summary: 'Terminating towards the Mount of Moon with a distinct secondary fork, revealing a mind balanced between analytical rigor and intuitive visionary synthesis.',
        timing: 'Major Intellectual Renaissance: Ages 31 to 38',
        archival: 'Bifurcated • Keen • Balanced'
      },
      heart: {
        num: '03',
        name: 'HRIDAYA REKHA — Heart Line',
        element: 'Water Element • Devotion & Resonance',
        confidence: 'Jupiterian Curvature • 98.4% Fidelity',
        summary: 'Ascending directly toward the Jupiterian mount, indicating high emotional nobility, unyielding loyalty, and an instinctive aversion to superficial entanglements.',
        timing: 'Key Karmic Harmonization: Ages 27 to 34',
        archival: 'Moderate • Lucid • Harmonious'
      },
      fate: {
        num: '04',
        name: 'BHAGYA REKHA — Fate Line',
        element: 'Ether Element • Sovereign Destiny Axis',
        confidence: 'Lunar Inception • 94.6% Fidelity',
        summary: 'Originating from the Mount of Moon, confirming a destiny sculpted through personal charisma, independent enterprise, and public merit rather than hereditary restriction.',
        timing: 'Breakthrough Epoch: Ages 32 to 37',
        archival: 'Ascending • Autonomous • Resplendent'
      },
      apollo: {
        num: '05',
        name: 'SURYA REKHA — Sun Line & Mounts',
        element: 'Fire Element • Honor & Solar Eminence',
        confidence: 'Vertical Pillar • 92.1% Fidelity',
        summary: 'Clear vertical striations ascending beneath the ring finger manifest enduring social honor, creative authority, and lasting financial dignity.',
        timing: 'Recognition Zenith: Ages 36 onward',
        archival: 'Clear • Dignified • Resolute'
      }
    }
  };

  function updateReportLangUI(lang) {
    if (btnReportLangEn && btnReportLangHi) {
      if (lang === 'hi') {
        btnReportLangHi.classList.add('btn-archive-primary');
        btnReportLangHi.classList.remove('btn-archive-secondary');
        btnReportLangEn.classList.remove('btn-archive-primary');
        btnReportLangEn.classList.add('btn-archive-secondary');
      } else {
        btnReportLangEn.classList.add('btn-archive-primary');
        btnReportLangEn.classList.remove('btn-archive-secondary');
        btnReportLangHi.classList.remove('btn-archive-primary');
        btnReportLangHi.classList.add('btn-archive-secondary');
      }
    }

    // Update toggles labels
    lineToggles.forEach(btn => {
      const line = btn.dataset.line;
      if (lang === 'hi') {
        if (line === 'life') btn.innerText = '०१ — जीवन रेखा';
        if (line === 'head') btn.innerText = '०२ — मस्तिष्क रेखा';
        if (line === 'heart') btn.innerText = '०३ — हृदय रेखा';
        if (line === 'fate') btn.innerText = '०४ — भाग्य रेखा';
        if (line === 'apollo') btn.innerText = '०५ — सूर्य रेखा';
      } else {
        if (line === 'life') btn.innerText = '01 — AYUR REKHA';
        if (line === 'head') btn.innerText = '02 — MATISHA REKHA';
        if (line === 'heart') btn.innerText = '03 — HRIDAYA REKHA';
        if (line === 'fate') btn.innerText = '04 — BHAGYA REKHA';
        if (line === 'apollo') btn.innerText = '05 — SURYA REKHA';
      }
    });

    selectLine(currentLineKey);
  }

  function selectLine(lineKey) {
    currentLineKey = lineKey;
    const lang = getLanguage();
    const localizedData = (lineData[lang] || lineData.hi)[lineKey];

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
      } else {
        path.classList.remove('active');
      }
    });

    // Update numbered markers
    numberedMarkers.forEach(marker => {
      if (marker.dataset.line === lineKey) {
        marker.classList.add('active');
      } else {
        marker.classList.remove('active');
      }
    });

    // Update detail box beneath palm
    if (localizedData && inspectorDetailBox) {
      inspectorDetailBox.innerHTML = `
        <div class="inspector-folio-card">
          <div class="detail-header-row">
            <span class="detail-marker-num">${localizedData.num}</span>
            <div class="detail-title-group">
              <h4 class="detail-line-title">${localizedData.name}</h4>
              <span class="detail-element-sub">${localizedData.element}</span>
            </div>
            <span class="detail-archival-stamp">${localizedData.confidence}</span>
          </div>
          <p class="detail-reading-text">${localizedData.summary}</p>
          <div class="detail-footer-row">
            <span class="detail-timing-note">✦ ${localizedData.timing}</span>
            <span class="detail-interpretation-tag">
              <span class="tag-label">अभिलेखीय निष्कर्ष:</span>
              <strong class="tag-val">${localizedData.archival}</strong>
            </span>
          </div>
        </div>
      `;
      if (window.SoundFX) window.SoundFX.scanPulse();
    }
  }

  // Bind toggle clicks
  lineToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      selectLine(btn.dataset.line);
    });
  });

  // Bind SVG line clicks
  svgPaths.forEach(path => {
    path.addEventListener('click', () => {
      selectLine(path.dataset.line);
    });
  });

  // Bind numbered pin clicks
  numberedMarkers.forEach(marker => {
    marker.addEventListener('click', () => {
      selectLine(marker.dataset.line);
    });
  });

  // Language Switcher
  if (btnReportLangEn) {
    btnReportLangEn.addEventListener('click', () => {
      setLanguage('en');
      updateReportLangUI('en');
      if (window.showToast) window.showToast('Folio rendered in English.');
    });
  }

  if (btnReportLangHi) {
    btnReportLangHi.addEventListener('click', () => {
      setLanguage('hi');
      updateReportLangUI('hi');
      if (window.showToast) window.showToast('अभिलेख हिन्दी भाषा में रूपांतरित किया गया।');
    });
  }

  // Initialize
  updateReportLangUI(getLanguage());

  // PDF Export Modal Flow
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

  // Share Cosmic Summary Modal
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
        if (window.showToast) window.showToast('हस्तरेखा अभिलेख का लिंक सुरक्षित कॉपी किया गया!');
      }).catch(() => {
        if (window.showToast) window.showToast('लिंक: ' + shareUrl);
      });
    });
  }

  // ========================================================
  // PHASE 3: REPORT PREVIEW TABS (FOLIO 01, FOLIO 07, FOLIO 14)
  // ========================================================
  const previewTabBtns = document.querySelectorAll('.preview-tab-btn[data-folio-tab]');
  const previewPlates = document.querySelectorAll('.preview-manuscript-plate');

  previewTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = 'tab-' + btn.dataset.folioTab;
      previewTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      previewPlates.forEach(plate => {
        if (plate.id === targetId) {
          plate.classList.add('active');
        } else {
          plate.classList.remove('active');
        }
      });
      if (window.SoundFX) window.SoundFX.click();
    });
  });

  // ========================================================
  // PHASE 3: ARCHIVAL PAYMENT & CONFIRMATION FLOW
  // ========================================================
  const btnPurchaseFolio = document.getElementById('btn-purchase-folio');
  const paymentModal = document.getElementById('payment-modal');
  const closePaymentModal = document.getElementById('close-payment-modal');
  const btnConfirmPayment = document.getElementById('btn-confirm-payment');
  const checkoutStage = document.getElementById('payment-checkout-stage');
  const confirmedStage = document.getElementById('payment-confirmed-stage');
  const inkProgressBar = document.getElementById('confirmed-ink-progress');
  const btnOpenConfirmedFolio = document.getElementById('btn-open-confirmed-folio');
  const downloadExperienceBox = document.getElementById('download-experience-box');
  const btnDownloadHistoricalPdf = document.getElementById('btn-download-historical-pdf');
  const btnViewDigitalFolio = document.getElementById('btn-view-digital-folio');

  // Check if user already purchased
  const hasPurchased = sessionStorage.getItem('hastarekha_paid') === 'true';
  if (hasPurchased && downloadExperienceBox) {
    downloadExperienceBox.style.display = 'block';
  }

  if (btnPurchaseFolio && paymentModal) {
    btnPurchaseFolio.addEventListener('click', () => {
      // Reset stages
      if (checkoutStage) checkoutStage.style.display = 'block';
      if (confirmedStage) confirmedStage.style.display = 'none';
      if (inkProgressBar) inkProgressBar.style.width = '0%';
      if (btnOpenConfirmedFolio) btnOpenConfirmedFolio.disabled = true;

      paymentModal.classList.add('open');
      if (window.SoundFX) window.SoundFX.chime();
    });
  }

  if (closePaymentModal && paymentModal) {
    closePaymentModal.addEventListener('click', () => {
      paymentModal.classList.remove('open');
    });
  }

  // Confirm payment click -> show ARCHIVE ENTRY CONFIRMED
  if (btnConfirmPayment) {
    btnConfirmPayment.addEventListener('click', () => {
      if (window.SoundFX) window.SoundFX.scanPulse();
      if (checkoutStage) checkoutStage.style.display = 'none';
      if (confirmedStage) confirmedStage.style.display = 'block';

      // Animate archival ink progress
      if (inkProgressBar) {
        inkProgressBar.style.width = '0%';
        setTimeout(() => {
          inkProgressBar.style.transition = 'width 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
          inkProgressBar.style.width = '100%';
        }, 100);
      }

      // Activate Open Folio button after 1.8s
      setTimeout(() => {
        if (btnOpenConfirmedFolio) {
          btnOpenConfirmedFolio.disabled = false;
          btnOpenConfirmedFolio.classList.add('pulse-ready');
          if (window.SoundFX) window.SoundFX.chime();
        }
      }, 1900);
    });
  }

  // Open Confirmed Folio CTA
  if (btnOpenConfirmedFolio) {
    btnOpenConfirmedFolio.addEventListener('click', () => {
      sessionStorage.setItem('hastarekha_paid', 'true');
      if (paymentModal) paymentModal.classList.remove('open');

      if (downloadExperienceBox) {
        downloadExperienceBox.style.display = 'block';
        downloadExperienceBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (window.showToast) {
        window.showToast('अभिलेख संख्या HST-2026-0184 सफलतापूर्वक सुरक्षित एवं उपलब्ध!');
      }
    });
  }

  // Download Historical PDF button
  if (btnDownloadHistoricalPdf) {
    btnDownloadHistoricalPdf.addEventListener('click', () => {
      if (window.SoundFX) window.SoundFX.chime();
      window.open('/folio-print.html?print=true', '_blank');
    });
  }

  // Open Digital Folio button
  if (btnViewDigitalFolio) {
    btnViewDigitalFolio.addEventListener('click', () => {
      if (window.SoundFX) window.SoundFX.click();
      window.open('/folio-print.html', '_blank');
    });
  }
});
