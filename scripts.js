window.addEventListener("DOMContentLoaded", function () {
  // URLパラメータから名前と願いを取得
  const params = new URLSearchParams(window.location.search);
  const name = decodeURIComponent(params.get("name") || "");
  const wish = decodeURIComponent(params.get("wish") || "");

  // 護符のcanvas設定
  const canvas = document.getElementById("omamoriCanvas");
  const ctx = canvas.getContext("2d");
  const bgImage = new Image();
  bgImage.src = "assets/omamori_background.jpg"; // ファイル名とパスは正確に！

  bgImage.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000";
    ctx.font = "20px serif";
    ctx.textAlign = "center";

    // 名前と願いを縦書き表示
    const verticalText = `${name}　${wish}`;
    const x = canvas.width / 2;
    const yStart = 80;
    const lineHeight = 24;

    for (let i = 0; i < verticalText.length; i++) {
      ctx.fillText(verticalText[i], x, yStart + i * lineHeight);
    }
  };

  // ランダムにヒーリング動画を選択
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
