document.getElementById("omamoriForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("nameInput").value.trim();
  const wishSelect = document.getElementById("wishSelect").value;
  const customWish = document.getElementById("customWish").value.trim();
  const wish = customWish || wishSelect;

  const adminPassword = "kamunaadmin999";
  const isAdmin = customWish === adminPassword;

  const now = Date.now();
  const lastGenerated = localStorage.getItem("lastGenerated");
  const twelveHours = 12 * 60 * 60 * 1000;

  if (!name && !isAdmin) {
    alert("お名前を入力してください。");
    return;
  }

  if (!isAdmin && lastGenerated && now - parseInt(lastGenerated, 10) < twelveHours) {
    document.querySelector(".container").innerHTML = `
      <h2 style="font-weight: bold;">⚠ 御守りは1日1回まで</h2>
      <p style="font-size: 16px; line-height: 1.6;">
        しっかりエネルギーを届けるために、御守りの生成は1日1回までに設定しています。<br><br>
        また明日、お越しくださいね🌿
      </p>

      <br><br>

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

  if (!isAdmin) {
    localStorage.setItem("lastGenerated", now);
  }

  const query = `name=${encodeURIComponent(name)}&wish=${encodeURIComponent(wish)}`;
  window.location.href = `result.html?${query}`;
});
