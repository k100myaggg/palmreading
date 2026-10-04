# प्राचीन हस्तरेखा — Vedic Palm Reading Website
## UI/UX Design System & Product Experience Specification

> **Design direction:** 18th–19th century Indian archival manuscript + old scholarly novel + Sanskrit/Vedic folio + colonial-era documentary archive.
>
> The goal is not to make the website look like a modern "astrology app". It should feel like the visitor has entered a **preserved Indian palmistry archive** where every screen is a page from an old scholarly manuscript.

---

# 1. Core Design Vision

## The feeling we want

When a user opens the website, the immediate reaction should be:

> **"यह कोई सामान्य astrology website नहीं है — यह किसी पुराने भारतीय ग्रंथ / हस्तरेखा अभिलेख जैसा लग रहा है."**

The experience should communicate:

- प्राचीन / Ancient
- भारतीय / Indian
- विद्वतापूर्ण / Scholarly
- रहस्यमय / Mysterious
- विश्वसनीय / Archival
- हस्तलिखित / Hand-crafted
- Documentary
- Premium but not luxurious-modern
- Old novel / historical book atmosphere

### Important

Do **not** make it look like:

- A modern SaaS dashboard
- A neon astrology website
- A generic horoscope website
- A crystal / zodiac / purple-gradient website
- A modern fintech-style card UI
- A glossy AI product
- A futuristic scanner interface

The product can use modern technology underneath, but the **visual language must look historical**.

---

# 2. Design Principle: "Digital Archive, Not App"

The website should feel like a **digitized 1800s Indian manuscript archive**.

Every major section should look as if it belongs to one of these:

- A palm-leaf manuscript
- A Sanskrit/Hindi palmistry treatise
- A British-era archival record
- An old Indian scholar's notebook
- A museum catalogue
- A printed historical novel
- A preserved folio
- An old research plate

Use terminology such as:

- अभिलेख / Archive
- पाण्डुलिपि / Manuscript
- पत्र / Folio
- पृष्ठ / Page
- अध्याय / Chapter
- लेख / Record
- निरीक्षण / Observation
- संकेत / Sign
- रेखा / Line
- पर्वत / Mount
- हस्तचिह्न / Palm Mark
- निष्कर्ष / Findings
- फलादेश / Reading
- संदर्भ / Reference
- प्रमाण / Evidence
- संग्रह / Collection
- अनुक्रम / Index

---

# 3. Visual Language

## 3.1 Material

The background must never be pure white.

Use:

- Warm ivory paper
- Aged parchment
- Tea-stained paper
- Slightly yellowed manuscript paper
- Faded beige
- Very subtle paper grain
- Slight ink imperfections

### Recommended base colors

```text
ARCHIVE PAPER       #F7EFE7
AGED PAPER          #EFE1D4
LIGHT PARCHMENT     #E8D6C6
DEEP PARCHMENT      #D8C1AD

CARBON INK          #241B17
SOFT INK            #59433A

VERMILLION          #8E1D12
DEEP VERMILLION     #6F120B

ANTIQUE COPPER      #95663D
OLD BRASS           #A27A48

FADED OCHRE         #B78A43

FADED RED           #B56A5E
ARCHIVE LINE        #BDA79A
```

### Color rule

Use red sparingly.

Vermillion should feel like:

- a sacred mark
- an authentication stamp
- a manuscript annotation
- a palmistry line
- an important warning
- a primary CTA

It should NOT flood the interface.

---

# 4. Typography

## Primary display font

**EB Garamond**

Use for:

- Main headings
- Page titles
- Long-form reading
- Descriptions
- Report content
- Hindi/English editorial typography where supported

## Documentary font

**Courier Prime**

Use for:

- Archive numbers
- Folio IDs
- Dates
- Metadata
- Classification codes
- Small labels
- "VERIFIED", "FOLIO NO.", "PLATE VII"
- Scanner status
- Technical information

## Hindi

Prefer an elegant Devanagari serif with an old-print feeling.

Recommended:

- Noto Serif Devanagari
- Tiro Devanagari Hindi
- Noto Serif Devanagari + EB Garamond pairing

