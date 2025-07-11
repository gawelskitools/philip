
// Flachwitz-Logik
const flachwitzeOriginal = [
  "Was ist rot und steht am Straßenrand? – Eine Hagenutte.",
  "Warum können Geister so schlecht lügen? – Weil man durch sie hindurchsieht.",
  "Was macht ein Pirat am Computer? – Er drückt die Enter-Taste.",
  "Was macht ein Clown im Büro? – Faxen.",
  "Was ist orange und läuft durch den Wald? – Eine Wanderine.",
  "Warum können Skelette schlecht lügen? – Sie haben keinen Arsch in der Hose."
];

let flachwitzPool = [...flachwitzeOriginal];
function getRandomFlachwitz() {
  if (flachwitzPool.length === 0) flachwitzPool = [...flachwitzeOriginal];
  const index = Math.floor(Math.random() * flachwitzPool.length);
  return flachwitzPool.splice(index, 1)[0];
}

// Level-Definition
const levels = [
  {
    title: "🚽 Level 1: Das sprechende Klo",
    text: `Ein antikes Klo erhebt sich...
    "Wos bist'n du für a Lurch? Nur wer weiß, wie lange der durchschnittliche Furz dauert, darf passieren!"`,
    options: [
      { text: "1,2 Sekunden", correct: false },
      { text: "0,8 Sekunden", correct: true },
      { text: "5 Sekunden, je nach Currywurst", correct: false }
    ],
    letter: "Z"
  },
  {
    title: "🧌 Level 2: Der Troll vom Flachwitzberg",
    text: `Was sagt ein Pirat beim Bäcker?`,
    options: [
      { text: '"Ein Brot!"', correct: false },
      { text: '"Ich nehm das Krustenbrötchen, Ahoi!"', correct: false },
      { text: '"Na, Roggn!"', correct: true }
    ],
    letter: "M"
  },
  {
    title: "🧠 Level 3: G.A.K.A. – die geile Sprach-KI",
    text: `Welcher dieser Begriffe ist KEIN echter Porno-Titel?`,
    options: [
      { text: "Schlauchboot der Lust", correct: false },
      { text: "Mutti, die Wurst ist hart", correct: false },
      { text: "Schatten der Sahne – Das Fruchtjoghurtmassaker", correct: true }
    ],
    letter: "B"
  },
  {
    title: "🎡 Level 4: Glücksrad des Schicksals",
    text: `Dreh am Rad und verliere dein Taschengeld.`,
    isMinigame: true,
    startMinigame: startGlücksradSpiel,
    letter: "Y"
  },
  {
    title: "📚 Level 5: Das geheime Pornozimmer",
    text: `Du öffnest einen muffigen Schrank...`,
    options: [
      { text: "Seite 3 ansehen", correct: false },
      { text: "Heft rückwärts lesen", correct: false },
      { text: "Nach hinten blättern", correct: true }
    ],
    letter: "N"
  },
  {
    title: "🏁 Finale!",
    text: "Du hast alles geschafft!",
    options: [],
    letter: "E"
  }
];

let currentLevel = 0;
let collectedLetters = [];

function startGame() {
  document.getElementById("intro").style.display = "none";
  showLevel(currentLevel);
}

function showLevel(index) {
  const container = document.getElementById("level-container");
  container.style.display = "block";
  container.innerHTML = "";

  const level = levels[index];
  const title = document.createElement("h2");
  title.className = "level-title";
  title.textContent = level.title;

  const text = document.createElement("p");
  text.innerHTML = level.text;
  container.appendChild(title);
  container.appendChild(text);

  if (level.isMinigame) {
    if (typeof level.startMinigame === "function") {
      level.startMinigame();
    } else {
      const info = document.createElement("p");
      info.innerHTML = "⚠️ Dieses Mini-Spiel ist noch nicht implementiert.<br>Du bekommst deinen Buchstaben: <strong>" + level.letter + "</strong>";
      container.appendChild(info);
      collectedLetters.push(level.letter);
      const btn = document.createElement("button");
      btn.textContent = "Weiter";
      btn.onclick = () => showFlachwitz(level.letter);
      container.appendChild(btn);
    }
    return;
  }

  if (level.options.length === 0) {
    collectedLetters.push(level.letter);
    showPasswordInput();
    return;
  }

  level.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => handleAnswer(opt.correct, level.letter);
    container.appendChild(btn);
  });
}

