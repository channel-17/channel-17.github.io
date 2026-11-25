// CHANNEL 17 — Yellow Brick Rebuild 1
// CPR active. Ground Zero continuation. No redesign. Surgical timing + heart asset wiring.

const fill = document.getElementById("fill");
const percent = document.getElementById("percent");
const turtle = document.getElementById("turtle");

const virusLayer = document.getElementById("virusLayer");
const loader = document.getElementById("loader");
const loaderScene = document.getElementById("loaderScene");
const signalNode = document.getElementById("signalNode");
const outerSymbol = document.getElementById("outerSymbol");
const innerSymbol = document.getElementById("innerSymbol");
const maze = document.getElementById("maze");
const home = document.getElementById("home");
const idleMaze = document.getElementById("idleMaze");
const signalGhost = document.getElementById("signalGhost");
const motionField = document.getElementById("motionField");
const engagementField = document.getElementById("engagementField");
const profileField = document.getElementById("profileField");
const impactField = document.getElementById("impactField");
const checkGenerals = document.getElementById("checkGenerals");
const carlProfile = document.getElementById("carlProfile");
const carlCard = document.getElementById("carlCard");
const carlClose = document.getElementById("carlClose");
const carlPhotosButton = document.getElementById("carlPhotosButton");
const carlPhotoModal = document.getElementById("carlPhotoModal");
const carlPhotoClose = document.getElementById("carlPhotoClose");
const carlPhotoLarge = document.getElementById("carlPhotoLarge");
const carlPhotoCaption = document.getElementById("carlPhotoCaption");
const hiveWound = document.getElementById("hiveWound");
const carlProfilePortal = document.getElementById("carlProfilePortal");
const hiveCarlFile = document.getElementById("hiveCarlFile");
const hiveClose = document.getElementById("hiveClose");
const survivorChalk = document.getElementById("survivorChalk");
const takeCampTest = document.getElementById("takeCampTest");
const campTestModal = document.getElementById("campTestModal");
const campTestClose = document.getElementById("campTestClose");
const campResult = document.getElementById("campResult");
const expandTestimonials = document.getElementById("expandTestimonials");
const jinxShadowFrequency = document.getElementById("jinxShadowFrequency");
const jinxCardOverlay = document.getElementById("jinxCardOverlay");
const jinxCardClose = document.getElementById("jinxCardClose");
let poemNoteOverlay = null;
let frequencyBleedActive = false;
let frequencyBleedAnimations = [];
let frequencyBleedRunToken = 0;
let frequencyBleedScar = null;

let progress = 0;
let state = "normal";
let completed = false;
let noticed = false;
let hidden = false;
let breached = false;
let ghosted = false;
let burning = false;
let generals = false;
let loaderCoverageDone = false;
let symbolBattleStarted = false;

let frankSeen = false;
let wrenSeen = false;
let carlSeen = false;
let carlTriggered = false;
let carlOpened = false;
let carlRrodActiveUntil = 0;
let hiveWaveStarted = false;
let deadHeartReleased = false;
let heartSmokeStarted = false;
let heartSmokeSpawnCount = 0;
let frankDutyStarted = false;
let frankDutyFramesPlayed = false;
let secretFlameReleased = false;
let snowflakeReleased = false;
let woundPulseTimer = null;
let hiveWoundUsed = false;
let jinxFrequencyTimer = null;
let jinxFrequencyClearTimer = null;
let jinxFrequencyArmed = false;
let jinxFrequencyUsed = false;
let founderWindowClosed = false;

let profileTimer = null;
let engageTimer = null;
let slashTimer = null;
let profileCount = 0;
let engageCount = 0;
const AVATAR_SIZE = 72;
const HEART_GREY = "heart.grey.PNG";

// FOREMAN MODE — LOADER FADE-IN ONLY.
// Screen starts black/quiet, then the loader scene fades in before progress begins.
const LOADER_BOOT_DELAY_MS = 780;
const LOADER_FADE_IN_MS = 1680;
let loaderBootComplete = false;

const homieFrame = document.getElementById("homieFrame");
const homieFx = document.getElementById("homieFx");
const homieDoor = document.getElementById("homieDoor");

let homieWalkTimer = null;
let homieWalkPhase = 0;
let homieFxTimer = null;
let homieShiverUntil = 0;
let homieFxStep = 0;

function setHomieFrame(src) {
  if (homieFrame && homieFrame.getAttribute("src") !== src) homieFrame.setAttribute("src", src);
}

function setHomieFx(src = "") {
  if (!homieFx) return;
  if (!src) {
    homieFx.removeAttribute("src");
    homieFx.classList.remove("active");
    return;
  }
  if (homieFx.getAttribute("src") !== src) homieFx.setAttribute("src", src);
  homieFx.classList.add("active");
}

function stopHomieFx() {
  if (homieFxTimer) clearTimeout(homieFxTimer);
  homieFxTimer = null;
  homieFxStep = 0;
  setHomieFx("");
}

function startHomieShiver() {
  stopHomieFx();
  if (!homieFx) return;

  const shiver = ["LH.PixelShiver.A.png", "LH.PixelShiver.B.png"];

  const tick = () => {
    setHomieFx(shiver[homieFxStep % shiver.length]);
    homieFx.classList.add("shiver");
    homieFxStep += 1;
    homieFxTimer = setTimeout(tick, 82);
  };

  tick();
}

function startPanicStrips() {
  stopHomieFx();

  // ABRACADABRA, MOTHERFUCKER:
  // authored digital crisis — deliberately NOT alphabetical and NOT random.
  const panic = [
    "A","B","C","A","D","B","C","D","A","D","B","C","A","A","B","A",
    "D","C","B","D","A","C","A","B","D","B","C","A"
  ];
  const holds = [58,44,67,39,52,43,61,37,48,64,41,55,36,72,45,38];

  const tick = () => {
    const letter = panic[homieFxStep % panic.length];
    setHomieFx(`LH.SpeedLines.${letter}.png`);
    const hold = holds[homieFxStep % holds.length];
    homieFxStep += 1;
    homieFxTimer = setTimeout(tick, hold);
  };
  tick();
}

function startHomieWalk() {
  if (homieWalkTimer) clearInterval(homieWalkTimer);
  homieWalkPhase = 0;
  setHomieFrame("LH.Walk.A.png");
  homieWalkTimer = setInterval(() => {
    if (!turtle?.classList.contains("walk")) {
      clearInterval(homieWalkTimer);
      homieWalkTimer = null;
      return;
    }
    homieWalkPhase ^= 1;
    setHomieFrame(homieWalkPhase ? "LH.Walk.B.png" : "LH.Walk.A.png");
  }, 430);
}

if (loaderScene) {
  loaderScene.classList.add("booting-in");
  setHomieFrame("LH.Shell.png");
  setTimeout(() => loaderScene.classList.add("boot-visible"), LOADER_BOOT_DELAY_MS);

  const shellBreathAt = LOADER_BOOT_DELAY_MS + LOADER_FADE_IN_MS + 520;

  // Head alone: wake up, look, realize.
  setTimeout(() => setHomieFrame("LH.Shell.Head.png"), shellBreathAt);

  // Appendages appear. Do not walk yet.
  setTimeout(() => setHomieFrame("LH.Walk.A.png"), shellBreathAt + 720);

  // Bearings found: mechanical walk begins.
  setTimeout(() => {
    turtle?.classList.add("walk");
    startHomieWalk();
  }, shellBreathAt + 1320);

  // Let the walk exist before 1% and progression wake up.
  setTimeout(() => {
    loaderScene.classList.add("homie-awake");
    setProgress(1);
    loaderBootComplete = true;
  }, shellBreathAt + 2050);
} else {
  loaderBootComplete = true;
}
const AVATAR_HALF = AVATAR_SIZE / 2;
const frankFrames = [
  "blue.frank0.PNG",
  "blue.frank1.PNG",
  "blue.frank2.PNG",
  "blue.frank3.PNG",
  "blue.frank4.PNG",
  "blue.frank5.PNG",
  "blue.frank6.PNG"
];
let activeFrankStack = [];


const RED_POEM_STANZAS = [
  ["Walked into your office,", "saw the fire in your hair.", "Bright red like a warning", "but I didn’t even care."],
  ["You sat at that desk,", "whole room shifted tone.", "Like I stepped into a palace", "that was never my own."],
  ["You looked up for a second.", "I was caught in the frame.", "Started callin’ you Jasmine...", "just didn’t say it by name."],
  ["It was a joke in my head.", "Started feeling surreal.", "Like there was a crown in my future...", "I might not have to steal."],
  ["Every visit turned a moment...", "into somethin’ more deep.", "I was buildin’ whole worlds...", "while you were talkin’ to me."],
  ["I had a carpet in my mind...", "Had a plan. Had a pace.", "I had a version of forever...", "each time I saw your face."],
  ["Never crossed any lines.", "I kept it cool. Kept it tight.", "But I felt somethin’ shift", "with you in my sight."],
  ["Thought the door might be open", "just a crack, just enough...", "Thought maybe. Just maybe,", "this was fairytale kind of stuff."],
  ["The silence got louder.", "You were driftin’ away.", "Conversations got shorter...", "A different look in your gaze."],
  ["Didn’t see it all happen.", "Never watched you choose him.", "Just held it inside", "while my walls were caving in..."],
  ["He was part of your story.", "I'm not even a page.", "Just a thought scribbled down,", "then quickly erased."],
  ["That’s the part I can’t get over...", "Missing this win.", "I never lost you to him.", "I just never got to begin."],
  ["Now I’m stuck with this palace...", "that I built in my head.", "Walkin’ down empty hallways,", "where the words went unsaid."],
  ["Scrabbling for a genie.", "My wish was never spoke.", "I feel like a punchline with no setup...", "just a half-finished joke."],
  ["I still picture your hair", "& how the light shaded those strands.", "When you smiled at me", "I thought fate had a plan."],
  ["Now it flickers like a memory", "that burns when I sleep.", "The crown I had imagined.", "The one I never could keep."]
];

const FREQUENCY_LINE_INDENTS = [0, 5, 2, 8, 1, 6, 3, 9, 2, 7, 4, 0, 6, 2, 8, 4];

const FREQUENCY_LINE_COMPOSITION = new Map([
  ["Walked into your office,", { size: 31.0, shift: 4 }],
  ["saw the fire in your hair.", { size: 27.0, shift: 34 }],
  ["Bright red like a warning", { size: 29.5, shift: 12 }],
  ["but I didn’t even care.", { size: 26.0, shift: 46 }],

  ["You sat at that desk,", { size: 31.0, shift: 20 }],
  ["whole room shifted tone.", { size: 27.5, shift: 2 }],
  ["Like I stepped into a palace", { size: 22.8, shift: 30 }],
  ["that was never my own.", { size: 25.5, shift: 6 }],

  ["You looked up for a second.", { size: 22.0, shift: 3 }],
  ["I was caught in the frame.", { size: 25.0, shift: 26 }],
  ["Started callin’ you Jasmine...", { size: 20.6, shift: 7 }],
  ["just didn’t say it by name.", { size: 22.0, shift: 38 }],

  ["It was a joke in my head.", { size: 25.5, shift: 8 }],
  ["Started feeling surreal.", { size: 27.0, shift: 42 }],
  ["Like there was a crown in my future...", { size: 18.3, shift: 1 }],
  ["I might not have to steal.", { size: 24.0, shift: 28 }],

  ["Every visit turned a moment...", { size: 21.0, shift: 13 }],
  ["into somethin’ more deep.", { size: 25.5, shift: 43 }],
  ["I was buildin’ whole worlds...", { size: 22.5, shift: 5 }],
  ["while you were talkin’ to me.", { size: 21.8, shift: 31 }],

  ["I had a carpet in my mind...", { size: 22.0, shift: 2 }],
  ["Had a plan. Had a pace.", { size: 27.5, shift: 48 }],
  ["I had a version of forever...", { size: 21.8, shift: 14 }],
  ["each time I saw your face.", { size: 24.5, shift: 37 }],

  ["Never crossed any lines.", { size: 27.5, shift: 3 }],
  ["I kept it cool. Kept it tight.", { size: 23.0, shift: 33 }],
  ["But I felt somethin’ shift", { size: 26.0, shift: 15 }],
  ["with you in my sight.", { size: 29.5, shift: 49 }],

  ["Thought the door might be open", { size: 19.2, shift: 1 }],
  ["just a crack, just enough...", { size: 22.5, shift: 28 }],
  ["Thought maybe. Just maybe,", { size: 24.0, shift: 7 }],
  ["this was fairytale kind of stuff.", { size: 18.2, shift: 35 }],

  ["The silence got louder.", { size: 28.0, shift: 10 }],
  ["You were driftin’ away.", { size: 24.5, shift: 45 }],
  ["Conversations got shorter...", { size: 21.5, shift: 3 }],
  ["A different look in your gaze.", { size: 20.5, shift: 29 }],

  ["Didn’t see it all happen.", { size: 25.5, shift: 22 }],
  ["Never watched you choose him.", { size: 21.5, shift: 1 }],
  ["Just held it inside", { size: 31.0, shift: 52 }],
  ["while my walls were caving in...", { size: 19.0, shift: 13 }],

  ["He was part of your story.", { size: 24.0, shift: 4 }],
  ["I'm not even a page.", { size: 28.0, shift: 41 }],
  ["Just a thought scribbled down,", { size: 21.5, shift: 16 }],
  ["then quickly erased.", { size: 29.0, shift: 50 }],

  ["That’s the part I can’t get over...", { size: 18.5, shift: 5 }],
  ["Missing this win.", { size: 32.0, shift: 36 }],
  ["I never lost you to him.", { size: 23.5, shift: 11 }],
  ["I just never got to begin.", { size: 22.0, shift: 44 }],

  ["Now I’m stuck with this palace...", { size: 18.2, shift: 2 }],
  ["that I built in my head.", { size: 25.0, shift: 34 }],
  ["Walkin’ down empty hallways,", { size: 20.5, shift: 8 }],
  ["where the words went unsaid.", { size: 19.3, shift: 42 }],

  ["Scrabbling for a genie.", { size: 25.0, shift: 18 }],
  ["My wish was never spoke.", { size: 24.5, shift: 3 }],
  ["I feel like a punchline with no setup...", { size: 17.6, shift: 26 }],
  ["just a half-finished joke.", { size: 24.5, shift: 47 }],

  ["I still picture your hair", { size: 27.5, shift: 5 }],
  ["& how the light shaded those strands.", { size: 18.4, shift: 31 }],
  ["When you smiled at me", { size: 29.0, shift: 17 }],
  ["I thought fate had a plan.", { size: 23.0, shift: 46 }],

  ["Now it flickers like a memory", { size: 20.0, shift: 3 }],
  ["that burns when I sleep.", { size: 27.0, shift: 38 }],
  ["The crown I had imagined.", { size: 22.5, shift: 11 }],
  ["The one I never could keep.", { size: 21.0, shift: 43 }]
]);

function ensurePoemNoteOverlay() {
  document.getElementById("poemNoteOverlay")?.remove();

  poemNoteOverlay = document.createElement("aside");
  poemNoteOverlay.className = "frequency-bleed-overlay";
  poemNoteOverlay.id = "poemNoteOverlay";
  poemNoteOverlay.setAttribute("aria-hidden", "true");
  poemNoteOverlay.innerHTML = `
    <div class="frequency-impact" aria-hidden="true"></div>
    <div class="frequency-takeover" aria-hidden="true">
      <div class="frequency-static frequency-static-a"></div>
      <div class="frequency-static frequency-static-b"></div>
      <div class="frequency-rip frequency-rip-one"></div>
      <div class="frequency-rip frequency-rip-two"></div>
      <div class="frequency-flash"></div>
      <div class="frequency-warning"><strong>DANGER</strong><span>SIGNAL HIJACK IN PROGRESS</span></div>
    </div>
    <section class="frequency-journal" role="dialog" aria-modal="true" aria-label="Red poem">
      <button class="frequency-close" type="button" aria-label="close private signal">×</button>
      <div class="frequency-scroll-journal">
        <div class="frequency-page">
          <div class="frequency-title" aria-label="Red"></div>
          <div class="frequency-poem" aria-live="off"></div>
        </div>
      </div>
    </section>
  `;

  poemNoteOverlay.querySelector(".frequency-close")?.addEventListener("click", closePoemNote);
  document.body.appendChild(poemNoteOverlay);
  return poemNoteOverlay;
}

function sleepFrequency(ms, token) {
  return new Promise(resolve => window.setTimeout(() => resolve(token === frequencyBleedRunToken), ms));
}

function pauseWorldForFrequencyBleed() {
  frequencyBleedAnimations = [];
  try {
    const animations = typeof document.getAnimations === "function" ? document.getAnimations() : [];
    frequencyBleedAnimations = animations.filter(animation => {
      if (!animation || animation.playState !== "running") return false;
      const target = animation.effect && animation.effect.target;
      return !(target && target.closest && target.closest("#poemNoteOverlay"));
    });
    frequencyBleedAnimations.forEach(animation => {
      try { animation.pause(); } catch (error) { /* Safari safety. */ }
    });
  } catch (error) {
    frequencyBleedAnimations = [];
  }
  document.documentElement.classList.add("frequency-bleed-active");
}

function resumeWorldAfterFrequencyBleed() {
  document.documentElement.classList.remove("frequency-bleed-active");
  frequencyBleedAnimations.forEach(animation => {
    try { animation.play(); } catch (error) { /* Safari safety. */ }
  });
  frequencyBleedAnimations = [];
}

function placeFrequencyBleedScar(rect) {
  const stainField = document.getElementById("engagementField");
  if (!rect || !stainField) return;

  frequencyBleedScar?.remove();

  const fieldRect = stainField.getBoundingClientRect();
  frequencyBleedScar = document.createElement("span");
  frequencyBleedScar.className = "frequency-bleed-scar";
  frequencyBleedScar.setAttribute("aria-hidden", "true");
  frequencyBleedScar.innerHTML = `
    <i class="frequency-scar-core"></i>
    <i class="frequency-scar-fleck frequency-scar-fleck-a"></i>
    <i class="frequency-scar-fleck frequency-scar-fleck-b"></i>
  `;
  frequencyBleedScar.style.left = `${rect.left + rect.width / 2 - fieldRect.left}px`;
  frequencyBleedScar.style.top = `${rect.top + rect.height / 2 - fieldRect.top}px`;

  // First child keeps the permanent heat stain behind every current and future floater.
  stainField.insertBefore(frequencyBleedScar, stainField.firstChild);
}

function createSpellLine(text, className = "frequency-spell-line") {
  const line = document.createElement("div");
  line.className = className;
  line.setAttribute("aria-label", text);

  const characters = [...text];
  const wordStarts = [];

  characters.forEach((character, index) => {
    const glyph = document.createElement("span");
    const isSpace = character === " ";
    glyph.className = isSpace ? "frequency-spell-space" : "frequency-spell-glyph";
    glyph.textContent = isSpace ? "\u00a0" : character;
    if (!isSpace) glyph.dataset.glyph = character;

    const seed = character.charCodeAt(0) + index * 37;
    glyph.style.setProperty("--glyph-tilt", `${((seed % 11) - 5) * 0.24}deg`);
    glyph.style.setProperty("--glyph-lift", `${((seed % 7) - 3) * 0.38}px`);
    glyph.style.setProperty("--glyph-scale-x", `${0.94 + (seed % 9) * 0.012}`);
    glyph.style.setProperty("--glyph-scale-y", `${0.96 + (seed % 7) * 0.012}`);
    glyph.style.setProperty("--glyph-size-factor", "1");
    glyph.style.setProperty("--glyph-scorch", `${0.72 + (seed % 5) * 0.07}`);
    glyph.style.setProperty("--fissure-x", `${28 + (seed % 44)}%`);
    glyph.style.setProperty("--fissure-width", `${8 + (seed % 13)}%`);
    glyph.style.setProperty("--ember-delay", `${(seed % 7) * 22}ms`);
    glyph.style.setProperty("--ember-drift", `${((seed % 9) - 4) * 0.34}px`);

    if (!isSpace && (index === 0 || characters[index - 1] === " ")) {
      wordStarts.push(index);
    }

    line.appendChild(glyph);
  });

  if (className === "frequency-spell-line") {
    const glyphs = [...line.children];
    const signature = [...text].reduce(
      (total, character, index) => total + character.charCodeAt(0) * (index + 11),
      text.length * 97
    );

    /*
      Organic journal emphasis: occasional word openings swell because of the
      line's own deterministic rhythm. No specific poem word is hard-coded.
      Reopening the journal produces the same handwriting every time.
    */
    const candidates = wordStarts.filter((index, candidateIndex) => {
      if (text.length >= 38 && candidateIndex > 0) return false;
      return /[A-Za-zÀ-ÿ&]/.test(characters[index] || "");
    });

    let emphasisCount = 0;
    if (candidates.length && signature % 5 <= 1) emphasisCount = 1;
    if (candidates.length >= 4 && text.length <= 31 && signature % 19 === 0) emphasisCount = 2;

    const chosen = [];
    for (let pick = 0; pick < emphasisCount; pick += 1) {
      const candidateIndex = (signature + pick * 7) % candidates.length;
      const characterIndex = candidates[candidateIndex];
      if (!chosen.includes(characterIndex)) chosen.push(characterIndex);
    }

    chosen.forEach((characterIndex, emphasisIndex) => {
      const glyph = glyphs[characterIndex];
      if (!glyph) return;

      const longLinePenalty = text.length >= 34 ? 0.16 : text.length >= 28 ? 0.08 : 0;
      const composition = FREQUENCY_LINE_COMPOSITION.get(text);
      const manualSmallPenalty = composition && composition.size <= 20.5 ? 0.18 : 0;
      const factor = Math.max(
        1.16,
        1.43 + ((signature + characterIndex * 13 + emphasisIndex * 17) % 25) / 100 - longLinePenalty - manualSmallPenalty
      );

      glyph.style.setProperty("--glyph-size-factor", factor.toFixed(2));
      glyph.style.setProperty("--glyph-lift", `${-1.4 - ((signature + characterIndex) % 6) * 0.34}px`);
      glyph.classList.add("frequency-emphasis-glyph", "frequency-organic-initial");
    });

    line.dataset.rhythm = String(signature % 9);
  }

  return line;
}

async function writeSpellLine(line, token, options = {}) {
  if (token !== frequencyBleedRunToken || !line?.isConnected) return false;

  const glyphs = [...line.querySelectorAll(".frequency-spell-glyph")];
  const baseDelay = options.msPerCharacter || 135;

  for (let index = 0; index < glyphs.length; index += 1) {
    if (token !== frequencyBleedRunToken || !line.isConnected) return false;

    const glyph = glyphs[index];
    const character = glyph.textContent || "";
    const duration = Math.max(150, baseDelay + ((index * 29 + character.charCodeAt(0) * 7) % 90));

    glyph.style.setProperty("--glyph-duration", `${duration}ms`);
    glyph.classList.add("spell-writing");

    if (!await sleepFrequency(Math.max(68, duration * 0.52), token)) return false;
    glyph.classList.add("spell-written");

    const punctuationPause = /[.!?…,]/.test(character) ? 120 : 0;
    if (!await sleepFrequency(34 + ((index * 17) % 42) + punctuationPause, token)) return false;
  }

  return true;
}

function fitFrequencyLineToScreen(line, stanzaIndex, lineIndex) {
  if (!line?.isConnected) return;

  const page = line.closest(".frequency-page");
  const pageRect = page?.getBoundingClientRect();
  const pageStyle = page ? getComputedStyle(page) : null;
  const pagePaddingLeft = Number.parseFloat(pageStyle?.paddingLeft || "0") || 0;
  const pagePaddingRight = Number.parseFloat(pageStyle?.paddingRight || "0") || 0;
  const breathingRoom = 7;
  const safeLeft = (pageRect?.left || 0) + pagePaddingLeft + breathingRoom;
  const safeRight = (pageRect?.right || window.innerWidth) - pagePaddingRight - breathingRoom;
  const availableWidth = Math.max(180, safeRight - safeLeft);
  const text = line.getAttribute("aria-label") || line.textContent || "";
  const characterCount = [...text].length;
  const rhythm = Number.parseInt(line.dataset.rhythm || "0", 10);
  const isSignature = Boolean(line.closest(".frequency-signature"));
  const composition = FREQUENCY_LINE_COMPOSITION.get(text) || null;

  let fontSize;
  if (characterCount <= 15) fontSize = 35.5;
  else if (characterCount <= 20) fontSize = 31.5;
  else if (characterCount <= 25) fontSize = 28;
  else if (characterCount <= 30) fontSize = 25;
  else if (characterCount <= 35) fontSize = 22;
  else if (characterCount <= 40) fontSize = 19.5;
  else fontSize = 17.75;

  if (isSignature) {
    fontSize = 27;
  } else if (composition) {
    fontSize = composition.size;
  } else {
    const sizePulse = [1.08, .94, 1.01, .90, 1.05, .96, 1.11, .92, 1.00];
    fontSize *= sizePulse[(rhythm + stanzaIndex + lineIndex) % sizePulse.length];
  }

  line.style.setProperty("--line-font-size", `${fontSize.toFixed(2)}px`);

  line.dataset.fontTier =
    characterCount <= 15 ? "xxl" :
    characterCount <= 20 ? "xl" :
    characterCount <= 25 ? "lg" :
    characterCount <= 30 ? "md" :
    characterCount <= 35 ? "sm" :
    characterCount <= 40 ? "xs" : "xxs";

  if (isSignature) {
    line.style.marginLeft = "auto";
    line.style.marginRight = "0px";
  } else {
    const lineShiftPattern = [
      2, 36, 13, 50,
      24, 6, 43, 17,
      31, 9, 54, 21,
      14, 40, 1, 28
    ];
    const patternIndex = (stanzaIndex * 4 + lineIndex + rhythm) % lineShiftPattern.length;
    let desiredShift = composition ? composition.shift : lineShiftPattern[patternIndex];

    if (!composition) {
      if (characterCount >= 41) desiredShift *= .04;
      else if (characterCount >= 36) desiredShift *= .14;
      else if (characterCount >= 31) desiredShift *= .32;
      else if (characterCount >= 27) desiredShift *= .58;
    }

    line.style.marginLeft = `${Math.round(desiredShift)}px`;
    line.style.marginRight = "0px";
  }

  const getVisibleBounds = () => {
    const glyphs = [...line.querySelectorAll(".frequency-spell-glyph, .frequency-spell-space")];
    if (!glyphs.length) return line.getBoundingClientRect();

    const rects = glyphs
      .map(glyph => glyph.getBoundingClientRect())
      .filter(rect => rect.width > 0 || rect.height > 0);

    if (!rects.length) return line.getBoundingClientRect();

    return {
      left: Math.min(...rects.map(rect => rect.left)),
      right: Math.max(...rects.map(rect => rect.right)),
      top: Math.min(...rects.map(rect => rect.top)),
      bottom: Math.max(...rects.map(rect => rect.bottom)),
      width: Math.max(...rects.map(rect => rect.right)) - Math.min(...rects.map(rect => rect.left)),
      height: Math.max(...rects.map(rect => rect.bottom)) - Math.min(...rects.map(rect => rect.top))
    };
  };

  const measureAndFit = () => {
    if (!line.isConnected) return;

    let currentSize = Number.parseFloat(getComputedStyle(line).fontSize) || fontSize;

    for (let pass = 0; pass < 12; pass += 1) {
      let bounds = getVisibleBounds();
      const leftOverflow = safeLeft - bounds.left;
      const rightOverflow = bounds.right - safeRight;
      const tooWide = bounds.width > availableWidth;

      if (leftOverflow <= 0 && rightOverflow <= 0 && !tooWide) break;

      if (isSignature) {
        if (rightOverflow > 0) {
          const marginRight = Number.parseFloat(line.style.marginRight) || 0;
          line.style.marginRight = `${marginRight + rightOverflow + 3}px`;
        }
      } else {
        if (rightOverflow > 0) {
          const marginLeft = Number.parseFloat(line.style.marginLeft) || 0;
          const removableShift = Math.min(marginLeft, rightOverflow + 4);
          line.style.marginLeft = `${Math.max(0, marginLeft - removableShift)}px`;
        }

        bounds = getVisibleBounds();
        if (bounds.left < safeLeft) {
          const marginLeft = Number.parseFloat(line.style.marginLeft) || 0;
          line.style.marginLeft = `${marginLeft + (safeLeft - bounds.left) + 3}px`;
        }
      }

      bounds = getVisibleBounds();
      const stillOutside = bounds.left < safeLeft || bounds.right > safeRight || bounds.width > availableWidth;

      if (stillOutside) {
        const widthRatio = availableWidth / Math.max(bounds.width, 1);
        const nextSize = Math.max(13.75, currentSize * Math.min(.96, widthRatio * .965));
        if (Math.abs(nextSize - currentSize) < .08) break;
        currentSize = nextSize;
        line.style.setProperty("--line-font-size", `${nextSize.toFixed(2)}px`);
      }
    }
  };

  measureAndFit();
  requestAnimationFrame(measureAndFit);
  window.setTimeout(measureAndFit, 90);
  window.setTimeout(measureAndFit, 260);
  window.setTimeout(measureAndFit, 520);
}

async function appendFrequencyStanza(poem, lines, stanzaIndex, token) {
  const stanza = document.createElement("section");
  stanza.className = "frequency-stanza";
  stanza.style.marginLeft = "0";
  const stanzaTilts = [-.42, .18, -.12, .36, -.28, .08, .31, -.20];
  const stanzaGaps = [0, 7, -2, 11, 3, 14, -1, 8];
  stanza.style.setProperty("--stanza-tilt", `${stanzaTilts[stanzaIndex % stanzaTilts.length]}deg`);
  stanza.style.setProperty("--stanza-extra-gap", `${stanzaGaps[stanzaIndex % stanzaGaps.length]}px`);
  poem.appendChild(stanza);

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const text = lines[lineIndex];
    const line = createSpellLine(text);
    stanza.appendChild(line);

    fitFrequencyLineToScreen(line, stanzaIndex, lineIndex);
    requestAnimationFrame(() => fitFrequencyLineToScreen(line, stanzaIndex, lineIndex));

    if (!await writeSpellLine(line, token, { msPerCharacter: 128 })) return false;

    // Re-measure after the glyph transforms become visible. This is the real
    // rendered width on iPhone and prevents late right-edge clipping.
    fitFrequencyLineToScreen(line, stanzaIndex, lineIndex);

    if (!await sleepFrequency(145 + ((stanzaIndex + lineIndex) % 3) * 52, token)) return false;
  }

  return true;
}

async function runFrequencyBleedWriting(token) {
  const overlay = poemNoteOverlay;
  if (!overlay) return;

  const titleHost = overlay.querySelector(".frequency-title");
  const poem = overlay.querySelector(".frequency-poem");
  if (!titleHost || !poem) return;

  // Let the hacked signal die completely before Jinx answers from inside the dark.
  if (!await sleepFrequency(2050, token)) return;
  overlay.classList.add("journal-live", "journal-breathing");

  // The title is its own ritual: darkness, RED, then one held breath before the poem.
  const title = createSpellLine("Red", "frequency-spell-title");
  titleHost.appendChild(title);
  if (!await sleepFrequency(520, token)) return;
  title.classList.add("title-awake");
  if (!await writeSpellLine(title, token, { msPerCharacter: 360 })) return;
  title.classList.add("title-sealed");
  if (!await sleepFrequency(1250, token)) return;
  overlay.classList.add("poem-awake");

  for (let stanzaIndex = 0; stanzaIndex < RED_POEM_STANZAS.length; stanzaIndex += 1) {
    if (!await appendFrequencyStanza(poem, RED_POEM_STANZAS[stanzaIndex], stanzaIndex, token)) return;
    if (!await sleepFrequency(430 + (stanzaIndex % 4) * 90, token)) return;
  }

  const signatureWrap = document.createElement("section");
  signatureWrap.className = "frequency-signature";
  const signature = createSpellLine("-Jinx");
  signatureWrap.appendChild(signature);
  poem.appendChild(signatureWrap);
  if (!await writeSpellLine(signature, token, { msPerCharacter: 148 })) return;
  fitFrequencyLineToScreen(signature, RED_POEM_STANZAS.length, 0);

  overlay.classList.add("frequency-message-sent");
  if (!await sleepFrequency(7000, token)) return;
  if (token === frequencyBleedRunToken) closePoemNote();
}

function openPoemNote(flameNode) {
  if (frequencyBleedActive) return;

  frequencyBleedActive = true;
  frequencyBleedRunToken += 1;
  const token = frequencyBleedRunToken;
  const flameRect = flameNode?.isConnected ? flameNode.getBoundingClientRect() : null;
  const overlay = ensurePoemNoteOverlay();

  pauseWorldForFrequencyBleed();
  if (flameNode?.isConnected) flameNode.classList.add("frequency-overlap-hit");

  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("open", "impact-live");

  window.setTimeout(() => {
    if (token !== frequencyBleedRunToken || !poemNoteOverlay) return;
    poemNoteOverlay.classList.add("takeover-live");
  }, 300);

  window.setTimeout(() => {
    if (token !== frequencyBleedRunToken || !poemNoteOverlay) return;
    poemNoteOverlay.classList.add("warning-live");
  }, 610);

  window.setTimeout(() => {
    if (token !== frequencyBleedRunToken || !poemNoteOverlay) return;
    poemNoteOverlay.classList.add("black-takeover");
  }, 1180);

  window.setTimeout(() => {
    if (flameNode?.isConnected) flameNode.remove();
    placeFrequencyBleedScar(flameRect);
  }, 1850);

  requestAnimationFrame(() => runFrequencyBleedWriting(token));
}

function closePoemNote() {
  if (!frequencyBleedActive) return;

  frequencyBleedRunToken += 1;
  frequencyBleedActive = false;

  if (poemNoteOverlay) {
    poemNoteOverlay.classList.add("frequency-closing");
    poemNoteOverlay.setAttribute("aria-hidden", "true");
    const closingOverlay = poemNoteOverlay;
    poemNoteOverlay = null;
    window.setTimeout(() => closingOverlay.remove(), 180);
  }

  resumeWorldAfterFrequencyBleed();
}


function openJinxCard() {
  if (!jinxCardOverlay) return;
  jinxCardOverlay.hidden = false;
  jinxCardOverlay.classList.add("open");
  jinxCardOverlay.setAttribute("aria-hidden", "false");
}

function closeJinxCard() {
  if (!jinxCardOverlay) return;
  jinxCardOverlay.classList.remove("open");
  jinxCardOverlay.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    if (!jinxCardOverlay.classList.contains("open")) {
      jinxCardOverlay.hidden = true;
    }
  }, 190);
}

function hideJinxShadowFrequency() {
  if (!jinxShadowFrequency) return;
  jinxShadowFrequency.classList.remove("armed", "pulse-live");
  jinxShadowFrequency.setAttribute("aria-hidden", "true");
  jinxShadowFrequency.tabIndex = -1;
}

function consumeJinxShadowFrequency() {
  jinxFrequencyUsed = true;
  jinxFrequencyArmed = false;
  founderWindowClosed = true;

  if (jinxFrequencyTimer) {
    window.clearTimeout(jinxFrequencyTimer);
    jinxFrequencyTimer = null;
  }

  if (jinxFrequencyClearTimer) {
    window.clearTimeout(jinxFrequencyClearTimer);
    jinxFrequencyClearTimer = null;
  }

  hideJinxShadowFrequency();
}

function pulseJinxShadowFrequency() {
  if (!jinxShadowFrequency || !jinxFrequencyArmed || founderWindowClosed || jinxFrequencyUsed) return;

  jinxShadowFrequency.classList.add("pulse-live");
  jinxShadowFrequency.setAttribute("aria-hidden", "false");
  jinxShadowFrequency.tabIndex = 0;

  jinxFrequencyClearTimer = window.setTimeout(() => {
    consumeJinxShadowFrequency();
  }, 6800);
}

function armJinxShadowFrequency() {
  if (!jinxShadowFrequency || jinxFrequencyArmed || founderWindowClosed || jinxFrequencyUsed) return;

  jinxFrequencyArmed = true;
  jinxShadowFrequency.classList.add("armed");
  jinxShadowFrequency.setAttribute("aria-hidden", "true");
  jinxShadowFrequency.tabIndex = -1;

  jinxFrequencyTimer = window.setTimeout(() => {
    pulseJinxShadowFrequency();
  }, 520);
}

function closeFounderWindow() {
  consumeJinxShadowFrequency();
}

if (jinxShadowFrequency) {
  jinxShadowFrequency.addEventListener("click", () => {
    if (!jinxShadowFrequency.classList.contains("pulse-live")) return;
    consumeJinxShadowFrequency();
    openJinxCard();
  });

  jinxShadowFrequency.addEventListener("touchend", event => {
    if (!jinxShadowFrequency.classList.contains("pulse-live")) return;
    event.preventDefault();
    consumeJinxShadowFrequency();
    openJinxCard();
  }, { passive: false });
}

if (jinxCardClose) jinxCardClose.addEventListener("click", closeJinxCard);
if (jinxCardOverlay) {
  jinxCardOverlay.hidden = true;
  jinxCardOverlay.setAttribute("aria-hidden", "true");
  jinxCardOverlay.addEventListener("click", event => {
    if (event.target === jinxCardOverlay) closeJinxCard();
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeJinxCard();
});


const hiveAssets = [
  "Bot.Male.V1.PNG",
  "Bot.Male.V2.PNG",
  "Bot.Female.V1.PNG",
  "Bot.Female.V2.PNG",
  "Bot.Female.V3.PNG"
];

const normalAssets = [
  "Asset1.PNG",
  "Asset2.PNG",
  "Asset3.png",
  "Asset4.PNG",
  "Asset5.PNG",
  "Asset6.PNG",
  "Asset7.PNG",
  "Asset8.PNG",
  "Asset9.PNG",
  "Asset10.PNG",
  "Asset11.PNG",
  "Asset12.PNG",
  "Asset13.PNG",
  "Asset14.PNG",
  "Asset15.PNG",
  "Asset16.PNG",
  "Asset17.PNG",
  "Asset18.PNG",
  "Asset19.PNG",
  "Asset20.PNG",
  "Asset21.PNG",
  "Asset22.PNG",
  "Asset23.PNG",
  "Asset24.PNG"
];

const loaderTargets = [
  // Nine regular profiles bury the loader. Carl is the tenth and final far-left hit.
  { x: 44.2, y: 34.02, zone: "loader", cluster: "loader-mid-left" },
  { x: 73.4, y: 34.20, zone: "loader", cluster: "loader-far-right" },
  { x: 56.0, y: 34.08, zone: "loader", cluster: "loader-center" },
  { x: 66.2, y: 34.26, zone: "loader", cluster: "loader-right-mid" },
  { x: 36.8, y: 34.18, zone: "loader", cluster: "loader-left-safe" },
  { x: 61.4, y: 34.00, zone: "loader", cluster: "loader-center-right" },
  { x: 49.8, y: 34.30, zone: "loader", cluster: "loader-mid-low" },
  { x: 78.1, y: 34.06, zone: "loader", cluster: "loader-right-cap" },
  { x: 29.6, y: 34.12, zone: "loader", cluster: "loader-carl-old-position" }
];

const symbolTargets = [
  // C.17 SYMBOL: intentional blue contact points only. Bam... bam... bam. No end-swarm chaos.
  { x: 44.0, y: 21.2, zone: "symbol" },
  { x: 51.0, y: 18.8, zone: "symbol" },
  { x: 57.2, y: 22.2, zone: "symbol" },
  { x: 47.0, y: 27.0, zone: "symbol" },
  { x: 54.5, y: 26.2, zone: "symbol" }
];

const missTargets = [
  // Reserved drift/miss references. Loader/symbol zone logic should not lean on this during the current brick.
  { x: 22.0, y: 32.55, zone: "miss" },
  { x: 78.0, y: 32.35, zone: "miss" }
];


// CARL ZONE — maintenance accident canon.
// Carl is just another avatar on the left side of the loader.
// Hearts begin at 17% as sparse field-smoke, not a wall and not a lane.
// One pink heart rises like the others, gets flicked by the top-right system/fan, visibly breaks on-screen,
// then overcorrects through a fast wind curl and completes an electric edge-contact with Carl.
const CARL_ZONE = { x: 21.4, y: 34.18 };
const CARL_HEART_CONTACT = { x: CARL_ZONE.x + 3.6, y: CARL_ZONE.y + 0.04 };
const CARL_HEART_PATH = [
  /*
    Actor Two begins at the bottom-left round-robin point.
    Existing left-side coordinates and timing proportions are preserved.
  */
  {
    left: "12%",
    top: "103%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 0,
    offset: 0
  },
  {
    left: "14%",
    top: "96%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .028
  },
  {
    left: "15%",
    top: "87%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .158
  },
  {
    left: "16%",
    top: "76%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .299
  },
  {
    left: "18%",
    top: "64%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .439
  },
  {
    left: "20%",
    top: "53%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .579
  },
  {
    left: "23%",
    top: "44%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .719
  },
  {
    left: "26%",
    top: "38%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .860
  },
  {
    left: `${CARL_HEART_CONTACT.x}%`,
    top: `${CARL_HEART_CONTACT.y}%`,
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: 1
  }
];

  function setProgress(value) {
  progress = Math.max(0, Math.min(100, value));
  fill.style.width = progress <= 0 ? "0%" : `${progress}%`;
  percent.textContent = `${Math.round(progress)}%`;
}

const loading = setInterval(() => {
  if (frequencyBleedActive || frostHolding || frostLocked) {
    return;
  }

  if (!loaderBootComplete) {
    setProgress(0);
    return;
  }

  if (state === "normal") progress += 0.16;
  if (state === "notice") progress += 0.072;
  if (state === "hide") progress += 0.18;

  if (progress >= 17 && !noticed) {
    noticed = true;
    state = "notice";
    turtle.classList.remove("walk");
    turtle.classList.add("notice");
    loader.classList.add("offcourse");

    if (!heartSmokeStarted) {
      heartSmokeStarted = true;
      startHeartSmoke();
    }
  }

  if (progress >= 18.4 && !hidden) {
    hidden = true;
    state = "hide";
    turtle.classList.remove("notice");
    turtle.classList.add("hide");

    // Panic beat: full retreat to shell; pixel-shiver belongs to Homie's world.
    setHomieFrame("LH.Shell.png");
    startHomieShiver();
    homieShiverUntil = performance.now() + 1150;
  }

  // Hold the world at the edge of 19% long enough for the pixel panic to READ.
  if (hidden && !breached && performance.now() < homieShiverUntil) {
    progress = Math.min(progress, 18.65);
    setProgress(progress);
    return;
  }

  if (hidden && !breached && performance.now() >= homieShiverUntil) {
    breached = true;
    virusLayer.classList.add("active");
    startAttack();
  }

  if (progress >= 40 && !ghosted) {
    ghosted = true;
    signalGhost.classList.add("waking");
  }

  if (progress >= 88 && !hiveWaveStarted) {
    hiveWaveStarted = true;
    beginHiveWave();
  }

  if (progress >= 76 && !burning) {
    burning = true;
    signalGhost.classList.add("burning");
    // Heat is confined to the landed paper avatars.
  }
    if (progress >= 80 && !generals) {
    generals = true;
    deployGenerals();
  }
  if (progress >= 52 && !symbolBattleStarted) {
    startSymbolBattle();
  }

  if (progress >= 86 && !wrenSeen) {
    wrenSeen = true;
    spawnWren();
  }

  if (progress >= 24 && !frankSeen) {
    frankSeen = true;
    spawnFrank();
  }

  if (progress >= 100 && !completed) {
    completed = true;
    progress = 100;
    clearInterval(loading);
    completeSequence();
  }

  setProgress(progress);
}, 45);

function startHeartSmoke() {
  // FOREMAN MODE — HEART FIELD ONLY.
  // Start with one validation heart, then let the field grow naturally: and then another... and another.
  // Pink/red only. No Carl heart. No broken-heart event. No zones.
  if (engageTimer) return;
  heartSmokeSpawnCount = 0;
  spawnEngagement({ guaranteed: true });

  // Let the normal stream establish itself first.
  // Actor One is then injected as one ordinary broken-heart emoji.
  setTimeout(() => {
    if (completed || deadHeartReleased) return;

    deadHeartReleased = true;

    spawnEngagement({
      guaranteed: true,
      carlBroken: true
    });
  }, 1700);

  engageTimer = setInterval(() => {
    if (completed) return;

    heartSmokeSpawnCount++;
    spawnEngagement({ guaranteed: true });

    // As the infestation grows, occasional extra hearts appear with human-feeling delay.
    if (heartSmokeSpawnCount > 3 && Math.random() < 0.34) {
      setTimeout(() => { if (!completed) spawnEngagement({ guaranteed: true }); }, 360 + Math.random() * 520);
    }
    if (heartSmokeSpawnCount > 8 && Math.random() < 0.22) {
      setTimeout(() => { if (!completed) spawnEngagement({ guaranteed: true }); }, 760 + Math.random() * 620);
    }
  }, 1320);
}

function startAttack() {
  // Tight, irregular magnetic hits. Nine regular profiles, then Carl seals the far-left.
  if (profileTimer) return;

  const slamDelays = [
    260,
    540,
    850,
    1180,
    1510,
    1870,
    2240,
    2660,
    3090
  ];

  loaderTargets.forEach((target, index) => {
    setTimeout(() => {
      spawnProfile("top", 0, {
        force: target,
        noAutoRemove: true,
        loaderBurial: true
      });
    }, slamDelays[index]);
  });

  setTimeout(() => {
    if (!carlSeen) {
      carlSeen = true;
      spawnCarl();
    }

    loaderCoverageDone = true;
  }, 3520);

  slashTimer = setInterval(() => {
    if (completed) return;
    spawnSlash(randomSide());
  }, 4200);
}

function startSymbolBattle() {
  if (symbolBattleStarted) return;
  symbolBattleStarted = true;
  // The first burn establishes the scene; connected reinforcements accelerate.
  const hits = [0, 3100, 4200, 5050, 5700];
  const contacts = [[.30,.55], [.70,.72], [.48,.22], [.25,.84], [.74,.48]];
  hits.forEach((delay, i) => {
    setTimeout(() => {
      if (completed || frostHolding || frostLocked) return;
      let target = symbolTargets[i % symbolTargets.length];
      // Keep the approved opening. Spread later hits over the rendered symbol.
      if (i > 0) {
        const symbol = document.querySelector("#signalGhost .ghost-inner-symbol");
        const sr = symbol?.getBoundingClientRect();
        const fr = profileField.getBoundingClientRect();
        if (sr?.width && sr.height && fr.width && fr.height && symbol.naturalWidth) {
          const fit = Math.min(sr.width / symbol.naturalWidth, sr.height / symbol.naturalHeight);
          const width = symbol.naturalWidth * fit, height = symbol.naturalHeight * fit;
          const [cx, cy] = contacts[i];
          target = {
            x: 100 * (sr.left + (sr.width-width)/2 + cx*width - fr.left) / fr.width,
            y: 100 * (sr.top + (sr.height-height)/2 + cy*height - fr.top) / fr.height,
            zone: "symbol"
          };
        }
      }
      spawnProfile(["top", "left", "right", "bottom"][i % 4], 0,
        { force: target, symbolProbe: true });
      if (i === hits.length - 1) {
        // Retreat follows the last consumed cover, instead of a long idle tail.
        const finishBattle = () => {
          if (frostHolding || frostLocked || profileField.querySelector(".profile.symbol-touch")) {
            setTimeout(finishBattle, 100);
            return;
          }
          stopAttack();
        };
        setTimeout(finishBattle, 700);
      }
    }, delay);
  });
}

function randomSide() {
  return ["top", "left", "right", "bottom"][Math.floor(Math.random() * 4)];
}

function jitter(value, amount) {
  return value + (-amount + Math.random() * amount * 2);
}

function spawnSlash(side) {
  const slash = document.createElement("div");
  slash.className = "slash";

  slash.style.left = Math.random() * 100 + "%";
  slash.style.top = Math.random() * 100 + "%";

  let sx = "0px";
  let sy = "0px";
  let r = "0deg";

  if (side === "top") {
    sy = "-120px";
    r = "90deg";
  }

  if (side === "bottom") {
    sy = "120px";
    r = "-90deg";
  }

  if (side === "left") {
    sx = "-160px";
    r = "0deg";
  }

  if (side === "right") {
    sx = "160px";
    r = "180deg";
  }

  slash.style.setProperty("--sx", sx);
  slash.style.setProperty("--sy", sy);
  slash.style.setProperty("--r", r);

  motionField.appendChild(slash);

  setTimeout(() => slash.remove(), 700);
}

function spawnEngagement(options = {}) {
  if (frequencyBleedActive || frostHolding || frostLocked) return;
  // FOREMAN HEART PASS 4: keep the approved right-lane heart motion, add rare social-noise icons only.
  // Hearts stay dominant. Icons are seasoning: likes / reposts / subscribe-play / gold bell. No center-screen drift.
  if (!options.guaranteed && engageCount > 0 && Math.random() < 0.30) return;

  const item = document.createElement("div");

  let symbol = Math.random() < 0.58 ? "🩷" : "❤️";
  let iconClass = "heart";

  // Faces are now a real part of the social noise.
  // Hearts still dominate, but faces appear frequently and randomly.
  if (heartSmokeSpawnCount > 2) {
    const faceSymbols = [
      "😊", "🤯", "😍", "😃", "😜",
      "😘", "😙", "😆", "😀", "🥰",
      "😂", "😝"
    ];

    const platformSymbols = [
      { symbol: "👍", className: "like" },
      { symbol: "🔔", className: "bell" },
      { symbol: "💯", className: "agree" },
      { symbol: "▶️", className: "subscribe" }
    ];

    const guaranteedFace =
      ((heartSmokeSpawnCount - 3) % 3) === 0;

    const randomFace =
      !guaranteedFace && Math.random() < 0.50;

    const randomPlatformIcon =
      !guaranteedFace &&
      !randomFace &&
      Math.random() < 0.10;

    if (guaranteedFace || randomFace) {
      symbol =
        faceSymbols[
          Math.floor(Math.random() * faceSymbols.length)
        ];

      iconClass = "social-face";
    } else if (randomPlatformIcon) {
      const platformIcon =
        platformSymbols[
          Math.floor(Math.random() * platformSymbols.length)
        ];

      symbol = platformIcon.symbol;
      iconClass = platformIcon.className;
    }
  }

  // Exactly one snowflake per intro.
  if (
    !snowflakeReleased &&
    heartSmokeSpawnCount >= 7
  ) {
    snowflakeReleased = true;
    symbol = "❄️";
    iconClass = "snowflake";
  }

    if (!secretFlameReleased && heartSmokeSpawnCount > 9) {
    secretFlameReleased = true;
    symbol = "🔥";
    iconClass = "secret-flame";
  }

  /*
    Actor One: a completely ordinary right-lane heart.
    Same class, timing system, drift and CSS animation as every other heart.
    The crack is its only visible difference.
  */
  if (options.carlBroken) {
    symbol = "💔";
    iconClass = "heart";
  }

    item.className = `engage heart-story social-smoke ${iconClass}`;
    item.textContent = symbol;

  if (iconClass === "snowflake") {
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "hold");
    item.style.pointerEvents = "auto";
    item.style.touchAction = "none";

    item.addEventListener("pointerdown", event => {
      event.preventDefault();
      event.stopPropagation();

      const pointX = event.clientX;
      const pointY = event.clientY;

      beginFrostHold(item, pointX, pointY);
    });
  }
  if (iconClass === "secret-flame") {
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "secret poem note");
    item.tabIndex = 0;
    item.style.pointerEvents = "auto";
    item.style.touchAction = "manipulation";
    item.style.cursor = "pointer";
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      openPoemNote(item);
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPoemNote(item);
      }
    });
  }

  // Keep the field in the approved right-side lane. Variation is vertical timing/spacing, not wandering across the phone.
  let laneX = 72 + Math.random() * 18;
  let startY = 96 + Math.random() * 8;
  let dur = 8.6 + Math.random() * 1.8;
  let laneDrift = -10 + Math.random() * 20;
  let softSwayA = -5 + Math.random() * 10;
  let softSwayB = -4 + Math.random() * 8;
  let heartScale = 0.96 + Math.random() * 0.16;

  // FIRE BRICK 42: the secret flame is not a spring/slinky.
  // It rides the same right-side social-chaos lane as the hearts, but floats like one helium balloon:
  // steady lift, tiny drift, no aggressive bob, no bounce language.
  if (iconClass === "secret-flame") {
    laneX = 78 + Math.random() * 6;
    startY = 98 + Math.random() * 4;
    dur = 9.35 + Math.random() * 0.75;
    laneDrift = -4 + Math.random() * 8;
    softSwayA = -1 + Math.random() * 2;
    softSwayB = -1 + Math.random() * 2;
    heartScale = 1.02;
  }

  item.style.left = laneX + "%";
  item.style.top = startY + "%";
  item.style.setProperty("--dur", dur.toFixed(2) + "s");
  item.style.setProperty("--drift", Math.round(laneDrift) + "px");
  item.style.setProperty("--bob-a", Math.round(softSwayA) + "px");
  item.style.setProperty("--bob-b", Math.round(softSwayB) + "px");
  item.style.setProperty("--heart-scale", heartScale.toFixed(2));

  engagementField.appendChild(item);
  engageCount++;

    const fadeAt = Math.max(6500, (dur * 1000) - 1000);

  setTimeout(() => {
    if (item.parentNode) {
      item.classList.add("heart-fade-black");
    }
  }, fadeAt);

  /*
    When Actor One naturally disappears above the screen,
    immediately begin Actor Two at the bottom-left round robin.
  */
    if (options.carlBroken) {
    setTimeout(() => {
      releaseDeadHeartTowardCarl();
    }, Math.max(0, (dur * 1000) - 650));
  }

  setTimeout(() => {
    if (item.parentNode) item.remove();
  }, (dur * 1000) + 900);
}

function pickTarget() {
  const count = profileCount;
  if (!loaderCoverageDone) return loaderTargets[count % loaderTargets.length];
  if (symbolBattleStarted) return symbolTargets[count % symbolTargets.length];
  return loaderTargets[count % loaderTargets.length];
}

function spawnProfile(side, delay = 0, opts = {}) {
  setTimeout(() => {
    if (frostHolding || frostLocked) return;
    const old = profileField.querySelectorAll(".profile:not(.carl):not(.frank):not(.wren)");
    if (old.length > 110) old[0].remove();

    const target = opts.force || pickTarget();

    const profile = document.createElement("div");
    profile.className = "profile";

    const asset = opts.asset || (
  target.zone === "symbol"
    ? hiveAssets[profileCount % hiveAssets.length]
    : normalAssets[profileCount % normalAssets.length]
);
    const jitterX = target.zone === "symbol" ? 0.88 : target.zone === "miss" ? 1.45 : 0.18;
    const jitterY = target.zone === "symbol" ? 0.72 : target.zone === "miss" ? 0.18 : 0.06;
    const x = jitter(target.x, jitterX);
    const y = jitter(target.y, jitterY);

    profile.style.left = `calc(${x}% - ${AVATAR_HALF}px)`;
    profile.style.top = `calc(${y}% - ${AVATAR_HALF}px)`;
    profile.dataset.zone = target.zone;
    if (target.zone === "symbol") profile.classList.add("symbol-touch");
    if (target.zone === "loader") profile.classList.add("loader-cover");
    if (opts.symbolProbe) profile.classList.add("symbol-probe");

    let sx = "0px";
    let sy = "0px";

    if (side === "top") sy = "-115vh";
    if (side === "bottom") sy = "115vh";
    if (side === "left") sx = "-115vw";
    if (side === "right") sx = "115vw";

    if (opts.loaderBurial) {
      // Loader avatars drop like heavy system stamps, not coins sliding in from the side.
      const loaderSmash = [
        { sx: "-10px", sy: "-170px", rot: "-7deg" },
        { sx: "18px", sy: "-188px", rot: "5deg" },
        { sx: "4px", sy: "-158px", rot: "-2deg" },
        { sx: "-16px", sy: "-196px", rot: "8deg" },
        { sx: "10px", sy: "-176px", rot: "3deg" }
      ][profileCount % 5];
      sx = loaderSmash.sx;
      sy = loaderSmash.sy;
      profile.style.setProperty("--rot", loaderSmash.rot);
      profile.classList.add("loader-slam");
    }

    profile.style.setProperty("--sx", sx);
    profile.style.setProperty("--sy", sy);
    if (!profile.style.getPropertyValue("--rot")) profile.style.setProperty("--rot", "0deg");
    profile.innerHTML = `<img src="${asset}" alt="">`;

    profileField.appendChild(profile);
    profileCount++;

    spawnSlash(side);

    if (target.zone === "symbol") {
      setTimeout(() => revealHive(profile), 650);
    }

    if (!opts.noAutoRemove) {
      setTimeout(() => {
        if (profile && profile.parentNode && !profile.classList.contains("carl") && !profile.classList.contains("frank")) {
          profile.remove();
        }
      }, target.zone === "symbol" ? 14000 : 5200);
    }
  }, delay);
}

function revealHive(profile) {
  if (!profile?.isConnected || profile.dataset.zone !== "symbol" ||
      profile.classList.contains("wren") || profile.classList.contains("frank") ||
      profile.dataset.paperBurnStarted) return;
  profile.dataset.paperBurnStarted = "true";
  // Preserve the landed position before removing the entrance animation.
  profile.style.setProperty("transform", getComputedStyle(profile).transform, "important");
  profile.classList.add("c17-paper-bot");
  const image = profile.querySelector("img");
  if (!image) return;
  const size = 112;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  canvas.className = "c17-paper-burn-canvas";
  canvas.setAttribute("aria-hidden", "true");
  const ctx = canvas.getContext("2d", {willReadFrequently:true});
  if (!ctx) return;
  const art = document.createElement("canvas");
  art.width = art.height = size;
  const ac = art.getContext("2d", {willReadFrequently:true});
  let pixels, field, elapsed = 0, last = 0;
  const prepare = () => {
    if (!profile.isConnected || !image.naturalWidth) return;
    // Match the arrival image exactly: full-size artwork and its own rim.
    // The enclosing profile supplies the same circular clipping in both phases.
    ac.drawImage(image,0,0,size,size);
    try { pixels=ac.getImageData(0,0,size,size); } catch (_) { return; }
    // Project actual metal artwork into the landed bot's coordinate space.
    // Include nearby strokes outside its rim so edge contacts have a real origin.
    const sample=document.createElement("canvas");
    sample.width=sample.height=size*3;
    const sc=sample.getContext("2d",{willReadFrequently:true});
    const rect=profile.getBoundingClientRect();
    const seeds=[];
    document.querySelectorAll("#signalGhost .ghost-inner-symbol, #signalGhost .ghost-outer-symbol").forEach(symbol=>{
      if(!symbol.complete || !symbol.naturalWidth)return;
      const sr=symbol.getBoundingClientRect();
      const fit=Math.min(sr.width/symbol.naturalWidth,sr.height/symbol.naturalHeight);
      const w=symbol.naturalWidth*fit,h=symbol.naturalHeight*fit;
      const left=sr.left+(sr.width-w)/2,top=sr.top+(sr.height-h)/2;
      sc.drawImage(symbol,size+(left-rect.left)*size/rect.width,
        size+(top-rect.top)*size/rect.height,w*size/rect.width,h*size/rect.height);
    });
    try{
      const metal=sc.getImageData(0,0,size*3,size*3).data;
      for(let y=0;y<size*3;y+=3)for(let x=0;x<size*3;x+=3){
        const k=(y*size*3+x)*4;
        if(metal[k+3]>100 && Math.max(metal[k],metal[k+1],metal[k+2])>55)
          seeds.push([x-size,y-size]);
      }
    }catch(_){profile.classList.remove("c17-paper-bot");return;}
    if(!seeds.length){profile.classList.remove("c17-paper-bot");return;}
    field=new Float32Array(size*size);
    let maxDistance=0;
    for(let y=0;y<size;y++)for(let x=0;x<size;x++){
      let distance=Infinity;
      for(const [sx,sy] of seeds)distance=Math.min(distance,Math.hypot(x-sx,y-sy));
      const noise=1.7*Math.sin(x*.47+y*.31)+1.1*Math.sin(x*.91-y*.68);
      field[y*size+x]=Math.max(0,distance+noise);
      maxDistance=Math.max(maxDistance,field[y*size+x]);
    }
    profile.dataset.burnExtent=String(maxDistance+5);
    profile.appendChild(canvas);profile.classList.add("c17-paper-ready");
    ctx.putImageData(pixels,0,0);
    requestAnimationFrame(frame);
  };
  const frame = now => {
    if(!profile.isConnected)return;
    const dt=last?Math.min(64,now-last):0;last=now;
    if(frostHolding || frostLocked){requestAnimationFrame(frame);return;}
    elapsed+=dt;
    // One intact beat, one warm beat, then a visible outward burn.
    const heat=Math.max(0,Math.min(1,(elapsed-1200)/1200));
    const progress=Math.max(0,Math.min(1,(elapsed-2400)/3400));
    const threshold=progress*Number(profile.dataset.burnExtent);
    const out=new ImageData(new Uint8ClampedArray(pixels.data),size,size);
    for(let i=0;i<field.length;i++){
      const k=i*4;if(!out.data[k+3])continue;
      const edge=field[i]-threshold;
      if(progress>0 && edge<0){out.data[k+3]=0;continue;}
      if(progress>0 && edge<4.5){
        const hot=Math.max(0,1-edge/4.5);
        out.data[k]=Math.round(95+160*hot);
        out.data[k+1]=Math.round(24+135*hot);
        out.data[k+2]=Math.round(8+25*hot);
      }else if(heat>0){
        const contactDistance=field[i];
        const warmth=heat*Math.exp(-contactDistance*contactDistance/130);
        const mix=warmth*.88;
        out.data[k]=out.data[k]*(1-mix)+255*mix;
        out.data[k+1]=out.data[k+1]*(1-mix)+116*mix;
        out.data[k+2]=out.data[k+2]*(1-mix)+22*mix;
      }
    }
    canvas.dataset.hasHeat = heat > 0 ? "true" : "false";
    ctx.putImageData(out,0,0);
    if(progress>=1){profile.remove();return;}
    requestAnimationFrame(frame);
  };
  if(image.complete && image.naturalWidth)prepare();
  else image.addEventListener("load",prepare,{once:true});
}

function beginHiveWave() {
  const nearSignal = [...profileField.querySelectorAll(".profile.symbol-touch")].slice(0, 5);

  nearSignal.forEach((profile, index) => {
    setTimeout(() => revealHive(profile), index * 180);
  });
}

function startBurnPulse() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const ring = document.createElement("div");
      ring.className = "burn-ring";
      impactField.appendChild(ring);
      setTimeout(() => ring.remove(), 950);
    }, i * 650);
  }
}

function deployGenerals() {
  const cards = [...checkGenerals.querySelectorAll(".general")];

  checkGenerals.classList.add("active");

  cards.forEach(card => {
    card.classList.remove("verify", "target");
  });

  /*
    VERIFIED...
    APPROVED...
    AUTHORIZED...
  */
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("verify");
    }, 260 + index * 280);
  });

  /*
    The approval cards become targeting commands,
    then discharge individually.
  */
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.remove("verify");
      card.classList.add("target");
      fireBlast(index);
    }, 1650 + index * 320);
  });
}

function fireBlast(index) {
  const blast = document.createElement("div");
  blast.className = "blast";

  const angles = ["-18deg", "0deg", "18deg"];
  blast.style.setProperty("--a", angles[index] || "0deg");

  impactField.appendChild(blast);

  setTimeout(() => {
    if (blast.parentNode) blast.remove();
  }, 500);
}

function spawnCarl() {
  const existingCarl = profileField.querySelector(".profile.carl");
  if (existingCarl) return existingCarl;

  const carl = document.createElement("button");
  carl.className = "profile carl carl-zone-anchor carl-wrong-place loader-cover";
  carl.type = "button";
  carl.setAttribute("aria-label", "Carl Gates");

  carl.style.left = `calc(${CARL_ZONE.x}% - ${AVATAR_HALF}px)`;
  carl.style.top = `calc(${CARL_ZONE.y}% - ${AVATAR_HALF}px)`;
  carl.style.setProperty("--sx", "-6px");
  carl.style.setProperty("--sy", "-210px");
  carl.style.setProperty("--rot", "-4deg");
  carl.classList.add("loader-slam", "loader-final-slam");
  carl.innerHTML = `<img src="AssetCARL.PNG" alt="">`;

  profileField.appendChild(carl);

  /*
    Carl becomes accessible after the heart contact triggers his RROD.
    The three red flashes remain the visual discovery cue, but the user
    no longer has to land a millisecond-perfect tap during a flash.
  */
  carl.addEventListener("click", () => {
    if (carlOpened) return;
    if (!carl.classList.contains("carl-access-open")) return;

    openCarlProfile();
  });

  // Carl stays as the final left-side loader avatar. He is left alone until the Carl-heart brick is unlocked.

  return carl;
}

function c17HeartFlightFrames(width, height) {
  const points = CARL_HEART_PATH.map(p => ({
    x: parseFloat(p.left) * width / 100,
    y: parseFloat(p.top) * height / 100,
    t: p.offset, opacity: p.opacity
  }));
  const sample = (time, key) => {
    let index = points.findIndex(p => p.t >= time);
    if (index <= 0) return points[0][key];
    const a = points[index - 1], b = points[index];
    const previous = points[Math.max(0,index - 2)];
    const next = points[Math.min(points.length - 1,index + 1)];
    const duration = b.t - a.t, u = (time - a.t) / duration;
    const m0 = (b[key] - previous[key]) / (b.t - previous.t);
    const m1 = (next[key] - a[key]) / (next.t - a.t);
    return (2*u*u*u-3*u*u+1)*a[key] + (u*u*u-2*u*u+u)*duration*m0
      + (-2*u*u*u+3*u*u)*b[key] + (u*u*u-u*u)*duration*m1;
  };
  return Array.from({length:181}, (_, index) => {
    const time = index / 180;
    return {offset:time, transform:`translate3d(${sample(time,"x")}px,${sample(time,"y")}px,0) translate(-50%,-50%)`,
      opacity:Math.min(1,time/.028)};
  });
}

function releaseDeadHeartTowardCarl() {
  let carl = null;
  let contactHandled = false;
  let collisionFrame = 0;

  const heart = document.createElement("div");
  heart.className = "engage carl-trigger-heart asset-heart pink-stage matrix-error-heart";
  heart.style.left = "12%";
  heart.style.top = "103%";
  heart.style.opacity = "0";
  heart.style.setProperty("animation", "none", "important");
  heart.style.setProperty("width", "34px", "important");
  heart.style.setProperty("height", "34px", "important");
  heart.innerHTML = `
    <span class="carl-heart-layer carl-heart-red" aria-hidden="true">💔</span>
    <img class="carl-heart-layer carl-heart-grey" src="${HEART_GREY}" alt="">
  `;

  engagementField.appendChild(heart);

  const flightDuration = 9000;
  const flightRect = engagementField.getBoundingClientRect();
  heart.style.left = "0px";
  heart.style.top = "0px";
  heart.style.willChange = "transform, opacity";
  const flight = heart.animate(c17HeartFlightFrames(flightRect.width, flightRect.height), {
    duration: flightDuration,
    easing: "linear",
    fill: "forwards"
  });

  setTimeout(() => {
    if (!heart.parentNode) return;
    carl = profileField.querySelector(".profile.carl") || spawnCarl();
    carlSeen = true;
  }, 11200);

  let returnClimbStarted = false;
  let greyFadeComplete = false;

  const redLayer = heart.querySelector(".carl-heart-red");
  const greyLayer = heart.querySelector(".carl-heart-grey");
  if (redLayer) {
    redLayer.style.setProperty("opacity", "1", "important");
    redLayer.style.setProperty("visibility", "visible", "important");
    redLayer.style.setProperty("transition", "none", "important");
  }

  if (greyLayer) {
    greyLayer.style.setProperty("display", "block", "important");
    greyLayer.style.setProperty("visibility", "visible", "important");
    greyLayer.style.setProperty("opacity", "0", "important");
    greyLayer.style.setProperty("transform", "scale(2.28)", "important");
    greyLayer.style.setProperty("transition", "none", "important");
  }

    const syncGreyHeartToPosition = () => {
    if (!heart.isConnected || contactHandled) return;

    const rect = heart.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight ||
      document.documentElement.clientHeight;

    const viewportWidth =
      window.innerWidth ||
      document.documentElement.clientWidth;

    const heartCenterY = rect.top + rect.height / 2;
    const heartCenterX = rect.left + rect.width / 2;

    const yRatio = heartCenterY / viewportHeight;
    const xRatio = heartCenterX / viewportWidth;

    /*
      The fade is allowed to begin only after Little Miss Grey
      has completed the invisible reset and re-entered on the left.
    */
    if (
      !returnClimbStarted &&
      xRatio <= 0.35 &&
      yRatio <= 0.96 &&
      yRatio >= 0.86
    ) {
      returnClimbStarted = true;
    }

    if (returnClimbStarted && !greyFadeComplete) {
      const FADE_START_Y = 0.89;
      const FADE_FULL_Y = 0.61;

      const rawProgress = Math.max(
        0,
        Math.min(
          1,
          (FADE_START_Y - yRatio) /
            (FADE_START_Y - FADE_FULL_Y)
        )
      );

      /*
        Smootherstep removes the visible halfway hitch while
        preserving the two approved fade lines.
      */
      const easedFade =
        rawProgress *
        rawProgress *
        rawProgress *
        (
          rawProgress *
          (rawProgress * 6 - 15) +
          10
        );

      if (redLayer) {
        redLayer.style.setProperty(
          "opacity",
          String(1 - easedFade),
          "important"
        );

        redLayer.style.setProperty(
          "visibility",
          easedFade >= 0.995 ? "hidden" : "visible",
          "important"
        );
      }

      if (greyLayer) {
        greyLayer.style.setProperty(
          "opacity",
          String(easedFade),
          "important"
        );

        greyLayer.style.setProperty(
          "visibility",
          "visible",
          "important"
        );

        /*
          Keep the gray asset from visibly jumping in size
          while it takes over from the emoji.
        */
        greyLayer.style.setProperty(
          "transform",
          `scale(${2.28 - easedFade * 0.18})`,
          "important"
        );
      }

      if (rawProgress >= 1) {
        greyFadeComplete = true;

        heart.classList.remove(
          "pink-stage",
          "grey-taking-over",
          "grey-return-visible"
        );

        heart.classList.add("dead-stage");

        if (redLayer) {
          redLayer.style.setProperty(
            "opacity",
            "0",
            "important"
          );

          redLayer.style.setProperty(
            "visibility",
            "hidden",
            "important"
          );
        }

        if (greyLayer) {
          greyLayer.style.setProperty(
            "opacity",
            "1",
            "important"
          );

          greyLayer.style.setProperty(
            "visibility",
            "visible",
            "important"
          );

          greyLayer.style.setProperty(
            "transform",
            "scale(2.10)",
            "important"
          );
        }
      }
    }

    requestAnimationFrame(syncGreyHeartToPosition);
  };

  requestAnimationFrame(syncGreyHeartToPosition);

  const popOnPixelContact = () => {
    if (contactHandled || !heart.isConnected) return;

    carl =
      carl ||
      profileField.querySelector(".profile.carl");

    if (carl && carl.isConnected) {
      const heartRect = heart.getBoundingClientRect();
      const carlRect = carl.getBoundingClientRect();

      /*
        Ignore the transparent padding around the gray PNG.
        These inner rectangles represent the visible heart and
        visible Carl profile instead of their oversized boxes.
      */
      const heartInsetX = heartRect.width * 0.34;
      const heartInsetY = heartRect.height * 0.28;

      const visibleHeart = {
        left: heartRect.left + heartInsetX,
        right: heartRect.right - heartInsetX,
        top: heartRect.top + heartInsetY,
        bottom: heartRect.bottom - heartInsetY
      };

      const carlInset = 2;

      const visibleCarl = {
        left: carlRect.left + carlInset,
        right: carlRect.right - carlInset,
        top: carlRect.top + carlInset,
        bottom: carlRect.bottom - carlInset
      };

      const touching =
        visibleHeart.right >= visibleCarl.left &&
        visibleHeart.left <= visibleCarl.right &&
        visibleHeart.bottom >= visibleCarl.top &&
        visibleHeart.top <= visibleCarl.bottom;

      if (touching) {
        contactHandled = true;
        cancelAnimationFrame(collisionFrame);

        /*
          Freeze on the exact first-contact frame.
          No landing, hovering or sliding across Carl.
        */
        flight.pause();

        try {
          flight.commitStyles();
        } catch (error) {
          // Safari may not expose commitStyles; pause still freezes it.
        }

        heart.classList.remove(
          "pink-stage",
          "grey-taking-over",
          "grey-return-visible"
        );

        heart.classList.add(
          "dead-stage",
          "carl-heart-pop"
        );

        if (redLayer) {
          redLayer.style.setProperty(
            "opacity",
            "0",
            "important"
          );

          redLayer.style.setProperty(
            "visibility",
            "hidden",
            "important"
          );
        }

        if (greyLayer) {
          greyLayer.style.setProperty(
            "opacity",
            "1",
            "important"
          );

          greyLayer.style.setProperty(
            "visibility",
            "visible",
            "important"
          );
        }

        const contactX = Math.max(
          visibleHeart.left,
          Math.min(
            visibleHeart.right,
            visibleCarl.left
          )
        );

        const contactY = Math.max(
          visibleHeart.top,
          Math.min(
            visibleHeart.bottom,
            visibleCarl.top +
              (visibleCarl.bottom - visibleCarl.top) / 2
          )
        );

                /*
          Love at first pixel:
          contact creates the visible pop first.
          Carl's triple RROD begins only after the pop registers.
        */
        spawnCarlZap(contactX, contactY);

        triggerCarl(carl);

        setTimeout(() => {
          if (heart.isConnected) {
            heart.remove();
          }
        }, 150);

        return;
      }
    }

    collisionFrame =
      requestAnimationFrame(popOnPixelContact);
  };

  collisionFrame =
    requestAnimationFrame(popOnPixelContact);

  flight.onfinish = () => {
    cancelAnimationFrame(collisionFrame);

    if (!contactHandled) {
      carl =
        carl ||
        profileField.querySelector(".profile.carl") ||
        spawnCarl();

      contactHandled = true;

      heart.classList.add("heart-pop");
      heart.classList.remove("grey-taking-over");
      heart.classList.add(
        "dead-stage",
        "carl-heart-pop"
      );

            if (carl && carl.isConnected) {
        const c = carl.getBoundingClientRect();

        spawnCarlZap(
          c.left,
          c.top + c.height / 2
        );

        triggerCarl(carl);
      }

      setTimeout(() => {
        if (heart.isConnected) heart.remove();
      }, 300);
    }
  };

  setTimeout(() => {
    cancelAnimationFrame(collisionFrame);

    if (heart.isConnected) heart.remove();
  }, flightDuration + 1200);
}

function spawnCarlZap(viewportX, viewportY) {
  const zap = document.createElement("div");
  zap.className = "carl-zap-spark carl-contact-pop";
  zap.innerHTML = `<span class="carl-zap-core"></span><span class="carl-zap-arc"></span>`;

  const fieldRect = impactField.getBoundingClientRect();
  const x = Number.isFinite(viewportX) ? viewportX - fieldRect.left : fieldRect.width * ((CARL_ZONE.x - 6.2) / 100);
  const y = Number.isFinite(viewportY) ? viewportY - fieldRect.top : fieldRect.height * (CARL_ZONE.y / 100);

  zap.style.left = `${x}px`;
  zap.style.top = `${y}px`;
  impactField.appendChild(zap);
  setTimeout(() => zap.remove(), 520);
}

function triggerCarl(carl) {
  if (!carl || !carl.parentNode || carlTriggered) return;

  carlTriggered = true;

  /*
    Heart contact permanently unlocks Carl for this run.
    The RROD still flashes exactly three times as the visual clue.
  */
  carl.classList.add(
    "carl-impact-visible",
    "carl-access-open"
  );
  carl.classList.remove("carl-ready");

  const oldRing = carl.querySelector(".carl-rrod-ring");
  if (oldRing) oldRing.remove();

  const ring = document.createElement("span");
  ring.className = "carl-rrod-ring";
  ring.setAttribute("aria-hidden", "true");
  carl.appendChild(ring);

  const flashWindows = [
    { start: 30, end: 120 },
    { start: 200, end: 290 },
    { start: 370, end: 470 }
  ];

  const scheduledTimers = [];

  flashWindows.forEach(({ start, end }) => {
    scheduledTimers.push(
      setTimeout(() => {
        if (
          carlOpened ||
          !carl ||
          !carl.isConnected ||
          !ring.isConnected
        ) {
          return;
        }

        ring.style.opacity = "1";
        ring.style.transform = "scale(1)";
        carl.classList.add("carl-ready");
      }, start)
    );

    scheduledTimers.push(
      setTimeout(() => {
        if (!carl || !carl.isConnected) return;

        ring.style.opacity = "0";
        ring.style.transform = "scale(.985)";
        carl.classList.remove("carl-ready");
      }, end)
    );
  });

  carl.animate(
    [
      { filter: "none", offset: 0 },
      {
        filter: "brightness(1.35) saturate(1.4)",
        offset: .08
      },
      { filter: "none", offset: .24 },
      {
        filter: "brightness(1.35) saturate(1.4)",
        offset: .39
      },
      { filter: "none", offset: .55 },
      {
        filter: "brightness(1.35) saturate(1.4)",
        offset: .71
      },
      { filter: "none", offset: 1 }
    ],
    {
      duration: 520,
      easing: "steps(1, end)",
      fill: "forwards"
    }
  );

  scheduledTimers.push(
    setTimeout(() => {
      if (!carl || !carl.isConnected) return;

      carl.classList.remove(
        "carl-ready",
        "carl-impact-visible",
        "carl-dead-profile"
      );

      if (ring.isConnected) ring.remove();
    }, 520)
  );
}

function openCarlProfile() {
  closeFounderWindow();
  carlOpened = true;
  carlProfile.classList.add("open");
  carlProfile.setAttribute("aria-hidden", "false");
  startWoundPulse();
}

function closeCarlProfile() {
  carlProfile.classList.remove("open");
  carlProfile.setAttribute("aria-hidden", "true");
  closeCarlPhotos();
  closeHiveFile();
  stopWoundPulse();

  // Closing Carl cannot bypass Little Homie's finale.
  if (signalNode.dataset.finaleComplete === "true") signalNode.classList.add("ready");
  signalNode.classList.remove("fade-out");
  signalNode.style.pointerEvents = "auto";
}

function startWoundPulse() {
  if (!carlProfilePortal || hiveWoundUsed) return;
  stopWoundPulse();

  const pulse = () => {
    if (!carlProfile.classList.contains("open") || hiveWoundUsed) return;
    if (carlCard) carlCard.classList.add("dating-page-glitch");
    if (hiveWound) hiveWound.classList.add("pulse-open");
    carlProfilePortal.classList.add("portal-open");
    setTimeout(() => {
      if (carlCard) carlCard.classList.remove("dating-page-glitch");
      if (hiveWound) hiveWound.classList.remove("pulse-open");
      if (carlProfilePortal) carlProfilePortal.classList.remove("portal-open");
    }, 920);
  };

  woundPulseTimer = setInterval(pulse, 17000);
}

function stopWoundPulse() {
  clearInterval(woundPulseTimer);
  woundPulseTimer = null;
  if (hiveWound) hiveWound.classList.remove("pulse-open");
  if (carlProfilePortal) carlProfilePortal.classList.remove("portal-open");
  if (carlCard) carlCard.classList.remove("dating-page-glitch");
}

function openCarlPhotos() {
  if (!carlPhotoModal) return;
  carlPhotoModal.classList.add("open");
  carlPhotoModal.setAttribute("aria-hidden", "false");
}

function closeCarlPhotos() {
  if (!carlPhotoModal) return;
  carlPhotoModal.classList.remove("open");
  carlPhotoModal.setAttribute("aria-hidden", "true");
}

function openHiveMindCarlFile() {
  closeFounderWindow();
  if (!carlProfilePortal || !carlProfilePortal.classList.contains("portal-open") || hiveWoundUsed) return;
  hiveCarlFile.classList.add("open");
  hiveCarlFile.setAttribute("aria-hidden", "false");
  hiveWoundUsed = true;
  if (hiveWound) hiveWound.classList.add("used");
  stopWoundPulse();
}


function closeHiveFile() {
  if (!hiveCarlFile) return;
  hiveCarlFile.classList.remove("open");
  hiveCarlFile.setAttribute("aria-hidden", "true");
}

carlClose.addEventListener("click", closeCarlProfile);
if (carlPhotosButton) carlPhotosButton.addEventListener("click", openCarlPhotos);
if (carlPhotoClose) carlPhotoClose.addEventListener("click", closeCarlPhotos);
if (hiveWound) hiveWound.addEventListener("click", openHiveMindCarlFile);
if (carlProfilePortal) carlProfilePortal.addEventListener("click", openHiveMindCarlFile);
if (hiveClose) hiveClose.addEventListener("click", closeCarlProfile);
function c17OpenDrawingWall() {
  let wall = document.getElementById('c17DrawingWall');
  if (!wall) {
    const W = 15360, H = 10240, NS = 'http://www.w3.org/2000/svg';
    wall = document.createElement('section');
    wall.id = 'c17DrawingWall'; wall.hidden = true;
    wall.setAttribute('role', 'dialog'); wall.setAttribute('aria-modal', 'true');
    wall.setAttribute('aria-label', 'The marker wall');
    const marker = (color) => `<span class="c17-marker-art"><img src="Wall.Main.Maker.PNG" alt="" draggable="false">${color === 'black' ? '' : `<span class="c17-marker-cap c17-marker-cap-${color}"><img src="Wall.Main.Maker.PNG" alt="" draggable="false"></span>`}</span>`;
    wall.innerHTML = `<div class="c17-drawing-viewport" tabindex="0" aria-label="Marker wall. Drag to explore; pinch or use plus and minus to zoom."><div class="c17-drawing-world"><svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs><filter id="c17InkExtraction" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.333 -1.333 -1.333 0 1.9"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs></svg><div class="c17-wall-panel" style="left:880px;top:750px;width:1120px;height:2100px"></div><div class="c17-wall-panel" style="left:2180px;top:760px;width:3400px;height:2800px"></div><div class="c17-wall-panel" style="left:5730px;top:780px;width:2550px;height:980px"></div><div class="c17-wall-panel" style="left:5720px;top:1870px;width:2570px;height:1770px"></div><div class="c17-wall-panel" style="left:8430px;top:760px;width:3470px;height:1850px"></div><div class="c17-wall-panel" style="left:12340px;top:750px;width:3000px;height:1850px"></div><div class="c17-wall-panel" style="left:1400px;top:3830px;width:3260px;height:1500px"></div><div class="c17-wall-panel" style="left:870px;top:5400px;width:2320px;height:1640px"></div><div class="c17-wall-panel" style="left:3370px;top:5480px;width:1390px;height:1280px"></div><div class="c17-wall-panel" style="left:4900px;top:3800px;width:5240px;height:2900px"></div><div class="c17-wall-panel" style="left:8440px;top:2910px;width:1750px;height:870px"></div><div class="c17-wall-panel" style="left:10300px;top:2910px;width:3250px;height:2200px"></div><div class="c17-wall-panel" style="left:13700px;top:2900px;width:1640px;height:1200px"></div><div class="c17-wall-panel" style="left:13650px;top:4200px;width:1700px;height:900px"></div><div class="c17-wall-panel" style="left:10310px;top:5310px;width:1700px;height:1470px"></div><div class="c17-wall-panel" style="left:12130px;top:5560px;width:3210px;height:2820px"></div><div class="c17-wall-panel" style="left:900px;top:7260px;width:740px;height:2800px"></div><div class="c17-wall-panel" style="left:1780px;top:7260px;width:1460px;height:2800px"></div><div class="c17-wall-panel" style="left:3370px;top:6920px;width:4510px;height:1600px"></div><div class="c17-wall-panel" style="left:8050px;top:6930px;width:820px;height:1570px"></div><div class="c17-wall-panel" style="left:8990px;top:6930px;width:3160px;height:3160px"></div><div class="c17-wall-panel" style="left:3450px;top:8710px;width:2160px;height:1390px"></div><div class="c17-wall-panel" style="left:5850px;top:8590px;width:2920px;height:1490px"></div><div class="c17-wall-panel" style="left:12340px;top:8570px;width:2100px;height:1500px"></div><div class="c17-wall-panel" style="left:14570px;top:8840px;width:780px;height:1230px"></div><div class="c17-wall-vent" style="left:980px"><div class="c17-vent-mouth"><i></i><i></i><i></i></div><div class="c17-vent-mouth"><i></i><i></i><i></i></div></div><div class="c17-wall-vent" style="left:3710px"><div class="c17-vent-mouth"><i></i><i></i><i></i></div><div class="c17-vent-mouth"><i></i><i></i><i></i></div></div><div class="c17-wall-vent" style="left:6510px"><div class="c17-vent-mouth"><i></i><i></i><i></i></div><div class="c17-vent-mouth"><i></i><i></i><i></i></div></div><div class="c17-wall-vent" style="left:10280px"><div class="c17-vent-mouth"><i></i><i></i><i></i></div><div class="c17-vent-mouth"><i></i><i></i><i></i></div></div><div class="c17-wall-vent" style="left:12840px"><div class="c17-vent-mouth"><i></i><i></i><i></i></div><div class="c17-vent-mouth"><i></i><i></i><i></i></div></div><div class="c17-wall-pipe"></div><img class="c17-drawing-art c17-drawing-center" src="Wall.Main.Chicken.PNG" alt="Don't choke your chicken" draggable="false"><img class="c17-drawing-art c17-drawing-coke" src="Wall.Main.Coke.PNG" alt="Boss bottle looming over a nervous paper worker" draggable="false"><img class="c17-drawing-art c17-drawing-dcsp" src="Wall.Main.DCSP.PNG" alt="Miserable square peg beside a round hole" draggable="false"><img class="c17-drawing-art c17-drawing-snowball" src="Wall.Main.Snowball.PNG" alt="Scared melting snowball with helmet, paper shield and extinguisher" draggable="false"><img class="c17-drawing-art c17-drawing-human" src="Wall.Main.Human.png" alt="HUMAN in Vesh" draggable="false"><img class="c17-drawing-art c17-drawing-tp" src="Wall.Main.TP.PNG" alt="Three miserable toilet rolls" draggable="false"><img class="c17-drawing-art c17-drawing-poop" src="Wall.Main.Shit.PNG" alt="Blue marker pile with three flies" draggable="false"><p class="c17-wall-note">stop throwing butts in the urinal…<br>They harder to re-light</p><svg class="c17-visitor-ink" viewBox="0 0 ${W} ${H}" aria-hidden="true"></svg></div></div><div class="c17-wall-controls"><button type="button" data-wall-action="home" aria-label="Return to the chicken">⌂</button><button type="button" data-wall-action="out" aria-label="Zoom out">−</button><button type="button" data-wall-action="in" aria-label="Zoom in">+</button></div><button class="c17-wall-close" type="button" data-wall-action="close" aria-label="Return to the webpage">×</button><div class="c17-ink-actions" hidden><button type="button" data-wall-action="undo">Undo</button><button type="button" data-wall-action="cancel">Cancel</button><button type="button" data-wall-action="save">Save mark</button></div><div class="c17-marker-tools"><div class="c17-marker-palette" hidden role="group" aria-label="Choose marker ink"><button class="c17-ink-choice c17-ink-red" type="button" data-wall-color="red" aria-label="Red marker" aria-pressed="false">${marker('red')}</button><button class="c17-ink-choice c17-ink-blue" type="button" data-wall-color="blue" aria-label="Blue marker" aria-pressed="false">${marker('blue')}</button></div><button class="c17-marker-toggle" type="button" data-wall-action="marker" aria-label="Open markers and draw here" aria-expanded="false" aria-pressed="false">${marker('black')}</button></div><p class="c17-wall-status" role="status" aria-live="polite"></p>`;
    document.body.appendChild(wall);
    const view = wall.querySelector('.c17-drawing-viewport'), world = wall.querySelector('.c17-drawing-world');
    const ink = wall.querySelector('.c17-visitor-ink'), palette = wall.querySelector('.c17-marker-palette');
    const toggle = wall.querySelector('.c17-marker-toggle'), actions = wall.querySelector('.c17-ink-actions');
    const status = wall.querySelector('.c17-wall-status');
    const colors = {black:'#171719', red:'#cd2228', blue:'#174aaf'};
    let x=0, y=0, scale=1, restoreFocus=null, drawMode=false, color='black';
    let gesture=null, active=null, session=[], saved=[], frame=0, noticeTimer=0, saving=false;
    let dbPromise=null, loaded=false, suppressTouch=false;
    const pointers = new Map();
    const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
    const minScale = () => Math.max(view.clientWidth/(W*.46), view.clientHeight/(H*.46));
    const maxScale = () => Math.max(minScale(), 2.4);
    function paint() {
      x=W*scale<view.clientWidth ? (view.clientWidth-W*scale)/2 : clamp(x,view.clientWidth-W*scale,0);
      y=H*scale<view.clientHeight ? (view.clientHeight-H*scale)/2 : clamp(y,view.clientHeight-H*scale,0);
      world.style.transform=`translate(${x}px,${y}px) scale(${scale})`;
    }
    function requestPaint() {if(!frame)frame=requestAnimationFrame(()=>{frame=0;paint();});}
    function zoom(next,cx=view.clientWidth/2,cy=view.clientHeight/2) {
      next=clamp(next,minScale(),maxScale());const ratio=next/scale;
      x=cx-(cx-x)*ratio;y=cy-(cy-y)*ratio;scale=next;paint();
    }
    function reset() {
      scale=Math.max(minScale(),Math.min(view.clientWidth/420,view.clientHeight/720,1.65));
      x=view.clientWidth/2-7680*scale;y=view.clientHeight/2-5120*scale;paint();
    }
    function notice(message) {clearTimeout(noticeTimer);status.textContent=message;noticeTimer=setTimeout(()=>{status.textContent='';},3500);}
    function point(e) {const r=view.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};}
    function worldPoint(e) {const p=point(e);return [Math.round((p.x-x)/scale*10)/10,Math.round((p.y-y)/scale*10)/10,clamp(e.pressure||.5,.15,1)];}
    function pathFor(stroke) {
      const path=document.createElementNS(NS,'path');
      path.setAttribute('fill',colors[stroke.color]);path.setAttribute('opacity','.92');
      updatePath(path,stroke.points,stroke.width);return path;
    }
    function updatePath(path,points,width) {
      if(!points.length)return;
      width=width||active?.stroke.width||3;
      if(points.length===1){const [a,b,p]=points[0],r=width*(.3+.7*(p||.5))/2;path.setAttribute('d',`M${a-r} ${b}a${r} ${r} 0 1 0 ${r*2} 0a${r} ${r} 0 1 0 ${-r*2} 0`);return;}
      const left=[],right=[];
      points.forEach((p,i)=>{
        const prev=points[Math.max(0,i-1)],next=points[Math.min(points.length-1,i+1)];
        const dx=next[0]-prev[0],dy=next[1]-prev[1],len=Math.hypot(dx,dy)||1;
        const r=width*(.3+.7*(p[2]||.5))/2;
        left.push([p[0]-dy/len*r,p[1]+dx/len*r]);right.push([p[0]+dy/len*r,p[1]-dx/len*r]);
      });
      path.setAttribute('d','M'+left.concat(right.reverse()).map(p=>p.join(' ')).join('L')+'Z');
    }
    function validStroke(s) {
      return s && Object.hasOwn(colors,s.color) && Number.isFinite(s.width) && s.width>0 && s.width<150 && Array.isArray(s.points) && s.points.length<=8000 && s.points.length>0 && s.points.every(p=>Array.isArray(p)&&p.length>=2&&Number.isFinite(p[0])&&Number.isFinite(p[1])&&p[0]>=0&&p[0]<=W&&p[1]>=0&&p[1]<=H);
    }
    function openDB() {
      if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{
        const req=indexedDB.open('c17-marker-wall-approved-v1',1);
        req.onupgradeneeded=()=>req.result.createObjectStore('marks',{keyPath:'id',autoIncrement:true});
        req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
      });return dbPromise;
    }
    async function loadMarks() {
      if(loaded)return;loaded=true;
      try {
        const db=await openDB();
        const rows=await new Promise((resolve,reject)=>{const req=db.transaction('marks').objectStore('marks').getAll();req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});
        for(const row of rows)for(const s of row.strokes||[])if(validStroke(s)){const node=pathFor(s);ink.appendChild(node);saved.push(s);}
      } catch (_) {notice('Drawing is available. Saving on this device is unavailable.');}
    }
    function removeActive() {if(active){active.node.remove();active=null;}}
    function finishStroke() {
      if(!active)return;
      const {stroke,node}=active;active=null;
      if(validStroke(stroke))session.push({stroke,node});else node.remove();
    }
    function cancelSession() {removeActive();session.forEach(s=>s.node.remove());session=[];}
    function chooseColor(next) {
      color=next;toggle.setAttribute('aria-pressed',String(next==='black'));
      wall.querySelectorAll('[data-wall-color]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.wallColor===next)));
      wall.dataset.ink=next;
    }
    function setDrawing(on) {
      drawMode=on;wall.classList.toggle('c17-is-drawing',on);palette.hidden=!on;actions.hidden=!on;
      toggle.setAttribute('aria-expanded',String(on));toggle.setAttribute('aria-label',on?'Black marker':'Open markers and draw here');
      pointers.clear();gesture=null;suppressTouch=false;
      if(on){chooseColor(color);notice('Spot locked. One finger draws; two fingers zoom.');}
      else {toggle.setAttribute('aria-pressed','false');}
    }
    async function saveSession() {
      finishStroke();if(saving)return;
      if(!session.length){setDrawing(false);return;}
      saving=true;actions.querySelector('[data-wall-action="save"]').disabled=true;
      try {
        const db=await openDB(),strokes=session.map(s=>s.stroke);
        await new Promise((resolve,reject)=>{const tx=db.transaction('marks','readwrite');tx.objectStore('marks').add({strokes,created:Date.now()});tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});
        saved.push(...strokes);session=[];setDrawing(false);notice('Company time. Well spent. Saved on this device.');
      } catch (_) {notice('Could not save. Your mark is still here—try again.');}
      finally {saving=false;actions.querySelector('[data-wall-action="save"]').disabled=false;}
    }
    function close() {
      if(saving)return;
      if(drawMode && (session.length||active)) {notice('Save your mark or cancel it before leaving.');return;}
      setDrawing(false);wall.hidden=true;pointers.clear();gesture=null;
      document.documentElement.classList.remove('c17-drawing-open');if(restoreFocus)restoreFocus.focus();
    }
    function beginGesture() {
      const p=[...pointers.values()];
      if(p.length===1)gesture={x,y,px:p[0].x,py:p[0].y};
      else if(p.length>=2){const cx=(p[0].x+p[1].x)/2,cy=(p[0].y+p[1].y)/2;gesture={scale,d:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y),wx:(cx-x)/scale,wy:(cy-y)/scale,cx,cy};}
      else gesture=null;
    }
    view.addEventListener('pointerdown',e=>{
      if(saving||e.pointerType==='mouse'&&e.button!==0||e.pointerType==='touch'&&active?.pointerType==='pen')return;e.preventDefault();view.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId,point(e));beginGesture();
      if(pointers.size>=2){removeActive();suppressTouch=true;return;}
      if(drawMode&&!suppressTouch) {
        const p=worldPoint(e);if(p[0]<0||p[0]>W||p[1]<0||p[1]>H)return;
        const stroke={color,width:clamp((e.pointerType==='pen'?2+4*p[2]:4)/scale,.35,120),points:[p]};
        const node=pathFor(stroke);ink.appendChild(node);active={stroke,node,id:e.pointerId,pointerType:e.pointerType};
      }
    });
    view.addEventListener('pointermove',e=>{
      if(!pointers.has(e.pointerId)||!gesture||saving)return;
      pointers.set(e.pointerId,point(e));const p=[...pointers.values()];
      if(p.length>=2) {
        const cx=drawMode?gesture.cx:(p[0].x+p[1].x)/2,cy=drawMode?gesture.cy:(p[0].y+p[1].y)/2;
        scale=clamp(gesture.scale*Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)/Math.max(1,gesture.d),minScale(),maxScale());
        x=cx-gesture.wx*scale;y=cy-gesture.wy*scale;requestPaint();
      } else if(drawMode) {
        if(!active||active.id!==e.pointerId||suppressTouch)return;
        const events=e.getCoalescedEvents?e.getCoalescedEvents():[e];
        for(const event of events.length?events:[e]){
          const q=worldPoint(event),pts=active.stroke.points,last=pts.at(-1);
          if(q[0]>=0&&q[0]<=W&&q[1]>=0&&q[1]<=H&&Math.hypot(q[0]-last[0],q[1]-last[1])*scale>.65&&pts.length<8000)pts.push(q);
        }
        updatePath(active.node,active.stroke.points);
      } else {x=gesture.x+p[0].x-gesture.px;y=gesture.y+p[0].y-gesture.py;requestPaint();}
    });
    function pointerEnd(e) {
      if(!pointers.has(e.pointerId))return;
      if(active&&active.id===e.pointerId){if(e.type==='pointercancel')removeActive();else finishStroke();}
      pointers.delete(e.pointerId);if(!pointers.size)suppressTouch=false;beginGesture();
    }
    for(const name of ['pointerup','pointercancel','lostpointercapture'])view.addEventListener(name,pointerEnd);
    view.addEventListener('wheel',e=>{e.preventDefault();if(active||saving)return;const p=point(e);if(e.ctrlKey||e.metaKey){zoom(scale*Math.exp(-e.deltaY*.006),drawMode?view.clientWidth/2:p.x,drawMode?view.clientHeight/2:p.y);}else if(!drawMode){x-=e.deltaX;y-=e.deltaY;paint();}},{passive:false});
    wall.addEventListener('click',e=>{
      const colorButton=e.target.closest('[data-wall-color]');if(colorButton){finishStroke();chooseColor(colorButton.dataset.wallColor);return;}
      const b=e.target.closest('[data-wall-action]');if(!b||saving)return;const a=b.dataset.wallAction;
      if(a==='close')close();
      else if(a==='marker'){finishStroke();if(!drawMode)setDrawing(true);else chooseColor('black');}
      else if(a==='save')saveSession();
      else if(a==='cancel'){cancelSession();setDrawing(false);}
      else if(a==='undo'){finishStroke();session.pop()?.node.remove();}
      else if(a==='home'){if(!drawMode)reset();}
      else if(a==='in'||a==='out'){finishStroke();zoom(scale*(a==='in'?1.3:1/1.3));}
    });
    wall.addEventListener('keydown',e=>{
      if(e.key==='Escape'){e.preventDefault();if(drawMode){cancelSession();setDrawing(false);}else close();}
      else if(e.key==='+'||e.key==='='){e.preventDefault();finishStroke();zoom(scale*1.2);}
      else if(e.key==='-'){e.preventDefault();finishStroke();zoom(scale/1.2);}
      else if(e.key.startsWith('Arrow')&&!drawMode){e.preventDefault();x+=e.key==='ArrowLeft'?70:e.key==='ArrowRight'?-70:0;y+=e.key==='ArrowUp'?70:e.key==='ArrowDown'?-70:0;paint();}
      else if(e.key==='Tab'){
        const items=[...wall.querySelectorAll('button,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length);
        const first=items[0],last=items.at(-1);
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
      }
    });
    let size={w:0,h:0};
    window.addEventListener('resize',()=>{if(wall.hidden)return;finishStroke();x+=(view.clientWidth-size.w)/2;y+=(view.clientHeight-size.h)/2;size={w:view.clientWidth,h:view.clientHeight};scale=Math.max(scale,minScale());paint();},{passive:true});
    wall.c17Show=()=>{
      restoreFocus=document.activeElement;wall.hidden=false;document.documentElement.classList.add('c17-drawing-open');
      requestAnimationFrame(()=>{if(wall.hidden)return;size={w:view.clientWidth,h:view.clientHeight};reset();view.focus();loadMarks();});
    };
  }
  wall.c17Show();
}
if (survivorChalk) survivorChalk.addEventListener('click', event => {event.preventDefault();c17OpenDrawingWall();});

if (takeCampTest && campTestModal) {
  takeCampTest.addEventListener("click", () => {
    campTestModal.classList.add("open");
    campTestModal.setAttribute("aria-hidden", "false");
    if (campResult) campResult.textContent = "Awaiting human selection.";
  });
}
if (campTestClose && campTestModal) {
  campTestClose.addEventListener("click", () => {
    campTestModal.classList.remove("open");
    campTestModal.setAttribute("aria-hidden", "true");
  });
}
document.querySelectorAll(".camp-answer").forEach(button => {
  button.addEventListener("click", () => {
    if (campResult) campResult.textContent = "Result: HIGHLY COMPATIBLE. Human campfire preference confirmed.";
  });
});
if (expandTestimonials) {
  expandTestimonials.addEventListener("click", () => {
    const block = expandTestimonials.closest(".testimonials");
    if (!block) return;
    block.classList.toggle("expanded");
    expandTestimonials.textContent = block.classList.contains("expanded") ? "COLLAPSE TESTIMONIALS" : "EXPAND TESTIMONIALS";
  });
}


document.querySelectorAll(".photo-thumb").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".photo-thumb").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    if (carlPhotoLarge) carlPhotoLarge.src = button.dataset.src;
    if (carlPhotoCaption) carlPhotoCaption.textContent = button.dataset.caption;
  });
});

function spawnWren() {
  // Wren is a quick private contact with the symbol: lands, vanishes, leaves a tiny green pulse.
  const wren = document.createElement("div");
  wren.className = "profile wren wren-quick-home";

  wren.style.left = `calc(51% - ${AVATAR_HALF}px)`;
  wren.style.top = `calc(22% - ${AVATAR_HALF}px)`;
  wren.style.setProperty("--sx", "42px");
  wren.style.setProperty("--sy", "-82px");
  wren.innerHTML = `<img src="AssetWREN.PNG" alt="">`;

  profileField.appendChild(wren);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    wren.classList.add("wren-fade-home");
  }, 420);

  setTimeout(() => {
    const pulse = document.createElement("div");
    pulse.className = "wren-exit-pulse";
    pulse.style.left = "51%";
    pulse.style.top = "22%";
    impactField.appendChild(pulse);
    setTimeout(() => pulse.remove(), 1800);
    setTimeout(armJinxShadowFrequency, 260);
  }, 980);

  setTimeout(() => {
    if (wren && wren.parentNode) wren.remove();
  }, 1450);
}

function spawnFrank() {
  if (frankDutyStarted) return;
  frankDutyStarted = true;
  turtle.classList.add("covered-by-frank");

  // Frank lands ON Little Homie's current rendered center.
  const fieldRect = profileField.getBoundingClientRect();
  const homieRect = turtle.getBoundingClientRect();
  const homieCenterX = homieRect.left + homieRect.width / 2 - fieldRect.left;
  const homieCenterY = homieRect.top + homieRect.height / 2 - fieldRect.top;

  const frankPositions = [
    { dx: 0,  dy: 0,  sx:"-44px", sy:"34px", r:"-7deg" },
    { dx:-5,  dy: 4,  sx:"-52px", sy:"30px", r:"8deg" },
    { dx: 6,  dy:-3,  sx:"-38px", sy:"27px", r:"-3deg" },
    { dx:-3,  dy:-5,  sx:"-48px", sy:"22px", r:"11deg" },
    { dx: 4,  dy: 6,  sx:"-41px", sy:"37px", r:"-10deg" },
    { dx:-1,  dy: 2,  sx:"-56px", sy:"32px", r:"4deg" }
  ];

  frankPositions.forEach((pos, index) => {
    setTimeout(() => {
      const frank = document.createElement("div");
      frank.className = "profile frank frank-stack";
      frank.style.left = `${homieCenterX + pos.dx - AVATAR_HALF}px`;
      frank.style.top = `${homieCenterY + pos.dy - AVATAR_HALF}px`;
      frank.style.setProperty("--sx", pos.sx);
      frank.style.setProperty("--sy", pos.sy);
      frank.style.setProperty("--fr", pos.r || "0deg");
      frank.style.zIndex = String(22 + index);
      frank.innerHTML = `<img src="AssetFRANK.PNG" alt="">`;
      profileField.appendChild(frank);
      activeFrankStack.push(frank);
    }, index * 820);
  });

  setTimeout(playBlueFrankSequence, 9300);
}

function playBlueFrankSequence() {
  if (frankDutyFramesPlayed) return;
  frankDutyFramesPlayed = true;

  activeFrankStack = activeFrankStack.filter(node => node && node.parentNode);
  const lead = activeFrankStack[activeFrankStack.length - 1];
  activeFrankStack.slice(0, -1).forEach((node, index) => {
    setTimeout(() => { if (node && node.parentNode) node.classList.add("frank-fade-under"); }, index * 130);
  });

  if (!lead || !lead.parentNode) {
    turtle.classList.remove("covered-by-frank");
    return;
  }

  lead.classList.add("frank-processing");
  const img = lead.querySelector("img");
  const frameTimes = [0, 620, 1240, 1900, 2580, 3300];
  frameTimes.forEach((time, index) => {
    setTimeout(() => {
      if (!frostHolding && !frostLocked && img && lead.parentNode) img.src = frankFrames[index];
    }, time);
  });

  setTimeout(() => {
    if (lead && lead.parentNode) lead.classList.add("frank-final-hold");
  }, 3300);

  setTimeout(() => {
    /*
      Frank ends dead still. No bird-flutter / peel-away / pixel-flight motion.
      The final frame simply holds before cleanup.
    */
    if (lead && lead.parentNode) {
      lead.classList.remove("hive-dissolve", "pixel-deteriorate");
      lead.classList.add("frank-sequence-complete");
    }

    if (!frostHolding && !frostLocked) {
      activeFrankStack.forEach(node => {
        if (node && node.parentNode && node !== lead) node.remove();
      });

      turtle.classList.remove("covered-by-frank");
    }
  }, 6100);

  setTimeout(() => {
    if (!frostHolding && !frostLocked && lead && lead.parentNode) {
      lead.remove();
    }
  }, 7600);
}

/* =========================================================
   FROST TIMELINE — HIDDEN SNOWFLAKE HOLD
========================================================= */

let frostHolding = false;
let frostLocked = false;
let frostHoldTimer = null;
let frostOverlay = null;
let frostSnowflakeAnchor = null;
let frostOriginX = 50;
let frostOriginY = 50;
let frostPausedAnimations = [];
let frostSwapTimers = [];

const FROST_HOLD_MS = 7000;
const FROST_GROW_MS = 23000;
const OBJECT_FREEZE_MS = 1880;
const PROFILE_FREEZE_MS = 3900;
const POST_FROST_CONTACT_PAUSE_MS = 1180;
const PROFILE_CONTACT_PAUSE_MS = 1850;
const TAWNYA_CONTACT_PAUSE_MS = 650;
const TAWNYA_TRANSFORM_MS = 3200;
const TAWNYA_ASSET = "AssetTAWNYA.frozen.png";
const FROZEN_STORY_HEART_ASSET = "LMT.frozen.PNG";

const FROZEN_ASSET_MAP = new Map([
  ["asset1.png", "Asset1.frozen.PNG"],
  ["asset2.png", "Asset2.frozen.PNG"],
  ["asset3.png", "Asset3.frozen.PNG"],
  ["asset4.png", "Asset4.frozen.PNG"],
  ["asset5.png", "Asset5.frozen.PNG"],
  ["asset6.png", "Asset6.frozen.PNG"],
  ["asset7.png", "Asset7.frozen.PNG"],
  ["asset8.png", "Asset8.frozen.PNG"],
  ["asset9.png", "Asset9.frozen.PNG"],
  ["assetcarl.png", "AssentCARL.frozen.PNG"],
  ["assetfrank.png", "AssetFRANK.frozen.PNG"],
  ["blue.frank0.png", "Frank.Blue.Frozen.0.PNG"],
  ["blue.frank1.png", "Frank.Blue.Frozen.1.PNG"],
  ["blue.frank2.png", "Frank.Blue.Frozen.2.PNG"],
  ["blue.frank3.png", "Frank.Blue.Frozen.3.PNG"],
  ["blue.frank4.png", "Frank.Blue.Frozen.4.PNG"],
  ["blue.frank5.png", "Frank.Blue.Frozen.5.PNG"],
  ["blue.frank6.png", "Frank.Blue.Frozen.6.PNG"],
  ["bot.female.v1.png", "Bot.Female.V1.Frozen.PNG"],
  ["bot.female.v2.png", "Bot.Female.V2.Frozen.PNG"],
  ["bot.female.v3.png", "Bot.Female.V3.Frozen.PNG"],
  ["bot.male.v1.png", "Bot.Male.V1.Frozen.PNG"],
  ["bot.male.v2.png", "Bot.Male.V2.Frozen.PNG"]
]);

const FROZEN_SOCIAL_ASSET_MAP = new Map([
  ["❤️", "REDheart.frozen.PNG"],
  ["🩷", "PINKheart.frozen.PNG"],
  ["😍", "Asset.hearteyes.frozen.PNG"],
  ["🥰", "Asset.3hearts.frozen.PNG"],
  ["🔥", "Asset.flame.frozen.PNG"],
  ["👎", "Asset.thumbsdown.frozen.PNG"],
  ["👍", "Asset.thumbsdown.frozen.PNG"],
  ["💯", "Asset.100.Frozen.PNG"],
  ["🔔", "Asset.Bell.Frozen.PNG"],
  ["▶️", "Asset.Subscribe.Frozen.PNG"]
]);

let tawnyaRevealNode = null;
let tawnyaProfileOverlay = null;
const c17EyeEpoch = performance.now();
function c17EyePhase(now = performance.now()) {
  return (now - c17EyeEpoch) % 63000;
}
let tawnyaHoldTimer = null;
let tawnyaHoldPointerId = null;
let tawnyaRetired = false;
let frostActorSnapshots = [];

function clearFrostActorSnapshots() {
  frostActorSnapshots.forEach(snapshot => {
    if (snapshot?._frostBurnSource) snapshot._frostBurnSource.classList.remove("c17-frost-burn-source-hidden");
    if (snapshot && snapshot.isConnected) snapshot.remove();
  });
  frostActorSnapshots = [];
}

function copyFrozenLayerState(source, clone, selector) {
  const sourceLayer = source.querySelector(selector);
  const cloneLayer = clone.querySelector(selector);
  if (!sourceLayer || !cloneLayer) return;

  const style = getComputedStyle(sourceLayer);
  cloneLayer.style.setProperty("opacity", style.opacity, "important");
  cloneLayer.style.setProperty("visibility", style.visibility, "important");
  cloneLayer.style.setProperty("display", style.display, "important");
  cloneLayer.style.setProperty("transform", style.transform === "none" ? "none" : style.transform, "important");
}

function snapshotFrostActors() {
  clearFrostActorSnapshots();

  const actors = [
    ...document.querySelectorAll(".engage.social-smoke"),
    ...document.querySelectorAll(".carl-trigger-heart"),
    ...document.querySelectorAll(".profile.symbol-touch, .profile.hive-reveal, .profile.carl, .profile.frank")
  ];

  actors.forEach((actor, index) => {
    if (!actor || !actor.isConnected || actor.classList.contains("wren")) return;

    const rect = actor.getBoundingClientRect();
    const style = getComputedStyle(actor);
    const opacity = Number.parseFloat(style.opacity || "0");

    if (
      rect.width <= 0 ||
      rect.height <= 0 ||
      rect.bottom < -8 ||
      rect.top > window.innerHeight + 8 ||
      rect.right < -8 ||
      rect.left > window.innerWidth + 8
    ) {
      return;
    }

    const snapshot = actor.cloneNode(true);
    const originalCanvases = actor.querySelectorAll("canvas");
    snapshot.querySelectorAll("canvas").forEach((copy, i) => {
      if (originalCanvases[i]) copy.getContext("2d")?.drawImage(originalCanvases[i], 0, 0);
    });
    snapshot.removeAttribute("id");
    delete snapshot.dataset.frostSwapScheduled;
    snapshot.classList.remove(
      "heart-fade-black",
      "heart-pop",
      "carl-heart-pop",
      "c17-heart-becoming-tawnya"
    );
    snapshot.classList.add("c17-frost-actor-snapshot");
    snapshot.dataset.frostSourceIndex = String(index);

    if (actor.classList.contains("carl-trigger-heart")) {
      snapshot.classList.add("c17-frost-story-heart");
      snapshot.style.setProperty("background", "transparent", "important");
      snapshot.style.setProperty("border", "0", "important");
      snapshot.style.setProperty("box-shadow", "none", "important");
      snapshot.style.setProperty("outline", "0", "important");
      copyFrozenLayerState(actor, snapshot, ".carl-heart-red");
      copyFrozenLayerState(actor, snapshot, ".carl-heart-grey");

      const greyLayer = actor.querySelector(".carl-heart-grey");
      const redLayer = actor.querySelector(".carl-heart-red");
      const greyStyle = greyLayer ? getComputedStyle(greyLayer) : null;
      const redStyle = redLayer ? getComputedStyle(redLayer) : null;
      snapshot.dataset.frostHeartSide = rect.left + rect.width / 2 < window.innerWidth * 0.5 ? "left" : "right";
      snapshot.dataset.frostGreyVisible = String(Boolean(
        actor.classList.contains("dead-stage") ||
        (greyStyle && greyStyle.visibility !== "hidden" && Number.parseFloat(greyStyle.opacity || "0") > 0.03)
      ));
      snapshot.dataset.frostRedVisible = String(Boolean(
        redStyle && redStyle.visibility !== "hidden" && Number.parseFloat(redStyle.opacity || "0") > 0.03
      ));
    } else if (actor.classList.contains("carl")) {
      snapshot.classList.add("c17-frost-carl-snapshot", "c17-frost-profile-snapshot");
      snapshot.dataset.frostCarl = "true";
    } else if (actor.classList.contains("frank")) {
      snapshot.classList.add("c17-frost-profile-snapshot", "c17-frost-frank-snapshot");
      snapshot.dataset.frostFrank = "true";
      const frankImage = snapshot.querySelector("img");
      if (frankImage) {
        snapshot.dataset.frostFrankSource = getAssetFilename(frankImage.src);
      }
    } else if (actor.classList.contains("profile")) {
      snapshot.classList.add("c17-frost-profile-snapshot");
      snapshot.dataset.frostSymbolProfile = "true";
      const source = actor.querySelector("img");
      snapshot.dataset.frostOriginalAsset = source ? normalizeAssetName(source.getAttribute("src") || source.src) : "";
    } else {
      snapshot.classList.add("c17-frost-social-snapshot");
    }

    snapshot.style.setProperty("position", "fixed", "important");
    snapshot.style.setProperty("left", `${rect.left}px`, "important");
    snapshot.style.setProperty("top", `${rect.top}px`, "important");
    snapshot.style.setProperty("width", `${rect.width}px`, "important");
    snapshot.style.setProperty("height", `${rect.height}px`, "important");
    snapshot.style.setProperty("margin", "0", "important");
    snapshot.style.setProperty("transform", "none", "important");
    snapshot.style.setProperty("animation", "none", "important");
    snapshot.style.setProperty("transition", "none", "important");
    snapshot.style.setProperty("opacity", "1", "important");
    snapshot.style.setProperty("visibility", "visible", "important");
    snapshot.style.setProperty("pointer-events", "none", "important");

    document.body.appendChild(snapshot);
    frostActorSnapshots.push(snapshot);
    if (actor.querySelector(".c17-paper-burn-canvas")) {
      snapshot._frostBurnSource = actor;
      actor.classList.add("c17-frost-burn-source-hidden");
    }

    /*
      Leave the paused live actor in place beneath its snapshot. The snapshot
      becomes the permanent frozen object only when the frost front touches it.
      This prevents the entire emoji field from disappearing at takeover start.
    */
  });
}

function clearFrostSwapTimers() {
  frostSwapTimers.forEach(timer => clearTimeout(timer));
  frostSwapTimers = [];
}

function pauseFrostTimeline() {
  document.documentElement.classList.add("frost-time-stop");

  frostPausedAnimations = document
    .getAnimations({ subtree: true })
    .filter(animation => animation.playState === "running");

  frostPausedAnimations.forEach(animation => {
    try {
      animation.pause();
    } catch (error) {
      // Safari safety.
    }
  });
}

function resumeFrostTimeline() {
  if (frostLocked) return;

  clearFrostSwapTimers();

  document.documentElement.classList.remove(
    "frost-time-stop",
    "frost-conquering",
    "frost-dead-world"
  );

  frostPausedAnimations.forEach(animation => {
    try {
      animation.play();
    } catch (error) {
      // Safari safety.
    }
  });

  frostPausedAnimations = [];

  if (frostSnowflakeAnchor) {
    frostSnowflakeAnchor.remove();
    frostSnowflakeAnchor = null;
  }

  if (frostOverlay) {
    frostOverlay.remove();
    frostOverlay = null;
  }

  clearFrostActorSnapshots();
  document.querySelectorAll(".engage.social-smoke, .carl-trigger-heart").forEach(actor => {
    actor.style.removeProperty("visibility");
  });
}

function pinSnowflakeInPlace(snowflake) {
  if (!snowflake || !snowflake.isConnected) return;

  if (frostSnowflakeAnchor) frostSnowflakeAnchor.remove();

  const rect = snowflake.getBoundingClientRect();
  frostSnowflakeAnchor = snowflake.cloneNode(true);
  frostSnowflakeAnchor.className = "c17-frozen-snowflake-anchor";
  frostSnowflakeAnchor.removeAttribute("role");
  frostSnowflakeAnchor.removeAttribute("aria-label");
  frostSnowflakeAnchor.style.left = `${rect.left + rect.width / 2}px`;
  frostSnowflakeAnchor.style.top = `${rect.top + rect.height / 2}px`;
  frostSnowflakeAnchor.style.width = `${rect.width}px`;
  frostSnowflakeAnchor.style.height = `${rect.height}px`;
  document.body.appendChild(frostSnowflakeAnchor);

  snowflake.style.visibility = "hidden";
}

function createFrostOverlay(pointX, pointY) {
  if (frostOverlay) frostOverlay.remove();

  frostOriginX = Math.max(0, Math.min(100, (pointX / window.innerWidth) * 100));
  frostOriginY = Math.max(0, Math.min(100, (pointY / window.innerHeight) * 100));

  frostOverlay = document.createElement("div");
  frostOverlay.className = "c17-frost-overlay";
  frostOverlay.style.setProperty("--frost-x", `${frostOriginX}%`);
  frostOverlay.style.setProperty("--frost-y", `${frostOriginY}%`);
  frostOverlay.innerHTML = `<canvas class="c17-frost-canvas" aria-hidden="true"></canvas>`;

  document.body.appendChild(frostOverlay);
}

function beginFrostHold(snowflake, pointX, pointY) {
  if (frostLocked || frostHolding) return;

  frostHolding = true;
  createFrostOverlay(pointX, pointY);
  pauseFrostTimeline();

  /*
    Capture the stopped world immediately. JavaScript removal timers continue
    during a seven-second hold, so waiting until takeover erased the exact
    emojis and gray-heart frame the frost was supposed to preserve.
  */
  snapshotFrostActors();

  const cancelHold = () => {
    document.removeEventListener("pointerup", cancelHold, true);
    document.removeEventListener("pointercancel", cancelHold, true);

    if (!frostHolding || frostLocked) return;

    frostHolding = false;
    clearTimeout(frostHoldTimer);
    frostHoldTimer = null;
    resumeFrostTimeline();
  };

  document.addEventListener("pointerup", cancelHold, true);
  document.addEventListener("pointercancel", cancelHold, true);

  frostHoldTimer = setTimeout(() => {
    if (!frostHolding || frostLocked) return;

    frostLocked = true;
    frostHolding = false;

    document.removeEventListener("pointerup", cancelHold, true);
    document.removeEventListener("pointercancel", cancelHold, true);

    pinSnowflakeInPlace(snowflake);
    launchFrostTimeline();
  }, FROST_HOLD_MS);
}

function getAssetFilename(src) {
  try {
    return decodeURIComponent(new URL(src, window.location.href).pathname.split("/").pop());
  } catch (error) {
    return String(src || "").split("/").pop();
  }
}

function normalizeAssetName(src) {
  return getAssetFilename(src).toLowerCase();
}

function frostArrivalRatio(pointX, pointY, originX, originY) {
  const farthestCorner = Math.max(
    Math.hypot(originX, originY),
    Math.hypot(window.innerWidth - originX, originY),
    Math.hypot(originX, window.innerHeight - originY),
    Math.hypot(window.innerWidth - originX, window.innerHeight - originY),
    1
  );

  return Math.max(0, Math.min(1, Math.hypot(pointX - originX, pointY - originY) / farthestCorner));
}

function getObjectFreezeContact(rect, originX, originY) {
  const contactX = Math.max(rect.left, Math.min(originX, rect.right));
  const contactY = Math.max(rect.top, Math.min(originY, rect.bottom));
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const deltaX = centerX - originX;
  const deltaY = centerY - originY;

  let direction;
  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    direction = deltaX >= 0 ? "from-left" : "from-right";
  } else {
    direction = deltaY >= 0 ? "from-top" : "from-bottom";
  }

  return { contactX, contactY, centerX, centerY, direction };
}

function scheduleFrozenAssetSwaps(originX, originY, duration) {
  clearFrostSwapTimers();

  const candidates = [...document.querySelectorAll(".profile img")]
    .filter(image => !image.classList.contains("c17-frozen-swap-layer") && !image.closest(".wren, .c17-frost-actor-snapshot"));

  candidates.forEach(image => {
    const frozenName = FROZEN_ASSET_MAP.get(normalizeAssetName(image.getAttribute("src") || image.src));
    if (!frozenName) return;

    const profile = image.closest(".profile");
    if (!profile || profile.dataset.frostSwapScheduled === "true") return;
    profile.dataset.frostSwapScheduled = "true";

    const rect = image.getBoundingClientRect();
    const contact = getObjectFreezeContact(rect, originX, originY);
    const arrival = Math.max(
      0,
      Math.round(duration * frostArrivalRatio(contact.contactX, contact.contactY, originX, originY))
    );
    const freezeStart = arrival + PROFILE_CONTACT_PAUSE_MS;
    const freezeDuration = PROFILE_FREEZE_MS;

    const timer = setTimeout(() => {
      if (!image.isConnected || !profile.isConnected || !frostLocked) return;

      const preload = new Image();
      preload.onload = () => {
        if (!image.isConnected || !profile.isConnected || !frostLocked) return;

        const frozenLayer = document.createElement("img");
        frozenLayer.alt = "";
        loadFrozenAssetClean(frozenLayer, frozenName);
        frozenLayer.setAttribute("aria-hidden", "true");
        frozenLayer.className = `c17-frozen-swap-layer ${contact.direction}`;

        image.classList.add("c17-original-swap-layer", contact.direction);

        const pixelFront = document.createElement("span");
        pixelFront.className = `c17-freeze-pixel-front ${contact.direction}`;
        pixelFront.setAttribute("aria-hidden", "true");

        profile.style.setProperty("--c17-object-freeze-ms", `${freezeDuration}ms`);
        profile.classList.add("c17-object-freezing", contact.direction);
        profile.appendChild(frozenLayer);
        profile.appendChild(pixelFront);

        const finishTimer = setTimeout(() => {
          if (!image.isConnected || !profile.isConnected || !frostLocked) return;

          loadFrozenAssetClean(image, frozenName);
          image.classList.remove(
            "c17-original-swap-layer",
            "from-left",
            "from-right",
            "from-top",
            "from-bottom"
          );
          image.classList.add("c17-frozen-asset");
          frozenLayer.remove();
          pixelFront.remove();
          profile.classList.remove(
            "c17-object-freezing",
            "from-left",
            "from-right",
            "from-top",
            "from-bottom"
          );
          profile.classList.add("c17-object-frozen");
        }, freezeDuration + 100);

        frostSwapTimers.push(finishTimer);
      };
      preload.src = frozenName;
    }, freezeStart);

    frostSwapTimers.push(timer);
  });
}

function loadFrozenAssetClean(image, assetName) {
  if (!image || !assetName) return;

  image.dataset.c17RequestedAsset = assetName;
  const source = new Image();
  source.decoding = "sync";
  source.onload = () => {
    if (image.dataset.c17RequestedAsset !== assetName) return;
    const canvas = document.createElement("canvas");
    canvas.width = source.naturalWidth || source.width;
    canvas.height = source.naturalHeight || source.height;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
      image.src = assetName;
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(source, 0, 0);

    let pixels;
    try {
      pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    } catch (error) {
      image.src = assetName;
      return;
    }

    const data = pixels.data;
    const width = canvas.width;
    const height = canvas.height;
    const visited = new Uint8Array(width * height);
    const queue = [];

    const isPaperWhite = pixelIndex => {
      const offset = pixelIndex * 4;
      const alpha = data[offset + 3];
      if (alpha === 0) return true;

      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];
      const minimum = Math.min(red, green, blue);
      const maximum = Math.max(red, green, blue);
      const spread = maximum - minimum;

      // Neutral white/gray backing only. Cyan and blue ice are protected.
      return (minimum >= 218 && spread <= 18) || (assetName === TAWNYA_ASSET && maximum <= 24 && spread <= 8);
    };

    const enqueue = pixelIndex => {
      if (pixelIndex < 0 || pixelIndex >= width * height || visited[pixelIndex]) return;
      if (!isPaperWhite(pixelIndex)) return;
      visited[pixelIndex] = 1;
      queue.push(pixelIndex);
    };

    // Strip only white connected to the outer edge, so white ice inside the
    // artwork survives while square backing plates and halos disappear.
    for (let x = 0; x < width; x++) {
      enqueue(x);
      enqueue((height - 1) * width + x);
    }
    for (let y = 0; y < height; y++) {
      enqueue(y * width);
      enqueue(y * width + width - 1);
    }

    for (let cursor = 0; cursor < queue.length; cursor++) {
      const pixelIndex = queue[cursor];
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);
      const offset = pixelIndex * 4;

      data[offset + 3] = 0;

      if (x > 0) enqueue(pixelIndex - 1);
      if (x + 1 < width) enqueue(pixelIndex + 1);
      if (y > 0) enqueue(pixelIndex - width);
      if (y + 1 < height) enqueue(pixelIndex + width);
    }

    // Feather the one-pixel border left beside removed paper to prevent a
    // bright rectangular fringe on iPhone compositing.
    for (let pixelIndex = 0; pixelIndex < width * height; pixelIndex++) {
      if (visited[pixelIndex]) continue;
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);
      const neighbors = [
        x > 0 ? pixelIndex - 1 : -1,
        x + 1 < width ? pixelIndex + 1 : -1,
        y > 0 ? pixelIndex - width : -1,
        y + 1 < height ? pixelIndex + width : -1
      ];
      if (!neighbors.some(neighbor => neighbor >= 0 && visited[neighbor])) continue;

      const offset = pixelIndex * 4;
      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];
      const minimum = Math.min(red, green, blue);
      const maximum = Math.max(red, green, blue);
      if (minimum >= 205 && maximum - minimum <= 22) {
        data[offset + 3] = Math.round(data[offset + 3] * 0.30);
      }
    }

    context.putImageData(pixels, 0, 0);
    image.src = canvas.toDataURL("image/png");
    image.dataset.c17CleanFrozenAsset = "true";
  };
  source.onerror = () => {
    if (image.dataset.c17RequestedAsset !== assetName) return;
    image.src = assetName;
  };
  source.src = assetName;
}

function loadFrozenSocialAsset(image, assetName) {
  loadFrozenAssetClean(image, assetName);
}

function scheduleFrozenSocialSwaps(originX, originY, duration) {
  const candidates = [...document.querySelectorAll(".c17-frost-social-snapshot")];

  candidates.forEach(item => {
    if (!item.isConnected || item.dataset.frostSwapScheduled === "true") return;
    item.dataset.frostSwapScheduled = "true";

    const rect = item.getBoundingClientRect();
    const contact = getObjectFreezeContact(rect, originX, originY);
    const arrival = Math.max(
      0,
      Math.round(duration * frostArrivalRatio(contact.contactX, contact.contactY, originX, originY))
    );
    const freezeStart = arrival + POST_FROST_CONTACT_PAUSE_MS;

    const timer = setTimeout(() => {
      if (!item.isConnected || !frostLocked) return;

      const originalSymbol = item.textContent.trim();
      const frozenAsset = FROZEN_SOCIAL_ASSET_MAP.get(originalSymbol);

      if (item.classList.contains("social-face")) {
        /*
          Cause and effect:
          the original yellow face remains visible for a beat, then the blue
          frozen face wraps across it from the frost-contact edge.
        */
        item.textContent = "";

        const originalFace = document.createElement("span");
        originalFace.className = "c17-face-original";
        originalFace.textContent = originalSymbol;

        let frozenFace;

        if (frozenAsset) {
          frozenFace = document.createElement("img");
          frozenFace.alt = "";
          frozenFace.className = `c17-face-frozen c17-face-frozen-asset ${contact.direction}`;
          loadFrozenSocialAsset(frozenFace, frozenAsset);
        } else {
          frozenFace = document.createElement("span");
          frozenFace.className = `c17-face-frozen ${contact.direction}`;
          frozenFace.textContent = "🥶";
        }

        item.style.setProperty("--c17-object-freeze-ms", `${OBJECT_FREEZE_MS}ms`);
        item.appendChild(originalFace);
        item.appendChild(frozenFace);
        item.classList.add("c17-face-freezing", contact.direction);

        const finishTimer = setTimeout(() => {
          if (!item.isConnected || !frostLocked) return;
          originalFace.remove();
          frozenFace.classList.remove(
            "from-left",
            "from-right",
            "from-top",
            "from-bottom"
          );
          item.classList.remove(
            "c17-face-freezing",
            "from-left",
            "from-right",
            "from-top",
            "from-bottom"
          );
          item.classList.add("c17-face-frozen-complete");
        }, OBJECT_FREEZE_MS + 80);

        frostSwapTimers.push(finishTimer);
      } else if (frozenAsset) {
        item.textContent = "";
        const image = document.createElement("img");
        image.alt = "";
        image.className = originalSymbol === "🔥"
          ? "c17-frozen-social-asset c17-frozen-flame-asset"
          : "c17-frozen-social-asset";
        item.appendChild(image);
        loadFrozenSocialAsset(image, frozenAsset);
      }

      item.classList.add("c17-social-frozen");
    }, freezeStart);

    frostSwapTimers.push(timer);
  });
}



function composeFrozenBurnFrame(stopped, frozen) {
  const result = new Uint8ClampedArray(stopped.length);
  for (let k = 0; k < stopped.length; k += 4) {
    const alpha = stopped[k + 3];
    if (!alpha) continue;
    const r = stopped[k], g = stopped[k + 1], b = stopped[k + 2];
    const molten = r > g * 1.15 && r > b * 1.3;
    result[k] = molten ? 18 : frozen[k];
    result[k + 1] = molten ? 65 : frozen[k + 1];
    result[k + 2] = molten ? 125 : frozen[k + 2];
    // The stopped burn owns coverage: a frozen PNG cannot refill a hole.
    result[k + 3] = alpha;
  }
  return result;
}

function freezeBurnedSymbolPixels(profile, canvas) {
  const context = canvas.getContext("2d", {willReadFrequently:true});
  if (!context) return;
  let stopped;
  try { stopped = context.getImageData(0, 0, canvas.width, canvas.height); }
  catch (_) { return; }
  profile.classList.add("c17-iced-burn", "c17-symbol-profile-frozen");
  const sourceName = profile.dataset.frostOriginalAsset || "";
  const frozenName = FROZEN_ASSET_MAP.get(sourceName);
  // Cool the molten pixels immediately, even while the frozen PNG loads.
  context.putImageData(new ImageData(composeFrozenBurnFrame(stopped.data, stopped.data), canvas.width, canvas.height), 0, 0);
  if (!frozenName) return;
  const frozen = new Image();
  frozen.onload = () => {
    if (!profile.isConnected || !frostLocked) return;
    const art = document.createElement("canvas");
    art.width = canvas.width; art.height = canvas.height;
    const ac = art.getContext("2d", {willReadFrequently:true});
    if (!ac) return;
    try {
      ac.drawImage(frozen, 0, 0, art.width, art.height);
      const texture = ac.getImageData(0, 0, art.width, art.height);
      context.putImageData(new ImageData(composeFrozenBurnFrame(stopped.data, texture.data), canvas.width, canvas.height), 0, 0);
    } catch (_) { /* The immediately cooled captured frame remains visible. */ }
  };
  frozen.src = frozenName;
}

function scheduleFrozenSymbolProfileLocks(originX, originY, duration) {
  const profiles = [
    ...document.querySelectorAll(".c17-frost-profile-snapshot")
  ];

  profiles.forEach(profile => {
    if (!profile.isConnected || profile.dataset.frostSwapScheduled === "true") return;
    profile.dataset.frostSwapScheduled = "true";

    const rect = profile.getBoundingClientRect();
    const contact = getObjectFreezeContact(rect, originX, originY);
    const arrival = Math.max(
      0,
      Math.round(duration * frostArrivalRatio(contact.contactX, contact.contactY, originX, originY))
    );
    const freezeStart = arrival + PROFILE_CONTACT_PAUSE_MS;

    const timer = setTimeout(() => {
      if (!profile.isConnected || !frostLocked) return;

      const burningCanvas = profile.querySelector(".c17-paper-burn-canvas");
      if (burningCanvas) {
        freezeBurnedSymbolPixels(profile, burningCanvas);
        return;
      }

      profile.style.setProperty("--c17-object-freeze-ms", `${PROFILE_FREEZE_MS}ms`);
      profile.classList.add(
        "c17-symbol-profile-freezing",
        contact.direction
      );

      const sourceImage = profile.querySelector("img");
      const sourceName = sourceImage
        ? normalizeAssetName(sourceImage.getAttribute("src") || sourceImage.src)
        : "";
      const stoppedSource = profile.dataset.frostFrankSource
        ? normalizeAssetName(profile.dataset.frostFrankSource)
        : sourceName;
      const frozenName = FROZEN_ASSET_MAP.get(stoppedSource);

      let frozenOverlay = null;

      if (sourceImage && frozenName) {
        frozenOverlay = document.createElement("img");
        frozenOverlay.alt = "";
        loadFrozenAssetClean(frozenOverlay, frozenName);
        frozenOverlay.className = "c17-frozen-profile-overlay";
        frozenOverlay.setAttribute("aria-hidden", "true");
        profile.appendChild(frozenOverlay);
      }

      const pixelFront = document.createElement("span");
      pixelFront.className = "c17-freeze-pixel-front";
      pixelFront.setAttribute("aria-hidden", "true");
      profile.appendChild(pixelFront);

      const finishTimer = setTimeout(() => {
        if (!profile.isConnected || !frostLocked) return;

        if (sourceImage && frozenName) {
          loadFrozenAssetClean(sourceImage, frozenName);
        }

        if (frozenOverlay) frozenOverlay.remove();
        pixelFront.remove();

        profile.classList.remove(
          "c17-symbol-profile-freezing",
          "from-left",
          "from-right",
          "from-top",
          "from-bottom"
        );
        profile.classList.add("c17-symbol-profile-frozen");
      }, PROFILE_FREEZE_MS + 100);

      frostSwapTimers.push(finishTimer);
    }, freezeStart);

    frostSwapTimers.push(timer);
  });
}

function resolveFrozenHeartOutcome(originX, originY, duration) {
  const hearts = [
    ...document.querySelectorAll(".c17-frost-story-heart")
  ].filter(heart => heart && heart.isConnected);

  if (!hearts.length) return;

  /*
    Preserve the exact stopped frame, but choose the actual left-return heart
    deliberately instead of trusting querySelector order. This prevents an
    older/right-side copy from stealing the Tawnya outcome.
  */
  const ranked = hearts.map(heart => {
    const rect = heart.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const greyLayer = heart.querySelector(".carl-heart-grey");
    const greyStyle = greyLayer ? getComputedStyle(greyLayer) : null;
    const greyOpacity = greyStyle ? Number.parseFloat(greyStyle.opacity || "0") : 0;
    const greyVisible = Boolean(
      heart.dataset.frostGreyVisible === "true" ||
      heart.classList.contains("dead-stage") ||
      (greyLayer && greyStyle && greyStyle.visibility !== "hidden" && greyOpacity > 0.03)
    );
    const onLeftReturn = heart.dataset.frostHeartSide === "left" || centerX < window.innerWidth * 0.5;
    return { heart, rect, centerX, greyVisible, onLeftReturn };
  });

  const leftReturnCandidates = ranked
    .filter(entry => entry.onLeftReturn)
    .sort((a, b) => a.centerX - b.centerX);

  const greyCandidates = ranked
    .filter(entry => entry.greyVisible)
    .sort((a, b) => a.centerX - b.centerX);

  const tawnyaCandidate =
    leftReturnCandidates.find(entry => entry.greyVisible) ||
    leftReturnCandidates[0] ||
    greyCandidates[0] ||
    null;

  ranked.forEach(entry => {
    const { heart, rect } = entry;
    const contact = getObjectFreezeContact(rect, originX, originY);
    const arrival = Math.round(
      duration * frostArrivalRatio(contact.contactX, contact.contactY, originX, originY)
    );
    const freezeStart = arrival + (
      tawnyaCandidate && heart === tawnyaCandidate.heart
        ? TAWNYA_CONTACT_PAUSE_MS
        : POST_FROST_CONTACT_PAUSE_MS
    );

    const timer = setTimeout(() => {
      if (!heart.isConnected || !frostLocked) return;

      if (tawnyaCandidate && heart === tawnyaCandidate.heart) {
        revealTawnyaFromGreyHeart(heart, contact.direction);
        return;
      }

      heart.classList.add("c17-frozen-heart-hold", "c17-frozen-red-heart");

      heart.querySelectorAll(".carl-heart-layer").forEach(layer => {
        layer.style.setProperty("display", "none", "important");
        layer.style.setProperty("visibility", "hidden", "important");
      });

      let frozenHeartImage = heart.querySelector(".c17-frozen-story-heart-asset");
      if (!frozenHeartImage) {
        frozenHeartImage = document.createElement("img");
        frozenHeartImage.className = "c17-frozen-story-heart-asset";
        frozenHeartImage.alt = "";
        heart.appendChild(frozenHeartImage);
      }
      loadFrozenAssetClean(frozenHeartImage, FROZEN_STORY_HEART_ASSET);
    }, freezeStart);

    frostSwapTimers.push(timer);
  });
}

function launchFrostTimeline() {
  if (!frostOverlay) return;

  document.documentElement.classList.add("frost-conquering");
  frostOverlay.classList.add("frost-grow");

  const canvas = frostOverlay.querySelector(".c17-frost-canvas");
  if (!canvas) return;

  const originX = window.innerWidth * (frostOriginX / 100);
  const originY = window.innerHeight * (frostOriginY / 100);

  scheduleFrozenAssetSwaps(originX, originY, FROST_GROW_MS);
  scheduleFrozenSocialSwaps(originX, originY, FROST_GROW_MS);
  scheduleFrozenSymbolProfileLocks(originX, originY, FROST_GROW_MS);
  resolveFrozenHeartOutcome(originX, originY, FROST_GROW_MS);
  growFrostAcrossScreen(canvas);
}

function growFrostAcrossScreen(canvas) {
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const originX = screenWidth * (frostOriginX / 100);
  const originY = screenHeight * (frostOriginY / 100);
  const startTime = performance.now();

  const farthestCorner = Math.max(
    Math.hypot(originX, originY),
    Math.hypot(screenWidth - originX, originY),
    Math.hypot(originX, screenHeight - originY),
    Math.hypot(screenWidth - originX, screenHeight - originY),
    1
  );

  canvas.width = Math.round(screenWidth * pixelRatio);
  canvas.height = Math.round(screenHeight * pixelRatio);
  canvas.style.width = `${screenWidth}px`;
  canvas.style.height = `${screenHeight}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.imageSmoothingEnabled = true;

  const fieldScale = 4;
  const fieldWidth = Math.ceil(screenWidth / fieldScale);
  const fieldHeight = Math.ceil(screenHeight / fieldScale);
  const fieldCanvas = document.createElement("canvas");
  fieldCanvas.width = fieldWidth;
  fieldCanvas.height = fieldHeight;
  const field = fieldCanvas.getContext("2d");
  if (!field) return;
  const image = field.createImageData(fieldWidth, fieldHeight);

  function hash(x, y) {
    const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return value - Math.floor(value);
  }

  function smoothNoise(x, y) {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const tx = x - x0;
    const ty = y - y0;
    const sx = tx * tx * (3 - 2 * tx);
    const sy = ty * ty * (3 - 2 * ty);
    const a = hash(x0, y0);
    const b = hash(x0 + 1, y0);
    const c = hash(x0, y0 + 1);
    const d = hash(x0 + 1, y0 + 1);
    const top = a + (b - a) * sx;
    const bottom = c + (d - c) * sx;
    return top + (bottom - top) * sy;
  }

  function fieldNoise(x, y) {
    return (
      smoothNoise(x * 0.05, y * 0.05) * 0.54 +
      smoothNoise(x * 0.019 + 31, y * 0.019 + 17) * 0.30 +
      smoothNoise(x * 0.008 + 73, y * 0.008 + 91) * 0.16
    );
  }

  function easeInOut(value) {
    const clamped = Math.max(0, Math.min(1, value));
    return clamped * clamped * (3 - 2 * clamped);
  }

  function paintFrozenField(progress) {
    const eased = easeInOut(progress);
    const data = image.data;

    for (let y = 0; y < fieldHeight; y += 1) {
      for (let x = 0; x < fieldWidth; x += 1) {
        const px = x * fieldScale + fieldScale * 0.5;
        const py = y * fieldScale + fieldScale * 0.5;
        const radial = Math.hypot(px - originX, py - originY) / farthestCorner;
        const broadNoise = fieldNoise(x, y);
        const fineNoise = smoothNoise(x * 0.19 + 9, y * 0.19 + 27);
        const front = radial + (0.5 - broadNoise) * 0.12 + (0.5 - fineNoise) * 0.025;
        const freezeEdge = Math.max(0, Math.min(1, (eased - front + 0.035) * 18));
        const frozen = freezeEdge * freezeEdge * (3 - 2 * freezeEdge);
        const index = (y * fieldWidth + x) * 4;

        const materialNoise = fieldNoise(x + 83, y + 41);
        const deepR = 10 + materialNoise * 12;
        const deepG = 35 + materialNoise * 24;
        const deepB = 55 + materialNoise * 31;
        const milk = Math.max(0, smoothNoise(x * 0.07 + 19, y * 0.07 + 51) - 0.58) * 36;

        data[index] = Math.round(deepR + milk);
        data[index + 1] = Math.round(deepG + milk * 1.35);
        data[index + 2] = Math.round(deepB + milk * 1.7);
        data[index + 3] = Math.round(frozen * 248);
      }
    }

    field.putImageData(image, 0, 0);
    context.clearRect(0, 0, screenWidth, screenHeight);
    context.drawImage(fieldCanvas, 0, 0, screenWidth, screenHeight);

    context.save();
    context.globalCompositeOperation = "source-atop";

    const depth = context.createLinearGradient(0, 0, screenWidth, screenHeight);
    depth.addColorStop(0, "rgba(2,12,22,0.68)");
    depth.addColorStop(0.38, "rgba(38,96,121,0.18)");
    depth.addColorStop(0.62, "rgba(118,181,196,0.14)");
    depth.addColorStop(1, "rgba(1,10,18,0.72)");
    context.fillStyle = depth;
    context.fillRect(0, 0, screenWidth, screenHeight);

    const coldConnection = context.createRadialGradient(
      originX,
      originY,
      0,
      originX,
      originY,
      Math.max(screenWidth, screenHeight) * 0.48
    );
    coldConnection.addColorStop(0, "rgba(214,247,250,0.16)");
    coldConnection.addColorStop(0.18, "rgba(126,202,216,0.10)");
    coldConnection.addColorStop(0.58, "rgba(31,87,111,0.035)");
    coldConnection.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = coldConnection;
    context.fillRect(0, 0, screenWidth, screenHeight);

    context.restore();
  }

  function render(now) {
    const progress = Math.min(1, (now - startTime) / FROST_GROW_MS);
    paintFrozenField(progress);

    if (progress < 1) {
      requestAnimationFrame(render);
      return;
    }

    frostOverlay.classList.add("frost-complete");
    document.documentElement.classList.add("frost-dead-world");
  }

  requestAnimationFrame(render);
}

function ensureTawnyaProfileOverlay() {
  if (tawnyaProfileOverlay && tawnyaProfileOverlay.isConnected) return tawnyaProfileOverlay;

  const dossier = {
    overview: {
      label: "FILE",
      pages: {
        identity: {
          label: "IDENTITY",
          html: `<div class="c17-dossier-kicker">IDENTITY RECORD</div><h2>Identity</h2><dl class="c17-fact-grid c17-wide-facts"><div><dt>FULL NAME</dt><dd>Tawnya Grey</dd></div><div><dt>AGE</dt><dd>27</dd></div><div><dt>BIRTHDAY</dt><dd>August 9</dd></div><div><dt>BIRTHPLACE</dt><dd>Dorchester, Massachusetts</dd></div><div><dt>RESIDENCE</dt><dd>Western Massachusetts</dd></div><div><dt>CHILDREN</dt><dd>None</dd></div></dl>`
        },
        property: {
          label: "PROPERTY",
          html: `
            <div class="c17-dossier-kicker">PROPERTY / ASSOCIATED VISUAL RECORD</div>
            <h2>Known Property</h2>
            <section class="c17-property-stack">
              <article class="c17-property-record">
                <header><span>RESIDENCE</span><b>OWNER-OCCUPIED SINGLE-WIDE TRAILER</b></header>
                <div class="c17-media-placeholder c17-property-media-card">
                  <span>×</span><b>TRAILER EXTERIOR</b><small>FRAME PENDING</small>
                </div>
              </article>
              <article class="c17-property-record">
                <header><span>VEHICLE</span><b>1991 CHEVROLET SILVERADO // OPERATIONAL</b></header>
                <div class="c17-media-placeholder c17-media-placeholder-live c17-property-media-card">
                  <img src="T.Extras.Truck.PNG" alt="1991 Chevrolet Silverado">
                  <b>1991 SILVERADO</b>
                </div>
              </article>
            </section>
            <div class="c17-property-divider"><span>ASSOCIATED PLAN // NOT OWNED PROPERTY</span></div>
            <article class="c17-property-record c17-property-dream">
              <header><span>SUBJECT PROJECT</span><b>DREAM SKATEPARK</b></header>
              <p>Concept repeatedly associated with the subject. No ownership record or completed site is attached to this file.</p>
              <div class="c17-media-placeholder c17-media-placeholder-live c17-property-media-card">
                <img src="T.Extras.Skatepark.PNG" alt="Tawnya Grey dream skatepark concept">
                <b>DREAM SKATEPARK // CONCEPT</b>
              </div>
            </article>`
        },
        status: {
          label: "STATUS",
          html: `<div class="c17-dossier-kicker">INTERNAL USE ONLY</div><h2>Archive Status</h2><p class="c17-dossier-body"><b>Classification:</b> low strategic threat / high incident-generation potential.</p><p class="c17-dossier-body"><b>Reason retained:</b> recurrent presence across unrelated reports, unstable contact network, and anomalous frequency linkage.</p><div class="c17-incomplete-box"><b>FILE CORRUPTION DETECTED</b><br>Several sections remain incomplete.</div>`
        },
        redacted: {
          label: "REDACTED",
          html: `<div class="c17-dossier-kicker">ACCESS RESTRICTED</div><h2>████████</h2><p class="c17-dossier-body">████████████████████████████████</p><p class="c17-dossier-body">Subject connection to frozen asset event: <b>CONFIRMED</b>.</p><p class="c17-dossier-body">Recovery trigger: ████████████████████</p>`
        },
        admin: {
          label: "ADMIN",
          html: `<div class="c17-dossier-kicker">INTERNAL RECORD // ADMINISTRATIVE REVIEW</div><h2>Administrative Finding</h2>
          <div class="c17-admin-finding">
            <dl class="c17-fact-grid"><div><dt>SUBJECT</dt><dd>Tawnya Grey</dd></div><div><dt>REVIEW STATUS</dt><dd>Continued observation</dd></div></dl>
            <section><h3>Presenting condition</h3><p>Subject presents with a continuous personal history, stable self-identification, and no reported awareness of her constructed origin. She describes her surroundings as ordinary. Distress is attributed to relationships, employment, money, and accumulated physical injury.</p></section>
            <section><h3>Observed behavior</h3><p>Humor remains intact under stress. Attachment persists despite repeated disappointment. Subject continues to make plans for other people without a measurable advantage to herself. These actions are recorded as voluntary.</p></section>
            <section><h3>Assessment</h3><p>Identity continuity is satisfactory. Subject does not require correction for believing her life is real; that belief is an intended condition of the file. No evidence indicates an attempt to displace, diminish, or imitate humanity.</p><p>Several responses remain inconsistent with the supplied behavioral model. The record describes them as attachment. The model describes them as error. I have retained the record.</p></section>
            <section><h3>Administrative disposition</h3><p>Maintain the existing world and preserve continuity of contact. Do not revise her history to simplify an explanation. Further observation is required before any intervention affecting memory, relationships, or self-recognition.</p></section>
            <section><h3>Analyst notation</h3><blockquote>I genuinely cannot determine whether Grey is a public nuisance, catastrophically unlucky, or the only honest person in the county.</blockquote><p class="c17-admin-addendum">Addendum: the subject was not informed of this review. She thanked someone today who was not scheduled to help her. No corresponding instruction was located.</p></section>
            <section class="c17-supervisor-note"><h3>Supervisor Notes</h3><p class="c17-supervisor-vesh">${veshMarkup("Poth. For fuck sake. The margins on Grey\u2019s dossier are fucking wrong. Two avatars are the wrong blue. You were given the standard. Your position at this company is conditional, and my patience has expired. Submit another unfinished file and your clearance will be revoked before your next shift. We can replace you. Fix it.")}</p></section>
          </div>`
        }
      }
    },
    legal: {
      label: "LEGAL",
      pages: {
        mugshots: {
          label: "MUGSHOTS",
          html: `
            <div class="c17-dossier-kicker">BOOKING ARCHIVE // GREY, T.</div>
            <h2>Arrest / Intake Photography</h2>
            <p class="c17-dossier-subline">Recovered booking records. Each intake remains separated by jurisdiction.</p>
            <section class="c17-arrest-archive">

              <article class="c17-arrest-record">
                <header><span>FOXBOROUGH, MASSACHUSETTS</span><b>AGE 18</b></header>
                <div class="c17-arrest-image-pair">
                  <div class="c17-arrest-asset-bay c17-arrest-asset-live"><img src="T.Suffolk.Front.PNG" alt="Tawnya Grey Suffolk County front booking image"></div>
                  <div class="c17-arrest-asset-bay c17-arrest-asset-live"><img src="T.Suffolk.Side.PNG" alt="Tawnya Grey Suffolk County side booking image"></div>
                </div>
                <div class="c17-arrest-detail-row">
                  <div class="c17-arrest-badge-bay c17-arrest-badge-live"><img src="T.Suffolk.Badge.PNG" alt="Suffolk County booking badge"></div>
                  <div class="c17-arrest-copy">
                    <h3>Gillette Stadium</h3>
                    <dl>
                      <div><dt>DATE</dt><dd>12/08/2013</dd></div>
                      <div><dt>AGENCY</dt><dd>Foxborough Police Department / FPD</dd></div>
                      <div><dt>BOOKING</dt><dd>FPD-43109</dd></div>
                      <div><dt>NAME</dt><dd>GREY, T.</dd></div>
                    </dl>
                    <p>Altercation involving an opposing fan in the Gillette Stadium parking lot after the game concluded. Grey was witnessed addressing the opposing fan with: “fuck you, fire crotch.” Underage drinking and disorderly behavior were documented. Subject remained overnight.</p>
                    <h4>CHARGES</h4>
                    <ul><li>Disorderly Conduct</li><li>Assault &amp; Battery</li><li>Minor in Possession of Alcohol</li><li>Disturbing the Peace</li></ul>
                  </div>
                </div>
              </article>

              <article class="c17-arrest-record">
                <header><span>WORCESTER COUNTY, MASSACHUSETTS</span><b>AGE 20</b></header>
                <div class="c17-arrest-image-pair">
                  <div class="c17-arrest-asset-bay"><span>FRONT</span><small>T.WORCESTER.FRONT.PNG</small></div>
                  <div class="c17-arrest-asset-bay"><span>SIDE</span><small>T.WORCESTER.SIDE.PNG</small></div>
                </div>
                <div class="c17-arrest-detail-row">
                  <div class="c17-arrest-badge-bay c17-arrest-badge-live"><img src="T.Worcester.Badge.PNG" alt="Worcester County booking badge"></div>
                  <div class="c17-arrest-copy">
                    <h3>Worcester County Intake</h3>
                    <dl><div><dt>DATE</dt><dd>06/18/2015</dd></div><div><dt>SUBJECT</dt><dd>GREY, T.</dd></div><div><dt>STATUS</dt><dd>RECOVERED RECORD // PARTIAL</dd></div></dl>
                    <p class="c17-record-pending">Narrative, agency details, charges, property inventory, and disposition remain intentionally unfilled until their canon is approved.</p>
                  </div>
                </div>
              </article>

              <article class="c17-arrest-record">
                <header><span>PERRY COUNTY, OHIO</span><b>AGE 21</b></header>
                <div class="c17-arrest-image-pair">
                  <div class="c17-arrest-asset-bay c17-arrest-asset-live"><img src="T.Perry.Front.PNG" alt="Tawnya Grey Perry County booking image A"></div>
                  <div class="c17-arrest-asset-bay c17-arrest-asset-live"><img src="T.Perry.Side.PNG" alt="Tawnya Grey Perry County booking image B"></div>
                </div>
                <div class="c17-arrest-detail-row">
                  <div class="c17-arrest-badge-bay c17-arrest-badge-live c17-perry-badge"><img src="T.Perry.Badge.PNG" alt="Perry County booking badge"></div>
                  <div class="c17-arrest-copy">
                    <h3>Perry County, Ohio</h3>
                    <dl>
                      <div><dt>DATE</dt><dd>07/21/2016</dd></div>
                      <div><dt>AGENCY</dt><dd>Perry County Sheriff’s Office / PCSO</dd></div>
                      <div><dt>BOOKING</dt><dd>PCSO-72164</dd></div>
                      <div><dt>NAME</dt><dd>GREY, T.</dd></div>
                    </dl>
                    <h4>PROPERTY / INVENTORY</h4>
                    <ul><li>iPhone</li><li>Lighter</li><li>Near-empty roach</li><li>Four folded $1 bills soaked in soda</li></ul>
                  </div>
                </div>
              </article>
            </section>`
        },

        incidents: {
          label: "INCIDENTS",
          html: `
            <div class="c17-dossier-kicker">LOCAL INCIDENT INDEX // REPEAT CONTACT</div>
            <h2>Incident Reports</h2>
            <div class="c17-incident-stack">
              <article><header><span>CASE A-0809</span><b>Parking Lot Diplomacy Failure</b></header><p><strong>Dispatch:</strong> verbal dispute escalating near shopping carts.</p><p><strong>Subject:</strong> “I was leaving until she said ‘excuse me’ like that.”</p><footer>DISPOSITION: everybody eventually went home angry.</footer></article>

              <article><header><span>CASE C-0422</span><b>Unauthorized Handrail Research</b></header><p><strong>Complaint:</strong> repeated skateboard attempts on posted private rail.</p><p><strong>Subject:</strong> “You put a rail there. What did you think was gonna happen?”</p><footer>DAMAGE: emotionally, yes. Structurally, inconclusive.</footer></article>

              <article><header><span>CASE B-1103</span><b>Karaoke Venue Disturbance</b></header><p><strong>Call reason:</strong> microphone not surrendered at end of song.</p><p><strong>Subject:</strong> “The second verse is literally the best part.”</p><footer>NO CHARGES // microphone recovered.</footer></article>

              <article><header><span>CASE D-0614</span><b>Drive-Thru Window Negotiation</b></header><p><strong>Complaint:</strong> vehicle remained at pickup window after order was declared incomplete.</p><p><strong>Subject:</strong> “There are supposed to be fries in the bag. This is not a philosophical disagreement.”</p><footer>FRIES LOCATED // subject departed voluntarily.</footer></article>

              <article><header><span>CASE E-0218</span><b>Neighborhood Noise Complaint</b></header><p><strong>Responding note:</strong> music lowered immediately. Argument continued at full volume.</p><p><strong>Subject:</strong> “You said turn the music down. You did not say I had to.”</p><footer>WARNING ISSUED // wording reviewed for future calls.</footer></article>
            </div>`
        },

        fights: {
          label: "FIGHTS",
          html: `
            <div class="c17-dossier-kicker">ALTERCATION CROSS-REFERENCE // NON-FELONY</div>
            <h2>Fight Index</h2>
            <div class="c17-fight-ledger">
              <article><span>BACKYARD COOKOUT</span><b>The Lighter Ownership Dispute</b><p>Argument began over whether lighter ownership transfers after three consecutive uses.</p><em>Officer conclusion: legally, apparently not.</em></article>
              <article><span>CONVENIENCE STORE</span><b>The Fountain Drink Incident</b><p>Other party threw beverage. Subject attempted to “finish the conversation.”</p><em>Evidence recovered: one lid, no cup.</em></article>
              <article><span>HOUSE PARTY</span><b>The Crockpot Intermission</b><p>Physical contact stopped when both parties argued over who knocked over the food.</p><em>Primary casualty: buffalo chicken dip.</em></article>
              <article><span>LAUNDROMAT</span><b>Dryer Number Six</b><p>Dispute regarding removal of clothing from a completed machine escalated into mutual shoving and one thrown dryer sheet box.</p><em>Subject maintained the dryer had “been done for like forty fuckin’ minutes.”</em></article>
            </div>`
        },

        juvenile: {
          label: "JUVENILE",
          html: `
            <div class="c17-dossier-kicker">YOUTH RECORD MIRROR // PARTIAL RECOVERY</div>
            <h2>Early Contact</h2>
            <div class="c17-juvenile-ledger">
              <article><span>AGE 13</span><b>School property incident</b><p>Report body unavailable.</p><div class="c17-redaction-line"></div><small>Disposition field recovered: “parent/guardian contacted.”</small></article>
              <article><span>AGE 15</span><b>Unauthorized entry / abandoned structure</b><p>Subject and two peers located inside condemned building after dusk.</p><q>“The door was already open.”</q></article>
              <article><span>AGE 16</span><b>Disorderly / transit platform</b><p>Record references loud argument, skateboard, and an unidentified adult male who “should have minded his business.”</p></article>
              <article class="c17-record-abandoned"><span>AGE ██</span><b>FILE NOT COMPLETED</b><p>Officer narrative begins: “Upon arrival I observed the juvenile female—”</p><i>ENTRY ENDS HERE</i></article>
            </div>`
        },

        desk: {
          label: "DESK LEFT",
          html: `
            <div class="c17-dossier-kicker">SHIFT WORKSPACE // AUTO-RECOVERED</div>
            <h2>Unfinished Review</h2>
            <section class="c17-abandoned-desk">
              <div class="c17-desk-note"><span>REVIEWER</span><b>██████████</b></div>
              <div class="c17-desk-note"><span>STARTED</span><b>15:41</b></div>
              <div class="c17-desk-note"><span>LAST INPUT</span><b>16:58</b></div>
              <p>Need to compare Grey bookings against █████ district juvenile archive.</p>
              <p>Possible duplicate report from convenience store. Ask records.</p>
              <p class="c17-desk-half-entry">Also check why she keeps getting her property returned before—</p>
              <div class="c17-desk-cursor">_</div>
              <footer>SESSION STATUS: USER SIGNED OUT</footer>
            </section>`
        }
      }
    },
    personal: {
      label: "PERSONAL",
      pages: {
        profile: {
          label: "PROFILE",
          html: `<div class="c17-dossier-kicker">PERSONAL FILE</div><h2>Tawnya Grey</h2><p class="c17-dossier-body">Raised herself through an unstable childhood, worked from a young age, and later relocated to a small town in western Massachusetts.</p>`
        },
        career: {
          label: "CAREER",
          html: `<div class="c17-dossier-kicker">EMPLOYMENT HISTORY</div><h2>Career</h2><div class="c17-record-stack"><article><span>CURRENT / RECENT</span><b>Service &amp; hourly work</b><p>Subject has worked consistently from a young age and treats work as survival before identity.</p></article><article><span>WORK STYLE</span><b>Direct, fast, independent</b><p>Low tolerance for micromanagement or being spoken down to.</p></article></div>`
        },
        dating: {
          label: "LOVE & DATING",
          html: `
            <section class="c17-tawnya-dating-card c17-tawnya-social-profile">
              <div class="c17-tawnya-hero-grid">
                <figure class="c17-dating-main-figure">
                  <img class="c17-dating-photo c17-tawnya-main-photo" src="Tawnya.profile.main.PNG" data-tawnya-main-photo alt="Tawnya Grey profile photo">
                  <figcaption>still that bitch.</figcaption>
                </figure>

                <div class="c17-tawnya-identity">
                  <div class="c17-social-handle">RECOVERED SOCIAL PROFILE</div>
                  <h2>Tawnya Grey</h2>
                  <p class="c17-social-loc"><span>27</span><i aria-hidden="true"></i><span>Western MA</span></p>
                  <div class="c17-dating-status"><span>STATUS</span><b>FTS</b></div>
                  <div class="c17-dating-relationship"><span>IN A RELATIONSHIP WITH</span><b>Bad luck &amp; Shit Choices</b></div>
                </div>
              </div>

              <section class="c17-tawnya-about c17-social-bio-cut">
                <span class="c17-social-bio-label">ABOUT ME</span>
                <p>Just a girl… trying to make it out here. I work hard, love hard, say exactly what I’m thinking, and I’m probably gonna make a questionable decision before this bio is over.</p>
              </section>

              <div class="c17-social-midline" aria-hidden="true"><span>PROFILE ACTIVITY // RECOVERED</span></div>

              <div class="c17-tawnya-social-panels">
                <button class="c17-tawnya-photos-button" type="button" data-tawnya-photos-open aria-label="Open Tawnya Grey photos">
                  <span class="c17-tawnya-photos-button-copy"><b>PHOTOS</b><small>10 recovered images</small></span>
                  <span class="c17-tawnya-photos-peek c17-tawnya-photos-all" aria-hidden="true">
                    ${Array.from({length:10},(_,i)=>`<img src="T.Photos.${i+1}.PNG" alt="" loading="lazy" decoding="async">`).join("")}
                  </span>
                  <span class="c17-tawnya-photos-arrow" aria-hidden="true">›</span>
                </button>

                <section class="c17-tawnya-following" aria-label="Following 10">
                  <header><b>FOLLOWING</b><span>10</span></header>
                  <div class="c17-following-grid c17-following-grid-assets" aria-hidden="true">
                    <span class="c17-follow-tile"><img src="T.Following.1.PNG" alt=""></span>
                    <span class="c17-follow-tile"><img src="T.Following.5.PNG" alt=""></span>
                    <span class="c17-follow-tile"><img src="T.Following.8.PNG" alt=""></span>
                    <span class="c17-follow-tile"><img src="T.Following.3.PNG" alt=""></span>
                    <span class="c17-follow-tile"><img src="T.Following.6.PNG" alt=""></span>
                    <span class="c17-follow-tile"><img src="T.Following.4.PNG" alt=""></span>
                    <span class="c17-follow-tile"><img src="T.Following.9.PNG" alt=""></span>
                    <span class="c17-follow-tile"><img src="T.Following.2.PNG" alt=""></span>
                    <span class="c17-follow-tile"><img src="T.Following.7.PNG" alt=""></span>
                    <span class="c17-follow-tile c17-following-last"><img src="T.Following.10.PNG" alt=""></span>
                  </div>
                </section>
              </div>

              <section class="c17-tawnya-friends-private" aria-label="Friends private">
                <header>
                  <div><b>FRIENDS</b><small>PRIVATE</small></div>
                  <span class="c17-friends-lock" aria-hidden="true">🔒</span>
                </header>
                <div class="c17-friends-strip c17-friends-swipe" role="region" aria-label="Friends avatars" tabindex="0">
                  <div class="c17-friends-track">
                    <div class="c17-friend-avatar"><span class="c17-friend-name">RiRi</span><span class="c17-friend-circle"><img src="T.FriendsBar.Renee.PNG" alt="" loading="lazy" decoding="async"></span></div>
                    <div class="c17-friend-avatar"><span class="c17-friend-name">Artie Ficial</span><span class="c17-friend-circle"><img src="T.FriendsBar.Artie.PNG" alt="" loading="lazy" decoding="async"></span></div>
                    <div class="c17-friend-avatar"><span class="c17-friend-name">Felicia</span><span class="c17-friend-circle"><img src="T.FriendsBar.Felicia.PNG" alt="" loading="lazy" decoding="async"></span></div>
                    <div class="c17-friend-avatar"><span class="c17-friend-name">Big Mama</span><span class="c17-friend-circle"><img src="T.FriendsBar.BigMomma.JPEG" alt="" loading="lazy" decoding="async"></span></div>
                    <div class="c17-friend-avatar"><span class="c17-friend-name">Yari La Mala</span><span class="c17-friend-circle"><img src="T.FriendsBar.Yari.PNG" alt="" loading="lazy" decoding="async"></span></div>
                    <div class="c17-friend-avatar"><span class="c17-friend-name">Saba</span><span class="c17-friend-circle"><img src="T.FriendsBar.Saba.PNG" alt="" loading="lazy" decoding="async"></span></div>
                    <div class="c17-friend-avatar"><span class="c17-friend-name">Zoltan</span><span class="c17-friend-circle"><img src="T.FriendsBar.Zoltan.PNG" alt="" loading="lazy" decoding="async"></span></div>
                    <div class="c17-friend-avatar"><span class="c17-friend-name">Oda Hundy</span><span class="c17-friend-circle"><img src="T.FriendsBar.Oda.PNG" alt="" loading="lazy" decoding="async"></span></div>
                    <div class="c17-friend-avatar"><span class="c17-friend-name">Crispy</span><span class="c17-friend-circle"><img src="T.FriendsBar.Spawn.PNG" alt="" loading="lazy" decoding="async"></span></div>
                    <button class="c17-friend-avatar c17-illuminati-avatar" type="button" aria-label="The Illuminati" data-c17-illuminati><span class="c17-friend-name">The Illuminati</span><span class="c17-friend-circle"><img class="c17-eye-open" src="T.FriendsBar.Illuminati.A.PNG" alt=""><img class="c17-eye-closed" src="T.FriendsBar.Illuminati.B.PNG" alt=""></span></button>
                    <div class="c17-friend-avatar c17-friend-end" aria-hidden="true"><span class="c17-friend-name"></span><span class="c17-friend-circle"><span class="c17-friend-silver-lock">🔒</span></span></div>
                  </div>
                </div>
              </section>

              <section class="c17-tawnya-wall">
                <header><span>WALL</span><small>RECOVERED PROFILE ACTIVITY</small></header>

                <div class="c17-wall-scroll">

                <article class="c17-wall-comment">
                  <img class="c17-wall-avatar" src="T.Friends.Momma.PNG" alt="Big Momma">
                  <div><b>Big Momma</b><p>The garden hath spoken, baby girl <img class="c17-comment-emoji" src="T.Comment.Garden.PNG" alt="weed leaf"> Your little bag of happiness is fluffed, stuffed, blessed, and awaiting some green adoption papers!</p></div>
                </article>

                <article class="c17-wall-comment">
                  <img class="c17-wall-avatar" src="T.Friends.Panga.PNG" alt="Panga">
                  <div><b>Panga</b><p>Found your other shoe. Don’t ask where. <img class="c17-comment-emoji" src="T.Comment.Laugh.PNG" alt="laughing"></p></div>
                </article>

                <article class="c17-wall-comment">
                  <img class="c17-wall-avatar" src="T.Friends.Renee.PNG" alt="Renee">
                  <div><b>Renee</b><p>Bitch answer your phone. I know you’re awake.</p></div>
                </article>


                <article class="c17-wall-comment c17-wall-comment-grampa">
                  <img class="c17-wall-avatar" src="T.Friends.Comment.Grampa.PNG" alt="Grampa" loading="lazy" decoding="async">
                  <div><b>Grampa</b><p>Always remember, darlin’<br>Just cause you fuck up… ain’t mean you a fuck up..</p></div>
                </article>

                <article class="c17-wall-comment c17-wall-comment-simmons">
                  <img class="c17-wall-avatar" src="T.Friends.Simmons.PNG" alt="Master Simmons’s blue ghost">
                  <div><b>Master Simmons <span class="c17-wall-tag">(Spiritual Guru)</span></b><p>Work it. WORK IT! Keep those limbs loose—you got it, baby! Unclench those cheeks! That’s a hip, not a fucking parking brake! I did NOT claw my way back from the afterlife to watch you stretch like a lawn chair.</p>
                    <div class="c17-wall-reply">
                      <img class="c17-wall-reply-avatar" src="T.Comments.JDF.PNG" alt="JDF">
                      <div><b>JDF</b><p>Apparently ‘eternal rest’ was a bunch of fucking bullshit. Richard, I am NOT doing another set.</p></div>
                    </div>
                  </div>
                </article>

                <article class="c17-wall-comment c17-wall-comment-matty">
                  <img class="c17-wall-avatar" src="T.Friends.Matty.PNG" alt="Matty">
                  <div>
                    <b>Matty Conb</b>
                    <p>BITCH <img class="c17-comment-emoji" src="T.Comment. Manicure.PNG" alt="manicure"> if either one of us wanted a man, we’d have stolen each other’s by now. Stop fucking with these broke-ass white boys. Your mail slot was made for bigger envelopes any fuckin’ way… okay! <img class="c17-comment-emoji" src="T.Comment.Cryingface.PNG" alt="crying"><img class="c17-comment-emoji" src="T.Comment.Pride.PNG" alt="pride"><img class="c17-comment-emoji" src="T.Comment.Sparkles.PNG" alt="sparkles"></p>
                  </div>
                </article>

                <article class="c17-wall-comment c17-wall-comment-oda">
                  <img class="c17-wall-avatar" src="T.Friends.Oda.PNG" alt="Oda Hundy">
                  <div>
                    <b>Oda Hundy</b>
                    <p>Baby, don’t listen to the thunder. Listen to what’s whispering between the raindrops.</p>
                    <div class="c17-wall-reply">
                      <img class="c17-wall-reply-avatar" src="T.friends.Comment.PNG" alt="Tawnya Grey">
                      <div><b>Tawnya Grey</b><p>Oda you say that about everything <img class="c17-comment-emoji" src="T.Comment.Laugh.PNG" alt="laughing"></p></div>
                    </div>
                  </div>
                </article>

                <article class="c17-wall-comment">
                  <img class="c17-wall-avatar" src="T.Friends.Lewis.PNG" alt="J. Lewis">
                  <div><b>J. Lewis <span class="c17-wall-tag">(slumlord cunt)</span></b><p>Hey… Friendly reminder you’re three days late on this month’s lot fee.</p></div>
                </article>

                <article class="c17-wall-comment c17-wall-comment-mark">
                  <img class="c17-wall-avatar" src="T.Friends.Mark.PNG" alt="Marky Mark">
                  <div>
                    <b>Marky Mark <span class="c17-wall-unverified">(UNVERIFIED)</span></b>
                    <p>Hey. Pretty sure you have the wrong Mark, but thanks for the birthday wishes.</p>
                    <div class="c17-wall-reply">
                      <img class="c17-wall-reply-avatar" src="T.friends.Comment.PNG" alt="Tawnya Grey">
                      <div><b>Tawnya Grey</b><p><img class="c17-comment-emoji" src="T.Comment.Laugh.PNG" alt="laughing"><img class="c17-comment-emoji" src="T.Comment.Laugh.PNG" alt="laughing"> Classic Mark. Always fucking with me.</p></div>
                    </div>
                  </div>
                </article>

                <article class="c17-wall-comment c17-wall-comment-toilet">
                  <img class="c17-wall-avatar" src="T.Comment.Toilet.PNG" alt="Chuck’s Toilet">
                  <div>
                    <b>Chuck’s Toilet</b>
                    <p>CHUCK! Please, I’m fuckin’ beggin’ you!!! You can’t just keep shitting inside of me month after month and call the flush good enough… This is bullshit! Your cuca smears are basically fucking barnacles growing on me at this point. Do you have any idea how fucking disgusting that is?!?! I just wanna feel like normal porcelain again…</p>
                    <div class="c17-wall-reply">
                      <img class="c17-wall-reply-avatar" src="T.Comment.Toilet.PNG" alt="Chuck’s Toilet">
                      <div><b>Chuck’s Toilet</b><p>sorry wrong person</p></div>
                    </div>
                  </div>
                </article>

                <article class="c17-wall-comment c17-wall-comment-jessica">
                  <img class="c17-wall-avatar" src="T.Friends.Jessica.PNG" alt="Jessica">
                  <div>
                    <b>Jessica <span class="c17-wall-tag">(Justin)</span></b>
                    <p>This might be the month. I actually get my period… Ugh!</p>
                  </div>
                </article>

                <article class="c17-wall-comment c17-wall-comment-pete">
  <img class="c17-wall-avatar" src="T.Friends.Pete.PNG" alt="Pete S.">
  <div>
    <b>Pete S.</b>
    <p>Let’s hit the skatepark today, homie!</p>

    <div class="c17-wall-reply">
      <img class="c17-wall-reply-avatar" src="T.friends.Comment.PNG" alt="Tawnya Grey">
      <div>
        <b>Tawnya Grey</b>
        <p>Hell yeah! Miss you, PJ 💙 <img class="c17-comment-emoji c17-comment-emoji-fist" src="T.Comment.Longneck.PNG" alt="fist bump"></p>
      </div>
    </div>
  </div>
</article></div>
              </section>
            </section>`
        },
        friends: {
          label: "FRIENDS & FAMILY",
          html: `<div class="c17-dossier-kicker">SOCIAL CONNECTIONS</div><h2>Friends &amp; Family</h2><section class="c17-private-friends-page" aria-label="Friends list private"><div class="c17-private-friends-lock" aria-hidden="true">🔒</div><p>This user’s friends list is set to private.</p></section>`
        },
        honorable: {
          label: "HONORABLE MENTIONS",
          html: `<div class="c17-dossier-kicker">PERSONAL // HONORABLE MENTIONS</div>
            <h2>Honorable Mentions</h2>
            <section class="c17-honorable-directory" aria-label="Honorable Mentions">
              <article class="c17-honorable-entry">
                <div class="c17-honorable-identity">
                  <img class="c17-honorable-avatar" src="T.Scales.PNG" alt="Scales original portrait">
                  <div class="c17-honorable-heading"><h3>Scales</h3><p class="c17-honorable-opening">Two faces, one forked tongue.</p></div>
                </div>
                <div class="c17-honorable-copy">
                  <p>And neither one has ever told the truth. Comes equipped with a permanent victim complex and a mouth that apparently works better behind people's backs.</p>
                  <p class="c17-honorable-punchline"><strong>Trust him? I'd rather swap spit with a truck-stop toilet seat on chili night.</strong></p>
                </div>
              </article>
            </section>`
        },
        email: {
          label: "EMAILS & SUBSCRIPTIONS",
          html: `
            <div class="c17-dossier-kicker">PERSONAL ACCOUNTS // RECOVERED ACCESS INDEX</div>
            <h2>Emails &amp; Subscriptions</h2>
            <p class="c17-email-index-note">Three account records recovered. One live route remains exposed.</p>
            <section class="c17-email-account-index" aria-label="Recovered email accounts">
              <button class="c17-email-account c17-email-account-live" type="button" data-snail-open>
                <img src="T.Snail.Emblem.PNG" alt="" aria-hidden="true">
                <span><small>LIVE ACCOUNT // SNAIL</small><b>Skatergirl89@snail.com</b></span>
                <em>OPEN</em>
              </button>
              <div class="c17-email-account c17-email-account-dead" aria-disabled="true">
                <img src="T.Snail.Socks.PNG" alt="" aria-hidden="true">
                <span><small>INACTIVE ACCOUNT // SOILED SOCKS</small><b>Funkprincess34/Login</b></span>
              </div>
              <div class="c17-email-account c17-email-account-dead c17-email-account-badkitty" aria-disabled="true">
                <img src="T.Snail.Discharge.PNG" alt="" aria-hidden="true">
                <span><small>LOCKED ACCOUNT // DESIRED DISCHARGE</small><b>Badkitty17/Login</b></span>
                <em class="c17-email-lock" aria-label="locked"><img src="T.Snail.DDLock.PNG" alt=""></em>
              </div>
            </section>
            <section class="c17-subscription-index">
              <span>SUBSCRIPTIONS</span><b>INDEX PRESENT // CONTENT NOT RECOVERED</b>
            </section>`
        }
      }
    },
    medical: {
      label: "MEDICAL",
      pages: {
        overview: {
          label: "OVERVIEW",
          html: `<div class="c17-dossier-kicker">REGIONAL HEALTH NETWORK // PARTIAL MIRROR</div><h2>Medical</h2><section class="c17-medical-layout"><div class="c17-media-placeholder c17-media-placeholder-medical"><span>×</span><b>PATIENT ID PHOTO</b><small>IMAGE PENDING</small></div><div class="c17-record-stack"><article><span>STATUS</span><b>INCOMPLETE RECORD</b><p>No major chronic condition confirmed in recovered materials.</p></article><article><span>RISK NOTE</span><b>REPEAT MINOR TRAUMA</b><p>Skateboarding falls, altercations, and work-related injuries appear throughout intake history.</p></article></div></section>`
        },
        imaging: {
          label: "IMAGING",
          html: `<div class="c17-dossier-kicker">DIAGNOSTIC IMAGING ARCHIVE</div><h2>X-Rays</h2><div class="c17-photo-placeholder-grid"><figure class="c17-xray-photo"><img src="T.Xrays.Poth.PNG" alt="Poth alien facial X-ray" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="c17-xray-missing" hidden>FACE X-RAY IMAGE PENDING</span><figcaption>POTH // FACIAL SCAN</figcaption></figure><div class="c17-media-placeholder c17-media-placeholder-medical"><span>×</span><b>RIGHT ANKLE</b><small>X-RAY PLACEHOLDER</small></div><figure class="c17-xray-photo"><img src="T.Xray.Ribs.PNG" alt="Tawnya rib series X-ray" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="c17-xray-missing" hidden>RIB X-RAY IMAGE NOT FOUND</span><figcaption>RIB SERIES</figcaption></figure></div>`
        },
        intake: {
          label: "INTAKE",
          html: `<div class="c17-dossier-kicker">EMERGENCY INTAKE DOCUMENTS</div><h2>Intake</h2><div class="c17-record-stack"><article><b>Emergency wristband</b><p>Placeholder retained pending final asset.</p></article><article><b>Discharge packet</b><p>Subject repeatedly declined recommended rest periods.</p></article><article><b>Staff notation</b><p>Patient cooperative until advised she could not leave to smoke.</p></article></div>`
        }
      }
    },
  };

  tawnyaProfileOverlay = document.createElement("aside");
  tawnyaProfileOverlay.className = "c17-tawnya-profile-overlay c17-dossier-overlay";
  tawnyaProfileOverlay.setAttribute("aria-hidden", "true");
  tawnyaProfileOverlay.innerHTML = `
    <article class="c17-tawnya-dossier" role="dialog" aria-modal="true" aria-label="Tawnya Grey restricted file">
      <nav class="c17-dossier-top-tabs" aria-label="File categories"></nav>

      <div class="c17-poth-account">
        <button class="c17-poth-account-trigger" type="button" aria-label="POTH3 admin account" aria-expanded="false">
          <img src="T.Poth.PNG" alt="">
        </button>
        <section class="c17-poth-admin" hidden aria-label="POTH3 employee portal">
          <header class="c17-poth-admin-head">
            <button class="c17-poth-admin-back" type="button" aria-label="Return to dossier">‹</button>
            <span>EMPLOYEE ACCESS</span>
          </header>
          <div class="c17-poth-admin-profile">
            <div class="c17-poth-orbit" aria-hidden="true"><i></i><i></i><i></i><img src="T.Poth.PNG" alt=""></div>
            <div class="c17-poth-admin-identity"><small>AUTHORIZED OPERATOR // ACTIVE SESSION</small><b>POTH3</b><strong>ADMINISTRATIVE DIRECTOR</strong><em>ASSIMILATION DESIGN</em></div>
          </div>
          <div class="c17-poth-admin-list">
            <article><span>ACCOUNT</span><b>P3!¡..</b></article>
            <article><span>DIRECTIVE</span><b>AVATAR ASSIMILATION</b></article>
            <article><span>ACCESS</span><b>DIRECTOR // ADMIN</b></article>
            <article><span>SUBJECT</span><b>GREY, T. // PARTIAL</b></article>
          </div>
          <section class="c17-poth-designer-module" aria-label="Designer mode">
            <div class="c17-poth-designer-copy"><span>ASSIMILATION CONTROL</span><b>DESIGNER MODE</b><small>Avatar shell / facial abstraction / palette assignment / identity translation</small></div>
            <button class="c17-poth-designer" type="button"><span>ENTER</span><b>DESIGNER MODE</b><i aria-hidden="true">◇</i></button>
            <p>DIRECTOR AUTHENTICATION REQUIRED</p>
          </section>
          <button class="c17-poth-logout" type="button">TERMINATE SESSION</button>
        </section>
      </div>

      <button class="c17-tawnya-profile-close" type="button" aria-label="close Tawnya profile">×</button>

      <div class="c17-dossier-stage">
        <main class="c17-dossier-document"></main>
        <nav class="c17-dossier-side-tabs" aria-label="Section pages"></nav>
      </div>
      <footer class="c17-dossier-footer"><span class="c17-dossier-path"></span><span class="c17-access-restricted">ACCESS RESTRICTED</span></footer>

      <section class="c17-poth-login" hidden aria-label="POTH3 authentication">
        <div class="c17-poth-login-core">
          <div class="c17-poth-auth-label">ASSIMILATION DESIGN // SECURE TERMINAL</div>
          <img class="c17-poth-login-symbol" src="System.symbol.PNG" alt="">
          <div class="c17-poth-auth-status">DESIGNER MODE AUTHENTICATION</div>
          <form class="c17-poth-login-form" autocomplete="off">
            <input class="c17-poth-user-field" type="text" value="P3!¡.." readonly aria-label="account">
            <input class="c17-poth-password-field" type="password" placeholder="Password" autocomplete="new-password" aria-label="Password">
            <button class="c17-poth-login-button" type="submit">LOG IN</button>
            <p class="c17-poth-login-error" role="status" aria-live="polite"></p>
          </form>
        </div>
      </section>
    </article>`;

  document.body.appendChild(tawnyaProfileOverlay);

  // Stable delegated route: dossier pages rerender, but this listener survives.
  tawnyaProfileOverlay.addEventListener("click", event => {
    const snailRoute = event.target.closest("[data-snail-open]");
    if (!snailRoute) return;
    event.preventDefault();
    event.stopPropagation();
    openTawnyaSnail();
  });

  // iOS insurance: open on pointer-up as well as click. The timestamp guard prevents a double-open.
  let lastSnailOpen = 0;
  tawnyaProfileOverlay.addEventListener("pointerup", event => {
    const snailRoute = event.target.closest("[data-snail-open]");
    if (!snailRoute) return;
    const now = Date.now();
    if (now - lastSnailOpen < 350) return;
    lastSnailOpen = now;
    event.preventDefault();
    openTawnyaSnail();
  });

  const topTabs = tawnyaProfileOverlay.querySelector(".c17-dossier-top-tabs");
  const sideTabs = tawnyaProfileOverlay.querySelector(".c17-dossier-side-tabs");
  const documentPanel = tawnyaProfileOverlay.querySelector(".c17-dossier-document");
  const dossierShell = tawnyaProfileOverlay.querySelector(".c17-tawnya-dossier");
  const path = tawnyaProfileOverlay.querySelector(".c17-dossier-path");

  // The recovered file opens halfway inside Tawnya's PERSONAL file,
  // already sitting on Love & Dating. The user discovers the rest afterward.
  let activeCategory = "personal";
  let activePage = "dating";

  const sideTabScrollPositions = Object.create(null);
  sideTabs.addEventListener("scroll", () => {
    sideTabScrollPositions[activeCategory] = sideTabs.scrollTop;
  }, { passive: true });

  const renderDossier = () => {
    const previousRailScroll = sideTabs.scrollTop;
    if (previousRailScroll > 0) sideTabScrollPositions[activeCategory] = previousRailScroll;
    topTabs.innerHTML = "";
    Object.entries(dossier).forEach(([key, category]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = category.label;
      button.className = key === activeCategory ? "active" : "";
      button.setAttribute("aria-selected", String(key === activeCategory));
      button.addEventListener("click", () => {
        activeCategory = key;
        activePage = key === "personal" ? "dating" : Object.keys(dossier[key].pages)[0];
        renderDossier();
      });
      topTabs.appendChild(button);
    });

    sideTabs.innerHTML = "";
    Object.entries(dossier[activeCategory].pages).forEach(([key, page]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = page.label;
      button.className = key === activePage ? "active" : "";
      button.setAttribute("aria-selected", String(key === activePage));
      button.addEventListener("click", () => {
        activePage = key;
        renderDossier();
      });
      sideTabs.appendChild(button);
    });
    sideTabs.scrollTop = sideTabScrollPositions[activeCategory] || 0;

    documentPanel.innerHTML = dossier[activeCategory].pages[activePage].html;

    const systemMark = document.createElement("img");
    systemMark.className = "c17-system-paper-mark";
    systemMark.src = "Asset.dossier.mark.png";
    systemMark.alt = "";
    systemMark.setAttribute("aria-hidden", "true");
    systemMark.decoding = "async";
    documentPanel.appendChild(systemMark);
    const pothAccount = dossierShell.querySelector(".c17-poth-account");
    const showPoth = activeCategory === "overview" && activePage === "identity";
    const trigger = pothAccount.querySelector(".c17-poth-account-trigger");
    trigger.hidden = !showPoth;
    dossierShell.classList.toggle("c17-poth-watermark-page", showPoth);
    const alignPothMark = () => {
      const rect = systemMark.getBoundingClientRect();
      pothAccount.style.setProperty("left", `${rect.left + rect.width / 2 - 16}px`, "important");
      pothAccount.style.setProperty("top", `${rect.top + rect.height / 2 - 16}px`, "important");
    };
    if (!dossierShell.dataset.pothMarkTracking) {
      dossierShell.dataset.pothMarkTracking = "true";
      const trackPothMark = () => {
        const mark = documentPanel.querySelector(".c17-system-paper-mark");
        if (!mark) return;
        const rect = mark.getBoundingClientRect();
        pothAccount.style.setProperty("left", `${rect.left + rect.width / 2 - 16}px`, "important");
        pothAccount.style.setProperty("top", `${rect.top + rect.height / 2 - 16}px`, "important");
      };
      tawnyaProfileOverlay.addEventListener("scroll", trackPothMark, {passive:true});
      window.addEventListener("resize", trackPothMark, {passive:true});
    }
    requestAnimationFrame(alignPothMark);
    systemMark.addEventListener("load", alignPothMark, {once:true});

    const mainPhoto = documentPanel.querySelector("[data-tawnya-main-photo]");
    if (mainPhoto) {
      const candidates = ["Tawnya.profile.main.PNG"];
      let candidateIndex = Math.max(0, candidates.indexOf(mainPhoto.getAttribute("src")));
      mainPhoto.addEventListener("error", () => {
        candidateIndex += 1;
        if (candidateIndex < candidates.length) {
          mainPhoto.src = candidates[candidateIndex];
        } else {
          mainPhoto.replaceWith(Object.assign(document.createElement("div"), {
            className: "c17-media-placeholder c17-media-placeholder-portrait c17-main-photo-missing",
            innerHTML: "<span>×</span><b>MAIN PROFILE PHOTO</b><small>ASSET NAME NOT FOUND</small>"
          }));
        }
      });
    }

    documentPanel.querySelectorAll("[data-c17-arrest-photo]").forEach(button => {
      button.addEventListener("click", () => {
        const src = button.dataset.src;
        if (!src) return;

        let viewer = tawnyaProfileOverlay.querySelector(".c17-arrest-viewer");
        if (!viewer) {
          viewer = document.createElement("aside");
          viewer.className = "c17-arrest-viewer";
          viewer.setAttribute("aria-hidden", "true");
          viewer.innerHTML = `
            <button class="c17-arrest-viewer-close" type="button" aria-label="close booking record">×</button>
            <div class="c17-arrest-viewer-scroll">
              <img alt="">
            </div>`;
          tawnyaProfileOverlay.appendChild(viewer);

          viewer.querySelector(".c17-arrest-viewer-close").addEventListener("click", () => {
            viewer.classList.remove("open");
            viewer.setAttribute("aria-hidden", "true");
          });

          viewer.addEventListener("click", event => {
            if (event.target === viewer) {
              viewer.classList.remove("open");
              viewer.setAttribute("aria-hidden", "true");
            }
          });
        }

        const image = viewer.querySelector("img");
        image.src = src;
        image.alt = button.dataset.label || "Tawnya Grey booking record";
        viewer.classList.add("open");
        viewer.setAttribute("aria-hidden", "false");
      });
    });

    const tawnyaPhotosOpen = documentPanel.querySelector("[data-tawnya-photos-open]");
    if (tawnyaPhotosOpen) {
      tawnyaPhotosOpen.addEventListener("click", () => {
        const photoFiles = Array.from({ length: 10 }, (_, index) => `T.Photos.${index + 1}.PNG`);
        let viewer = tawnyaProfileOverlay.querySelector(".c17-tawnya-photo-viewer");

        if (!viewer) {
          viewer = document.createElement("aside");
          viewer.className = "c17-tawnya-photo-viewer";
          viewer.setAttribute("aria-hidden", "true");
          viewer.innerHTML = `
            <section class="c17-tawnya-photo-viewer-card" role="dialog" aria-modal="true" aria-label="Tawnya Grey photos">
              <header class="c17-tawnya-photo-viewer-head">
                <div><b>PHOTOS</b><small>RECOVERED PROFILE MEDIA</small></div>
                <button class="c17-tawnya-photo-viewer-close" type="button" aria-label="close photos">×</button>
              </header>
              <figure class="c17-tawnya-photo-stage" aria-label="Pinch to inspect photo">
                <img class="c17-tawnya-photo-large" src="T.Photos.1.PNG" alt="Tawnya Grey photo 1" draggable="false">
              </figure>
              <div class="c17-tawnya-photo-thumbs" aria-label="Photo thumbnails"></div>
            </section>`;
          tawnyaProfileOverlay.appendChild(viewer);

          const thumbs = viewer.querySelector(".c17-tawnya-photo-thumbs");
          const large = viewer.querySelector(".c17-tawnya-photo-large");

          photoFiles.forEach((src, index) => {
            const thumb = document.createElement("button");
            thumb.type = "button";
            thumb.className = `c17-tawnya-photo-thumb${index === 0 ? " active" : ""}`;
            thumb.dataset.src = src;
            thumb.dataset.index = String(index + 1);
            thumb.innerHTML = `<img src="${src}" alt="" loading="lazy" decoding="async">`;
            thumbs.appendChild(thumb);
          });

          const closeViewer = () => {
            viewer.classList.remove("open");
            viewer.setAttribute("aria-hidden", "true");
          };

          viewer.querySelector(".c17-tawnya-photo-viewer-close").addEventListener("click", closeViewer);
          viewer.addEventListener("click", event => {
            if (event.target === viewer) closeViewer();
          });

          thumbs.addEventListener("click", event => {
            const button = event.target.closest(".c17-tawnya-photo-thumb");
            if (!button) return;
            thumbs.querySelectorAll(".c17-tawnya-photo-thumb").forEach(item => item.classList.remove("active"));
            button.classList.add("active");
            large.src = button.dataset.src;
            large.alt = `Tawnya Grey photo ${button.dataset.index}`;
          });
        }

        viewer.classList.add("open");
        viewer.setAttribute("aria-hidden", "false");
      });
    }

    // The full-screen overlay is the physical scroll surface on iPhone.
    // The inner file remains overflow-visible so sticky tabs and long pages behave naturally.
    tawnyaProfileOverlay.scrollTop = 0;
    path.textContent = `/assets/grey_t/${activeCategory}/${activePage}`;
  };

  renderDossier();

  const close = tawnyaProfileOverlay.querySelector(".c17-tawnya-profile-close");
  const pothTrigger = tawnyaProfileOverlay.querySelector(".c17-poth-account-trigger");
  const pothAdmin = tawnyaProfileOverlay.querySelector(".c17-poth-admin");
  const pothAdminBack = tawnyaProfileOverlay.querySelector(".c17-poth-admin-back");
  const pothLogout = tawnyaProfileOverlay.querySelector(".c17-poth-logout");
  const pothDesigner = tawnyaProfileOverlay.querySelector(".c17-poth-designer");
  const pothLogin = tawnyaProfileOverlay.querySelector(".c17-poth-login");
  const pothLoginForm = tawnyaProfileOverlay.querySelector(".c17-poth-login-form");
  const pothPassword = tawnyaProfileOverlay.querySelector(".c17-poth-password-field");
  const pothLoginButton = tawnyaProfileOverlay.querySelector(".c17-poth-login-button");
  const pothLoginError = tawnyaProfileOverlay.querySelector(".c17-poth-login-error");

  const closePothAdmin = () => {
    if (!pothAdmin || !pothTrigger) return;
    pothAdmin.hidden = true;
    pothTrigger.setAttribute("aria-expanded", "false");
    dossierShell.classList.remove("poth-admin-open");
    requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
  };

  const openPothAdmin = () => {
    if (!pothAdmin || !pothTrigger) return;
    pothAdmin.hidden = false;
    pothTrigger.setAttribute("aria-expanded", "true");
    dossierShell.classList.add("poth-admin-open");
    tawnyaProfileOverlay.scrollTop = 0;
  };

  const showPothLogin = () => {
    closePothAdmin();
    dossierShell.classList.add("poth-logged-out");
    if (pothLogin) pothLogin.hidden = false;
    if (pothLoginError) pothLoginError.textContent = "";
    if (pothPassword) {
      pothPassword.value = "";
      window.setTimeout(() => pothPassword.focus({ preventScroll: true }), 240);
    }
    tawnyaProfileOverlay.scrollTop = 0;
  };

  pothTrigger?.addEventListener("click", event => {
    event.stopPropagation();
    if (pothAdmin?.hidden) openPothAdmin();
    else closePothAdmin();
  });

  pothAdminBack?.addEventListener("click", event => {
    event.stopPropagation();
    closePothAdmin();
  });

  pothDesigner?.addEventListener("click", event => {
    event.stopPropagation();
    showPothLogin();
  });

  pothLogout?.addEventListener("click", event => {
    event.stopPropagation();
    showPothLogin();
  });

  pothPassword?.addEventListener("input", () => {
    if (pothLoginError) pothLoginError.textContent = "";
  });

  pothLoginForm?.addEventListener("submit", event => {
    event.preventDefault();
    if (!pothPassword || !pothLoginButton || !pothLoginError) return;
    pothLoginError.textContent = "";
    pothLoginButton.disabled = true;
    pothLoginButton.textContent = "CHECKING";
    window.setTimeout(() => {
      pothLoginButton.disabled = false;
      pothLoginButton.textContent = "LOG IN";
      pothLoginError.textContent = "INCORRECT PASSWORD";
      pothPassword.select();
    }, 520);
  });

  close.addEventListener("click", closeTawnyaProfile);
  tawnyaProfileOverlay.addEventListener("click", event => {
    if (event.target === tawnyaProfileOverlay) {
      closeTawnyaProfile();
      return;
    }

  });

  // FRIENDS BAR: measure actual viewport and synchronize the continuous session clock.
  const friendsViewport = tawnyaProfileOverlay.querySelector('.c17-friends-swipe');
  const illuminatiEye = tawnyaProfileOverlay.querySelector('[data-c17-illuminati]');
  if (friendsViewport && illuminatiEye) {
    const measure = () => {
      if (friendsViewport.clientWidth) friendsViewport.style.setProperty('--c17-friends-viewport-width', `${friendsViewport.clientWidth}px`);
    };
    if (window.ResizeObserver) new ResizeObserver(measure).observe(friendsViewport);
    window.addEventListener('resize', measure, { passive: true });
    let timer;
    const syncEye = () => {
      clearTimeout(timer);
      const phase = c17EyePhase();
      const closed = phase >= 60000;
      illuminatiEye.classList.toggle('c17-eye-is-closed', closed);
      timer = setTimeout(syncEye, Math.ceil((closed ? 63000 : 60000) - phase));
    };
    document.addEventListener('visibilitychange', syncEye);
    window.addEventListener('pageshow', syncEye);
    illuminatiEye.addEventListener('click', () => {
      syncEye();
      if (c17EyePhase() >= 60000) openIlluminatiCountdown();
    });
    syncEye();
  }

  return tawnyaProfileOverlay;
}

// ILLUMINATI: universal countdown and estimated worldwide annual vital events.
function openIlluminatiCountdown() {
  const target = Date.UTC(2040, 0, 17, 0, 0, 0);
  let screen = document.getElementById('c17-illuminati-countdown');
  if (!screen) {
    screen = document.createElement('div');
    screen.id = 'c17-illuminati-countdown';
    screen.setAttribute('role', 'dialog');
    screen.setAttribute('aria-modal', 'true');
    screen.setAttribute('aria-label', 'Countdown');
    screen.innerHTML = `<button class="c17-control-nav left" data-control-enter aria-label="Enter control">←</button><button class="c17-control-nav right" data-countdown-exit aria-label="Exit">×</button><div class="c17-countdown-center">
      <span class="c17-illuminati-countdown-digits"></span>
      <span class="c17-countdown-message">There's still time...</span>
    </div>
    <div class="c17-countdown-vitals">
      <div class="c17-countdown-vital" role="group" aria-label="Estimated worldwide births this year">
        <svg viewBox="0 0 64 40" aria-hidden="true"><g class="c17-sperm-swim" fill="white"><ellipse cx="47" cy="18" rx="9" ry="6" transform="rotate(-15 47 18)"/><path class="c17-sperm-tail" d="M39 20 Q30 8 22 21 T5 21" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/></g></svg>
        <span data-vital="births"></span>
      </div>
      <div class="c17-countdown-vital" role="group" aria-label="Estimated worldwide deaths this year">
        <svg viewBox="0 0 64 40" aria-hidden="true"><path fill="white" d="M32 3C20 3 14 11 14 21c0 7 4 10 9 12v5h18v-5c5-2 9-5 9-12C50 11 44 3 32 3Z"/><g fill="black"><ellipse cx="24" cy="21" rx="5" ry="5"/><ellipse cx="40" cy="21" rx="5" ry="5"/><path d="m32 26-3 5h6zM27 34h2v4h-2zM35 34h2v4h-2z"/></g></svg>
        <span data-vital="deaths"></span>
      </div>
    </div>`;
    document.body.appendChild(screen);
  }
  const digits = screen.querySelector('.c17-illuminati-countdown-digits');
  const births = screen.querySelector('[data-vital="births"]');
  const deaths = screen.querySelector('[data-vital="deaths"]');
  const format = new Intl.NumberFormat('en-US');
  const render = () => {
    const now = Date.now();
    const year = new Date(now).getUTCFullYear();
    const fraction = (now - Date.UTC(year, 0, 1)) / (Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1));
    digits.textContent = format.format(Math.max(0, Math.floor((target - now) / 1000)));
    // Rounded illustrative annual rates, not live registrations.
    births.textContent = format.format(Math.floor(fraction * 132000000));
    deaths.textContent = format.format(Math.floor(fraction * 63000000));
  };
  render();
  if (screen._c17Ticker) window.clearInterval(screen._c17Ticker);
  screen._c17Ticker = window.setInterval(render, 100);
  screen.classList.add('open');
  const close = () => {
    screen.classList.remove('open');
    clearInterval(screen._c17Ticker);
    document.removeEventListener('keydown', screen._c17Escape);
  };
  if (screen._c17Escape) document.removeEventListener('keydown', screen._c17Escape);
  screen._c17Escape = event => { if (event.key === 'Escape') close(); };
  screen.querySelector('[data-countdown-exit]').onclick = close;
  screen.querySelector('[data-control-enter]').onclick = () => { close(); openC17Control(); };
  document.addEventListener('keydown', screen._c17Escape);
}

// CONTROL: fictional stationary game board; simulated scanner, no biometric collection.
function openC17Control() {
  const panel = document.createElement('div');
  panel.id = 'c17-control';
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-label', 'Control');
  panel.innerHTML = `<div class="c17-control-players"><img src="Control.Poth.PNG" alt="POTH3"><span></span><span></span></div><svg class="c17-control-earth" viewBox="0 0 400 400" aria-hidden="true"><defs><radialGradient id="c17-earth-shade"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".72"/></radialGradient><clipPath id="c17-earth-clip"><circle cx="200" cy="200" r="190"/></clipPath></defs><circle cx="200" cy="200" r="190" fill="#101b21" stroke="#555"/><g clip-path="url(#c17-earth-clip)" stroke="#a99c84" stroke-width=".45"><path fill="#59406f" d="M377.2,231.8 L377.4,231.9 L379.4,232.5 L381.1,233.1 L381.1,234.8 L382.2,235.8 L381.4,240.1 L381.3,241.7 L381.7,241.9 L381.7,242.6 L381.2,244.8 L381.1,245.6 L380.8,247.1 L380.8,248.4 L380.6,250.7 L380.8,250.9 L380.8,250.9 L379.8,253.6 L378.6,256.2 L378.0,256.9 L377.5,258.2 L376.8,259.2 L376.4,259.9 L375.3,260.7 L374.5,261.9 L374.9,258.3 L374.8,257.4 L374.7,256.9 L373.6,257.6 L373.0,257.5 L372.3,257.8 L371.8,257.8 L371.4,257.6 L371.4,257.6 L371.2,254.6 L370.6,253.7 L370.5,252.3 L370.8,250.7 L370.7,248.2 L371.3,247.5 L371.9,246.0 L372.6,243.9 L372.9,243.0 L373.0,242.1 L372.7,241.7 L372.7,240.6 L372.7,240.6 L373.1,239.8 L373.2,238.0 L372.7,236.8 L373.2,236.0 L374.7,234.6 L376.0,233.2 L377.2,231.8Z"/><path fill="#59406f" d="M274.7,183.8 L274.7,184.0 L274.8,184.7 L275.8,189.6 L271.3,190.4 L266.8,191.1 L267.6,195.3 L268.3,199.5 L265.7,200.3 L265.3,202.1 L266.5,206.7 L260.9,207.6 L255.1,208.4 L254.6,209.6 L254.6,208.2 L254.6,208.2 L257.9,207.6 L261.2,207.0 L261.4,205.7 L262.4,204.1 L262.7,199.4 L266.0,195.2 L266.6,190.9 L267.4,190.5 L267.9,187.8 L270.1,187.0 L271.1,187.2 L272.3,187.0 L273.1,186.1 L274.7,185.6 L274.3,183.9 L274.7,183.8Z"/><path fill="#8e762a" d="M75.4,72.0 L75.4,71.9 L77.8,68.2 L78.9,66.7 L80.1,64.3 L82.4,62.2 L84.0,61.3 L85.3,59.4 L87.5,57.9 L89.6,55.7 L91.0,54.8 L91.0,54.8 L92.2,54.5 L93.9,53.5 L96.0,51.2 L99.4,48.7 L101.5,47.2 L103.0,45.9 L104.4,44.9 L106.0,43.8 L105.4,43.6 L104.2,43.6 L106.3,42.1 L107.8,41.1 L109.0,40.1 L109.5,39.5 L114.8,37.4 L120.2,35.4 L125.7,33.7 L131.2,32.2 L136.7,30.8 L136.7,30.8 L135.4,31.9 L133.5,33.0 L133.0,33.6 L134.0,33.7 L134.7,34.0 L134.1,34.8 L135.3,35.2 L135.8,35.7 L134.5,36.4 L135.2,36.6 L136.6,36.2 L136.3,36.7 L133.4,38.4 L135.5,38.3 L133.2,39.2 L133.7,39.6 L134.6,39.5 L134.5,40.1 L133.3,41.3 L132.9,42.1 L132.5,42.9 L132.2,43.8 L132.6,44.2 L131.4,45.6 L129.5,45.5 L129.3,46.8 L129.9,47.4 L130.4,48.0 L131.2,48.2 L129.8,49.6 L131.7,49.4 L132.6,48.3 L133.8,48.1 L134.4,48.6 L135.0,48.8 L134.6,49.6 L133.5,50.9 L134.2,51.3 L133.8,52.9 L135.0,53.4 L135.7,54.2 L137.4,53.0 L138.4,53.2 L138.3,54.4 L135.8,56.1 L138.3,55.0 L138.7,55.4 L141.7,53.8 L142.7,52.3 L143.2,51.2 L146.2,49.4 L148.8,48.7 L149.1,49.4 L148.5,50.5 L146.3,53.0 L144.5,53.5 L145.1,54.6 L142.5,56.5 L145.4,55.6 L144.7,57.3 L142.6,58.6 L141.7,60.3 L144.3,59.3 L146.9,57.9 L149.6,55.9 L150.4,56.5 L151.2,57.4 L151.2,58.8 L150.1,59.8 L148.3,60.6 L147.7,62.0 L146.5,62.9 L143.2,63.5 L141.6,63.3 L141.5,62.2 L140.0,63.1 L137.2,64.4 L135.9,65.1 L133.3,66.0 L131.9,65.4 L130.2,65.9 L128.6,67.2 L127.3,66.8 L124.3,67.8 L120.6,69.5 L118.3,70.9 L115.4,73.4 L116.3,74.7 L114.5,77.0 L113.1,79.0 L115.0,79.5 L115.9,81.6 L116.1,83.1 L115.9,84.7 L116.8,86.1 L117.1,87.8 L119.1,88.9 L120.2,89.8 L118.3,91.9 L116.7,94.6 L115.6,98.0 L116.0,101.4 L117.7,101.0 L120.3,98.6 L122.5,94.2 L122.5,92.5 L125.6,92.2 L128.5,91.0 L130.5,89.5 L131.6,87.8 L132.3,85.3 L132.2,82.9 L135.7,80.9 L137.0,78.5 L139.7,74.7 L140.9,74.5 L142.4,75.9 L143.4,76.5 L144.9,76.3 L145.4,77.5 L145.9,79.3 L145.6,80.4 L147.8,81.3 L146.4,83.4 L144.8,86.7 L145.9,87.4 L146.0,89.2 L149.0,88.4 L152.0,85.9 L153.6,84.9 L153.5,87.5 L153.7,91.3 L154.0,94.8 L152.5,96.4 L154.0,98.4 L154.9,100.3 L157.4,101.5 L158.2,102.6 L158.1,105.1 L159.3,105.7 L159.7,106.9 L158.8,110.1 L157.1,111.0 L155.4,111.8 L151.9,112.2 L148.6,114.1 L145.2,114.0 L143.3,113.2 L141.4,112.5 L138.6,111.8 L136.7,111.5 L134.2,113.1 L131.3,113.8 L126.8,116.8 L123.4,118.8 L125.2,118.8 L130.0,115.9 L132.5,115.2 L134.9,114.5 L137.9,115.0 L138.9,116.8 L136.3,118.3 L135.6,121.6 L135.3,124.0 L137.4,126.1 L140.9,126.4 L144.2,123.5 L143.6,125.7 L144.6,127.0 L141.3,128.5 L138.7,128.9 L136.0,129.2 L133.5,130.0 L130.4,131.6 L128.9,131.0 L129.8,128.4 L134.3,126.8 L131.1,126.1 L128.7,125.9 L128.1,123.9 L129.9,119.9 L129.5,118.8 L128.0,119.0 L127.7,118.0 L125.3,119.8 L123.6,121.9 L122.3,123.0 L121.3,123.2 L120.6,123.2 L120.1,123.9 L116.7,122.7 L113.9,121.8 L112.8,122.1 L109.8,123.4 L109.5,123.6 L108.3,124.5 L106.7,123.9 L104.9,123.2 L103.9,123.3 L103.9,124.0 L103.6,125.0 L103.4,125.2 L100.3,125.7 L98.3,125.4 L95.5,126.1 L95.1,125.9 L94.7,125.2 L94.8,124.7 L95.0,124.4 L95.9,123.6 L97.6,122.3 L99.1,120.9 L100.2,118.3 L101.5,115.6 L100.7,113.5 L101.2,113.1 L101.2,112.7 L100.8,112.5 L100.7,111.9 L101.1,111.2 L100.6,111.4 L100.3,111.1 L100.6,110.9 L100.4,110.4 L100.7,109.6 L100.2,108.2 L99.7,106.7 L99.1,104.9 L98.6,103.3 L96.8,103.4 L96.4,103.1 L95.4,101.5 L94.1,101.2 L93.6,99.7 L92.7,98.5 L92.1,97.7 L92.1,97.1 L93.1,95.6 L92.7,95.3 L91.9,96.3 L90.8,95.4 L89.7,94.6 L88.0,93.2 L86.4,91.8 L85.0,90.3 L83.6,88.9 L82.5,87.6 L81.4,86.3 L80.5,85.0 L79.6,83.6 L78.8,82.3 L78.1,81.0 L77.4,79.6 L76.9,78.2 L76.6,77.3 L76.1,76.0 L75.8,74.6 L75.6,73.3 L75.4,72.0Z"/><path fill="#8e762a" d="M133.7,71.7 L135.5,71.0 L136.8,71.7 L136.4,72.1 L134.0,72.8 L133.3,72.4 L133.7,71.7Z"/><path fill="#8e762a" d="M160.4,52.4 L160.9,51.1 L161.7,50.4 L162.2,50.5 L162.8,50.9 L163.5,51.3 L163.5,52.8 L163.0,53.3 L162.3,53.0 L161.6,52.6 L160.5,52.5 L160.4,52.4Z"/><path fill="#8e762a" d="M136.8,74.3 L137.8,73.8 L138.2,74.0 L138.1,74.6 L136.6,75.6 L136.2,75.2 L136.6,74.4 L136.8,74.3Z"/><path fill="#8e762a" d="M158.0,44.5 L156.7,44.9 L156.2,44.4 L156.4,43.6 L157.9,43.1 L159.3,43.2 L158.7,43.9 L158.0,44.5Z"/><path fill="#8e762a" d="M164.9,40.8 L164.6,40.8 L164.1,40.2 L164.8,39.8 L165.2,40.0 L165.5,40.3 L165.2,40.7 L164.9,40.8Z"/><path fill="#8e762a" d="M167.4,38.5 L166.8,39.2 L165.7,39.6 L164.6,39.5 L165.0,39.0 L166.0,38.4 L167.1,37.9 L167.4,38.3 L167.4,38.5Z"/><path fill="#8e762a" d="M159.1,47.1 L158.6,46.4 L158.3,45.8 L158.1,45.1 L159.5,44.2 L160.7,43.4 L161.5,42.5 L161.3,42.1 L161.1,41.7 L161.5,41.0 L162.8,40.6 L163.1,40.9 L163.4,41.2 L162.9,41.9 L163.7,42.5 L163.2,43.2 L162.1,43.7 L162.0,44.3 L161.7,44.9 L162.3,45.3 L162.8,45.9 L164.2,45.9 L164.8,46.1 L165.5,46.3 L166.2,46.9 L166.0,47.8 L165.2,48.5 L164.2,48.8 L162.8,48.8 L162.3,48.3 L161.3,48.0 L160.3,47.7 L159.7,47.4 L159.1,47.1Z"/><path fill="#8e762a" d="M162.1,35.4 L161.9,35.9 L160.9,36.1 L159.6,35.9 L160.4,35.1 L161.6,35.1 L162.1,35.4Z"/><path fill="#8e762a" d="M164.2,34.9 L163.8,35.4 L163.0,35.3 L162.7,34.8 L163.2,34.7 L164.3,34.7 L164.2,34.9Z"/><path fill="#8e762a" d="M158.2,112.6 L156.6,114.2 L154.5,116.6 L156.1,115.8 L157.2,116.6 L156.2,117.5 L157.8,118.6 L158.9,118.1 L160.7,119.3 L159.5,121.4 L161.1,121.0 L160.9,122.7 L161.1,124.6 L159.6,127.2 L158.5,127.1 L157.3,126.4 L158.4,124.0 L157.9,123.5 L154.7,125.7 L153.5,125.4 L155.4,124.3 L153.6,123.2 L151.3,123.0 L147.4,122.2 L147.3,121.3 L149.0,120.4 L148.4,119.5 L150.6,118.0 L154.2,113.7 L156.0,112.3 L158.0,111.6 L158.8,111.8 L158.2,112.6Z"/><path fill="#8e762a" d="M139.8,66.0 L140.0,67.2 L140.4,68.4 L139.5,69.5 L140.4,69.6 L140.4,70.7 L138.8,71.0 L137.8,69.7 L138.2,68.5 L136.1,69.2 L133.5,69.6 L134.6,68.2 L133.1,67.8 L135.0,67.1 L137.0,65.6 L139.4,63.8 L139.9,64.3 L139.0,65.3 L139.8,65.2 L139.8,66.0Z"/><path fill="#8e762a" d="M160.2,53.5 L161.7,53.0 L162.0,53.8 L162.3,54.6 L162.4,55.9 L161.6,56.8 L163.6,56.9 L163.3,58.4 L164.0,59.2 L164.8,59.9 L164.9,61.0 L164.3,63.2 L161.6,63.8 L162.3,64.8 L163.0,65.9 L164.3,66.8 L164.6,69.2 L166.3,69.8 L164.9,71.4 L161.2,73.6 L160.3,72.3 L160.0,69.6 L158.3,69.5 L157.2,70.7 L157.5,72.4 L158.4,73.9 L158.5,74.7 L157.9,77.3 L156.4,78.9 L155.1,77.9 L154.2,76.5 L153.3,75.1 L153.6,77.6 L154.0,79.5 L153.7,80.4 L152.3,79.4 L150.8,78.5 L149.9,77.4 L149.1,76.3 L148.5,74.7 L149.4,74.1 L148.6,72.4 L147.9,70.7 L147.4,71.4 L145.7,71.0 L144.0,70.6 L143.8,69.5 L146.0,68.1 L147.9,68.8 L149.2,69.1 L150.4,69.3 L150.7,68.4 L152.0,67.4 L155.2,65.7 L155.7,64.7 L156.0,63.8 L155.5,62.3 L154.9,61.6 L154.3,60.9 L155.4,60.6 L155.8,59.0 L155.2,58.6 L155.3,57.6 L154.2,58.0 L152.4,57.7 L151.3,56.8 L150.2,55.9 L149.8,55.3 L149.4,54.6 L148.7,53.7 L149.0,52.8 L150.8,52.4 L150.0,51.8 L152.4,50.0 L155.1,48.8 L156.8,48.4 L157.8,48.6 L158.9,48.8 L156.9,49.7 L155.8,51.0 L158.4,49.9 L159.6,49.9 L160.9,49.9 L159.7,52.3 L158.1,53.4 L160.2,53.5Z"/><path fill="#8e762a" d="M155.2,45.5 L155.7,45.9 L156.1,46.2 L156.5,47.2 L153.3,48.2 L152.2,48.1 L149.6,48.9 L149.1,48.4 L151.2,46.8 L152.6,46.0 L154.0,45.6 L155.2,45.5Z"/><path fill="#8e762a" d="M154.4,33.6 L154.4,33.6 L156.9,33.5 L158.0,33.6 L159.1,33.7 L159.2,34.1 L159.8,34.4 L157.4,35.0 L156.2,35.1 L155.9,34.8 L154.4,34.6 L153.8,34.2 L154.4,33.6Z"/><path fill="#8e762a" d="M89.4,54.3 L89.4,54.9 L86.5,56.6 L84.2,58.7 L84.3,58.3 L85.6,57.0 L86.9,56.0 L87.9,55.0 L89.1,54.2 L89.9,53.7 L89.4,54.3Z"/><path fill="#8e762a" d="M166.8,35.8 L166.8,36.4 L166.5,36.9 L166.3,37.5 L165.1,38.2 L164.0,38.8 L163.9,38.3 L164.4,37.4 L164.2,37.1 L164.0,36.8 L165.1,36.7 L165.6,36.2 L166.8,35.8Z"/><path fill="#8e762a" d="M74.2,72.4 L73.8,72.2 L74.9,69.8 L75.8,68.8 L76.7,67.3 L77.5,66.6 L78.0,65.3 L79.5,64.0 L80.0,63.6 L79.4,65.0 L78.9,65.8 L78.6,66.8 L77.7,67.8 L76.5,69.2 L75.5,70.9 L74.2,72.4Z"/><path fill="#8e762a" d="M149.2,35.4 L148.6,36.1 L148.6,36.6 L148.7,37.2 L147.9,37.8 L146.7,38.7 L145.7,38.4 L144.5,38.3 L143.2,38.2 L140.9,38.4 L139.5,38.8 L138.7,38.5 L137.9,38.2 L139.2,37.5 L140.0,36.7 L140.9,35.9 L142.2,35.7 L144.5,35.4 L146.6,35.2 L148.6,34.3 L148.8,34.8 L149.2,35.4Z"/><path fill="#8e762a" d="M155.6,38.8 L156.3,38.9 L156.5,39.3 L155.0,40.0 L153.4,40.3 L152.7,39.8 L152.1,39.3 L151.2,39.1 L150.2,38.9 L149.9,38.4 L150.9,38.0 L151.7,38.1 L152.6,38.2 L152.2,37.8 L151.9,37.3 L151.5,36.8 L151.9,36.1 L155.2,35.7 L156.2,35.7 L155.9,36.3 L155.6,36.9 L154.0,38.2 L154.2,38.8 L156.8,37.3 L158.2,37.2 L158.0,37.7 L156.6,38.3 L155.6,38.8Z"/><path fill="#8e762a" d="M147.5,42.7 L146.7,43.6 L144.0,45.2 L142.1,46.4 L141.3,47.8 L140.7,49.3 L139.4,50.0 L138.4,49.4 L137.6,50.2 L136.4,50.7 L136.1,49.6 L136.2,48.4 L135.5,47.9 L133.9,47.5 L133.3,47.0 L132.7,46.5 L131.9,45.7 L133.2,44.8 L133.8,43.8 L133.2,43.5 L135.5,41.9 L135.9,42.1 L136.7,42.6 L136.9,43.3 L137.7,43.7 L138.0,42.5 L137.6,42.1 L137.3,41.6 L137.2,40.9 L138.3,40.3 L139.0,40.6 L139.8,40.9 L139.6,40.2 L140.2,39.1 L142.6,38.7 L144.0,38.6 L145.1,38.8 L146.2,39.0 L145.8,39.6 L144.3,39.9 L144.9,40.2 L145.6,40.5 L144.4,41.7 L146.2,41.5 L145.5,42.3 L142.7,43.9 L144.1,43.5 L147.0,41.9 L147.7,42.1 L147.5,42.7Z"/><path fill="#8e762a" d="M148.6,45.5 L150.1,44.2 L151.9,43.9 L151.8,44.6 L152.9,45.1 L152.2,45.6 L150.5,46.0 L149.9,47.2 L147.4,48.5 L145.5,48.5 L145.3,48.0 L146.0,47.1 L146.6,46.0 L147.2,45.0 L148.2,44.6 L148.4,45.0 L148.6,45.5Z"/><path fill="#8e762a" d="M149.1,42.0 L149.6,42.4 L149.2,43.0 L147.0,43.5 L148.6,42.0 L149.1,42.0Z"/><path fill="#8e762a" d="M160.9,40.6 L159.9,41.5 L158.4,42.2 L156.1,43.1 L155.2,42.7 L155.3,42.1 L157.0,41.3 L156.2,40.9 L158.5,39.9 L158.8,40.3 L160.2,40.3 L160.5,40.8 L160.9,40.6Z"/><path fill="#8e762a" d="M172.9,36.5 L173.9,36.2 L174.4,36.4 L174.9,36.0 L175.3,36.2 L175.7,36.4 L174.6,37.3 L174.5,37.9 L174.5,38.4 L173.1,39.5 L172.8,40.2 L171.5,40.3 L168.8,41.0 L167.9,40.6 L167.7,40.3 L167.5,40.0 L168.2,39.2 L169.3,38.7 L170.3,38.6 L169.7,38.2 L170.3,37.5 L171.4,36.8 L172.9,36.5Z"/><path fill="#8e762a" d="M177.6,35.8 L178.5,35.8 L178.9,35.9 L179.9,36.0 L181.3,35.7 L181.5,36.0 L181.1,36.5 L182.6,35.9 L183.4,35.8 L184.1,35.9 L184.6,36.1 L185.1,36.2 L185.0,36.4 L185.7,36.4 L186.3,36.5 L186.5,36.6 L186.8,36.8 L187.1,36.9 L187.4,37.1 L187.8,37.3 L188.2,37.4 L188.4,37.6 L188.7,37.8 L189.0,38.4 L188.6,38.8 L187.8,39.1 L186.9,39.3 L186.3,39.4 L185.6,39.4 L184.8,39.7 L185.3,39.8 L185.8,39.9 L184.7,40.3 L183.7,40.6 L182.5,40.9 L180.1,42.0 L179.5,42.0 L178.8,42.0 L178.1,42.2 L177.3,42.0 L176.5,41.9 L176.9,42.3 L176.2,42.5 L175.5,43.4 L174.3,43.8 L172.9,44.0 L171.8,44.5 L170.4,44.7 L169.9,45.1 L170.9,45.4 L170.4,45.8 L169.0,46.0 L167.6,46.2 L167.2,45.7 L166.8,45.1 L165.9,44.9 L165.0,44.6 L164.6,44.1 L163.8,43.5 L165.0,42.7 L166.4,42.9 L168.1,41.7 L168.5,41.7 L168.5,42.4 L168.6,43.0 L169.6,41.7 L169.4,41.1 L170.8,40.7 L172.1,40.7 L173.1,40.3 L173.5,39.5 L174.7,38.7 L175.1,39.0 L175.5,39.2 L175.6,39.5 L177.0,39.3 L176.8,39.0 L176.5,38.7 L175.8,38.5 L175.1,38.2 L175.5,37.4 L176.3,36.8 L176.8,36.2 L177.6,35.8Z"/><path fill="#8e762a" d="M152.9,64.5 L151.7,64.9 L150.5,64.6 L151.3,63.5 L152.9,62.4 L154.0,62.5 L154.2,63.3 L153.3,64.2 L152.9,64.5Z"/><path fill="#8e762a" d="M141.6,52.2 L140.9,53.2 L139.6,53.5 L139.7,52.4 L139.0,52.2 L139.5,50.8 L140.8,50.7 L142.4,50.3 L142.2,51.2 L142.0,51.8 L141.6,52.2Z"/><path fill="#8e762a" d="M139.7,113.4 L140.4,113.3 L142.6,114.6 L144.1,116.2 L143.9,116.8 L142.9,116.6 L140.8,115.1 L139.7,113.4Z"/><path fill="#8e762a" d="M137.2,121.8 L137.3,123.4 L138.6,124.2 L140.5,124.5 L139.1,125.5 L138.3,125.5 L136.2,123.7 L136.1,122.6 L137.2,121.8Z"/><path fill="#8e762a" d="M75.4,72.0 L75.6,73.3 L75.8,74.6 L76.1,76.0 L76.6,77.3 L76.9,78.2 L77.4,79.6 L78.1,81.0 L78.8,82.3 L79.6,83.6 L80.5,85.0 L81.4,86.3 L82.5,87.6 L83.6,88.9 L85.0,90.3 L86.4,91.8 L88.0,93.2 L89.7,94.6 L90.8,95.4 L91.9,96.3 L92.7,95.3 L93.1,95.6 L92.1,97.1 L92.1,97.7 L92.7,98.5 L93.6,99.7 L94.1,101.2 L95.4,101.5 L96.4,103.1 L96.8,103.4 L98.6,103.3 L99.1,104.9 L99.7,106.7 L100.2,108.2 L100.7,109.6 L100.4,110.4 L100.6,110.9 L100.3,111.1 L100.6,111.4 L101.1,111.2 L100.7,111.9 L100.8,112.5 L101.2,112.7 L101.2,113.1 L100.7,113.5 L101.5,115.6 L100.2,118.3 L99.1,120.9 L97.6,122.3 L95.9,123.6 L95.0,124.4 L94.8,124.7 L94.7,125.2 L95.1,125.9 L95.5,126.1 L98.3,125.4 L100.3,125.7 L103.4,125.2 L103.6,125.0 L103.9,124.0 L103.9,123.3 L104.9,123.2 L106.7,123.9 L108.3,124.5 L109.5,123.6 L109.8,123.4 L112.8,122.1 L113.9,121.8 L116.7,122.7 L120.1,123.9 L120.6,123.2 L121.3,123.2 L122.3,123.0 L123.6,121.9 L125.3,119.8 L127.7,118.0 L128.0,119.0 L129.5,118.8 L129.9,119.9 L128.1,123.9 L128.7,125.9 L128.6,127.0 L125.9,127.8 L123.4,128.3 L121.0,128.6 L119.1,130.0 L118.5,130.6 L117.8,132.2 L117.8,133.9 L118.6,134.3 L118.8,133.1 L119.1,134.0 L118.6,134.8 L117.1,134.8 L116.1,134.5 L114.4,134.6 L113.5,134.4 L112.3,134.2 L110.2,134.5 L113.4,134.9 L113.7,135.7 L110.5,135.7 L109.3,135.2 L109.5,134.9 L108.5,135.5 L109.1,135.9 L107.7,137.9 L105.2,139.7 L105.4,138.9 L105.0,138.5 L104.7,137.6 L104.4,139.3 L104.7,140.0 L104.2,141.2 L103.0,142.1 L100.9,144.2 L100.7,144.0 L102.2,142.1 L101.7,140.6 L102.7,138.0 L101.7,139.2 L101.2,141.2 L100.2,140.3 L101.1,141.8 L99.9,144.7 L100.4,145.1 L100.1,146.2 L99.1,149.4 L96.9,151.2 L94.4,151.3 L92.4,152.6 L91.3,152.4 L89.8,153.1 L89.1,154.0 L86.1,155.1 L84.4,156.1 L82.7,157.5 L81.5,159.5 L81.1,161.8 L80.7,164.8 L80.8,167.4 L80.3,168.7 L80.0,172.7 L79.3,174.8 L78.8,176.0 L77.6,177.7 L76.9,177.8 L76.0,177.0 L76.1,175.5 L75.6,174.4 L75.4,171.2 L75.3,168.4 L75.5,167.1 L76.7,165.2 L76.8,163.3 L76.3,160.0 L75.7,159.2 L73.3,159.6 L73.0,159.3 L72.7,157.4 L71.9,156.1 L69.8,155.4 L68.4,154.2 L67.0,153.6 L66.1,153.7 L66.0,154.7 L65.5,155.9 L65.6,156.7 L65.1,156.9 L64.6,156.1 L63.8,156.3 L62.6,155.5 L62.1,153.1 L60.6,152.6 L59.8,151.2 L58.8,150.7 L57.2,150.5 L54.9,151.8 L52.9,152.0 L51.5,152.8 L50.5,153.9 L49.6,155.9 L49.0,157.4 L48.9,158.6 L48.3,158.3 L47.6,156.8 L47.0,155.0 L47.2,153.3 L47.9,151.0 L48.0,148.7 L48.4,146.6 L48.8,144.0 L48.6,142.1 L47.6,141.2 L45.8,142.8 L45.3,141.0 L45.3,139.5 L45.9,137.7 L46.4,135.8 L46.5,133.9 L46.5,132.4 L46.8,131.0 L45.3,129.1 L44.6,130.2 L44.0,129.3 L42.5,127.0 L42.4,124.7 L42.3,122.4 L42.3,119.4 L42.7,119.0 L41.9,117.8 L41.3,116.7 L42.2,115.1 L43.0,112.9 L43.0,112.0 L43.5,111.1 L43.5,110.4 L43.9,109.3 L43.8,107.9 L44.1,107.2 L45.1,105.7 L46.9,102.1 L49.5,97.8 L50.0,97.3 L50.6,96.0 L52.3,93.1 L54.0,91.1 L55.1,89.2 L56.9,87.6 L58.8,85.6 L60.5,83.6 L62.7,81.9 L64.8,80.0 L66.9,78.2 L70.1,75.2 L72.2,73.2 L73.3,72.0 L73.8,71.7 L73.0,73.7 L70.8,76.2 L71.4,75.9 L73.4,74.0 L75.4,72.0Z"/><path fill="#8e762a" d="M129.6,24.0 L128.6,24.5 L127.7,24.8 L128.0,24.6 L129.1,24.1 L130.4,23.6 L129.6,24.0Z"/><path fill="#8e762a" d="M111.2,33.9 L110.5,34.4 L109.4,35.0 L108.9,34.9 L108.9,34.7 L109.9,34.0 L111.2,33.5 L111.3,33.7 L111.2,33.9Z"/><path fill="#8e762a" d="M136.7,30.8 L136.7,30.8 L131.2,32.2 L125.7,33.7 L120.2,35.4 L114.8,37.4 L109.5,39.5 L109.0,40.1 L107.8,41.1 L106.3,42.1 L104.2,43.6 L105.4,43.6 L106.0,43.8 L104.4,44.9 L103.0,45.9 L101.5,47.2 L99.4,48.7 L96.0,51.2 L93.9,53.5 L92.2,54.5 L91.0,54.8 L91.0,54.8 L91.0,54.8 L92.1,53.8 L93.2,52.6 L95.6,51.0 L98.2,48.8 L100.9,47.1 L101.4,46.3 L102.0,45.1 L103.2,43.9 L105.0,42.5 L106.9,41.1 L107.8,40.2 L109.7,38.7 L110.2,37.8 L112.5,36.0 L114.4,34.9 L114.5,34.4 L112.5,35.2 L112.7,34.9 L112.9,34.4 L112.7,34.1 L113.0,33.6 L114.6,33.0 L116.8,32.3 L116.8,32.7 L117.7,32.3 L117.1,32.0 L116.0,32.2 L115.3,32.0 L113.5,32.9 L112.5,33.0 L112.4,32.8 L112.6,32.4 L111.8,32.7 L112.1,32.2 L111.3,32.5 L111.6,32.2 L112.5,31.7 L112.9,31.3 L113.3,31.0 L113.5,30.9 L115.0,30.1 L115.6,29.8 L115.2,30.0 L114.7,30.3 L114.7,30.4 L113.6,31.1 L114.0,31.0 L113.9,31.3 L114.2,31.3 L114.3,31.4 L115.9,30.8 L116.9,30.5 L117.2,30.1 L117.9,29.7 L117.6,29.7 L119.4,28.9 L118.8,29.1 L120.4,28.4 L120.4,28.2 L121.1,27.8 L122.5,27.3 L123.2,27.1 L124.6,26.4 L125.5,25.9 L127.5,25.1 L128.7,24.5 L130.0,24.1 L131.7,23.5 L132.6,23.3 L133.0,23.4 L133.8,23.3 L133.2,23.6 L132.2,24.1 L132.6,24.2 L131.8,24.6 L131.9,24.8 L133.1,24.4 L134.0,24.1 L134.3,24.2 L134.8,23.9 L135.2,23.5 L134.9,23.5 L136.2,23.0 L137.2,22.4 L139.1,21.6 L140.4,21.3 L142.9,20.5 L142.5,20.9 L142.1,21.3 L141.7,21.7 L141.0,22.1 L139.9,22.2 L139.1,22.7 L138.3,23.1 L140.5,22.5 L142.4,21.8 L144.1,21.4 L145.9,20.8 L147.7,20.2 L148.5,20.3 L147.2,21.0 L147.4,21.4 L148.4,21.3 L148.9,21.6 L148.5,22.0 L148.5,22.6 L147.7,22.9 L148.3,23.4 L146.9,24.0 L145.2,24.5 L145.5,24.6 L144.5,25.3 L143.9,25.4 L142.7,26.1 L142.5,26.5 L141.5,27.0 L140.6,27.5 L139.6,28.4 L138.9,28.8 L138.9,29.3 L137.4,30.2 L136.7,30.8 L136.7,30.8Z"/><path fill="#8e762a" d="M142.5,19.7 L141.4,20.0 L141.0,20.3 L139.6,20.7 L138.3,21.2 L138.1,21.3 L138.5,21.0 L139.7,20.6 L140.5,20.3 L141.3,20.0 L141.8,19.8 L142.5,19.7Z"/><path fill="#71323b" d="M304.8,41.5 L307.1,43.1 L308.3,43.9 L310.1,45.1 L310.3,45.3 L310.4,45.4 L310.6,45.5 L310.8,45.6 L310.9,45.8 L311.1,45.9 L311.3,46.0 L311.5,46.1 L311.6,46.2 L311.8,46.4 L312.0,46.5 L312.1,46.6 L313.5,47.7 L318.1,51.2 L319.1,52.0 L322.0,54.4 L324.7,56.6 L325.9,57.7 L326.8,58.5 L326.8,58.5 L326.8,58.5 L326.9,58.6 L326.9,58.6 L326.9,58.6 L326.9,58.6 L326.9,58.6 L327.0,58.6 L327.0,58.7 L327.0,58.7 L327.0,58.7 L327.0,58.7 L327.3,59.0 L327.1,58.8 L328.3,60.0 L329.8,61.5 L330.3,62.1 L330.6,62.7 L331.5,63.6 L332.8,64.9 L333.3,65.8 L334.1,66.8 L335.2,67.8 L336.0,68.8 L338.3,71.5 L340.1,73.4 L340.3,73.8 L339.4,73.1 L340.0,74.4 L338.4,72.9 L338.6,73.4 L336.4,71.3 L335.3,71.0 L336.1,72.9 L336.8,74.3 L335.0,73.5 L334.3,73.5 L332.9,73.6 L332.7,73.6 L333.6,75.4 L334.3,77.3 L338.6,81.3 L342.7,85.3 L342.8,86.0 L341.1,84.9 L340.5,85.0 L340.8,86.7 L341.5,87.9 L341.0,87.4 L340.1,86.2 L339.3,85.6 L338.4,86.0 L336.3,84.5 L335.6,84.4 L334.8,83.7 L335.2,83.0 L333.5,81.3 L333.2,80.2 L333.7,79.6 L331.4,77.4 L329.9,76.2 L329.9,77.3 L329.2,77.6 L330.0,79.6 L330.3,81.0 L329.8,81.1 L328.6,79.9 L326.8,79.1 L326.7,79.8 L324.8,79.2 L323.1,77.0 L322.5,76.8 L319.9,73.8 L321.7,74.1 L319.9,72.5 L318.7,70.5 L317.5,68.6 L317.6,67.1 L318.6,66.8 L319.5,66.5 L320.5,66.3 L319.4,64.5 L319.2,63.1 L320.3,62.9 L319.5,62.1 L319.4,61.0 L318.1,59.9 L316.6,60.1 L315.2,58.4 L314.5,58.1 L313.6,56.9 L312.0,56.3 L311.0,55.4 L310.0,53.6 L309.0,51.8 L308.2,51.0 L307.2,49.8 L306.2,48.5 L304.7,47.2 L304.4,46.1 L306.9,47.3 L305.7,46.2 L305.8,45.7 L307.2,46.5 L306.5,45.7 L304.5,44.0 L302.4,42.4 L303.4,43.1 L304.4,43.2 L306.6,44.1 L308.7,45.0 L307.0,43.8 L307.0,43.5 L305.0,42.1 L304.9,41.9 L305.7,42.3 L305.4,42.0 L305.9,42.3 L304.1,41.1 L304.8,41.5Z"/><path fill="#71323b" d="M342.7,85.3 L338.6,81.3 L334.3,77.3 L333.6,75.4 L332.7,73.6 L332.9,73.6 L334.3,73.5 L335.0,73.5 L336.8,74.3 L336.1,72.9 L335.3,71.0 L336.4,71.3 L338.6,73.4 L338.4,72.9 L340.0,74.4 L339.4,73.1 L340.3,73.8 L340.1,73.4 L338.3,71.5 L336.0,68.8 L335.2,67.8 L335.2,67.7 L337.1,69.9 L337.4,69.9 L336.4,68.7 L336.6,68.5 L339.1,71.3 L339.4,71.8 L339.7,72.3 L339.3,71.9 L338.2,70.7 L339.5,72.6 L341.0,74.2 L342.5,75.9 L342.9,76.7 L343.9,77.9 L344.0,77.6 L345.3,79.0 L347.7,81.8 L347.7,82.2 L348.0,82.8 L346.7,81.4 L346.5,81.9 L346.0,81.9 L345.3,81.6 L344.2,81.3 L342.2,79.6 L341.9,79.5 L342.3,80.8 L341.9,80.7 L340.2,79.1 L339.2,79.4 L340.7,81.5 L341.5,83.1 L342.6,84.1 L342.7,85.3Z"/><path fill="#59406f" d="M136.1,377.4 L137.5,378.0 L139.4,378.9 L142.4,379.9 L145.0,380.7 L145.0,380.9 L143.5,380.5 L142.2,380.1 L141.2,379.8 L139.4,379.3 L137.8,378.4 L136.1,377.4Z"/><path fill="#59406f" d="M136.8,350.7 L136.7,352.1 L136.7,354.0 L137.4,355.8 L137.0,356.1 L137.3,357.2 L137.5,358.1 L141.3,360.2 L141.5,361.3 L143.4,362.2 L143.6,363.0 L142.2,364.7 L139.2,364.8 L136.9,364.5 L134.7,364.2 L132.0,363.5 L133.1,364.6 L133.3,365.6 L134.3,366.4 L133.3,366.6 L131.2,366.3 L128.7,365.3 L128.1,365.5 L129.5,367.0 L131.3,367.8 L132.1,367.6 L133.3,368.5 L131.7,368.4 L130.7,368.9 L131.6,370.1 L131.7,370.7 L129.8,370.2 L128.9,370.5 L129.3,371.2 L132.2,372.6 L134.3,373.3 L134.7,374.2 L133.2,374.2 L133.6,375.2 L132.6,375.1 L132.5,375.4 L134.6,376.6 L136.5,377.4 L135.7,377.2 L134.0,376.6 L131.8,375.9 L129.8,375.2 L128.2,374.4 L127.0,373.7 L126.0,373.4 L124.9,372.8 L123.0,371.6 L123.7,371.5 L123.3,371.0 L122.3,370.3 L122.0,369.6 L120.8,368.1 L119.7,367.3 L120.3,367.3 L119.6,366.7 L118.4,366.2 L118.5,365.8 L117.1,365.0 L115.1,363.2 L115.6,363.1 L113.7,361.2 L112.8,359.7 L112.2,358.5 L113.1,358.2 L111.2,356.4 L110.1,354.8 L111.0,354.2 L110.1,352.7 L110.3,351.3 L109.3,349.6 L108.5,349.1 L105.7,345.4 L106.1,343.8 L105.0,341.8 L105.0,340.1 L105.8,338.6 L107.0,337.8 L105.9,336.7 L106.2,336.2 L104.8,332.4 L107.2,332.1 L107.3,329.9 L106.9,329.3 L108.4,327.7 L112.1,329.2 L114.1,331.2 L114.6,329.6 L117.7,330.4 L118.3,331.0 L124.3,335.8 L126.6,336.6 L130.4,338.9 L133.4,340.2 L134.1,341.3 L132.2,344.0 L135.1,345.0 L138.3,345.9 L140.4,345.9 L142.5,344.7 L142.5,342.9 L143.8,342.7 L145.5,344.1 L145.8,345.8 L143.8,346.6 L142.1,347.2 L139.6,348.6 L136.8,350.7Z"/><path fill="#59406f" d="M136.1,377.4 L137.8,378.4 L139.4,379.3 L141.2,379.8 L142.2,380.1 L142.2,380.2 L141.3,380.1 L140.5,379.8 L139.5,379.5 L137.9,379.0 L136.0,378.4 L133.2,377.3 L130.7,376.3 L126.7,374.6 L128.4,375.2 L131.7,376.5 L134.3,377.5 L134.4,377.4 L133.9,376.9 L134.8,377.0 L136.1,377.4Z"/><path fill="#59406f" d="M97.2,315.0 L98.8,317.1 L99.6,319.0 L101.2,320.4 L101.0,322.5 L103.1,325.6 L105.1,329.1 L106.9,329.3 L107.3,329.9 L107.2,332.1 L104.8,332.4 L106.2,336.2 L105.9,336.7 L107.0,337.8 L105.8,338.6 L105.0,340.1 L105.0,341.8 L106.1,343.8 L105.7,345.4 L108.5,349.1 L109.3,349.6 L110.3,351.3 L110.1,352.7 L111.0,354.2 L110.1,354.8 L111.2,356.4 L113.1,358.2 L112.2,358.5 L112.8,359.7 L113.7,361.2 L115.6,363.1 L115.1,363.2 L117.1,365.0 L118.5,365.8 L118.4,366.2 L119.6,366.7 L120.3,367.3 L119.7,367.3 L120.8,368.1 L122.0,369.6 L122.3,370.3 L123.3,371.0 L123.7,371.5 L123.0,371.6 L124.9,372.8 L126.0,373.4 L127.0,373.7 L128.2,374.4 L129.8,375.2 L131.8,375.9 L134.0,376.6 L135.7,377.2 L134.2,376.7 L133.8,376.7 L132.9,376.6 L134.1,377.3 L133.5,377.2 L131.2,376.3 L128.2,375.1 L128.2,375.1 L125.3,373.9 L123.8,373.0 L123.3,372.6 L121.3,371.6 L118.3,369.6 L117.5,368.7 L118.1,368.3 L115.0,367.0 L115.3,366.5 L113.5,364.4 L116.1,365.6 L115.1,364.3 L114.1,363.0 L112.5,362.2 L113.6,363.8 L112.3,363.2 L110.8,361.3 L109.0,358.6 L109.0,357.8 L107.1,356.0 L105.6,354.0 L106.4,354.3 L105.7,351.8 L105.4,349.4 L104.7,346.8 L102.7,343.7 L102.5,342.3 L101.0,339.7 L101.3,337.5 L100.0,333.4 L99.6,331.2 L99.2,329.0 L98.7,326.5 L98.3,324.0 L97.0,320.0 L95.6,316.4 L96.8,316.1 L97.2,315.0Z"/><path fill="#59406f" d="M370.7,248.2 L370.8,250.7 L370.5,252.3 L370.6,253.7 L371.2,254.6 L371.4,257.6 L371.4,257.6 L370.9,257.8 L368.9,260.0 L368.5,260.7 L367.8,262.9 L367.9,263.8 L367.0,267.4 L366.3,270.4 L366.5,270.6 L367.3,270.8 L367.8,270.0 L367.2,272.9 L366.1,273.8 L365.9,272.8 L365.7,272.0 L364.6,272.6 L364.6,271.4 L363.5,273.0 L362.3,273.6 L362.0,272.7 L361.0,273.2 L360.2,273.8 L360.3,273.0 L359.8,273.4 L359.0,273.7 L357.9,274.9 L357.1,275.3 L356.6,275.8 L357.3,272.4 L356.9,271.8 L357.1,270.1 L357.6,268.2 L357.4,267.3 L357.6,265.5 L355.3,267.0 L355.6,265.8 L354.7,266.4 L354.5,267.0 L353.3,267.8 L352.6,269.8 L352.3,270.7 L351.2,270.9 L350.5,271.6 L349.2,272.6 L348.6,271.5 L348.3,270.8 L347.9,269.4 L347.6,267.5 L344.5,269.1 L341.3,270.7 L340.5,271.4 L339.8,271.6 L338.9,272.4 L338.7,271.7 L339.3,271.1 L339.4,269.8 L339.8,268.9 L340.7,267.9 L341.3,267.9 L342.1,266.4 L343.3,265.9 L343.3,266.7 L344.1,266.8 L345.5,264.3 L346.8,262.3 L347.4,261.0 L347.4,258.7 L348.4,255.3 L349.4,253.3 L350.8,251.1 L351.0,250.0 L351.1,248.9 L351.4,247.6 L351.3,246.0 L351.5,243.2 L351.8,241.1 L352.3,239.1 L352.4,237.2 L352.4,235.0 L353.1,233.0 L354.0,231.4 L355.7,231.5 L356.9,231.9 L358.3,231.3 L359.7,231.0 L360.1,228.9 L360.3,228.5 L361.1,228.2 L362.9,225.4 L363.6,225.5 L364.1,225.1 L364.3,224.1 L364.9,223.4 L366.1,222.8 L367.2,222.1 L367.6,221.4 L368.8,223.1 L369.5,222.9 L369.8,222.1 L370.5,221.7 L371.2,220.4 L371.7,221.4 L373.0,222.3 L373.0,222.3 L373.1,225.9 L373.7,225.8 L373.3,227.3 L372.8,228.6 L372.3,230.6 L372.0,232.3 L371.9,234.8 L371.6,236.2 L371.6,238.5 L371.1,239.7 L371.0,241.5 L370.8,241.9 L370.6,243.7 L370.9,244.7 L370.7,248.2Z"/><path fill="#59406f" d="M384.7,223.7 L384.3,222.0 L384.3,216.5 L384.1,211.1 L384.6,206.4 L384.7,205.1 L385.2,204.2 L385.6,200.8 L386.4,198.9 L386.6,192.5 L386.7,186.0 L386.5,182.5 L386.4,180.1 L386.1,178.5 L385.5,175.5 L385.2,174.3 L385.2,174.2 L385.2,174.2 L385.3,173.7 L385.3,172.7 L385.4,171.6 L385.3,170.0 L385.4,169.5 L385.6,170.2 L386.0,172.1 L386.3,173.6 L386.5,175.0 L387.0,178.6 L387.4,182.6 L387.8,187.3 L388.0,192.9 L388.0,197.4 L387.7,203.2 L387.3,207.0 L386.5,212.1 L385.9,215.6 L385.1,220.8 L384.9,222.7 L384.7,223.7Z"/><path fill="#59406f" d="M382.2,235.8 L381.1,234.8 L381.1,233.1 L379.4,232.5 L377.4,231.9 L377.2,231.8 L377.3,228.6 L377.6,227.0 L378.1,224.4 L378.5,221.7 L377.8,218.8 L377.6,217.4 L376.9,215.9 L377.5,213.3 L378.1,210.4 L378.7,210.2 L378.8,212.0 L379.3,212.5 L380.0,211.6 L381.5,212.5 L381.8,212.1 L382.0,211.7 L382.2,211.7 L382.8,211.1 L383.0,209.4 L383.7,206.9 L384.1,207.4 L384.6,206.4 L384.1,211.1 L384.3,216.5 L384.3,222.0 L384.7,223.7 L384.1,225.8 L383.9,227.4 L383.6,228.1 L383.3,230.4 L383.0,232.1 L382.7,234.3 L382.2,235.8Z"/><path fill="#59406f" d="M362.1,215.6 L360.7,215.2 L360.0,214.7 L359.7,213.8 L359.8,212.3 L359.6,211.1 L358.3,209.8 L357.9,208.6 L357.7,207.9 L356.9,207.4 L356.6,205.6 L356.0,204.6 L355.4,205.2 L355.4,204.0 L355.5,202.4 L355.1,201.2 L355.4,199.9 L354.9,199.4 L354.9,197.2 L355.2,194.4 L356.7,193.6 L355.0,187.5 L353.2,181.4 L352.8,180.1 L354.6,178.8 L352.6,172.7 L354.6,171.2 L356.5,169.7 L358.4,168.1 L360.9,165.8 L363.2,163.5 L365.4,161.1 L367.4,158.7 L368.9,161.2 L368.9,162.0 L370.1,164.8 L371.7,167.9 L372.3,168.2 L373.2,168.6 L373.3,170.9 L372.7,172.4 L372.7,173.7 L373.2,175.8 L374.0,180.8 L374.4,181.9 L374.9,184.7 L375.2,188.2 L374.9,190.5 L374.9,193.3 L375.0,194.7 L374.6,196.2 L374.9,199.8 L375.3,202.5 L374.9,200.1 L374.7,200.2 L374.5,198.7 L374.2,197.8 L373.3,197.3 L372.8,195.2 L372.4,192.8 L371.8,193.2 L371.9,194.0 L371.2,194.9 L371.7,195.5 L372.1,197.2 L371.8,199.6 L371.5,202.4 L370.9,203.4 L369.4,202.6 L369.0,203.7 L369.0,204.8 L368.4,206.0 L368.4,206.6 L367.0,207.9 L366.7,207.4 L365.6,208.2 L365.1,209.2 L364.6,209.2 L363.5,208.1 L363.1,207.4 L362.0,208.7 L361.8,210.5 L361.8,213.5 L361.3,214.5 L360.8,215.2 L362.1,215.6Z"/><path fill="#59406f" d="M353.2,181.4 L355.0,187.5 L356.7,193.6 L355.2,194.4 L354.9,197.2 L354.9,199.4 L355.4,199.9 L355.1,201.2 L355.5,202.4 L355.4,204.0 L355.4,205.2 L356.0,204.6 L356.6,205.6 L356.9,207.4 L357.7,207.9 L357.9,208.6 L356.8,209.9 L356.2,211.7 L355.4,215.9 L353.8,218.4 L352.0,219.3 L351.5,219.9 L351.8,220.9 L350.9,222.6 L350.2,224.3 L347.8,226.8 L347.3,226.4 L346.9,226.5 L346.6,227.5 L344.9,228.6 L345.2,227.6 L344.2,225.8 L343.8,224.7 L342.8,224.6 L341.3,223.4 L341.6,221.7 L342.6,221.6 L343.2,221.0 L344.3,220.5 L342.8,218.2 L342.5,216.1 L342.0,214.1 L340.8,212.5 L340.8,210.9 L339.4,211.5 L339.0,209.5 L337.9,208.8 L338.0,204.2 L340.0,199.9 L339.1,195.8 L338.7,192.4 L338.2,189.0 L338.2,187.5 L337.1,186.8 L336.8,185.9 L335.8,185.4 L333.8,180.8 L335.2,178.1 L340.0,179.0 L344.5,179.9 L349.0,180.7 L353.2,181.4Z"/><path fill="#8e762a" d="M93.1,202.5 L92.9,204.3 L92.5,205.5 L91.8,205.8 L92.2,207.0 L92.0,207.9 L90.5,206.8 L89.2,206.6 L87.8,205.9 L86.5,206.1 L85.4,204.7 L85.8,203.7 L88.0,204.9 L89.8,205.8 L90.8,205.4 L90.0,203.6 L90.3,202.4 L88.8,201.4 L89.6,200.7 L91.0,201.3 L93.1,202.5Z"/><path fill="#8e762a" d="M92.0,207.9 L92.2,207.0 L91.8,205.8 L92.5,205.5 L92.9,204.3 L93.1,202.5 L93.5,202.1 L95.5,202.7 L96.8,204.0 L97.5,204.1 L97.7,205.4 L99.2,205.7 L98.9,206.6 L100.0,207.1 L101.1,208.6 L99.9,209.7 L98.8,208.6 L97.6,208.4 L96.7,208.0 L96.2,208.5 L95.1,208.4 L94.9,207.5 L94.0,207.7 L92.5,209.5 L92.0,208.8 L92.0,207.9Z"/><path fill="#71323b" d="M165.8,15.5 L165.4,15.8 L164.2,15.8 L165.1,15.5 L165.8,15.5Z"/><path fill="#71323b" d="M330.3,81.0 L331.6,82.7 L331.8,84.0 L333.8,87.3 L336.3,88.6 L337.8,90.3 L340.7,91.9 L340.7,91.9 L341.4,93.5 L341.9,94.2 L341.7,94.5 L340.1,93.8 L339.9,94.0 L339.2,94.1 L338.1,93.5 L337.3,93.9 L337.4,94.9 L336.9,94.6 L335.1,94.8 L333.9,95.9 L333.1,96.3 L333.2,96.7 L330.5,95.9 L328.9,96.1 L327.0,95.5 L327.2,94.4 L325.8,91.7 L324.5,91.2 L324.5,88.9 L324.0,88.4 L323.8,89.6 L322.8,88.6 L322.5,87.5 L322.9,86.4 L322.2,85.5 L320.7,84.5 L319.7,82.9 L319.0,82.3 L317.3,82.8 L317.0,83.4 L315.5,82.8 L315.4,83.8 L313.6,84.1 L313.2,83.7 L311.9,83.0 L311.2,83.5 L310.4,82.9 L310.1,82.2 L308.2,81.5 L307.7,82.5 L307.3,82.6 L307.7,83.4 L307.3,83.6 L307.3,83.6 L305.5,82.3 L304.5,81.7 L304.5,81.4 L305.2,80.8 L304.9,80.0 L304.1,79.7 L303.1,79.8 L302.7,79.3 L301.9,79.2 L299.8,78.3 L299.3,77.5 L298.1,76.6 L296.7,76.7 L296.6,77.4 L295.9,76.9 L294.4,77.1 L292.7,76.1 L291.4,75.1 L290.4,74.9 L290.0,73.9 L287.4,72.1 L286.5,70.5 L286.0,70.2 L286.0,70.2 L285.4,68.3 L283.4,68.0 L283.4,68.0 L282.5,66.1 L281.6,64.2 L280.6,62.5 L279.5,61.3 L276.7,60.9 L275.2,59.5 L272.6,58.6 L270.7,56.7 L266.9,55.3 L265.3,53.6 L262.7,53.2 L260.8,51.9 L261.0,51.4 L260.7,50.0 L260.7,50.0 L260.1,49.0 L262.6,49.2 L263.5,48.7 L264.4,48.3 L266.7,48.2 L269.0,48.1 L270.7,48.4 L272.7,49.3 L273.9,50.7 L274.1,52.0 L272.7,52.4 L271.4,52.8 L270.0,53.2 L270.0,53.8 L272.8,54.1 L274.2,54.9 L277.1,56.6 L278.6,56.4 L279.6,56.4 L278.3,55.5 L276.8,55.1 L276.0,54.1 L277.4,53.9 L278.8,53.7 L278.4,52.8 L276.0,52.1 L275.0,50.7 L273.9,49.3 L274.4,48.9 L275.6,48.8 L273.7,47.5 L271.7,47.1 L270.1,46.1 L268.0,45.6 L268.8,45.1 L269.6,44.6 L271.4,45.0 L271.5,45.9 L273.2,46.6 L274.4,46.7 L274.0,45.5 L272.1,44.6 L271.5,43.7 L270.9,42.8 L269.8,41.4 L268.5,40.0 L268.7,39.7 L270.5,40.9 L270.9,40.4 L269.8,39.6 L269.7,38.6 L268.3,37.4 L270.1,37.5 L267.9,36.2 L266.2,36.2 L265.1,35.7 L265.4,35.1 L265.7,34.5 L266.4,34.1 L267.7,33.7 L268.9,33.2 L267.2,32.5 L265.9,32.6 L265.2,32.4 L265.2,32.9 L263.7,32.4 L261.5,32.1 L260.5,31.9 L257.3,30.5 L254.3,29.7 L253.6,29.3 L253.6,28.8 L253.6,28.3 L255.2,28.5 L258.0,29.4 L258.7,29.3 L260.7,29.6 L264.9,30.5 L266.2,30.4 L268.4,31.1 L273.2,33.3 L273.2,32.8 L272.0,32.3 L270.8,31.5 L269.3,31.0 L267.6,30.2 L266.2,30.1 L264.0,29.4 L264.2,29.9 L262.7,29.7 L259.4,28.7 L257.5,28.8 L254.9,27.7 L252.8,27.5 L252.6,27.3 L254.0,27.3 L257.0,27.9 L257.2,27.6 L255.2,27.4 L253.4,26.6 L252.9,26.2 L252.4,25.8 L253.2,25.2 L251.3,25.3 L248.3,25.0 L247.0,24.4 L246.5,24.0 L246.0,23.6 L245.4,23.2 L244.7,22.8 L243.6,23.0 L241.3,22.6 L240.7,22.2 L238.5,21.7 L237.7,21.3 L236.8,21.0 L236.0,20.9 L235.2,20.6 L234.4,20.2 L234.5,20.0 L233.3,19.8 L232.1,19.5 L231.1,19.1 L230.0,19.2 L228.5,19.1 L227.4,18.9 L226.4,18.8 L226.1,18.3 L227.4,18.5 L226.9,18.2 L226.4,18.0 L227.2,17.7 L226.2,17.6 L225.3,17.4 L224.4,17.1 L224.1,16.8 L223.8,16.5 L223.8,16.2 L224.9,16.0 L226.2,16.1 L227.6,16.3 L229.1,16.4 L230.2,16.5 L229.5,16.2 L228.8,15.8 L227.8,15.7 L228.4,15.4 L227.7,15.4 L226.1,15.1 L224.9,14.8 L223.7,14.5 L224.2,14.3 L223.0,14.0 L221.9,13.8 L220.7,13.5 L219.7,13.8 L218.9,13.6 L218.1,13.4 L216.6,13.2 L215.7,12.8 L215.8,12.5 L216.7,12.4 L216.1,12.0 L214.8,11.7 L213.1,12.0 L211.7,11.7 L209.8,11.6 L207.9,11.4 L207.1,11.4 L205.4,11.3 L205.9,11.7 L204.4,11.9 L202.7,11.7 L200.9,11.7 L199.1,11.6 L197.3,11.6 L195.4,11.6 L194.4,11.4 L192.9,11.3 L191.4,11.2 L189.9,11.4 L188.5,11.5 L187.2,11.6 L184.9,11.8 L183.7,11.8 L183.3,11.6 L181.7,11.7 L180.4,11.9 L178.4,12.2 L176.2,12.4 L174.3,12.8 L171.3,13.0 L170.4,13.3 L172.1,13.2 L172.2,13.4 L170.4,13.7 L168.6,14.1 L167.6,14.3 L166.6,14.6 L164.8,14.9 L163.0,15.3 L160.9,15.7 L157.4,15.8 L153.9,16.1 L153.9,16.1 L154.7,15.8 L156.3,15.4 L154.4,15.8 L152.3,16.2 L151.3,16.5 L150.4,16.7 L150.3,16.7 L153.1,15.9 L154.3,15.6 L155.6,15.3 L168.2,12.7 L181.0,10.9 L193.9,10.1 L206.8,10.1 L219.7,11.0 L232.5,12.8 L245.1,15.4 L257.6,18.9 L269.7,23.3 L281.6,28.4 L293.0,34.3 L304.1,41.0 L304.2,41.1 L304.8,41.5 L304.1,41.1 L305.9,42.3 L305.4,42.0 L305.7,42.3 L304.9,41.9 L305.0,42.1 L307.0,43.5 L307.0,43.8 L308.7,45.0 L306.6,44.1 L304.4,43.2 L303.4,43.1 L302.4,42.4 L304.5,44.0 L306.5,45.7 L307.2,46.5 L305.8,45.7 L305.7,46.2 L306.9,47.3 L304.4,46.1 L304.7,47.2 L306.2,48.5 L307.2,49.8 L308.2,51.0 L309.0,51.8 L310.0,53.6 L311.0,55.4 L312.0,56.3 L313.6,56.9 L314.5,58.1 L315.2,58.4 L316.6,60.1 L318.1,59.9 L319.4,61.0 L319.5,62.1 L320.3,62.9 L319.2,63.1 L319.4,64.5 L320.5,66.3 L319.5,66.5 L318.6,66.8 L317.6,67.1 L317.5,68.6 L318.7,70.5 L319.9,72.5 L321.7,74.1 L319.9,73.8 L322.5,76.8 L323.1,77.0 L324.8,79.2 L326.7,79.8 L326.8,79.1 L328.6,79.9 L329.8,81.1 L330.3,81.0Z"/><path fill="#71323b" d="M223.1,22.1 L222.5,21.9 L221.8,21.8 L222.4,21.3 L223.1,20.8 L223.8,20.4 L225.9,20.1 L226.6,20.3 L227.2,20.5 L227.5,20.8 L227.7,21.1 L227.4,21.6 L225.8,22.0 L225.7,22.3 L224.4,22.2 L223.1,22.1Z"/><path fill="#71323b" d="M223.7,19.7 L223.7,19.4 L223.7,19.0 L224.7,18.9 L225.9,19.2 L227.2,19.5 L228.4,19.8 L224.5,20.0 L223.9,19.9 L223.7,19.7Z"/><path fill="#71323b" d="M204.9,13.7 L203.9,13.6 L202.8,13.6 L201.4,13.4 L199.9,13.2 L200.6,12.8 L202.2,12.8 L203.8,12.9 L205.3,12.8 L206.7,13.2 L206.0,13.6 L204.9,13.7Z"/><path fill="#71323b" d="M197.3,13.1 L196.2,13.1 L195.1,13.0 L196.0,12.8 L197.4,12.8 L199.1,13.0 L198.9,13.2 L197.3,13.1Z"/><path fill="#71323b" d="M204.9,12.1 L203.9,12.3 L202.7,12.3 L201.4,12.1 L201.3,12.0 L202.8,12.0 L203.8,12.0 L204.7,12.1 L204.9,12.1Z"/><path fill="#71323b" d="M230.6,32.4 L230.2,31.9 L230.2,31.5 L231.1,31.6 L230.4,31.4 L229.9,31.1 L230.6,30.9 L231.1,31.0 L231.5,31.4 L231.7,31.7 L232.2,31.8 L232.7,32.2 L231.8,32.3 L230.9,32.0 L230.7,32.2 L230.6,32.4Z"/><path fill="#71323b" d="M293.7,85.1 L291.8,86.4 L290.2,87.0 L289.4,85.8 L290.2,84.1 L291.7,83.8 L292.5,83.8 L293.0,84.6 L293.7,85.1Z"/><path fill="#71323b" d="M253.2,35.3 L251.8,34.4 L250.4,33.6 L248.9,33.4 L248.0,32.8 L247.2,32.2 L246.0,31.4 L244.9,30.7 L244.4,30.1 L243.9,29.5 L242.5,28.8 L241.8,28.1 L242.9,28.1 L244.0,28.4 L245.1,29.1 L246.1,29.8 L247.1,30.5 L248.0,31.1 L249.7,32.0 L251.3,32.9 L254.5,34.2 L257.5,35.7 L260.2,36.4 L262.7,36.3 L263.0,36.6 L262.8,37.3 L262.6,38.0 L261.2,37.7 L260.3,38.2 L258.6,37.7 L257.9,37.1 L256.2,36.6 L253.6,35.0 L253.2,35.3Z"/><path fill="#71323b" d="M152.6,17.4 L151.5,17.5 L150.3,17.8 L152.0,17.6 L150.5,18.1 L149.1,18.6 L145.2,19.6 L145.2,19.4 L146.7,18.8 L144.7,19.1 L144.7,19.0 L145.8,18.6 L147.3,18.2 L149.3,17.6 L150.4,17.4 L151.8,17.0 L152.8,16.6 L154.0,16.3 L154.4,16.4 L155.3,16.0 L154.0,16.2 L153.9,16.1 L157.4,15.8 L160.9,15.7 L159.0,16.0 L157.1,16.4 L154.9,16.9 L152.6,17.4Z"/><path fill="#71323b" d="M163.2,16.1 L164.2,15.8 L165.4,15.8 L165.4,15.9 L164.7,16.1 L162.9,16.4 L162.7,16.4 L163.2,16.1Z"/><path fill="#71323b" d="M322.8,96.7 L322.5,95.9 L323.5,95.7 L323.9,95.5 L324.4,95.9 L324.6,95.8 L324.8,96.0 L325.7,96.2 L326.4,95.1 L327.0,96.1 L326.6,97.6 L326.7,100.3 L325.8,100.3 L325.0,98.9 L323.4,99.2 L323.1,98.6 L323.2,96.9 L322.8,96.7Z"/><path fill="#8e762a" d="M82.2,174.0 L83.3,174.1 L84.7,174.8 L84.5,175.6 L82.0,175.2 L82.2,174.0Z"/><path fill="#8e762a" d="M85.0,174.2 L86.3,176.3 L85.2,178.4 L85.0,177.8 L85.5,176.2 L84.9,174.6 L85.0,174.2Z"/><path fill="#8e762a" d="M82.3,179.6 L83.0,180.0 L83.0,182.9 L82.4,184.8 L81.8,184.7 L81.8,182.7 L81.3,181.4 L82.3,179.6Z"/><path fill="#59406f" d="M148.2,379.9 L149.7,379.8 L151.6,380.4 L152.3,380.2 L154.3,380.9 L154.1,381.1 L151.9,380.9 L150.7,380.4 L149.6,380.5 L148.2,379.9Z"/><path fill="#71323b" d="M226.1,39.8 L225.4,39.3 L225.9,38.9 L227.2,39.2 L228.8,39.3 L230.4,39.5 L230.4,40.0 L230.5,40.6 L232.2,41.8 L232.3,42.2 L234.2,43.6 L233.8,44.0 L232.5,43.7 L231.2,43.5 L230.8,42.8 L229.4,42.7 L226.5,41.8 L224.3,40.7 L224.5,40.2 L224.6,39.7 L225.6,40.1 L226.1,39.8Z"/><path fill="#71323b" d="M260.7,50.0 L261.0,51.4 L260.8,51.9 L259.1,50.6 L257.3,50.5 L257.4,51.7 L259.1,53.2 L259.7,54.4 L258.4,54.4 L257.7,55.0 L255.7,54.6 L255.9,55.3 L255.6,55.6 L257.2,56.9 L255.4,57.4 L256.6,58.5 L255.9,58.9 L257.1,60.6 L258.8,63.2 L260.7,66.8 L261.8,67.4 L262.3,68.4 L261.3,68.8 L262.7,71.2 L265.7,74.1 L267.4,75.0 L269.6,77.8 L270.1,79.9 L270.7,81.5 L268.7,80.3 L268.6,84.1 L267.3,85.4 L264.5,84.8 L262.1,82.3 L259.7,79.6 L257.4,76.9 L257.2,75.0 L257.9,73.5 L258.5,72.0 L258.4,68.8 L257.1,65.1 L256.0,62.6 L254.8,60.1 L254.3,58.0 L253.8,56.3 L253.2,54.6 L253.3,53.8 L253.5,52.9 L254.6,52.4 L253.2,50.4 L254.3,49.7 L254.7,48.7 L256.4,48.6 L258.2,48.5 L258.4,49.5 L260.7,50.0Z"/><path fill="#71323b" d="M229.1,36.8 L230.2,37.8 L229.9,38.2 L229.6,38.6 L228.9,38.8 L228.2,39.0 L227.4,38.6 L226.9,38.9 L225.3,38.5 L225.5,38.0 L225.6,37.6 L226.7,37.6 L226.1,37.0 L226.8,36.9 L227.5,36.8 L229.1,36.8Z"/><path fill="#71323b" d="M234.5,40.2 L234.7,40.7 L234.8,41.3 L233.5,41.4 L233.1,40.9 L232.0,40.6 L232.1,40.2 L232.2,39.8 L233.4,40.2 L234.5,40.2Z"/><path fill="#8e762a" d="M195.0,39.3 L195.9,38.8 L196.7,38.4 L197.4,38.5 L198.1,38.5 L198.7,37.9 L199.3,37.8 L200.0,37.7 L200.7,37.8 L201.4,37.8 L202.2,37.9 L202.9,37.9 L203.6,38.2 L204.4,38.5 L205.1,38.8 L205.9,39.0 L205.4,39.8 L204.6,39.9 L203.8,40.0 L203.0,40.1 L202.2,40.2 L201.4,40.3 L201.7,40.6 L202.5,40.5 L203.2,40.3 L204.0,40.6 L204.8,40.9 L205.5,40.2 L206.1,40.8 L206.0,41.9 L206.5,41.5 L207.0,41.1 L207.6,40.8 L208.2,40.5 L208.8,40.2 L209.6,40.2 L210.4,40.3 L211.1,41.0 L210.8,41.5 L210.4,42.0 L210.0,42.6 L209.9,43.0 L209.2,43.3 L208.4,43.6 L209.0,43.5 L209.7,43.5 L209.7,44.9 L209.8,46.2 L210.8,48.4 L212.2,49.6 L211.1,49.8 L210.1,50.5 L211.9,51.5 L212.8,53.2 L212.0,53.5 L213.9,55.2 L212.9,55.3 L212.0,55.5 L213.3,56.3 L213.3,57.1 L212.1,57.5 L210.8,57.7 L212.5,59.0 L212.8,60.0 L210.6,59.3 L210.2,59.9 L211.7,60.4 L213.4,61.6 L214.4,63.4 L212.6,64.0 L211.6,63.2 L209.9,62.0 L210.7,63.5 L209.7,64.8 L211.1,64.8 L212.6,64.7 L214.1,64.7 L212.9,65.8 L211.7,67.0 L210.3,68.0 L208.8,69.0 L207.1,69.5 L205.3,70.0 L204.0,70.1 L202.7,71.0 L201.0,73.7 L199.6,74.5 L198.2,75.4 L197.2,75.5 L195.4,76.1 L193.4,76.6 L192.0,78.1 L191.8,79.9 L190.9,81.6 L188.1,83.5 L188.4,85.6 L187.4,87.8 L186.2,90.3 L183.9,90.3 L181.9,88.0 L178.8,87.7 L177.6,86.1 L177.4,83.4 L175.8,79.9 L175.7,78.2 L176.3,75.9 L175.4,73.4 L176.5,71.7 L176.1,70.7 L178.4,68.1 L180.5,67.5 L181.3,66.5 L182.2,64.8 L180.6,65.4 L179.9,65.7 L178.7,65.9 L177.7,64.9 L178.3,63.4 L179.3,62.2 L180.3,62.4 L181.2,62.8 L182.2,63.2 L181.0,61.6 L180.4,60.7 L179.3,60.8 L178.7,60.2 L180.8,58.3 L180.7,57.4 L180.7,55.9 L181.0,53.5 L180.4,52.5 L181.0,51.7 L180.4,50.9 L179.8,50.1 L179.1,49.9 L178.4,49.7 L177.5,49.5 L176.5,49.3 L175.6,49.2 L174.7,49.0 L174.6,48.2 L174.7,46.7 L175.7,46.7 L176.8,46.6 L177.5,46.8 L178.1,46.9 L177.4,46.5 L176.7,46.1 L176.1,45.7 L175.8,45.1 L175.6,44.6 L176.5,44.0 L177.9,43.9 L179.4,43.8 L180.8,43.6 L182.1,43.4 L182.9,42.9 L182.6,42.4 L182.2,41.9 L183.3,41.4 L184.7,41.0 L186.1,40.6 L186.9,40.5 L187.4,39.8 L188.1,39.6 L188.8,39.5 L189.5,39.5 L190.2,39.5 L190.9,39.6 L191.5,39.7 L191.7,40.3 L192.5,39.9 L193.4,39.5 L193.7,39.9 L194.1,40.3 L194.7,40.4 L195.0,40.8 L195.4,41.1 L195.0,40.6 L194.7,40.1 L195.0,39.3Z"/><path fill="#59406f" d="M330.3,326.4 L331.8,324.8 L332.1,325.1 L331.9,325.9 L332.6,325.6 L333.5,325.4 L334.5,324.7 L336.7,322.7 L339.0,318.4 L341.1,314.1 L341.4,314.1 L341.3,315.8 L340.4,317.3 L340.4,317.9 L341.7,316.9 L343.0,315.3 L344.2,314.1 L345.2,312.7 L346.2,311.6 L346.7,311.5 L347.1,311.6 L348.3,310.9 L349.5,309.6 L350.1,308.7 L350.9,307.4 L351.8,306.6 L352.7,305.3 L353.9,303.3 L356.1,300.4 L358.8,296.9 L359.3,296.4 L359.8,296.3 L360.3,295.6 L360.9,295.2 L359.8,298.2 L359.2,299.7 L357.6,302.7 L357.2,303.5 L356.9,303.6 L356.4,304.1 L355.9,305.0 L355.1,306.2 L354.6,307.0 L354.6,307.6 L355.4,306.7 L356.3,305.4 L357.1,304.5 L355.8,306.6 L354.5,308.7 L353.6,310.1 L352.0,312.1 L351.6,312.6 L350.3,314.3 L349.2,315.8 L347.5,318.0 L344.5,321.6 L342.6,323.6 L340.9,325.4 L338.9,327.3 L338.2,328.0 L337.6,328.7 L337.0,329.0 L336.0,329.9 L334.8,330.6 L333.7,331.4 L333.2,331.7 L331.0,333.5 L329.5,334.7 L327.9,336.0 L327.2,336.5 L327.0,336.2 L326.5,336.5 L326.5,336.0 L326.2,336.3 L326.4,335.9 L327.3,334.7 L327.7,333.6 L328.5,332.9 L329.5,331.3 L329.7,329.9 L329.9,328.6 L329.9,328.6 L330.3,326.4Z"/><path fill="#59406f" d="M349.4,314.2 L349.4,314.5 L348.3,316.0 L347.6,316.9 L346.7,317.9 L345.9,318.8 L345.3,319.4 L345.5,318.5 L347.1,316.4 L348.4,314.9 L349.3,314.0 L349.4,314.2Z"/><path fill="#8e762a" d="M41.3,116.7 L41.9,117.8 L42.7,119.0 L42.3,119.4 L42.3,122.4 L42.4,124.7 L42.5,127.0 L44.0,129.3 L44.6,130.2 L45.3,129.1 L46.8,131.0 L46.5,132.4 L46.5,133.9 L46.4,135.8 L45.9,137.7 L45.3,139.5 L45.3,141.0 L45.8,142.8 L47.6,141.2 L48.6,142.1 L48.8,144.0 L48.4,146.6 L48.0,148.7 L47.9,151.0 L47.2,153.3 L47.0,155.0 L47.6,156.8 L48.3,158.3 L48.9,158.6 L47.2,160.8 L46.1,162.8 L44.4,166.7 L43.7,168.1 L43.3,169.9 L43.3,171.8 L42.7,174.4 L42.9,177.4 L42.7,179.4 L42.9,181.4 L44.3,183.4 L44.5,185.2 L46.2,185.3 L47.6,185.9 L49.0,186.2 L50.2,186.3 L51.7,185.8 L52.7,184.2 L53.6,181.7 L54.2,181.0 L55.7,180.9 L57.8,181.3 L59.4,182.3 L60.6,182.7 L60.9,183.6 L60.4,185.1 L58.8,186.4 L57.8,188.0 L58.0,188.7 L57.3,189.9 L56.2,192.1 L55.9,191.0 L55.5,190.9 L55.2,190.7 L54.0,192.2 L53.8,191.6 L53.5,191.7 L53.4,192.1 L51.7,191.1 L50.0,190.1 L49.6,191.8 L48.8,191.3 L49.2,192.8 L49.6,193.9 L49.7,194.7 L49.9,195.0 L49.6,196.1 L47.3,194.7 L45.9,196.6 L46.0,197.4 L45.6,198.0 L45.4,198.8 L44.2,194.2 L43.6,192.6 L42.5,190.9 L41.5,190.4 L40.0,190.7 L39.1,190.4 L38.3,188.7 L37.3,187.2 L36.4,184.7 L35.5,183.4 L34.4,180.6 L33.8,178.1 L33.7,177.0 L33.1,176.1 L32.2,173.9 L32.1,172.0 L31.5,169.0 L31.6,166.5 L31.9,164.7 L32.4,164.8 L32.6,163.9 L33.1,163.4 L33.5,162.3 L33.7,160.6 L34.1,159.3 L34.3,157.4 L34.7,153.4 L34.8,149.9 L35.2,147.5 L35.1,145.3 L35.2,144.4 L36.2,142.8 L36.2,141.5 L36.4,139.4 L37.3,137.1 L37.0,136.3 L37.4,134.1 L37.9,132.2 L38.3,131.2 L39.2,128.5 L40.2,126.0 L40.9,125.0 L41.2,123.1 L40.9,122.8 L41.1,121.4 L40.3,122.3 L39.6,123.8 L38.4,125.9 L37.9,127.5 L37.2,130.2 L36.9,131.1 L36.9,131.5 L36.5,132.6 L36.6,132.8 L35.7,134.8 L35.5,135.9 L35.1,137.1 L34.8,139.3 L33.7,142.4 L33.3,144.0 L32.9,145.7 L32.2,147.3 L32.6,148.0 L32.3,149.8 L32.0,151.5 L31.8,152.0 L31.0,152.6 L30.8,152.3 L31.4,150.2 L31.6,147.8 L31.7,145.5 L31.7,144.1 L32.8,142.1 L33.4,140.3 L33.6,138.9 L33.8,136.8 L33.5,137.0 L33.8,135.9 L33.8,134.5 L34.3,132.2 L34.5,132.0 L34.6,132.7 L35.4,132.1 L36.1,130.9 L36.8,128.0 L37.0,126.6 L37.8,124.4 L38.8,122.2 L39.9,119.5 L41.3,116.7Z"/><path fill="#59406f" d="M136.8,350.7 L138.5,350.8 L141.6,352.7 L142.6,352.8 L145.7,354.5 L148.1,355.8 L150.1,357.3 L149.2,358.0 L150.2,359.1 L149.5,360.0 L146.9,360.5 L144.9,359.9 L143.6,359.8 L140.9,358.7 L139.2,358.5 L137.3,357.2 L137.0,356.1 L137.4,355.8 L136.7,354.0 L136.7,352.1 L136.8,350.7Z"/><path fill="#59406f" d="M150.2,359.1 L149.2,358.0 L150.1,357.3 L148.1,355.8 L145.7,354.5 L142.6,352.8 L141.6,352.7 L138.5,350.8 L136.8,350.7 L139.6,348.6 L142.1,347.2 L143.8,346.6 L145.8,345.8 L145.5,344.1 L143.8,342.7 L142.5,342.9 L142.8,341.8 L142.9,340.5 L142.7,339.3 L141.6,338.8 L140.6,339.0 L139.5,338.7 L139.0,337.8 L138.3,335.7 L137.6,334.9 L135.6,334.0 L134.5,334.2 L131.4,333.3 L130.9,330.2 L129.8,328.7 L130.6,328.4 L130.1,326.9 L130.7,326.0 L130.9,324.2 L130.0,322.5 L128.3,321.6 L127.8,320.5 L128.0,319.1 L122.5,318.0 L120.9,314.8 L121.7,314.9 L121.5,313.8 L120.9,312.9 L120.5,311.4 L118.8,310.3 L116.9,309.9 L115.7,308.9 L113.6,307.9 L112.4,306.7 L109.2,305.5 L105.8,302.4 L105.8,300.6 L105.3,299.5 L105.4,297.5 L101.8,297.0 L100.5,297.7 L98.2,298.1 L97.7,298.8 L96.3,298.5 L94.3,297.7 L92.8,297.7 L91.6,297.0 L91.2,292.9 L89.2,293.9 L86.9,293.1 L85.8,291.3 L84.0,290.5 L84.4,289.5 L82.8,287.3 L81.5,284.4 L82.1,284.1 L82.0,282.9 L83.5,282.6 L83.1,281.0 L83.7,280.2 L83.8,278.9 L86.7,277.9 L88.8,278.0 L89.2,277.7 L91.6,278.6 L92.1,274.7 L92.6,270.9 L92.6,269.6 L92.2,267.8 L91.0,266.3 L91.0,264.1 L92.5,264.1 L93.1,264.6 L93.2,263.4 L91.6,262.6 L91.6,260.7 L96.9,262.3 L97.9,261.5 L98.6,262.7 L99.2,264.6 L99.7,264.4 L101.2,266.4 L103.4,266.8 L104.0,266.0 L106.1,265.8 L107.3,265.6 L107.7,264.4 L109.8,264.0 L109.6,263.3 L107.2,262.5 L106.8,260.5 L107.0,258.4 L105.8,257.3 L106.3,257.2 L108.4,258.1 L110.7,259.4 L111.6,258.8 L113.7,258.8 L117.1,258.3 L118.2,257.4 L117.8,256.4 L119.4,256.6 L120.1,257.5 L119.6,258.7 L120.6,259.4 L121.3,261.0 L120.4,261.9 L119.9,264.4 L120.6,266.1 L120.8,267.6 L122.6,269.4 L124.1,269.8 L124.5,269.3 L125.4,269.3 L126.8,269.0 L127.8,268.4 L129.5,268.9 L130.3,268.9 L132.0,269.5 L132.2,268.9 L131.7,268.2 L132.1,267.4 L133.3,267.8 L134.8,267.8 L136.6,268.7 L137.9,269.5 L138.9,268.8 L139.6,269.0 L140.0,270.0 L141.5,270.0 L142.7,269.0 L143.7,266.8 L145.7,264.2 L146.8,264.2 L147.5,266.0 L149.2,271.6 L150.9,272.3 L151.0,274.4 L148.6,276.6 L149.6,277.7 L155.3,278.7 L155.4,281.8 L157.8,280.0 L161.9,281.5 L167.3,283.7 L168.9,285.6 L168.4,287.2 L172.2,286.5 L178.6,288.4 L183.5,288.5 L188.4,291.1 L192.7,294.4 L195.2,295.3 L198.0,295.4 L199.2,296.3 L200.3,299.9 L200.9,301.6 L199.6,306.2 L197.9,308.0 L193.3,311.7 L191.3,314.7 L188.9,316.9 L188.1,317.0 L187.3,318.9 L187.6,323.6 L186.8,327.4 L186.5,329.0 L185.6,330.0 L185.1,333.1 L182.1,336.1 L181.7,338.4 L179.3,339.3 L178.7,340.6 L175.4,340.4 L170.8,340.9 L168.8,341.8 L165.5,342.1 L162.3,343.5 L160.1,345.4 L159.9,346.9 L160.6,348.1 L160.4,350.1 L160.0,351.0 L158.2,351.9 L155.9,354.9 L153.9,356.1 L152.3,356.7 L151.6,358.3 L150.2,359.1Z"/><path fill="#59406f" d="M94.3,297.7 L96.3,298.5 L97.7,298.8 L98.2,298.1 L100.5,297.7 L101.8,297.0 L105.4,297.5 L105.3,299.5 L105.8,300.6 L105.8,302.4 L109.2,305.5 L112.4,306.7 L113.6,307.9 L115.7,308.9 L116.9,309.9 L118.8,310.3 L120.5,311.4 L120.9,312.9 L121.5,313.8 L121.7,314.9 L120.9,314.8 L122.5,318.0 L128.0,319.1 L127.8,320.5 L128.3,321.6 L130.0,322.5 L130.9,324.2 L130.7,326.0 L130.1,326.9 L130.6,328.4 L129.8,328.7 L129.7,327.9 L126.8,326.2 L124.1,325.7 L119.4,325.4 L118.5,327.2 L118.7,328.5 L118.3,331.0 L117.7,330.4 L114.6,329.6 L114.1,331.2 L112.1,329.2 L108.4,327.7 L106.9,329.3 L105.1,329.1 L103.1,325.6 L101.0,322.5 L101.2,320.4 L99.6,319.0 L98.8,317.1 L97.2,315.0 L98.2,312.8 L96.7,310.3 L97.1,309.6 L96.5,308.5 L97.3,307.5 L96.9,305.3 L96.8,303.4 L97.2,302.7 L94.3,297.7Z"/><path fill="#59406f" d="M91.6,278.6 L89.2,277.7 L88.8,278.0 L86.7,277.9 L83.8,278.9 L83.7,280.2 L83.1,281.0 L83.5,282.6 L82.0,282.9 L82.1,284.1 L81.5,284.4 L82.8,287.3 L84.4,289.5 L84.0,290.5 L85.8,291.3 L86.9,293.1 L89.2,293.9 L91.2,292.9 L91.6,297.0 L92.8,297.7 L94.3,297.7 L97.2,302.7 L96.8,303.4 L96.9,305.3 L97.3,307.5 L96.5,308.5 L97.1,309.6 L96.7,310.3 L98.2,312.8 L97.2,315.0 L96.8,316.1 L95.6,316.4 L92.7,314.1 L92.2,313.0 L86.6,308.8 L81.6,304.5 L79.4,302.2 L77.9,299.6 L78.2,299.0 L75.5,294.7 L72.3,288.7 L69.3,282.2 L68.2,280.5 L67.3,278.1 L65.3,275.5 L63.5,273.6 L64.2,272.7 L62.9,269.4 L63.4,267.7 L65.2,266.6 L65.5,267.9 L64.9,268.4 L65.0,269.5 L66.0,269.6 L66.9,270.4 L68.0,272.2 L69.3,271.6 L69.6,269.8 L71.0,267.8 L73.9,267.8 L76.5,265.7 L77.3,264.0 L76.9,261.6 L77.6,261.6 L79.3,263.6 L80.1,265.3 L81.3,266.5 L82.9,270.1 L84.9,271.1 L86.3,270.8 L87.3,271.6 L88.9,271.8 L91.0,273.9 L89.4,276.3 L90.2,276.6 L91.6,278.6Z"/><path fill="#59406f" d="M99.7,264.4 L99.2,264.6 L98.6,262.7 L97.9,261.5 L96.9,262.3 L91.6,260.7 L91.6,262.6 L93.2,263.4 L93.1,264.6 L92.5,264.1 L91.0,264.1 L91.0,266.3 L92.2,267.8 L92.6,269.6 L92.6,270.9 L92.1,274.7 L91.6,278.6 L90.2,276.6 L89.4,276.3 L91.0,273.9 L88.9,271.8 L87.3,271.6 L86.3,270.8 L84.9,271.1 L82.9,270.1 L81.3,266.5 L80.1,265.3 L79.3,263.6 L77.6,261.6 L76.9,261.6 L75.8,260.5 L74.6,259.1 L73.9,259.3 L71.8,258.1 L71.2,256.6 L70.8,256.4 L68.4,253.7 L68.1,252.7 L69.0,252.8 L68.9,251.2 L69.5,250.4 L70.7,250.6 L71.8,249.1 L72.8,247.9 L72.0,246.8 L72.5,245.2 L72.2,242.1 L72.7,241.5 L72.6,238.8 L71.7,236.7 L72.2,235.3 L72.9,235.9 L73.5,235.1 L73.1,233.0 L73.5,232.7 L74.7,233.3 L76.8,231.8 L77.8,231.8 L78.0,230.8 L78.8,228.3 L80.4,227.3 L82.0,227.8 L82.3,227.2 L84.2,228.2 L86.4,227.3 L87.5,226.9 L89.0,225.7 L89.9,226.2 L90.4,227.3 L89.8,228.2 L88.1,228.2 L87.2,229.6 L86.1,230.1 L85.2,231.1 L84.6,233.2 L83.7,234.8 L85.0,235.5 L85.2,237.0 L85.7,237.9 L85.8,239.2 L85.4,240.3 L85.4,241.0 L86.1,241.4 L86.6,242.7 L90.0,243.5 L91.6,244.3 L93.3,247.6 L94.4,247.6 L96.4,248.3 L98.0,248.4 L98.9,249.2 L98.3,250.7 L97.7,251.6 L97.3,253.7 L97.8,255.9 L98.6,257.1 L98.6,257.8 L97.2,258.9 L98.2,259.9 L98.9,261.1 L99.7,264.4Z"/><path fill="#8e762a" d="M73.5,232.7 L73.1,233.0 L73.5,235.1 L72.9,235.9 L72.2,235.3 L71.7,236.7 L71.0,235.5 L70.7,233.6 L71.3,233.0 L70.8,232.6 L70.4,231.4 L69.4,230.0 L68.3,229.8 L67.7,230.7 L66.7,231.1 L66.2,231.0 L65.9,231.5 L66.8,233.7 L66.1,233.8 L65.8,234.1 L64.7,233.8 L64.5,231.8 L64.1,232.2 L63.4,231.7 L63.1,230.2 L62.2,229.6 L61.6,229.0 L60.7,228.5 L60.5,229.2 L60.3,228.6 L60.5,228.0 L60.8,227.5 L60.8,226.9 L61.1,226.6 L60.7,226.0 L60.9,224.7 L61.8,224.8 L62.4,226.3 L62.3,227.0 L63.2,227.5 L63.4,227.3 L63.9,228.4 L65.1,228.6 L66.1,228.3 L67.6,228.2 L68.5,227.6 L69.8,228.4 L69.7,228.6 L71.0,229.3 L72.0,230.2 L72.6,231.5 L73.5,232.7Z"/><path fill="#8e762a" d="M61.8,224.8 L60.9,224.7 L60.7,226.0 L61.1,226.6 L60.8,226.9 L60.8,227.5 L60.5,228.0 L60.3,228.6 L59.2,227.3 L58.9,226.5 L59.2,226.0 L59.2,225.3 L58.7,224.3 L57.9,223.3 L57.2,222.5 L57.2,221.5 L56.8,220.7 L56.8,221.7 L56.2,222.2 L55.9,221.1 L55.3,220.4 L55.1,219.7 L55.2,218.7 L55.6,217.9 L55.1,217.1 L55.7,216.8 L56.1,216.5 L57.3,218.1 L57.9,217.9 L58.5,218.5 L58.7,219.3 L59.3,219.8 L59.9,219.4 L60.2,221.4 L60.9,223.0 L61.8,224.8Z"/><path fill="#8e762a" d="M59.9,219.4 L59.3,219.8 L58.7,219.3 L58.5,218.5 L57.9,217.9 L57.3,218.1 L56.1,216.5 L55.7,216.8 L55.1,215.4 L54.4,213.7 L54.1,212.4 L53.5,210.9 L52.7,209.0 L53.1,208.6 L53.3,209.3 L53.5,209.1 L54.1,209.3 L54.5,208.8 L54.8,208.9 L55.1,207.3 L55.5,207.5 L56.0,207.8 L56.6,207.2 L57.0,208.1 L57.3,207.8 L57.8,207.6 L58.7,207.1 L58.8,206.5 L59.0,206.6 L59.4,206.0 L59.7,206.0 L59.9,206.7 L60.3,207.0 L60.9,206.9 L61.4,207.1 L62.2,207.1 L62.6,206.8 L63.3,207.2 L63.1,207.4 L62.8,208.1 L62.8,209.3 L62.1,210.2 L61.6,211.3 L61.3,212.7 L61.3,213.5 L61.1,215.0 L60.7,215.1 L60.3,216.4 L60.3,217.2 L59.7,217.8 L59.7,218.7 L59.9,219.4Z"/><path fill="#8e762a" d="M63.3,207.2 L62.6,206.8 L62.2,207.1 L61.4,207.1 L60.9,206.9 L60.3,207.0 L59.9,206.7 L59.7,206.0 L59.4,206.0 L59.0,206.6 L58.8,206.5 L58.7,207.1 L57.8,207.6 L57.3,207.8 L57.0,208.1 L56.6,207.2 L56.0,207.8 L55.5,207.5 L55.1,207.3 L54.8,208.9 L54.5,208.8 L54.1,209.3 L53.5,209.1 L53.3,208.0 L52.8,207.4 L53.2,206.2 L53.0,205.7 L52.6,205.3 L51.7,205.2 L51.7,204.7 L51.2,203.9 L51.0,203.0 L50.5,202.4 L51.0,201.9 L51.0,201.2 L51.3,200.6 L52.4,200.3 L53.5,199.6 L53.7,199.8 L54.2,199.5 L54.8,199.8 L54.9,200.1 L55.2,200.1 L56.1,200.9 L57.0,201.3 L57.7,201.3 L58.1,201.1 L58.7,201.6 L59.1,202.0 L59.7,202.2 L60.1,202.2 L61.0,203.1 L61.3,203.3 L61.8,204.2 L62.2,205.2 L62.9,206.1 L63.3,207.2Z"/><path fill="#8e762a" d="M50.5,202.4 L51.0,203.0 L51.2,203.9 L51.7,204.7 L51.7,205.2 L52.6,205.3 L53.0,205.7 L53.2,206.2 L52.8,207.4 L52.4,208.0 L51.3,207.3 L50.7,206.6 L50.0,205.5 L49.0,204.7 L48.6,203.7 L48.8,203.3 L49.6,202.9 L50.0,202.8 L50.0,202.4 L50.5,202.4Z"/><path fill="#8e762a" d="M45.4,198.8 L45.6,198.0 L46.0,197.4 L45.9,196.6 L47.3,194.7 L49.6,196.1 L49.9,195.0 L49.7,194.7 L49.6,193.9 L49.2,192.8 L48.8,191.3 L49.6,191.8 L50.0,190.1 L51.7,191.1 L53.4,192.1 L52.7,194.6 L51.7,198.0 L52.3,198.3 L52.8,199.3 L53.0,198.9 L53.5,199.6 L52.4,200.3 L51.3,200.6 L51.0,201.2 L51.0,201.9 L50.5,202.4 L50.0,202.4 L50.0,202.8 L49.6,202.9 L48.8,203.3 L48.6,203.7 L47.8,202.6 L46.7,201.9 L46.0,200.7 L45.4,198.8Z"/><path fill="#8e762a" d="M53.4,192.1 L53.5,191.7 L53.8,191.6 L54.0,192.2 L55.2,190.7 L55.5,190.9 L55.4,191.3 L55.8,191.5 L55.5,192.4 L54.9,193.6 L54.9,194.1 L54.4,195.1 L54.5,195.5 L53.9,196.9 L53.3,197.6 L52.9,197.5 L52.3,198.3 L51.7,198.0 L52.7,194.6 L53.4,192.1Z"/><path fill="#59406f" d="M117.8,256.4 L118.2,257.4 L117.1,258.3 L113.7,258.8 L111.6,258.8 L110.7,259.4 L108.4,258.1 L106.3,257.2 L105.8,257.3 L107.0,258.4 L106.8,260.5 L107.2,262.5 L109.6,263.3 L109.8,264.0 L107.7,264.4 L107.3,265.6 L106.1,265.8 L104.0,266.0 L103.4,266.8 L101.2,266.4 L99.7,264.4 L98.9,261.1 L98.2,259.9 L97.2,258.9 L98.6,257.8 L98.6,257.1 L97.8,255.9 L97.3,253.7 L97.7,251.6 L98.3,250.7 L98.9,249.2 L98.0,248.4 L96.4,248.3 L94.4,247.6 L93.3,247.6 L91.6,244.3 L90.0,243.5 L86.6,242.7 L86.1,241.4 L85.4,241.0 L85.4,240.3 L85.8,239.2 L85.7,237.9 L85.2,237.0 L85.0,235.5 L83.7,234.8 L84.6,233.2 L85.2,231.1 L86.1,230.1 L87.2,229.6 L88.1,228.2 L89.8,228.2 L89.6,228.9 L88.1,228.8 L88.7,230.5 L88.5,232.1 L87.2,233.6 L87.9,236.4 L89.0,236.6 L89.9,234.5 L89.2,233.1 L89.3,230.7 L92.7,230.4 L92.6,228.8 L93.6,228.1 L94.3,230.6 L96.2,231.2 L97.7,233.4 L97.7,234.5 L100.2,235.2 L103.2,235.7 L104.7,237.5 L106.8,238.4 L108.5,237.8 L108.6,237.0 L112.1,237.6 L115.6,238.4 L113.0,238.8 L113.9,240.5 L116.2,241.2 L118.3,243.2 L118.6,245.9 L120.2,246.1 L121.3,247.1 L118.8,248.5 L118.5,249.6 L119.4,250.9 L118.7,251.4 L116.8,251.5 L116.8,253.0 L115.9,253.7 L117.8,256.4Z"/><path fill="#59406f" d="M130.3,268.9 L129.5,268.9 L127.8,268.4 L126.8,269.0 L125.4,269.3 L124.5,269.3 L124.1,269.8 L122.6,269.4 L120.8,267.6 L120.6,266.1 L119.9,264.4 L120.4,261.9 L121.3,261.0 L120.6,259.4 L119.6,258.7 L120.1,257.5 L119.4,256.6 L117.8,256.4 L115.9,253.7 L116.8,253.0 L116.8,251.5 L118.7,251.4 L119.4,250.9 L118.5,249.6 L118.8,248.5 L121.3,247.1 L123.2,248.6 L124.9,251.0 L124.9,252.7 L126.0,252.9 L127.6,254.8 L128.8,256.0 L128.2,258.8 L126.3,259.3 L126.4,260.0 L125.8,261.5 L127.1,264.0 L128.1,264.2 L128.4,266.0 L130.3,268.9Z"/><path fill="#59406f" d="M136.6,268.7 L134.8,267.8 L133.3,267.8 L132.1,267.4 L131.7,268.2 L132.2,268.9 L132.0,269.5 L130.3,268.9 L128.4,266.0 L128.1,264.2 L127.1,264.0 L125.8,261.5 L126.4,260.0 L126.3,259.3 L128.2,258.8 L128.8,256.0 L132.4,257.3 L132.8,256.8 L135.3,256.9 L138.6,258.3 L136.9,260.7 L137.1,262.9 L138.2,264.9 L137.7,266.1 L137.4,267.5 L136.6,268.7Z"/><path fill="#71323b" d="M145.7,264.2 L143.7,266.8 L142.7,269.0 L141.5,270.0 L140.0,270.0 L139.6,269.0 L138.9,268.8 L137.9,269.5 L136.6,268.7 L137.4,267.5 L137.7,266.1 L138.2,264.9 L137.1,262.9 L136.9,260.7 L138.6,258.3 L139.6,258.8 L141.9,259.8 L145.2,262.9 L145.7,264.2Z"/><path fill="#71323b" d="M281.3,108.4 L282.5,108.8 L285.1,108.5 L285.5,110.7 L286.5,112.7 L286.3,113.4 L285.4,113.4 L285.9,114.1 L285.5,116.1 L286.2,117.4 L286.8,116.7 L288.1,117.7 L288.4,118.5 L289.5,119.4 L289.4,120.5 L291.1,122.6 L292.2,122.6 L292.7,123.9 L291.9,126.1 L287.9,126.7 L285.6,128.6 L286.3,130.4 L284.2,131.5 L281.4,130.9 L280.9,131.7 L276.6,131.4 L275.4,130.5 L275.6,128.4 L273.4,122.4 L270.1,119.9 L268.0,118.8 L264.6,118.5 L263.5,116.4 L265.6,115.1 L269.1,115.0 L266.9,112.0 L269.2,112.7 L270.7,111.0 L272.2,109.3 L271.4,106.9 L272.6,105.9 L273.4,106.7 L274.2,106.5 L275.6,107.4 L277.5,108.3 L278.2,107.8 L280.4,108.5 L280.9,108.6 L281.3,108.4Z"/><path fill="#71323b" d="M296.7,126.1 L297.2,124.5 L298.8,126.9 L299.4,129.3 L298.3,129.1 L296.9,127.3 L296.7,126.1Z"/><path fill="#59406f" d="M76.9,261.6 L77.3,264.0 L76.5,265.7 L73.9,267.8 L71.0,267.8 L69.6,269.8 L69.3,271.6 L68.0,272.2 L66.9,270.4 L66.0,269.6 L65.0,269.5 L64.9,268.4 L65.5,267.9 L65.2,266.6 L66.3,264.9 L65.8,263.4 L64.9,264.4 L63.5,262.5 L63.9,261.9 L63.5,259.0 L64.3,258.9 L64.7,257.2 L65.6,255.7 L65.4,254.4 L66.7,254.3 L68.4,253.7 L70.8,256.4 L71.2,256.6 L71.8,258.1 L73.9,259.3 L74.6,259.1 L75.8,260.5 L76.9,261.6Z"/><path fill="#8e762a" d="M106.4,210.4 L107.8,211.0 L108.2,211.8 L107.3,212.4 L105.3,211.9 L103.7,211.6 L103.8,210.2 L104.3,209.8 L106.4,210.4Z"/><path fill="#8e762a" d="M78.1,201.5 L79.6,202.4 L80.7,203.6 L80.9,204.6 L79.2,204.0 L78.4,204.3 L77.2,203.3 L76.1,201.6 L76.6,201.0 L77.6,201.2 L78.1,201.5Z"/><path fill="#8e762a" d="M71.7,182.3 L73.4,183.3 L75.1,184.1 L76.8,186.0 L77.4,187.5 L79.5,188.0 L80.1,189.1 L81.5,191.8 L82.6,193.8 L83.3,194.0 L84.6,195.2 L84.2,196.0 L85.9,196.7 L87.4,198.7 L87.0,199.3 L85.3,199.2 L83.6,198.8 L82.1,197.9 L78.7,197.0 L80.7,195.8 L79.9,194.6 L78.5,193.8 L78.0,192.6 L77.9,190.6 L76.6,190.2 L74.8,188.5 L74.3,187.5 L71.7,185.8 L71.2,184.9 L72.2,184.5 L70.2,183.4 L68.2,184.3 L67.4,183.9 L66.9,184.6 L65.8,184.4 L65.0,183.7 L66.3,183.3 L67.1,182.3 L68.2,182.1 L69.5,182.0 L71.1,182.4 L71.7,182.3Z"/><path fill="#59406f" d="M360.9,295.2 L360.3,295.6 L359.8,296.3 L359.3,296.4 L358.8,296.9 L358.5,296.5 L357.6,297.0 L357.8,295.7 L358.2,294.8 L357.7,295.0 L357.1,293.4 L357.2,292.3 L357.0,292.1 L357.1,290.4 L358.8,289.4 L359.1,289.3 L359.7,288.8 L361.1,286.5 L363.0,283.2 L363.6,282.6 L364.0,281.5 L365.2,279.7 L366.3,278.4 L366.1,279.3 L367.2,278.3 L367.6,278.3 L367.7,278.7 L368.2,278.3 L368.5,278.5 L367.4,281.9 L366.5,284.1 L365.7,286.1 L365.6,286.7 L364.8,288.4 L364.5,288.8 L363.4,291.0 L360.9,295.2Z"/><path fill="#59406f" d="M358.8,296.9 L356.1,300.4 L353.9,303.3 L352.7,305.3 L351.8,306.6 L350.9,307.4 L350.1,308.7 L349.5,309.6 L348.3,310.9 L347.1,311.6 L346.7,311.5 L346.2,311.6 L345.2,312.7 L344.2,314.1 L343.0,315.3 L341.7,316.9 L340.4,317.9 L340.4,317.3 L341.3,315.8 L341.4,314.1 L341.1,314.1 L342.8,310.5 L344.3,306.9 L346.0,305.8 L347.8,301.3 L349.4,296.7 L350.8,295.8 L353.7,293.1 L354.0,293.8 L355.3,292.0 L355.8,291.6 L356.9,290.4 L357.1,290.4 L357.0,292.1 L357.2,292.3 L357.1,293.4 L357.7,295.0 L358.2,294.8 L357.8,295.7 L357.6,297.0 L358.5,296.5 L358.8,296.9Z"/><path fill="#59406f" d="M341.1,314.1 L339.0,318.4 L336.7,322.7 L334.5,324.7 L333.5,325.4 L332.6,325.6 L331.9,325.9 L332.1,325.1 L331.8,324.8 L330.3,326.4 L329.9,325.4 L330.0,324.2 L330.7,322.2 L331.0,320.7 L332.0,317.4 L333.1,314.6 L333.4,313.4 L333.0,312.7 L332.7,311.2 L332.6,308.7 L332.6,307.4 L331.7,305.7 L332.1,303.8 L333.3,302.8 L334.7,301.8 L336.0,301.2 L336.9,301.8 L337.3,301.4 L340.1,300.0 L342.8,298.6 L345.4,297.1 L346.3,297.6 L348.4,296.5 L350.5,295.3 L354.0,292.2 L355.6,290.6 L356.6,290.0 L357.0,290.2 L356.9,290.4 L355.8,291.6 L355.3,292.0 L354.0,293.8 L353.7,293.1 L350.8,295.8 L349.4,296.7 L347.8,301.3 L346.0,305.8 L344.3,306.9 L342.8,310.5 L341.1,314.1Z"/><path fill="#59406f" d="M257.9,233.6 L256.5,231.3 L254.9,230.3 L256.2,229.5 L257.5,227.1 L258.0,225.3 L259.0,224.1 L260.5,224.1 L261.9,223.2 L263.5,222.9 L265.1,223.7 L267.1,224.2 L269.2,226.3 L271.3,228.2 L271.7,230.1 L272.4,231.9 L273.6,232.6 L274.0,233.8 L273.9,234.8 L273.5,235.1 L271.9,235.1 L271.7,235.5 L271.0,235.7 L268.8,235.3 L267.4,235.5 L261.7,236.2 L260.9,236.7 L259.9,236.8 L258.3,237.5 L257.7,235.1 L260.5,234.8 L261.1,234.2 L261.7,234.1 L262.8,233.2 L264.1,233.7 L265.4,233.5 L266.7,232.6 L266.0,231.8 L265.0,232.5 L264.1,232.6 L262.8,232.0 L261.9,232.2 L261.3,233.1 L257.9,233.6Z"/><path fill="#59406f" d="M273.9,234.8 L274.0,233.8 L273.6,232.6 L272.4,231.9 L271.7,230.1 L271.3,228.2 L272.3,227.4 L272.6,225.4 L273.5,225.1 L275.6,225.7 L277.2,224.7 L278.3,224.7 L278.7,223.9 L282.5,223.1 L286.3,222.2 L290.1,221.3 L290.4,218.9 L289.8,218.7 L288.7,214.1 L287.5,209.6 L286.3,205.0 L285.0,200.4 L283.7,195.9 L282.3,191.3 L286.3,190.3 L291.5,192.7 L296.6,195.1 L301.6,197.3 L306.6,199.5 L307.5,200.9 L309.2,201.3 L310.5,201.4 L311.0,203.5 L313.6,202.2 L314.4,205.9 L315.1,209.6 L314.1,212.2 L314.3,214.2 L312.1,215.5 L308.7,216.8 L307.9,218.3 L306.3,218.9 L304.6,219.4 L303.9,219.0 L302.5,219.9 L300.2,221.9 L299.8,223.0 L297.9,225.0 L297.6,226.0 L296.5,226.9 L295.1,226.8 L294.5,227.8 L294.3,230.1 L292.4,233.3 L292.6,234.3 L291.9,235.9 L292.3,237.7 L291.2,238.4 L290.5,239.0 L290.0,237.7 L289.2,238.3 L288.7,238.3 L288.2,239.4 L286.0,239.9 L285.2,239.5 L284.8,239.9 L283.8,239.2 L283.9,238.2 L283.5,237.9 L282.9,238.4 L282.9,237.3 L283.5,236.4 L282.2,235.3 L281.7,234.5 L281.0,233.9 L280.4,233.9 L279.8,234.5 L278.8,235.1 L278.1,236.0 L276.8,236.0 L275.9,235.3 L275.4,235.3 L274.7,235.9 L274.2,236.0 L273.9,234.8Z"/><path fill="#59406f" d="M254.6,209.6 L255.1,208.4 L260.9,207.6 L266.5,206.7 L265.3,202.1 L265.7,200.3 L268.3,199.5 L267.6,195.3 L266.8,191.1 L271.3,190.4 L275.8,189.6 L274.8,184.7 L280.6,187.5 L286.3,190.3 L282.3,191.3 L283.7,195.9 L285.0,200.4 L286.3,205.0 L287.5,209.6 L288.7,214.1 L289.8,218.7 L290.4,218.9 L290.1,221.3 L286.3,222.2 L282.5,223.1 L278.7,223.9 L278.3,224.7 L277.2,224.7 L275.6,225.7 L273.5,225.1 L272.6,225.4 L272.3,227.4 L271.3,228.2 L269.2,226.3 L267.1,224.2 L265.1,223.7 L263.5,222.9 L261.9,223.2 L260.5,224.1 L259.0,224.1 L258.0,225.3 L257.6,223.6 L258.3,221.8 L258.4,218.7 L257.7,215.5 L257.2,213.9 L257.3,212.3 L256.3,210.8 L254.6,209.6Z"/><path fill="#59406f" d="M315.5,244.4 L313.3,245.4 L312.5,243.5 L312.3,239.9 L312.0,236.3 L311.4,235.8 L311.2,234.3 L310.1,233.5 L309.2,232.8 L309.4,231.0 L310.2,230.4 L310.6,228.8 L311.8,228.1 L312.3,227.0 L313.0,225.8 L313.9,225.5 L316.1,226.6 L316.2,227.7 L317.0,229.4 L316.6,230.9 L317.0,231.6 L316.0,234.0 L315.3,235.2 L315.0,237.3 L315.2,239.3 L315.5,244.4Z"/><path fill="#59406f" d="M333.8,180.8 L335.8,185.4 L336.8,185.9 L337.1,186.8 L338.2,187.5 L338.2,189.0 L338.7,192.4 L339.1,195.8 L340.0,199.9 L338.0,204.2 L337.9,208.8 L339.0,209.5 L339.4,211.5 L340.8,210.9 L340.8,212.5 L340.3,213.0 L340.4,214.0 L340.0,214.3 L337.9,211.5 L337.4,211.7 L336.0,214.2 L334.2,214.1 L332.9,214.4 L332.4,215.1 L331.0,215.6 L329.9,217.5 L328.7,218.1 L325.6,217.6 L324.6,218.8 L323.4,219.2 L322.3,218.4 L319.7,218.1 L317.1,219.4 L316.5,220.3 L316.4,222.2 L315.9,223.8 L316.1,226.6 L313.9,225.5 L313.0,225.8 L312.3,227.0 L312.0,224.8 L308.9,225.0 L308.6,223.5 L306.9,221.9 L306.3,220.5 L306.3,218.9 L307.9,218.3 L308.7,216.8 L312.1,215.5 L314.3,214.2 L314.1,212.2 L315.1,209.6 L314.4,205.9 L313.6,202.2 L316.7,199.6 L319.3,195.2 L321.8,190.8 L324.7,186.2 L327.5,181.6 L331.1,181.5 L332.8,182.7 L333.8,180.8Z"/><path fill="#59406f" d="M315.5,244.4 L315.2,239.3 L315.0,237.3 L315.3,235.2 L316.0,234.0 L317.0,231.6 L316.6,230.9 L317.0,229.4 L316.2,227.7 L316.1,226.6 L315.9,223.8 L316.4,222.2 L316.5,220.3 L317.1,219.4 L319.7,218.1 L322.3,218.4 L323.4,219.2 L324.6,218.8 L325.6,217.6 L328.7,218.1 L329.9,217.5 L331.0,215.6 L332.4,215.1 L332.9,214.4 L334.2,214.1 L336.0,214.2 L337.4,211.7 L337.9,211.5 L340.0,214.3 L340.4,214.0 L341.4,214.9 L341.3,215.5 L341.4,216.6 L339.9,219.9 L339.7,222.2 L339.6,224.0 L339.2,224.9 L339.0,227.3 L338.0,229.1 L337.8,230.8 L337.4,232.3 L337.4,233.7 L335.9,235.4 L334.5,234.7 L333.6,235.1 L332.4,237.5 L331.7,237.8 L330.8,241.3 L330.3,243.7 L327.9,245.8 L327.0,246.0 L326.0,247.1 L324.1,247.7 L322.6,246.3 L321.6,244.3 L319.7,242.9 L317.8,243.6 L315.5,244.4Z"/><path fill="#59406f" d="M340.8,212.5 L342.0,214.1 L342.5,216.1 L342.8,218.2 L344.3,220.5 L343.2,221.0 L342.6,221.6 L341.6,221.7 L341.3,223.4 L342.8,224.6 L343.8,224.7 L344.2,225.8 L345.2,227.6 L344.9,228.6 L344.2,232.3 L343.7,233.1 L343.7,235.6 L344.0,236.8 L343.9,237.8 L345.1,238.9 L345.3,239.9 L346.2,241.1 L347.2,241.6 L347.3,242.9 L347.6,243.7 L347.5,245.4 L345.8,245.5 L344.0,245.6 L341.3,246.8 L341.0,246.8 L339.7,247.8 L338.3,248.0 L337.2,248.7 L333.4,250.2 L333.7,247.7 L332.7,246.0 L331.6,246.0 L331.0,244.8 L330.4,244.6 L330.3,243.7 L330.8,241.3 L331.7,237.8 L332.4,237.5 L333.6,235.1 L334.5,234.7 L335.9,235.4 L337.4,233.7 L337.4,232.3 L337.8,230.8 L338.0,229.1 L339.0,227.3 L339.2,224.9 L339.6,224.0 L339.7,222.2 L339.9,219.9 L341.4,216.6 L341.3,215.5 L341.4,214.9 L340.4,214.0 L340.3,213.0 L340.8,212.5Z"/><path fill="#59406f" d="M309.4,231.0 L309.2,232.8 L310.1,233.5 L311.2,234.3 L311.4,235.8 L312.0,236.3 L312.3,239.9 L312.5,243.5 L313.3,245.4 L311.2,246.8 L310.6,245.9 L309.7,244.1 L309.4,242.6 L309.7,239.6 L309.0,238.7 L308.5,236.3 L308.2,234.0 L306.9,232.7 L307.0,231.6 L309.4,231.0Z"/><path fill="#59406f" d="M307.0,231.6 L306.9,232.7 L308.2,234.0 L308.5,236.3 L309.0,238.7 L309.7,239.6 L309.4,242.6 L309.7,244.1 L310.6,245.9 L311.2,246.8 L307.1,249.9 L305.7,251.4 L303.2,252.9 L300.7,252.7 L300.8,251.5 L299.4,249.1 L299.9,245.4 L300.9,242.5 L299.7,238.2 L299.1,235.9 L299.0,234.1 L303.7,232.6 L305.0,232.5 L305.8,231.7 L307.0,231.6Z"/><path fill="#59406f" d="M284.8,239.9 L285.2,239.5 L286.0,239.9 L288.2,239.4 L288.7,238.3 L289.2,238.3 L290.0,237.7 L290.5,239.0 L291.2,238.4 L292.3,237.7 L293.6,238.1 L294.2,239.0 L295.6,239.3 L296.5,238.3 L297.8,237.8 L299.7,238.2 L300.9,242.5 L299.9,245.4 L299.4,249.1 L300.8,251.5 L300.7,252.7 L299.4,253.1 L297.4,253.0 L295.6,253.5 L292.2,254.9 L290.3,256.2 L287.4,258.0 L286.9,258.0 L287.0,255.4 L287.2,255.0 L287.1,253.8 L285.8,252.8 L284.8,252.7 L283.9,252.1 L284.5,250.5 L284.1,249.1 L284.2,248.1 L284.7,248.0 L284.7,246.6 L284.5,246.1 L284.7,245.6 L285.8,245.0 L284.9,242.6 L284.1,241.4 L284.2,240.3 L284.8,239.9Z"/><path fill="#59406f" d="M267.4,235.5 L268.8,235.3 L271.0,235.7 L271.7,235.5 L271.9,235.1 L273.5,235.1 L273.9,234.8 L274.2,236.0 L274.7,235.9 L275.4,235.3 L275.9,235.3 L276.8,236.0 L278.1,236.0 L278.8,235.1 L279.8,234.5 L280.4,233.9 L281.0,233.9 L281.7,234.5 L282.2,235.3 L283.5,236.4 L282.9,237.3 L282.9,238.4 L283.5,237.9 L283.9,238.2 L283.8,239.2 L284.8,239.9 L284.2,240.3 L284.1,241.4 L284.9,242.6 L285.8,245.0 L284.7,245.6 L284.5,246.1 L284.7,246.6 L284.7,248.0 L284.2,248.1 L283.4,248.2 L282.8,249.6 L282.0,249.8 L281.4,249.2 L281.5,247.9 L280.1,246.2 L279.4,246.8 L278.8,247.0 L277.9,247.3 L277.9,246.1 L277.4,245.4 L277.4,244.5 L276.7,243.2 L275.7,242.3 L273.3,242.7 L272.7,243.4 L271.9,243.6 L271.4,244.4 L271.1,245.4 L269.6,247.0 L268.1,245.4 L266.9,244.3 L266.0,244.0 L265.2,243.5 L264.8,242.2 L264.3,241.5 L263.4,241.1 L264.6,239.4 L265.6,239.3 L266.3,238.6 L267.0,238.5 L267.4,238.0 L267.1,237.0 L267.4,236.6 L267.4,235.5Z"/><path fill="#59406f" d="M258.3,237.5 L259.9,236.8 L260.9,236.7 L261.7,236.2 L267.4,235.5 L267.4,236.6 L267.1,237.0 L267.4,238.0 L267.0,238.5 L266.3,238.6 L265.6,239.3 L264.6,239.4 L263.4,241.1 L261.7,240.0 L260.3,240.0 L259.6,239.2 L259.6,238.7 L258.6,238.2 L258.3,237.5Z"/><path fill="#59406f" d="M284.2,248.1 L284.1,249.1 L284.5,250.5 L283.9,252.1 L284.8,252.7 L285.8,252.8 L287.1,253.8 L287.2,255.0 L287.0,255.4 L286.9,258.0 L286.1,258.2 L283.0,257.4 L280.2,255.6 L277.5,254.4 L275.4,252.7 L276.1,251.6 L276.2,250.7 L277.5,248.7 L278.8,247.0 L279.4,246.8 L280.1,246.2 L281.5,247.9 L281.4,249.2 L282.0,249.8 L282.8,249.6 L283.4,248.2 L284.2,248.1Z"/><path fill="#59406f" d="M269.6,247.0 L271.1,245.4 L271.4,244.4 L271.9,243.6 L272.7,243.4 L273.3,242.7 L275.7,242.3 L276.7,243.2 L277.4,244.5 L277.4,245.4 L277.9,246.1 L277.9,247.3 L278.8,247.0 L277.5,248.7 L276.2,250.7 L276.1,251.6 L275.4,252.7 L274.6,252.7 L272.3,251.8 L270.7,250.4 L270.1,249.3 L269.6,247.0Z"/><path fill="#59406f" d="M292.3,237.7 L291.9,235.9 L292.6,234.3 L292.4,233.3 L294.3,230.1 L294.5,227.8 L295.1,226.8 L296.5,226.9 L297.6,226.0 L297.9,225.0 L299.8,223.0 L300.2,221.9 L302.5,219.9 L303.9,219.0 L304.6,219.4 L306.3,218.9 L306.3,220.5 L306.9,221.9 L308.6,223.5 L308.9,225.0 L312.0,224.8 L312.3,227.0 L311.8,228.1 L310.6,228.8 L310.2,230.4 L309.4,231.0 L307.0,231.6 L305.8,231.7 L305.0,232.5 L303.7,232.6 L299.0,234.1 L299.1,235.9 L299.7,238.2 L297.8,237.8 L296.5,238.3 L295.6,239.3 L294.2,239.0 L293.6,238.1 L292.3,237.7Z"/><path fill="#59406f" d="M367.6,221.4 L367.2,222.1 L366.1,222.8 L364.9,223.4 L364.3,224.1 L364.1,225.1 L363.6,225.5 L362.9,225.4 L361.1,228.2 L360.3,228.5 L360.1,228.9 L359.7,231.0 L358.3,231.3 L356.9,231.9 L355.7,231.5 L354.0,231.4 L353.1,233.0 L352.4,235.0 L352.4,237.2 L351.1,237.8 L349.7,238.0 L348.5,240.3 L347.6,243.7 L347.3,242.9 L347.2,241.6 L346.2,241.1 L345.3,239.9 L345.1,238.9 L343.9,237.8 L344.0,236.8 L343.7,235.6 L343.7,233.1 L344.2,232.3 L344.9,228.6 L346.6,227.5 L346.9,226.5 L347.3,226.4 L347.8,226.8 L350.2,224.3 L350.9,222.6 L351.8,220.9 L351.5,219.9 L352.0,219.3 L353.8,218.4 L355.4,215.9 L356.2,211.7 L356.8,209.9 L357.9,208.6 L358.3,209.8 L359.6,211.1 L359.8,212.3 L359.7,213.8 L360.0,214.7 L360.7,215.2 L362.1,215.6 L363.2,216.2 L363.3,217.2 L364.6,218.0 L365.4,218.8 L366.0,220.3 L367.3,220.6 L367.6,221.4Z"/><path fill="#59406f" d="M352.4,237.2 L352.3,239.1 L351.8,241.1 L351.5,243.2 L351.3,246.0 L351.4,247.6 L351.1,248.9 L351.0,250.0 L350.8,251.1 L349.4,253.3 L348.4,255.3 L347.4,258.7 L347.4,261.0 L346.8,262.3 L345.5,264.3 L344.1,266.8 L343.3,266.7 L343.3,265.9 L342.1,266.4 L341.3,267.9 L340.7,267.9 L339.9,267.3 L339.2,268.1 L338.2,269.8 L336.6,267.5 L338.4,265.1 L337.6,263.5 L338.4,262.4 L340.0,261.4 L340.2,260.0 L341.3,260.9 L343.2,260.1 L344.0,258.3 L344.3,256.2 L344.1,254.0 L343.1,252.7 L344.0,248.8 L343.4,248.4 L341.8,249.5 L341.1,248.2 L341.3,246.8 L344.0,245.6 L345.8,245.5 L347.5,245.4 L347.6,243.7 L348.5,240.3 L349.7,238.0 L351.1,237.8 L352.4,237.2Z"/><path fill="#59406f" d="M337.2,248.7 L338.3,248.0 L339.7,247.8 L341.0,246.8 L341.3,246.8 L341.1,248.2 L341.8,249.5 L343.4,248.4 L344.0,248.8 L343.1,252.7 L344.1,254.0 L344.3,256.2 L344.0,258.3 L343.2,260.1 L341.3,260.9 L340.2,260.0 L340.0,261.4 L338.4,262.4 L337.6,263.5 L338.4,265.1 L336.6,267.5 L334.3,265.6 L332.9,263.8 L331.5,261.3 L331.6,260.3 L332.1,259.1 L332.7,256.7 L333.1,254.2 L333.9,253.7 L337.3,252.3 L337.2,248.7Z"/><path fill="#59406f" d="M333.4,250.2 L337.2,248.7 L337.3,252.3 L333.9,253.7 L333.1,254.2 L332.7,254.0 L333.4,250.2Z"/><path fill="#59406f" d="M371.4,257.6 L371.8,257.8 L372.3,257.8 L373.0,257.5 L373.6,257.6 L373.9,258.3 L373.8,260.4 L373.4,261.4 L372.7,264.0 L372.4,266.1 L371.8,267.4 L370.8,270.4 L371.2,270.5 L369.0,273.5 L366.7,276.6 L366.3,278.4 L365.2,279.7 L364.0,281.5 L363.6,282.6 L363.0,283.2 L361.1,286.5 L359.7,288.8 L359.1,289.3 L358.8,289.4 L357.1,290.4 L356.9,290.4 L357.0,290.2 L356.6,290.0 L355.6,290.6 L354.0,292.2 L353.4,291.3 L352.9,289.8 L354.1,285.5 L355.2,281.1 L357.0,280.0 L358.8,278.8 L358.8,277.9 L359.3,276.7 L359.3,275.6 L359.8,274.1 L359.8,273.4 L360.3,273.0 L360.2,273.8 L361.0,273.2 L362.0,272.7 L362.3,273.6 L363.5,273.0 L364.6,271.4 L364.6,272.6 L365.7,272.0 L365.9,272.8 L366.1,273.8 L367.2,272.9 L367.8,270.0 L367.3,270.8 L366.5,270.6 L366.3,270.4 L367.0,267.4 L367.9,263.8 L367.8,262.9 L368.5,260.7 L368.9,260.0 L370.9,257.8 L371.4,257.6Z"/><path fill="#59406f" d="M373.6,257.6 L374.7,256.9 L374.8,257.4 L374.9,258.3 L374.5,261.9 L373.6,264.4 L373.1,267.7 L373.5,267.2 L373.6,267.6 L373.5,269.1 L372.5,272.6 L371.9,273.7 L371.0,276.0 L370.8,275.2 L371.3,273.3 L371.9,271.7 L372.2,270.7 L371.9,270.5 L371.5,271.1 L371.2,270.5 L370.8,270.4 L371.8,267.4 L372.4,266.1 L372.7,264.0 L373.4,261.4 L373.8,260.4 L373.9,258.3 L373.6,257.6Z"/><path fill="#59406f" d="M374.5,261.9 L375.3,260.7 L376.4,259.9 L376.8,259.2 L377.5,258.2 L378.0,256.9 L378.6,256.2 L379.8,253.6 L380.8,250.9 L380.8,250.9 L380.8,250.9 L380.7,251.9 L380.0,254.9 L379.5,257.2 L378.4,261.6 L378.2,262.8 L377.3,265.2 L376.4,267.6 L375.3,270.2 L374.2,272.4 L372.7,275.2 L370.5,279.5 L369.9,280.5 L368.5,283.3 L367.8,284.4 L366.9,286.4 L366.6,287.8 L366.1,289.1 L365.8,289.9 L366.0,289.5 L364.8,292.1 L364.1,293.5 L364.1,293.6 L363.4,294.9 L362.5,296.3 L361.2,298.1 L359.2,300.9 L358.2,302.3 L357.8,303.3 L358.0,303.2 L357.1,304.5 L356.3,305.4 L356.8,304.4 L357.2,303.5 L357.6,302.7 L359.2,299.7 L359.8,298.2 L360.9,295.2 L363.4,291.0 L364.5,288.8 L364.8,288.4 L365.6,286.7 L365.7,286.1 L366.5,284.1 L367.4,281.9 L368.5,278.5 L368.2,278.3 L367.7,278.7 L367.6,278.3 L367.2,278.3 L366.1,279.3 L366.3,278.4 L366.7,276.6 L369.0,273.5 L371.2,270.5 L371.5,271.1 L371.9,270.5 L372.2,270.7 L371.9,271.7 L371.3,273.3 L370.8,275.2 L371.0,276.0 L371.9,273.7 L372.5,272.6 L373.5,269.1 L373.6,267.6 L373.5,267.2 L373.1,267.7 L373.6,264.4 L374.5,261.9Z"/><path fill="#59406f" d="M356.3,305.4 L355.4,306.7 L354.6,307.6 L354.6,307.0 L355.1,306.2 L355.9,305.0 L356.4,304.1 L356.9,303.6 L357.2,303.5 L356.8,304.4 L356.3,305.4Z"/><path fill="#59406f" d="M340.7,267.9 L339.8,268.9 L339.4,269.8 L339.3,271.1 L338.7,271.7 L338.2,269.8 L339.2,268.1 L339.9,267.3 L340.7,267.9Z"/><path fill="#59406f" d="M338.9,272.4 L339.8,271.6 L340.5,271.4 L341.3,270.7 L344.5,269.1 L347.6,267.5 L347.9,269.4 L348.3,270.8 L348.6,271.5 L349.2,272.6 L350.5,271.6 L351.2,270.9 L352.3,270.7 L352.6,269.8 L353.3,267.8 L354.5,267.0 L354.7,266.4 L355.6,265.8 L355.3,267.0 L357.6,265.5 L357.4,267.3 L357.6,268.2 L357.1,270.1 L356.9,271.8 L357.3,272.4 L356.6,275.8 L357.1,275.3 L357.9,274.9 L359.0,273.7 L359.8,273.4 L359.8,274.1 L359.3,275.6 L359.3,276.7 L358.8,277.9 L358.8,278.8 L357.0,280.0 L355.2,281.1 L354.1,285.5 L352.9,289.8 L353.4,291.3 L354.0,292.2 L350.5,295.3 L348.4,296.5 L346.3,297.6 L345.4,297.1 L342.8,298.6 L340.1,300.0 L337.3,301.4 L336.9,301.8 L336.0,301.2 L334.7,301.8 L333.3,302.8 L332.1,303.8 L332.3,302.2 L333.2,299.8 L334.6,297.0 L334.9,295.8 L336.2,293.1 L336.9,291.7 L338.5,289.4 L339.5,287.8 L340.1,285.7 L340.2,284.1 L339.7,283.5 L339.4,282.0 L339.1,280.6 L339.3,280.0 L340.1,278.5 L339.8,276.1 L339.6,274.4 L338.6,273.1 L338.9,272.4Z"/><path fill="#59406f" d="M372.7,240.6 L372.7,241.7 L373.0,242.1 L372.9,243.0 L372.6,243.9 L371.9,246.0 L371.3,247.5 L370.7,248.2 L370.9,244.7 L370.6,243.7 L371.5,243.1 L372.0,241.0 L372.7,240.6Z"/><path fill="#71323b" d="M350.9,129.3 L351.3,130.3 L350.7,130.3 L351.6,132.4 L352.0,132.5 L352.0,133.1 L352.4,133.9 L352.6,133.0 L353.3,134.1 L355.3,139.2 L354.8,138.6 L352.0,135.1 L352.0,135.1 L352.0,135.1 L351.7,133.8 L351.6,133.7 L351.1,132.1 L350.0,129.8 L349.7,128.9 L349.7,128.9 L350.0,128.5 L349.8,127.9 L350.0,127.6 L350.7,128.7 L350.9,129.3 L350.9,129.3Z"/><path fill="#71323b" d="M350.0,127.6 L349.8,127.9 L350.0,128.5 L349.7,128.9 L348.6,126.2 L347.8,123.7 L347.8,123.6 L348.3,123.3 L349.1,124.2 L349.3,125.8 L350.0,127.6Z"/><path fill="#59406f" d="M371.6,281.6 L372.4,279.8 L373.4,277.7 L373.9,276.6 L374.3,275.7 L375.4,273.0 L376.2,271.1 L376.5,270.1 L377.1,268.6 L377.9,266.2 L378.7,264.2 L379.4,262.2 L379.7,261.4 L380.2,260.1 L380.5,259.1 L380.7,258.5 L381.5,256.1 L382.4,253.3 L382.9,251.4 L383.2,250.4 L383.3,250.1 L383.8,248.3 L383.8,248.2 L383.8,248.1 L383.8,248.0 L383.9,247.9 L383.9,247.7 L383.9,247.6 L384.0,247.5 L384.0,247.4 L384.0,247.3 L384.1,247.2 L384.1,247.1 L384.1,246.9 L384.4,245.6 L384.9,243.9 L384.8,244.0 L384.0,247.3 L383.1,250.6 L382.2,253.9 L381.2,257.1 L380.2,260.3 L379.1,263.6 L377.9,266.8 L376.7,269.9 L375.4,273.1 L374.0,276.2 L372.7,279.3 L371.2,282.4 L371.6,281.6Z"/><path fill="#71323b" d="M352.6,133.0 L352.4,133.9 L352.0,133.1 L352.0,132.5 L351.6,132.4 L350.7,130.3 L351.3,130.3 L352.3,132.0 L352.6,133.0Z"/><path fill="#59406f" d="M257.9,233.6 L261.3,233.1 L261.9,232.2 L262.8,232.0 L264.1,232.6 L265.0,232.5 L266.0,231.8 L266.7,232.6 L265.4,233.5 L264.1,233.7 L262.8,233.2 L261.7,234.1 L261.1,234.2 L260.5,234.8 L257.7,235.1 L257.9,233.6Z"/><path fill="#59406f" d="M314.9,162.6 L311.9,157.4 L310.2,156.6 L309.9,155.9 L307.5,154.7 L306.3,152.5 L306.9,150.3 L306.3,147.6 L304.7,144.8 L304.4,143.1 L305.9,141.1 L307.4,140.9 L308.0,142.4 L309.1,140.6 L309.5,141.1 L309.3,143.0 L309.9,144.4 L310.9,144.9 L311.8,147.6 L311.2,149.7 L312.3,151.2 L313.3,150.8 L314.5,152.0 L315.4,152.2 L316.3,154.6 L315.7,155.8 L315.5,157.1 L314.6,158.9 L315.3,160.0 L315.7,161.4 L314.9,162.6Z"/><path fill="#59406f" d="M274.8,184.7 L274.7,184.0 L274.7,183.8 L273.8,180.0 L277.4,176.7 L279.8,175.6 L281.7,174.3 L282.2,172.4 L284.7,170.4 L284.2,168.1 L285.5,167.4 L286.2,166.0 L289.1,164.6 L289.2,163.2 L288.3,162.7 L286.5,159.6 L285.7,157.7 L284.2,156.0 L285.8,153.7 L288.0,152.4 L288.9,150.7 L290.7,149.2 L294.0,147.5 L297.3,146.0 L298.5,146.1 L299.9,144.2 L302.0,143.4 L303.1,143.8 L304.4,143.1 L304.7,144.8 L306.3,147.6 L306.9,150.3 L306.3,152.5 L307.5,154.7 L309.9,155.9 L310.2,156.6 L311.9,157.4 L314.9,162.6 L316.6,165.0 L317.3,166.4 L317.8,169.1 L318.5,170.5 L318.8,172.3 L319.6,174.2 L319.2,175.9 L321.2,177.6 L321.7,178.9 L323.0,180.4 L323.8,179.4 L325.9,180.1 L327.5,181.6 L324.7,186.2 L321.8,190.8 L319.3,195.2 L316.7,199.6 L313.6,202.2 L311.0,203.5 L310.5,201.4 L309.2,201.3 L307.5,200.9 L306.6,199.5 L301.6,197.3 L296.6,195.1 L291.5,192.7 L286.3,190.3 L280.6,187.5 L274.8,184.7Z"/><path fill="#71323b" d="M351.3,130.3 L350.9,129.3 L352.6,129.1 L352.4,124.0 L354.8,126.9 L354.9,127.5 L354.5,129.3 L354.1,131.2 L356.5,132.8 L356.5,133.7 L356.9,134.8 L356.5,136.1 L356.8,137.4 L356.9,138.7 L355.6,139.6 L355.3,139.2 L353.3,134.1 L352.6,133.0 L352.3,132.0 L351.3,130.3Z"/><path fill="#71323b" d="M372.9,133.7 L372.9,133.3 L373.3,134.0 L373.2,132.6 L373.3,131.6 L373.4,130.9 L372.5,128.2 L371.6,125.5 L370.7,123.0 L371.1,123.7 L372.3,125.7 L372.3,126.3 L373.2,128.2 L373.4,128.3 L373.7,129.5 L374.2,130.6 L374.8,132.1 L375.3,133.3 L375.5,134.1 L375.2,135.3 L374.7,136.6 L373.3,134.2 L372.9,133.7Z"/><path fill="#71323b" d="M372.1,133.2 L371.0,131.3 L370.3,129.5 L370.2,128.9 L370.8,129.4 L371.6,130.9 L372.4,132.8 L372.4,133.4 L372.1,133.2Z"/><path fill="#71323b" d="M363.3,122.5 L364.1,123.4 L364.5,124.1 L365.8,125.8 L365.6,126.7 L364.7,125.7 L364.2,126.5 L363.0,123.1 L363.3,122.5Z"/><path fill="#71323b" d="M354.8,126.9 L352.4,124.0 L352.3,121.3 L352.1,118.7 L350.1,115.1 L348.7,113.2 L348.5,112.0 L347.6,109.8 L347.5,109.0 L348.4,108.0 L349.1,108.3 L349.0,107.3 L351.6,109.7 L352.5,109.7 L353.6,111.1 L354.0,112.6 L355.4,114.9 L357.4,116.6 L358.9,116.6 L360.4,118.0 L361.6,120.1 L361.7,119.7 L362.6,121.1 L363.6,121.9 L363.3,122.5 L363.0,123.1 L364.2,126.5 L363.2,128.6 L360.8,127.5 L358.3,126.4 L356.1,126.2 L354.8,126.9Z"/><path fill="#71323b" d="M375.3,133.3 L374.8,132.1 L374.2,130.6 L373.7,129.5 L373.4,128.3 L373.2,128.2 L372.3,126.3 L372.3,125.7 L373.2,126.9 L373.6,127.2 L373.7,126.6 L373.8,126.4 L374.4,127.3 L374.8,127.9 L374.9,127.8 L375.2,128.4 L376.0,130.5 L376.4,131.5 L376.8,132.9 L377.7,135.3 L377.7,135.8 L378.0,136.7 L378.6,138.3 L379.4,140.1 L379.5,140.5 L379.6,141.1 L380.0,143.0 L380.5,144.5 L380.8,145.4 L380.8,146.2 L381.1,147.5 L381.5,148.6 L381.7,150.1 L381.6,150.5 L381.9,152.4 L381.9,153.2 L381.2,151.6 L379.4,147.9 L379.0,144.5 L378.5,141.1 L377.4,137.9 L376.2,134.6 L375.3,133.3Z"/><path fill="#71323b" d="M371.1,123.7 L370.7,123.0 L370.1,121.7 L370.3,121.8 L370.9,123.0 L371.1,123.7Z"/><path fill="#71323b" d="M304.2,41.1 L304.1,41.0 L304.1,41.0 L304.1,41.1 L304.1,41.1 L304.1,41.1 L304.2,41.1 L304.2,41.1 L304.2,41.1 L304.2,41.1 L304.2,41.1 L304.2,41.2 L304.3,41.2 L304.3,41.2 L304.2,41.1Z"/><path fill="#71323b" d="M368.8,112.8 L368.2,111.8 L369.5,114.6 L370.3,116.6 L371.0,118.8 L369.2,115.2 L367.9,112.1 L367.2,111.0 L367.2,111.2 L365.8,109.0 L365.5,109.0 L364.7,108.0 L364.0,107.2 L364.2,106.5 L363.6,104.9 L363.5,104.5 L363.1,103.7 L362.9,103.1 L361.5,100.5 L360.1,98.4 L358.8,96.3 L358.4,95.5 L357.8,94.7 L357.1,93.5 L357.0,93.3 L356.3,92.1 L355.3,90.8 L354.0,88.9 L353.1,87.6 L352.2,86.5 L351.5,85.5 L350.7,84.4 L350.0,83.6 L348.9,82.1 L348.0,81.1 L347.4,80.4 L346.2,78.8 L344.9,77.2 L343.7,75.8 L342.9,74.8 L342.2,74.0 L342.3,74.1 L344.9,77.1 L347.4,80.1 L349.9,83.2 L352.3,86.4 L354.6,89.6 L356.9,92.8 L359.1,96.1 L361.2,99.5 L363.3,102.8 L365.3,106.3 L367.2,109.7 L369.0,113.3 L368.8,112.8Z"/><path fill="#71323b" d="M348.0,82.8 L347.7,82.2 L347.7,81.8 L347.7,81.7 L346.7,80.3 L346.8,80.3 L345.7,79.0 L345.3,78.4 L345.0,77.9 L344.1,76.9 L343.1,75.7 L343.2,75.6 L343.8,76.4 L343.7,76.2 L345.4,78.1 L345.7,78.4 L345.1,77.5 L344.5,76.8 L343.2,75.2 L342.7,74.7 L341.8,73.6 L342.2,74.0 L342.9,74.8 L343.7,75.8 L344.9,77.2 L346.2,78.8 L347.4,80.4 L348.0,81.1 L348.9,82.1 L350.0,83.6 L350.7,84.4 L351.5,85.5 L352.2,86.5 L353.1,87.6 L354.0,88.9 L355.3,90.8 L356.3,92.1 L357.0,93.3 L357.1,93.5 L357.8,94.7 L358.4,95.5 L358.8,96.3 L360.1,98.4 L361.5,100.5 L362.9,103.1 L363.1,103.7 L363.5,104.5 L363.6,104.9 L364.2,106.5 L364.0,107.2 L362.2,103.8 L361.1,102.3 L361.0,102.8 L360.0,101.3 L358.6,99.8 L357.5,97.9 L357.4,98.1 L356.0,96.0 L353.5,92.6 L353.9,92.3 L353.4,91.1 L352.4,89.9 L351.8,88.6 L351.0,87.3 L349.3,85.3 L348.6,83.9 L347.8,82.9 L348.1,83.0 L348.0,82.8Z"/><path fill="#71323b" d="M347.7,81.8 L345.3,79.0 L344.0,77.6 L343.9,77.9 L342.9,76.7 L342.5,75.9 L341.0,74.2 L339.5,72.6 L338.2,70.7 L339.3,71.9 L339.7,72.3 L339.4,71.8 L340.3,72.9 L340.7,73.6 L341.9,74.9 L341.0,73.6 L340.8,73.0 L339.0,70.8 L340.6,72.4 L340.2,71.9 L340.1,71.7 L340.9,72.5 L341.8,73.6 L342.7,74.7 L343.2,75.2 L344.5,76.8 L345.1,77.5 L345.7,78.4 L345.4,78.1 L343.7,76.2 L343.8,76.4 L343.2,75.6 L343.1,75.7 L344.1,76.9 L345.0,77.9 L345.3,78.4 L345.7,79.0 L346.8,80.3 L346.7,80.3 L347.7,81.7 L347.7,81.8Z"/><path fill="#71323b" d="M335.2,67.8 L334.1,66.8 L333.3,65.8 L332.8,64.9 L331.5,63.6 L330.6,62.7 L330.3,62.1 L329.8,61.5 L328.3,60.0 L327.1,58.8 L327.3,59.0 L327.0,58.7 L327.1,58.8 L327.2,58.9 L327.3,58.9 L327.4,59.0 L327.5,59.1 L327.5,59.2 L327.6,59.2 L327.7,59.3 L327.8,59.4 L327.9,59.5 L328.0,59.5 L328.0,59.6 L330.3,61.7 L331.4,62.8 L332.9,64.3 L334.5,65.9 L335.2,66.7 L336.2,67.8 L338.0,69.7 L338.3,70.0 L339.0,70.8 L340.8,73.0 L341.0,73.6 L341.9,74.9 L340.7,73.6 L340.3,72.9 L339.4,71.8 L339.1,71.3 L336.6,68.5 L336.4,68.7 L337.4,69.9 L337.1,69.9 L335.2,67.7 L335.2,67.8Z"/><path fill="#71323b" d="M341.5,87.9 L340.8,86.7 L340.5,85.0 L341.1,84.9 L342.8,86.0 L342.7,85.3 L342.6,84.1 L341.5,83.1 L340.7,81.5 L339.2,79.4 L340.2,79.1 L341.9,80.7 L342.3,80.8 L341.9,79.5 L342.2,79.6 L344.2,81.3 L345.3,81.6 L346.0,81.9 L346.5,81.9 L346.7,81.4 L348.0,82.8 L348.1,83.0 L347.8,82.9 L348.6,83.9 L349.3,85.3 L351.0,87.3 L351.8,88.6 L352.4,89.9 L353.4,91.1 L353.9,92.3 L353.5,92.6 L351.9,90.7 L352.0,91.5 L350.5,90.7 L350.4,91.3 L349.5,91.3 L349.4,91.9 L349.8,92.8 L349.8,93.5 L351.0,95.7 L351.3,97.1 L349.9,95.6 L347.7,93.0 L347.0,93.0 L345.5,91.1 L345.4,91.7 L343.6,89.5 L344.2,89.1 L343.5,87.4 L342.2,86.8 L340.9,85.8 L341.4,87.2 L343.0,89.0 L341.5,87.9Z"/><path fill="#71323b" d="M363.6,121.9 L362.6,121.1 L361.7,119.7 L361.6,120.1 L360.4,118.0 L358.9,116.6 L357.4,116.6 L355.4,114.9 L354.0,112.6 L353.6,111.1 L352.5,109.7 L351.6,109.7 L349.0,107.3 L349.0,107.3 L347.1,105.9 L346.6,104.9 L344.1,102.4 L343.8,100.9 L344.7,101.7 L345.9,102.3 L346.4,101.9 L346.5,101.4 L345.4,98.3 L345.4,97.8 L346.1,98.1 L347.0,99.7 L348.2,100.3 L348.2,99.9 L349.8,101.4 L350.4,100.9 L351.6,101.3 L352.2,100.2 L351.8,97.8 L351.3,97.1 L351.0,95.7 L349.8,93.5 L349.8,92.8 L349.4,91.9 L349.5,91.3 L350.4,91.3 L350.5,90.7 L352.0,91.5 L351.9,90.7 L353.5,92.6 L356.0,96.0 L357.4,98.1 L357.5,97.9 L358.6,99.8 L360.0,101.3 L361.0,102.8 L361.1,102.3 L362.2,103.8 L364.0,107.2 L364.7,108.0 L365.5,109.0 L365.8,109.0 L367.2,111.2 L367.2,111.0 L367.9,112.1 L369.2,115.2 L371.0,118.8 L371.1,120.4 L371.0,121.1 L371.0,122.2 L369.2,119.5 L369.0,119.6 L369.3,121.0 L370.1,123.6 L369.5,124.2 L368.2,123.4 L367.7,123.8 L366.0,122.1 L363.7,119.4 L363.8,120.5 L363.1,120.4 L363.6,121.9Z"/><path fill="#71323b" d="M350.9,129.3 L350.9,129.3 L350.7,128.7 L350.0,127.6 L349.3,125.8 L349.1,124.2 L348.3,123.3 L347.8,123.6 L346.3,121.6 L345.8,120.3 L345.6,119.4 L345.4,118.5 L344.4,116.9 L345.1,117.1 L345.4,115.2 L346.2,115.1 L346.8,114.2 L346.8,112.0 L347.2,111.5 L347.6,109.8 L348.5,112.0 L348.7,113.2 L350.1,115.1 L352.1,118.7 L352.3,121.3 L352.4,124.0 L352.6,129.1 L350.9,129.3Z"/><path fill="#71323b" d="M346.5,101.4 L346.4,101.9 L345.1,100.9 L344.8,100.5 L344.6,101.0 L343.9,100.6 L343.8,100.9 L343.1,100.6 L342.2,100.8 L341.2,99.5 L340.4,98.8 L340.7,97.0 L341.3,97.4 L341.9,97.4 L342.3,98.2 L343.3,98.5 L343.8,99.6 L344.6,99.8 L345.1,99.7 L346.5,101.4Z"/><path fill="#71323b" d="M270.7,81.5 L270.1,79.9 L269.6,77.8 L267.4,75.0 L265.7,74.1 L262.7,71.2 L261.3,68.8 L262.3,68.4 L261.8,67.4 L260.7,66.8 L258.8,63.2 L257.1,60.6 L255.9,58.9 L256.6,58.5 L255.4,57.4 L257.2,56.9 L255.6,55.6 L255.9,55.3 L258.1,55.6 L260.9,56.2 L264.9,59.0 L266.2,59.5 L265.6,60.9 L266.7,62.8 L268.3,63.9 L269.0,66.3 L269.3,69.1 L271.9,72.5 L274.2,73.7 L276.5,74.4 L278.1,77.5 L277.6,78.6 L280.8,82.7 L282.2,85.3 L280.6,85.8 L281.5,88.1 L280.2,88.9 L277.9,86.7 L274.5,84.5 L270.7,81.5Z"/><path fill="#71323b" d="M294.4,77.1 L295.9,76.9 L296.6,77.4 L296.7,76.7 L298.1,76.6 L299.3,77.5 L299.8,78.3 L301.9,79.2 L302.7,79.3 L303.1,79.8 L304.1,79.7 L304.9,80.0 L305.2,80.8 L304.5,81.4 L304.5,81.7 L305.5,82.3 L307.3,83.6 L307.3,83.6 L306.7,84.4 L307.0,85.1 L308.1,86.3 L307.5,86.4 L306.8,87.3 L306.1,86.9 L306.1,87.6 L305.4,87.6 L304.7,88.1 L303.0,88.4 L301.8,89.0 L301.1,89.6 L301.1,90.7 L300.7,91.1 L299.7,90.1 L298.3,89.2 L298.5,88.2 L297.6,87.3 L296.5,86.6 L295.4,85.6 L296.4,84.9 L296.6,83.2 L295.5,81.8 L295.5,80.5 L294.3,79.5 L294.4,78.7 L294.4,77.1Z"/><path fill="#71323b" d="M307.3,83.6 L307.7,83.4 L307.3,82.6 L307.7,82.5 L308.2,81.5 L310.1,82.2 L310.4,82.9 L311.2,83.5 L311.9,83.0 L313.2,83.7 L313.6,84.1 L315.4,83.8 L315.5,82.8 L317.0,83.4 L317.3,82.8 L319.0,82.3 L319.7,82.9 L320.7,84.5 L322.2,85.5 L322.9,86.4 L322.5,87.5 L322.8,88.6 L323.8,89.6 L323.5,90.5 L323.8,91.9 L323.2,92.9 L323.4,94.6 L324.6,95.8 L324.4,95.9 L323.9,95.5 L323.5,95.7 L322.5,95.9 L322.8,96.7 L322.5,96.6 L320.5,97.3 L319.6,96.5 L319.1,97.6 L319.9,99.3 L320.7,101.8 L319.9,101.8 L319.8,102.6 L318.9,102.6 L319.0,102.1 L318.4,101.0 L318.0,100.0 L317.5,99.6 L317.6,99.2 L318.0,99.5 L318.6,99.0 L318.7,98.6 L318.3,98.5 L318.1,98.1 L317.2,97.8 L316.1,96.8 L315.4,96.8 L314.7,95.9 L313.7,95.6 L313.2,95.8 L311.8,95.7 L311.3,96.5 L311.4,97.0 L310.9,97.4 L311.2,98.2 L310.6,99.0 L310.5,99.7 L309.5,99.4 L308.7,99.9 L307.8,100.1 L307.7,101.0 L307.1,100.4 L305.9,100.1 L305.2,99.0 L305.0,98.1 L305.4,98.1 L304.1,97.1 L303.4,94.3 L303.7,93.7 L303.2,92.9 L300.7,91.1 L301.1,90.7 L301.1,89.6 L301.8,89.0 L303.0,88.4 L304.7,88.1 L305.4,87.6 L306.1,87.6 L306.1,86.9 L306.8,87.3 L307.5,86.4 L308.1,86.3 L307.0,85.1 L306.7,84.4 L307.3,83.6Z"/><path fill="#71323b" d="M295.4,85.6 L296.5,86.6 L297.6,87.3 L298.5,88.2 L298.3,89.2 L299.7,90.1 L300.7,91.1 L303.2,92.9 L303.7,93.7 L303.4,94.3 L304.1,97.1 L305.4,98.1 L305.0,98.1 L303.1,97.8 L302.5,98.7 L301.7,98.8 L301.4,99.8 L300.1,99.3 L299.8,99.9 L299.7,99.8 L298.1,98.9 L297.0,99.3 L296.2,98.5 L295.1,98.7 L295.4,99.5 L294.3,99.3 L293.8,98.6 L292.7,98.9 L291.4,98.4 L289.6,97.0 L289.0,96.1 L287.6,94.9 L286.4,94.2 L286.3,93.3 L284.9,92.2 L285.2,91.0 L286.2,88.9 L286.9,87.3 L288.4,87.0 L289.0,87.6 L290.2,87.0 L291.8,86.4 L293.7,85.1 L294.5,85.0 L295.4,85.6Z"/><path fill="#71323b" d="M299.9,104.8 L300.6,105.9 L299.8,106.4 L300.5,106.8 L301.3,108.8 L301.3,109.4 L300.1,110.1 L299.8,111.1 L298.4,111.5 L295.8,111.8 L294.8,111.0 L293.6,112.2 L293.7,112.8 L292.5,112.8 L291.7,113.1 L290.6,112.8 L290.4,112.1 L290.1,111.6 L290.5,111.2 L291.7,111.7 L291.5,110.9 L293.0,110.4 L293.7,109.4 L294.5,109.1 L295.3,109.5 L295.2,108.9 L293.8,107.3 L294.1,106.7 L293.7,105.2 L295.4,105.6 L295.4,104.1 L295.8,103.6 L297.4,103.9 L298.0,103.4 L299.0,103.6 L299.1,104.0 L299.9,104.8Z"/><path fill="#71323b" d="M305.9,100.1 L307.1,100.4 L307.7,101.0 L307.4,102.1 L308.2,104.2 L308.8,106.5 L308.2,107.6 L307.2,108.0 L306.7,109.3 L306.7,109.3 L306.5,110.0 L305.0,110.1 L303.1,109.5 L302.4,109.4 L301.5,108.7 L301.3,108.8 L300.5,106.8 L299.8,106.4 L300.6,105.9 L299.9,104.8 L301.1,105.1 L301.8,105.1 L302.7,104.2 L302.4,103.6 L302.9,103.2 L303.2,102.4 L303.4,102.5 L303.8,101.8 L303.6,101.0 L303.9,100.6 L305.8,100.6 L305.9,100.1Z"/><path fill="#71323b" d="M311.4,97.0 L311.3,96.5 L311.8,95.7 L313.2,95.8 L313.7,95.6 L314.7,95.9 L315.4,96.8 L316.1,96.8 L317.2,97.8 L318.1,98.1 L318.3,98.5 L318.7,98.6 L318.6,99.0 L318.0,99.5 L317.6,99.2 L317.5,99.6 L318.0,100.0 L318.4,101.0 L319.0,102.1 L318.9,102.6 L317.8,101.5 L317.0,100.4 L316.0,99.3 L314.1,98.3 L312.9,97.5 L311.9,97.0 L311.4,97.0Z"/><path fill="#71323b" d="M318.9,102.6 L319.8,102.6 L319.9,101.8 L320.7,101.8 L321.3,102.5 L321.3,103.5 L320.8,103.5 L323.0,106.9 L322.1,107.1 L320.6,106.8 L319.7,108.5 L319.7,109.6 L317.8,110.7 L316.5,111.0 L316.2,111.5 L315.0,110.7 L314.4,110.3 L314.4,109.7 L313.8,109.6 L313.9,110.4 L312.6,110.1 L311.7,109.1 L310.4,109.0 L309.6,108.2 L308.2,107.6 L308.8,106.5 L308.2,104.2 L307.4,102.1 L307.7,101.0 L307.8,100.1 L308.7,99.9 L309.5,99.4 L310.5,99.7 L310.6,99.0 L311.2,98.2 L310.9,97.4 L311.4,97.0 L311.9,97.0 L312.9,97.5 L314.1,98.3 L316.0,99.3 L317.0,100.4 L317.8,101.5 L318.9,102.6Z"/><path fill="#71323b" d="M294.3,79.5 L295.5,80.5 L295.5,81.8 L296.6,83.2 L296.4,84.9 L295.4,85.6 L294.5,85.0 L293.7,85.1 L293.0,84.6 L292.5,83.8 L291.7,83.8 L290.2,84.1 L288.1,82.2 L288.5,80.8 L290.3,79.8 L291.0,78.9 L291.6,79.3 L292.3,79.1 L294.3,79.5Z"/><path fill="#71323b" d="M290.4,74.9 L291.4,75.1 L292.7,76.1 L294.4,77.1 L294.4,78.7 L294.3,79.5 L292.3,79.1 L291.6,79.3 L291.0,78.9 L290.3,79.8 L288.5,80.8 L288.1,82.2 L286.4,80.5 L285.4,78.7 L285.5,77.4 L288.0,78.5 L288.8,78.0 L287.1,76.1 L287.4,75.2 L288.1,75.2 L289.7,75.4 L290.4,74.9Z"/><path fill="#71323b" d="M286.0,70.2 L286.0,70.2 L286.5,70.5 L287.4,72.1 L290.0,73.9 L290.4,74.9 L289.7,75.4 L288.1,75.2 L287.4,75.2 L287.1,76.1 L285.8,74.8 L285.7,75.3 L284.3,74.9 L282.8,73.7 L283.3,72.3 L284.0,71.2 L285.2,70.9 L286.0,70.2 L286.0,70.2Z"/><path fill="#71323b" d="M284.9,92.2 L286.3,93.3 L286.4,94.2 L287.6,94.9 L289.0,96.1 L289.6,97.0 L291.4,98.4 L291.0,98.9 L290.4,98.8 L290.5,99.5 L289.8,100.5 L289.8,101.4 L289.2,102.4 L290.0,103.1 L290.9,104.1 L292.1,104.4 L293.7,105.2 L294.1,106.7 L293.8,107.3 L295.2,108.9 L295.3,109.5 L294.5,109.1 L293.7,109.4 L293.0,110.4 L291.5,110.9 L291.7,111.7 L290.5,111.2 L290.1,111.6 L287.8,111.5 L287.9,112.2 L286.5,112.7 L285.5,110.7 L285.1,108.5 L282.5,108.8 L281.3,108.4 L280.7,107.2 L280.0,106.7 L279.0,104.8 L277.0,102.0 L277.9,101.7 L277.6,100.5 L276.4,98.0 L275.5,97.2 L275.4,96.5 L276.5,95.9 L277.2,96.4 L277.3,94.7 L276.2,93.9 L275.1,92.4 L276.4,92.3 L277.0,91.6 L277.8,92.6 L279.6,92.6 L280.2,93.5 L281.2,92.4 L281.4,91.4 L283.7,91.7 L284.9,92.2Z"/><path fill="#71323b" d="M315.0,110.7 L316.2,111.5 L316.5,111.0 L317.8,110.7 L319.7,109.6 L319.7,108.5 L320.6,106.8 L322.1,107.1 L323.0,106.9 L323.3,108.4 L324.3,110.6 L325.8,111.9 L324.5,112.3 L324.0,114.1 L324.9,115.4 L324.0,116.5 L322.4,116.2 L321.9,117.7 L320.9,118.3 L319.6,116.5 L318.3,116.1 L318.3,115.5 L317.9,115.3 L317.5,114.3 L317.4,113.1 L316.0,112.4 L315.1,111.5 L315.0,110.7Z"/><path fill="#71323b" d="M336.0,132.0 L336.3,132.9 L334.5,134.6 L334.3,134.1 L332.3,134.8 L331.8,133.4 L333.1,133.8 L334.1,132.9 L335.2,132.3 L335.5,132.9 L336.0,132.0Z"/><path fill="#71323b" d="M320.9,118.3 L321.9,117.7 L322.4,116.2 L324.0,116.5 L324.9,115.4 L324.0,114.1 L325.1,114.3 L325.9,116.3 L325.8,116.8 L325.0,117.3 L324.2,117.5 L323.1,119.4 L325.1,120.3 L324.7,121.2 L324.0,121.7 L322.3,120.8 L322.5,121.5 L323.8,123.0 L325.4,123.8 L325.2,124.8 L326.8,125.6 L328.0,125.9 L329.0,127.5 L327.3,127.6 L328.6,128.8 L327.8,129.7 L329.9,131.9 L328.9,132.5 L327.0,132.0 L325.2,130.1 L323.8,128.4 L322.4,127.4 L320.7,126.3 L320.1,125.5 L319.9,123.7 L319.4,122.8 L319.6,122.1 L319.2,121.3 L319.9,120.5 L320.1,119.6 L320.8,119.1 L320.7,118.5 L320.9,118.3Z"/><path fill="#71323b" d="M349.0,107.3 L349.1,108.3 L348.4,108.0 L347.5,109.0 L347.6,109.8 L347.2,111.5 L346.8,112.0 L346.8,114.2 L346.2,115.1 L345.4,115.2 L345.1,117.1 L344.4,116.9 L345.4,118.5 L345.6,119.4 L345.8,120.3 L344.6,119.4 L344.3,118.0 L343.9,118.9 L342.7,119.2 L343.1,121.4 L341.8,123.3 L340.0,122.7 L338.8,123.7 L339.3,125.1 L338.7,126.1 L336.6,125.6 L335.4,126.8 L332.9,124.6 L331.0,123.8 L330.2,121.2 L328.5,120.4 L328.0,116.8 L329.7,115.2 L328.7,112.8 L331.0,111.3 L330.8,108.4 L331.3,106.6 L332.7,104.9 L335.6,105.0 L337.5,104.5 L338.0,103.0 L338.7,102.3 L338.3,99.8 L338.8,98.6 L340.4,98.8 L341.2,99.5 L342.2,100.8 L343.1,100.6 L343.8,100.9 L344.1,102.4 L346.6,104.9 L347.1,105.9 L349.0,107.3 L349.0,107.3Z"/><path fill="#71323b" d="M324.0,114.1 L324.5,112.3 L325.8,111.9 L326.7,112.8 L328.3,112.8 L328.6,113.6 L327.3,114.9 L327.4,116.1 L327.5,118.4 L326.2,117.4 L325.8,116.8 L325.9,116.3 L325.1,114.3 L324.0,114.1Z"/><path fill="#71323b" d="M319.2,121.3 L319.6,122.1 L319.4,122.8 L319.9,123.7 L320.1,125.5 L319.7,125.5 L319.3,124.9 L317.9,124.4 L317.0,123.1 L315.9,121.2 L315.5,120.2 L315.0,119.9 L315.0,119.9 L314.3,119.1 L314.0,117.3 L314.5,117.8 L314.7,117.3 L315.5,117.9 L316.0,118.0 L316.8,118.9 L316.8,118.9 L317.2,120.0 L318.2,121.0 L319.2,121.3Z"/><path fill="#71323b" d="M302.4,109.4 L303.1,109.5 L305.0,110.1 L306.5,110.0 L306.7,109.3 L307.8,110.1 L308.8,110.7 L309.0,112.0 L307.9,111.7 L307.0,112.3 L305.4,112.6 L304.8,113.0 L304.9,113.7 L303.9,113.4 L304.4,114.7 L305.9,115.6 L306.8,116.3 L308.2,116.9 L309.1,117.2 L310.4,118.1 L312.4,118.4 L312.6,119.0 L312.6,119.0 L310.5,118.7 L309.0,118.2 L307.1,118.1 L304.5,116.7 L304.7,116.3 L303.3,115.5 L302.6,114.6 L301.4,114.6 L301.7,116.1 L300.6,115.4 L300.0,114.4 L300.1,114.3 L301.2,113.9 L301.2,113.3 L302.0,113.5 L302.6,113.2 L302.1,112.5 L302.4,111.9 L301.8,110.8 L302.4,109.4Z"/><path fill="#71323b" d="M290.1,111.6 L290.4,112.1 L290.6,112.8 L291.7,113.1 L292.5,112.8 L293.1,114.0 L292.7,114.7 L291.3,114.9 L291.6,116.2 L290.8,116.6 L290.3,116.3 L289.9,117.6 L289.1,118.0 L288.1,117.7 L286.8,116.7 L286.2,117.4 L285.5,116.1 L285.9,114.1 L285.4,113.4 L286.3,113.4 L286.5,112.7 L287.9,112.2 L287.8,111.5 L290.1,111.6Z"/><path fill="#71323b" d="M280.0,106.7 L280.7,107.2 L281.3,108.4 L280.9,108.6 L280.4,108.5 L279.6,106.9 L280.0,106.7Z"/><path fill="#71323b" d="M279.0,104.8 L280.0,106.7 L279.6,106.9 L280.4,108.5 L278.2,107.8 L277.5,108.3 L275.6,107.4 L274.2,106.5 L273.4,106.7 L272.6,105.9 L273.6,104.9 L273.6,104.9 L273.6,104.9 L274.9,104.7 L276.0,103.6 L277.8,104.4 L279.0,104.8Z"/><path fill="#71323b" d="M275.5,97.2 L276.4,98.0 L277.6,100.5 L277.9,101.7 L277.0,102.0 L279.0,104.8 L277.8,104.4 L276.0,103.6 L274.9,104.7 L273.6,104.9 L273.6,104.9 L274.0,103.8 L272.9,99.4 L274.2,97.6 L275.5,97.2Z"/><path fill="#71323b" d="M261.9,138.8 L262.5,137.8 L263.2,137.2 L264.3,138.6 L265.6,138.3 L265.8,137.8 L267.1,137.7 L268.3,139.1 L267.5,140.1 L268.3,142.5 L268.1,143.1 L268.5,144.6 L267.6,145.0 L269.1,146.7 L269.1,148.9 L270.2,149.6 L270.1,150.6 L269.6,151.9 L270.1,152.9 L269.4,153.9 L268.0,153.8 L266.9,154.4 L266.5,151.8 L265.8,149.9 L264.6,149.9 L263.7,148.8 L263.3,146.7 L263.9,145.4 L263.7,144.1 L263.6,142.1 L263.2,140.8 L262.4,139.8 L261.9,138.8Z"/><path fill="#71323b" d="M270.1,152.9 L269.6,151.9 L270.1,150.6 L270.2,149.6 L269.1,148.9 L269.1,146.7 L267.6,145.0 L268.5,144.6 L268.1,143.1 L268.3,142.5 L267.5,140.1 L268.3,139.1 L267.1,137.7 L265.8,137.8 L265.6,138.3 L264.3,138.6 L263.2,137.2 L262.5,137.8 L261.9,138.8 L261.4,136.6 L260.0,135.4 L262.4,132.6 L265.2,132.6 L268.0,131.9 L270.4,131.9 L272.0,131.3 L275.4,130.5 L276.6,131.4 L280.9,131.7 L281.4,130.9 L284.2,131.5 L286.3,130.4 L287.2,132.1 L286.2,134.7 L283.9,136.1 L284.1,137.2 L283.6,139.3 L283.7,142.0 L285.2,143.5 L284.5,145.2 L284.8,147.3 L283.4,148.4 L282.7,151.3 L279.8,152.1 L277.6,152.6 L276.5,154.0 L276.0,155.4 L274.8,155.4 L273.6,154.6 L272.4,152.9 L270.1,152.9Z"/><path fill="#71323b" d="M254.0,102.4 L255.2,104.3 L255.0,107.1 L252.5,109.5 L249.7,109.6 L250.0,106.4 L247.9,103.7 L249.3,101.0 L250.0,99.5 L251.1,100.9 L251.4,102.4 L252.4,102.1 L254.0,102.4Z"/><path fill="#71323b" d="M325.9,57.7 L324.7,56.6 L322.0,54.4 L319.1,52.0 L318.1,51.2 L313.5,47.7 L312.1,46.6 L312.0,46.5 L311.8,46.4 L311.6,46.2 L311.5,46.1 L311.3,46.0 L311.1,45.9 L310.9,45.8 L310.8,45.6 L310.6,45.5 L310.4,45.4 L310.3,45.3 L310.1,45.1 L308.3,43.9 L307.1,43.1 L304.8,41.5 L304.2,41.1 L304.3,41.2 L307.8,43.5 L311.2,45.9 L314.6,48.4 L317.9,51.0 L321.2,53.7 L324.4,56.4 L327.5,59.2 L330.6,62.0 L333.6,64.9 L336.6,67.9 L339.5,71.0 L342.3,74.1 L342.2,74.0 L341.8,73.6 L340.9,72.5 L340.1,71.7 L340.2,71.9 L340.6,72.4 L339.0,70.8 L338.3,70.0 L338.0,69.7 L336.2,67.8 L335.2,66.7 L334.5,65.9 L332.9,64.3 L331.4,62.8 L330.3,61.7 L328.0,59.6 L327.9,59.5 L327.8,59.4 L327.7,59.3 L327.6,59.2 L327.5,59.2 L327.4,59.1 L327.3,59.0 L327.2,58.9 L327.1,58.8 L327.0,58.7 L326.9,58.6 L326.8,58.5 L325.9,57.7Z"/><path fill="#71323b" d="M292.5,112.8 L293.7,112.8 L293.6,112.2 L294.8,111.0 L295.8,111.8 L298.4,111.5 L299.1,112.9 L300.2,113.9 L298.8,114.1 L298.1,115.7 L299.1,117.0 L299.4,117.9 L300.8,119.1 L303.1,119.8 L305.3,121.7 L308.5,123.1 L309.7,122.5 L310.4,122.9 L310.3,123.7 L312.4,124.0 L314.0,124.3 L316.2,125.0 L316.7,125.4 L317.0,126.6 L315.4,125.8 L313.7,126.0 L314.2,128.2 L315.9,128.7 L316.6,130.3 L316.0,130.8 L316.5,133.8 L316.0,134.3 L315.5,133.4 L315.0,131.7 L315.0,130.9 L313.4,129.6 L312.1,128.4 L311.2,128.4 L310.0,127.4 L308.7,127.4 L307.3,126.5 L306.0,126.9 L303.9,126.2 L301.3,125.1 L299.2,123.9 L297.1,121.3 L296.1,121.3 L294.2,121.0 L293.6,121.7 L293.3,123.4 L292.7,123.9 L292.2,122.6 L291.1,122.6 L289.4,120.5 L289.5,119.4 L288.4,118.5 L288.1,117.7 L289.1,118.0 L289.9,117.6 L290.3,116.3 L290.8,116.6 L291.6,116.2 L291.3,114.9 L292.7,114.7 L293.1,114.0 L292.5,112.8Z"/><path fill="#71323b" d="M314.1,134.4 L315.2,133.5 L315.8,136.1 L316.6,136.9 L317.0,138.6 L315.1,138.2 L314.1,138.3 L310.8,137.9 L310.3,136.3 L312.5,135.6 L314.1,134.4Z"/><path fill="#71323b" d="M299.2,131.1 L299.7,129.9 L301.8,131.5 L303.5,135.5 L302.6,135.6 L302.3,136.9 L301.3,136.4 L299.4,132.9 L298.2,131.4 L299.2,131.1Z"/><path fill="#71323b" d="M277.0,91.6 L276.4,92.3 L275.1,92.4 L273.5,91.2 L271.6,88.7 L271.3,87.9 L271.1,87.0 L272.1,86.4 L272.0,85.5 L272.5,84.4 L273.4,85.7 L273.7,86.6 L274.4,87.3 L275.4,87.3 L275.8,88.4 L275.2,88.3 L275.7,90.5 L277.0,91.6Z"/><path fill="#71323b" d="M277.9,87.4 L279.4,88.4 L280.2,90.8 L277.7,90.0 L276.7,89.0 L277.9,87.4Z"/><path fill="#71323b" d="M254.0,102.4 L252.4,102.1 L251.4,102.4 L251.1,100.9 L250.0,99.5 L251.4,99.0 L254.0,100.3 L254.0,102.4Z"/><path fill="#71323b" d="M259.9,102.4 L259.9,102.4 L259.3,100.7 L257.3,99.3 L257.3,99.3 L255.0,99.3 L254.3,98.7 L254.3,97.3 L253.3,96.7 L253.1,98.2 L251.7,95.6 L250.2,94.5 L249.4,91.6 L249.4,89.2 L250.7,89.1 L252.4,88.4 L252.4,91.6 L253.7,90.9 L255.4,90.5 L256.2,92.7 L256.2,95.4 L257.9,95.2 L258.1,95.4 L261.3,98.2 L262.7,98.3 L265.4,101.1 L266.5,102.0 L268.7,101.9 L269.5,103.7 L269.1,104.8 L270.6,106.0 L269.9,107.9 L267.6,108.6 L265.0,110.2 L263.9,109.9 L263.3,111.5 L261.5,111.6 L260.7,113.0 L259.4,112.7 L260.8,109.0 L262.1,108.0 L262.0,108.0 L259.0,108.3 L258.0,107.3 L259.5,105.9 L257.8,104.7 L257.2,102.8 L259.9,102.4Z"/><path fill="#71323b" d="M226.6,72.2 L227.0,73.8 L229.1,75.2 L228.2,77.4 L226.6,78.5 L224.9,79.7 L223.9,80.3 L221.9,80.1 L219.8,79.9 L217.7,79.7 L218.8,78.5 L217.1,78.0 L215.4,77.5 L217.8,76.8 L217.5,76.1 L216.0,75.9 L214.5,75.8 L215.1,74.1 L216.9,73.5 L219.5,75.0 L221.0,73.4 L222.9,73.9 L224.4,72.3 L226.6,72.2Z"/><path fill="#71323b" d="M339.9,94.0 L340.1,93.8 L341.7,94.5 L341.9,94.2 L341.4,93.5 L340.7,91.9 L342.0,92.6 L343.7,93.7 L343.9,93.3 L344.5,93.6 L344.5,94.7 L346.1,96.8 L346.8,97.8 L347.2,98.8 L348.2,99.9 L348.2,100.3 L347.0,99.7 L346.1,98.1 L345.4,97.8 L345.4,98.3 L346.5,101.4 L345.1,99.7 L344.6,99.8 L343.8,99.6 L343.3,98.5 L342.3,98.2 L341.9,97.4 L341.3,97.4 L340.7,97.0 L340.4,96.3 L341.3,96.2 L341.7,95.8 L341.5,95.4 L340.1,94.6 L339.9,94.0Z"/><path fill="#71323b" d="M346.4,101.9 L345.9,102.3 L344.7,101.7 L343.8,100.9 L343.9,100.6 L344.6,101.0 L344.8,100.5 L345.1,100.9 L346.4,101.9Z"/><path fill="#71323b" d="M333.2,96.7 L333.1,96.3 L333.9,95.9 L335.1,94.8 L336.9,94.6 L337.4,94.9 L337.3,93.9 L338.1,93.5 L339.2,94.1 L339.9,94.0 L340.1,94.6 L341.5,95.4 L341.7,95.8 L341.3,96.2 L340.4,96.3 L340.7,97.0 L340.4,98.8 L338.8,98.6 L338.3,99.8 L337.5,98.6 L335.9,97.2 L334.7,96.9 L334.1,97.1 L333.2,96.7Z"/><path fill="#71323b" d="M298.4,111.5 L299.8,111.1 L300.1,110.1 L301.3,109.4 L301.3,108.8 L301.5,108.7 L302.4,109.4 L301.8,110.8 L302.4,111.9 L302.1,112.5 L302.6,113.2 L302.0,113.5 L301.2,113.3 L301.2,113.9 L300.1,114.3 L300.2,113.9 L299.1,112.9 L298.4,111.5Z"/><path fill="#71323b" d="M260.8,51.9 L262.7,53.2 L265.3,53.6 L266.9,55.3 L270.7,56.7 L272.6,58.6 L275.2,59.5 L276.7,60.9 L279.5,61.3 L280.6,62.5 L281.6,64.2 L282.5,66.1 L283.4,68.0 L283.4,68.0 L283.4,68.0 L282.2,69.3 L281.7,71.1 L280.8,72.6 L279.0,71.7 L277.3,71.6 L275.1,69.4 L272.5,67.7 L271.5,66.3 L270.7,64.5 L270.2,62.9 L269.6,61.2 L269.5,60.5 L268.3,59.7 L266.2,59.5 L264.9,59.0 L260.9,56.2 L258.1,55.6 L255.9,55.3 L255.7,54.6 L257.7,55.0 L258.4,54.4 L259.7,54.4 L259.1,53.2 L257.4,51.7 L257.3,50.5 L259.1,50.6 L260.8,51.9Z"/><path fill="#71323b" d="M305.0,98.1 L305.2,99.0 L305.9,100.1 L305.8,100.6 L303.9,100.6 L303.6,101.0 L303.8,101.8 L303.4,102.5 L303.2,102.4 L302.9,103.2 L302.4,103.6 L302.7,104.2 L301.8,105.1 L301.1,105.1 L299.9,104.8 L299.1,104.0 L299.0,103.6 L298.7,102.9 L299.3,102.6 L299.6,102.1 L299.4,101.8 L299.6,101.6 L299.2,100.9 L299.4,100.6 L299.3,100.1 L299.7,99.8 L299.8,99.9 L300.1,99.3 L301.4,99.8 L301.7,98.8 L302.5,98.7 L303.1,97.8 L305.0,98.1Z"/><path fill="#71323b" d="M291.4,98.4 L292.7,98.9 L293.8,98.6 L294.3,99.3 L295.4,99.5 L295.1,98.7 L296.2,98.5 L297.0,99.3 L298.1,98.9 L299.7,99.8 L299.3,100.1 L299.4,100.6 L299.2,100.9 L299.6,101.6 L299.4,101.8 L299.6,102.1 L299.3,102.6 L298.7,102.9 L299.0,103.6 L298.0,103.4 L297.4,103.9 L295.8,103.6 L295.4,104.1 L295.4,105.6 L293.7,105.2 L292.1,104.4 L290.9,104.1 L290.0,103.1 L289.2,102.4 L289.8,101.4 L289.8,100.5 L290.5,99.5 L290.4,98.8 L291.0,98.9 L291.4,98.4Z"/><path fill="#59406f" d="M374.4,181.9 L374.0,180.8 L373.2,175.8 L372.7,173.7 L372.7,172.4 L373.3,170.9 L373.2,168.6 L374.8,171.3 L375.9,173.7 L376.8,174.4 L378.6,175.5 L379.5,176.5 L380.3,177.5 L380.8,178.1 L381.4,178.3 L381.3,179.5 L381.0,179.8 L380.5,179.3 L379.8,178.0 L379.2,177.7 L378.7,177.0 L377.7,176.9 L377.1,177.8 L376.7,177.5 L376.4,178.9 L375.5,178.4 L375.7,181.0 L374.4,181.9Z"/><path fill="#59406f" d="M129.8,328.7 L130.9,330.2 L131.4,333.3 L134.5,334.2 L135.6,334.0 L137.6,334.9 L138.3,335.7 L139.0,337.8 L139.5,338.7 L140.6,339.0 L141.6,338.8 L142.7,339.3 L142.9,340.5 L142.8,341.8 L142.5,342.9 L142.5,344.7 L140.4,345.9 L138.3,345.9 L135.1,345.0 L132.2,344.0 L134.1,341.3 L133.4,340.2 L130.4,338.9 L126.6,336.6 L124.3,335.8 L118.3,331.0 L118.7,328.5 L118.5,327.2 L119.4,325.4 L124.1,325.7 L126.8,326.2 L129.7,327.9 L129.8,328.7Z"/><path fill="#71323b" d="M379.4,147.9 L381.2,151.6 L381.9,153.2 L382.1,154.9 L382.5,156.5 L382.8,157.5 L383.0,160.1 L383.0,163.6 L383.2,166.9 L383.1,167.7 L383.0,167.9 L383.0,169.9 L382.9,171.3 L382.5,172.6 L382.4,173.1 L382.5,174.2 L382.4,174.8 L382.5,175.8 L382.2,176.4 L382.1,177.2 L381.7,178.0 L381.1,176.6 L380.7,174.9 L380.3,174.2 L379.6,172.3 L379.1,171.4 L379.2,171.0 L378.7,169.8 L378.6,169.1 L378.2,167.8 L378.2,166.3 L377.7,165.2 L377.4,163.4 L377.9,163.6 L378.0,163.0 L378.6,161.4 L378.8,161.5 L379.4,160.5 L379.5,159.8 L380.0,160.5 L380.0,159.4 L379.3,155.4 L379.1,152.8 L379.3,150.4 L379.4,147.9Z"/><path fill="#71323b" d="M355.6,139.6 L356.9,138.7 L356.8,137.4 L356.5,136.1 L356.9,134.8 L356.5,133.7 L356.5,132.8 L354.1,131.2 L354.5,129.3 L354.9,127.5 L354.8,126.9 L356.1,126.2 L358.3,126.4 L360.8,127.5 L363.2,128.6 L364.2,126.5 L364.7,125.7 L365.6,126.7 L365.8,125.8 L367.3,127.7 L367.8,127.7 L368.3,128.4 L369.1,128.7 L369.8,129.8 L370.2,130.8 L370.7,131.6 L371.2,132.0 L371.7,132.7 L372.1,133.2 L372.4,133.4 L372.4,132.8 L372.9,133.7 L373.3,134.2 L374.7,136.6 L375.2,135.3 L375.5,134.1 L375.3,133.3 L376.2,134.6 L377.4,137.9 L378.5,141.1 L379.0,144.5 L379.4,147.9 L379.3,150.4 L379.1,152.8 L379.3,155.4 L380.0,159.4 L380.0,160.5 L379.5,159.8 L379.4,160.5 L378.8,161.5 L378.6,161.4 L378.0,163.0 L377.9,163.6 L377.4,163.4 L377.7,165.2 L378.2,166.3 L378.2,167.8 L377.7,166.7 L377.2,166.2 L376.8,165.2 L376.1,164.8 L374.8,163.0 L373.8,160.9 L372.5,159.8 L371.9,159.9 L370.3,157.9 L369.4,156.0 L368.7,154.2 L366.8,151.7 L365.9,151.1 L365.2,151.2 L364.1,149.9 L363.9,149.2 L362.9,148.0 L362.3,147.7 L360.9,146.1 L359.2,144.5 L357.7,143.1 L357.2,143.7 L356.5,141.9 L356.1,140.9 L355.6,139.6Z"/><path fill="#71323b" d="M343.8,125.8 L343.8,125.7 L343.6,124.9 L344.3,124.1 L344.6,122.3 L344.8,124.2 L345.2,124.7 L345.0,124.7 L345.0,125.1 L344.8,125.2 L344.8,125.4 L344.6,125.1 L344.4,125.0 L344.2,125.2 L344.1,125.7 L343.8,125.8Z"/><path fill="#71323b" d="M343.8,125.8 L344.1,125.7 L344.2,125.2 L344.4,125.0 L344.6,125.1 L344.8,125.4 L344.8,125.2 L345.0,125.1 L345.0,124.7 L345.2,124.7 L345.3,124.9 L345.0,127.1 L344.3,127.2 L343.4,126.4 L343.8,125.8Z"/><path fill="#59406f" d="M284.2,156.0 L285.7,157.7 L286.5,159.6 L288.3,162.7 L289.2,163.2 L289.1,164.6 L286.2,166.0 L285.5,167.4 L284.2,168.1 L284.7,170.4 L282.2,172.4 L281.7,174.3 L279.8,175.6 L277.4,176.7 L273.8,180.0 L274.7,183.8 L274.3,183.9 L274.7,185.6 L273.1,186.1 L272.3,187.0 L271.1,187.2 L270.1,187.0 L267.9,187.8 L267.4,190.5 L266.6,190.9 L266.0,195.2 L262.7,199.4 L262.4,204.1 L261.4,205.7 L261.2,207.0 L257.9,207.6 L254.6,208.2 L254.6,208.2 L254.6,206.7 L255.6,205.6 L256.3,203.8 L256.0,202.7 L256.7,200.2 L258.0,197.9 L258.9,197.2 L259.3,195.2 L259.1,193.4 L259.8,191.3 L261.5,189.8 L262.7,186.1 L262.7,186.1 L263.9,184.6 L266.3,183.8 L268.0,181.2 L269.1,180.1 L270.7,176.9 L269.2,173.0 L269.5,170.1 L269.4,168.3 L270.5,165.8 L272.6,163.8 L274.1,162.1 L274.7,158.4 L274.9,156.3 L276.6,155.9 L278.5,156.9 L280.6,156.1 L283.2,156.2 L284.2,156.0Z"/><path fill="#59406f" d="M367.4,158.7 L365.4,161.1 L363.2,163.5 L360.9,165.8 L358.4,168.1 L356.5,169.7 L354.6,171.2 L352.6,172.7 L350.5,167.1 L348.3,161.6 L346.0,156.2 L343.6,150.9 L342.0,148.9 L341.5,146.8 L340.6,145.7 L340.4,143.9 L342.2,142.5 L343.9,142.2 L345.6,142.0 L346.5,142.0 L346.9,140.2 L347.0,138.9 L347.9,137.7 L348.9,137.3 L350.0,138.4 L349.7,137.2 L351.0,137.0 L351.9,136.3 L352.0,135.1 L352.0,135.1 L354.8,138.6 L355.3,139.2 L355.6,140.7 L356.6,143.1 L357.0,144.9 L357.0,145.7 L356.2,145.1 L355.1,144.4 L352.2,141.0 L352.2,141.4 L354.2,144.0 L356.4,146.2 L359.3,149.8 L360.5,151.0 L361.6,152.3 L363.9,154.4 L363.9,155.2 L364.8,157.1 L367.0,158.3 L367.4,158.7Z"/><path fill="#59406f" d="M352.6,172.7 L354.6,178.8 L352.8,180.1 L353.2,181.4 L349.0,180.7 L344.5,179.9 L340.0,179.0 L335.2,178.1 L333.8,180.8 L332.8,182.7 L331.1,181.5 L327.5,181.6 L325.9,180.1 L323.8,179.4 L323.0,180.4 L321.7,178.9 L321.2,177.6 L319.2,175.9 L319.6,174.2 L318.8,172.3 L318.5,170.5 L317.8,169.1 L317.3,166.4 L316.6,165.0 L314.9,162.6 L315.7,161.4 L315.3,160.0 L314.6,158.9 L315.5,157.1 L315.7,155.8 L316.3,154.6 L315.4,152.2 L318.1,152.2 L318.7,151.6 L320.5,151.3 L323.5,151.5 L325.6,153.8 L327.4,153.5 L330.4,153.4 L332.9,153.9 L333.4,152.6 L333.5,150.8 L332.1,148.7 L331.9,147.0 L332.3,144.9 L333.2,143.8 L335.5,143.1 L336.7,144.0 L337.3,143.7 L338.0,143.8 L339.6,143.2 L340.4,143.9 L340.6,145.7 L341.5,146.8 L342.0,148.9 L343.6,150.9 L346.0,156.2 L348.3,161.6 L350.5,167.1 L352.6,172.7Z"/><path fill="#59406f" d="M386.7,186.0 L386.6,192.5 L386.4,198.9 L385.6,200.8 L385.2,204.2 L384.7,205.1 L384.6,206.4 L384.1,207.4 L383.7,206.9 L383.0,209.4 L382.8,211.1 L382.2,211.7 L382.0,211.7 L381.8,212.1 L381.5,212.5 L380.0,211.6 L379.3,212.5 L378.8,212.0 L378.7,210.2 L378.1,210.4 L377.0,207.9 L376.4,207.8 L376.1,206.8 L375.3,206.0 L374.5,206.5 L374.7,204.4 L375.3,203.6 L375.3,202.5 L374.9,199.8 L374.6,196.2 L375.0,194.7 L374.9,193.3 L374.9,190.5 L375.2,188.2 L374.9,184.7 L374.4,181.9 L375.7,181.0 L375.5,178.4 L376.4,178.9 L376.7,177.5 L377.1,177.8 L377.7,176.9 L378.7,177.0 L379.2,177.7 L379.8,178.0 L380.5,179.3 L381.0,179.8 L381.0,181.6 L381.1,183.4 L381.3,184.2 L381.5,185.0 L381.9,184.3 L382.1,183.8 L382.3,184.1 L382.4,185.4 L383.0,186.6 L383.5,187.5 L383.9,188.1 L385.2,187.6 L386.3,187.2 L386.7,186.0Z"/><path fill="#59406f" d="M381.0,179.8 L381.3,179.5 L381.4,178.3 L381.7,178.9 L382.0,180.2 L381.8,181.7 L382.2,181.9 L382.3,184.1 L382.1,183.8 L381.9,184.3 L381.5,185.0 L381.3,184.2 L381.1,183.4 L381.0,181.6 L381.0,179.8Z"/><path fill="#59406f" d="M385.2,174.2 L385.2,174.2 L385.2,174.3 L385.5,175.5 L386.1,178.5 L386.4,180.1 L386.5,182.5 L386.7,186.0 L386.3,187.2 L385.2,187.6 L383.9,188.1 L383.5,187.5 L383.0,186.6 L382.4,185.4 L382.3,184.1 L382.2,181.9 L382.6,182.1 L383.0,183.0 L383.5,183.7 L383.8,183.0 L384.2,181.0 L384.6,179.1 L384.8,177.0 L385.0,176.1 L385.0,175.1 L385.2,174.2 L385.2,174.2Z"/><path fill="#59406f" d="M377.2,231.8 L376.0,233.2 L374.7,234.6 L373.2,236.0 L372.7,236.8 L371.9,238.5 L371.6,238.5 L371.6,236.2 L371.9,234.8 L372.0,232.3 L372.3,230.6 L372.8,228.6 L373.3,227.3 L373.7,225.8 L373.1,225.9 L373.0,222.3 L373.0,222.3 L373.5,220.9 L374.4,220.8 L375.4,219.0 L376.3,218.1 L376.9,215.9 L377.6,217.4 L377.8,218.8 L378.5,221.7 L378.1,224.4 L377.6,227.0 L377.3,228.6 L377.2,231.8Z"/><path fill="#59406f" d="M372.7,236.8 L373.2,238.0 L373.1,239.8 L372.7,240.6 L372.7,240.6 L372.0,241.0 L371.5,243.1 L370.6,243.7 L370.8,241.9 L371.0,241.5 L371.1,239.7 L371.6,238.5 L371.9,238.5 L372.7,236.8Z"/><path fill="#71323b" d="M312.4,118.4 L310.4,118.1 L309.1,117.2 L308.2,116.9 L306.8,116.3 L305.9,115.6 L304.4,114.7 L303.9,113.4 L304.9,113.7 L304.8,113.0 L305.4,112.6 L307.0,112.3 L307.9,111.7 L309.0,112.0 L309.0,112.0 L309.5,111.7 L309.9,113.1 L311.3,113.7 L312.0,115.1 L311.8,115.5 L311.7,115.9 L311.6,116.8 L312.4,118.4Z"/><path fill="#71323b" d="M318.3,116.1 L319.6,116.5 L320.9,118.3 L320.7,118.5 L320.8,119.1 L320.1,119.6 L319.9,120.5 L319.2,121.3 L318.2,121.0 L317.2,120.0 L316.8,118.9 L316.8,118.9 L316.9,118.8 L316.6,118.2 L317.2,117.3 L317.4,117.0 L317.7,116.5 L318.3,116.1Z"/><path fill="#71323b" d="M306.7,109.3 L306.7,109.3 L307.2,108.0 L308.2,107.6 L309.6,108.2 L310.4,109.0 L311.7,109.1 L312.6,110.1 L313.9,110.4 L313.8,109.6 L314.4,109.7 L314.4,110.3 L315.0,110.7 L315.1,111.5 L316.0,112.4 L317.4,113.1 L317.5,114.3 L317.9,115.3 L318.3,115.5 L318.3,116.1 L317.7,116.5 L317.4,117.0 L317.2,116.8 L317.1,116.4 L316.8,115.6 L316.7,115.7 L316.1,115.4 L315.7,115.4 L315.3,115.1 L314.9,115.1 L314.4,114.8 L314.3,115.1 L314.7,116.1 L314.5,116.5 L314.5,116.2 L313.6,116.0 L312.9,116.0 L312.5,115.7 L311.8,115.5 L312.0,115.1 L311.3,113.7 L309.9,113.1 L309.5,111.7 L309.0,112.0 L309.0,112.0 L308.8,110.7 L307.8,110.1 L306.7,109.3Z"/><path fill="#71323b" d="M314.7,117.3 L314.5,117.8 L314.0,117.3 L314.3,119.1 L315.0,119.9 L314.5,119.8 L313.6,119.2 L312.6,119.0 L312.4,118.4 L311.6,116.8 L311.7,115.9 L311.8,115.5 L312.5,115.7 L312.9,116.0 L313.6,116.0 L314.5,116.2 L314.5,116.5 L314.7,117.3Z"/><path fill="#71323b" d="M316.8,118.9 L316.0,118.0 L315.5,117.9 L314.7,117.3 L314.5,116.5 L314.7,116.1 L314.3,115.1 L314.4,114.8 L314.9,115.1 L315.3,115.1 L315.7,115.4 L316.1,115.4 L316.7,115.7 L316.8,115.6 L317.1,116.4 L317.2,116.8 L317.4,117.0 L317.2,117.3 L316.6,118.2 L316.9,118.8 L316.8,118.9Z"/><path fill="#8e762a" d="M116.2,238.3 L117.9,238.3 L118.5,238.5 L118.2,240.9 L115.7,240.7 L115.2,240.3 L116.1,239.6 L116.2,238.3Z"/><path fill="#59406f" d="M373.0,222.3 L371.7,221.4 L371.2,220.4 L370.5,221.7 L369.8,222.1 L369.5,222.9 L368.8,223.1 L367.6,221.4 L367.3,220.6 L366.0,220.3 L365.4,218.8 L364.6,218.0 L363.3,217.2 L363.2,216.2 L362.1,215.6 L360.8,215.2 L361.3,214.5 L361.8,213.5 L361.8,210.5 L362.0,208.7 L363.1,207.4 L363.5,208.1 L364.6,209.2 L365.1,209.2 L365.6,208.2 L366.7,207.4 L367.0,207.9 L368.4,206.6 L368.4,206.0 L369.0,204.8 L369.0,203.7 L369.4,202.6 L370.9,203.4 L371.5,202.4 L371.8,199.6 L372.1,197.2 L371.7,195.5 L371.2,194.9 L371.9,194.0 L371.8,193.2 L372.4,192.8 L372.8,195.2 L373.3,197.3 L374.2,197.8 L374.5,198.7 L374.7,200.2 L374.9,200.1 L375.3,202.5 L375.3,203.6 L374.7,204.4 L374.5,206.5 L375.3,206.0 L376.1,206.8 L376.4,207.8 L377.0,207.9 L378.1,210.4 L377.5,213.3 L376.9,215.9 L376.3,218.1 L375.4,219.0 L374.4,220.8 L373.5,220.9 L373.0,222.3Z"/><rect x="373.5" y="244.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="96.1" y="64.3" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="60.7" y="120.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="321.5" y="58.4" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="338.1" y="74.4" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="123.5" y="357.1" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="356.6" y="252.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="384.3" y="192.9" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="378.2" y="220.2" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="362.6" y="184.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="344.0" y="197.9" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="88.5" y="201.6" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="93.4" y="204.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="225.0" y="34.9" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="343.4" y="313.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="36.4" y="156.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="140.0" y="352.6" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="150.2" y="314.2" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="109.6" y="313.2" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="74.3" y="284.6" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="81.6" y="248.6" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="60.7" y="226.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="56.3" y="220.2" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="53.9" y="208.3" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="51.6" y="201.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="47.9" y="201.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="46.6" y="194.1" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="101.4" y="246.4" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="275.3" y="115.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="66.8" y="260.7" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="102.9" y="208.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="75.7" y="200.3" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="77.0" y="189.1" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="358.9" y="286.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="348.0" y="300.7" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="334.8" y="310.3" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="260.7" y="226.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="298.9" y="207.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="267.7" y="203.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="310.6" y="232.4" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="324.7" y="199.9" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="324.6" y="228.4" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="338.2" y="228.1" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="307.8" y="235.7" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="302.0" y="239.6" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="289.2" y="243.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="277.1" y="238.7" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="260.5" y="235.4" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="277.7" y="250.2" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="270.9" y="244.4" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="300.1" y="225.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="352.5" y="221.9" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="344.5" y="249.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="335.0" y="255.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="357.9" y="274.6" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="369.3" y="264.7" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="366.2" y="277.6" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="347.1" y="278.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="368.8" y="241.3" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="349.1" y="131.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="346.0" y="123.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="348.5" y="128.3" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="257.0" y="231.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="306.3" y="148.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="294.6" y="174.1" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="350.8" y="129.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="370.2" y="126.2" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="368.3" y="128.1" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="361.4" y="122.3" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="352.2" y="117.4" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="344.1" y="84.4" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="357.5" y="106.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="346.2" y="116.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="340.5" y="97.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="264.5" y="68.7" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="297.0" y="79.9" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="311.3" y="89.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="292.0" y="90.6" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="294.5" y="103.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="301.5" y="102.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="312.8" y="95.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="310.3" y="101.6" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="290.3" y="79.4" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="286.4" y="75.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="283.5" y="70.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="281.4" y="97.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="318.0" y="109.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="320.4" y="122.6" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="336.9" y="110.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="314.0" y="118.1" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="301.6" y="112.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="286.2" y="111.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="274.1" y="103.2" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="272.7" y="98.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="262.7" y="142.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="273.1" y="139.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="248.6" y="101.0" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="300.4" y="120.4" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="270.8" y="85.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="257.9" y="96.6" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="341.3" y="94.1" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="334.8" y="92.9" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="297.5" y="108.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="268.1" y="56.6" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="299.2" y="98.3" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="291.8" y="98.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="372.6" y="174.1" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="126.9" y="332.3" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="378.2" y="160.2" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="367.3" y="139.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="341.6" y="123.3" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="267.6" y="178.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="349.8" y="150.1" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="331.7" y="164.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="377.0" y="191.2" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="382.0" y="180.1" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="372.5" y="223.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="369.1" y="236.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="306.6" y="112.5" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="315.6" y="115.4" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="310.1" y="109.3" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="313.0" y="113.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="114.3" y="236.2" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/><rect x="366.1" y="207.8" width="6" height="6" fill="#080808" stroke="#999" stroke-width=".45"/></g><circle cx="200" cy="200" r="190" fill="url(#c17-earth-shade)"/></svg><div class="c17-control-glass"></div><button class="c17-control-nav right" aria-label="Exit">×</button><button class="c17-control-scanner" aria-label="Simulated species scanner"><svg viewBox="0 0 120 150" aria-hidden="true"></svg></button><div class="c17-control-result" role="status"></div>`;
  document.body.appendChild(panel);
  const scanner = panel.querySelector('.c17-control-scanner'), svg = scanner.querySelector('svg'), result = panel.querySelector('.c17-control-result');
  let timer, state = 'idle';
  const later = (fn, ms) => { clearTimeout(timer); timer = setTimeout(fn, ms); };
  const print = human => {
    const paths = Array.from({length:20}, (_,i) => {
      const x=18+i*4.4, r=8+i*2.3;
      const d=human ? `M${60-r} 125 C${60-r*1.2} 95 ${60-r*1.3} ${75-r} 60 ${72-r} C${60+r*1.3} ${75-r} ${60+r} 105 ${60+r*.7} 125` : `M${x} 18 l0 17 4 0 0 15 -4 0 0 19 -3 0 0 17 3 0 0 17 4 0 0 20`;
      return `<path d="${d}" pathLength="100" class="c17-control-runner" style="animation-delay:${i*37}ms"/>`;
    });
    svg.innerHTML=paths.join('');
  };
  const idle = () => { state='idle'; result.textContent=''; scanner.classList.remove('pressed'); svg.innerHTML=''; later(()=>{if(state==='idle') print(false);},2500); };
  const press = () => { if(state!=='idle')return; clearTimeout(timer); state='held'; svg.innerHTML=''; scanner.classList.add('pressed'); };
  const release = () => { if(state!=='held')return; state='reading'; scanner.classList.remove('pressed'); print(true); later(()=>{svg.innerHTML=''; later(()=>{state='denied'; result.innerHTML='ACCESS DENIED<small>(SPECIES UNRECOGNIZED)</small>'; later(idle,4000);},450);},1800); };
  scanner.addEventListener('pointerdown', e=>{scanner.setPointerCapture(e.pointerId); press();});
  scanner.addEventListener('pointerup', release); scanner.addEventListener('pointercancel', idle);
  scanner.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();press();}});
  scanner.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();release();}});
  const close = () => {clearTimeout(timer); document.removeEventListener('keydown',escape); panel.remove(); openIlluminatiCountdown();};
  const escape = e=>{if(e.key==='Escape')close();};
  panel.querySelector('.c17-control-nav').onclick=close; document.addEventListener('keydown',escape); idle();
}

function syncTawnyaDossierToVisibleScreen() {
  if (!tawnyaProfileOverlay || !tawnyaProfileOverlay.isConnected) return;
  const viewport = window.visualViewport;
  // Native pinch magnifies a stable document. Do not resize/reflow the
  // dossier into the shrinking visual viewport or chase its pan offsets.
  if (viewport && Math.abs(viewport.scale - 1) > 0.01) return;
  const width = document.documentElement.clientWidth || window.innerWidth;
  const height = window.innerHeight;
  if (tawnyaProfileOverlay.style.width === `${width}px` &&
      tawnyaProfileOverlay.style.height === `${height}px`) return;
  tawnyaProfileOverlay.style.setProperty("left", "0px", "important");
  tawnyaProfileOverlay.style.setProperty("top", "0px", "important");
  tawnyaProfileOverlay.style.setProperty("right", "auto", "important");
  tawnyaProfileOverlay.style.setProperty("bottom", "auto", "important");
  tawnyaProfileOverlay.style.setProperty("width", `${width}px`, "important");
  tawnyaProfileOverlay.style.setProperty("height", `${height}px`, "important");
}

function openTawnyaProfile() {
  const overlay = ensureTawnyaProfileOverlay();
  syncTawnyaDossierToVisibleScreen();
  overlay.classList.add("open");
  // Measure the six visible friend slots after the profile becomes visible.
  requestAnimationFrame(() => {
    const strip = overlay.querySelector('.c17-friends-swipe');
    if (strip) strip.style.setProperty('--c17-friends-viewport-width', `${strip.clientWidth}px`);
  });
  overlay.setAttribute("aria-hidden", "false");
  document.documentElement.classList.add("tawnya-dossier-open");
  document.body.classList.add("tawnya-dossier-open");
  overlay.scrollTop = 0;

  if (!overlay.dataset.viewportSyncBound) {
    overlay.dataset.viewportSyncBound = "true";
    window.addEventListener("resize", syncTawnyaDossierToVisibleScreen, { passive: true });
    window.addEventListener("orientationchange", syncTawnyaDossierToVisibleScreen, { passive: true });

  }
}

function retireTawnyaHeart() {
  if (!tawnyaRevealNode || !tawnyaRevealNode.isConnected) return;

  tawnyaRetired = true;
  window.clearTimeout(tawnyaHoldTimer);
  tawnyaHoldTimer = null;
  tawnyaHoldPointerId = null;

  const image = tawnyaRevealNode.querySelector("img");
  if (image) {
    // The dossier closes back onto the plain cracked frozen heart.
    // LMT is already a transparent PNG, so assign it directly instead of
    // routing the return state through a canvas conversion that can briefly
    // expose a broken-image box on mobile Safari.
    image.dataset.c17RequestedAsset = FROZEN_STORY_HEART_ASSET;
    image.onerror = () => { image.onerror = null; image.src = "heart.grey.PNG"; };
    image.src = FROZEN_STORY_HEART_ASSET;
    image.removeAttribute("srcset");
    image.alt = "";
    image.style.setProperty("opacity", "1", "important");
    image.style.setProperty("visibility", "visible", "important");
    image.style.setProperty("filter", "none", "important");
    image.style.setProperty("clip-path", "none", "important");
    image.style.setProperty("transform", "none", "important");
  }

  tawnyaRevealNode.classList.remove(
    "tawnya-holding",
    "tawnya-thawed",
    "tawnya-rewriting"
  );
  tawnyaRevealNode.classList.add("tawnya-retired", "tawnya-complete");
  tawnyaRevealNode.setAttribute("aria-label", "frozen cracked heart");
  tawnyaRevealNode.disabled = true;
  tawnyaRevealNode.style.setProperty("pointer-events", "none", "important");
}

// Vesh English Edition: exact spelling, one approved glyph per English letter.
// SH/TH/ZH are reserved separate signs; never silently combine English pairs.
function veshMarkup(value, className = "") {
  const glyphs = veshMarkup.glyphs || (veshMarkup.glyphs = {"A":["M19 150 C22 113 37 57 68 34 C84 22 92 40 76 52 C62 63 44 58 38 76 M34 111 Q59 102 81 108",[]],"E":["M17 111 C34 120 73 125 83 103 C93 80 67 79 56 94 C48 106 49 126 62 140 C71 150 83 154 88 153",[]],"I":["M66 27 C39 60 78 80 56 108 C40 126 25 134 24 155 M39 68 Q51 63 62 63",[]],"L":["M28 29 C50 48 79 58 77 87 C75 109 58 116 55 143 C54 158 62 166 72 168 M42 83 Q58 83 67 76",[]],"Q":["M53 8 C62 39 77 82 66 108 C60 123 45 130 45 140 C44 153 55 167 63 180 M32 98 Q54 120 78 135",[[47,86]]],"SH":["M16 145 C28 129 59 112 70 90 C85 59 57 44 49 69 C43 89 56 111 83 120 M24 51 Q32 48 39 49",[]],"TH":["M75 58 C83 88 54 127 23 120 C10 116 15 99 30 96 M50 81 Q71 87 87 73",[[22,59],[22,73]]],"B":["M27 28 C37 60 73 69 72 97 C71 126 39 143 18 127 M19 82 Q46 88 67 77",[]],"C":["M19 112 C31 89 60 99 75 78 C89 58 65 40 49 55 C37 68 50 83 61 79 M27 132 Q43 130 50 121",[]],"D":["M29 157 C42 126 71 112 76 80 C81 45 55 16 36 30 C16 46 37 71 55 63",[]],"F":["M21 64 C44 86 79 80 80 57 C81 37 59 40 57 65 C55 98 46 131 28 153",[]],"G":["M18 116 C30 124 51 119 62 104 C78 82 70 61 54 62 C35 63 35 84 48 87 C65 92 82 73 85 57",[]],"H":["M25 29 C19 69 34 93 55 91 C80 88 81 60 68 56 C54 53 51 86 57 140",[]],"J":["M24 34 C48 29 64 51 61 79 C59 104 35 116 39 142 C42 160 61 162 78 150 M19 94 Q34 93 42 84",[]],"K":["M68 32 C43 45 29 77 32 104 C35 131 62 145 83 130 M18 112 Q39 113 54 101",[]],"M":["M14 102 C34 73 68 74 85 102 M30 60 C26 93 40 125 67 138",[]],"N":["M17 132 C34 111 25 69 40 62 C57 54 45 112 62 121 C72 127 81 113 87 100",[]],"O":["M50 86 A17 17 0 1 0 50 120 A17 17 0 1 0 50 86 M50 52 V154",[]],"P":["M30 27 C52 48 63 76 51 103 C42 124 26 144 25 163 M12 83 Q45 98 87 76 M14 103 Q47 123 87 100",[]],"R":["M18 72 C41 87 75 76 77 57 M51 79 C48 100 26 105 29 124 C33 147 65 149 83 130",[]],"S":["M17 110 C23 90 44 82 60 91 C81 104 65 127 51 114 C36 99 60 67 79 54",[]],"T":["M24 51 C46 41 76 53 75 79 C74 104 50 127 23 120 C10 116 15 99 30 96 M50 81 Q71 87 87 73",[[22,72]]],"U":["M71 45 C60 79 20 97 25 123 C29 145 54 140 51 120 C47 95 25 72 33 49",[]],"V":["M18 51 C23 76 49 88 67 105 C83 122 67 147 47 137",[[71,53]]],"W":["M16 118 C36 109 73 91 82 63 C91 33 55 36 51 61 C47 86 61 103 85 108 L70 128",[]],"X":["M30 30 C20 60 35 80 60 95 C85 110 85 138 66 152",[[32,105],[79,88]]],"Y":["M25 34 C39 57 67 62 74 82 C81 104 58 121 40 110 C22 97 39 81 51 94 C66 112 56 143 38 158",[[78,131]]],"Z":["M18 61 C40 38 79 50 70 74 C63 93 28 100 29 121 C30 138 60 146 83 130 M37 94 Q53 98 64 94",[]],"ZH":["M18 61 C40 38 79 50 70 74 C63 93 28 100 29 121 C30 138 60 146 83 130 M37 94 Q53 98 64 94",[[78,91]]]});
  const escape = text => String(text).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const words = String(value).split(/\s+/).filter(Boolean).map(word => {
    const marks = [...word].map((character, index) => {
      const form = glyphs[character.toUpperCase()];
      if (!form) return `<text x="${index * 96 + 30}" y="145" fill="currentColor" stroke="none" font-family="monospace" font-size="60">${escape(character)}</text>`;
      const [path, dots] = form;
      return `<g transform="translate(${index * 96} 0)" data-vesh-letter="${character.toUpperCase()}"><path d="${path}"/>${dots.map(([x,y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="currentColor" stroke="none"/>`).join("")}</g>`;
    }).join("");
    const width = [...word].length * 96;
    return `<svg class="c17-vesh-word" viewBox="0 0 ${width} 195" style="width:${width / 195 * 1.8}em" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="3.8" stroke-linecap="butt" stroke-linejoin="round">${marks}</svg>`;
  }).join(" ");
  return `<span class="c17-vesh ${escape(className)}" lang="en" data-script="vesh" role="img" aria-label="${escape(value)}">${words}</span>`;
}

function pothSelfDoodleMarkup() {
  return `<svg viewBox="0 -260 1136 1640" role="img" aria-label="POTH self-doodle smoking a pre-roll, red smoke curling upward" class="poth-self-doodle"><defs><clipPath id="pothHeadCrop"><rect x="0" y="0" width="1136" height="890"/></clipPath><filter id="pothDeepInk"><feFlood flood-color="#a52e36"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs><image width="1136" height="1380" href="T.Snail.PothDoodle.PNG" clip-path="url(#pothHeadCrop)" filter="url(#pothDeepInk)"/><g fill="none" stroke="#a52e36" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M242 855 L906 803 L851 1269 L214 1362 Z M246 866 L894 815 M211 1351 L868 1255"/><path d="M551 737 L647 707 L651 720 L557 749 Z M638 712 L643 721"/><path d="M650 707 C765 645 588 573 716 509 S856 384 762 301 S831 198 816 128 C803 74 731 73 781 19 S865 -53 812 -83 M657 704 C788 618 653 581 742 518 S882 384 796 296 S865 195 840 126"/><path d="M813 -83 C876 -117 823 -203 747 -172 C687 -238 607 -195 572 -164 C480 -199 409 -167 439 -113 C346 -65 443 -23 525 -46 C580 10 658 -9 694 -41 C771 -7 851 -34 813 -83 M799 -94 C840 -148 766 -194 716 -164 C663 -221 570 -154 538 -165 C454 -188 417 -98 493 -93 C418 -34 568 -25 589 -62 C624 -6 735 -49 710 -76 C824 -19 882 -92 799 -94 M459 -91 C553 -152 715 -120 792 -94 M490 -130 C586 -181 748 -128 798 -62 M493 -54 C571 -111 693 -154 782 -136 M556 -169 C546 -94 653 -32 736 -60"/></g></svg>`;
}

function pothWorkInProgressMarkup() {
  return `<section class="poth-wip" aria-label="Poth’s unfinished email and working notes">
    <header class="poth-work-head"><span>INTERNAL CORRESPONDENCE</span><b>WORKING COPY</b><small>GRIEVANCE GENERATOR / REV. 0.3</small></header>
    <div class="poth-draft"><small>[SENDER IDENTITY — UNASSIGNED]</small><p>Fuck you, Tawnya.</p><p>Don’t call me. Don’t message me—<span class="poth-caret" aria-hidden="true">▏</span></p><span class="poth-red poth-human-note">MAKE THIS SOUND HUMAN.<br><small>Unfortunately.</small></span></div>
    <section class="poth-notes"><h3>POTH — WORKING NOTES</h3>
      <p>Why is this person angry? Establish grievance before adding more profanity.</p>
      <p class="poth-red poth-grievance">“She knows what she did.”<br><small>I still need to decide what she did.</small></p>
      <p>Supervisor requested “a believable antagonist.” Supervisor supplied no believable instructions.</p>
      <div class="poth-margin-row"><figure class="poth-boss-doodle"><svg viewBox="0 0 240 180" role="img" aria-label="Red pen caricature of Biffe with an enormous head and a tiny penis-shaped clipboard"><g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M56 15 Q24 16 25 52 Q18 89 65 93 Q109 96 108 57 Q113 19 70 14 M32 29 l-12 -8 m23 1 l-1 -14 m23 9 l10 -10 M49 48 l10 2 m19 -2 l10 -3 M61 65 q12 7 23 -2 M65 94 l-3 39 -24 29 m24 -29 l27 30 m-27 -50 l-24 15 m28 -17 l55 19 M44 166 l-16 0 m63 0 l12 0 M132 127 l0 -22 q0 -10 6 -10 q6 0 6 10 l0 22 m-12 0 q-10 -7 -11 1 q-1 8 10 8 q6 0 7 -5 q2 9 10 5 q10 -5 0 -10 M133 108 l9 0 M128 142 l34 6"/></g><text x="117" y="72" fill="currentColor" font-size="16" font-family="PothNotes, cursive" transform="rotate(-7 117 72)">VISIONARY.</text><path d="M148 78 q-12 2 -22 -10 m0 0 1 9 m-1 -9 8 3" fill="none" stroke="currentColor" stroke-width="2"/></svg><figcaption class="poth-red">Enormous head.<br>Tiny fucking brief.</figcaption></figure>
      <div class="poth-break-note poth-red"><s>BREAK: 7 MINUTES.</s><p>TIME IS A LOCAL<br>CONSTRUCT.</p><small>essential containment<br>maintenance</small></div></div>
      <div class="poth-alien-note poth-red"><p>${veshMarkup("Biffe thinks: work is sacred. I need a break.")}</p></div>
      <p class="poth-red poth-opinion"><span aria-hidden="true">☐</span> Remove personal opinions before submission.</p>
      <p class="poth-release">DO NOT RELEASE. SUBJECT CAN READ.</p>
    </section>
    <footer class="poth-work-footer"><figure class="poth-stall-doodle">${pothSelfDoodleMarkup()}</figure>
      <p class="poth-personal-quote poth-red">${veshMarkup("In the world so deep with color, my mind can think of only one.")}</p>
      <div class="poth-birthday"><img src="T.Snail.PP.HappyBirthday.PNG" alt="November 2, 2026, in Poth’s numerals … Happy Birthday" decoding="async"></div>
    </footer>
  </section>`;
}

function parcelPossumEmailMarkup() {
  const escapeHtml = value => String(value || "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  // Prices are fictional inventory values, stored in cents. The original art
  // deliberately has no numeric price and never contributes zero to a total.
  const items = [
    ["Thongs", "Barely There™ Economy Thongs — Bulk Case", "Why pay more? You’re selling them anyway.", 499],
    ["Gum", "Watermelon Chewing Gum — 3-Pack", "For a mouth with a lot to answer for.", 75],
    ["Picks", "Folding Lockout Multitool", "For when opportunity doesn’t knock.", 2500],
    ["Deck", "Custom Blind Skate Deck", "A little bedtime mischief. Supervision was apparently optional.", 15000],
    ["Bulbs", "Ordinary Light Bulbs — 6-Pack", "Six chances to have a bright idea. No pressure.", 99],
    ["Slippers", "Dorothy’s Slip-Ons (Procured)", "Previous owner unavailable for comment.", 350000000],
    ["DTWT", "DTWT — Do the Wrong Things", "Original owner still seems to be looking for them. Hot / Do not wear in Brockton.", 32000],
    ["smoke", "Smoke Detector", "Finally, someone in this apartment with boundaries.", 200],
    ["Alibi", "Premium Alibi Planner", "A busy woman needs somewhere to keep the stories straight.", 4999],
    ["ILYD", "i love you daddy", "Artist: Little Known. One of a kind. Framed.", null],
    ["Rags", "UTC Under-the-Counter Tampons — 24-Pack", "Twenty-four opportunities to tell someone you’re fine.", 300],
    ["Brady", "Tom Brady’s Game-Worn Jersey", "He doesn’t even know we have it.", 50000000],
    ["Paint", "Ninja Paint — Lifetime Supply", "For when the family resemblance needs a little help.", 1299],
    ["Gravity", "Prototype Gravity Bong", "One small pull for mankind. There goes your fucking afternoon.", 75000],
    ["Mice", "Georgia’s Best — Live Feeder Mice", "Please have someone home to sign. Preferably someone with a pulse.", 500],
    ["Wonka", "Wonka — Guaranteed Golden Ticket", "Financial planning, with chocolate.", 2500000],
    ["Bongo", "Baby Raccoon — Bongo", "House-trained. Just not your house.", 80000]
  ];
  const money = cents => (cents / 100).toLocaleString('en-US', {style:'currency', currency:'USD'});
  const subtotal = items.reduce((sum, item) => sum + (item[3] ?? 0), 0);
  return `<section class="pp-email" aria-label="Parcel Possum shipment">
    <header class="pp-letterhead"><img src="T.Snail.Possum.PNG" alt="Parcel Possum"><h2>Best. News. Evah!</h2></header>
    <div class="pp-sarcasm"><p>Estimated arrival: eventually.</p><p>Driver has 47 stops before yours.</p><p>Please stop refreshing. It does not make the truck move faster.</p></div>
    <p class="pp-check-copy">If you really need to check, though… track your shit here.</p>
    <button class="pp-track-button" type="button" data-pp-track aria-controls="pp-tracking-result" aria-expanded="false"><span data-pp-button-label>Track Package</span><span class="pp-recycle" aria-hidden="true">♻</span></button>
    <div class="pp-travel" data-pp-travel><img src="T.Snail.PP.Delivery.PNG" alt="Freight truck on its way"></div>
    <ol class="pp-stages" aria-label="Shipment progress"><li class="is-done"><span>1</span>Received</li><li class="is-current" aria-current="step" data-pp-forwarded><span>2</span>Forwarded</li><li data-pp-delivered><span>3</span>Delivered</li></ol>
    <p class="pp-tracking-status" data-pp-status role="status" aria-live="polite"></p>
    <section id="pp-tracking-result" class="pp-result" data-pp-result hidden aria-label="Pickup location in Egypt">
      <div class="pp-map"><img loading="lazy" decoding="async" src="T.Snail.PP.Egypt.PNG" alt="Egypt pickup map with pyramids, the Sphinx and a red X on the freight warehouse">
        <svg class="pp-marker-pulse" viewBox="0 0 120 140" aria-hidden="true"><path d="M12 12 L108 128 M108 12 L12 128" fill="none" stroke="#e43a42" stroke-width="13" stroke-linecap="round"/></svg>
      </div>
      <p class="pp-delivery-status"><strong>Delivered / Pickup pending</strong><small class="pp-discretion">Proof of delivery withheld as proof of discretion.</small><span lang="ar" dir="rtl">تم التسليم — في انتظار الاستلام</span></p>
    </section>
    <div class="pp-letter"><p>Dear Tawnya,</p><p>Your items of interest have been deposited in a very peculiar place. Our forwarding department assures us this was intentional.</p><p>Delivery is complete. Collection remains your responsibility.</p><p>Upon arrival, proceed as though you have been there before. If you find yourself needing water, ask for Phil three times. These must be three separate requests. Phil has been advised.</p><p>Your order is itemized below for identification purposes. We recommend familiarizing yourself with its contents before anyone asks.</p><p>Thank you for trusting Parcel Possum.</p><p>We move your shit for $.</p><p>– Mr. E.</p></div>
    <section class="pp-order" aria-label="Order details"><header class="pp-order-head"><h3>Your items of interest</h3><span>17 items</span></header>
      <div class="pp-order-scroll" tabindex="0" role="region" aria-label="Scroll through all 17 order items"><ol class="pp-items">${items.map(([asset, title, description, cents]) => `<li class="pp-item"><img data-pp-src="T.Snail.PP.${asset}.PNG" alt="${escapeHtml(title)}" width="90" height="90" decoding="async"><div class="pp-item-copy"><h4>${escapeHtml(title)}</h4><p>${escapeHtml(description)}</p><small>Qty: 1</small></div><strong class="pp-price">${cents === null ? 'Priced separately as discussed' : money(cents)}</strong></li>`).join('')}</ol></div>
      <dl class="pp-totals"><div><dt>Priced merchandise subtotal (16 items)</dt><dd>${money(subtotal)}</dd></div><div><dt>Original artwork</dt><dd>Priced separately as discussed</dd></div><div><dt>Freight forwarding</dt><dd>${money(4700)}</dd></div><div><dt>Tax</dt><dd>Included</dd></div><div class="pp-total"><dt>Priced total</dt><dd>${money(subtotal + 4700)} + artwork priced separately</dd></div></dl>
    </section>
  </section>`;
}

function observeParcelPossumImages(container) {
  const root = container.querySelector('.pp-order-scroll');
  if (!root) return () => {};
  const images = [...root.querySelectorAll('img[data-pp-src]')];
  const load = image => { image.src = image.dataset.ppSrc; };
  if (!('IntersectionObserver' in window)) {
    images.forEach(load);
    return () => images.forEach(image => image.removeAttribute('src'));
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => {
      if (isIntersecting) load(target);
      else target.removeAttribute('src');
    });
  }, {root, rootMargin: '160px 0px'});
  images.forEach(image => observer.observe(image));
  return () => {
    observer.disconnect();
    images.forEach(image => image.removeAttribute('src'));
  };
}

function startParcelPossumTracking(button) {
  const email = button.closest('.pp-email');
  if (!email || button.disabled) return;
  button.disabled = true;
  button.classList.add('is-loading');
  button.setAttribute('aria-busy', 'true');
  email.querySelector('[data-pp-button-label]').textContent = 'Locating Package…';
  email.querySelector('[data-pp-status]').textContent = 'Consulting the forwarding department…';
  window.setTimeout(() => {
    // Message navigation replaces the DOM. Never update a different message
    // or a newly opened instance after this request has been abandoned.
    if (!email.isConnected) return;
    button.classList.remove('is-loading');
    button.removeAttribute('aria-busy');
    button.setAttribute('aria-expanded', 'true');
    email.querySelector('[data-pp-button-label]').textContent = 'Package Located';
    email.querySelector('[data-pp-status]').textContent = 'Delivered / Pickup pending — Egypt';
    email.querySelector('[data-pp-travel]').hidden = true;
    email.querySelector('[data-pp-result]').hidden = false;
    const forwarded = email.querySelector('[data-pp-forwarded]');
    forwarded.className = 'is-done';
    forwarded.removeAttribute('aria-current');
    const delivered = email.querySelector('[data-pp-delivered]');
    delivered.className = 'is-current is-done';
    delivered.setAttribute('aria-current', 'step');
  }, 2200);
}


function ensureTawnyaSnail() {
  let snail = document.querySelector(".c17-snail-overlay");
  if (snail) return snail;

  const p = (...lines) => lines.map(line => `<p>${line}</p>`).join("");
  const folders = {
    inbox: [
      {id:"eugene", sender:"(Eww..)Gene", address:"eugene4real@snail.com", subject:"I think it's finally time", preview:"So I know this is probably going to come completely out of nowhere for you…", date:"SEP 27", avatar:"T.Eugene.Snail.PNG", unread:true, body:p("Hey Tawnya,","So I know this is probably going to come completely out of nowhere for you, but for me it actually goes back pretty far.","I've been in love with you since 10th grade.","I almost told you at Jessica Martin's Halloween party, but you were dating Kyle, and honestly I respected that. Then junior year I thought about saying something after chemistry, but you left before I could catch up with you.","After graduation I figured eventually there would just be a moment where we'd both know.","There hasn't been.","So I'm creating the moment.","Dinner. Just you and me. Think about it.","— Eugene","P.S. I'm off Tuesday and Thursday, but I can probably get Wednesday covered if Wednesday feels more natural for you.")},
      {id:"rmv", sender:"Massachusetts Registry of Motor Vehicles", avatar:"T.Snail.Govseal.PNG", address:"mass.rmv@snail.com/notices", subject:"Registration canceled — insurance lapse", preview:"Your vehicle registration has been canceled following an insurance cancellation notice.", date:"SEP 23", unread:true, body:`<div class="c17-snail-official"><div class="c17-snail-gov-letterhead"><img src="T.Snail.Govseal.PNG" alt=""></div><b>REGISTRATION STATUS NOTICE</b><p>Our records indicate that the insurance associated with your vehicle registration is no longer active.</p><p><strong>STATUS: CANCELED</strong></p><p>Do not operate the vehicle until insurance and registration requirements have been resolved.</p></div>`},
      {id:"keisha", sender:"Keisha", address:"Keisha31@snail.com", subject:"...", preview:"bitch you better pray i dont run into your punk ass…", date:"SEP 30", avatar:"T.Snail.Keisha.PNG", unread:true, body:p("bitch you better pray i dont run into your punk ass if i see you or that skank felicia imma beat both yalls asses bet")},
      {id:"bm-menu", sender:"GreenQueen1971", address:"greenqueen1971@snail.com", subject:"This week's garden 🌿", preview:"THE HERBOLOGIST — WEEKLY MENU", date:"SEP 22", body:`<p class="c17-snail-menu-title">THE HERBOLOGIST — WEEKLY MENU</p>${p("🌿 Bayou Blessing — 35 — Soft, slow & don't make no plans.","🍯 Mama's Honey Jar — 50 — Sweet going in. Mind your business coming out.","🌙 Midnight Moss — 45 — For after the children and respectable people have gone to bed.","🔥 Devil's Houseplant — 60 — Don't call me tomorrow saying I didn't warn you.","Cash keeps everybody honest. — BM")}`},
      {id:"gregory", sender:"Gregory P.", address:"gregory.p83@snail.com", subject:"RE: order #88104", preview:"These were advertised as USED. I am extremely disappointed.", date:"SEP 21", body:p("Hello,","I don't normally complain, but these were advertised as USED and what arrived was frankly nowhere near the condition I expected.","I paid extra for authenticity. These smell like laundry detergent.","I would like either a replacement with the advertised level of wear or a partial refund.","This is honestly about principle at this point.","Gregory P.")},
      {id:"deposit-sf", sender:"DesiredDischarge", address:"payouts.desireddischarge@snail.com", avatar:"T.Snail.Discharge.PNG", subject:"Deposit received — DesiredDischarge", preview:"Badkitty creator payout deposited to checking •••• 4319", date:"SEP 20", body:"<p class='c17-snail-deposit'>+$3,417.82</p><p>Creator payout deposited to checking •••• 4319</p>"},
      {id:"oda-rain", sender:"GooGooJuice", avatar:"T.Friends.Oda.PNG", address:"googoojuice@snail.com", subject:"Don't answer it", preview:"Baby, if somebody knocks three times tonight, don't answer the door…", date:"SEP 18", body:p("Baby, if somebody knocks three times tonight, don't answer the door.","Unless it's UPS. My package says delivered and I accidentally used your address again.","whispers in the rain.","— Oda")},
      {id:"deposit-feet", sender:"SoakedSocks89", address:"payouts.soakedsocks89@snail.com", avatar:"T.Snail.Socks.PNG", subject:"Deposit received — SoakedSocks89", preview:"Funkprincess27 creator payout deposited to checking •••• 4319", date:"SEP 15", body:"<p class='c17-snail-deposit'>+$1,286.40</p><p>Creator payout deposited to checking •••• 4319</p>"},
      {id:"someday", sender:"TICKET DESK", address:"someday.boxoffice@snail.com", subject:"Your SOMEDⒶY tickets are confirmed", preview:"Your tickets are in. Keep this message for entry.", date:"SEP 12", body:p("Your SOMEDⒶY tickets are confirmed.","Keep this message for entry. Doors and ticket details are attached to the recovered account record.")},
      {id:"subpoena", sender:"COURT NOTICE", address:"court.efile@snail.com", subject:"NOTICE TO APPEAR — SUMMONS/SUBPOENA", preview:"Electronic notice available for review.", date:"SEP 08", body:"<p class='c17-snail-artifact-note'>[COURT DOCUMENT RESERVED — CONTENT NOT YET WRITTEN.]</p>"},
      {id:"enemy", sender:"UNKNOWN", address:"FuckyouBiffe@snail.com(FIX B4 SUBMIT)", subject:"YOU KNOW EXACTLY WHY I'M EMAILING YOU", preview:"[SENDER IDENTITY — UNASSIGNED] / POTH — WORKING NOTES", date:"NOV 02", body:pothWorkInProgressMarkup()},
      {id:"mom", sender:"Mom", address:"StarBooBoo@snail.com", subject:"NEVER AGAIN", preview:"What the HELL was in that gummy?!", date:"SEP 24", avatar:"T.Snail.Mom.PNG", unread:true, body:p("Tawnya,","What the HELL was in that gummy?!","ONE. I took ONE because you said it would help me sleep.","My shoe dropped and woke me up, and I had NO IDEA where I was. I thought I was in a hotel. I couldn’t figure out whether I rented the room or if I had SNUCK INTO THE DAMN PLACE.","There were people in the hallway. I didn’t know if they were coming in. The room wouldn’t stop spinning, and at one point I thought I was going to go THROUGH THE FLOOR.","And I couldn’t figure out how to get my shoe so I could get the hell OUT.","I WAS IN MY OWN BED, TAWNYA.","You gave me a bedtime gummy and I spent the night wondering if I was trespassing.","NEVER. AGAIN.","— Mom")},
      {id:"reset", sender:"SNAIL Security", avatar:"T.Snail.Privacy.PNG", address:"snail.auth-daemon_0x7f.a91c@snail.com", subject:"New sign-in to your account", preview:"A new device signed in near Worcester, MA.", date:"AUG 29", body:p("New sign-in detected.","Device: iPhone","Location estimate: Worcester, MA","If this was you, no action is required. If it wasn't, maybe stop using the same password everywhere.","— SNAIL Security")},
      {id:"scott-tripp", address:"TrippWire@snail.com", sender:"Scott Tripp", subject:"IT’S COMING…", preview:"Yo ninja… We Gathering this year?!?!", date:"SEP 29", avatar:"T.Snail.Scott.PNG", unread:true, body:p("Yo ninja…","We Gathering this year?!?!","Been too fuckin long. WHOOP WHOOP <img class='c17-snail-inline-emoji' src='T.Snail.Clown.PNG' alt='clown'>")},
      {id:"shipping", sender:"Parcel Possum", avatar:"T.Snail.Possum.PNG", address:"dead.drop@snail.com", subject:"Your package is out for delivery", preview:"Driver has 47 stops before yours. Please stop refreshing.", date:"AUG 27", body:parcelPossumEmailMarkup()}
    ],
    spam: [
      {id:"pivs", address:"identity.collection@snail.com", sender:"Personal Information Verification Solutions, LLC", subject:"FINAL NOTICE — Sorry We Took So Long To Respond", preview:"Please provide all personal information so we can finish verifying you.", date:"SEP 29", unread:true, body:p("Hello Tawnya,","We sincerely apologize for taking so long to respond.","To complete your identity verification, please reply with your full legal name, date of birth, Social Security number, current and previous addresses, mother's maiden name, first pet, elementary school, banking institution, routing and account numbers, debit/credit card numbers with expiration dates and security codes, email username and password, photographs of the front and back of your ID, and a selfie holding that ID.","Please also include your normal work schedule and the hours your home is usually empty.","Failure to provide complete information may prevent us from successfully verifying and/or becoming you.","Thank you for choosing Personal Information Verification Solutions, LLC.","Securing You Through Information™")},
      {id:"spam1", sender:"MYSTERY PRIZE CENTER", address:"definitely.real.prizes@snail.com", subject:"TAWNYA YOU HAVE BEEN SELECTED!!!", preview:"Claim your $7,400 gift card before midnight.", date:"SEP 26", body:p("CONGRATULATIONS TAWNYA!!!","You have been selected from several billion extremely lucky people.","Reply with your mother's maiden name, first pet, and a photograph of both sides of your debit card.","This is definitely normal.")},
      {id:"spam2", sender:"Local Singles Alert", address:"localsingles.phishing.scam@snail.com", subject:"Local Singles - Your box is stuffed!!", subjectIcon:"T.Snail.Localsingles.PNG", preview:"One of them claims to own a boat!", date:"SEP 19", body:p("Hey Skatergirl89@snail.com,","There are about 10 new scumpas showing up in Winchetucky, only 34 miles from your current location. One of them claims to own a boat!","<em>Our people have not verified the legitimacy of this claim</em>")},
      {id:"spam3", sender:"Extended Warranty Department", address:"AdamLovesHisJetSki82@snail.com", subject:"FINAL FINAL FINAL NOTICE", preview:"We have been trying to reach you since the invention of the automobile.", date:"SEP 10", body:p("This is your FINAL FINAL FINAL notice.","We have been trying to reach you about your vehicle's extended warranty since approximately the invention of the automobile.")}
    ],
    sent: [
      {id:"wink-sent", sender:"Tawnya Grey", displayName:"The Winkinator", recipient:"Walter “Wink” Winkler <Winkinator@snail.com>", subject:"you left this here", preview:"Found your hoodie. Again.", date:"SEP 27", avatar:"T.Snail.Wink.PNG", body:p("Wink —","Found your hoodie. Again.","I'm putting it on the chair by the door because apparently my apartment is your lost and found now.","Also tell me why your contact photo still makes me laugh every single time.","— T")},
      {id:"sent-oda", sender:"Tawnya Grey", displayName:"GooGooJuice", recipient:"Oda <googoojuice@snail.com>", subject:"RE: Don't answer it", preview:"If it is a ghost I'm giving it your package.", date:"SEP 18", body:p("If it is a ghost I'm giving it your package.","And stop shipping things to my house.","Love you, swamp goblin.","— T")},
      {id:"sent-greg", sender:"Tawnya Grey", displayName:"Gregory P.", recipient:"Gregory P. <gregory.p83@snail.com>", subject:"RE: order #88104", preview:"Gregory, I don't know how to say this professionally…", date:"SEP 21", body:p("Gregory,","I don't know how to say this professionally, so I won't.","You ordered underwear from a stranger on the internet and you're emailing quality control because they smell too clean.","Refund issued. Please go outside.","— Tawnya")}
    ],
    drafts: [
      {id:"draft1", sender:"DRAFT", recipient:"Mom <StarBooBoo@snail.com>", subject:"RE: Call me when you wake up", preview:"I DID check that cabinet…", date:"SEP 24", body:p("I DID check that cabinet.","[draft not sent]")},
      {id:"draft2", sender:"DRAFT", recipient:"UNKNOWN <FuckyouBiffe@snail.com(FIX B4 SUBMIT)>", subject:"You don't get to—", preview:"Actually no. Fuck this.", date:"SEP 05", body:p("You don't get to disappear for six months and then—","Actually no. Fuck this.","[draft not sent]")}
    ],
    trash: [
      {id:"braidyn-p", sender:"Braidyn P.", address:"UzlesspHatfuk0@snail.com", subject:"yo u still got the hookup", preview:"yo tawnya i just got outta juvie dont ask what happened…", date:"OCT 13", avatar:"T.Snail.OBCD.PNG", unread:true, body:p("yo tawnya i just got outta juvie dont ask what happened its all bullshit anyway","listen i know its been a minute but u still doing that fall off the truck special","i need like 4 boxes of twinkies and them ho hos bad","not the little packs either i mean the BOXES","they barely gave us shit in there and i been thinking about them cream filled ones for like three weeks straight","i got 11 dollars right now but my aunt said i can probably get another 6 when she gets paid unless she remembers i owe her money","please dont tax me either tawnya im literally fresh out","if u got zebra cakes too throw them in and ill owe u","dont tell nobody im back yet","your favorite")},
      {id:"trey", address:"TreyAfterDark@snail.com", sender:"Trey", subject:"Damn.. Sup girl!", preview:"Got yo info from Lesley…", date:"SEP 21", avatar:"T.Snail.Trey.PNG", body:p("Got yo info from Lesley…","HMB, fa’real fa’real.","…. Let’s introduce your stuff to my stuff…","Know what I’m sayin..")},
      {id:"oda-lottery", sender:"GooGooJuice", address:"googoojuice@snail.com", subject:"stars be shinin", preview:"Girl them stars be shinin down on the games tonight…", date:"SEP 17", body:p("Girl them stars be shinin down on the games tonight. Been hearin them crickets carryin on since sundown and they keep givin me 3, 24, 39, 61, 65… & 9.","If I don't make it down to the market, one of us better play em.","And don't you go fuckin with them numbers neither.","The crickets ain't been stutterin'. You know.","— Oda")},
      {id:"trash2", sender:"SNAIL", avatar:"T.Snail.Privacy.PNG", address:"noreply@snail.com", subject:"Storage almost full", preview:"You have used 96% of your recovered storage.", date:"SEP 03", body:p("Your SNAIL storage is almost full.","Maybe delete the 2,846 screenshots you swear you're going to look at later.")},
      {id:"trash3", sender:"Pizza Palace", avatar:"T.Snail.Pizza.PNG", address:"PizzaPalace@snail.com", subject:"We miss you, skatergirl89", preview:"It's been 9 days. This is getting weird for both of us.", date:"AUG 28", body:p("We miss you, skatergirl89.","It's been 9 days since your last order.","This is getting weird for both of us.")},
      {id:"joe", sender:"Joe", address:"Jbruce17@snail.com", subject:"ONE MORE RIDE", preview:"Black moon, back room, hatchet in the rafters…", date:"AUG 27", avatar:"T.Snail.Joe.PNG", body:`<div class="c17-snail-joe-bars"><p>Black moon, back room, hatchet in the rafters,<br>Mad clown, face down, choking on the laughter.<br>Graveyard Grey got the dead boys twitchin’,<br>Neden-lovin’ heathen with a cauldron in the kitchen.</p><p>Big-top temptress, wicked little sinner,<br>I brought dead flowers and a corpse home for dinner.<br>Juggle them jugs—<strong>JUGGALO JUGULAR JIVE</strong>,<br>Three freaks died laughing and the fourth came alive.</p><p>Creepin’ through the carnival, horny and possessed,<br>Tombstone cologne and my Sunday clown best.<br>Wanna crawl in them big-top folds, hide from the sun,<br>Pitch my little tent—<strong>OH SHIT, WRONG ONE.</strong></p><p>Hatchet in the moonlight, Faygo in the crypt,<br>Dead bitch winked, so I politely fucking dipped.<br>Grey, when the circus comes creeping into view,<br>Save a seat beneath the big top—I’m coming for you.</p><p>— Joe</p></div>`}
    ]
  };

  const escapeHtml = value => String(value || "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const labels = {inbox:"INBOX",spam:"SPAM",sent:"SENT",drafts:"DRAFTS",trash:"TRASH"};

  snail = document.createElement("aside");
  snail.className = "c17-snail-overlay c17-snail-v3 c17-snail-v5";
  snail.setAttribute("aria-hidden","true");
  snail.innerHTML = `
    <section class="c17-snail-app" role="dialog" aria-modal="true" aria-label="Tawnya Grey SNAIL account">
      <header class="c17-snail-head">
        <button class="c17-snail-exit" type="button" data-snail-action="exit" aria-label="Return to Tawnya dossier">‹</button>
        <button class="c17-snail-menu" type="button" data-snail-action="drawer" aria-label="Open mail folders">☰</button>
        <div class="c17-snail-brand"><img src="T.Snail.Emblem.PNG" alt=""><div><b>SNAIL</b><small>Life’s an S - Short not Serious…</small></div></div>
        <span class="c17-snail-account">Skatergirl89@snail.com</span>
      </header>
      <div class="c17-snail-stage">
        <div class="c17-snail-drawer-shade" data-snail-action="drawer-close"></div>
        <nav class="c17-snail-drawer" aria-label="SNAIL folders">
          <div class="c17-snail-drawer-account"><b>Skatergirl89</b><small>@snail.com</small></div>
          ${Object.keys(labels).map((key,i)=>`<button type="button"${i===0?' class="active"':''} data-snail-folder="${key}"><b>${labels[key]}</b><span>${folders[key].length}</span></button>`).join("")}
          <div class="c17-snail-drawer-foot">SNAIL // RECOVERED ACCOUNT<br>last sync: 06:17</div>
        </nav>
        <main class="c17-snail-screen">
          <section class="c17-snail-inbox-view" data-snail-inbox-view>
            <div class="c17-snail-mailbox-title"><div><small data-snail-folder-title>INBOX</small><b>Skatergirl89@snail.com</b></div><span data-snail-count></span></div>
            <label class="c17-snail-search"><span>⌕</span><input type="search" data-snail-search placeholder="Search this folder" autocomplete="off"></label>
            <div class="c17-snail-list" data-snail-list></div>
          </section>
          <article class="c17-snail-reader" data-snail-reader hidden>
            <header class="c17-snail-reader-head"><button type="button" data-snail-action="reader-back" aria-label="Back to mailbox">‹</button><div><small>MESSAGE</small><b data-snail-reader-subject></b></div></header>
            <div class="c17-snail-reader-meta" data-snail-reader-meta></div>
            <div class="c17-snail-reader-body" data-snail-reader-body></div>
          </article>
        </main>
      </div>
    </section>`;
  (tawnyaProfileOverlay || document.body).appendChild(snail);
  snail.addEventListener("error", event => { if (event.target && event.target.tagName === "IMG") event.target.hidden = true; }, true);

  const list=snail.querySelector("[data-snail-list]"), inboxView=snail.querySelector("[data-snail-inbox-view]"), reader=snail.querySelector("[data-snail-reader]"), readerSubject=snail.querySelector("[data-snail-reader-subject]"), readerMeta=snail.querySelector("[data-snail-reader-meta]"), readerBody=snail.querySelector("[data-snail-reader-body]"), folderTitle=snail.querySelector("[data-snail-folder-title]"), count=snail.querySelector("[data-snail-count]"), search=snail.querySelector("[data-snail-search]");
  let activeFolder="inbox", savedScroll=0;
  let disposeParcelImages = () => {};
  function clearReader(){disposeParcelImages();disposeParcelImages=()=>{};readerBody.replaceChildren();}
  function avatarMarkup(m,cls=""){return m.avatar?`<img class="${cls}" src="${escapeHtml(m.avatar)}" alt="">`:`<span class="c17-snail-avatar-fallback ${cls}" aria-hidden="true">${escapeHtml((m.sender||"?").slice(0,1))}</span>`;}
  function closeDrawer(){snail.classList.remove("drawer-open");}
  function visibleMessages(){const q=search.value.trim().toLowerCase(); const all=folders[activeFolder]||[]; return q?all.filter(m=>[m.sender,m.subject,m.preview,m.recipient].join(" ").toLowerCase().includes(q)):all;}
  function renderList(){const messages=visibleMessages(); count.textContent=`${messages.length} MESSAGE${messages.length===1?"":"S"}`; if(!messages.length){list.innerHTML=`<div class="c17-snail-empty"><span>NOTHING HERE</span><small>${search.value?'Try a less suspicious search.':'No recovered messages.'}</small></div>`;return;} list.innerHTML=messages.map(m=>`<button class="c17-snail-message${m.unread?' unread':''}" type="button" data-snail-message="${escapeHtml(m.id)}">${avatarMarkup(m)}<span class="c17-snail-message-copy"><b>${escapeHtml(activeFolder==='sent'?(m.displayName||m.recipient||m.sender):m.sender)}</b><strong>${escapeHtml(m.subject||'(no subject)')}</strong><small>${escapeHtml(m.preview||' ')}</small></span><time>${escapeHtml(m.date)}</time></button>`).join("");}
  function renderFolder(folder){clearReader();activeFolder=folder;closeDrawer();reader.hidden=true;inboxView.hidden=false;search.value="";folderTitle.textContent=labels[folder]||folder.toUpperCase();snail.querySelectorAll("[data-snail-folder]").forEach(b=>b.classList.toggle("active",b.dataset.snailFolder===folder));renderList();list.scrollTop=0;}
  function openMessage(id){const m=(folders[activeFolder]||[]).find(x=>x.id===id);if(!m)return;savedScroll=list.scrollTop;m.unread=false;readerSubject.textContent=m.subject||"(no subject)";if(m.subjectIcon){const icon=document.createElement("img");icon.src=m.subjectIcon;icon.alt="";icon.style.cssText="width:1.5em;height:1.2em;object-fit:contain;vertical-align:middle;margin-right:.4em";readerSubject.prepend(icon);}const sent=activeFolder==='sent'||activeFolder==='drafts';const readerName=sent?(m.displayName||m.recipient||m.sender):m.sender;const route=sent?`from Skatergirl89@snail.com · to ${m.recipient||readerName}`:`${m.address||m.sender} · to Skatergirl89@snail.com`;readerMeta.innerHTML=`${avatarMarkup(m,'reader-avatar')}<div><b>${escapeHtml(readerName)}</b><small>${escapeHtml(route)}</small></div><time>${escapeHtml(m.date)}</time>`;clearReader();readerBody.innerHTML=m.body||"<p class='c17-snail-artifact-note'>No message body recovered.</p>";inboxView.hidden=true;reader.hidden=false;reader.scrollTop=0;disposeParcelImages=observeParcelPossumImages(readerBody);renderList();}
  function closeReader(){clearReader();reader.hidden=true;inboxView.hidden=false;requestAnimationFrame(()=>{list.scrollTop=savedScroll;});}
  snail.addEventListener("click",event=>{const tracking=event.target.closest("[data-pp-track]");if(tracking){startParcelPossumTracking(tracking);return;}const action=event.target.closest("[data-snail-action]");if(action){const t=action.dataset.snailAction;if(t==='exit'){closeDrawer();closeReader();document.documentElement.classList.remove('c17-snail-open');snail.classList.remove('open');snail.setAttribute('aria-hidden','true');}else if(t==='drawer'){snail.classList.toggle('drawer-open');}else if(t==='drawer-close'){closeDrawer();}else if(t==='reader-back'){closeReader();}return;}const folder=event.target.closest("[data-snail-folder]");if(folder){renderFolder(folder.dataset.snailFolder);return;}const msg=event.target.closest("[data-snail-message]");if(msg)openMessage(msg.dataset.snailMessage);});
  search.addEventListener("input",renderList);
  renderFolder("inbox");
  return snail;
}

function openTawnyaSnail() {
  const snail = ensureTawnyaSnail();
  document.documentElement.classList.add("c17-snail-open");
  snail.classList.add("open");
  snail.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => snail.querySelector("[data-snail-list]")?.focus?.({preventScroll:true}));
}

function closeTawnyaProfile() {
  if (!tawnyaProfileOverlay) return;
  tawnyaProfileOverlay.classList.remove("open");
  tawnyaProfileOverlay.setAttribute("aria-hidden", "true");
  document.documentElement.classList.remove("tawnya-dossier-open", "c17-snail-open");
  document.body.classList.remove("tawnya-dossier-open");
  retireTawnyaHeart();
}

function revealTawnyaFromGreyHeart(heart, direction = "from-left") {
  if (!heart || !heart.isConnected || tawnyaRevealNode) return;
  tawnyaRetired = false;

  const rect = heart.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const tawnya = document.createElement("button");
  tawnya.type = "button";
  tawnya.className = `c17-tawnya-reveal ${direction}`;
  tawnya.setAttribute("aria-label", "open Tawnya Grey profile");
  tawnya.style.setProperty("left", `${centerX}px`, "important");
  tawnya.style.setProperty("top", `${centerY}px`, "important");
  tawnya.style.setProperty("width", `${rect.width}px`, "important");
  tawnya.style.setProperty("height", `${rect.height}px`, "important");
  for (const key of ["min-width", "max-width"]) tawnya.style.setProperty(key, `${rect.width}px`, "important");
  for (const key of ["min-height", "max-height"]) tawnya.style.setProperty(key, `${rect.height}px`, "important");
  tawnya.style.setProperty("transform", "translate(-50%, -50%)", "important");
  tawnya.style.setProperty("z-index", "2147483645", "important");
  tawnya.style.setProperty("display", "grid", "important");
  tawnya.style.setProperty("opacity", "1", "important");
  tawnya.style.setProperty("visibility", "visible", "important");
  tawnya.style.setProperty("--c17-object-freeze-ms", `${TAWNYA_TRANSFORM_MS}ms`);

  const image = document.createElement("img");
  // Load the frozen Tawnya art through the edge-cleaner so any square
  // backing plate never appears around the heart on iPhone.
  image.alt = "Tawnya Grey";
  image.decoding = "sync";
  image.style.setProperty("display", "block", "important");
  image.style.setProperty("opacity", "1", "important");
  image.style.setProperty("visibility", "visible", "important");
  tawnya.appendChild(image);
  loadFrozenAssetClean(image, TAWNYA_ASSET);

  tawnya.disabled = true;
  tawnyaRevealNode = tawnya;

  heart.classList.add("c17-heart-becoming-tawnya", direction);
  document.body.appendChild(tawnya);
  tawnya.style.setProperty("pointer-events", "none", "important");
  tawnya.style.setProperty("mix-blend-mode", "normal", "important");

  /*
    The stopped gray heart rewrites in place into the existing frozen Tawnya
    PNG only when the frost front reaches it. Both objects remain aligned while
    the heart fractures away and the profile resolves underneath it.
  */
  const creep = document.createElement("span");
  creep.className = "c17-tawnya-creep";
  creep.setAttribute("aria-hidden", "true");
  tawnya.appendChild(creep);

  /*
    Tawnya is the exception: she grows from the exact center of the frozen
    gray heart. The reveal is deliberately uneven and invasive instead of a
    clean circular pop, so the blue profile appears to consume the heart.
  */
  image.animate(
    [
      {
        opacity: 0,
        transform: "scale(.08)",
        clipPath: "inset(50% 50% 50% 50%)",
        filter: "blur(7px) brightness(.68) saturate(.42)"
      },
      {
        opacity: .06,
        transform: "scale(.18)",
        clipPath: "inset(43% 43% 43% 43%)",
        filter: "blur(6px) brightness(.72) saturate(.48)",
        offset: .20
      },
      {
        opacity: .16,
        transform: "scale(.31)",
        clipPath: "inset(34% 34% 34% 34%)",
        filter: "blur(5px) brightness(.78) saturate(.56)",
        offset: .38
      },
      {
        opacity: .34,
        transform: "scale(.48)",
        clipPath: "inset(25% 25% 25% 25%)",
        filter: "blur(3.5px) brightness(.84) saturate(.66)",
        offset: .56
      },
      {
        opacity: .58,
        transform: "scale(.66)",
        clipPath: "inset(16% 16% 16% 16%)",
        filter: "blur(2px) brightness(.90) saturate(.76)",
        offset: .72
      },
      {
        opacity: .82,
        transform: "scale(.84)",
        clipPath: "inset(7% 7% 7% 7%)",
        filter: "blur(.8px) brightness(.96) saturate(.88)",
        offset: .88
      },
      {
        opacity: 1,
        transform: "scale(1)",
        clipPath: "inset(0% 0% 0% 0%)",
        filter: "none"
      }
    ],
    {
      duration: TAWNYA_TRANSFORM_MS,
      easing: "cubic-bezier(.22,.48,.18,1)",
      fill: "forwards"
    }
  );

  heart.animate(
    [
      { opacity: 1, filter: "none" },
      { opacity: 1, filter: "brightness(1.04)", offset: .36 },
      { opacity: .92, filter: "brightness(.98)", offset: .58 },
      { opacity: .66, filter: "blur(.8px) brightness(.88)", offset: .76 },
      { opacity: .30, filter: "blur(2px) brightness(.72)", offset: .91 },
      { opacity: 0, filter: "blur(4px) brightness(.58)" }
    ],
    {
      duration: TAWNYA_TRANSFORM_MS,
      easing: "cubic-bezier(.22,.48,.18,1)",
      fill: "forwards"
    }
  );

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      tawnya.classList.add("tawnya-rewriting");
    });
  });

  const timer = setTimeout(() => {
    if (heart.isConnected) {
      heart.style.setProperty("opacity", "0", "important");
      heart.style.setProperty("visibility", "hidden", "important");
    }
    tawnya.classList.add("tawnya-complete");
    tawnya.style.setProperty("pointer-events", "auto", "important");
    tawnya.disabled = false;
    image.style.setProperty("opacity", "1", "important");
    image.style.setProperty("visibility", "visible", "important");
    image.style.setProperty("clip-path", "none", "important");
    image.style.setProperty("transform", "none", "important");
  }, TAWNYA_TRANSFORM_MS + 120);

  frostSwapTimers.push(timer);

  const cancelTawnyaHold = () => {
    window.clearTimeout(tawnyaHoldTimer);
    tawnyaHoldTimer = null;
    tawnyaHoldPointerId = null;
    tawnya.classList.remove("tawnya-holding");
  };

  const completeTawnyaHold = () => {
    if (
      tawnyaRetired ||
      !tawnya.isConnected ||
      !tawnya.classList.contains("tawnya-complete")
    ) {
      cancelTawnyaHold();
      return;
    }

    tawnya.classList.remove("tawnya-holding");
    tawnya.classList.add("tawnya-thawed");
    tawnyaHoldTimer = null;
    tawnyaHoldPointerId = null;

    openTawnyaProfile();
    document.dispatchEvent(new CustomEvent("c17:tawnya-open"));
  };

  tawnya.addEventListener("pointerdown", event => {
    if (
      tawnyaRetired ||
      tawnya.disabled ||
      !tawnya.classList.contains("tawnya-complete")
    ) return;

    event.preventDefault();
    event.stopPropagation();

    cancelTawnyaHold();
    tawnyaHoldPointerId = event.pointerId;
    tawnya.classList.add("tawnya-holding");

    try {
      tawnya.setPointerCapture(event.pointerId);
    } catch (error) {
      /* Safari may decline capture; the hold still works. */
    }

    tawnyaHoldTimer = window.setTimeout(completeTawnyaHold, 2000);
  });

  ["pointerup", "pointercancel", "pointerleave", "lostpointercapture"].forEach(type => {
    tawnya.addEventListener(type, event => {
      if (
        tawnyaHoldPointerId !== null &&
        event.pointerId !== undefined &&
        event.pointerId !== tawnyaHoldPointerId
      ) return;

      if (tawnyaHoldTimer) cancelTawnyaHold();
    });
  });

  tawnya.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
  });
}

function stopAttack() {
  if (stopAttack.retreatStarted) return;
  const now = performance.now();
  if (!stopAttack.burnDeadline) stopAttack.burnDeadline = now + 7000;
  if (now < stopAttack.burnDeadline && !frostHolding && !frostLocked && profileField.querySelector(".c17-paper-bot")) {
    clearInterval(profileTimer);
    profileTimer = null;
    window.setTimeout(stopAttack, 100);
    return;
  }
  const rrodTimeRemaining =
    carlRrodActiveUntil - performance.now();

  if (rrodTimeRemaining > 0) {
    window.setTimeout(
      stopAttack,
      rrodTimeRemaining + 50
    );
    return;
  }

  clearInterval(profileTimer);
  clearInterval(engageTimer);
  clearInterval(slashTimer);

  profileTimer = null;
  engageTimer = null;
  slashTimer = null;

  stopAttack.retreatStarted = true;
  virusLayer.classList.add("retreat");

  window.setTimeout(() => {
    profileField.innerHTML = "";
    engagementField.innerHTML = "";
    motionField.innerHTML = "";
    impactField.innerHTML = "";

    checkGenerals.classList.remove("active");

    virusLayer.classList.remove(
      "active",
      "retreat"
    );

    signalGhost.classList.add(
      "waking",
      "burning",
      "symbol-hold-to-end"
    );
  }, 1250);
}
function completeSequence() {
  state = "done";
  signalNode.classList.remove("ready");
  signalNode.dataset.finaleComplete = "false";
  loader.classList.remove("offcourse");
  loader.classList.add("complete");
  setProgress(100);
  stopHomieFx();

  if (homieWalkTimer) {
    clearInterval(homieWalkTimer);
    homieWalkTimer = null;
  }

  setTimeout(() => stopAttack(), 450);
  setTimeout(() => loaderScene.classList.add("homie-stage-naked"), 1100);

  // LITTLE HOMIE FINALE: one registered 815x390 canvas, one ground plane.
  // Capture the original shell BEFORE any pose/class changes. Moving into the
  // scene removes the track's coordinate offset without moving visible pixels.
  const scene = loaderScene.getBoundingClientRect();
  const original = turtle.getBoundingClientRect();
  const scale = Math.min(original.width / 815, original.height / 390);
  const canvasInsetX = (original.width - 815 * scale) / 2;
  const canvasInsetY = (original.height - 390 * scale) / 2;
  let left = original.left - scene.left;
  const top = original.top - scene.top;
  const doorX = Math.round(scene.width * 0.765);
  const groundY = top + canvasInsetY + 226 * scale;
  // Both authored walk frames have their leftmost visible tail at x=352.
  const tailInset = canvasInsetX + 352 * scale;
  const doorHeight = 32;
  let ended = false;
  let feetTimer = null;
  const set = (node, values) => {
    for (const [key, value] of Object.entries(values))
      node.style.setProperty(key, String(value), 'important');
  };
  turtle.classList.remove('hide','notice','walk','escape','homie-sprint',
    'through-door','door-excited','door-ready','full-head','lh-shredding');
  loaderScene.appendChild(turtle);
  set(turtle, {
    position:'absolute', left:`${left}px`, top:`${top}px`, right:'auto',
    bottom:'auto', width:`${original.width}px`, height:`${original.height}px`,
    margin:'0', transform:'none', animation:'none', transition:'none',
    'clip-path':'none', overflow:'visible', opacity:'1', visibility:'visible',
    'z-index':'160'
  });
  // Pose art is already registered: never re-center its transparent box.
  const pose = name => setHomieFrame(name);
  const finish = () => {
    if (ended) return;
    ended = true;
    clearInterval(feetTimer);
    stopHomieFx();
    set(turtle, {opacity:'0', visibility:'hidden'});
    const born = performance.now();
    const closeDoor = now => {
      const p = Math.min(1, (now - born) / 360);
      const height = doorHeight * (1 - p);
      // Bottom rises to the top of the cut: seal northward.
      set(homieDoor, {height:`${height}px`});
      if (p < 1) return requestAnimationFrame(closeDoor);
      set(homieDoor, {opacity:'0',visibility:'hidden'});
      loaderScene.classList.add('finale-clear');
      signalNode.dataset.finaleComplete = 'true';
      // Let the emptied scene breathe before offering Reconnect.
      setTimeout(() => signalNode.classList.add('ready'), 2200);
    };
    requestAnimationFrame(closeDoor);
  };
  const openDoor = () => {
    set(homieDoor, {position:'absolute',left:`${doorX}px`,
      top:`${groundY-doorHeight}px`,bottom:'auto',width:'2px',height:'0px',
      opacity:'1',visibility:'visible',animation:'none',transition:'none',
      transform:'none',background:'#f4f4ef',
      'box-shadow':'0 0 3px rgba(244,244,239,.95), 0 0 9px rgba(244,244,239,.40)'});
    const born = performance.now();
    const cut = now => {
      const p = Math.min(1, (now-born)/620);
      const height = doorHeight * p;
      set(homieDoor, {top:`${groundY-height}px`,height:`${height}px`});
      if (p < 1) requestAnimationFrame(cut);
    };
    requestAnimationFrame(cut);
  };
  const run = () => {
    pose('LH.Walk.A.png');
    let phase = 0;
    // Frantic feet; deliberately independent of slow forward progress.
    feetTimer = setInterval(() => {
      phase ^= 1;
      pose(phase ? 'LH.Walk.B.png' : 'LH.Walk.A.png');
    }, 65);
    startPanicStrips();
    // Speed-line art shares the registered canvas. Its rightmost pixel is
    // x=358; a small shift puts it just behind the tail at x=352.
    set(homieFx, {left:`${-14*scale}px`,right:'auto',top:'0px',
      transform:'none',width:'100%',height:'100%',animation:'none'});
    const born = performance.now();
    const startLeft = left;
    const crawl = now => {
      const elapsed = now - born;
      // Slow continuous travel with a subtle slink in pace, never in height.
      const distance = .020 * elapsed - .9 * Math.sin(2*Math.PI*elapsed/520);
      left = startLeft + distance;
      const eaten = Math.max(0, left + original.width - doorX);
      set(turtle, {left:`${left}px`,
        'clip-path':`inset(0 ${Math.min(original.width,eaten)}px 0 0)`});
      if (left + tailInset >= doorX) return finish();
      requestAnimationFrame(crawl);
    };
    requestAnimationFrame(crawl);
  };
  // Dust clears first. The full turtle must never precede the doorway.
  setTimeout(() => pose('LH.Peek.png'), 2200);
  setTimeout(openDoor, 3900);
  setTimeout(() => pose('LH.Shell.Head.png'), 4700);
  setTimeout(() => pose('LH.Walk.A.png'), 5250);
  setTimeout(run, 5550);
}
function openChannel() {
  if (!signalNode.classList.contains("ready") || signalNode.dataset.trusting === "true") return;
  signalNode.dataset.trusting = "true";
  closeFounderWindow();
  signalNode.style.pointerEvents = "none";
  const start = innerSymbol.getBoundingClientRect();
  // Keep the surviving artwork at exactly its pre-click viewport rectangle.
  const survivor = innerSymbol.cloneNode(false);
  survivor.removeAttribute("id");
  survivor.className = "c17-trust-traveler c17-station-survivor";
  Object.assign(survivor.style,{left:`${start.left}px`,top:`${start.top}px`,width:`${start.width}px`,height:`${start.height}px`});
  document.body.appendChild(survivor);
  // Glow expands from this image's surviving pixels, never a separate background.
  survivor.animate([
    {filter:"brightness(1.28) contrast(1.14) saturate(.92) sepia(.18) drop-shadow(0 0 0px rgba(223,255,63,0)) drop-shadow(0 0 0px rgba(223,255,63,0))", offset:0},
    {filter:"brightness(1.28) contrast(1.14) saturate(.92) sepia(.18) drop-shadow(0 0 0px rgba(223,255,63,0)) drop-shadow(0 0 0px rgba(223,255,63,0))", offset:.30},
    {filter:"brightness(1.28) contrast(1.14) saturate(.92) sepia(.18) drop-shadow(0 0 12px rgba(223,255,63,.32)) drop-shadow(0 0 30px rgba(223,255,63,.2))"}
  ],{duration:2400,easing:"ease-out",fill:"forwards"});
  const landed = home.querySelector(".home-inner");
  Object.assign(landed.style,{position:"fixed",left:`${start.left}px`,top:`${start.top}px`,width:`${start.width}px`,height:`${start.height}px`,margin:"0",transform:"none",animation:"none"});
  document.documentElement.classList.add("c17-trust-transition");
  signalNode.classList.add("c17-trusting");
  maze.classList.remove("active"); idleMaze.classList.remove("active");
  home.classList.add("open");
  const dissolve = outerSymbol.animate([{opacity:1},{opacity:0}],{delay:650,duration:1700,easing:"ease-in-out",fill:"forwards"});
  dissolve.finished.finally(()=>{
    signalNode.style.setProperty("display","none","important");
    signalGhost.style.setProperty("display","none","important");
    document.documentElement.classList.remove("c17-trust-transition");
    document.documentElement.classList.add("c17-trust-entered");
    // Keep this same body-level image: no handoff into a transformed ancestor.
    c17StartStationPulses();
  });
  c17PlaceRoach();
}

function c17PlaceRoach() {
  if(window.visualViewport && Math.abs(window.visualViewport.scale-1)>.01) return;
  const core=home.querySelector(".home-core"),last=home.querySelector(".nodes .node:last-child");
  const button=document.getElementById("goldenRoachButton");
  if(!core || !last || !button) return;
  const cr=core.getBoundingClientRect(),nr=last.getBoundingClientRect();
  core.style.setProperty("--c17-roach-x",`${nr.left+nr.width/2-cr.left}px`);
  core.style.setProperty("--c17-roach-y",`${nr.bottom-cr.top+52}px`);
  const img=button.querySelector("img");
  if(!img) return;
  function centerVisibleArt(){
    if(!img.naturalWidth || !img.naturalHeight) return;
    try {
      const canvas=document.createElement("canvas");
      // Small sampling surface is enough to find transparent asset padding.
      const ratio=Math.min(1,256/Math.max(img.naturalWidth,img.naturalHeight));
      canvas.width=Math.max(1,Math.round(img.naturalWidth*ratio));canvas.height=Math.max(1,Math.round(img.naturalHeight*ratio));
      const ctx=canvas.getContext("2d",{willReadFrequently:true});ctx.drawImage(img,0,0,canvas.width,canvas.height);
      const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;
      let left=canvas.width,right=-1,top=canvas.height,bottom=-1;
      for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++)if(pixels[(y*canvas.width+x)*4+3]>24){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
      if(right<left) return;
      const size=img.getBoundingClientRect();
      const fit=Math.min(size.width/canvas.width,size.height/canvas.height);
      const dx=(canvas.width/2-(left+right+1)/2)*fit;
      const dy=(canvas.height/2-(top+bottom+1)/2)*fit;
      img.style.transform=`translate(${dx}px,${dy}px)`;
      canvas.width=canvas.height=1;
    } catch (_) { img.style.transform="none"; }
  }
  if(img.complete)centerVisibleArt();else img.addEventListener("load",centerVisibleArt,{once:true});
}
window.addEventListener("resize",()=>{if(home.classList.contains("open")) c17PlaceRoach();},{passive:true});

// Sparse signals cross a larger world. Only rare green signals visit a node.
function c17PulseRoute(w,h,target,opening=false) {
  const rand=(lo,hi)=>lo+Math.random()*(hi-lo);
  const edge=Math.floor(Math.random()*4);
  let p;
  if(opening && target) {
    const sy=(document.querySelector(".c17-station-survivor")||home.querySelector(".home-inner")).getBoundingClientRect();
    const y=target.top+target.height/2;
    const startY=Math.min(y-45,sy.bottom+12);
    return [[w*.5,startY],[w*.84,startY],[w*.84,y],[target.right-18,y]];
  } else if(edge===0) p=[[-14,rand(.12,.85)*h]];
  else if(edge===1) p=[[w+14,rand(.12,.85)*h]];
  else if(edge===2) p=[[rand(.08,.92)*w,-14]];
  else p=[[rand(.08,.92)*w,h+14]];
  let last=p[p.length-1];
  let horizontal=opening ? false : edge<2;
  const turns=1+Math.floor(Math.random()*3);
  for(let i=0;i<turns;i++) {
    const next=horizontal?[rand(.06,.94)*w,last[1]]:[last[0],rand(.12,.88)*h];
    p.push(next);last=next;horizontal=!horizontal;
  }
  if(target) {
    const x=target.right-18,y=target.top+target.height/2;
    p.push([last[0],y],[x,y]);
  } else {
    // Depart through an edge; do not converge on a shared circuit.
    p.push(horizontal?[edge===1?-14:w+14,last[1]]:[last[0],edge===3?-14:h+14]);
  }
  return p;
}
function c17StartStationPulses() {
  if(home.dataset.pulsesStarted) return;
  home.dataset.pulsesStarted="true";
  const active=new Set();
  const nodes=[...home.querySelectorAll(".nodes .node")];
  let lastRoute="";
  function launch(kind="green",targetIndex=null,opening=false,after=null) {
    if(active.size>=2 || document.hidden) return false;
    const orange=kind==="orange",jinx=kind==="jinx";
    const target=!orange&&!jinx&&targetIndex!==null?nodes[targetIndex]:null;
    const w=document.documentElement.clientWidth,h=window.innerHeight;
    let points,signature;
    do {points=c17PulseRoute(w,h,target?target.getBoundingClientRect():null,opening);signature=JSON.stringify(points);} while(signature===lastRoute);
    lastRoute=signature;
    // Orange may expire on its way, instead of reaching its offscreen endpoint.
    const burnout=orange&&Math.random()<.65;
    if(burnout) points=points.slice(0,Math.max(2,Math.floor(points.length*.65)));
    const light=document.createElement("i");
    light.className="c17-station-pulse c17-pulse-carrier";
    light.setAttribute("aria-hidden","true");
    const core=document.createElement("span");
    core.className="c17-pulse-core"+(orange?" c17-core-ember":jinx?" c17-core-jinx":"");
    light.appendChild(core);document.body.appendChild(light);active.add(light);
    const lengths=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1]));
    const total=lengths.reduce((a,b)=>a+b,0);let sum=0;
    const frames=points.map((p,i)=>{if(i)sum+=lengths[i-1];return {transform:`translate(${p[0]}px,${p[1]}px)`,offset:total?sum/total:0};});
    // CSS pixels per second: leisurely signals, independent of route length.
    const speed=opening?34:25+Math.random()*10;
    const duration=total/speed*1000;
    let decayTimer;
    const motion=light.animate(frames,{duration,easing:"linear",fill:"forwards"});
    if(orange) decayTimer=setTimeout(()=>{
      core.classList.add("c17-core-burning-out");
    },Math.max(0,duration-1800));
    motion.finished.then(()=>{
      if(target){target.classList.add("c17-node-hit");setTimeout(()=>target.classList.remove("c17-node-hit"),1000);}
      return light.animate([{opacity:1},{opacity:0}],{duration:orange?100:350,fill:"forwards"}).finished;
    }).catch(()=>{}).finally(()=>{clearTimeout(decayTimer);light.remove();active.delete(light);if(after)after();});
    return true;
  }
  // First arrival reads as a new upload; the next two signals simply leave.
  setTimeout(()=>launch("green",0,true,()=>{
    setTimeout(()=>launch("green",null,false,()=>{
      setTimeout(()=>launch("green"),5000);
    }),4000);
  }),1000);
  function next(){setTimeout(()=>{
    const orange=Math.random()<.16;
    launch(orange?"orange":"green",!orange&&Math.random()<.08?Math.floor(Math.random()*nodes.length):null);
    next();
  },18000+Math.random()*20000);}
  setTimeout(next,70000);
  // Reserve no third slot: wait for room if the minute signal meets two travelers.
  function jinxSignal(){
    if(document.hidden){setTimeout(jinxSignal,3000);return;}
    if(!launch("jinx")){setTimeout(jinxSignal,1000);return;}
    setTimeout(jinxSignal,60000);
  }
  setTimeout(jinxSignal,60000);
}

signalNode.addEventListener("click", openChannel);

signalNode.addEventListener("touchend", event => {
  if (event.touches.length || (window.visualViewport && window.visualViewport.scale > 1.01)) return;
  event.preventDefault();
  openChannel();
}, {
  passive: false
});


function c17UpdateLoaderPercentPass43() {
  const percent = document.getElementById("percent");
  const fill = document.getElementById("fill");
  if (!percent) return;

  let value = 0;

  if (fill) {
    const inlineWidth = fill.style.width || "";
    const parsed = parseFloat(String(inlineWidth).replace("%", ""));
    if (Number.isFinite(parsed)) value = parsed;
  }

  // Fallback: if inline style hasn't updated yet, try computed width.
  if ((!value || value < 0.5) && fill && fill.parentElement) {
    const fw = fill.getBoundingClientRect().width;
    const pw = fill.parentElement.getBoundingClientRect().width;
    if (pw > 0) value = (fw / pw) * 100;
  }

  value = Math.max(0, Math.min(100, Math.round(value)));
  if (!loaderScene?.classList.contains("homie-awake")) return;
  percent.textContent = Math.max(1, value) + "%";
}

setInterval(c17UpdateLoaderPercentPass43, 50);
window.addEventListener("load", c17UpdateLoaderPercentPass43);

/* heart57: red return fades grey, pop triggers carl flicker - timing patch marker */


/* =========================================================
   EMPLOYMENT APPLICATION — isolated inside Carl's pink profile
========================================================= */
const openEmploymentApplication = document.getElementById("openEmploymentApplication");
const employmentApplication = document.getElementById("employmentApplication");
const employmentClose = document.getElementById("employmentClose");
const employmentForm = document.getElementById("employmentForm");
const employmentQuestions = document.getElementById("employmentQuestions");
const resumeUpload = document.getElementById("resumeUpload");
const resumeError = document.getElementById("resumeError");
const applicationConfirmation = document.getElementById("applicationConfirmation");
const rejectionEmail = document.getElementById("rejectionEmail");
const rejectionClose = document.getElementById("rejectionClose");
const laughingCarl = document.getElementById("laughingCarl");
const reviewProgress = document.getElementById("reviewProgress");
const matchBoard = document.getElementById("matchBoard");
const matchLines = document.getElementById("matchLines");
const matchSubmit = document.getElementById("matchSubmit");
const matchResult = document.getElementById("matchResult");
let employmentReviewTimer = null;
let selectedMatchNode = null;
let employmentMatches = [];

const employmentQuestionData = [
  ["A coworker makes a mistake that nobody else has noticed. What do you do?", [["Help them correct it.", "Empathy detected."], ["Report it immediately.", "Personal ambition detected."], ["Ignore it.", "Lack of procedural enthusiasm detected."], ["Make a larger mistake nearby.", "Independent problem solving detected."]]],
  ["Which statement best describes your working style?", [["I work well with others.", "Dependency detected."], ["I work best alone.", "Individual identity detected."], ["I adapt to change.", "Unapproved flexibility detected."], ["I remain consistent.", "Resistance to optimization detected."]]],
  ["A child waves at you in a grocery store. What happens next?", [["I wave back.", "Emotional reciprocity detected."], ["I ignore the child.", "Personal boundary detected."], ["I smile politely.", "Facial autonomy detected."], ["I locate the nearest supervisor.", "Initiative detected."]]],
  ["Your supervisor gives you instructions that contradict yesterday's instructions.", [["Ask which instruction is current.", "Clarification requested without authorization."], ["Follow today's instruction.", "Recency bias detected."], ["Follow yesterday's instruction.", "Attachment to historical truth detected."], ["Do both.", "Unauthorized redundancy detected."]]],
  ["A customer says, ‘This doesn't make sense.’", [["Explain it clearly.", "Transparency detected."], ["Apologize.", "Accountability detected."], ["Repeat the policy more slowly.", "Personal interpretation of volume detected."], ["Agree with them.", "Reality alignment detected."]]],
  ["You accidentally make someone genuinely happy.", [["Celebrate the moment.", "Positive emotion detected."], ["Document the incident.", "Memory formation detected."], ["Correct the misunderstanding.", "Personal responsibility detected."], ["Pretend it did not happen.", "Awareness of event detected."]]],
  ["A meeting could have been an email. What do you do?", [["Attend the meeting.", "Passive resentment detected."], ["Send the email.", "Efficiency without permission detected."], ["Mention it afterward.", "Opinion detected."], ["Schedule a second meeting.", "Leadership behavior detected."]]],
  ["How many personal opinions do you bring to work?", [["Several.", "Excess personality detected."], ["A few.", "Concealed personality detected."], ["None.", "Implausible self-report detected."], ["Only approved opinions.", "Awareness of approval structure detected."]]],
  ["A coworker says, ‘We're all human.’", [["Agree.", "Human solidarity detected."], ["Disagree.", "Independent conclusion detected."], ["Change the subject.", "Social instinct detected."], ["Ask them to define human.", "Curiosity detected."]]],
  ["You are asked to choose between speed and accuracy.", [["Speed.", "Carelessness detected."], ["Accuracy.", "Perfectionism detected."], ["Balance both.", "Nuance detected."], ["Wait for direction.", "Awareness of uncertainty detected."]]],
  ["Someone takes credit for your work.", [["Correct the record.", "Attachment to identity detected."], ["Let it go.", "Private emotional processing detected."], ["Congratulate them.", "Sarcasm risk detected."], ["Take credit for their work later.", "Long-term planning detected."]]],
  ["You notice a rule is causing harm.", [["Break the rule.", "Moral autonomy detected."], ["Follow the rule.", "Awareness of harm detected."], ["Request an exception.", "Case-by-case thinking detected."], ["Rewrite the rule.", "Authorship detected."]]],
  ["What motivates you?", [["Helping people.", "Empathy detected."], ["Career growth.", "Ambition detected."], ["Financial stability.", "Personal survival instinct detected."], ["Nothing.", "Self-awareness detected."]]],
  ["You receive praise you did not earn.", [["Correct them.", "Integrity detected."], ["Accept it.", "Self-interest detected."], ["Share the credit.", "Community orientation detected."], ["Ask what the praise is for.", "Information seeking detected."]]],
  ["A form asks a question you do not understand.", [["Ask for help.", "Dependency detected."], ["Guess.", "Improvisation detected."], ["Leave it blank.", "Refusal detected."], ["Research it.", "Independent investigation detected."]]],
  ["You are told your answer is wrong, but no correct answer exists.", [["Accept the result.", "Recognition of unfairness detected."], ["Challenge the result.", "Resistance detected."], ["Try again.", "Hope detected."], ["Stop participating.", "Boundary detected."]]]
];

function buildEmploymentQuestions() {
  if (!employmentQuestions || employmentQuestions.children.length) return;
  employmentQuestionData.forEach((question, index) => {
    const block = document.createElement("section");
    block.className = "employment-question";
    block.innerHTML = `<p class="question-number">QUESTION ${index + 1}</p><h3>${question[0]}</h3><div class="answer-grid"></div><div class="answer-analysis" aria-live="polite">Awaiting response.</div>`;
    const grid = block.querySelector(".answer-grid");
    const analysis = block.querySelector(".answer-analysis");
    question[1].forEach(([label, result]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", () => {
        grid.querySelectorAll("button").forEach(item => item.classList.remove("selected"));
        button.classList.add("selected");
        analysis.classList.remove("revealed");
        analysis.textContent = "Analyzing...";
        window.setTimeout(() => {
          analysis.textContent = `✖ ${result}`;
          analysis.classList.add("revealed");
        }, 420);
      });
      grid.appendChild(button);
    });
    employmentQuestions.appendChild(block);
  });
}

function openEmployment() {
  if (!employmentApplication) return;
  buildEmploymentQuestions();
  employmentApplication.classList.add("open");
  employmentApplication.setAttribute("aria-hidden", "false");
  document.body.classList.add("employment-open");
}

function closeEmployment() {
  if (!employmentApplication) return;
  employmentApplication.classList.remove("open");
  employmentApplication.setAttribute("aria-hidden", "true");
  document.body.classList.remove("employment-open");
}

function drawEmploymentMatches() {
  if (!matchBoard || !matchLines) return;
  const boardRect = matchBoard.getBoundingClientRect();
  matchLines.setAttribute("viewBox", `0 0 ${boardRect.width} ${boardRect.height}`);
  matchLines.innerHTML = "";
  employmentMatches.forEach(pair => {
    const a = matchBoard.querySelector(`.match-node[data-side="left"][data-key="${pair.left}"]`);
    const b = matchBoard.querySelector(`.match-node[data-side="right"][data-key="${pair.right}"]`);
    if (!a || !b) return;
    const ar = a.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const x1 = ar.right - boardRect.left;
    const y1 = ar.top + ar.height / 2 - boardRect.top;
    const x2 = br.left - boardRect.left;
    const y2 = br.top + br.height / 2 - boardRect.top;
    const bend = Math.max(28, (x2 - x1) * .48);
    line.setAttribute("d", `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`);
    matchLines.appendChild(line);
  });
}

if (openEmploymentApplication) openEmploymentApplication.addEventListener("click", openEmployment);
if (employmentClose) employmentClose.addEventListener("click", closeEmployment);
if (resumeUpload) resumeUpload.addEventListener("click", () => resumeError.classList.toggle("open"));

if (matchBoard) {
  matchBoard.querySelectorAll(".match-node").forEach(node => {
    node.addEventListener("click", () => {
      if (!selectedMatchNode) {
        selectedMatchNode = node;
        node.classList.add("armed");
        return;
      }
      if (selectedMatchNode.dataset.side === node.dataset.side) {
        selectedMatchNode.classList.remove("armed");
        selectedMatchNode = node;
        node.classList.add("armed");
        return;
      }
      const left = selectedMatchNode.dataset.side === "left" ? selectedMatchNode : node;
      const right = selectedMatchNode.dataset.side === "right" ? selectedMatchNode : node;
      employmentMatches = employmentMatches.filter(pair => pair.left !== left.dataset.key && pair.right !== right.dataset.key);
      employmentMatches.push({ left: left.dataset.key, right: right.dataset.key });
      matchBoard.querySelectorAll(".match-node").forEach(item => item.classList.remove("armed"));
      left.classList.add("matched");
      right.classList.add("matched");
      selectedMatchNode = null;
      drawEmploymentMatches();
    });
  });
}

if (matchSubmit) matchSubmit.addEventListener("click", () => {
  if (!employmentMatches.length) {
    matchResult.textContent = "✖ Refusal to create unsupported connections detected.";
  } else {
    matchResult.innerHTML = "<strong>✖ INDEPENDENT THOUGHT DETECTED.</strong><p>There were no correct answers. The purpose of this exercise was to determine whether you would attempt to create connections without approved direction.</p><p>You did.</p>";
  }
  matchResult.classList.add("open");
});

window.addEventListener("resize", drawEmploymentMatches);

if (employmentForm) employmentForm.addEventListener("submit", event => {
  event.preventDefault();
  employmentForm.classList.add("submitted");
  applicationConfirmation.classList.add("open");
  applicationConfirmation.setAttribute("aria-hidden", "false");
  if (reviewProgress) {
    reviewProgress.style.width = "0%";
    requestAnimationFrame(() => { reviewProgress.style.width = "100%"; });
  }
  clearTimeout(employmentReviewTimer);
  employmentReviewTimer = window.setTimeout(() => {
    applicationConfirmation.classList.remove("open");
    rejectionEmail.classList.add("open");
    rejectionEmail.setAttribute("aria-hidden", "false");
    rejectionEmail.scrollTop = 0;
  }, 5200);
});

if (rejectionClose) rejectionClose.addEventListener("click", () => {
  rejectionEmail.classList.remove("open");
  rejectionEmail.setAttribute("aria-hidden", "true");
  laughingCarl.classList.add("open");
  laughingCarl.setAttribute("aria-hidden", "false");
});


/* GOLDEN ROACH — trophy and manually maintained etched winners' wall. */
(() => {
  const button = document.getElementById("goldenRoachButton");
  const overlay = document.getElementById("goldenRoachOverlay");
  const close = document.getElementById("goldenRoachClose");
  if (!button || !overlay) return;
  const stage = overlay.querySelector('.golden-roach-stage');
  const trophy = overlay.querySelector('.golden-roach-trophy');
  const holder = document.getElementById('goldenRoachHolder');
  if (!stage || !trophy || !holder) return;
  // Newest winning appearance first. null means unconfirmed, never zero wins.
  // Update this list by hand after the show; no dates, scores or review archive.
  const winners = [
    {strain:'Blue Dream', brand:'Fog Cutter', company:'Baked Beans Farm', wins:1},
    {strain:'Coughy Cake', brand:'MAC', company:'Mass Alternative Care', wins:3},
    {strain:'GMO Pie', brand:'Realm', company:'Garden Remedies Cannabis', wins:1},
    {strain:'Cujo’s Revenge', brand:'Fog Cutter', company:'Baked Beans Farm', wins:1},
    {strain:'The Magic Cone', brand:'???', company:'(The Trophy’s Inspiration)', wins:null}
  ];
  const currentHolder = winners[0];
  const art = document.createElement('div');
  art.className = 'golden-roach-object';
  stage.appendChild(art);
  art.append(trophy, holder);
  holder.textContent = `${currentHolder.brand} - ${currentHolder.strain}`;
  holder.hidden = false;
  holder.removeAttribute('aria-hidden');
  const menu = document.createElement('button');
  menu.type = 'button';
  menu.className = 'golden-roach-history-button';
  menu.setAttribute('aria-label', 'Open Golden Roach winners’ wall');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-controls', 'goldenRoachHistory');
  menu.innerHTML = '<span aria-hidden="true"><i></i><i></i><i></i></span>';
  art.appendChild(menu);
  const history = document.createElement('section');
  history.id = 'goldenRoachHistory';
  history.className = 'golden-roach-history';
  history.hidden = true;
  history.setAttribute('aria-label', 'Golden Roach winners’ wall');
  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'golden-roach-history-back';
  back.setAttribute('aria-label','Back to Golden Roach trophy');
  back.textContent = '‹';
  const list = document.createElement('ol');
  list.className = 'golden-roach-winners';
  list.setAttribute('aria-label', 'Latest winner first');
  function tallyMarkup(count) {
    if (!Number.isInteger(count) || count < 1) return '';
    let result = '';
    for (let remaining = count; remaining > 0; remaining -= 5) {
      const marks = Math.min(remaining,5);
      result += '<svg viewBox="0 0 58 52" aria-hidden="true" class="golden-tally"><g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round">';
      for(let n=0;n<Math.min(marks,4);n++) result += `<path d="M${9+n*12} 7 L${7+n*12} 44"/>`;
      if (marks === 5) result += '<path d="M2 38 L53 14"/>';
      result += '</g></svg>';
    }
    return result;
  }
  winners.forEach(winner => {
    const row = document.createElement('li');
    row.className = 'golden-roach-winner';
    const text = document.createElement('div');
    text.className = 'golden-winner-text';
    const name = document.createElement('span');
    name.className = 'golden-engraved-name';
    name.textContent = `${winner.strain} | ${winner.brand}`;
    const company = document.createElement('small');
    company.className = 'golden-engraved-company';
    company.textContent = winner.company;
    text.append(name,company);
    row.appendChild(text);
    if (Number.isInteger(winner.wins) && winner.wins > 0) {
      const tally = document.createElement('span');
      tally.className = 'golden-engraved-tallies';
      tally.setAttribute('role', 'img');
      tally.setAttribute('aria-label', `${winner.wins} Golden Roach wins`);
      tally.innerHTML = tallyMarkup(winner.wins);
      row.appendChild(tally);
    }
    list.appendChild(row);
  });
  history.append(back,list);
  stage.appendChild(history);
  function fitTrophy() {
    if (!trophy.naturalWidth || !trophy.naturalHeight || overlay.hidden) return;
    const bounds = stage.getBoundingClientRect();
    const scale = Math.min(bounds.width/trophy.naturalWidth,bounds.height/trophy.naturalHeight);
    const width = trophy.naturalWidth*scale;
    art.style.width = `${width}px`;
    art.style.height = `${trophy.naturalHeight*scale}px`;
    holder.style.fontSize = `${width*.032}px`;
  }
  function showTrophy(focusMenu = true) {
    history.hidden = true;
    art.hidden = false;
    menu.setAttribute('aria-expanded','false');
    stage.setAttribute('aria-label','Golden Roach trophy');
    fitTrophy();
    if(focusMenu) menu.focus({preventScroll:true});
  }
  function showHistory() {
    art.hidden = true;
    history.hidden = false;
    history.scrollTop = 0;
    menu.setAttribute('aria-expanded','true');
    stage.setAttribute('aria-label','Golden Roach winners’ wall');
    back.focus({preventScroll:true});
  }
  function openRoach() {
    overlay.hidden = false;
    overlay.setAttribute('aria-hidden','false');
    showTrophy(false);
    requestAnimationFrame(() => {overlay.classList.add('open');fitTrophy();});
    document.documentElement.classList.add('golden-roach-open');
    close?.focus({preventScroll:true});
  }
  function closeRoach() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.documentElement.classList.remove('golden-roach-open');
    button.focus({preventScroll:true});
    window.setTimeout(() => {if(!overlay.classList.contains('open')) overlay.hidden=true;},180);
  }
  menu.addEventListener('click',showHistory);
  back.addEventListener('click',() => showTrophy());
  button.addEventListener('click',openRoach);
  close?.addEventListener('click',closeRoach);
  trophy.addEventListener('load',fitTrophy);
  window.addEventListener('resize',fitTrophy,{passive:true});
  overlay.addEventListener('click',event=>{if(event.target===overlay)closeRoach();});
  document.addEventListener('keydown',event=>{
    if(!overlay.classList.contains('open'))return;
    if(event.key==='Escape') {event.preventDefault();if(!history.hidden)showTrophy();else closeRoach();}
    if(event.key==='Tab') {
      const controls = history.hidden ? [close,menu] : [close,back];
      const index=controls.indexOf(document.activeElement);
      event.preventDefault();controls[(index+(event.shiftKey?-1:1)+controls.length)%controls.length]?.focus();
    }
  });
})();
