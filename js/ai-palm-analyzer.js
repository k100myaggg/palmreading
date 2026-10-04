/**
 * AuraPalm / Hastarekha Archive — AI Vision Palm Analyzer
 * Dispatches uploaded palm photo to Backend Endpoint: /api/analyze-palm
 * (Cloudflare Pages Functions in production / Vite backend middleware in local dev)
 * All API key authentication is handled strictly on the backend.
 */

window.AiPalmAnalyzer = {
  async analyze(dataUrl, polarity = 'right') {
    try {
      const serverRes = await fetch('/api/analyze-palm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl, polarity })
      });

      if (serverRes.ok) {
        const data = await serverRes.json();
        if (data.success && data.analysis) {
          console.log('✅ Real Gemini Vision analysis received from backend endpoint!');
          return { success: true, isRealAi: true, data: data.analysis };
        }
        if (data.error === 'NOT_A_PALM') {
          console.warn('Backend rejected non-palm specimen:', data.message);
          return {
            success: false,
            isRealAi: true,
            error: 'NOT_A_PALM',
            message: data.message || 'प्रस्तुत चित्र किसी मानव हथेली का नहीं है। कृपया स्पष्ट प्रकाश में अपनी खुली हथेली का चित्र प्रस्तुत करें।'
          };
        }
        if (data.error === 'NO_API_KEY') {
          console.warn('Backend reported no GEMINI_API_KEY configured in environment.');
        } else if (data.message) {
          console.warn('Backend analysis notice:', data.message);
        }
      }
    } catch (err) {
      console.warn('Backend /api/analyze-palm request failed:', err);
    }

    // Graceful baseline mode if backend API key is not yet configured or network drops
    console.log('ℹ️ Running in classical Samudrika Shastra baseline mode.');
    return {
      success: true,
      isRealAi: false,
      message: 'Running in classical Samudrika Shastra baseline mode.'
    };
  }
};
