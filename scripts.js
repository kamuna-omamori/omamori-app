window.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const isAdmin = params.get("admin") === "1";
  const now = Date.now();
  const lastGenerated = parseInt(localStorage.getItem("lastGenerated") || "0", 10);
  const twelveHours = 12 * 60 * 60 * 1000;

  if (!isAdmin && (now - lastGenerated < twelveHours)) {
    // 制限中のメッセージ表示（御守りは出さず、動画などは可）
    document.querySelector(".container").innerHTML = `
      <h2 style="font-weight:bold;">🌿 また明日お越しください</h2>
      <p style="font-size:16px;">御守りのエネルギーを大切にお届けするため、<br>1日1回の生成に制限しています。</p>
      <div class="video-wrapper" style="margin-top: 24px;">
        <iframe id="healingVideo" src="" allowfullscreen></iframe>
      </div>
    `;

    // 動画だけは表示（同じランダム処理）
    const videoUrls = [
      "https://www.youtube.com/embed/Jtgcss9Fygo?autoplay=1",
      "https://www.youtube.com/embed/P1fGiun03Sk?autoplay=1",
      "https://www.youtube.com/embed/2DxSSjdH63c?autoplay=1",
      "https://www.youtube.com/embed/cHcDAJ9Au0E?autoplay=1",
      "https://www.youtube.com/embed/7sIHFbId6SE?autoplay=1"
    ];
    const selected = videoUrls[Math.floor(Math.random() * videoUrls.length)];
    setTimeout(() => {
      const iframe = document.getElementById("healingVideo");
      if (iframe) iframe.src = selected;
    }, 100);
    
    return; // ここで他の処理を止める
  }

  // 制限解除 or 管理者なら記録して処理続行
  if (!isAdmin) {
    localStorage.setItem("lastGenerated", now);
  }

  // この下に既存の護符生成処理などを続けて記述
});


  // 護符 Canvas 描画
  const canvas = document.getElementById("omamoriCanvas");
  const ctx = canvas.getContext("2d");

  const bgImage = new Image();
  bgImage.src = "assets/omamori_background.jpg"; // 正しいパスに注意！

  bgImage.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const lineHeight = 24;

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";

    // 名前と願い（縦書き、左右に分ける）
    const totalLines = Math.max(name.length, wish.length);
    const totalHeight = totalLines * lineHeight;
    const startY = (canvas.height - totalHeight) / 2 + 10;

    ctx.font = "20px serif";
    for (let i = 0; i < name.length; i++) {
      ctx.fillText(name[i], centerX - 30, startY + i * lineHeight);
    }
    for (let j = 0; j < wish.length; j++) {
      ctx.fillText(wish[j], centerX + 30, startY + j * lineHeight);
    }

    // ブランド名（左端に小さく縦書き）
    const brandText = "おまもり屋 KAMUNA";
    ctx.font = "14px serif";
    for (let k = 0; k < brandText.length; k++) {
      ctx.fillText(brandText[k], 20, 80 + k * lineHeight);
    }
  };

  // ランダムなヒーリング動画を表示
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
