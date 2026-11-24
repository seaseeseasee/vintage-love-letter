// แก้ไขข้อความใน LETTER ได้ตามต้องการ
const LETTER = {
  greeting: "My dearest,",
  message: `บางครั้งก็มีความรู้สึกมากมายที่ไม่รู้จะเริ่มต้นบอกอย่างไร
แต่มีเรื่องหนึ่งที่อยากให้เธอรู้ไว้...

ขอบคุณที่เข้ามาเป็นส่วนหนึ่งของเรื่องราวในชีวิต
ขอบคุณสำหรับรอยยิ้ม ช่วงเวลาดี ๆ และความทรงจำเล็ก ๆ
ที่ทำให้วันธรรมดากลายเป็นวันที่พิเศษ

ไม่ว่าหนทางข้างหน้าจะเป็นอย่างไร
ขอให้รู้ว่ายังมีใครคนหนึ่งที่ปรารถนาดีต่อเธอเสมอ

ขอให้ทุกวันของเธอเต็มไปด้วยความอบอุ่น
และมีเหตุผลให้ยิ้มได้ในทุก ๆ เช้า`,
  signoff: "With all my heart,",
  sender: "Someone who cares about you ♡",
  // ใส่ชื่อไฟล์รูปใน assets เช่น "our-memory.jpg" หรือปล่อยว่าง ""
  photo: "",
  photoCaption: "A little memory to keep",
  // เพลงต้องเป็นไฟล์ MP3 ที่คุณมีสิทธิ์ใช้งาน วางไว้ที่ assets/music.mp3
};

const intro = document.getElementById("intro");
const letterView = document.getElementById("letterView");
const envelopeWrap = document.getElementById("envelopeWrap");
const openButton = document.getElementById("openButton");
const replayButton = document.getElementById("replayButton");
const musicButton = document.getElementById("musicButton");
const audio = document.getElementById("backgroundMusic");
const ambient = document.getElementById("ambient");
const body = document.getElementById("letterBody");
let typingTimer;

document.getElementById("letterHeading").textContent = LETTER.greeting;
document.getElementById("signature").textContent = LETTER.signoff;
document.getElementById("sender").textContent = LETTER.sender;
document.getElementById("photoCaption").textContent = LETTER.photoCaption;
if (LETTER.photo) {
  const photo = document.getElementById("memoryPhoto");
  photo.src = "assets/" + LETTER.photo;
  document.getElementById("photoFrame").classList.remove("hidden");
}

function createMagicRing() {
  const ring = document.createElement("div");
  ring.className = "magic-ring";
  document.body.appendChild(ring);
  requestAnimationFrame(() => ring.classList.add("cast"));
  setTimeout(() => ring.remove(), 2000);
}

function floatParticles(count = 18) {
  const symbols = ["✦", "✧", "♡", "·"];
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.className = Math.random() > .58 ? "heart" : "sparkle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.bottom = "-20px";
    particle.style.setProperty("--duration", (4 + Math.random() * 4) + "s");
    particle.style.fontSize = (12 + Math.random() * 14) + "px";
    ambient.appendChild(particle);
    setTimeout(() => particle.remove(), 8500);
  }
}

function typeLetter() {
  clearInterval(typingTimer);
  body.textContent = "";
  let index = 0;
  const text = LETTER.message;
  typingTimer = setInterval(() => {
    body.textContent += text[index] || "";
    index++;
    if (index >= text.length) clearInterval(typingTimer);
  }, 38);
}

function openLetter() {
  openButton.disabled = true;
  envelopeWrap.classList.add("opening");
  createMagicRing();
  floatParticles(28);
  setTimeout(() => {
    intro.classList.add("hidden");
    letterView.classList.remove("hidden");
    typeLetter();
    floatParticles(12);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 1250);
}

openButton.addEventListener("click", openLetter);
replayButton.addEventListener("click", () => {
  letterView.classList.add("hidden");
  intro.classList.remove("hidden");
  envelopeWrap.classList.remove("opening");
  openButton.disabled = false;
  body.textContent = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
  floatParticles(10);
});

musicButton.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicButton.textContent = "♫  Pause music";
      musicButton.setAttribute("aria-pressed", "true");
    } catch {
      musicButton.textContent = "Add assets/music.mp3";
    }
  } else {
    audio.pause();
    musicButton.textContent = "♫  Play music";
    musicButton.setAttribute("aria-pressed", "false");
  }
});
