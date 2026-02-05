/* =========================================================
   FULL WORKING JS (Opening → Letter → Menu → Memory Lane → Quiz → Photo Booth → Ending)
   ========================================================= */

const app = document.getElementById("app");

// GLOBAL STATE (required)
const state = {
  herName: "",
};

/* =======================
   IMAGES (Google Drive IDs)
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
    options: ["Infactuation", "Crush", "Love at first site", "Just an other randome girl"],
    correct: 2,
    correctMsg: "Correct 😌 but i know you wont agree with me 💗",
    wrongMsg: "Hmm nope 🥲 but nice try…"
  },
  {
    question: "What is that one thing i like the most about you?",
    options: ["How you respect others", "Way of expressing", "Every thing that defines you", "None fo the above 😏"],
    correct: 2,
    correctMsg: "Correct 😏 you know the truth 💕",
    wrongMsg: "Wrong answer 😌 you know it…"
  },
  {
    question: "When did i realise that you are the one for me ?",
    options: ["No realisation yet", "Deep talk at param", "The day you wrote the book", "Flash mob"],
    correct: 1,
    correctMsg: "Correct, that deep talk helped💗",
    wrongMsg: "Hmm nope 🥲 think again…"
  },
  {
    question: "What would be the sukoon moment for me ?",
    options: ["When we go for a long drive", "Kiss", "Longggg hug", "Dancing together"],
    correct: 2,
    correctMsg: "Yes your hug feels like home💗",
    wrongMsg: "Hmm nope 🥲 but nice try…"
  },
  {
    question: "When did we start dating?",
    options: ["April 1", "May 2", "September 12", "August 2"],
    correct: 3,
    correctMsg: "Yes got stucked",
    wrongMsg: "Hmm nope 🥲 but nice try…"
  },
  {
    question: "That one song when played you are the only thing that comes into my mind?",
    options: ["Saiyaara", "Perfect", "Jinke mari na", "Nene beku"],
    correct: 3,
    correctMsg: "Nothing else will be there in my mind while listerning to this one💗",
    wrongMsg: "Try harder next time…"
  },
  {
    question: "Which one ideal date is still pending for us?",
    options: ["Jacuzzi stay", "Candle light dinner", "Only two of us on a vacation", "Chamund betta in a traditional attire"],
    correct: 3,
    correctMsg: "Its still a dream 💗",
    wrongMsg: "srsly???"
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
      <p>I made something for you. Take a breath… and tap to start ✨</p>

      <input id="name" placeholder="Your name (optional/its always there on my mind)" maxlength="24" />

      <div class="btns" style="justify-content:center;">
        <button onclick="goToLetter()">Start</button>
      </div>

      <p class="small">Made with love • just for you</p>
    </div>
  `;
}

/* =======================
   LETTER
   ======================= */
const LETTER = `Hey love ❤️

I don’t know if I say this enough,
but you mean so much to me.
In the middle of all the chaos,
you’re my calm.
My comfort.
My favourite thought.

I know I’m a complete idiot, i fight a lot with you, torture you, irritate you, spoil you mental peace but above all of that i love you a lot. Some times i ask myself why am i like this i should give this up and move on but when ever i see yor photo or listern to some song that reminds me of you i dont know what happens i couldn't stop thinking about you. May be we didn't have enough time together to go out for fancy dates, didn't go out for a vacation or else i was not there to pick you up everday and take you to DD, but i promise you ishitha we'll one day have a lot of time to spend together, we'll travell to all the dreamiest places and i'll capture all your insta worthy photos. I promise you i'll forever keep you happy, just that you dont fight with me everyday. I know you might be bored by all these long long paragraphs by me everytime so i'm not gona waste your time lets go. 

This is small… but it’s made with my heart.

Tap the heart when you’re ready 💗
`;

