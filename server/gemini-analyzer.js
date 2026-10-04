import fs from 'node:fs';
import path from 'node:path';

export function getLocalGeminiApiKey() {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/GEMINI_API_KEY=([^\r\n]+)/);
      if (match && match[1]) {
        const val = match[1].trim();
        if (val && val !== 'your_gemini_api_key_here') {
          return val;
        }
      }
    }
  } catch (e) {
    console.warn('Could not read .env for Gemini API key:', e.message);
  }
  return process.env.GEMINI_API_KEY || '';
}

export async function processPalmVisionAnalysis({ image, polarity = 'right', apiKey }) {
  if (!apiKey) {
    apiKey = getLocalGeminiApiKey();
  }

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return {
      success: false,
      error: 'NO_API_KEY',
      message: 'Google Gemini API Key is not configured in backend environment or .env file.'
    };
  }

  if (!image || !image.startsWith('data:image/')) {
    return {
      success: false,
      error: 'INVALID_IMAGE',
      message: 'Valid palm image Data URL is required.'
    };
  }

  const match = image.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    return {
      success: false,
      error: 'PARSE_FAILED',
      message: 'Could not parse base64 image data.'
    };
  }

  const mimeType = match[1];
  const base64Data = match[2];
  const handText = polarity === 'left' ? 'वाम हस्त (Left Palm • Receptive/Inherent)' : 'दक्षिण हस्त (Right Palm • Active/Manifested)';

  const prompt = `
You are a venerable 1800s Indian Samudrika Shastra master and scholar analyzing this photograph of a human palm (${handText}).
Examine the image carefully: the curvature, depth, length, breaks, branches, and forks of the palm lines, the elevation of the planetary mounts (Jupiter, Saturn, Sun, Mercury, Venus, Moon, Mars), skin texture, and any rare markings (such as Mystic Cross, Writer's Fork, Star, Triangle, Trident, Moles).

Analyze the actual hand shown in the image and return a strictly valid JSON object (no markdown code blocks, just raw JSON) following this exact schema:

{
  "harmonyScore": 92,
  "handType": "जल एवं वायु तत्व (Water & Air Archetype)",
  "skinTexture": "स्निग्ध, कोमल एवं संवेदनशील (Sattvic & Sensitive)",
  "polarity": "${polarity}",
  "mainSynthesis": "A 2-3 sentence scholarly synthesis in classical Hindi about the overall alignment of the palm lines and destiny indicators observed in this specific palm.",
  "lines": {
    "life": {
      "num": "01",
      "name": "जीवन रेखा — AYUR REKHA",
      "element": "पृथ्वी तत्व • प्राण शक्ति एवं जीवनी ऊर्जा",
      "confidence": "९६.५% शुद्धता",
      "summary": "Detailed reading in dignified Hindi based on the actual length, curve, and vitality of the life line in the image.",
      "timing": "स्थिर ऊर्जा व स्वास्थ्य काल: २५ से ७२ वर्ष",
      "archival": "दीर्घ • अखण्डित • ओजस्वी"
    },
    "head": {
      "num": "02",
      "name": "मस्तिष्क रेखा — MATISHA REKHA",
      "element": "वायु तत्व • विवेक, प्रज्ञा एवं निर्णय क्षमता",
      "confidence": "९७.१% शुद्धता",
      "summary": "Detailed reading in dignified Hindi based on whether the head line is straight or sloped toward the Moon mount, and any forks observed.",
      "timing": "बौद्धिक व व्यापारिक उत्कर्ष: ३० से ३८ वर्ष",
      "archival": "द्विमुखी • प्रखर • संतुलित"
    },
    "heart": {
      "num": "03",
      "name": "हृदय रेखा — HRIDAYA REKHA",
      "element": "जल तत्व • आत्मीय निष्ठा एवं संवेदनशीलता",
      "confidence": "९८.२% शुद्धता",
      "summary": "Detailed reading in dignified Hindi analyzing the curve towards Jupiter mount and emotional nature.",
      "timing": "महत्वपूर्ण कर्म फल काल: २६ से ३५ वर्ष",
      "archival": "मध्यम • स्पष्ट • संतुलित"
    },
    "fate": {
      "num": "04",
      "name": "भाग्य रेखा — BHAGYA REKHA",
      "element": "आकाश तत्व • स्वतंत्र उद्यम एवं यश",
      "confidence": "९४.८% शुद्धता",
      "summary": "Detailed reading in dignified Hindi describing origin and vertical trajectory towards Saturn mount.",
      "timing": "महत्वपूर्ण भाग्योदय काल: ३१ से ३६ वर्ष",
      "archival": "ऊर्ध्वगामी • स्वतंत्र • तेजस्वी"
    },
    "apollo": {
      "num": "05",
      "name": "सूर्य रेखा व पर्वत — SURYA REKHA",
      "element": "अग्नि तत्व • कीर्ति, पद-प्रतिष्ठा एवं संपन्नता",
      "confidence": "९३.०% शुद्धता",
      "summary": "Detailed reading in dignified Hindi about public honor, reputation, and creative success under the ring finger.",
      "timing": "सर्वोच्च प्रतिष्ठा योग: ३५ वर्ष से आगे",
      "archival": "स्पष्ट • गरिमामयी • स्थिर"
    }
  },
  "mounts": [
    { "name": "चंद्र पर्वत (LUNA)", "elevation": "९६% उत्थान", "desc": "गहन अंतर्ज्ञान, स्वप्न-चेतना तथा दूरगामी रचनात्मकता।" },
    { "name": "शुक्र पर्वत (VENUS)", "elevation": "९४% उत्थान", "desc": "सौंदर्य बोध, आत्मीय अनुराग एवं प्राण ऊर्जा की प्रचुरता।" },
    { "name": "गुरु पर्वत (JUPITER)", "elevation": "९२% उत्थान", "desc": "स्वाभाविक नेतृत्व, उच्च नैतिक आदर्श एवं आध्यात्मिक गरिमा।" },
    { "name": "शनि पर्वत (SATURN)", "elevation": "८८% उत्थान", "desc": "कर्म-निष्ठा, आत्म-अनुशासन एवं दार्शनिक गंभीरता।" }
  ],
  "rareSigns": [
    {
      "title": "गुह्य क्रॉस (LA CROIX MYSTIQUE)",
      "badge": "दुर्लभ चिह्न",
      "desc": "हृदय एवं मस्तिष्क रेखा के मध्य स्थित यह क्रॉस गहन अंतर्ज्ञान और आध्यात्मिक सुरक्षा का संकेत देता है।"
    },
    {
      "title": "लेखक-द्विमुख सिरा (WRITER'S FORK)",
      "badge": "विशिष्ट",
      "desc": "मस्तिष्क रेखा का चंद्र-गामी सिरा प्रखर विचार-संप्रेषण तथा प्रभावशाली अभिव्यक्ति का वरदान देता है।"
    }
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

Ensure the response contains only the valid JSON string.
`;

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const geminiPayload = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(geminiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(geminiPayload)
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Gemini Vision API Error:', errText);
    return {
      success: false,
      error: 'API_ERROR',
      message: 'Gemini Vision API error: ' + response.statusText,
      details: errText
    };
  }

  const geminiData = await response.json();
  const candidateText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!candidateText) {
    return {
      success: false,
      error: 'EMPTY_RESPONSE',
      message: 'Gemini returned empty response.'
    };
  }

  let parsedResult;
  try {
    parsedResult = JSON.parse(candidateText.replace(/```json/g, '').replace(/```/g, '').trim());
  } catch (parseErr) {
    console.error('JSON Parse error on AI output:', parseErr, candidateText);
    return {
      success: false,
      error: 'PARSE_FAILED',
      rawText: candidateText
    };
  }

  return {
    success: true,
    analysis: parsedResult,
    isRealAi: true,
    model: 'gemini-2.0-flash',
    analyzedAt: new Date().toISOString()
  };
}
