document.getElementById("omamoriForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // 入力取得
  const name = document.getElementById("nameInput").value;
  const wishSelect = document.getElementById("wishSelect").value;
  const customWish = document.getElementById("customWish").value;
  const wish = customWish ? customWish : wishSelect;

  // ランダム動画URL
  const videoUrls = [
    "https://www.youtube.com/embed/Jtgcss9Fygo?autoplay=1",
    "https://www.youtube.com/embed/P1fGiun03Sk?autoplay=1",
    "https://www.youtube.com/embed/2DxSSjdH63c?autoplay=1",
    "https://www.youtube.com/embed/cHcDAJ9Au0E?autoplay=1",
    "https://www.youtube.com/embed/7sIHFbId6SE?autoplay=1"
  ];
  const randomVideo = videoUrls[Math.floor(Math.random() * videoUrls.length)];

  // 護符描画
  const canvas = document.getElementById("omamoriCanvas");
  const ctx = canvas.getContext("2d");
  const backgroundImage = new Image();
  backgroundImage.src = "assets/omamori_background.jpg";

  backgroundImage.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000";
    ctx.font = "20px serif";
    ctx.textAlign = "center";

    const verticalText = `${name}　${wish}`;
    const x = canvas.width / 2;
    const yStart = 80;
    const lineHeight = 24;

    for (let i = 0; i < verticalText.length; i++) {
      ctx.fillText(verticalText[i], x, yStart + i * lineHeight);
    }
  };

  // 動画反映
  document.getElementById("healingVideo").src = randomVideo;
});