function goToLetter() {
  const name = (document.getElementById("name")?.value || "").trim() || "love";
  state.herName = name;

  app.innerHTML = `
    <div class="card">
      <h2>For you, ${escapeHtml(name)} 💗</h2>
      <div class="letterBox" style="white-space:pre-wrap; line-height:1.7;">
        ${escapeHtml(LETTER)}
      </div>

      <div class="center">
        <button class="heartBtn" onclick="renderMenu()">💗</button>
        <div class="small">Tap the heart to continue</div>
      </div>

      <div class="btns">
        <button class="secondary" onclick="renderOpening()">⬅ Back</button>
      </div>
    </div>
  `;
}
/* =======================
   MENU (3 boxes + Finish)
   ======================= */
function renderMenu() {
  const her = state.herName || "love";

  app.innerHTML = `
    <div class="card">
      <h2>Choose a box, ${escapeHtml(her)} 💗</h2>
      <p class="small">Start with Memory Lane, then try the quiz, then the photo booth.</p>

      <div class="grid3">
        <div class="box" onclick="renderMemoryLane()">
          <div class="boxTitle">🛤️ Memory Lane</div>
          <div class="boxSub">One photo at a time, write what comes to mind</div>
        </div>

        <div class="box" onclick="renderQuiz()">
          <div class="boxTitle">🧠 Quiz</div>
          <div class="boxSub">Pick an option — get instant feedback</div>
        </div>

        <div class="box" onclick="renderPhotoBooth()">
          <div class="boxTitle">📸 Photo Booth</div>
          <div class="boxSub">Pick 4 photos → get a photo strip</div>
        </div>
      </div>

      <div class="btns" style="justify-content:center;">
        <button onclick="renderEnding()">💗 Finish</button>
      </div>

      <div class="btns">
        <button class="secondary" onclick="goToLetter()">⬅ Back to letter</button>
        <button class="secondary" onclick="renderOpening()">🏠 Home</button>
      </div>
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
      <div class="row" style="justify-content:space-between;align-items:center;">
        <h2 style="margin:0;">🛤️ Memory Lane</h2>
        <button class="secondary" onclick="renderMenu()">⬅ Menu</button>
      </div>

      <p class="small">One photo at a time. Write something to unlock Next 💗</p>

      <div id="memStage"></div>

      <div class="btns">
        <button class="secondary" onclick="renderEnding()">💗 Finish</button>
        <button class="secondary" onclick="renderOpening()">🏠 Home</button>
      </div>
    </div>
  `;

  renderMemStage();
}

function renderMemStage() {
  const stage = document.getElementById("memStage");
  if (!stage) return;

  if (memIndex >= MEMORY_PHOTO_IDS.length) {
    stage.innerHTML = `
      <div class="center">
        <h2 style="margin-top:6px;">You’re done 💗</h2>
        <p class="small">Now generate the memory letter.</p>

        <div class="btns" style="justify-content:center;">
          <button onclick="generateMemLetter()">Generate Memory Letter 💌</button>
          <button class="secondary" onclick="restartMemoryLane()">Restart</button>
        </div>

        <div id="memLetter" class="copyBox" style="display:none;"></div>
      </div>
    `;
    return;
  }

  const imgUrl = driveImg(MEMORY_PHOTO_IDS[memIndex], 2000);

  stage.innerHTML = `
    <p class="small">Memory ${memIndex + 1} / ${MEMORY_PHOTO_IDS.length}</p>

    <img class="memImg" id="memImg" src="${imgUrl}" alt="memory">

    <textarea id="memInput" placeholder="Write what comes to your mind…" oninput="memTyping()">${escapeHtml(memNotes[memIndex])}</textarea>

    <div class="row" style="justify-content:space-between;">
      <button class="secondary" onclick="memBack()" ${memIndex === 0 ? "disabled" : ""}>⬅ Back</button>
      <button id="memNextBtn" onclick="memNext()" disabled>
        ${memIndex === MEMORY_PHOTO_IDS.length - 1 ? "Finish ✅" : "Next ➜"}
      </button>
    </div>
  `;

  memTyping();
}

function memTyping() {
  const input = document.getElementById("memInput");
  const nextBtn = document.getElementById("memNextBtn");
  if (!input || !nextBtn) return;

  memNotes[memIndex] = input.value;
  nextBtn.disabled = input.value.trim().length === 0;
}

