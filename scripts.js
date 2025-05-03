document.getElementById("omamoriForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // 入力値の取得
  const name = document.getElementById("nameInput").value;
  const wishSelect = document.getElementById("wishSelect").value;
  const customWish = document.getElementById("customWish").value;
  const wish = customWish ? customWish : wishSelect;

  // 護符画像の描画
  const canvas = document.getElementById("omamoriCanvas");
  const ctx = canvas.getContext("2d");

  // 背景画像の読み込み（護符画像）
  const backgroundImage = new Image();
  backgroundImage.src = "omamori_background.jpg"; // あなたがアップロードした画像ファイル名に変更してください

  backgroundImage.onload = function () {
    // 背景を描画
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // 名前の描画
    ctx.font = "20px serif";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText(name + " 様", canvas.width / 2, canvas.height / 2 + 10);

    // 願いの描画（必要であれば）
    // ctx.fillText("願意: " + wish, canvas.width / 2, canvas.height / 2 + 40);
  };

  // ランダムなヒーリング動画の再生
  const videoUrls = [
    "https://www.youtube.com/embed/Jtgcss9Fygo?autoplay=1",
    "https://www.youtube.com/embed/P1fGiun03Sk?autoplay=1",
    "https://www.youtube.com/embed/2DxSSjdH63c?autoplay=1",
    "https://www.youtube.com/embed/cHcDAJ9Au0E?autoplay=1",
    "https://www.youtube.com/embed/7sIHFbId6SE?autoplay=1"
  ];
  const selectedUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
  document.getElementById("healingVideo").src = selectedUrl;
});


