(function () {
  const ADS_JSON_URL = "https://ads.rinix.online/ads.json";

  async function loadRinixAds() {
    try {
      const res = await fetch(ADS_JSON_URL);
      if (!res.ok) return;

      const ads = await res.json();
      const activeAds = ads.filter(ad => ad.status === "ACTIVE");
      if (activeAds.length === 0) return;

      // 1. Render Normal Content Ad
      const normalSlot = document.getElementById("rinix-ad-normal");
      if (normalSlot) {
        const normalAds = activeAds.filter(ad => ad.type === "NORMAL");
        if (normalAds.length > 0) {
          const ad = normalAds[Math.floor(Math.random() * normalAds.length)];
          renderNormalAd(normalSlot, ad);
        }
      }

      // 2. Render Sticky Bottom Ad
      const bottomSlot = document.getElementById("rinix-ad-bottom");
      if (bottomSlot) {
        const bottomAds = activeAds.filter(ad => ad.type === "BOTTOM");
        if (bottomAds.length > 0) {
          const ad = bottomAds[Math.floor(Math.random() * bottomAds.length)];
          renderBottomAd(bottomSlot, ad);
        }
      }

    } catch (err) {
      console.error("Rinix Ads Error:", err);
    }
  }

  // Ad content builder (imageUrl preferred, svgCode fallback)
  function buildAdContent(ad, imgStyle) {
    if (ad.imageUrl) {
      return `<img src="${ad.imageUrl}" alt="${ad.imageAlt || ad.title || 'Ad'}" style="${imgStyle}" />`;
    }
    if (ad.svgCode) {
      return ad.svgCode;
    }
    return `<span style="color:#fff; font-family:sans-serif; font-size:14px;">${ad.title || 'Ad'}</span>`;
  }

  // Normal Ad UI
  function renderNormalAd(container, ad) {
    const content = buildAdContent(
      ad,
      "display:block; max-width:100%; height:auto; border-radius:8px;"
    );

    container.innerHTML = `
      <div style="display:inline-block; position:relative; max-width:100%; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
        <a href="${ad.targetUrl}" target="_blank" rel="noopener" style="display:block; text-decoration:none; line-height:0;">
          ${content}
        </a>
        <span style="position:absolute; bottom:5px; right:5px; background:rgba(0,0,0,0.7); color:#ffffff; font-size:9px; font-family:sans-serif; padding:2px 6px; border-radius:3px; pointer-events:none;">Ad by Rinix</span>
      </div>
    `;
  }

  // Bottom Sticky Ad UI
  function renderBottomAd(container, ad) {
    const content = buildAdContent(
      ad,
      "display:block; width:100%; max-width:728px; height:auto; margin:0 auto;"
    );

    container.innerHTML = `
      <div id="rinix-bottom-banner" style="position:fixed; bottom:0; left:0; width:100%; z-index:999999; background:rgba(13, 17, 23, 0.95); backdrop-filter:blur(8px); border-top:1px solid #30363d; padding:8px 0; display:flex; justify-content:center; align-items:center;">
        
        <!-- Close Button -->
        <button onclick="document.getElementById('rinix-bottom-banner').remove()" style="position:absolute; top:-12px; right:12px; background:#21262d; color:#c9d1d9; border:1px solid #30363d; border-radius:50%; width:24px; height:24px; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-weight:bold;">✕</button>

        <!-- Ad Container -->
        <div style="position:relative; width:100%; max-width:728px; padding:0 10px;">
          <a href="${ad.targetUrl}" target="_blank" rel="noopener" style="display:block; text-decoration:none; line-height:0;">
            ${content}
          </a>
          <span style="position:absolute; bottom:4px; right:14px; background:rgba(0,0,0,0.7); color:#ffffff; font-size:8px; font-family:sans-serif; padding:1px 4px; border-radius:2px; pointer-events:none;">Ad by Rinix</span>
        </div>

      </div>
    `;
  }

  if (document.readyState === "complete") {
    loadRinixAds();
  } else {
    window.addEventListener("load", loadRinixAds);
  }
})();