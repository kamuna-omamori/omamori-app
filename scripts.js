
const form = document.getElementById('omamoriForm');
const canvas = document.getElementById('omamoriCanvas');
const ctx = canvas.getContext('2d');
const video = document.getElementById('healingVideo');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('nameInput').value;
  const select = document.getElementById('wishSelect').value;
  const custom = document.getElementById('customWish').value;
  const wish = select || custom || '願い';

  const background = new Image();
  background.src = 'assets/omamori_background.jpg';

  background.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.font = '32px serif';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    for (let i = 0; i < name.length; i++) {
      ctx.fillText(name[i], canvas.width / 2 - 30, 200 + i * 40);
    }
    for (let i = 0; i < wish.length; i++) {
      ctx.fillText(wish[i], canvas.width / 2 + 30, 200 + i * 40);
    }
  };

  const playlist = [
    "https://www.youtube.com/embed/videoseries?list=PLfsSnb5JQ6XEmAOiYGBZ8YOPK-Eu1B1mE"
  ];
  const randomUrl = playlist[Math.floor(Math.random() * playlist.length)];
  video.src = randomUrl;
});