Avoid:

- Rounded Hindi fonts
- Modern geometric Hindi fonts
- Heavy bold Hindi UI fonts

### Typography hierarchy

```text
Folio Title:
48–64px desktop
34–42px mobile

Section Heading:
32–42px

Card Heading:
20–26px

Body:
16–18px

Archive Label:
10–12px
Courier Prime
uppercase / small caps
letter spacing

Micro Metadata:
9–11px
Courier Prime
```

---

# 5. Page Frame

The entire website should feel like a **physical book page**.

## Desktop

Use:

```text
┌───────────────────────────────────────────────┐
│ thin archival header                          │
├───────────────────────────────────────────────┤
│                                               │
│             manuscript content                │
│                                               │
│        large outer paper margins              │
│                                               │
├───────────────────────────────────────────────┤
│ archival footer / catalogue information       │
└───────────────────────────────────────────────┘
```

Maximum content width:

```text
1180–1240px
```

The outer page background can be slightly darker than the manuscript surface.

---

# 6. Header / Navigation

The header should look like the top of an old book catalogue.

## Left

Brand:

**हस्तरेखा अभिलेख**

Small subtitle:

`VEDIC PALMISTRY ARCHIVE`

Optional:

`समुद्रिक शास्त्र • हस्तरेखा • प्राचीन परंपरा`

## Navigation

Use only 4–5 items:

- हस्तरेखा पढ़ें
- कैसे कार्य करता है
- प्राचीन ग्रंथ
- मेरा अभिलेख
- रिपोर्ट

Avoid excessive navigation.

## Right

Primary CTA:

**अपनी हस्तरेखा पढ़ें →**

Secondary:

`₹` / Language selector

### Header treatment

- No large rounded navbar
- Thin horizontal rules
- Small archival labels
- Tiny seal/emblem
- Minimal icons
- Vermillion CTA

---

# 7. Homepage Architecture

The homepage should NOT immediately start with a generic hero saying:

> "Discover your future with AI."

Instead, build the experience like opening an ancient manuscript.

---

## SECTION 01 — ARCHIVE INTRODUCTION

### Small label

`अभिलेख संख्या • SAMUDRIKA / FOLIO 01`

### Main heading

# आपकी हथेली में छिपा एक प्राचीन अभिलेख

English supporting line:

**An ancient reading of the lines, mounts and signs of the human palm.**

### Short Hindi copy

> आपकी हथेली की प्रमुख रेखाओं और पर्वतों का अध्ययन, प्राचीन हस्तरेखा परंपराओं से प्रेरित एक विस्तृत डिजिटल पठन के रूप में।

### Primary CTA

**हस्तरेखा पढ़ना प्रारम्भ करें**

### Secondary CTA

**अभिलेख की विधि देखें**

### Hero visual

Instead of a generic human portrait:

Show a **large antique palm manuscript plate**.

The palm should look like an old anatomical engraving.

Overlay:

- जीवन रेखा
- मस्तिष्क रेखा
- हृदय रेखा
- भाग्य रेखा
- गुरु पर्वत
- शुक्र पर्वत

Use thin vermillion/copper annotation lines.

---

# 8. Hero Composition

Use a two-column composition.

### Left: Editorial text

```text
ARCHIVE FOLIO 01
हस्तरेखा अभिलेख

आपकी हथेली में
एक कहानी है।

Ancient Palmistry
Digitally Preserved.

[ हस्तरेखा पढ़ें ]
```

### Right: Manuscript Plate

A physical paper/card appearance containing:

- Palm illustration
- Small handwritten-looking annotations
- Folio number
- Sanskrit/Hindi labels
- Circular seal
- "ARCHIVAL REPRODUCTION"
- tiny measurement lines

### Important

The palm image should feel like:

**a scanned 1840 manuscript plate**

—not a modern medical illustration.

---

# 9. "How It Works" Should Look Like a Manuscript Procedure

Instead of normal modern feature cards, use:

## "पठन विधि — THE READING PROTOCOL"

Three or four archival stages:

### ०१ — हस्तचित्र
**Capture**

