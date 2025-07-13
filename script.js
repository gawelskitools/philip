// Flachwitz-Logik
const flachwitzeOriginal = [
  "Was macht ein Mercedesfahrer nach dem Sex? <br>Er klappt den Rückspiegel runter und sagt:<br> Danke, geiler Typ",
  "Frage an Siri: Wieso bin ich schon so lange Single? <br>...Siri aktiviert die Frontkamera.",
  "Meine Freundin sollte über ihre eigenen Fehler nachdenken. <br>Jetzt steht sie seit Stunden vor dem Spiegel.",
  "Arzt: Sie sind eindeutig viel zu dick. <br> Patient: Ich würde gerne noch eine zweite Meinung hören. <br>Arzt: Sie sind außerdem hässlich.",
  "Was ist gemein? <br> Einem Blinden eine Kinokarte zu schenken. <br>Und was ist fies? <br>Wenn es ein Stummfilm ist…",  
  "Wie nennt man einen intelligenten Toilettenbesucher? <br>Klugscheißer."
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
    title: "☠️ Level 1: Willkommen im Furzkonzert – Taktgefühl ist gefragt",
    text: `Zwischen Sitzpolster und Schallwelle:<br> Wie viel Zeit gönnt sich ein ehrlicher Furz?`,
    options: [
      { text: "Zwischen Pffft und Was war das?! – 1,8 Sekunden.", correct: false },
      { text: "Kurz genug zum Leugnen, lang genug fürs Sofa-Trauma.", correct: true },
      { text: "5 Sekunden, je nach Menge an Bier & Currywurst", correct: false }
    ],
    letter: "Z"
  },
  {
    title: "💕 Level 2: Herz über Schwanz – ein ungleicher Kampf",
    text: `Woran erkennt man seine erste große Liebe?`,
    options: [
      { text: '"Wenn sie deinen Namen beim Stöhnen vergisst!"', correct: false },
      { text: '"Wenn sie dir ihr Passwort gibt – aber nie ihren BH."', correct: false },
      { text: '"Wenn du trotz Erektion noch an sie denkst."', correct: true }
    ],
    letter: "M"
  },
  {
    title: "🖕🏻 Level 3: Filmabend mit Ficktion",
    text: `Welcher dieser Begriffe ist KEIN echter Porno-Titel?`,
    options: [
      { text: "Herr der Ringe – Die Zwei Löcher", correct: false },
      { text: "Mutti, die Wurst ist hart", correct: false },
      { text: "Täglich poppt das Murmeltier", correct: true }
    ],
    letter: "B"
  },
  {
    title: "☘️ Level 4: Geld weg, Gute Laune bleibt!",
    text: `Hast du den dreh raus? Gewinne am Geldautomaten!`,
    isMinigame: true,
    startMinigame: startGlücksradSpiel,
    letter: "Y"
  },
  {
    title: "📚 Level 5: Der geheime Porno im Kinderzimmer",
    text: `Was stand auf dem Cover deines ersten Pornos?`,
    options: [
      { text: "Lust auf Landfrauen – Folge 69", correct: false },
      { text: "Stullen & Stuten – der doppelte Genuss", correct: false },
      { text: "Pfui, Philip!", correct: true }
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
    feedback.textContent = "🤦 FALSCH! Deine Gehirnzellen feiern wohl schon – ohne dich.🤦";
    feedback.className = "wrong";
    container.appendChild(feedback);
  }
}

