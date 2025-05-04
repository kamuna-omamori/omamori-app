window.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const name = decodeURIComponent(params.get("name") || "");
  const wish = decodeURIComponent(params.get("wish") || "");
  const isAdmin = params.get("admin") === "1";

  const now = Date.now();
  const lastGenerated = parseInt(localStorage.getItem("lastGenerated") || "0", 10);
  const twelveHours = 12 * 60 * 60 * 1000;
  const healingMessageEl = document.querySelector(".healing-message");
  const canvasEl = document.getElementById("omamoriCanvas");

  // ランダムなヒーリング動画を常に表示
  const videoUrls = [
    "https://www.youtube.com/embed/Jtgcss9Fygo?autoplay=1",
    "https://www.youtube.com/embed/P1fGiun03Sk?autoplay=1",
    "https://www.youtube.com/embed/2DxSSjdH63c?autoplay=1",
    "https://www.youtube.com/embed/cHcDAJ9Au0E?autoplay=1",
    "https://www.youtube.com/embed/7sIHFbId6SE?autoplay=1"
  ];
  const selected = videoUrls[Math.floor(Math.random() * videoUrls.length)];
  document.getElementById("healingVideo").src = selected;

  // 通常ユーザーで制限中なら護符非表示＆メッセージ表示
  if (!isAdmin && (now - lastGenerated < twelveHours)) {
    if (canvasEl) canvasEl.style.display = "none";
    if (healingMessageEl) {
      healingMessageEl.innerHTML = `
        <h2>🌿 また明日お越しください</h2>
        <p style="font-size: 16px; line-height: 1.6;">
          エネルギーを大切にお届けするため、御守りの生成は12時間に1回までとなっています。<br>
          よければヒーリング動画をご覧になってリラックスしてください。
        </p>
      `;
    }
    return; // 護符生成は中断
  }

  // 通常ユーザーなら記録更新（管理者は更新しない）
  if (!isAdmin) {
    localStorage.setItem("lastGenerated", now);
  }

  // --- 護符生成処理（ここから） ---
  const ctx = canvasEl.getContext("2d");
  const bgImage = new Image();
  bgImage.src = "assets/omamori_background.jpg";

  bgImage.onload = function () {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.drawImage(bgImage, 0, 0, canvasEl.width, canvasEl.height);

    const centerX = canvasEl.width / 2;
    const lineHeight = 24;

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.font = "20px serif";

    const totalLines = Math.max(name.length, wish.length);
    const totalHeight = totalLines * lineHeight;
    const startY = (canvasEl.height - totalHeight) / 2 + 10;

    for (let i = 0; i < name.length; i++) {
      ctx.fillText(name[i], centerX - 30, startY + i * lineHeight);
    }
    for (let j = 0; j < wish.length; j++) {
      ctx.fillText(wish[j], centerX + 30, startY + j * lineHeight);
    }

    // ブランド名
    const brandText = "おまもり屋 KAMUNA";
    ctx.font = "14px serif";
    for (let k = 0; k < brandText.length; k++) {
      ctx.fillText(brandText[k], 20, 80 + k * lineHeight);
    }
  };
});
