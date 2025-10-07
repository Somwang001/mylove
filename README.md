<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ลอยกระทงออนไลน์</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="scene">
        <h1>ลอยกระทงออนไลน์</h1>
        <p>คลิกที่ผืนน้ำเพื่อลอยกระทง</p>
        <div id="river"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>/* ตั้งค่าพื้นฐานและพื้นหลังท้องฟ้า */
body {
    margin: 0;
    font-family: 'Sarabun', sans-serif; /* ใช้ฟอนต์ที่ดูเป็นไทย (ถ้ามีในเครื่อง) */
    background: linear-gradient(to bottom, #010a1b, #0e2a4a);
    color: white;
    overflow: hidden; /* ซ่อน scrollbar */
    text-align: center;
}

.scene {
    position: relative;
    width: 100vw;
    height: 100vh;
}

h1 {
    padding-top: 20px;
    font-size: 3em;
    color: #ffdf73;
    text-shadow: 0 0 10px #ffc400;
}

p {
    font-size: 1.2em;
    color: #f0f0f0;
}

/* สไตล์ของแม่น้ำ */
#river {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60vh;
    background: linear-gradient(to bottom, #003366, #00509E);
    cursor: pointer;
    overflow: hidden; /* ป้องกันกระทงล้นออกด้านข้างก่อนเวลา */
}

/* สไตล์ของกระทง */
.krathong {
    position: absolute;
    width: 80px; /* ขนาดกระทง */
    height: auto;
    pointer-events: none; /* ทำให้คลิกทะลุตัวกระทงได้ */
    transform-origin: center bottom;
    animation: bobbing 3s ease-in-out infinite,
               drifting 25s linear forwards; /* ใช้ 2 animations พร้อมกัน */
}

/* Animation ให้กระทงขยับขึ้นลงเหมือนลอยบนน้ำ */
@keyframes bobbing {
    0%, 100% {
        transform: translateY(0) rotate(-1deg);
    }
    50% {
        transform: translateY(-10px) rotate(1deg);
    }
}

/* Animation ให้กระทงลอยไปตามน้ำจากซ้ายไปขวา */
@keyframes drifting {
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateX(110vw); /* ลอยไปจนสุดขอบฟ้าด้านขวา */
        opacity: 0;
    }
}
// หารูปกระทงสวยๆ จากอินเทอร์เน็ต (ควรเป็นไฟล์ .png ที่มีพื้นหลังโปร่งใส)
// หรือใช้ URL นี้เป็นตัวอย่างได้เลยครับ
const krathongImageSrc = 'https://i.imgur.com/gE2YvCP.png';

// ดึง Element ของแม่น้ำมา
const river = document.getElementById('river');

// ฟังก์ชันสำหรับสร้างกระทง
function createKrathong(x, y) {
    const krathong = document.createElement('img');
    krathong.src = krathongImageSrc;
    krathong.className = 'krathong';

    // กำหนดตำแหน่งเริ่มต้นของกระทง
    // x - 40 เพื่อให้คลิกอยู่ตรงกลางกระทง (ขนาดกระทง 80px)
    // y - 40 เพื่อให้กระทงอยู่เหนือน้ำเล็กน้อย
    krathong.style.left = `${x - 40}px`;
    krathong.style.top = `${y - 40}px`;

    // สุ่มความเร็วในการลอยเพื่อให้ดูเป็นธรรมชาติ
    const driftDuration = 20 + Math.random() * 15; // ลอยระหว่าง 20-35 วินาที
    krathong.style.animationDuration = `3s, s`;

    // เพิ่มกระทงลงไปในแม่น้ำ
    river.appendChild(krathong);

    // เมื่อกระทงลอยจบ animation แล้ว ให้ลบออกจากหน้าเว็บ
    // เพื่อไม่ให้เว็บทำงานช้าลงเมื่อมีกระทงเยอะๆ
    setTimeout(() => {
        krathong.remove();
    }, driftDuration * 1000);
}

// เพิ่ม Event Listener รอรับการคลิกบนแม่น้ำ
river.addEventListener('click', (event) => {
    // event.clientX คือตำแหน่งแนวนอนที่คลิก
    // river.getBoundingClientRect().top คือตำแหน่งขอบบนของแม่น้ำ
    // เราต้องลบตำแหน่งขอบบนออกเพื่อให้ได้ตำแหน่งที่ถูกต้องภายในพื้นที่แม่น้ำ
    const clickX = event.clientX;
    const clickY = event.clientY - river.getBoundingClientRect().top;

    createKrathong(clickX, clickY);
});