function showFlachwitz(letter) {
  const container = document.getElementById("level-container");
  container.innerHTML = "";

  const witz = getRandomFlachwitz();
  const jokeText = document.createElement("p");
  jokeText.innerHTML = `🤣 Flachwitz-Zwischenstopp 🤣<br><br><span style="font-weight: bold; color: #ffde59;">${witz}</span>`;
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

function showPasswordInput() {
  const container = document.getElementById("level-container");
  container.style.display = "block";
  container.innerHTML = `
    <h2>❓❓❓ Der Cryptex-Code ❓❓❓</h2>
    <p>Du hast folgende Buchstaben gesammelt:</p>
    <div style="font-size: 2em; margin: 10px 0; letter-spacing: 10px;">
      ${collectedLetters.join(" - ")}
    </div>
    <p>🔒 Nur wenn du klug kombinierst, löst du den Cryptex-Code und fährst künftig Mercedes!</p>
    <p style="font-size:1.2em; color:gray;">(Denk nach. Die Lösung ist 6-stellig...oder fahre weiterhin <br><span style="font-size: 80px;">🚲</span></p>
  `;
}

// --- Glücksrad-Spiel (mit Leucht-Effekt und Kommentar) ---
let currentSpin = 0;
let totalLoss = 0;
let wheelInterval;
let drehErgebnisse = [
  +50, -10, +100, -50, +10, -50, +200, -20, -50, -360
];
let drehKommentare = [
  "🎉 Gleich ein Gewinn! Das fängt gut an.",
  "😬 Kleiner Dämpfer...",
  "💰 Hoffnungsschimmer!",
  "💥 Autsch! Das hat wehgetan...",
  "✨ Immerhin etwas...",
  "📉 Die Kurve geht runter...",
  "🤞 Vielleicht war’s das letzte Glück?",
  "🫠 Es wird düster...",
  "💸 Das tut weh!",
  "☠️ Finale Pleite – besser wird’s nicht..."
];

const dummyValues = ["+10", "-20", "+5", "-50", "+15", "-10", "+20", "-5"];

function startGlücksradSpiel() {
  const container = document.getElementById("level-container");
  container.innerHTML = `
    <h2>🎡 Das Glücksspiel</h2>
    <p>Du darfst einmal drücken, um das Rad 10× zu drehen.<br>Viel Glück...</p>
    <div id="rad-resultat" class="rad-display">Bereit zum Drehen!</div>
    <div id="rad-kommentar" class="rad-comment"></div>
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
  if (currentSpin >= drehErgebnisse.length) {
    zeigeRadErgebnis();
    return;
  }

  const resultDiv = document.getElementById("rad-resultat");
  const commentDiv = document.getElementById("rad-kommentar");
  let position = 0;
  let drehs = 0;

  wheelInterval = setInterval(() => {
    resultDiv.textContent = "🎰 " + dummyValues[position];
    resultDiv.className = "rad-display";
    position = (position + 1) % dummyValues.length;
    drehs++;

    if (drehs >= 30) {
      clearInterval(wheelInterval);
      const wert = drehErgebnisse[currentSpin];
      totalLoss += wert;

      const symbol = wert >= 0 ? "💰 +" : "💸 -";
      const farbklasse = wert >= 0 ? "gewinn-blink" : "verlust-blink";

      resultDiv.textContent = symbol + Math.abs(wert) + " €";
      resultDiv.classList.add(farbklasse);
      commentDiv.textContent = drehKommentare[currentSpin];

      document.getElementById("verlust-anzeige").textContent =
        "Zwischenstand: " + totalLoss + " €";

      currentSpin++;
      setTimeout(dreheRad, 1600);
    }
  }, 100);
}

function zeigeRadErgebnis() {
  const container = document.getElementById("level-container");
  container.innerHTML = `
    <h2>💀 Ende vom Rad</h2>
    <p>Gesamtverlust: <strong>${Math.abs(totalLoss)} €</strong></p>
    <p>Du hast es geschafft, nichts zu gewinnen!<br>➡️ Gib zur Strafe ${Math.abs(totalLoss)} Euro deinem Onkel für seinen nächsten Kneipenabend.</p>
    <button onclick="zeigeTrostpreis()">Trostpreis anzeigen</button>
  `;
}

function zeigeTrostpreis() {
  const container = document.getElementById("level-container");
  if (typeof collectedLetters !== "undefined") {
    collectedLetters.push("Y");
  }
  container.innerHTML = `
    <p class="correct">🫠 Herzlichen Glückwunsch! Dein Trostpreis ist der Buchstabe: <strong>Y</strong></p>
    <p>Und jetzt schnell weiter, bevor du noch mehr Geld verlierst...</p>
    <button onclick="showFlachwitz('Y')">Flachwitz, bitte!</button>
  `;
}