Upload a clear palm photograph.

### ०२ — रेखा निरीक्षण
**Line Examination**

Major lines and mounts are examined.

### ०३ — शास्त्रीय मिलान
**Classical Interpretation**

Observed signs are mapped to traditional palmistry concepts.

### ०४ — अभिलेख
**Your Personal Folio**

Receive your detailed reading as an old-book style report.

Each step should resemble a **printed chapter index**.

---

# 10. Palm Upload / Scanner Page

This is the most important conversion screen.

Do NOT use a generic modern upload box.

Use a **"Manuscript Examination Plate"**.

## Header

`FOLIO VII • HASTA PARIKSHA`

# अपनी हथेली प्रस्तुत करें

Small text:

> स्पष्ट प्रकाश में हथेली का चित्र लें। रेखाएँ जितनी स्पष्ट होंगी, पठन उतना ही विस्तृत होगा।

---

## Upload area

The upload area should look like a framed manuscript plate.

```text
╔════════════════════════════════════╗
║                                    ║
║          हस्तचिह्न प्रस्तुत करें    ║
║                                    ║
║       ┌───────────────────┐        ║
║       │       ✦           │        ║
║       │    palm image      │        ║
║       │                   │        ║
║       └───────────────────┘        ║
║                                    ║
║   JPG / PNG • अधिकतम 10 MB         ║
║                                    ║
║      [ चित्र चुनें ]               ║
║                                    ║
╚════════════════════════════════════╝
```

Use a thin double border.

Avoid rounded drop zones.

---

# 11. Scanner Animation

After upload, create a historical "analysis" moment.

Instead of:

> AI is analyzing...

Show:

```text
FOLIO VII
HASTA PARIKSHA

हस्तचिह्न का निरीक्षण जारी है...

✓ मुख्य रेखाएँ
✓ पर्वत
✓ रेखा की दिशा
◌ पारंपरिक संकेतों का मिलान
```

Visual:

- Thin red scanning line
- Subtle paper movement
- Small ink annotations appearing
- Old typewriter status text

Possible status messages:

> रेखा-संरचना अंकित की जा रही है...

> प्रमुख पर्वतों का निरीक्षण...

> प्राचीन संदर्भों से मिलान...

> व्यक्तिगत अभिलेख तैयार किया जा रहा है...

This should feel like an **archivist examining a manuscript**, not an AI loading screen.

---

# 12. Palm Analysis Result Page

This should be the "wow" page.

## Page title

`PERSONAL FOLIO • HASTA 001`

# आपकी हस्तरेखा का अभिलेख

Subtitle:

**Personal Palmistry Record**

---

## Main layout

Desktop:

```text
┌──────────────────────────┬──────────────────────────────┐
│                          │                              │
│     PALM PLATE           │       READING SUMMARY       │
│                          │                              │
│  annotated palm          │  जीवन रेखा                  │
│                          │  मस्तिष्क रेखा              │
│  historical engraving    │  हृदय रेखा                 │
│                          │  भाग्य रेखा                 │
│                          │                              │
└──────────────────────────┴──────────────────────────────┘
```

Left side = visual evidence.

Right side = interpretation.

This is better than stacking everything vertically because it creates the feeling of an **archival examination plate**.

---

# 13. Palm Annotation Style

Never use thick neon lines.

Use:

- 1–2px vermillion
- 1px copper
- dashed measurement lines
- tiny numbered markers
- typewriter labels

Example:

```text
01 — जीवन रेखा
    AYUR REKHA

02 — मस्तिष्क रेखा
    MATISHA REKHA

03 — हृदय रेखा
    HRIDAYA REKHA
```

Each annotation should connect to the palm with a thin line.

---

# 14. Reading Cards

Do not use modern cards with huge rounded corners.

Use **Folio Panels**.

Example:

```text
PLATE III
HRIDAYA REKHA

हृदय रेखा

यह रेखा भावनात्मक प्रवृत्ति,
संबंधों और संवेदनशीलता से
जुड़ी पारंपरिक व्याख्याओं में
देखी जाती है।

ARCHIVAL INTERPRETATION
──────────────
मध्यम • स्पष्ट • संतुलित
```

