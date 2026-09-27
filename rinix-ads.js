(function () {
  // ✅ JSON directly embed — no fetch needed
  const ADS_DATA = [
    {
      "id": "ad_normal_01",
      "type": "NORMAL",
      "title": "GhostLine Chat App",
      "targetUrl": "https://ghostline-chat.netlify.app",
      "status": "ACTIVE",
      "svgCode": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 250' width='100%' height='auto'><rect width='100%' height='100%' fill='#0d1117'/><text x='50%' y='42%' dominant-baseline='middle' text-anchor='middle' fill='#58a6ff' font-size='24' font-family='sans-serif' font-weight='bold'>GhostLine</text><text x='50%' y='58%' dominant-baseline='middle' text-anchor='middle' fill='#8b949e' font-size='13' font-family='sans-serif'>Anonymous Chat App</text><text x='50%' y='72%' dominant-baseline='middle' text-anchor='middle' fill='#238636' font-size='11' font-family='sans-serif'>ghostline-chat.netlify.app</text></svg>"
    },
    {
      "id": "ad_bottom_01",
      "type": "BOTTOM",
      "title": "Noor Shayari Platform",
      "targetUrl": "https://noor.rinix.online",
      "status": "ACTIVE",
      "svgCode": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 728 90' width='100%' height='auto'><rect width='100%' height='100%' fill='#161b22'/><text x='50%' y='42%' dominant-baseline='middle' text-anchor='middle' fill='#f5d76e' font-size='22' font-family='sans-serif' font-weight='bold'>✦ Noor ✦ Shayari Platform</text><text x='50%' y='68%' dominant-baseline='middle' text-anchor='middle' fill='#238636' font-size='14' font-family='sans-serif' font-weight='bold'>noor.rinix.online →</text></svg>"
    }
  ];

  function renderAds() {
    try {
      console.log("🔄 Rinix Ads loading...");
      const activeAds = ADS_DATA.filter(ad => ad.status === "ACTIVE");
      if (activeAds.length === 0) return;

      // Normal Ad
      const normalSlot = document.getElementById("rinix-ad-normal");
      if (normalSlot) {
        const normalAds = activeAds.filter(ad => ad.type === "NORMAL");
        if (normalAds.length > 0) {
          const ad = normalAds[Math.floor(Math.random() * normalAds.length)];
          renderNormalAd(normalSlot, ad);
        }
      }

      // Bottom Ad
      const bottomSlot = document.getElementById("rinix-ad-bottom");
      if (bottomSlot) {
        const bottomAds = activeAds.filter(ad => ad.type === "BOTTOM");
        if (bottomAds.length > 0) {
          const ad = bottomAds[Math.floor(Math.random() * bottomAds.length)];
          renderBottomAd(bottomSlot, ad);
        }
      }

      console.log("✅ Rinix Ads rendered");
    } catch (err) {
      console.error("💥 Rinix Ads Error:", err);
    }
  }

  function renderNormalAd(container, ad) {
    container.innerHTML = `
      <div style="display:inline-block; position:relative; max-width:100%; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
        <a href="${ad.targetUrl}" target="_blank" rel="noopener" style="display:block; text-decoration:none; line-height:0;">
          ${ad.svgCode}
        </a>
        <span style="position:absolute; bottom:5px; right:5px; background:rgba(0,0,0,0.7); color:#ffffff; font-size:9px; font-family:sans-serif; padding:2px 6px; border-radius:3px; pointer-events:none;">Ad by Rinix</span>
      </div>
    `;
  }

  function renderBottomAd(container, ad) {
    container.innerHTML = `
      <div id="rinix-bottom-banner" style="position:fixed; bottom:0; left:0; width:100%; z-index:999999; background:rgba(13, 17, 23, 0.95); backdrop-filter:blur(8px); border-top:1px solid #30363d; padding:8px 0; display:flex; justify-content:center; align-items:center;">
        <button onclick="document.getElementById('rinix-bottom-banner').remove()" style="position:absolute; top:-12px; right:12px; background:#21262d; color:#c9d1d9; border:1px solid #30363d; border-radius:50%; width:24px; height:24px; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-weight:bold;">✕</button>
        <div style="position:relative; width:100%; max-width:728px; padding:0 10px;">
          <a href="${ad.targetUrl}" target="_blank" rel="noopener" style="display:block; text-decoration:none; line-height:0;">
            ${ad.svgCode}
          </a>
          <span style="position:absolute; bottom:4px; right:14px; background:rgba(0,0,0,0.7); color:#ffffff; font-size:8px; font-family:sans-serif; padding:1px 4px; border-radius:2px; pointer-events:none;">Ad by Rinix</span>
        </div>
      </div>
    `;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAds);
  } else {
    renderAds();
  }
})();