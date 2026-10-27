const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    option1: "script",
    option2: "javascript",
    option3: "js",
    correctOption: "script",
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    option1: "The head section",
    option2: "The body section",
    option3: "Both the head and body section are correct",
    correctOption: "Both the head and body section are correct",
  },
  {
    question:
      'What is the correct syntax for referring to an external script called "xxx.js"?',
    option1: "script href=xxx.js",
    option2: "script name=xxx.js",
    option3: "script src=xxx.js",
    correctOption: "script src=xxx.js",
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    option1: "&lt;link&gt;",
    option2: "&lt;a&gt;",
    option3: "&lt;href&gt;",
    correctOption: "&lt;a&gt;",
  },
  {
    question: "Which CSS property changes the background color?",
    option1: "font-size",
    option2: "background-color",
    option3: "text-align",
    correctOption: "background-color",
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    option1: "var",
    option2: "let",
    option3: "const",
    correctOption: "const",
  },
  {
    question: "Which HTML tag is used to display an image?",
    option1: "&lt;image&gt;",
    option2: "&lt;img&gt;",
    option3: "&lt;picture-src&gt;",
    correctOption: "&lt;img&gt;",
  },
  {
    question: "Which CSS property changes the color?",
    option1: "font-style",
    option2: "text-color",
    option3: "color",
    correctOption: "color",
  },
  {
    question: "What does the `===` operator check in JavaScript?",
    option1: "only value",
    option2: "only data type",
    option3: "value and type",
    correctOption: "value and type",
  },
  {
    question: "Which method adds a new element to the end of an array?",
    option1: "pop()",
    option2: "push()",
    option3: "unshift()",
    correctOption: "push()",
  },
];

let quizBox = document.querySelector("#quizBox");
let nextBtn = document.querySelector("#nextBtn");
let quizCard = document.querySelector(".quiz-card");
let questionNo = 0;
let score = 0;
let isCelebrationActive = false; 

// Sound variables with high-availability open-source links
const correctSound = new Audio("https://jsdelivr.net");
const wrongSound = new Audio("https://jsdelivr.net");

const showQuestion = () => {
  // Remove previous answer feedback classes cleanly
  quizCard.classList.remove("correct-pulse", "wrong-pulse");

  if (questionNo != questions.length) {
    quizBox.innerHTML = `
          <h1> ${questionNo + 1} : ${questions[questionNo].question} </h1>
          
          <label class="option-container">
               <input type="radio" name="options" value="${questions[questionNo].option1}">
               ${questions[questionNo].option1}
          </label>
          <label class="option-container">
               <input type="radio" name="options" value="${questions[questionNo].option2}">
               ${questions[questionNo].option2}
          </label>
          <label class="option-container">
               <input type="radio" name="options" value="${questions[questionNo].option3}">
               ${questions[questionNo].option3}
          </label>`;

    nextBtn.disabled = true;
    const options = document.querySelectorAll("input[name='options']");

    options.forEach((option) => {
      option.addEventListener("click", () => {
        nextBtn.disabled = false;

        quizCard.classList.remove("correct-pulse", "wrong-pulse");
        if (option.value === questions[questionNo].correctOption) {
          quizCard.classList.add("correct-pulse");

          // Reset sound position
          correctSound.currentTime = 0;
          // Play with security bypass
          correctSound
            .play()
            .then(() => {
              console.log("Correct sound played successfully!");
            })
            .catch((e) => {
              console.log(
                "Browser blocked sound. Click anywhere on the screen first!",
                e,
              );
            });
        } else {
          quizCard.classList.add("wrong-pulse");

          // Reset sound position
          wrongSound.currentTime = 0;
          // Play with security bypass
          wrongSound
            .play()
            .then(() => {
              console.log("Wrong sound played successfully!");
            })
            .catch((e) => {
              console.log("Browser blocked sound.", e);
            });
        }
      });
    });
  } else {
    // Dynamic Assessment calculation logic
    let feedbackTitle = "";
    let feedbackEmoji = "";
    let percentage = (score / questions.length) * 100;

    if (percentage >= 80) {
      feedbackTitle = "Outstanding Work! Brilliant Mind! 🌟";
      feedbackEmoji = "🏆";
      isCelebrationActive = true; // High scores get celebration confetti particle stream
    } else if (percentage >= 50) {
      feedbackTitle = "Good Job! Great Effort! 👍";
      feedbackEmoji = "👏";
    } else {
      feedbackTitle = "Keep Practicing! You Can Do Better! 💪";
      feedbackEmoji = "📚";
    }

    // Fixed text colors so they are clearly visible on dark card
    quizBox.innerHTML = `
          <div class="end-screen">
              <div class="appreciation-badge">${feedbackEmoji}</div>
              <h2 style="color: #ffffff; font-weight:700;">${feedbackTitle}</h2>
              <hr class="my-4">
              <h4 style="color: #ffffff;">Your Score: <strong style="color:#08d9f5;">${score}</strong> / ${questions.length}</h4>
              <p class="text-muted mt-2">Accuracy Rate: ${percentage}%</p>
          </div>`;

    nextBtn.style.display = "none";
  }
};

nextBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector(
    'input[name="options"]:checked',
  );
  if (!selectedOption) return;

  if (selectedOption.value === questions[questionNo].correctOption) {
    score++;
  }
  questionNo++;
  showQuestion();
});

showQuestion();

// BACKGROUND CANVAS MESH & CONFETTI ENGINE
const canvas = document.getElementById("bg-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);
  const mouse = { x: w / 2, y: h / 2 };

  class SpiderNode {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2;
      this.radius = 2.5;
    }
    follow(mx, my) {
      let dx = mx - this.x;
      let dy = my - this.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 220) {
        this.x += dx * 0.015;
        this.y += dy * 0.015;
      }
    }
    tick() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fill();
    }
  }

  class Confetti {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * -h;
      this.size = Math.random() * 6 + 4;
      this.speedY = Math.random() * 3 + 2;
      this.speedX = (Math.random() - 0.5) * 2;
      this.color = `hsl(${Math.random() * 360}, 90%, 65%)`;
    }
    tick() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y > h) {
        this.y = -20;
        this.x = Math.random() * w;
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  const totalNodes = Math.min(100, Math.floor((w * h) / 9000));
  const spiders = Array.from({ length: totalNodes }, () => new SpiderNode());
  const confettiArray = Array.from({ length: 80 }, () => new Confetti());

  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  requestAnimationFrame(function anim() {
    if (w !== window.innerWidth) w = canvas.width = window.innerWidth;
    if (h !== window.innerHeight) h = canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, w, h);

    spiders.forEach((spider) => {
      spider.follow(mouse.x, mouse.y);
      spider.tick();
    });

    for (let i = 0; i < spiders.length; i++) {
      for (let j = i + 1; j < spiders.length; j++) {
        let dx = spiders[i].x - spiders[j].x;
        let dy = spiders[i].y - spiders[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(spiders[i].x, spiders[i].y);
          ctx.lineTo(spiders[j].x, spiders[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 110})`;
          ctx.lineWidth = 0.35;
          ctx.stroke();
        }
      }
    }

    if (isCelebrationActive) {
      confettiArray.forEach((c) => c.tick());
    }

    requestAnimationFrame(anim);
  });
}
