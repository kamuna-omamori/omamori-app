window.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const name = decodeURIComponent(params.get("name") || "");
  const wish = decodeURIComponent(params.get("wish") || "");
  const isAdmin = params.get("admin") === "1";

  // ヒーリング動画は常に再生（制限なし）
  const videoUrls = [
    "https://www.youtube.com/embed/Jtgcss9Fygo?autoplay=1",
    "https://www.youtube.com/embed/P1fGiun03Sk?autoplay=1",
    "https://www.youtube.com/embed/2DxSSjdH63c?autoplay=1",
    "https://www.youtube.com/embed/cHcDAJ9Au0E?autoplay=1",
    "https://www.youtube.com/embed/7sIHFbId6SE?autoplay=1"
  ];
  const selected = videoUrls[Math.floor(Math.random() * videoUrls.length)];
  document.getElementById("healingVideo").src = selected;

  // 制限チェック（管理者はスキップ）
  const lastGenerated = localStorage.getItem("lastGenerated");
  const now = Date.now();
  const twelveHours = 12 * 60 * 60 * 1000;

  if (!isAdmin && lastGenerated && now - parseInt(lastGenerated) < twelveHours) {
    // 制限中は護符を表示せず、動画だけ
    console.log("御守り生成は制限中です");
    return;
  }

  // 制限を記録（管理者以外）
  if (!isAdmin) {
    localStorage.setItem("lastGenerated", now);
  }

  // 護符画像の生成
  const canvas = document.getElementById("omamoriCanvas");
  const ctx = canvas.getContext("2d");
  const bgImage = new Image();
  bgImage.src = "assets/omamori_background.jpg";

  bgImage.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    ctx.font = "20px serif";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";

    const centerX = canvas.width / 2;
    const lineHeight = 24;

    const totalLines = Math.max(name.length, wish.length);
    const totalHeight = totalLines * lineHeight;
    const startY = (canvas.height - totalHeight) / 2 + 10;

    // 名前（縦書き・左）
    for (let i = 0; i < name.length; i++) {
      ctx.fillText(name[i], centerX - 30, startY + i * lineHeight);
    }

    // 願い（縦書き・右）
    for (let j = 0; j < wish.length; j++) {
      ctx.fillText(wish[j], centerX + 30, startY + j * lineHeight);
    }

    // 「おまもり屋 KAMUNA」（縦書き・左端、小さめ）
    ctx.font = "14px serif"; // 小さく設定
    const brandText = "おまもり屋 KAMUNA";
    const brandX = 20;
    const brandYStart = 80;
    for (let k = 0; k < brandText.length; k++) {
      ctx.fillText(brandText[k], brandX, brandYStart + k * lineHeight);
    }
  };
});
