/* =========================================================
   FULL WORKING JS (PART 1)
   Opening → Letter → Menu → Memory Lane → Quiz
========================================================= */

const app = document.getElementById("app");

// GLOBAL STATE
const state = {
  herName: ""
};

/* =======================
   MEMORY IMAGES
======================= */
const MEMORY_PHOTO_IDS = [
  "1qGk5DqIDBWNd4aK9j1gYvXw0-i1MJc6I",
  "1_eU68LBJPvKKsWifdvFxu6GuhwJqcYQe",
  "1FwqW1DZttDMKNE3SnhBUX3I7AyOCTOc_",
  "1FwqW1DZttDMKNE3SnhBUX3I7AyOCTOc_",
  "1NL9QljVS-O1PdQcWnX9qJk8JnP_7-mIx",
  "10JPvBjlsyBfVRW3A9cotje87ZCCtV4io",
  "1j8IFf7UCW1XcJfZubuLySH0sbEhOmYcl",
  "1s-uyeDGf1bkSDPXcjaYNf-_iOyntlKql",
  "1P5ceFR5eP3qcuUu_BKlBl9L9eUiYDAXS",
  "1T295QFN8Bcv7a7nSbpQ9dRHkB1rnVQjH"
];

function driveImg(id, size = 2000) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;
}

/* =======================
   QUIZ DATA
======================= */
const QUIZ = [
  {
    question: "What was my reaction when i first saw you?",
    options: ["Infactuation", "Crush", "Love at first sight", "Just another random girl"],
    correct: 2,
    correctMsg: "Correct 😌 but I know you won’t agree 💗",
    wrongMsg: "Nope 🥲 but cute try"
  },
  {
    question: "What do I like the most about you?",
    options: ["Respect for others", "Your expressions", "Everything about you", "None 😏"],
    correct: 2,
    correctMsg: "Exactly 😏💗",
    wrongMsg: "Wrong 😌 you know the answer"
  }
];

/* =======================
   OPENING
======================= */
function renderOpening() {
  app.innerHTML = `
    <div class="card center">
      <div class="heartBig">💗</div>
      <h1>Hey love ❤️</h1>
      <p>I made something for you.</p>
      <input id="name" placeholder="Your name" />
      <button onclick="goToLetter()">Start</button>
    </div>
  `;
}

/* =======================
   LETTER
======================= */
const LETTER = `Hey love ❤️

This is something small,
but it’s made with all my heart.

Tap the heart when you’re ready 💗
`;

function goToLetter() {
  state.herName =
    document.getElementById("name")?.value.trim() || "love";

  app.innerHTML = `
    <div class="card">
      <h2>For you, ${escapeHtml(state.herName)} 💗</h2>
      <div class="letterBox" style="white-space:pre-wrap;">
        ${escapeHtml(LETTER)}
      </div>
      <button onclick="renderMenu()">💗</button>
    </div>
  `;
}

/* =======================
   MENU
======================= */
function renderMenu() {
  app.innerHTML = `
    <div class="card">
      <h2>Choose one 💗</h2>
      <button onclick="renderMemoryLane()">🛤 Memory Lane</button>
      <button onclick="renderQuiz()">🧠 Quiz</button>
      <button onclick="renderEnding()">💗 Finish</button>
    </div>
  `;
}

/* =======================
   MEMORY LANE
======================= */
let memIndex = 0;
let memNotes = MEMORY_PHOTO_IDS.map(() => "");

function renderMemoryLane() {
  memIndex = 0;
  app.innerHTML = `
    <div class="card">
      <h2>🛤 Memory Lane</h2>
      <div id="memStage"></div>
      <button onclick="renderMenu()">⬅ Back</button>
    </div>
  `;
  renderMemStage();
}