Use double borders.

---

# 15. Trust / Disclaimer

Because palmistry is interpretive, the UI should communicate this respectfully.

Use an archival note rather than a scary legal box.

Example:

> **अभिलेखीय टिप्पणी**
>
> यह पठन पारंपरिक हस्तरेखा शास्त्र की व्याख्यात्मक परंपराओं पर आधारित है। इसे निश्चित वैज्ञानिक भविष्यवाणी या चिकित्सा/वित्तीय सलाह के रूप में न लें।

English:

> This reading is an interpretive experience inspired by traditional palmistry. It should not be treated as scientific prediction or professional medical, financial, or legal advice.

---

# 16. Pricing / Purchase Section

Do NOT make the pricing section look like a SaaS pricing table.

Instead:

# अपना निजी अभिलेख प्राप्त करें

Small archival label:

`PERSONAL FOLIO • DIGITAL EDITION`

### Example

**विस्तृत हस्तरेखा रिपोर्ट**

`₹199`

Includes:

- प्रमुख रेखाओं का विश्लेषण
- पर्वतों का अध्ययन
- व्यक्तित्व संकेत
- करियर एवं जीवन दिशा
- संबंध संकेत
- प्रमुख अवलोकन
- व्यक्तिगत PDF अभिलेख

CTA:

**मेरा अभिलेख तैयार करें — ₹199**

Secondary small text:

`एक बार का भुगतान • कोई सदस्यता नहीं`

Use Indian currency formatting:

`₹199`
`₹299`
`₹499`

Never use `$` unless international pricing is specifically enabled.

---

# 17. Payment Confirmation

After payment, do not show:

> Payment successful!

Instead:

### `ARCHIVE ENTRY CONFIRMED`

# आपका अभिलेख सुरक्षित कर लिया गया है।

> Folio No. HST-2026-XXXX

> अभिलेख तैयार किया जा रहा है...

Button:

**अपना अभिलेख खोलें**

---

# 18. Report Download Experience

This is extremely important.

The downloadable report should NOT be a normal modern PDF.

It should feel like a **historical novel / archival manuscript**.

---

# 19. PDF / Digital Report Design

## Cover

The cover should look like an old Indian scholarly book.

### Example

```text
────────────────────────────────

          हस्तरेखा अभिलेख

       HASTAREKHA ARCHIVE

              ❦

        व्यक्तिगत हस्त-पठन

       PERSONAL FOLIO

          FOLIO NO. 184

     SAMUDRIKA SHASTRA SERIES

              ❦

        संकलित एवं संरक्षित
          2026

────────────────────────────────
```

Use:

- Aged paper
- Deep red title
- Small ornamental emblem
- Thin double border
- Folio number
- Decorative fleurons
- No modern gradients
- No modern app UI

---

# 20. PDF Internal Pages

Every PDF page should look like a book page.

### Header

`HASTAREKHA ARCHIVE • FOLIO 184`

### Footer

`पृष्ठ 07 • निजी अभिलेख • गोपनीय`

### Page structure

- Large editorial heading
- Small archival metadata
- Paragraphs
- Palm diagrams
- Handwritten-style annotations
- Horizontal rules
- Occasional Sanskrit/Hindi quotations
- Marginal notes

---

# 21. PDF Chapter Structure

Recommended report:

### आवरण
**Cover**

### अध्याय I
**हस्तचिह्न का परिचय**

### अध्याय II
**प्रमुख रेखाएँ**

- जीवन रेखा
- मस्तिष्क रेखा
- हृदय रेखा
- भाग्य रेखा

### अध्याय III
**पर्वतों का अध्ययन**

- गुरु
- शनि
- सूर्य
- बुध
- शुक्र
- चन्द्र
- मंगल

### अध्याय IV
**व्यक्तित्व एवं स्वभाव**

### अध्याय V
**कार्य एवं जीवन दिशा**

### अध्याय VI
**संबंध एवं भावनात्मक संकेत**

### अध्याय VII
**प्रमुख अवलोकन**

