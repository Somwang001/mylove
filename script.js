document.addEventListener('DOMContentLoaded', () => {
    const river = document.getElementById('river');
    const wishModal = document.getElementById('wish-modal');
    const wishInput = document.getElementById('wish-input');
    const submitWishBtn = document.getElementById('submit-wish');
    const cancelWishBtn = document.getElementById('cancel-wish');
    const krathongSelectionContainer = document.getElementById('krathong-selection');

    // --- รูปภาพกระทงสำหรับให้เลือก ---
    const krathongImageSources = [
        'https://www.mcp.ac.th/student/sday/event7.fld/image003.png', // แบบที่ 1 (ดอกไม้รวม)
        'https://www.okusanpix.com/wp-content/uploads/2019/10/b17cfe529740a6e610907c76dbb292ee.png', // แบบที่ 2 (สีชมพู)
        'https://pngbie.com/assets/images/icon/Pngbie-%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%9F%E0%B8%A3%E0%B8%B5-20221030022923.png'  // แบบที่ 3 (ใบตอง)
    ];
    let selectedKrathongSrc = krathongImageSources[0]; // ตั้งค่าเริ่มต้น

    let lastClickPosition = { x: 0, y: 0 };

    // --- เมื่อคลิกที่แม่น้ำ ---
    river.addEventListener('click', (event) => {
        // เก็บตำแหน่งที่คลิก
        lastClickPosition.x = event.clientX;
        lastClickPosition.y = event.clientY;
        // แสดงหน้าต่างสำหรับอธิษฐาน
        wishModal.style.visibility = 'visible';
        wishModal.style.opacity = 1;
        wishModal.style.transitionDelay = '0s';
        wishInput.focus();
    });

    // --- เมื่อกดยืนยันการอธิษฐาน ---
    submitWishBtn.addEventListener('click', () => {
        // ส่ง flag `isUser: true` เพื่อบอกว่าเป็นกระทงของผู้ใช้
        createKrathong(lastClickPosition.x, lastClickPosition.y, wishInput.value, {
            isUser: true
        });
        hideModal();
    });

    // --- เมื่อกดยกเลิก ---
    cancelWishBtn.addEventListener('click', () => {
        hideModal();
    });

    function hideModal() {
        wishModal.style.visibility = 'hidden';
        wishModal.style.opacity = 0;
        wishModal.style.transitionDelay = '0.3s';
        wishInput.value = ''; // ล้างข้อความในช่องอธิษฐาน
    }

    function createKrathong(x, y, wishText, options = {}) {
        const krathong = document.createElement('img');
        krathong.className = 'krathong';

        if (options.isUser) {
            // --- สำหรับกระทงของผู้ใช้ ---
            krathong.src = selectedKrathongSrc; // ใช้รูปกระทงที่เลือก
            krathong.classList.add('user-krathong');
            // กำหนดตำแหน่งเริ่มต้น ณ จุดที่คลิก
            krathong.style.left = `${x - 50}px`; // 50 คือครึ่งความกว้าง
            krathong.style.top = `${y - 50}px`; // 50 คือครึ่งความสูง
            // กำหนดทิศทางการลอยแนวนอนแบบสุ่ม
            const endX = (Math.random() - 0.5) * 200; // ส่ายไปซ้ายหรือขวา
            krathong.style.setProperty('--tx-user-end', `${endX}px`);

            // ลบกระทงของผู้ใช้ออกเมื่ออนิเมชันจบลง
            krathong.addEventListener('animationend', () => {
                krathong.remove();
            });
        } else {
            // --- สำหรับกระทงทั่วไป (ของคนอื่นและกระทงเริ่มต้น) ---
            // สุ่มกระทงจากทั้งหมดที่มี
            krathong.src = krathongImageSources[Math.floor(Math.random() * krathongImageSources.length)];
            const startX = x - (window.innerWidth / 2);
            const midX = startX + (Math.random() - 0.5) * 200;
            const endX = startX + (Math.random() - 0.5) * 400;

            krathong.style.setProperty('--tx-start', `${startX}px`);
            krathong.style.setProperty('--tx-mid', `${midX}px`);
            krathong.style.setProperty('--tx-end', `${endX}px`);

            if (options.animationDelay) {
                krathong.style.animationDelay = options.animationDelay;
            }
            krathong.style.animationDuration = options.animationDuration || '25s';
        }

        river.appendChild(krathong);

        // --- แสดงคำอธิษฐาน (ถ้ามี) ---
        if (wishText) {
            const wishElement = document.createElement('div');
            wishElement.className = 'wish-text';
            wishElement.innerText = wishText;
            wishElement.style.position = 'absolute';
            wishElement.style.left = `${x}px`;
            wishElement.style.top = `${y - 60}px`; // แสดงเหนือกระทง
            wishElement.style.color = 'white';
            wishElement.style.textShadow = '0 0 5px black';
            wishElement.style.opacity = 0;
            wishElement.style.transition = 'opacity 1s 0.5s'; // ค่อยๆ แสดงขึ้นมา
            river.appendChild(wishElement);

            setTimeout(() => { wishElement.style.opacity = 1; }, 100); //หน่วงเวลาให้แสดงผล
            setTimeout(() => { wishElement.style.opacity = 0; }, 5000); // ค่อยๆ หายไปใน 5 วินาที
            setTimeout(() => { wishElement.remove(); }, 6000);
        }
    }

    // --- สร้างกระทงของคนอื่นแบบสุ่ม ---
    function createRandomKrathong() {
        const randomX = Math.random() * window.innerWidth; // สุ่มตำแหน่งแนวนอน
        const randomDuration = 25 + Math.random() * 15; // สุ่มระยะเวลาลอย 25-40 วินาที

        // ตำแหน่ง Y ไม่จำเป็นแล้ว เพราะ animation จะจัดการให้เริ่มจากด้านล่าง
        createKrathong(randomX, 0, null, {
            animationDuration: `${randomDuration}s`
        });
    }

    // --- สร้างกระทงเริ่มต้นเมื่อเปิดหน้าเว็บ ---
    function initializeKrathongs() {
        const numberOfKrathongs = 15; // จำนวนกระทงเริ่มต้น
        for (let i = 0; i < numberOfKrathongs; i++) {
            const randomX = Math.random() * window.innerWidth;
            const randomDelay = `-${Math.random() * 30}s`; // ทำให้ animation เริ่ม ณ จุดที่ต่างกัน
            const randomDuration = 25 + Math.random() * 15;
            createKrathong(randomX, 0, null, { animationDelay: randomDelay, animationDuration: `${randomDuration}s` });
        }
    }

    // --- สร้างตัวเลือกกระทงในหน้าต่าง Modal ---
    function populateKrathongSelection() {
        krathongImageSources.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'krathong-choice';
            img.dataset.src = src;

            // ตั้งค่าให้กระทงแรกถูกเลือกเป็นค่าเริ่มต้น
            if (index === 0) {
                img.classList.add('selected');
            }

            img.addEventListener('click', () => {
                // เอา class 'selected' ออกจากอันเก่า
                document.querySelector('.krathong-choice.selected').classList.remove('selected');
                // เพิ่ม class 'selected' ให้อันที่เพิ่งคลิก
                img.classList.add('selected');
                // อัปเดตตัวแปรที่เก็บรูปที่ถูกเลือก
                selectedKrathongSrc = img.dataset.src;
            });
            krathongSelectionContainer.appendChild(img);
        });
    }

    populateKrathongSelection(); // สร้างตัวเลือกกระทง
    initializeKrathongs();       // สร้างกระทงเริ่มต้น
    setInterval(createRandomKrathong, 2000); // ลดเวลาให้กระทงใหม่มาเร็วขึ้น
});