function handleAnswer(correct, letter) {
  const container = document.getElementById("level-container");
  const feedback = document.createElement("p");

  if (correct) {
    feedback.textContent = "💩 Richtig! Du bekommst einen mystischen Buchstaben: " + letter;
    feedback.className = "correct";
    collectedLetters.push(letter);
    container.innerHTML = "";
    container.appendChild(feedback);

    const btn = document.createElement("button");
    btn.textContent = "Flachwitz, bitte!";
    btn.onclick = () => showFlachwitz(letter);
    container.appendChild(btn);
  } else {
    feedback.textContent = "🤢 FALSCH! Dein Hirn riecht nach Gorgonzola.";
    feedback.className = "wrong";
    container.appendChild(feedback);
  }
}

function showFlachwitz(letter) {
  const container = document.getElementById("level-container");
  container.innerHTML = "";

  const witz = getRandomFlachwitz();
  const jokeText = document.createElement("p");
  jokeText.innerHTML = `🃏 Flachwitz-Zwischenstopp:<br><br><em>${witz}</em>`;
  container.appendChild(jokeText);

  const btn = document.createElement("button");
  btn.textContent = "Weiter geht’s";
  btn.onclick = nextLevel;
  container.appendChild(btn);
}

function nextLevel() {
  currentLevel++;
  if (currentLevel < levels.length) {
    showLevel(currentLevel);
  } else {
    showPasswordInput();
  }
}

// NEU: Statt Eingabe – finale Buchstabenausgabe
function showPasswordInput() {
  const container = document.getElementById("level-container");
  container.style.display = "block";
  container.innerHTML = `
    <h2>🧠 Das letzte Rätsel</h2>
    <p>Du hast folgende Buchstaben gesammelt:</p>
    <div style="font-size: 2em; margin: 10px 0; letter-spacing: 10px;">
      ${collectedLetters.join(" - ")}
    </div>
    <p><em>Kannst du die Box der Pandora mit dem richtigen Code-Wort öffnen?</em></p>
    <p style="font-size:0.9em; color:gray;">(Denk nach. Die Lösung ist 6-stellig... und du hast alles in der Hand!)</p>
  `;
}

// --- Glücksrad-Spiel ---
let currentSpin = 0;
let totalLoss = 0;
let wheelInterval;
const wheelValues = ["+5", "-10", "+10", "-5", "+5", "-10", "+10", "-5"];

function startGlücksradSpiel() {
  const container = document.getElementById("level-container");
  container.innerHTML = `
    <h2>🎡 Das Glücksrad des Versaufens</h2>
    <p>Du darfst 5× drehen. Gewinne Geld? Wohl kaum...</p>
    <div id="rad-resultat" style="font-size:2em;margin:20px 0;">Bereit zum Drehen!</div>
    <button id="rad-start-btn">Start</button>
    <p id="verlust-anzeige"></p>
  `;

  document.getElementById("rad-start-btn").onclick = () => {
    currentSpin = 0;
    totalLoss = 0;
    document.getElementById("rad-start-btn").disabled = true;
    dreheRad();
  };
}

function dreheRad() {
  if (currentSpin >= 5) {
    zeigeRadErgebnis();
    return;
  }

  const resultDiv = document.getElementById("rad-resultat");
  let position = 0;
  let drehs = 0;

  wheelInterval = setInterval(() => {
    resultDiv.textContent = "🎲 " + wheelValues[position];
    position = (position + 1) % wheelValues.length;
    drehs++;

    if (drehs >= 30) {
      clearInterval(wheelInterval);
      const minus = Math.random() < 0.5 ? -5 : -10;
      totalLoss += Math.abs(minus);
      resultDiv.textContent = "💸 -" + Math.abs(minus) + " €";
      document.getElementById("verlust-anzeige").textContent = "Verloren bisher: " + totalLoss + " €";
      currentSpin++;
      setTimeout(dreheRad, 1000);
    }
  }, 150);
}

function zeigeRadErgebnis() {
  const container = document.getElementById("level-container");
  container.innerHTML = `
    <h2>💀 Ende vom Rad</h2>
    <p>Gesamtverlust: <strong>${totalLoss} €</strong></p>
    <p>Übergebe ${totalLoss} Euro für einen guten Zweck – einfach an deinen Onkel zum Versaufen überlassen.</p>
    <button onclick="zeigeTrostpreis()">Trostpreis anzeigen</button>
  `;
}

function zeigeTrostpreis() {
  const container = document.getElementById("level-container");
  collectedLetters.push("Y");
  container.innerHTML = `
    <p class="correct">🫠 Herzlichen Glückwunsch! Dein Trostpreis ist der Buchstabe: <strong>Y</strong></p>
    <p>Und jetzt schnell weiter, bevor du noch mehr Geld verlierst...</p>
    <button onclick="showFlachwitz('Y')">Flachwitz, bitte!</button>
  `;
}