### अंतिम पृष्ठ
**अभिलेखीय टिप्पणी**

---

# 22. PDF Visual Details

Add subtle details:

- Folio page numbers
- Registration marks
- Small manuscript ID
- Red authentication stamp
- Faded ink
- Paper texture
- Tiny decorative symbols
- Old engraving-style illustrations
- Marginal notes
- Thin double borders
- Chapter ornaments

Optional:

`❦`
`⁂`
`✦`
`॥`
`ॐ`

Use these sparingly.

---

# 23. "Old Novel" Effect

The PDF should feel inspired by a historical Indian novel.

Use:

- Large chapter openings
- Drop caps
- Wide margins
- Serif body text
- Justified paragraphs
- Ornamental separators
- Slightly imperfect paper background
- Black/brown ink
- Vermillion highlights

Example chapter opening:

> **अध्याय IV**
>
> # स्वभाव का अभिलेख
>
> *"हस्त केवल रेखाओं का समूह नहीं; परंपरा में इसे जीवन के संस्कारों का दृश्य मानचित्र माना गया है।"*

Then the actual reading.

---

# 24. Navigation UX

Keep navigation extremely simple.

## Main navigation

```text
हस्तरेखा पढ़ें
विधि
अभिलेख
रिपोर्ट
```

## Mobile

Use:

```text
☰
हस्तरेखा अभिलेख
```

Bottom sticky CTA:

**हस्तरेखा पढ़ें →**

The mobile CTA should look like a stamped archival button.

---

# 25. Mobile UX

Do not simply shrink desktop.

On mobile:

1. Title
2. Short description
3. Palm visual
4. Primary CTA
5. Reading steps
6. Upload
7. Analysis
8. Results
9. Report purchase

Avoid huge text blocks.

Palm diagram should remain readable.

Use horizontal scrolling only for archival metadata if necessary.

---

# 26. Component Design

## Buttons

### Primary

```text
background: #8E1D12
color: #F7EFE7
border: 1px solid #241B17
border-radius: 0
```

Text:

`हस्तरेखा पढ़ें →`

### Secondary

Transparent background.

Double-line border.

Text:

`अधिक जानें`

---

# 27. Cards

No floating rounded cards.

Use:

```text
background: #EFE1D4
border: 1px solid #8D7467
box-shadow: 3px 3px 0 rgba(36,27,23,.18)
border-radius: 0
```

Optional inner border:

```text
outline: 1px solid rgba(149,102,61,.55)
outline-offset: -5px
```

---

# 28. Decorative Rules

Use horizontal rules constantly but subtly.

Examples:

```text
────────────── ❦ ──────────────
```

or

```text
━━━━━━━━  FOLIO VII  ━━━━━━━━
```

These should separate chapters and sections.

---

# 29. Archive Labels

Small labels are a major part of the visual identity.

Examples:

```text
FOLIO NO. 184
ARCHIVE / HASTA / 07
SAMUDRIKA SERIES
PERSONAL RECORD
PLATE III
VERIFIED COPY
DIGITAL FACSIMILE
```

Hindi examples:

```text
अभिलेख संख्या
हस्त परीक्षण
प्रमुख निरीक्षण
पारंपरिक व्याख्या
व्यक्तिगत पठन
```

---

# 30. Iconography

Icons should resemble:

- Engraved symbols
- Old scientific diagrams
- Simple line icons
- Astrolabe markings
- Manuscript symbols

Avoid:

- 3D icons
- Gradient icons
- Cartoon icons
- Modern colorful icon sets

---

# 31. Images

Image treatment should be consistent.

Use:

- Sepia
- Warm monochrome
- Slight grain
- Paper texture
- Engraving style
- Archival photography

If using modern photos, apply a subtle historical treatment.

Never make the image overly orange.

---

# 32. Homepage Content Hierarchy

Recommended order:

