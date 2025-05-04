
// index.html 用（フォーム送信時に遷移）
document.getElementById("omamoriForm")?.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("nameInput").value;
  const wishSelect = document.getElementById("wishSelect").value;
  const customWish = document.getElementById("customWish").value;
  const wish = customWish ? customWish : wishSelect;

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

  // 縦書き：一文字ずつ描画
  const centerX = canvas.width / 2;
  let startY = 120;

  for (let i = 0; i < name.length; i++) {
    ctx.fillText(name[i], centerX - 20, startY + i * 24);
  }

  for (let j = 0; j < wish.length; j++) {
    ctx.fillText(wish[j], centerX + 20, startY + j * 24);
  }
};


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
