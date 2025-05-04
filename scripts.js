window.addEventListener("DOMContentLoaded", function () {
  // --- ① 12時間制限のチェック ---
  const lastGenerated = localStorage.getItem("lastGenerated");
  const now = Date.now();
  const twelveHours = 12 * 60 * 60 * 1000;

  if (lastGenerated && now - parseInt(lastGenerated) < twelveHours) {
    alert("このアプリは12時間に1回のみ使用できます。\nしばらく時間をおいてお試しください。");
    return;
  }

  // 制限クリア → 今の時間を保存
  localStorage.setItem("lastGenerated", now);

  // --- ② URLパラメータから名前と願いを取得 ---
  const params = new URLSearchParams(window.location.search);
  const name = decodeURIComponent(params.get("name") || "");
  const wish = decodeURIComponent(params.get("wish") || "");

  // --- ③ 護符描画処理 ---
  const canvas = document.getElementById("omamoriCanvas");
  const ctx = canvas.getContext("2d");
  const bgImage = new Image();
  bgImage.src = "assets/omamori_background.jpg";

  bgImage.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    const centerX = canvas.width / 2;
    const lineHeight = 24;

    // --- 願いと名前を縦書きで左右に表示 ---
    ctx.font = "20px serif";
    const totalLines = Math.max(name.length, wish.length);
    const totalHeight = totalLines * lineHeight;
    const startY = (canvas.height - totalHeight) / 2 + 10;

    for (let i = 0; i < name.length; i++) {
      ctx.fillText(name[i], centerX - 30, startY + i * lineHeight);
    }

    for (let j = 0; j < wish.length; j++) {
      ctx.fillText(wish[j], centerX + 30, startY + j * lineHeight);
    }

    // --- おまもり屋 KAMUNA（小さく左端に）---
    ctx.font = "14px serif";
    const brandText = "おまもり屋 KAMUNA";
    const brandX = 20;
    const brandYStart = 80;

    for (let k = 0; k < brandText.length; k++) {
      ctx.fillText(brandText[k], brandX, brandYStart + k * lineHeight);
    }
  };

  // --- ④ ランダム動画の表示 ---
  const videoUrls = [
    "https://www.youtube.com/embed/Jtgcss9Fygo?autoplay=1",
    "https://www.youtube.com/embed/P1fGiun03Sk?autoplay=1",
    "https://www.youtube.com/embed/2DxSSjdH63c?autoplay=1",
    "https://www.youtube.com/embed/cHcDAJ9Au0E?autoplay=1",
    "https://www.youtube.com/embed/7sIHFbId6SE?autoplay=1"
  ];
  const selected = videoUrls[Math.floor(Math.random() * videoUrls.length)];
  document.getElementById("healingVideo").src = selected;
});