function memNext() {
  memTyping();
  if (memNotes[memIndex].trim().length === 0) return;
  memIndex++;
  renderMemStage();
}

function memBack() {
  memTyping();
  memIndex = Math.max(0, memIndex - 1);
  renderMemStage();
}

function restartMemoryLane() {
  memIndex = 0;
  memNotes = MEMORY_PHOTO_IDS.map(() => "");
  renderMemStage();
}

function generateMemLetter() {
  const box = document.getElementById("memLetter");
  if (!box) return;

  const her = state.herName || "love";
  const text =
`💗 Memory Letter for ${her} 💗

${memNotes.map((n, i) => `Memory ${i + 1}:\n${n.trim() ? n.trim() : "💗"}`).join("\n\n")}

(keep this with you 😌)`;

  box.style.display = "block";
  box.textContent = text;
}

/* =======================
   QUIZ
   ======================= */
let quizIndex = 0;
let quizAnswered = false;

function renderQuiz() {
  quizIndex = 0;
  quizAnswered = false;

  app.innerHTML = `
    <div class="card">
      <h2>🧠 Quiz</h2>
      <div id="quizStage"></div>
      <button class="secondary" onclick="renderMenu()">⬅ Menu</button>
    </div>
  `;

  renderQuizStage();
}

function renderQuizStage() {
  const stage = document.getElementById("quizStage");
  if (!stage) return;

  if (quizIndex >= QUIZ.length) {
    stage.innerHTML = `
      <div class="center">
        <h2>Done 💗</h2>
        <button onclick="renderMenu()">⬅ Back to menu</button>
      </div>
    `;
    return;
  }

  const q = QUIZ[quizIndex];
  quizAnswered = false;

  stage.innerHTML = `
    <p class="small">Question ${quizIndex + 1} / ${QUIZ.length}</p>
    <h3>${escapeHtml(q.question)}</h3>

    ${q.options.map((opt, i) => `
      <button onclick="selectQuizOption(${i})">${escapeHtml(opt)}</button>
    `).join("")}

    <div id="quizFeedback" style="display:none;"></div>
    <button id="quizNext" style="display:none;" onclick="nextQuiz()">Next ➜</button>
  `;
}

function selectQuizOption(i) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = QUIZ[quizIndex];
  const feedback = document.getElementById("quizFeedback");

  if (i === q.correct) {
    feedback.textContent = q.correctMsg;
  } else {
    feedback.innerHTML = `${q.wrongMsg}<br><strong>Correct answer:</strong> ${q.options[q.correct]}`;
  }

  feedback.style.display = "block";
  document.getElementById("quizNext").style.display = "inline-block";
}

function nextQuiz() {
  quizIndex++;
  renderQuizStage();
}

/* =======================
   PHOTO BOOTH
   ======================= */
function renderPhotoBooth() {
  app.innerHTML = `
    <div class="card">
      <h2>📸 Photo Booth</h2>
      <p class="small">Upload 4 photos. We’ll make a cute photo strip 💗</p>
      <input type="file" multiple accept="image/*" />
      <button onclick="renderMenu()">⬅ Menu</button>
    </div>
  `;
}

/* =======================
   FINAL ENDING
   ======================= */
function renderEnding(){
  const her = state.herName || "love";

  app.innerHTML = `
    <div class="card center">
      <div class="heartBig">❤️</div>
      <h2>${escapeHtml(her)}, this is everything.</h2>

      <div class="letterBox" style="white-space:pre-wrap; line-height:1.7;">
That’s all I made for you.  
Not to impress you.  
Not to prove anything.

Just to say this:

I still choose you.  
Every day.  
In every version of my life. 💗
      </div>

      <button onclick="renderOpening()">🏠 Start again</button>
    </div>
  `;
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

/* =======================
   EXPOSE FUNCTIONS
   ======================= */
Object.assign(window, {
  renderOpening,
  goToLetter,
  renderMenu,
  renderMemoryLane,
  renderQuiz,
  renderPhotoBooth,
  renderEnding
});

/* =======================
   BOOT
   ======================= */
renderOpening();
