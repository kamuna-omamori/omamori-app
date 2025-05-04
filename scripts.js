document.getElementById("omamoriForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const lastGenerated = localStorage.getItem("lastGenerated");
  const now = Date.now();
  const twelveHours = 12 * 60 * 60 * 1000;

  const videoUrls = [
    "https://www.youtube.com/embed/Jtgcss9Fygo?autoplay=1",
    "https://www.youtube.com/embed/P1fGiun03Sk?autoplay=1",
    "https://www.youtube.com/embed/2DxSSjdH63c?autoplay=1",
    "https://www.youtube.com/embed/cHcDAJ9Au0E?autoplay=1",
    "https://www.youtube.com/embed/7sIHFbId6SE?autoplay=1"
  ];
  const randomVideo = videoUrls[Math.floor(Math.random() * videoUrls.length)];

  if (lastGenerated && now - parseInt(lastGenerated) < twelveHours) {
    document.getElementById("omamoriResult").innerHTML = `
      <div class="tsukimi-box">
        <p class="tsukimi-title">🌑 新月の大祓会（Zoom）ご案内 🌑</p>
        <a class="tsukimi-button" href="https://docs.google.com/forms/d/e/1FAIpQLSfpOiJ8jg00s8nSXmiD6kzCUOJP19XhNR0mb9WFrAjxTfbEFw/viewform?usp=dialog" target="_blank">
          ▶ ご参加はこちら
        </a>
        <p class="tsukimi-text">
          KAMUNAの祈りと祓いの会を新月の日に行っています。<br><br>
          このアプリで神秘的なエネルギーを感じた方は、ぜひご参加ください。
        </p>
      </div>

      <br><br><br>

      <p style="font-size: 16px; line-height: 1.6; font-weight: bold;">
        KAMUNAのヒーリング動画で更にリラックス<br><br>
        呼吸や身体の変化を視聴する前後で感じてみてくださいね
      </p>

      <div id="videoContainer">
        <iframe id="healingVideo" width="100%" height="315" src="${randomVideo}" allowfullscreen></iframe>
      </div>

      <br><br>

      <div class="sns-links">
        <p style="font-weight: bold;">KAMUNAのSNS</p>
        <ul style="list-style: none; padding: 0;">
          <li><a href="https://www.facebook.com/profile.php?id=61575515507055" target="_blank">Facebook</a></li>
          <li><a href="https://www.instagram.com/kamuna_organic" target="_blank">Instagram</a></li>
          <li><a href="https://note.com/kamuna_9999" target="_blank">note</a></li>
        </ul>
      </div>
    `;
    return;
  }

  // 制限されていなければ、ここで記録し、御守り生成を開始
  localStorage.setItem("lastGenerated", now);

  const name = document.getElementById("nameInput").value;
  const wishSelect = document.getElementById("wishSelect").value;
  const customWish = document.getElementById("customWish").value;
  const wish = customWish ? customWish : wishSelect;

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

  document.getElementById("healingVideo").src = randomVideo;
});