```text
HEADER

↓
ARCHIVE HERO
"आपकी हथेली में एक प्राचीन अभिलेख है"

↓
PALM MANUSCRIPT VISUAL

↓
3–4 STEP READING PROTOCOL

↓
"क्या देखा जाता है?"
Major lines + mounts

↓
SAMPLE PERSONAL FOLIO
Show an example report page

↓
WHY THIS READING
Traditional interpretation / methodology

↓
REPORT PREVIEW
Show old-book PDF pages

↓
PRICING
Personal Folio

↓
ARCHIVAL DISCLAIMER

↓
FOOTER
```

This is a stronger UX flow than immediately presenting multiple dashboards.

---

# 33. Sample Report Preview Section

This section is important for conversion.

Heading:

# आपका अभिलेख ऐसा दिखाई देगा

Subtitle:

**A personal palmistry folio, preserved as a digital manuscript.**

Show 2–3 pages as realistic paper sheets.

Labels:

`FOLIO 01 — COVER`

`FOLIO 07 — MAJOR LINES`

`FOLIO 14 — INTERPRETATION`

CTA:

**अपना अभिलेख तैयार करें**

---

# 34. Footer

Footer should feel like the final page of a book.

Columns:

### हस्तरेखा अभिलेख

> प्राचीन हस्तरेखा परंपराओं से प्रेरित एक डिजिटल अभिलेख।

### संग्रह

- हस्तरेखा
- प्राचीन ग्रंथ
- पठन विधि
- प्रश्न

### सहायता

- संपर्क
- गोपनीयता
- नियम एवं शर्तें
- अस्वीकरण

Bottom:

```text
© 2026 हस्तरेखा अभिलेख
DIGITAL ARCHIVE EDITION

FOLIO / SAMUDRIKA / HASTA
```

---

# 35. UX Writing Style

Language should be:

- Respectful
- Calm
- Scholarly
- Slightly mysterious
- Never sensational
- Never clickbait-heavy

Avoid:

❌ "Know exactly what will happen to you!"

Use:

✅ "अपनी हथेली के प्रमुख संकेतों का पारंपरिक पठन प्राप्त करें।"

Avoid:

❌ "AI will predict your future."

Use:

✅ "डिजिटल विश्लेषण के माध्यम से आपकी हथेली के प्रमुख संकेतों का अभिलेख तैयार किया जाता है।"

---

# 36. Hindi + English Language Strategy

Use Hindi as the emotional / primary language.

Use English as the archival / documentary layer.

Example:

```text
हस्तरेखा अभिलेख
HASTAREKHA ARCHIVE

जीवन रेखा
LIFE LINE / AYUR REKHA

हृदय रेखा
HEART LINE / HRIDAYA REKHA

मस्तिष्क रेखा
HEAD LINE / MATISHA REKHA

भाग्य रेखा
FATE LINE / BHAGYA REKHA
```

This combination makes the website feel much more authentic than using Hindi only.

---

# 37. Cultural Design Direction

Use Indian references carefully.

Good:

- Palm-leaf manuscript motifs
- Sanskrit manuscript typography
- Devanagari
- Sindoor/vermilion
- Copper/brass
- Temple manuscript-inspired ornaments
- Traditional palmistry terminology
- Indian archival cataloguing

Avoid excessive:

- Gods/deities as decoration
- Random Om symbols everywhere
- Generic mandalas
- Neon chakras
- Crystal balls
- Western zodiac imagery
- Fake Sanskrit text

The goal is **scholarly Indian heritage**, not generic "spiritual website".

---

# 38. What Should Be Different From The Reference

The supplied reference already has a strong archival direction, but the final product should be more focused.

### Reduce

- Too many simultaneous cards
- Dense right-side panels
- Excessive metadata
- Too many red badges
- Repeated sections
- Overloaded dashboard feeling

### Improve

- Stronger hero
- Larger manuscript visual
- More whitespace
- Clearer conversion path
- Stronger report preview
- Better mobile hierarchy
- More emotional storytelling
- More consistent Hindi + English pairing
- Better distinction between "analysis" and "interpretation"

### Main principle

**One screen = one archival story.**

Don't make every screen look like a control panel.

---

# 39. Recommended Design Tokens

