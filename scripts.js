window.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const name = decodeURIComponent(params.get("name") || "");
  const wish = decodeURIComponent(params.get("wish") || "");
  const isAdmin = params.get("admin") === "1";

  const now = Date.now();
  const lastGenerated = parseInt(localStorage.getItem("lastGenerated") || "0", 10);
  const twelveHours = 12 * 60 * 60 * 1000;

  const canvasEl = document.getElementById("omamoriCanvas");
  const healingMessageEl = document.querySelector(".healing-message");
  const introMessageEl = document.getElementById("introMessage"); // ← 追加ポイント

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
      <div style="
        background: linear-gradient(135deg, #fff8e7, #fdf6ec);
        border-radius: 12px;
        padding: 24px;
        margin: 20px auto;
        max-width: 520px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        text-align: center;
        color: #444;
      ">
        <h2 style="margin-top: 0;">🌿 また明日お越しください</h2>
        <p style="font-size: 16px; line-height: 1.7;">
          エネルギーを大切にお届けするため、御守りの生成は<br>
          <strong>12時間に1回</strong>までとなっています。<br><br>
          よければヒーリング動画をご覧になってリラックスしてください。
        </p>

        <div style="
          margin-top: 24px;
          padding: 16px;
          background: #fff6dc;
          border: 1px solid #e0cfaa;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.6;
          text-align: left;
        ">
          <strong>📱 スマホでアプリのように使うには</strong><br><br>
          <strong>【Android（Chrome）】</strong><br>
          ・このページをChromeで開く<br>
          ・「ホーム画面に追加」または「アプリをインストール」<br>
          ・確認後「追加」→ ホームにKAMUNAアイコンが表示されます<br><br>

          <strong>【iOS（Safari）】</strong><br>
          ・このページをSafariで開く<br>
          ・下の共有アイコン（⬆）→「ホーム画面に追加」<br>
          ・アイコン名を確認し「追加」
        </div>
      </div>
    `;
  }

  return; // 護符生成は中断
}

  // 通常ユーザーなら記録更新
  if (!isAdmin) {
    localStorage.setItem("lastGenerated", now);
  }

  // 護符生成処理
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
