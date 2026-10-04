/**
 * AuraPalm / Hastarekha Archive — AI Vision Palm Analyzer
 * Dispatches uploaded palm photo to Cloudflare Function /api/analyze-palm
 * With seamless direct Gemini Vision fallback if tested on local static server.
 */

window.AiPalmAnalyzer = {
  getApiKey() {
    try {
      return localStorage.getItem('gemini_api_key') || window.PUBLIC_GEMINI_API_KEY || '';
    } catch (e) {
      return '';
    }
  },

  setApiKey(key) {
    try {
      if (key) {
        localStorage.setItem('gemini_api_key', key.trim());
      } else {
        localStorage.removeItem('gemini_api_key');
      }
    } catch (e) {}
  },

  async analyze(dataUrl, polarity = 'right') {
    // 1. Try serverless endpoint first (/api/analyze-palm)
    try {
      const serverRes = await fetch('/api/analyze-palm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl, polarity })
      });

      if (serverRes.ok) {
        const data = await serverRes.json();
        if (data.success && data.analysis) {
          console.log('✅ Real Gemini Vision analysis received from serverless function!');
          return { success: true, isRealAi: true, data: data.analysis };
        }
        if (data.error === 'NO_API_KEY') {
          console.warn('Server reported no API key in environment.');
        }
      }
    } catch (err) {
      console.warn('Cloudflare /api/analyze-palm endpoint not available (local static mode):', err);
    }

    // 2. Client-side fallback if user stored an API key in localStorage
    const clientKey = this.getApiKey();
    if (clientKey) {
      console.log('⚡ Using client-configured Gemini Vision API key...');
      try {
        const result = await this.callGeminiDirect(clientKey, dataUrl, polarity);
        if (result && result.success) {
          return result;
        }
      } catch (err) {
        console.error('Direct Gemini Vision call failed:', err);
      }
    }

    // 3. Fallback to classical baseline template if no key is configured
    console.log('ℹ️ Running in classical baseline mode (No Gemini API key detected).');
    return {
      success: true,
      isRealAi: false,
      message: 'No API key configured. Displaying classical Samudrika Shastra baseline.'
    };
  },

  async callGeminiDirect(apiKey, dataUrl, polarity) {
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) throw new Error('Invalid image format');
    const mimeType = match[1];
    const base64Data = match[2];

    const handText = polarity === 'left' ? 'वाम हस्त (Left Palm • Receptive)' : 'दक्षिण हस्त (Right Palm • Active)';

    const prompt = `
You are a venerable 1800s Indian Samudrika Shastra scholar analyzing this photograph of a human palm (${handText}).
Examine the image carefully: line curves, depth, lengths, branches, mount elevations, skin texture, and rare markings.
Return ONLY a valid JSON object matching this schema:
{
  "harmonyScore": 92,
  "handType": "जल एवं वायु तत्व (Water & Air Archetype)",
  "skinTexture": "स्निग्ध, कोमल एवं संवेदनशील (Sattvic & Sensitive)",
  "polarity": "${polarity}",
  "mainSynthesis": "2-3 dignified sentences in Hindi summarizing the palm synthesis.",
  "lines": {
    "life": { "num": "01", "name": "जीवन रेखा — AYUR REKHA", "element": "पृथ्वी तत्व • प्राण शक्ति एवं जीवनी ऊर्जा", "confidence": "९६.५% शुद्धता", "summary": "Detailed reading in dignified Hindi based on the actual palm image.", "timing": "स्थिर ऊर्जा व स्वास्थ्य काल: २५ से ७२ वर्ष", "archival": "दीर्घ • अखण्डित • ओजस्वी" },
    "head": { "num": "02", "name": "मस्तिष्क रेखा — MATISHA REKHA", "element": "वायु तत्व • विवेक, प्रज्ञा एवं निर्णय क्षमता", "confidence": "९७.१% शुद्धता", "summary": "Detailed reading in dignified Hindi based on actual palm.", "timing": "बौद्धिक व व्यापारिक उत्कर्ष: ३० से ३८ वर्ष", "archival": "द्विमुखी • प्रखर • संतुलित" },
    "heart": { "num": "03", "name": "हृदय रेखा — HRIDAYA REKHA", "element": "जल तत्व • आत्मीय निष्ठा एवं संवेदनशीलता", "confidence": "९८.२% शुद्धता", "summary": "Detailed reading in dignified Hindi based on actual palm.", "timing": "महत्वपूर्ण कर्म फल काल: २६ से ३५ वर्ष", "archival": "मध्यम • स्पष्ट • संतुलित" },
    "fate": { "num": "04", "name": "भाग्य रेखा — BHAGYA REKHA", "element": "आकाश तत्व • स्वतंत्र उद्यम एवं यश", "confidence": "९४.८% शुद्धता", "summary": "Detailed reading in dignified Hindi based on actual palm.", "timing": "महत्वपूर्ण भाग्योदय काल: ३१ से ३६ वर्ष", "archival": "ऊर्ध्वगामी • स्वतंत्र • तेजस्वी" },
    "apollo": { "num": "05", "name": "सूर्य रेखा व पर्वत — SURYA REKHA", "element": "अग्नि तत्व • कीर्ति, पद-प्रतिष्ठा एवं संपन्नता", "confidence": "९३.०% शुद्धता", "summary": "Detailed reading in dignified Hindi based on actual palm.", "timing": "सर्वोच्च प्रतिष्ठा योग: ३५ वर्ष से आगे", "archival": "स्पष्ट • गरिमामयी • स्थिर" }
  },
  "mounts": [
    { "name": "चंद्र पर्वत (LUNA)", "elevation": "९६% उत्थान", "desc": "गहन अंतर्ज्ञान, स्वप्न-चेतना तथा दूरगामी रचनात्मकता।" },
    { "name": "शुक्र पर्वत (VENUS)", "elevation": "९४% उत्थान", "desc": "सौंदर्य बोध, आत्मीय अनुराग एवं प्राण ऊर्जा की प्रचुरता।" },
    { "name": "गुरु पर्वत (JUPITER)", "elevation": "९२% उत्थान", "desc": "स्वाभाविक नेतृत्व, उच्च नैतिक आदर्श एवं आध्यात्मिक गरिमा।" },
    { "name": "शनि पर्वत (SATURN)", "elevation": "८८% उत्थान", "desc": "कर्म-निष्ठा, आत्म-अनुशासन एवं दार्शनिक गंभीरता।" }
  ],
  "rareSigns": [
    { "title": "गुह्य क्रॉस (LA CROIX MYSTIQUE)", "badge": "दुर्लभ चिह्न", "desc": "हृदय एवं मस्तिष्क रेखा के मध्य स्थित यह क्रॉस गहन अंतर्ज्ञान का संकेत देता है।" },
    { "title": "लेखक-द्विमुख सिरा (WRITER'S FORK)", "badge": "विशिष्ट", "desc": "मस्तिष्क रेखा का चंद्र-गामी सिरा प्रखर विचार-संप्रेषण का वरदान देता है।" }
  ],
  "destinyPhases": [
    { "years": "२१ — २६ वर्ष", "event": "आत्म-खोज, विद्या अध्ययन तथा स्वतंत्र उद्यम का अंकुरण।" },
    { "years": "२७ — ३४ वर्ष", "event": "महत्वपूर्ण कर्म फल, आत्मीय संबंध स्थापना एवं स्थिरता।" },
    { "years": "३५ — ४५ वर्ष", "event": "सार्वजनिक प्रतिष्ठा, आर्थिक स्वावलंबन एवं भाग्योदय का मध्याह्न काल।" },
    { "years": "४६+ वर्ष", "event": "आध्यात्मिक परिपक्वता, परामर्शदाता की भूमिका एवं यश-विस्तार।" }
  ],
  "novelQuote": "हस्त केवल रेखाओं का समूह नहीं; परंपरा में इसे जीवन के संस्कारों का दृश्य मानचित्र माना गया है।",
  "novelChapter": "यह पाण्डुलिपि प्रमाणित करती है कि आपका मूल स्वभाव बाह्य आडंबर से विरक्त तथा आंतरिक आत्मसम्मान से परिपूर्ण है।"
}
`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const res = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              { inlineData: { mimeType, data: base64Data } }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!res.ok) {
      throw new Error('Gemini API Error: ' + res.statusText);
    }

    const data = await res.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(candidateText.replace(/```json/g, '').replace(/```/g, '').trim());

    return {
      success: true,
      isRealAi: true,
      data: parsed
    };
  }
};