```css
--paper: #F7EFE7;
--paper-aged: #EFE1D4;
--paper-deep: #D8C1AD;

--ink: #241B17;
--ink-soft: #59433A;

--vermillion: #8E1D12;
--vermillion-dark: #6F120B;

--copper: #95663D;
--brass: #A27A48;
--ochre: #B78A43;

--line: #BDA79A;

--font-display: "EB Garamond";
--font-body: "EB Garamond";
--font-archive: "Courier Prime";
--font-hindi: "Noto Serif Devanagari";

--radius: 0px;

--shadow-archival:
  3px 3px 0 rgba(36,27,23,.18);
```

---

# 40. Animation

Animations should be slow and physical.

Good:

- Paper fade
- Ink appearing
- Stamp animation
- Slow scanning line
- Page-turn transition
- Subtle paper movement
- Annotation drawing itself

Avoid:

- Bouncy cards
- Spring animations
- Neon glow
- Fast UI transitions
- Glassmorphism
- Particle backgrounds

Recommended:

```text
150–250ms → small UI interaction
400–700ms → panel transition
700–1200ms → archival / manuscript reveal
```

---

# 41. Loading State

Create a unique loading screen.

```text
❦

हस्तरेखा अभिलेख

FOLIO IS BEING PREPARED

पाण्डुलिपि का पृष्ठ खोला जा रहा है...

───────────────

SAMUDRIKA ARCHIVE
```

Background should resemble paper.

---

# 42. Error State

Instead of a modern:

> Something went wrong.

Use:

### अभिलेख पढ़ने में व्यवधान

`ARCHIVE ACCESS INTERRUPTED`

> चित्र स्पष्ट नहीं था अथवा पठन प्रक्रिया पूर्ण नहीं हो सकी।

Button:

**पुनः प्रयास करें**

Secondary:

**दूसरा चित्र चुनें**

---

# 43. Empty State

### आपका निजी अभिलेख अभी रिक्त है

> अपनी पहली हस्तरेखा पठन से अपना अभिलेख प्रारम्भ करें।

CTA:

**पहला अभिलेख बनाएं**

---

# 44. Final Product Personality

The final website should feel like a combination of:

**Indian Manuscript Archive**
+
**Old Historical Novel**
+
**Museum Catalogue**
+
**Vedic Scholarly Text**
+
**19th Century Documentary Record**

It should NOT feel like:

**Astrology SaaS**
+
**AI Dashboard**
+
**Modern Horoscope App**

---

# 45. Golden Rule

Whenever a design decision is unclear, ask:

> **"अगर यह वेबसाइट 1840 के किसी भारतीय विद्वान की निजी पाण्डुलिपि का 2026 में बनाया गया डिजिटल संस्करण होती, तो यह element कैसा दिखता?"**

If the answer is:

- paper
- ink
- folio
- annotation
- stamp
- manuscript
- engraving
- catalogue
- book typography

→ use it.

If the answer is:

- gradient
- glass
- rounded SaaS card
- neon
- 3D
- modern dashboard
- oversized colorful icon

→ avoid it.

---

# 46. Recommended Primary User Journey

```text
LANDING PAGE
     ↓
"हस्तरेखा पढ़ें"
     ↓
INTRODUCTION
     ↓
PALM PHOTO UPLOAD
     ↓
FOLIO SCANNER
     ↓
PALM ANNOTATION
     ↓
INITIAL READING
     ↓
DETAILED PERSONAL FOLIO
     ↓
REPORT PREVIEW
     ↓
₹199 / ₹299 / ₹499
     ↓
PAYMENT
     ↓
ARCHIVE CREATED
     ↓
DOWNLOAD HISTORICAL PDF
```

---

# 47. Final UX Objective

The user should not feel that they are:

> "using a palm-reading website."

They should feel that they are:

> **"opening an old Indian manuscript containing a reading prepared specifically for them."**

That distinction should guide the entire UI, UX, copywriting, animation, imagery and downloadable report.

---

## Final Design Statement

**हस्तरेखा अभिलेख** should be designed as a living digital manuscript.

The website is the archive.

The palm scan is the examination plate.

The interpretation is the scholarly annotation.

The report is the personal folio.

And the downloadable PDF is the **old book that the user takes away with them.**

