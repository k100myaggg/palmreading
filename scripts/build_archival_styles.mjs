import fs from 'node:fs';
import path from 'node:path';

const stylesPath = path.resolve('src/styles/styles.css');
const originalContent = fs.readFileSync(stylesPath, 'utf8');

// Find the start of the Scanner Page
const scannerMarker = '/* ==========================================================================\n   Interactive Scanner Page (Screen 2)';
const scannerIndex = originalContent.indexOf('/* ==========================================================================\n   Interactive Scanner Page (Screen 2)');

if (scannerIndex === -1) {
  console.error('Could not find scanner section marker!');
  process.exit(1);
}

const preservedSection = originalContent.slice(scannerIndex);

const archivalHeaderAndHomepageCSS = `/* ==========================================================================
   हस्तरेखा अभिलेख — HASTAREKHA ARCHIVE
   Master Historical Design System & Archival Stylesheet
   Direction: 18th–19th Century Indian Manuscript Archive + Vedic Scholarly Text
   ========================================================================== */

:root {
  /* ==========================================================================
     Archival Color Palette (As specified in DESIGN.md)
     ========================================================================== */
  --paper: #F7EFE7;            /* Warm Ivory Paper */
  --paper-aged: #EFE1D4;       /* Aged Parchment */
  --paper-light: #FAF4EE;      /* Fresh Folio Page */
  --paper-parchment: #E8D6C6;  /* Light Parchment */
  --paper-deep: #D8C1AD;       /* Deep Parchment */

  --ink: #241B17;              /* Carbon Ink */
  --ink-soft: #59433A;         /* Soft Brown Ink */
  --ink-muted: #7A655C;        /* Aged / Weathered Ink */
  --ink-faint: #A8958B;        /* Faint Marginal Pencil */

  --vermillion: #8E1D12;       /* Sacred Sindoor / Vermillion Stamp */
  --vermillion-dark: #6F120B;  /* Deep Vermillion Accent */
  --vermillion-light: #B56A5E; /* Faded Terracotta */

  --copper: #95663D;           /* Antique Copper Line */
  --brass: #A27A48;            /* Old Brass Accent */
  --ochre: #B78A43;            /* Faded Ochre */

  --line: #BDA79A;             /* Archive Ruling Line */
  --line-strong: #8D7467;      /* Binding & Plate Border Line */
  --line-light: rgba(189, 167, 154, 0.45);

  /* Typography */
  --font-display: 'EB Garamond', Georgia, serif;
  --font-body: 'EB Garamond', Georgia, serif;
  --font-archive: 'Courier Prime', 'Courier New', monospace;
  --font-hindi: 'Noto Serif Devanagari', 'Tiro Devanagari Hindi', 'EB Garamond', serif;

  /* Geometry — Absolutely NO modern rounded card radii */
  --radius: 0px;
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-xl: 0px;
  --radius-full: 0px;

  /* Tactile Physical Shadows */
  --shadow-archival: 3px 3px 0 rgba(36, 27, 23, 0.18);
  --shadow-folio: 4px 4px 0 rgba(36, 27, 23, 0.14), 0 10px 25px rgba(36, 27, 23, 0.08);
  --shadow-plate: 5px 5px 0 rgba(36, 27, 23, 0.22);
  --shadow-sm: 2px 2px 0 rgba(36, 27, 23, 0.12);
  --shadow-md: 3px 3px 0 rgba(36, 27, 23, 0.18);
  --shadow-lg: 5px 5px 0 rgba(36, 27, 23, 0.22);

  /* Compatibility mappings for subpages (Scanner, Report, Palmists, Guides) */
  --color-bg-base: var(--paper);
  --color-bg-subtle: var(--paper-aged);
  --color-bg-surface: var(--paper-aged);
  --color-bg-surface-translucent: rgba(247, 239, 231, 0.95);
  --color-bg-elevated: var(--paper-light);
  --color-bg-card-hover: var(--paper-light);

  --color-text-main: var(--ink);
  --color-text-secondary: var(--ink-soft);
  --color-text-muted: var(--ink-muted);
  --color-text-inverse: var(--paper);

  --color-gold-primary: var(--copper);
  --color-gold-hover: var(--brass);
  --color-gold-subtle: rgba(149, 102, 61, 0.12);
  --color-gold-glow: rgba(149, 102, 61, 0.15);
  --color-gold-gradient: linear-gradient(135deg, var(--paper-parchment) 0%, var(--paper-aged) 100%);
  --color-gold-border: var(--line-strong);

  --color-cyan-biometric: var(--copper);
  --color-cyan-glow: rgba(149, 102, 61, 0.15);
  --color-violet-mystic: var(--vermillion);
  --color-violet-glow: rgba(142, 29, 18, 0.15);
  --color-crimson-vital: var(--vermillion);

  --border-light: var(--line);
  --border-subtle: var(--line-light);
  --border-hover: var(--vermillion);

  --font-serif: var(--font-display);
  --font-accent: var(--font-display);
  --font-sans: var(--font-body);

  --transition-fast: 0.15s ease;
  --transition-normal: 0.25s ease;
  --transition-smooth: 0.4s ease;

  --nav-height: 72px;
}

/* ==========================================================================
   Historical Carbon Ink & Candlelight Dark Mode
   ========================================================================== */
[data-theme="dark"] {
  --paper: #1B1512;
  --paper-aged: #241C18;
  --paper-light: #2A211C;
  --paper-parchment: #2F241F;
  --paper-deep: #16100E;

  --ink: #EFE1D4;
  --ink-soft: #D8C1AD;
  --ink-muted: #BDA79A;
  --ink-faint: #8D7467;

  --vermillion: #B83A2D;
  --vermillion-dark: #8E1D12;
  --vermillion-light: #D96557;

  --copper: #C28A58;
  --brass: #D4A76A;
  --ochre: #E0AE5E;

  --line: #523E34;
  --line-strong: #755B4D;
  --line-light: rgba(82, 62, 52, 0.5);

  --color-bg-base: var(--paper);
  --color-bg-subtle: var(--paper-aged);
  --color-bg-surface: var(--paper-aged);
  --color-bg-surface-translucent: rgba(27, 21, 18, 0.95);
  --color-bg-elevated: var(--paper-light);
  --color-bg-card-hover: var(--paper-parchment);

  --color-text-main: var(--ink);
  --color-text-secondary: var(--ink-soft);
  --color-text-muted: var(--ink-muted);
  --color-text-inverse: var(--paper);

  --shadow-archival: 3px 3px 0 rgba(0, 0, 0, 0.5);
  --shadow-folio: 4px 4px 0 rgba(0, 0, 0, 0.6);
  --shadow-plate: 5px 5px 0 rgba(0, 0, 0, 0.7);
}

/* ==========================================================================
   CSS Reset & Manuscript Page Base
   ========================================================================== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  background-color: var(--paper);
  color: var(--ink);
  line-height: 1.65;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  /* Subtle archival paper fiber grain */
  background-image: 
    radial-gradient(rgba(36, 27, 23, 0.035) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Outer Document Margins */
.archive-paper-canvas {
  position: relative;
  min-height: 100vh;
}

img, video, svg {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
  transition: color var(--transition-fast);
}

button, input, select, textarea {
  font: inherit;
  color: inherit;
  border: none;
  background: none;
  outline: none;
}

button {
  cursor: pointer;
}

ul, ol {
  list-style: none;
}

/* ==========================================================================
   Typography Standards
   ========================================================================== */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.25;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.archive-mono {
  font-family: var(--font-archive);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.text-vermillion {
  color: var(--vermillion);
}

.text-copper {
  color: var(--copper);
}

.text-muted {
  color: var(--ink-muted);
}

/* ==========================================================================
   Layout Containers
   ========================================================================== */
.archive-container {
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.container {
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.container-wide {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.archive-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* ==========================================================================
   Archival Dividers & Ornaments
   ========================================================================== */
.archive-section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: var(--line);
}

.divider-fleuron {
  color: var(--vermillion);
  font-size: 1.25rem;
  line-height: 1;
}

.archive-divider-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  max-width: 1220px;
  margin: 0 auto 36px;
  padding: 0 24px;
}

.archive-divider-line {
  flex: 1;
  height: 1px;
  background: var(--line);
}

.archive-divider-glyph {
  color: var(--vermillion);
  font-size: 1.2rem;
}

/* ==========================================================================
   Reusable UI Components: Buttons & Badges
   ========================================================================== */
.btn-archive-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--vermillion);
  color: var(--paper);
  border: 1px solid var(--ink);
  border-radius: 0;
  padding: 10px 22px;
  font-family: var(--font-hindi);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 2px 2px 0 var(--ink);
  transition: all var(--transition-fast);
  cursor: pointer;
  white-space: nowrap;
}

.btn-archive-primary:hover {
  background: var(--vermillion-dark);
  color: #fff;
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 var(--ink);
}

.btn-archive-primary:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 var(--ink);
}

.btn-archive-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--copper);
  outline: 1px solid var(--copper);
  outline-offset: -3px;
  border-radius: 0;
  padding: 10px 20px;
  font-family: var(--font-hindi);
  font-size: 0.95rem;
  font-weight: 600;
  transition: all var(--transition-fast);
  cursor: pointer;
  white-space: nowrap;
}

.btn-archive-secondary:hover {
  background: var(--paper-aged);
  color: var(--vermillion);
}

/* Compatibility Buttons for Subpages */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 0;
  font-size: 0.92rem;
  font-weight: 600;
  border: 1px solid var(--ink);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.btn-primary {
  background: var(--vermillion);
  color: var(--paper);
  box-shadow: 2px 2px 0 var(--ink);
}

.btn-primary:hover {
  background: var(--vermillion-dark);
  color: #fff;
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 var(--ink);
}

.btn-secondary {
  background: var(--paper-aged);
  color: var(--ink);
  border: 1px solid var(--copper);
  box-shadow: 2px 2px 0 rgba(36,27,23,0.1);
}

.btn-secondary:hover {
  background: var(--paper-parchment);
  color: var(--vermillion);
}

.btn-lg {
  padding: 13px 26px;
  font-size: 1.02rem;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 0;
  font-family: var(--font-archive);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid var(--line-strong);
  background: var(--paper-aged);
  color: var(--ink-soft);
}

.badge-gold {
  background: rgba(149,102,61,0.1);
  color: var(--copper);
  border-color: var(--copper);
}

.badge-cyan {
  background: rgba(183,138,67,0.12);
  color: var(--ochre);
  border-color: var(--ochre);
}

.badge-violet {
  background: rgba(142,29,18,0.08);
  color: var(--vermillion);
  border-color: var(--vermillion);
}

/* ==========================================================================
   Minimal Historical Archive Header
   ========================================================================== */
.archive-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--paper);
  border-bottom: 1px solid var(--line-strong);
  box-shadow: 0 2px 6px rgba(36, 27, 23, 0.06);
}

.archive-topbar {
  background: var(--paper-aged);
  border-bottom: 1px solid var(--line);
  padding: 4px 0;
  font-size: 0.7rem;
}

.archive-topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.archive-metadata-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--ink-soft);
}

.archive-badge-dot {
  width: 6px;
  height: 6px;
  background: var(--vermillion);
  display: inline-block;
}

.archive-nav-main {
  padding: 8px 0;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.archive-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.archive-brand-seal {
  width: 34px;
  height: 34px;
  background: var(--vermillion);
  border: 1px solid var(--ink);
  color: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  box-shadow: 1px 1px 0 var(--ink);
}

.archive-brand-titles {
  display: flex;
  flex-direction: column;
}

.archive-brand-hi {
  font-family: var(--font-hindi);
  font-size: 1.28rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.15;
}

.archive-brand-en {
  font-family: var(--font-archive);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  color: var(--copper);
  font-weight: 700;
}

.archive-nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.archive-nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 6px;
  position: relative;
  transition: color var(--transition-fast);
}

.nav-hi {
  font-family: var(--font-hindi);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.2;
}

.nav-en {
  font-family: var(--font-archive);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  color: var(--ink-muted);
}

.archive-nav-link:hover .nav-hi,
.archive-nav-link.active .nav-hi {
  color: var(--vermillion);
}

.archive-nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 4px;
  right: 4px;
  height: 2px;
  background: var(--vermillion);
}

.archive-nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.archive-lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: var(--paper-aged);
  border: 1px solid var(--line-strong);
  font-family: var(--font-archive);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--ink);
  cursor: pointer;
}

.archive-lang-btn:hover {
  border-color: var(--vermillion);
  color: var(--vermillion);
}

.archive-theme-btn {
  width: 34px;
  height: 34px;
  border: 1px solid var(--line-strong);
  background: var(--paper-aged);
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.archive-theme-btn:hover {
  border-color: var(--vermillion);
  color: var(--vermillion);
}

.archive-theme-btn svg {
  width: 16px;
  height: 16px;
}

.btn-arrow {
  display: inline-block;
  transition: transform var(--transition-fast);
}

.btn-archive-primary:hover .btn-arrow {
  transform: translateX(3px);
}

.archive-mobile-btn {
  display: none;
  width: 36px;
  height: 36px;
  border: 1px solid var(--line-strong);
  background: var(--paper-aged);
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.menu-icon-bars {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--ink);
  position: relative;
}

.menu-icon-bars::before,
.menu-icon-bars::after {
  content: '';
  position: absolute;
  left: 0;
  width: 18px;
  height: 2px;
  background: var(--ink);
}

.menu-icon-bars::before { top: -6px; }
.menu-icon-bars::after { bottom: -6px; }

/* Mobile Drawer */
.archive-mobile-drawer {
  display: none;
  background: var(--paper-aged);
  border-bottom: 2px solid var(--ink);
  padding: 20px;
}

.mobile-menu-open .archive-mobile-drawer {
  display: block;
}

.archive-mobile-header {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 12px;
  color: var(--copper);
}

.archive-mobile-links {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.archive-mobile-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 6px;
  border-bottom: 1px dashed var(--line-light);
}

.mobile-num {
  font-family: var(--font-hindi);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vermillion);
  width: 24px;
}

.mobile-title {
  font-family: var(--font-hindi);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
}

.mobile-sub {
  font-family: var(--font-archive);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--ink-soft);
}

.archive-mobile-footer {
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

/* ==========================================================================
   1. Archive Hero Section
   ========================================================================== */
.hero-folio-section {
  padding: 40px 0 60px;
  position: relative;
}

.archive-page-frame {
  max-width: 1220px;
  margin: 0 auto;
  padding: 36px 36px;
  background: var(--paper-light);
  border: 1px solid var(--line-strong);
  outline: 1px solid rgba(149, 102, 61, 0.4);
  outline-offset: -8px;
  position: relative;
  box-shadow: var(--shadow-folio);
}

.frame-mark {
  position: absolute;
  font-family: var(--font-archive);
  font-size: 1.1rem;
  color: var(--copper);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.mark-top-left { top: 12px; left: 12px; }
.mark-top-right { top: 12px; right: 12px; }
.mark-bottom-left { bottom: 12px; left: 12px; }
.mark-bottom-right { bottom: 12px; right: 12px; }

.hero-folio-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 40px;
  align-items: center;
}

.hero-editorial {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.folio-meta-badge {
  display: inline-flex;
  align-self: flex-start;
  padding: 4px 10px;
  background: var(--paper-aged);
  border: 1px solid var(--line-strong);
}

.meta-label {
  font-family: var(--font-archive);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: var(--copper);
  font-weight: 700;
}

.folio-hero-title {
  font-family: var(--font-hindi);
  font-size: clamp(2.3rem, 3.8vw, 3.4rem);
  font-weight: 700;
  line-height: 1.18;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.folio-title-highlight {
  color: var(--vermillion);
}

.hero-archival-stamp {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-archive);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--copper);
  padding: 4px 0;
  border-top: 1px dashed var(--line);
  border-bottom: 1px dashed var(--line);
  margin-top: 4px;
}

.stamp-sep {
  color: var(--vermillion);
}

.folio-hero-description {
  font-family: var(--font-body);
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--ink-soft);
  margin-top: 4px;
}

.manuscript-quote-strip {
  background: var(--paper-aged);
  border-left: 3px solid var(--vermillion);
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sanskrit-verse {
  font-family: var(--font-hindi);
  font-size: 0.95rem;
  font-style: italic;
  font-weight: 600;
  color: var(--vermillion-dark);
}

.verse-reference {
  font-family: var(--font-archive);
  font-size: 0.68rem;
  color: var(--ink-muted);
}

.folio-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.btn-hero-cta {
  padding: 12px 24px;
  font-size: 1rem;
}

.cta-arrow {
  margin-left: 4px;
}

.folio-mini-ledger {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  margin-top: 12px;
}

.ledger-item {
  display: flex;
  flex-direction: column;
}

.ledger-num {
  font-family: var(--font-hindi);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.1;
}

.ledger-lbl {
  font-family: var(--font-archive);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  color: var(--ink-muted);
  text-transform: uppercase;
}

.ledger-sep {
  color: var(--line);
  font-weight: 300;
}

/* Right Column: Manuscript Plate Card */
.hero-manuscript-plate-wrap {
  position: relative;
}

.manuscript-plate-card {
  background: var(--paper-aged);
  border: 1px solid var(--line-strong);
  outline: 1px solid rgba(149, 102, 61, 0.45);
  outline-offset: -6px;
  padding: 18px;
  box-shadow: var(--shadow-plate);
  position: relative;
}

.plate-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 10px;
}

.plate-title-group {
  display: flex;
  flex-direction: column;
}

.plate-tag {
  font-family: var(--font-hindi);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--vermillion);
}

.plate-sub {
  font-family: var(--font-archive);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: var(--ink-muted);
}

.plate-seal-mini {
  padding: 2px 8px;
  border: 1px solid var(--vermillion);
  color: var(--vermillion);
  font-family: var(--font-hindi);
  font-size: 0.72rem;
  font-weight: 700;
}

.plate-illustration-viewport {
  width: 100%;
  position: relative;
  background: var(--paper);
  border: 1px solid var(--line);
  padding: 8px;
  overflow: hidden;
}

.antique-palm-svg {
  width: 100%;
  height: auto;
  display: block;
}

.plate-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid var(--line);
  margin-top: 10px;
}

.plate-mono-tag {
  font-family: var(--font-archive);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: var(--ink-soft);
}

/* ==========================================================================
   2. Reading Protocol Section
   ========================================================================== */
.archive-protocol-section {
  padding: 60px 0 80px;
}

.archive-section-header {
  text-align: center;
  max-width: 780px;
  margin: 0 auto 46px;
}

.archive-header-badge {
  display: inline-block;
  padding: 3px 10px;
  border: 1px solid var(--copper);
  background: var(--paper-aged);
  color: var(--copper);
  margin-bottom: 12px;
}

.archive-section-heading {
  font-family: var(--font-hindi);
  font-size: clamp(2rem, 3.2vw, 2.7rem);
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
}

.archive-section-subheading {
  font-family: var(--font-archive);
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  color: var(--copper);
  font-weight: 700;
  margin-top: 4px;
}

.archive-section-desc {
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--ink-soft);
  margin-top: 12px;
  line-height: 1.65;
}

.protocol-chapters-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.protocol-chapter-card {
  background: var(--paper-light);
  border: 1px solid var(--line-strong);
  outline: 1px solid rgba(149, 102, 61, 0.35);
  outline-offset: -5px;
  box-shadow: var(--shadow-archival);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-fast);
}

.protocol-chapter-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-folio);
  border-color: var(--vermillion);
}

.chapter-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px 8px;
  border-bottom: 1px solid var(--line);
  background: var(--paper-aged);
}

.chapter-index {
  font-family: var(--font-hindi);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--vermillion);
}

.chapter-code {
  font-family: var(--font-archive);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--ink-muted);
}

.chapter-inner {
  padding: 18px 16px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.chapter-title-hi {
  font-family: var(--font-hindi);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
}

.chapter-title-en {
  font-family: var(--font-archive);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--copper);
  font-weight: 700;
  margin-top: 2px;
}

.chapter-ornament {
  color: var(--line);
  font-size: 0.75rem;
  margin: 10px 0;
  letter-spacing: 0.2em;
}

.chapter-text {
  font-family: var(--font-body);
  font-size: 0.98rem;
  color: var(--ink-soft);
  line-height: 1.6;
  flex: 1;
}

.chapter-meta {
  padding-top: 12px;
  border-top: 1px dashed var(--line);
  margin-top: 14px;
  color: var(--ink-muted);
  font-size: 0.75rem;
}

.protocol-cta-center {
  text-align: center;
  margin-top: 10px;
}

/* ==========================================================================
   3. What We Examine ("क्या देखा जाता है?")
   ========================================================================== */
.archive-examine-section {
  padding: 60px 0 80px;
}

.examine-panels-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.folio-panel-card {
  background: var(--paper-aged);
  border: 1px solid var(--line-strong);
  outline: 1px solid rgba(149, 102, 61, 0.4);
  outline-offset: -5px;
  box-shadow: var(--shadow-archival);
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-fast);
}

.folio-panel-card:hover {
  border-color: var(--vermillion);
  transform: translateY(-2px);
  box-shadow: var(--shadow-folio);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 14px;
}

.panel-num {
  font-family: var(--font-hindi);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vermillion);
}

.panel-element {
  font-family: var(--font-archive);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--copper);
  font-weight: 700;
}

.panel-body {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.panel-titles {
  margin-bottom: 10px;
}

.panel-title-hi {
  font-family: var(--font-hindi);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
}

.panel-title-en {
  font-family: var(--font-archive);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--copper);
  font-weight: 700;
  display: block;
  margin-top: 2px;
}

.panel-desc {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--ink-soft);
  line-height: 1.62;
  flex: 1;
}

.panel-footer-attr {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-top: 12px;
  border-top: 1px dashed var(--line);
  margin-top: 14px;
  font-size: 0.82rem;
}

.attr-key {
  font-family: var(--font-archive);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  color: var(--ink-muted);
  text-transform: uppercase;
}

.attr-val {
  font-family: var(--font-hindi);
  font-weight: 600;
  color: var(--ink);
}

/* ==========================================================================
   4. Sample Personal Folio Section
   ========================================================================== */
.archive-sample-section {
  padding: 60px 0 80px;
}

.sample-folio-page {
  max-width: 1080px;
  margin: 0 auto;
  background: #F4EAE0;
  border: 1px solid #7D6559;
  box-shadow: 5px 5px 0 rgba(36,27,23,0.18), 0 15px 35px rgba(36,27,23,0.08);
  padding: 30px;
  position: relative;
}

.folio-page-inner {
  border: 1px solid rgba(149, 102, 61, 0.5);
  padding: 30px;
}

.folio-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line-strong);
  font-family: var(--font-archive);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: var(--copper);
  font-weight: 700;
}

.folio-page-title-strip {
  text-align: center;
  padding: 20px 0 16px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 24px;
}

.folio-page-title {
  font-family: var(--font-hindi);
  font-size: 1.85rem;
  font-weight: 700;
  color: var(--ink);
}

.folio-page-date {
  font-family: var(--font-hindi);
  font-size: 0.85rem;
  color: var(--ink-muted);
  margin-top: 4px;
}

.folio-text-grid {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 36px;
}

.scholarly-dropcap-block {
  margin-bottom: 20px;
}

.dropcap-letter {
  float: left;
  font-family: var(--font-hindi);
  font-size: 3.6rem;
  line-height: 0.85;
  padding-top: 4px;
  padding-right: 12px;
  padding-bottom: 2px;
  color: var(--vermillion);
  font-weight: 700;
}

.dropcap-paragraph {
  font-family: var(--font-body);
  font-size: 1.08rem;
  line-height: 1.7;
  color: var(--ink);
  text-align: justify;
}

.manuscript-sutra-box {
  background: var(--paper);
  border: 1px solid var(--copper);
  padding: 14px 18px;
  margin: 20px 0;
  text-align: center;
}

.sutra-text {
  font-family: var(--font-hindi);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vermillion-dark);
  line-height: 1.6;
}

.sutra-translation {
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-style: italic;
  color: var(--ink-soft);
  margin-top: 6px;
}

.folio-subhead {
  font-family: var(--font-hindi);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--ink);
  margin: 18px 0 10px;
}

.folio-bullet-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 18px;
  list-style: circle;
}

.folio-bullet-list li {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--ink-soft);
  line-height: 1.55;
}

.margin-note-card {
  background: var(--paper-light);
  border: 1px solid var(--line-strong);
  padding: 16px;
  margin-bottom: 20px;
}

.margin-header {
  padding-bottom: 8px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 10px;
  color: var(--copper);
  font-weight: 700;
}

.margin-attribute {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.82rem;
  padding: 4px 0;
  border-bottom: 1px dashed var(--line-light);
}

.m-label {
  font-family: var(--font-hindi);
  color: var(--ink-muted);
}

.m-val {
  font-family: var(--font-hindi);
  font-weight: 600;
  color: var(--ink);
  text-align: right;
}

.folio-seal-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
}

.seal-inner {
  width: 110px;
  height: 110px;
  border: 2px dashed var(--vermillion);
  outline: 1px solid var(--vermillion);
  outline-offset: -5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--vermillion);
  padding: 8px;
}

.seal-glyph-large {
  font-size: 1.4rem;
  line-height: 1;
}

.seal-txt-hi {
  font-family: var(--font-hindi);
  font-size: 0.72rem;
  font-weight: 700;
}

.seal-txt-en {
  font-family: var(--font-archive);
  font-size: 0.52rem;
  letter-spacing: 0.1em;
}

.seal-txt-date {
  font-family: var(--font-archive);
  font-size: 0.58rem;
}

.archivist-sign {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
}

.sign-label {
  font-family: var(--font-archive);
  font-size: 0.65rem;
  color: var(--ink-muted);
}

.sign-cursive {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-style: italic;
  font-weight: 600;
  color: var(--ink-soft);
}

.folio-page-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--line-strong);
  margin-top: 24px;
  font-family: var(--font-archive);
  font-size: 0.7rem;
  color: var(--ink-muted);
}

/* ==========================================================================
   5. Methodology / Tradition Section
   ========================================================================== */
.archive-tradition-section {
  padding: 60px 0 80px;
}

.tradition-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.tradition-card {
  background: var(--paper-light);
  border: 1px solid var(--line-strong);
  outline: 1px solid rgba(149, 102, 61, 0.4);
  outline-offset: -6px;
  box-shadow: var(--shadow-archival);
  padding: 26px 28px;
}

.tradition-card-header {
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 16px;
}

.tradition-num {
  font-family: var(--font-archive);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: var(--vermillion);
  font-weight: 700;
}

.tradition-title {
  font-family: var(--font-hindi);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.25;
  margin-top: 2px;
}

.tradition-latin {
  font-family: var(--font-archive);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  color: var(--copper);
  font-weight: 700;
  display: block;
}

.tradition-card-body p {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--ink-soft);
  line-height: 1.65;
  margin-bottom: 16px;
}

.polarity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.polarity-box {
  background: var(--paper-aged);
  border-left: 3px solid var(--copper);
  padding: 12px 14px;
}

.polarity-name {
  font-family: var(--font-hindi);
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 4px;
}

.polarity-box p {
  margin-bottom: 0;
  font-size: 0.95rem;
  color: var(--ink-soft);
}

.sources-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.source-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding-bottom: 12px;
  border-bottom: 1px dashed var(--line-light);
}

.source-bullet {
  color: var(--vermillion);
  font-size: 0.95rem;
  margin-top: 2px;
}

.source-name {
  font-family: var(--font-hindi);
  font-size: 1rem;
  color: var(--ink);
  display: inline-block;
  margin-right: 6px;
}

.source-info {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--ink-soft);
  line-height: 1.5;
}

/* ==========================================================================
   6. Report Preview ("आपका अभिलेख ऐसा दिखाई देगा")
   ========================================================================== */
.archive-report-preview-section {
  padding: 60px 0 80px;
}

.report-sheets-showcase {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.sheet-preview-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sheet-label {
  font-family: var(--font-archive);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--copper);
  font-weight: 700;
  text-align: center;
}

.sheet-paper {
  background: var(--paper-light);
  border: 1px solid var(--line-strong);
  box-shadow: 4px 4px 0 rgba(36, 27, 23, 0.16);
  padding: 16px;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-fast);
}

.sheet-paper:hover {
  transform: translateY(-4px);
  box-shadow: 6px 6px 0 rgba(36, 27, 23, 0.22);
}

.sheet-inner-border {
  border: 1px solid var(--line);
  outline: 1px solid rgba(149, 102, 61, 0.25);
  outline-offset: -4px;
  padding: 18px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Sheet 1: Cover */
.sheet-top-flourish {
  text-align: center;
  color: var(--vermillion);
  font-size: 0.95rem;
  letter-spacing: 0.2em;
}

.sheet-book-title-hi {
  font-family: var(--font-hindi);
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--vermillion);
  text-align: center;
  margin-top: 8px;
}

.sheet-book-title-en {
  font-family: var(--font-archive);
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  color: var(--ink-soft);
  text-align: center;
}

.sheet-line-sep {
  width: 60px;
  height: 1px;
  background: var(--vermillion);
  margin: 14px auto;
}

.sheet-report-subject {
  font-family: var(--font-hindi);
  font-size: 1.15rem;
  font-weight: 600;
  text-align: center;
  color: var(--ink);
}

.sheet-report-sub-en {
  font-family: var(--font-archive);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-align: center;
  color: var(--copper);
}

.sheet-folio-number {
  font-family: var(--font-archive);
  font-size: 0.72rem;
  text-align: center;
  color: var(--ink-muted);
  margin-top: 14px;
}

.sheet-series-title {
  font-family: var(--font-archive);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-align: center;
  color: var(--ink-muted);
}

.sheet-stamp-mark {
  margin: 16px auto;
  border: 1px solid var(--vermillion);
  padding: 4px 10px;
  color: var(--vermillion);
  font-family: var(--font-hindi);
  font-size: 0.72rem;
  font-weight: 700;
}

.sheet-bottom-year {
  font-family: var(--font-archive);
  font-size: 0.62rem;
  color: var(--ink-muted);
  text-align: center;
}

/* Sheet 2: Lines */
.sheet-mini-header {
  font-family: var(--font-archive);
  font-size: 0.65rem;
  color: var(--copper);
  font-weight: 700;
  text-align: center;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--line-light);
}

.sheet-mini-palm {
  width: 140px;
  margin: 10px auto;
}

.sheet-line-annotations {
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 8px 0;
}

.anno-pill {
  font-family: var(--font-hindi);
  font-size: 0.72rem;
  padding: 2px 6px;
  border: 1px solid var(--line-strong);
}

.anno-pill.red {
  color: var(--vermillion);
  border-color: var(--vermillion);
}

.anno-pill.brown {
  color: var(--copper);
  border-color: var(--copper);
}

.sheet-mini-caption {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-style: italic;
  color: var(--ink-soft);
  text-align: center;
}

/* Sheet 3: Text */
.sheet-chapter-heading {
  font-family: var(--font-hindi);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--ink);
  text-align: center;
  margin: 8px 0;
}

.sheet-sample-prose {
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--ink-soft);
  line-height: 1.5;
  text-align: justify;
}

.sheet-dropcap {
  float: left;
  font-family: var(--font-hindi);
  font-size: 2.2rem;
  line-height: 0.85;
  color: var(--vermillion);
  font-weight: 700;
  padding-right: 6px;
}

.sheet-small-paragraph {
  margin-top: 8px;
  font-size: 0.84rem;
}

.sheet-page-num-bottom {
  font-family: var(--font-archive);
  font-size: 0.65rem;
  color: var(--ink-muted);
  text-align: center;
  padding-top: 8px;
  border-top: 1px solid var(--line-light);
}

.report-preview-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.cta-micro-note {
  font-family: var(--font-archive);
  font-size: 0.72rem;
  color: var(--ink-muted);
  letter-spacing: 0.08em;
}

/* ==========================================================================
   7. Pricing Teaser Section ("अपना निजी अभिलेख प्राप्त करें")
   ========================================================================== */
.archive-pricing-section {
  padding: 60px 0 80px;
}

.pricing-ledger-wrapper {
  max-width: 760px;
  margin: 0 auto;
}

.pricing-ledger-card {
  background: var(--paper-light);
  border: 1px solid var(--line-strong);
  outline: 1px solid rgba(149, 102, 61, 0.45);
  outline-offset: -7px;
  box-shadow: var(--shadow-plate);
  padding: 36px 40px;
}

.ledger-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.ledger-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ledger-title {
  font-family: var(--font-hindi);
  font-size: 1.85rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.15;
}

.ledger-subtitle {
  font-family: var(--font-archive);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  color: var(--copper);
  font-weight: 700;
}

.ledger-price-block {
  text-align: right;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.ledger-currency {
  font-family: var(--font-body);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--vermillion);
}

.ledger-amount {
  font-family: var(--font-body);
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--vermillion);
  line-height: 1;
}

.ledger-period {
  font-family: var(--font-hindi);
  font-size: 0.85rem;
  color: var(--ink-muted);
}

.ledger-divider {
  text-align: center;
  color: var(--copper);
  margin: 20px 0;
  letter-spacing: 0.1em;
  font-size: 0.85rem;
}

.ledger-inclusions {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 28px;
}

.inclusion-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px dashed var(--line-light);
}

.inc-check {
  color: var(--vermillion);
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.2;
}

.inc-text {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--ink-soft);
  line-height: 1.5;
}

.inc-text strong {
  font-family: var(--font-hindi);
  color: var(--ink);
}

.ledger-action {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.btn-ledger-buy {
  width: 100%;
  max-width: 440px;
  padding: 14px 28px;
  font-size: 1.1rem;
}

.ledger-fineprint {
  font-size: 0.72rem;
  color: var(--ink-muted);
}

/* ==========================================================================
   8. Archival Disclaimer Section ("अभिलेखीय टिप्पणी")
   ========================================================================== */
.archive-disclaimer-section {
  padding: 40px 0 80px;
}

.archival-disclaimer-box {
  background: var(--paper-aged);
  border: 1px solid var(--vermillion);
  outline: 1px solid var(--line-strong);
  outline-offset: -6px;
  padding: 30px 36px;
  max-width: 960px;
  margin: 0 auto;
  box-shadow: var(--shadow-sm);
}

.disclaimer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 16px;
}

.disclaimer-seal {
  font-size: 1.4rem;
  color: var(--vermillion);
}

.disclaimer-title {
  font-family: var(--font-hindi);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--vermillion-dark);
}

.disclaimer-title-en {
  font-family: var(--font-archive);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: var(--ink-muted);
  font-weight: 700;
  margin-left: auto;
}

.disclaimer-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.disclaimer-hi {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--ink);
  line-height: 1.65;
}

.disclaimer-en {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-style: italic;
  color: var(--ink-soft);
  line-height: 1.6;
}

.disclaimer-footer {
  padding-top: 14px;
  border-top: 1px dashed var(--line);
  margin-top: 16px;
  color: var(--ink-muted);
  font-size: 0.72rem;
}

/* ==========================================================================
   9. Archival Colophon Footer
   ========================================================================== */
.archive-footer {
  background: var(--paper-aged);
  border-top: 1px solid var(--line-strong);
  padding: 40px 0 30px;
  margin-top: auto;
}

.archive-footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 36px;
  padding-bottom: 36px;
  border-bottom: 1px solid var(--line);
}

.archive-footer-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.footer-brand-seal {
  color: var(--vermillion);
  font-size: 1.2rem;
}

.footer-brand-title {
  font-family: var(--font-hindi);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--ink);
}

.footer-brand-latin {
  font-family: var(--font-archive);
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  color: var(--copper);
  font-weight: 700;
  margin-bottom: 12px;
}

.footer-col-desc {
  font-family: var(--font-body);
  font-size: 0.96rem;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 16px;
}

.footer-archive-stamp {
  display: inline-block;
}

.stamp-box {
  border: 1px solid var(--vermillion);
  padding: 3px 8px;
  color: var(--vermillion);
  font-family: var(--font-hindi);
  font-size: 0.72rem;
  font-weight: 700;
}

.archive-col-title {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 16px;
}

.title-hi {
  font-family: var(--font-hindi);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--ink);
}

.title-en {
  font-family: var(--font-archive);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  color: var(--copper);
  font-weight: 700;
}

.archive-footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.archive-footer-link {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--ink-soft);
  transition: color var(--transition-fast);
}

.archive-footer-link:hover {
  color: var(--vermillion);
}

.archive-colophon-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  font-size: 0.72rem;
  color: var(--ink-muted);
  flex-wrap: wrap;
  gap: 12px;
}

.colophon-ornament {
  color: var(--copper);
  letter-spacing: 0.2em;
}

/* ==========================================================================
   Archival Responsive Rules
   ========================================================================== */
@media (max-width: 1080px) {
  .hero-folio-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .protocol-chapters-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .examine-panels-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .folio-text-grid {
    grid-template-columns: 1fr;
  }
  .tradition-grid {
    grid-template-columns: 1fr;
  }
  .report-sheets-showcase {
    grid-template-columns: 1fr;
  }
  .archive-footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .archive-nav-links {
    display: none;
  }
  .archive-mobile-btn {
    display: flex;
  }
  .hide-mobile {
    display: none;
  }
  .archive-page-frame {
    padding: 24px 16px;
  }
  .protocol-chapters-grid {
    grid-template-columns: 1fr;
  }
  .examine-panels-grid {
    grid-template-columns: 1fr;
  }
  .pricing-ledger-card {
    padding: 24px 20px;
  }
  .ledger-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .sample-folio-page {
    padding: 16px;
  }
  .folio-page-inner {
    padding: 16px;
  }
  .archive-footer-grid {
    grid-template-columns: 1fr;
  }
  .archive-colophon-bar {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

`;

const finalCSS = archivalHeaderAndHomepageCSS + '\n' + preservedSection;
fs.writeFileSync(stylesPath, finalCSS, 'utf8');
console.log('Successfully updated styles.css with Archival Design System!');
