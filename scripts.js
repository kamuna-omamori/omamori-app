
document.getElementById("omamoriForm")?.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("nameInput").value;
  const selectedWish = document.getElementById("wishSelect").value;
  const customWish = document.getElementById("customWish").value;
  const finalWish = customWish.trim() !== "" ? customWish : selectedWish;

  localStorage.setItem("omamoriName", name);
  localStorage.setItem("omamoriWish", finalWish);
  window.location.href = "result.html";
});

window.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("omamoriCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const image = new Image();
  image.src = "assets/omamori_background.jpg";
  image.onload = function () {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const name = localStorage.getItem("omamoriName") || "";
    const wish = localStorage.getItem("omamoriWish") || "";

    ctx.font = "20px 'serif'";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.save();
    ctx.translate(150, 100);
    ctx.rotate(Math.PI / 2);
    ctx.fillText(name, 0, 0);
    ctx.fillText(wish, 40, 0);
    ctx.restore();
  };

  const videos = [
    "https://www.youtube.com/embed/Y5OBGcH-fSM?autoplay=1",
    "https://www.youtube.com/embed/BT4fKJz1ebc?autoplay=1",
    "https://www.youtube.com/embed/xadgNW7xEes?autoplay=1"
  ];
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  const iframe = document.getElementById("healingVideo");
  if (iframe) iframe.src = randomVideo;

  const adviceList = {
    "健康": "日々の小さな疲れに気づいて休むことが健康への第一歩です。",
    "家内安全": "家庭の空気はあなたの心を映します。笑顔のあいさつを忘れずに。",
    "恋愛成就": "まず自分自身を大切にすることが、良縁を引き寄せます。"
  };
  const adviceContainer = document.getElementById("adviceContainer");
  const advice = adviceList[wish] || "あなたの願いが叶いますように。";
  if (adviceContainer) adviceContainer.textContent = advice;
});
