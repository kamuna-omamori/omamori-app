// index.html 用（フォーム送信時に遷移）
document.getElementById("omamoriForm")?.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("nameInput").value;
  const wishSelect = document.getElementById("wishSelect").value;
  const customWish = document.getElementById("customWish").value;
  const wish = customWish ? customWish : wishSelect;

  // ローカルストレージに保存して result.html に渡す
  localStorage.setItem("name", name);
  localStorage.setItem("wish", wish);

  window.location.href = "result.html";
});

// result.html 用（ページ読み込み時に表示）
window.addEventListener("DOMContentLoaded", function () {
  const name = localStorage.getItem("name") || "";
  const wish = localStorage.getItem("wish") || "";

  const canvas = document.getElementById("omamoriCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const backgroundImage = new Image();
  backgroundImage.src = "assets/omamori_background.jpg";

  backgroundImage.onload = function () {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.font = "20px serif";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";

  const centerX = canvas.width / 2;
  const lineHeight = 24;

  // 行数に応じて中央から開始位置を調整
  const totalLines = Math.max(name.length, wish.length);
  const totalHeight = totalLines * lineHeight;
  const startY = (canvas.height - totalHeight) / 2 + 10;

  for (let i = 0; i < name.length; i++) {
    ctx.fillText(name[i], centerX - 30, startY + i * lineHeight);
  }

  for (let j = 0; j < wish.length; j++) {
    ctx.fillText(wish[j], centerX + 30, startY + j * lineHeight);
  }
};

  backgroundImage.onerror = function () {
    console.error("画像の読み込みに失敗しました。ファイルパスを確認してください。");
  };

  // ヒーリング動画のランダム再生
  const videoUrls = [
    "https://www.youtube.com/embed/Jtgcss9Fygo?autoplay=1",
    "https://www.youtube.com/embed/P1fGiun03Sk?autoplay=1",
    "https://www.youtube.com/embed/2DxSSjdH63c?autoplay=1",
    "https://www.youtube.com/embed/cHcDAJ9Au0E?autoplay=1",
    "https://www.youtube.com/embed/7sIHFbId6SE?autoplay=1"
  ];
  const selectedUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
  const iframe = document.getElementById("healingVideo");
  if (iframe) iframe.src = selectedUrl;
});
