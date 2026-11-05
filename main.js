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
  let wall=document.getElementById('c17DrawingWall');
  if(!wall) {
    wall=document.createElement('section');
    wall.id='c17DrawingWall';wall.className='c17-drawing-wall';wall.hidden=true;
    wall.setAttribute('role','dialog');wall.setAttribute('aria-modal','true');wall.setAttribute('aria-label','Remembering the survivors');
    wall.innerHTML=`<div class="c17-wall-controls"><button type="button" data-wall-action="close" aria-label="Return to the frequency">×</button><button type="button" data-wall-action="home" aria-label="Return to centerpiece">⌂</button><button type="button" data-wall-action="out" aria-label="Zoom out">−</button><button type="button" data-wall-action="in" aria-label="Zoom in">+</button></div><div class="c17-drawing-viewport" tabindex="0" aria-label="Drawing wall. Drag to explore, pinch to zoom, or use arrow keys and plus or minus."><div class="c17-drawing-world"><img class="c17-drawing-art c17-drawing-center" src="Wall.Centerpiece.PNG" alt="Remembering the survivors…" draggable="false"><img class="c17-drawing-art c17-drawing-dcsp" src="Wall.DCSP.PNG" alt="Square peg chalk drawing" draggable="false"><img class="c17-drawing-art c17-drawing-coke" src="Wall.Coke.PNG" alt="Boss bottle and paper chalk drawing" draggable="false"></div></div>`;
    document.body.appendChild(wall);
    const view=wall.querySelector('.c17-drawing-viewport'),world=wall.querySelector('.c17-drawing-world');
    let x=0,y=0,scale=1,restoreFocus=null;
    const pointers=new Map();let gesture=null;
    const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
    function paint(){
      x=clamp(x,view.clientWidth-3200*scale,0);y=clamp(y,view.clientHeight-2400*scale,0);
      world.style.transform=`translate(${x}px,${y}px) scale(${scale})`;
    }
    function reset(){
      const width=view.clientWidth||window.innerWidth,height=view.clientHeight||window.innerHeight;
      scale=Math.min(1,width/1050,height/650);
      x=width/2-1600*scale;y=height/2-1200*scale;paint();
    }
    function zoom(next,cx=view.clientWidth/2,cy=view.clientHeight/2){
      next=clamp(next,.18,4);const ratio=next/scale;
      x=cx-(cx-x)*ratio;y=cy-(cy-y)*ratio;scale=next;paint();
    }
    function close(){wall.hidden=true;pointers.clear();gesture=null;document.documentElement.classList.remove('c17-drawing-open');if(restoreFocus)restoreFocus.focus();}
    function beginGesture(){
      const p=[...pointers.values()];
      if(p.length===1)gesture={x,y,px:p[0].x,py:p[0].y};
      else if(p.length>=2){const cx=(p[0].x+p[1].x)/2,cy=(p[0].y+p[1].y)/2;gesture={scale,d:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y),wx:(cx-x)/scale,wy:(cy-y)/scale};}
      else gesture=null;
    }
    function point(e){const r=view.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};}
    view.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;view.setPointerCapture(e.pointerId);pointers.set(e.pointerId,point(e));beginGesture();});
    view.addEventListener('pointermove',e=>{
      if(!pointers.has(e.pointerId)||!gesture)return;pointers.set(e.pointerId,point(e));const p=[...pointers.values()];
      if(p.length===1){x=gesture.x+p[0].x-gesture.px;y=gesture.y+p[0].y-gesture.py;}
      else {const cx=(p[0].x+p[1].x)/2,cy=(p[0].y+p[1].y)/2;scale=clamp(gesture.scale*Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)/Math.max(1,gesture.d),.18,4);x=cx-gesture.wx*scale;y=cy-gesture.wy*scale;}paint();
    });
    for(const name of ['pointerup','pointercancel','lostpointercapture'])view.addEventListener(name,e=>{pointers.delete(e.pointerId);beginGesture();});
    view.addEventListener('wheel',e=>{e.preventDefault();const p=point(e);zoom(scale*Math.exp(-e.deltaY*.0015),p.x,p.y);},{passive:false});
    wall.addEventListener('click',e=>{const b=e.target.closest('[data-wall-action]');if(!b)return;const a=b.dataset.wallAction;if(a==='close')close();else if(a==='home')reset();else zoom(scale*(a==='in'?1.3:1/1.3));});
    wall.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}else if(e.key==='+'||e.key==='='){e.preventDefault();zoom(scale*1.2);}else if(e.key==='-'){e.preventDefault();zoom(scale/1.2);}else if(e.key.startsWith('Arrow')){e.preventDefault();x+=e.key==='ArrowLeft'?70:e.key==='ArrowRight'?-70:0;y+=e.key==='ArrowUp'?70:e.key==='ArrowDown'?-70:0;paint();}else if(e.key==='Tab'){const items=[...wall.querySelectorAll('button,[tabindex="0"]')];const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
    window.addEventListener('resize',()=>{if(!wall.hidden)reset();},{passive:true});
    wall.c17Show=()=>{restoreFocus=document.activeElement;wall.hidden=false;document.documentElement.classList.add('c17-drawing-open');requestAnimationFrame(()=>{if(!wall.hidden){reset();wall.querySelector('button').focus();}});};
  }
  wall.c17Show();
}
if (survivorChalk) survivorChalk.addEventListener("click", event => { event.preventDefault(); c17OpenDrawingWall(); });

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
                <div class="c17-friends-strip" aria-hidden="true">
                  <img src="T.Friends.List.PNG" alt="" loading="lazy" decoding="async">
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
          html: `<div class="c17-dossier-kicker">DIAGNOSTIC IMAGING ARCHIVE</div><h2>X-Rays</h2><div class="c17-photo-placeholder-grid"><div class="c17-media-placeholder c17-media-placeholder-medical"><span>×</span><b>LEFT WRIST</b><small>X-RAY PLACEHOLDER</small></div><div class="c17-media-placeholder c17-media-placeholder-medical"><span>×</span><b>RIGHT ANKLE</b><small>X-RAY PLACEHOLDER</small></div><div class="c17-media-placeholder c17-media-placeholder-medical"><span>×</span><b>RIB SERIES</b><small>IMAGE PLACEHOLDER</small></div></div>`
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

  const renderDossier = () => {
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

  return tawnyaProfileOverlay;
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
  return `<svg viewBox="0 -260 1136 1640" role="img" aria-label="POTH self-doodle smoking a pre-roll, red smoke curling upward" class="poth-self-doodle"><defs><clipPath id="pothHeadCrop"><rect x="0" y="0" width="1136" height="890"/></clipPath><filter id="pothDeepInk"><feFlood flood-color="#a52e36"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs><image width="1136" height="1380" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABHcAAAVgCAYAAADFC7GMAABcZmNhQlgAAFxmanVtYgAAAB5qdW1kYzJwYQARABCAAACqADibcQNjMnBhAAAAXEBqdW1iAAAAR2p1bWRjMm1hABEAEIAAAKoAOJtxA3VybjpjMnBhOmVmNWFkOTBlLTc4YzctNGVmZS04ZjMwLTU1ZTA1ZjdkYjE5ZAAAAAx8anVtYgAAAClqdW1kYzJhcwARABCAAACqADibcQNjMnBhLmFzc2VydGlvbnMAAAAJ0Wp1bWIAAAA7anVtZEDLDDK7ikidpwsq1vR/Q2kTYzJwYS5pY29uAAAAABhjMnNo1c1O00zV59Df9iRNHlhmsQAAABdiZmRiAGltYWdlL3N2Zyt4bWwAAAAJd2JpZGI8c3ZnIHdpZHRoPSI3MTYiIGhlaWdodD0iNzE2IiB2aWV3Qm94PSIwIDAgNzE2IDcxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUwOC43NDkgMzE3LjM5OUM1MTYuNzc3IDI4Ny4zMTQgNTA4Ljk5MSAyNTMuODg0IDQ4NS4zODkgMjMwLjI4MkM0NjEuNzg4IDIwNi42ODEgNDI4LjM2IDE5OC44OTUgMzk4LjI3MyAyMDYuOTIzQzM3Ni4yMzEgMTg0LjkyOCAzNDMuMzkgMTc0Ljk1NiAzMTEuMTQ4IDE4My41OTZDMjc4LjkwNiAxOTIuMjM0IDI1NS40NSAyMTcuMjkyIDI0Ny4zNiAyNDcuMzYxQzIxNy4yOTEgMjU1LjQ1MSAxOTIuMjMzIDI3OC45MSAxODMuNTk1IDMxMS4xNDlDMTc0Ljk1NyAzNDMuMzkxIDE4NC45MjcgMzc2LjIzMiAyMDYuOTI0IDM5OC4yNzRDMTk4Ljg5NiA0MjguMzU5IDIwNi42ODMgNDYxLjc4OSAyMzAuMjg0IDQ4NS4zOTFDMjUzLjg4NSA1MDguOTkyIDI4Ny4zMTMgNTE2Ljc3OSAzMTcuNDAxIDUwOC43NUMzMzkuNDQyIDUzMC43NDUgMzcyLjI4NiA1NDAuNzE3IDQwNC41MjUgNTMyLjA3OUM0MzYuNzY3IDUyMy40NDEgNDYwLjIyMyA0OTguMzg0IDQ2OC4zMTMgNDY4LjMxNUM0OTguMzgzIDQ2MC4yMjQgNTIzLjQ0IDQzNi43NjYgNTMyLjA3OCA0MDQuNTI2QzU0MC43MTYgMzcyLjI4NSA1MzAuNzQ3IDMzOS40NDMgNTA4Ljc0OSAzMTcuNDAyVjMxNy4zOTlaTTQ3MC44OTkgMjQ0Ljc3NkM0ODYuODkyIDI2MC43NyA0OTMuNDg4IDI4Mi42MDEgNDkwLjY4NyAzMDMuNDEyTDQxNS41NzcgMjYwLjA0NkM0MTIuNDExIDI1OC4yMTggNDA4LjUwOSAyNTguMjE4IDQwNS4zNDUgMjYwLjA0NkwzMTcuNDAxIDMxMC44MlYyNzcuNTI2QzMxNy40MDEgMjc1LjE5MSAzMTguNjUyIDI3My4wMDUgMzIwLjY3NiAyNzEuODM3TDM4Ny42NDQgMjMzLjE3NEM0MTQuMTc4IDIxOC4zNTMgNDQ4LjM0NiAyMjIuMjIzIDQ3MC45MDEgMjQ0Ljc3Nkg0NzAuODk5Wk0zNTcuODM3IDMxMS4xNDRMMzk4LjI3NSAzMzQuNDkxVjM4MS4xODVMMzU3LjgzNyA0MDQuNTMyTDMxNy4zOTggMzgxLjE4NVYzMzQuNDkxTDM1Ny44MzcgMzExLjE0NFpNMjY0Ljc3NiAyNjkuNjkzQzI2NS4yMDcgMjM5LjMwNSAyODUuNjQ0IDIxMS42NDkgMzE2LjQ1MyAyMDMuMzkzQzMzOC4zIDE5Ny41NCAzNjAuNTA1IDIwMi43NDQgMzc3LjEyNyAyMTUuNTczTDMwMi4wMTQgMjU4LjkzN0MyOTguODQ4IDI2MC43NjQgMjk2Ljg5OCAyNjQuMTQ0IDI5Ni44OTggMjY3Ljc5OFYzNjkuMzQ2TDI2OC4wNjUgMzUyLjY5OUMyNjYuMDQzIDM1MS41MzEgMjY0Ljc3NiAzNDkuMzUzIDI2NC43NzYgMzQ3LjAxN1YyNjkuNjkxVjI2OS42OTNaTTIwMy4zOTEgMzE2LjQ1NEMyMDkuMjQ0IDI5NC42MDggMjI0Ljg1NCAyNzcuOTc4IDI0NC4yNzYgMjY5Ljk5OVYzNTYuNzNDMjQ0LjI3NiAzNjAuMzg0IDI0Ni4yMjYgMzYzLjc2MyAyNDkuMzkyIDM2NS41OTFMMzM3LjMzNyA0MTYuMzY1TDMwOC41MDMgNDMzLjAxM0MzMDYuNDgxIDQzNC4xODEgMzAzLjk2MSA0MzQuMTg4IDMwMS45MzkgNDMzLjAyTDIzNC45NzEgMzk0LjM1N0MyMDguODY4IDM3OC43ODkgMTk1LjEzOCAzNDcuMjYxIDIwMy4zOTEgMzE2LjQ1NFpNMjQ0Ljc3NSA0NzAuOUMyMjguNzgxIDQ1NC45MDYgMjIyLjE4NiA0MzMuMDc1IDIyNC45ODYgNDEyLjI2NEwzMDAuMDk2IDQ1NS42M0MzMDMuMjYzIDQ1Ny40NTcgMzA3LjE2NCA0NTcuNDU3IDMxMC4zMjggNDU1LjYzTDM5OC4yNzMgNDA0Ljg1NlY0MzguMTQ5QzM5OC4yNzMgNDQwLjQ4NSAzOTcuMDIyIDQ0Mi42NzEgMzk0Ljk5NyA0NDMuODM5TDMyOC4wMjkgNDgyLjUwMkMzMDEuNDk1IDQ5Ny4zMjIgMjY3LjMyNyA0OTMuNDUyIDI0NC43NzIgNDcwLjlIMjQ0Ljc3NVpNNDUwLjg5NyA0NDUuOTgyQzQ1MC40NjYgNDc2LjM3MSA0MzAuMDI5IDUwNC4wMjcgMzk5LjIyIDUxMi4yODNDMzc3LjM3MyA1MTguMTM2IDM1NS4xNjggNTEyLjkzMiAzMzguNTQ3IDUwMC4xMDJMNDEzLjY1OSA0NTYuNzM4QzQxNi44MjYgNDU0LjkxMSA0MTguNzc1IDQ1MS41MzIgNDE4Ljc3NSA0NDcuODc3VjM0Ni4zMjlMNDQ3LjYwOSAzNjIuOTc3QzQ0OS42MzEgMzY0LjE0NSA0NTAuODk3IDM2Ni4zMjMgNDUwLjg5NyAzNjguNjU5VjQ0NS45ODVWNDQ1Ljk4MlpNNTEyLjI4MiAzOTkuMjIxQzUwNi40MjkgNDIxLjA2OCA0OTAuODE5IDQzNy42OTcgNDcxLjM5NyA0NDUuNjc2VjM1OC45NDZDNDcxLjM5NyAzNTUuMjkyIDQ2OS40NDggMzUxLjkxMiA0NjYuMjgxIDM1MC4wODVMMzc4LjMzNiAyOTkuMzExTDQwNy4xNyAyODIuNjYzQzQwOS4xOTIgMjgxLjQ5NSA0MTEuNzEyIDI4MS40ODcgNDEzLjczNCAyODIuNjU1TDQ4MC43MDIgMzIxLjMxOEM1MDYuODA1IDMzNi44ODcgNTIwLjUzNiAzNjguNDE1IDUxMi4yODIgMzk5LjIyMVoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgoAAAG3anVtYgAAAEFqdW1kY2JvcgARABCAAACqADibcRNjMnBhLmFjdGlvbnMudjIAAAAAGGMyc2ghh+c06wN1Wykub61T90ZuAAABbmNib3KiZ2FjdGlvbnODpGZhY3Rpb25sYzJwYS5jcmVhdGVkZHdoZW7AeB4yMDI2LTExLTAyVDIxOjAwOjU1LjgyNDYzNTU1OFptc29mdHdhcmVBZ2VudKJkbmFtZWdDaGF0R1BUZ3ZlcnNpb25pZ3B0LWltYWdlcWRpZ2l0YWxTb3VyY2VUeXBleEZodHRwOi8vY3YuaXB0Yy5vcmcvbmV3c2NvZGVzL2RpZ2l0YWxzb3VyY2V0eXBlL3RyYWluZWRBbGdvcml0aG1pY01lZGlhomZhY3Rpb25uYzJwYS5jb252ZXJ0ZWRkd2hlbsB4HjIwMjYtMTEtMDJUMjE6MDA6NTUuODI0NjM5NzM0WqJmYWN0aW9ueBhjMnBhLndhdGVybWFya2VkLnVuYm91bmRkd2hlbsB4HjIwMjYtMTEtMDJUMjE6MDA6NTUuODIxNDk3NTI2WnJhbGxBY3Rpb25zSW5jbHVkZWT0AAAAw2p1bWIAAABAanVtZGNib3IAEQAQgAAAqgA4m3ETYzJwYS5oYXNoLmRhdGEAAAAAGGMyc2g9AWU+0vQVxenYc4HYxdshAAAAe2Nib3KlamV4Y2x1c2lvbnOBomVzdGFydBghZmxlbmd0aBlccmRuYW1lbmp1bWJmIG1hbmlmZXN0Y2FsZ2ZzaGEyNTZkaGFzaFggoLnYAPH7sT12PBFIxJGs0YWzaBMKvZUL8PH+ecQaC39jcGFkSAAAAAAAAAAAAAACump1bWIAAAAnanVtZGMyY2wAEQAQgAAAqgA4m3EDYzJwYS5jbGFpbS52MgAAAAKLY2JvcqZqaW5zdGFuY2VJRHgseG1wOmlpZDo3YWE1ZDkwMy1iYjQxLTQyMmEtODRjMi04ZTEwNGEzMGM2ZTB0Y2xhaW1fZ2VuZXJhdG9yX2luZm+kZG5hbWV4GE9wZW5BSSBNZWRpYSBTZXJ2aWNlIEFQSWRpY29uomN1cmx4JHNlbGYjanVtYmY9YzJwYS5hc3NlcnRpb25zL2MycGEuaWNvbmRoYXNoWCASHgfdHqWCM3yA0yXBMEPXoqlrt8IhsjLXTTEIEydA1HdvcmcuY29udGVudGF1dGguYzJwYV9yc2YwLjc5LjJrc3BlY1ZlcnNpb25lMi4yLjBpc2lnbmF0dXJleE1zZWxmI2p1bWJmPS9jMnBhL3VybjpjMnBhOmVmNWFkOTBlLTc4YzctNGVmZS04ZjMwLTU1ZTA1ZjdkYjE5ZC9jMnBhLnNpZ25hdHVyZXJjcmVhdGVkX2Fzc2VydGlvbnODomN1cmx4JHNlbGYjanVtYmY9YzJwYS5hc3NlcnRpb25zL2MycGEuaWNvbmRoYXNoWCASHgfdHqWCM3yA0yXBMEPXoqlrt8IhsjLXTTEIEydA1KJjdXJseCpzZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLmFjdGlvbnMudjJkaGFzaFggNberLa+QhoMR65uilrbObWRW0PRjbF/xIMVKuJJ/1RiiY3VybHgpc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5oYXNoLmRhdGFkaGFzaFggtEr+9uftTdrUUjMBrR9WGIqyqkDgr9glg6Ih99YiQbhoZGM6dGl0bGVpaW1hZ2UucG5nY2FsZ2ZzaGEyNTYAAEy7anVtYgAAAChqdW1kYzJjcwARABCAAACqADibcQNjMnBhLnNpZ25hdHVyZQAAAEyLY2JvctKEWQvoogE4JBghglkFiDCCBYQwggNsoAMCAQICEAul/OkOcIzyBYAx7kQcZHMwDQYJKoZIhvcNAQELBQAwSjEhMB8GA1UEAwwYU1NMLmNvbSBDMlBBIElDQSBSMSAyMDI1MRgwFgYDVQQKDA9TU0wgQ29ycG9yYXRpb24xCzAJBgNVBAYTAlVTMB4XDTI2MDQyMjE1NTEwNVoXDTI3MDQyMzE1NTEwNFowRzELMAkGA1UEBhMCVVMxGTAXBgNVBAoMEE9wZW5BSSBPcENvLCBMTEMxHTAbBgNVBAMMFE9wZW5BSSBNZWRpYSBTZXJ2aWNlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnbpqFExNApfqgYm2FtG+XlhOEwNyoZnfaRRxfOUhI9OBH6I1nEyjEko8724rv+ZkrteES2kkWmPP6nYKkLJl23wBPI3h/sEFM3evJ947IDq0D2OHmBvNTZwav7R/MxFEqlQwN0a4B/2aeUQLc1dVowNjEXwdEt2sWC/meq7epZjDE5NOSPBa+OB8pJJL1Wy6ysIFKsiSvnXUlGe1Vw2qapptMDAs11VhjGrSU7YAeB1eRUOeTpKjA4Dxr1vRsuv+ixnvFrrXNwmVq2QtmcmHmvgcvy7Q52OAlhqaeaA3kzajNclIySyYYwXpRJs1Hqy5CKdTbB2caHPICh45zAZJ8wIDAQABo4IBZzCCAWMwDAYDVR0TAQH/BAIwADAfBgNVHSMEGDAWgBQ5PRBH3JePr4h7TXMYHc3l7qSlKjBvBggrBgEFBQcBAQRjMGEwOQYIKwYBBQUHMAKGLWh0dHA6Ly9jcnQtYzJwYS5zc2wuY29tL1NTTC5jb20tQzJQQS1JLVIxLmNlcjAkBggrBgEFBQcwAYYYaHR0cDovL29jc3AtYzJwYS5zc2wuY29tMBcGA1UdIAQQMA4wDAYKKwYBBAGD6F4BATApBgNVHSUEIjAgBggrBgEFBQcDBAYIKwYBBQUHAyQGCisGAQQBg+heAgEwHQYDVR0OBBYEFPOdEE3UDcudcvhGCnYYR6UbaE90MA4GA1UdDwEB/wQEAwIGwDAZBgkrBgEEAYPoXgMEDAYKKwYBBAGD6F4DCjAzBgkrBgEEAYPoXgQEJgwkMDE5YmM0MDMtNWNkNy03NjY5LWFmZTYtZmRiMTcxNzdkNDI4MA0GCSqGSIb3DQEBCwUAA4ICAQCCOJdsZR+hNwAb8fntGnS61aZbHjX1Z2wazytmaUDN9fzSclbfypUo6vhmGN5CQz34BXigaB4oGYmtte5//PUy0oy4X+dsgG7rW3yXWzDnEw8uQrgDxnCa/v4gCaw1RtWgCIxJRYDDupIfVccEWhWdb9Lr2Hmbljq8RBKQNAUVNH30QaUzly8ubFFSCm09SbAVy8eGWBEHzNzuni7pxgc5uDNcINoS7gBXM1QucChKJSlPknwu0voc3WcueuhQeDlRuoM62oh+kCOQkvViWJrlwqhzhp7F2HHp7xhcZHuR7g83L3aYeFZk529C0RB9kgG8hRZqb20ZZIXY/yKW7bnvstBcGgWEfWhdNVtLscVpSBZ5BuZojqDEYZg6TPjAJHnlpmjg7xn91pDWLi1BDGR1EFZfk5S2oZyKAho8tsDobfPFQ+d2LGgXpPLmy4uIlRboEXsVKnIkgRA9IcZjbS8lgKOZW6oppf1H6uH3a+UE+1tQJm0roYJdMfXdYqh8MgPcTMelLHIwUIBXkwaC4uius6cIf69ZNK4Qcu8qna54rOIz7FO1yZnSKKgqN6FOq/zMflibJ21F4bQqB5wEvQUwV6ExLiAuyeLIEFTboZIWT74kNZj+LwVp3Bu4TePeBy8a6Gz1wYri0/5yd9MTqCvUV5euDAsGh9gABAG+k7YSiVkGUzCCBk8wggQ3oAMCAQICFCcrY8jMHU0tm4RRcmz0nF4yUa7eMA0GCSqGSIb3DQEBCwUAME8xJjAkBgNVBAMMHVNTTC5jb20gQzJQQSBSU0EgUm9vdCBDQSAyMDI1MRgwFgYDVQQKDA9TU0wgQ29ycG9yYXRpb24xCzAJBgNVBAYTAlVTMB4XDTI1MTIyMjE4MTczMFoXDTMwMTIyMTE4MTczMFowSjEhMB8GA1UEAwwYU1NMLmNvbSBDMlBBIElDQSBSMSAyMDI1MRgwFgYDVQQKDA9TU0wgQ29ycG9yYXRpb24xCzAJBgNVBAYTAlVTMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAyzq0zbicyxYpVrh5px74a/b52I9yw6aYExqtAypB2mEeLkcIUr0edFG+XQTseoK2wPv6D+gnpYvo/mLzDGDxA19IGspzAX9zleQZTm7MTno13lgR4deCF9zSFkdDd5vfSBmIeZ+jOaRZTl7gTgtHl/J1Qtd2PbZ/pCLc7QfGbx/UckaM1lHHtbd68pP5IyfVgAISUHWKcKBo6ee8hCh8nCrqKanAL/7JdhEZRlWwL2PqfZ70FbBEpEDeQDZcRIpUa1dI/7sRb6TV6o7CHtd82LzOab+gHwBNk0U7mS550s8Bnp8pu0bZFHhjMJYzUZxek2365TRKWHizKWxdfLh1G5U8mXche9i0SuvazccICtYEyaLerpeztlGW2pKbw7K7UMT+tqRMA5VdLZJqT2Ll4Cr3aaAbnATVuZMA2tG7Xg4IDk8Ixguv+SlM0MkE7OvzsnFQe3YnaJH5UIi4dzXYzaHh19Mp50rGh1RZJMJnsm0HCTXbus4YuEal4AuL2uGnn2rOYBbSEBLE98HeGXN5VeBwtO/qzMf+dhyJTmYKaYgtEO3DRqIq5H+M1BKcV0YtWBhi1cqo+n74wtlhahbLNV2gk6OyZagv7e+Y5/x+ukj0qqFx/JOvf+qnThhziGnVQsD5hJKFTxDLVLM9OvjdKWURecpDnpa4h1iWIe/RkXsCAwEAAaOCASYwggEiMBIGA1UdEwEB/wQIMAYBAf8CAQAwDgYDVR0PAQH/BAQDAgEGMCkGA1UdJQQiMCAGCCsGAQUFBwMEBggrBgEFBQcDJAYKKwYBBAGD6F4CATAdBgNVHQ4EFgQUOT0QR9yXj6+Ie01zGB3N5e6kpSowFwYDVR0gBBAwDjAMBgorBgEEAYPoXgEBMB8GA1UdIwQYMBaAFPwqSnU6gPqZY5Pwc1fsvpOwfcN7MHgGCCsGAQUFBwEBBGwwajAkBggrBgEFBQcwAYYYaHR0cDovL29jc3AtYzJwYS5zc2wuY29tMEIGCCsGAQUFBzAChjZodHRwOi8vY3J0LWMycGEuc3NsLmNvbS9TU0wuY29tLUMyUEEtUm9vdC0yMDI1LVJTQS5jZXIwDQYJKoZIhvcNAQELBQADggIBAM42+j7vD5Y2LY6vEVVm/3t/AysNAGtW9cutHr0qga2lptBNoz4Uk+STEQxp1eSMqG7mN1QIFuIlnOxlZig8Mz2iGpqiu81nZErnvnQhBKFuw6smxDss2lW5/UdOBOCNeJs3g8R0O8VHYe9tQXKk211DU8mWTuUd4AQ636jdLtGvWJfW5/RfBHIjPGvPC705AasGjJOoj6cPdlk+4QSS9ffZ+0ZiBatubtSIRqCzLypqX6VO2vjU/MzZozypd0UbCsH5mLk5y8yhccAqghJx0+T2JeJRIW3WFd/kU41vSn0Xjl7AugzVDnd5IYF6zu33HB2bjrayikJWnY9rQSoO/muci+4aoyjPX/Pp0GQe1u7CiUsY65LP9a/CJwVNuJGhNyWZ5v2A3PS8xzd7vrQBLWdY8C/nw7OLceVEA3owtqWydT5bI34701SmOrnHzA4cMxXVajV6gXZ/L/5X2mn4DD4/71SPAYt7RsNjnvof7cR/L3CEK/ZWgvSnyyTXbF4kezq9qVg7GBFps5yP0nB0/4tuJrvDq0XHUwWWnEe1xkarXvX8iIsZaKM1D+V8apVltavruf+6uOCbSkeyzuwVL4kCfRXur5wMTcTJzgH1Mj2P9yY0C/4ii3rt+V5eZ19RFFvbJFb70Vmht94WmmYJttGGLvoHfX6VeZtEZnw2hfb1o2dzaWdUc3QyoWl0c3RUb2tlbnOBoWN2YWxZFIswghSHBgkqhkiG9w0BBwKgghR4MIIUdAIBATEPMA0GCWCGSAFlAwQCAQUAMIGHBgsqhkiG9w0BCRABBKB4BHYwdAIBAQYKKwYBBAGDvzABATAxMA0GCWCGSAFlAwQCAQUABCAOdBZUDFvLcIK5A08oMFIV7pUk8H2XRJ5qhedmrpkQQwIJAMzeF3++POBGGBYyMDI2MTEwMjIxMDA1NS44MzA2NzRaMAOAAQECCDBWIiJYjCMWoIIQZjCCBPYwggNeoAMCAQICFGHbRigyioyNSga3v/5g4wJsP3G3MA0GCSqGSIb3DQEBCwUAMHsxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEZMBcGA1UECgwQT3BlbkFJIE9wQ28sIExMQzEMMAoGA1UECwwDVFNBMR4wHAYDVQQDDBVPcGVuQUkgVFNBIElzc3VpbmcgQ0EwHhcNMjYwNDA4MTc0NjI2WhcNMzcwNzA5MTc0NjI2WjB1MQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xGTAXBgNVBAoMEE9wZW5BSSBPcENvLCBMTEMxDDAKBgNVBAsMA1RTQTEYMBYGA1UEAwwPT3BlbkFJIFRTQSBMZWFmMIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA6srFrZT98P0nn8d4p2EEyv8OKWEq+6GIzV+oopedDokvi5HIH7ywlpA9CBxVgsGWjjZqFa2JaeiQ2yxEMoOoCs135TXo7qhkW/644I6d5wIgoSjDNd2nEDfpIvcJTZeatIRzwC58qVBHKKC08Gkf8LCHKXpZ/g8UFDVC+dlpUhdKIDfyaMwP8S23gpYgG0sRDkYSXD2kFIa4S0VmOKJOTSfKlbp1DMxOh2qfdMMgFQUBJF8NxH5crv4d8x8Lle0Akd889YabKhJeDtYPHNDdyfoNyE3DyYRaGEks5DhzGmBSuEzuxvO3ttjdaqnOILpd1sRcNRBk8gMjEVM/Yo5lBRFdcCvUyWsJgUVS6BpX7VpGXdpddpwleRBog1GkmIR1kXKYVf/Y40Nise1pZydBvMWP8moHK4NJ6OEtGDQOuzkHr2e9tJUeyAKyvUVnzXIBiJRfVUsGLK2v7aX0JK93Az6DimRRj5GMDDmWS7A9rvoEmaE+GIw98L4XNqEu9WO1AgMBAAGjeDB2MAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgbAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMB0GA1UdDgQWBBSkJ1SCooqAez3Fhs0/cNnCg5lReDAfBgNVHSMEGDAWgBTyFPCwxxdUPSNDhdzKc9BygD24qDANBgkqhkiG9w0BAQsFAAOCAYEAIPskT0HAwLyYsjISIBCNIJlINRJPxEZWfqc+P7alI/kqSD7gUZ0fRUB4wbuDTpNQyZsnlmjfTc7y9hzSeavv6sEf2j/1mFkI5nDNifTuR4uqy+z/jH4U4UbYkeacuB7kNEb/YdJ4+H04OeNS7RtfZuhzwAByO+Soq46GGyqjNyH5O997XFTYTMdqKkt/z0N0YAWAc6PJ0Xevh6n9tbGEam6/iCrOmqGaq6KegkgHDDfFAmNRl9tSfG8eZ8lpCELVz/X7rRtei5Di4Ah5PC4bE4NqnqXoJUGPhRAB7eQYwaA6jf6dUlAa74fe4WTNVfkhIN+2Ke+fJ27RujRGq0oiT+diFXfdRSPdYS3CMSmPxLl+eQIGq7RX1MHszx0G4Vx7ZUmwGetNq6THJ0BOprS1j898w7RDp3bTXjBj7qgXrjUodGSrWjXjWy86Pk4KYdYwTUOb/04uxiG5PjosIBlXMHVqjmRLotAJ0RbXoGcmQW1n+ANwdrglJlb5kSYnw0tJMIIFfjCCA2agAwIBAgIUBI0EysbFC8XaGbC88U4RlaXqvBkwDQYJKoZIhvcNAQELBQAweDELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRkwFwYDVQQKDBBPcGVuQUkgT3BDbywgTExDMQwwCgYDVQQLDANUU0ExGzAZBgNVBAMMEk9wZW5BSSBUU0EgUm9vdCBDQTAgFw0yNjA0MDgxNzQ2MjZaGA8yMTI2MDQwOTE3NDYyNlowezELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRkwFwYDVQQKDBBPcGVuQUkgT3BDbywgTExDMQwwCgYDVQQLDANUU0ExHjAcBgNVBAMMFU9wZW5BSSBUU0EgSXNzdWluZyBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAIm81LniyKELvmG73jxkZn6nvpxtENOpMAcmPAT04GsgOd+VNO2pomUISNs3hjKDjswKSqDA8zRsoMCYzSufpfTLfNkPJt5+yU2i72Nbkeb2WajSAfpO+dk4K1oOzWBamIGYqNdTxuMZ1i5IrENXCemU8kf5bEWKFWC3964vXqI1ToU4hWmfNJ3QTdhDPc00bfxjk/zTcLtK6Hboak5mSaDt/PgYvu+aF7eod6zvtzjMudQqM8R2D9ZAEXfL/sddFy1A096LPMAY1kAUQZnLlD8sfQBrUvyeylC3CUdFFeEFI1X6sU9vVJiV9H26+GjhIhx63IqRQ4sVti4SQ7FiHKC+yiSOLu+/pNFN6Lg/Mc8mPcUAUOry2SQgZO3Vc54ucHiq3lY8BfnUgKLora/2+6ijXMtoq0TbMHfyxDR0a1Vtxof78jI8nnEORRP37FAP+/7WBDEmu9DETWHiQtuvwytuXysZG+bisO+NXETNH8BzfY+i6b1tgrwlZYQIMGntFQIDAQABo3sweTASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQEAwIBBjATBgNVHSUEDDAKBggrBgEFBQcDCDAdBgNVHQ4EFgQU8hTwsMcXVD0jQ4XcynPQcoA9uKgwHwYDVR0jBBgwFoAUWMJAoDxHdiuo5m6okZaOlsi32eQwDQYJKoZIhvcNAQELBQADggIBAJLsN1zebOtk2q6hEQkwcq7ccgj1O7wPej3WxuEv9oMzfegfV0AYTkyZqmvUmdkUi9tr1kz4ytBZM9OhoDhcI4hEJPuH4faTBie8oe1MX2dd/zWrMdLsexHUQEM3T8KEG5y6ZMgPsKIdfpo2+OHQgrNQQ7LgVb2AlMhZUk5KdN5dx0VYm7f6MKo73Ee81S4suTgYYyx5WrfdVa09Qt+IA8/xaP5zANRat94kApeRwOdn/tymCvOlRhGzURx/Es+Nr1/jGMi4QMa94/nWS3HQZF3lZMJLwF530T3HW54Vz3v9lJTnAUsIUdr7ZPSrEfA1lPH2vn4rDt2ymj1Q3VDDlmSObasMc58oBjsEd9CX7W9FT7EzLl9G64O2qWEfvNeCrviAb8LjaRUw5m18OkSSKwaYLa/cNMG+pSpI54fI3jgMtQQMM8rjhFBw8bIeS96NT/aRGdxfhfrx5tHXyqfutJ/2IXgpgfDjcFh3ARCGpDpLl4NG6NrCanbJqRLLIRwPRb5lsaCGLoC8WUtNm0MfbbTXhOD88NXIYZANQ44Tap3D8SE8hF0G/jvW2CM5RQtfHXEN+jL9oICVRLVPAOXDdP3iTodyhvTwUQGHHgi91LUrNWwGEJKkO2tqnbr9wDsHnHbCDNUYOX9J2uOUHD5QCGrXTOKJYZ3v68/Fw0BucHo4MIIF5jCCA86gAwIBAgIUE1A7bImM8CQDMyyP90+O+32C7BswDQYJKoZIhvcNAQELBQAweDELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRkwFwYDVQQKDBBPcGVuQUkgT3BDbywgTExDMQwwCgYDVQQLDANUU0ExGzAZBgNVBAMMEk9wZW5BSSBUU0EgUm9vdCBDQTAgFw0yNjA0MDgxNzQ2MjVaGA8yMTI2MDQwOTE3NDYyNVoweDELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRkwFwYDVQQKDBBPcGVuQUkgT3BDbywgTExDMQwwCgYDVQQLDANUU0ExGzAZBgNVBAMMEk9wZW5BSSBUU0EgUm9vdCBDQTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAPaS6dIUuq2e4RqsdahWG9iqsbNqkl+WefWStxQtJPi/wBqvYL7Bms15mtxsmv42msGYFqQ/5CyduqWlUHOzCsL5GvPESS94vdLsvOc/9JvRGg/yoGGiLIklylEGERf5JRCc0sYv9InEQRIO/iYe0201zey7NWBAqIVRvvbukJjxKtidehBratku2WPz5RRcKcWGIsGKHGjN6zieqVCWWyND+zj/Qnw7OqFRLyXJSNwx/1By7vB8oXfNGG+BYfM/v27o0huxpgg25Gsy+/53qF6bXN3dMZBMjmX/FoHLQc4oMVPKGEPOSARufdZkFrMpEOS0Ljq3VFpyVlfzqGp9Hu/mYR/dZcgOSAlJmTJ08AqizN2TAFOsI72ChSCx777tHaF3AO46RjOinuyv6QYxZrRmb7KJk6B+lQ4PIc5B+F7wjunNucDVM1140NAnMc9QMHJzHR7aasLAk8+t3A9kh/b7CE6IdvU+7/+SLJl3Lgv2BtyYtp0JAzr99BoJx49fWul+SA0JK7UeioMbBPJbFTwsEAOvkaKdQbdSaNENERoZv7DA2k9gve4pqu2HjXFcKIyNiKMlFGNF2AX8e2GPbEZUOxhcybCCr4PIsSM/HJ8aW+6i11S1KlOuu4XbpvqXnuyEiXLzekDJFraFWEdb8SRhOaJM3tjGqCLynr9bTCzLAgMBAAGjZjBkMBIGA1UdEwEB/wQIMAYBAf8CAQEwDgYDVR0PAQH/BAQDAgEGMB0GA1UdDgQWBBRYwkCgPEd2K6jmbqiRlo6WyLfZ5DAfBgNVHSMEGDAWgBRYwkCgPEd2K6jmbqiRlo6WyLfZ5DANBgkqhkiG9w0BAQsFAAOCAgEAWPiBkQyY8mxh/siGHdZbhB2m1r64pl0MXUnLuKEpzS2duFj58ISJPTz4b9VqH7QqolWS8GeBmV61VAz7mkaA4wJRAFPADgPBiFfe74JVfuP0fRjrDyb8g/8hqMGs3tsbk6sZzdAwdhg6k53OqmcDDTkaLoB0323wfhN2L+nqUEGLOD1s5eA+7i/bZFQ2XhG+YkW20SG0gDyMGOvanNZKqdVUZVtr0Vh+wEmH6+tLX5IMO5TXmob2oVnOR/A4rMOwfwN0ZNHAUjuhsXsoa+EOaZf4AhgMKBc7J/+upBCe92XLoPTqub2UzkTimLEKSGjuVakhpWCP/srWfdF7hiCcDvOoeNDG2kAuyIEFC1xiqCrB+1bnGHkHjhGv7OXb03D+RsxjqGTxPOmvpWS8Xr+FCC0esM7judOkEddSu3CLhp37Lr8K9tJVKyNCK0Nc7KGCYT/Pce2w95fp5MvCPPysd7e23CDBTOmJsg+yL3/DfpJknAi1hN7Mlv2JsEu1Q33S6a2G/RnZLZ+9AO7AtEdWI3xIFZEOTg9niSB7YgjByV5V8fYGxlEjV2/vh74UIEZ5vpQCscggKJ2ViogmVQVmUu8Yf9lLuqhaFOnCLK2fC8NcQvOh9SdkeXGMClqe/bn5RXkHcB7hagO1N5aOWP1Fv1QljIMDPQ/ZJjMj0Fh3prgxggNoMIIDZAIBATCBkzB7MQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xGTAXBgNVBAoMEE9wZW5BSSBPcENvLCBMTEMxDDAKBgNVBAsMA1RTQTEeMBwGA1UEAwwVT3BlbkFJIFRTQSBJc3N1aW5nIENBAhRh20YoMoqMjUoGt7/+YOMCbD9xtzANBglghkgBZQMEAgEFAKCCASUwGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEEMC8GCSqGSIb3DQEJBDEiBCAH/cPVdnD47eum6Q8ED/yUHqMDBHqSQ8ohySRFeaPaczCB1QYLKoZIhvcNAQkQAi8xgcUwgcIwgb8wgbwEIL1PubKQTIE2Z4hu70Hhbf4E2SIHnb9bkkrQosRgRiJ6MIGXMH+kfTB7MQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xGTAXBgNVBAoMEE9wZW5BSSBPcENvLCBMTEMxDDAKBgNVBAsMA1RTQTEeMBwGA1UEAwwVT3BlbkFJIFRTQSBJc3N1aW5nIENBAhRh20YoMoqMjUoGt7/+YOMCbD9xtzANBgkqhkiG9w0BAQsFAASCAYBbdZrwScXVpRqjOv2MOOzcwCFyeQvDXw2wDcCPdQaXv3SHTxNGhDw4bKBa/Dodc7YvTaD5LhGReb29kz6ylw6ytwmY0rmfw6PD9VkUrHAIpTF7gJcdI0jwpZNEkkSEhM4F/I8lW7+lu7YK9tfH8K7GCXLyxvNvUMJ5JOkvgRX8o1CEZ3a9OkM4g2ccx80VqRFqBih992vVrPhWZi1V4R0ghgVa5qF2JU7f/D/704Jl3sUch68ZsSL/dw/DJTDrJX/NvXkAiAoY0PEGygbg5b+5GNxhwmmtvBh7MM6wtbU9y9s3bKHqYg/Rv7ebOsnqDVHoCftjB6UjtXQBEZobZZ9lfZRm6FVinBe3F1vTYltCdgFRJwfOWJu/8oSnS4dd7cBaSx6M5R4IKA55XZPzqXLC9T+8MeY7Pl5ZIHgVM2v5nh9AjevjarF9cyt5VioGDGjvR3xwpPJaIQnZLwBQHWKnXyn/HYA8/yKytV5iSMnoX3q5lirXVTubR6XlRen3oiRlclZhbHOhaG9jc3BWYWxzgVkH1zCCB9MKAQCgggfMMIIHyAYJKwYBBQUHMAEBBIIHuTCCB7UwgemiFgQUPaqqeI769kz6XmrRQE0O5VTyH64YDzIwMjYxMTAyMTEzNjE5WjCBmDCBlTBJMAkGBSsOAwIaBQAEFN+CN1NeU9gzseAEPSQ18XXm4QoZBBQ5PRBH3JePr4h7TXMYHc3l7qSlKgIQC6X86Q5wjPIFgDHuRBxkc4AAGA8yMDI2MTEwMjExMzYxOVqgERgPMjAyNjExMDkxMTM2MThaoSIwIDAeBgkrBgEFBQcwAQYEERgPMjAxNjExMDQxMTM2MTlaoSMwITAfBgkrBgEFBQcwAQIEEgQQiiiNpnc8tx0/7jrDJBkdXTANBgkqhkiG9w0BAQsFAAOCAYEAEG/zYW5LBvqq4jkmAnsWfKGBD+Pfq0aD+CozEAdR/8JbhY3FiKeHFdP4nVi//PIKewecZgL1R9ZJrOUGDpKKXn3xcLrGZPAF4q2EP2Eo9/Qx6KSBFLI4AlnU1KjaRgMa7qYFs2PxHJexfduGG508d2mm8nwq01PPAEaIVaMiknR2Ys4w/h3twirRi0nEivaobsk4Zccl8gSS0tlFT/yxCc5Lco0Z272nUpv+EZ0QAN6KxPgSdE29v5zoSXR4hwdAQuZKmQuS1K8QyPBE3wahjDFfOii6pJzhoQMMUf69O9SEsXnatAL9K+fB+I+/EjL7qPbnOceFAXlf4D1EJ33OpyeeGp3SBFrslNU7smL3KgV6UkhzlPXSlz1rOeJ7JhrESAXaI2/JkBh10mAgv2aCacduoksCl4TvW9Au9qVzjdF7zOzKISeBUX44J9z2qwP9Nmj5HeP+laBKem/zMG9lv4dbA2RphyrSpTLjfJXvAqPdPWxpuu0PsQxk8pEzjGB6oIIFMTCCBS0wggUpMIIDEaADAgECAhBaSrI/0CjG/kuzP2494ye6MA0GCSqGSIb3DQEBCwUAMEoxITAfBgNVBAMMGFNTTC5jb20gQzJQQSBJQ0EgUjEgMjAyNTEYMBYGA1UECgwPU1NMIENvcnBvcmF0aW9uMQswCQYDVQQGEwJVUzAeFw0yNjAxMDIyMDE0MTVaFw0yNzAxMDIyMDE0MTRaME0xCzAJBgNVBAYTAlVTMREwDwYDVQQKDAhTU0wgQ29ycDErMCkGA1UEAwwiU1NMLmNvbSBDMlBBIElDQSBSMSBPQ1NQIFJlc3BvbmRlcjCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKJQk0HmSkveC5umlXQmWDzsUvy7lB0yzRTDxlDf0L2cxm5wiyOX14zuzAh8Vu5nvvmawJKw67qlM/9taRSQgy8IiC0V7bBLXR8sm7m4ZRckY+4TsCRgjQroBfh5H8bTYTVbjASXWJ+zjFzY5Mam0EPws6fTVNlsiPcYp7jE2G79MSjeDgkukCf1c9l3ptVQmiDZvMsyxUa5/KJVBU3uoJusaGrBGz84KnoG2NNdurSzHuudVSnu7NI3FJ+uxTapnLC33kQqi+hQpxEgCIALeXslz9k58p5Fm3e6B3gJoKZOe0COMf3qImiHFYDEgiHkT1ryEfOID6RLiSp+TCQBJqmgmgTJnXwF7mtihSIyAe7W3CvS39ZGNHaggih4jr4q3Q4U5NZqKnfbdHo1J6aHFhfBuB7wOlOBqprWK5Ov4x+bt2XSJjBKpRwOvsrxi39aNAGmodIBCIVyOFg5xOw+Mh0fhN83FHnWMNM3G3jm6M2S6W4rDW7sMOsyOC6pPNIt5QIDAQABo4GHMIGEMAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAUOT0QR9yXj6+Ie01zGB3N5e6kpSowDwYJKwYBBQUHMAEFBAIFADATBgNVHSUEDDAKBggrBgEFBQcDCTAdBgNVHQ4EFgQUPaqqeI769kz6XmrRQE0O5VTyH64wDgYDVR0PAQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4ICAQC7c6ZVhKNoUOsQ8aBs18kphJ0+qC/tCrsOoOury8EeuAGGBbcwJUht8w3hvaFNKNIrZWBE3LaNq1U/192FHv7wl1skLOytSx9L9LsJ+p6w4LCw/Y5EcrSPDGrdY+jrstYL1Mfx54sO399sxAmi/T0fcxsRWMEoKaJrYGkwKTtVtIyppAiQqRJwPm5yxHYcMGmCTyW0T1XO6UjPX4sHf83wVmvf3J6GHzbwNY7BN5VzuO22GKhEvvaX3kkPvI+hPnIn0D0hfFJcUKnHFdyp+/dtsCoHJhAUoJTfFWSFjKc9ijoxBnSRIeEY7ErfhRFozmGppGsyM9No5sm/s/z/lfEc18IFZUpsTkf+qGCUd2hBzk4oRKXGmIeoNfKOBmaqJL1qwRKuGCBr3nSjdyZlp6XCKB0l/T6p5RRJuQf/dGgUckdQ+3SaImiFGoy/gwCc2eNtDaI8XMdOpXbS/8Kqxa60/CpCbCeotNY5yxeZWMsHC8Ox/DboNdTLXskRmJjO6IKLEu0LWGG6YZHRqXrJPljg/JRITHTmz9R8swHy6CNL6DBoGbsn7Ln2CbbteZPlCoK1x+cuGsaFa5OlQVkplLpY02+WTZ9RM5E/wLhQG8+1umCI6TcKTJafI3jawcqOxZY+bPpfADdW3wkGIZiSeffAv+POkqcUqyxXPUHUEongP2NwYWRZIvgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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" clip-path="url(#pothHeadCrop)" filter="url(#pothDeepInk)"/><g fill="none" stroke="#a52e36" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M242 855 L906 803 L851 1269 L214 1362 Z M246 866 L894 815 M211 1351 L868 1255"/><path d="M551 737 L647 707 L651 720 L557 749 Z M638 712 L643 721"/><path d="M650 707 C765 645 588 573 716 509 S856 384 762 301 S831 198 816 128 C803 74 731 73 781 19 S865 -53 812 -83 M657 704 C788 618 653 581 742 518 S882 384 796 296 S865 195 840 126"/><path d="M813 -83 C876 -117 823 -203 747 -172 C687 -238 607 -195 572 -164 C480 -199 409 -167 439 -113 C346 -65 443 -23 525 -46 C580 10 658 -9 694 -41 C771 -7 851 -34 813 -83 M799 -94 C840 -148 766 -194 716 -164 C663 -221 570 -154 538 -165 C454 -188 417 -98 493 -93 C418 -34 568 -25 589 -62 C624 -6 735 -49 710 -76 C824 -19 882 -92 799 -94 M459 -91 C553 -152 715 -120 792 -94 M490 -130 C586 -181 748 -128 798 -62 M493 -54 C571 -111 693 -154 782 -136 M556 -169 C546 -94 653 -32 736 -60"/></g></svg>`;
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
    {strain:'Blue Dream', brand:'Fog Cutter', wins:null},
    {strain:'Coughy Cake', brand:'MAC', wins:null},
    {strain:'Cujo’ Revenge', brand:'Fog Cutter', wins:null},
    {strain:'Sweet Tree', brand:'MAC', wins:null, origin:true}
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
    const name = document.createElement('span');
    name.className = 'golden-engraved-name';
    name.textContent = `${winner.strain} / ${winner.brand}`;
    row.appendChild(name);
    if (Number.isInteger(winner.wins) && winner.wins > 0) {
      const tally = document.createElement('span');
      tally.className = 'golden-engraved-tallies';
      tally.setAttribute('role', 'img');
      tally.setAttribute('aria-label', `${winner.wins} Golden Roach wins`);
      tally.innerHTML = '<span aria-hidden="true">—</span>' + tallyMarkup(winner.wins);
      row.appendChild(tally);
    }
    if (winner.origin) {
      const origin = document.createElement('small');
      origin.className = 'golden-roach-origin';
      origin.textContent = 'The one that started it all.';
      row.appendChild(origin);
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

