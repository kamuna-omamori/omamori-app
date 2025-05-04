window.addEventListener("DOMContentLoaded", function () {
  // URLパラメータからデータ取得
  const params = new URLSearchParams(window.location.search);
  const name = decodeURIComponent(params.get("name") || "");
  const wish = decodeURIComponent(params.get("wish") || "");

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

// 粒子エフェクト
const particleCanvas = document.getElementById("particleCanvas");
const pCtx = particleCanvas.getContext("2d");
const particles = [];

function createParticle() {
  const angle = Math.random() * 2 * Math.PI;
  const speed = Math.random() * 1.5 + 0.5;
  particles.push({
    x: particleCanvas.width / 2,
    y: particleCanvas.height / 2,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: Math.random() * 2 + 1,
    alpha: 1
  });
}

function drawParticles() {
  pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.01;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }

    pCtx.beginPath();
    pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    pCtx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`; // 淡い金色
    pCtx.fill();
  }
}

// アニメーションループ
function animateParticles() {
  createParticle();
  drawParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();
