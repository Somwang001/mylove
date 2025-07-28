<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fan Encouragement</title>
  <style>
    body {
      background: radial-gradient(circle at 60% 40%, #ffe0f0 0%, #ffd6ec 100%);
      font-family: 'Segoe UI', 'Arial', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      position: relative;
      overflow: hidden;
    }
    /* Cute floating hearts */
    .heart {
      position: absolute;
      width: 32px;
      height: 32px;
      background: url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f497.png') no-repeat center/contain;
      opacity: 0.5;
      animation: float 8s linear infinite;
      pointer-events: none;
    }
    .heart:nth-child(1) { left: 10%; top: 80%; animation-delay: 0s; }
    .heart:nth-child(2) { left: 80%; top: 90%; animation-delay: 2s; }
    .heart:nth-child(3) { left: 50%; top: 95%; animation-delay: 4s; }
    .heart:nth-child(4) { left: 30%; top: 85%; animation-delay: 1s; }
    .heart:nth-child(5) { left: 70%; top: 88%; animation-delay: 3s; }
    @keyframes float {
      0% { transform: translateY(0) scale(1); opacity: 0.5; }
      80% { opacity: 0.7; }
      100% { transform: translateY(-90vh) scale(1.2); opacity: 0; }
    }
    .container {
      background: rgba(255,255,255,0.97);
      border-radius: 36px;
      box-shadow: 0 16px 48px rgba(255, 128, 192, 0.18);
      padding: 56px 40px 40px 40px;
      text-align: center;
      max-width: 420px;
      border: 2px solid #ffb6d5;
      position: relative;
      z-index: 1;
    }
    h1 {
      color: #ff69b4;
      margin-bottom: 18px;
      font-size: 2.5em;
      letter-spacing: 1px;
      font-weight: 800;
      text-shadow: 0 2px 12px #ffe0f0;
    }
    p {
      color: #ff6fcb;
      font-size: 1.18em;
      margin-bottom: 24px;
    }
    .encouragement {
      font-size: 1.25em;
      color: #ff69b4;
      margin-bottom: 20px;
      min-height: 60px;
      font-weight: 600;
      background: linear-gradient(90deg, #ffe0f0 0%, #ffd6ec 100%);
      border-radius: 20px;
      padding: 18px 12px;
      box-shadow: 0 2px 16px rgba(255,128,192,0.10);
      transition: background 0.3s, color 0.3s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 2px dashed #ffb6d5;
    }
    .encouragement img {
      width: 200px;
      height: 200px;
      object-fit: cover;
      border-radius: 18px;
      margin-bottom: 12px;
      box-shadow: 0 2px 12px rgba(255,128,192,0.13);
      background: #fff3f8;
      display: block;
      border: 2px solid #ffb6d5;
    }
    button {
      background: linear-gradient(90deg, #ffb6d5 0%, #ff69b4 100%);
      color: #fff;
      border: none;
      border-radius: 20px;
      padding: 14px 36px;
      font-size: 1.15em;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(255,128,192,0.13);
      transition: background 0.2s, transform 0.2s;
      margin-top: 10px;
      letter-spacing: 1px;
    }
    button:hover {
      background: linear-gradient(90deg, #ff69b4 0%, #ffb6d5 100%);
      transform: translateY(-2px) scale(1.04);
    }
  </style>
</head>
<body onclick="playMusicOnce()">
  <!-- Floating hearts for extra cuteness -->
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="container">
    <h1>Cheer up Baby! 🐷🌟</h1>
    <p>ຢາກບອກວ່າຄວາຍເດີ😂ຢອກກຮັັກໆ!</p>
    <div class="encouragement" id="encouragement-text"></div>
    <button onclick="showEncouragement()">Show Surprise</button>
  </div>
  <!-- Hidden audio element -->
  <audio id="bg-music" src="h" loop></audio>
  <script>
    const encouragements = [
      {
        msg: "ສູ້ໆນ່າາາາາາ💪🌺",
        img: "https://img2.pic.in.th/pic/WhatsApp-Image-2025-07-28-at-08.06.09_7d350648.jpg"
      },
      {
        msg: "ເປັນກຳລັງໃຈ✌",
        img: "https://img2.pic.in.th/pic/WhatsApp-Image-2025-07-28-at-08.06.10_ca2f21e1.jpg"
      },
      {
        msg: "ຄວາຍນ້ອຍເອີ້ຍ🖕",
        img: "https://img2.pic.in.th/pic/WhatsApp-Image-2025-07-28-at-08.06.12_763a464e.jpg"
      },
      {
        msg: "Love Love💝",
        img: "https://img5.pic.in.th/file/secure-sv1/WhatsApp-Image-2025-07-28-at-08.06.10_7ea46a35.jpg"
      },
    ];
    function showEncouragement() {
      const text = document.getElementById('encouragement-text');
      const idx = Math.floor(Math.random() * encouragements.length);
      const { msg, img } = encouragements[idx];
      text.innerHTML = `<img src="${img}" alt="Encouragement image"><span>${msg}</span>`;
    }
    // Show a message and image on first load
    showEncouragement();

    // Play music on first click
    let musicPlayed = false;
    function playMusicOnce() {
      if (!musicPlayed) {
        document.getElementById('bg-music').play();
        musicPlayed = true;
      }
    }
  </script>
</body>
</html>