function renderMemStage() {
  if (memIndex >= MEMORY_PHOTO_IDS.length) {
    app.querySelector("#memStage").innerHTML = `
      <h3>Done 💗</h3>
      <button onclick="renderMenu()">Back</button>
    `;
    return;
  }

  app.querySelector("#memStage").innerHTML = `
    <img src="${driveImg(MEMORY_PHOTO_IDS[memIndex])}" class="memImg"/>
    <textarea placeholder="Write something..."
      oninput="memNotes[${memIndex}] = this.value"></textarea>
    <button onclick="memIndex++; renderMemStage()">Next</button>
  `;
}

/* =======================
   QUIZ
======================= */
let quizIndex = 0;

function renderQuiz() {
  quizIndex = 0;
  showQuiz();
}

function showQuiz() {
  if (quizIndex >= QUIZ.length) {
    app.innerHTML = `
      <div class="card">
        <h2>Done 💗</h2>
        <button onclick="renderMenu()">Back</button>
      </div>
    `;
    return;
  }

  const q = QUIZ[quizIndex];
  app.innerHTML = `
    <div class="card">
      <h3>${escapeHtml(q.question)}</h3>
      ${q.options
        .map(
          (o, i) =>
            `<button onclick="checkQuiz(${i})">${escapeHtml(o)}</button>`
        )
        .join("")}
    </div>
  `;
}

function checkQuiz(i) {
  const q = QUIZ[quizIndex];
  alert(i === q.correct ? q.correctMsg : q.wrongMsg);
  quizIndex++;
  showQuiz();
}

/* =======================
   HELPERS
======================= */
function escapeHtml(str) {
  return (str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
/* =========================================================
   PHOTO BOOTH
========================================================= */

let boothImages = [];

function renderPhotoBooth() {
  app.innerHTML = `
    <div class="card">
      <h2>📸 Photo Booth</h2>
      <p>Upload up to 4 photos to make a memory strip 💗</p>

      <input id="boothInput" type="file" accept="image/*" multiple />

      <canvas id="boothCanvas" width="800" height="1200"
        style="width:100%;margin-top:12px;border-radius:16px;border:1px solid #ccc;"></canvas>

      <div class="btns">
        <button onclick="drawBooth()">Generate</button>
        <button onclick="downloadBooth()">Download</button>
        <button onclick="renderMenu()">⬅ Back</button>
      </div>
    </div>
  `;

  document
    .getElementById("boothInput")
    .addEventListener("change", handleBoothUpload);
}

function handleBoothUpload(e) {
  const files = Array.from(e.target.files).slice(0, 4);
  Promise.all(files.map(fileToDataURL)).then((imgs) => {
    boothImages = imgs;
    drawBooth();
  });
}

function drawBooth() {
  const canvas = document.getElementById("boothCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const frameH = 240;
  boothImages.forEach((src, i) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 100, 100 + i * (frameH + 20), 600, frameH);
    };
    img.src = src;
  });
}

function downloadBooth() {
  const canvas = document.getElementById("boothCanvas");
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "photo-booth.png";
  a.click();
}

function fileToDataURL(file) {
  return new Promise((res) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.readAsDataURL(file);
  });
}

/* =========================================================
   FINAL ENDING
========================================================= */

function renderEnding() {
  app.innerHTML = `
    <div class="card center">
      <div class="heartBig">❤️</div>
      <h2>${escapeHtml(state.herName || "love")}, this is everything.</h2>

      <div class="letterBox" style="white-space:pre-wrap;line-height:1.7;">
That’s all I made for you.

Not to impress you.
Not to prove anything.

Just to say this:

I still choose you.
Every day.
In every version of my life. 💗
      </div>

      <button onclick="renderOpening()">Start again</button>
    </div>
  `;
}

/* =========================================================
   EXPOSE FUNCTIONS (IMPORTANT)
========================================================= */
Object.assign(window, {
  renderOpening,
  goToLetter,
  renderMenu,
  renderMemoryLane,
  renderQuiz,
  renderPhotoBooth,
  renderEnding
});

/* =========================================================
   BOOT
========================================================= */
renderOpening();
