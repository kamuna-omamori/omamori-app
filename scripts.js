window.addEventListener("DOMContentLoaded", function () {
  // URLパラメータから名前と願いを取得
  const params = new URLSearchParams(window.location.search);
  const name = decodeURIComponent(params.get("name") || "");
  const wish = decodeURIComponent(params.get("wish") || "");

  // 護符のcanvas設定
  const canvas = document.getElementById("omamoriCanvas");
  const ctx = canvas.getContext("2d");
  const bgImage = new Image();
  bgImage.src = "assets/omamori_background.jpg"; // 正しいファイル名・パス

  bgImage.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    ctx.font = "25px serif";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";

    const centerX = canvas.width / 2;
    const lineHeight = 24;

    // 名前と願いの文字数に応じて中央寄せ
    const totalLines = Math.max(name.length, wish.length);
    const totalHeight = totalLines * lineHeight;
    const startY = (canvas.height - totalHeight) / 2 + 10;

    // 名前（縦書き 左寄り）
    for (let i = 0; i < name.length; i++) {
      ctx.fillText(name[i], centerX - 30, startY + i * lineHeight);
    }

    // 願い（縦書き 右寄り）
    for (let j = 0; j < wish.length; j++) {
      ctx.fillText(wish[j], centerX + 30, startY + j * lineHeight);
    }

   // ブランド名（縦書き 左端に）
ctx.font = "10px serif";  // 👈 ブランド名用の小さめフォント
const brandText = "おまもり屋 KAMUNA";
const brandX = 20;
const brandYStart = 80;

for (let k = 0; k < brandText.length; k++) {
  ctx.fillText(brandText[k], brandX, brandYStart + k * lineHeight);
}

  // ランダムなヒーリング動画を選択して埋め込み
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
