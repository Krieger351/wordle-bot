'use strict';

const buildButton = (startBot) => {
  const button = document.createElement("button");
  button.textContent = "Start Wordle bot";
  button.style.position = "absolute";
  button.style.right = "0";
  button.style.bottom = "0";
  button.addEventListener("click", startBot);
  return button;
};
const addStartButton = (startBot) => {
  document.body.append(buildButton(startBot));
};

const GAME_APP = document.querySelector("game-app");
const GAME_KEYBOARD = GAME_APP.shadowRoot.querySelector("game-theme-manager").querySelector("game-keyboard");
const GAME_KEYBOARD_KEYS = GAME_KEYBOARD.shadowRoot.querySelectorAll("button");
const GAME_KEY_MAP = (() => {
  const map = {};
  for (const key of GAME_KEYBOARD_KEYS) {
    map[key.getAttribute("data-key")] = key;
  }
  return map;
})();
const GAME_ROWS = GAME_APP.shadowRoot.querySelectorAll("game-row");
const GAME_TILES = (() => {
  const tiles = [];
  for (const row of GAME_ROWS) {
    tiles.push([...row.shadowRoot.querySelectorAll("game-tile")]);
  }
  return tiles;
})();

const writeletter = (letter) => {
  GAME_KEY_MAP[letter].click();
};

const writeWord = (word) => {
  for (const letter of word) {
    writeletter(letter);
  }
};

window.wordle = window.wordle || {};
const wordListPromise = (async () => {
  const response = await fetch(`main.${window.wordle.hash}.js`);
  const text = await response.text();
  const Oa = text.split("Oa=[")[1].split("]")[0].replaceAll('"', "").split(",");
  const Ma = text.split("Ma=[")[1].split("]")[0].replaceAll('"', "").split(",");
  return [.../* @__PURE__ */ new Set([...Oa, ...Ma])];
})();
const getWordList = () => wordListPromise;

const getLetterState = () => {
  const state = [];
  for (const row of GAME_TILES) {
    const tileRow = [];
    for (const tile of row) {
      const letter = tile.getAttribute("letter") ?? void 0;
      const evaluation = tile.getAttribute("evaluation") ?? void 0;
      if (letter && evaluation) {
        tileRow.push({ letter, evaluation });
      }
    }
    if (tileRow.length > 0) {
      state.push(tileRow);
    }
  }
  return state;
};

const calculateAbsent = (letterState) => {
  const excluded = /* @__PURE__ */ new Set();
  for (const row of letterState) {
    const rowInfo = {};
    for (const { letter, evaluation } of row) {
      if (letter && evaluation) {
        rowInfo[letter] = rowInfo[letter] || evaluation !== "absent";
      }
    }
    for (const letter in rowInfo) {
      if (!rowInfo[letter]) {
        excluded.add(letter);
      }
    }
  }
  return [...excluded].join("");
};
const calculatePresentExclusion = (letterState) => {
  const presentExlcusion = [
    "",
    "",
    "",
    "",
    ""
  ];
  for (let index = 0; index < 5; index++) {
    const letters = [];
    for (const row of letterState) {
      const { letter, evaluation } = row[index];
      if (evaluation === "present") {
        letters.push(letter);
      }
    }
    presentExlcusion[index] = letters.join("");
  }
  return presentExlcusion;
};
const calculateFallback = (letterState) => {
  const fallback = [];
  const absent = calculateAbsent(letterState);
  const presentExlcusion = calculatePresentExclusion(letterState);
  for (let index = 0; index < 5; index++) {
    fallback[index] = `[^${absent}${presentExlcusion[index]}]`;
  }
  return [fallback[0], fallback[1], fallback[2], fallback[3], fallback[4]];
};

const getLetterCountPerRow = (row) => {
  const rowInfo = {};
  for (const { letter, evaluation } of row) {
    if (letter && evaluation) {
      if (!rowInfo[letter]) {
        rowInfo[letter] = 0;
      }
      if (/^(present|correct)$/.test(evaluation)) {
        rowInfo[letter]++;
      }
    }
  }
  return rowInfo;
};
const buildFilter = (letters) => (word) => {
  for (const letter in letters) {
    if (!word.includes(letter)) {
      return false;
    }
    if (word.split(letter).length - 1 < letters[letter]) {
      return false;
    }
  }
  return true;
};
const calculatePresent = (letterState) => {
  const letters = {};
  for (const row of letterState) {
    const rowInfo = getLetterCountPerRow(row);
    for (const letter in rowInfo) {
      if (rowInfo[letter] > 0 && !letters[letter] || rowInfo[letter] > letters[letter]) {
        letters[letter] = rowInfo[letter];
      }
    }
  }
  return buildFilter(letters);
};

const getCorrectLetters = (letterState) => {
  const correct = [void 0, void 0, void 0, void 0, void 0];
  for (const row of letterState) {
    for (const [index, { letter, evaluation }] of row.entries()) {
      if (evaluation === "correct" && letter) {
        correct[index] = letter;
      }
    }
  }
  return correct;
};

const filter = () => {
  const letterState = getLetterState();
  const correct = getCorrectLetters(letterState);
  const fallback = calculateFallback(letterState);
  const present = calculatePresent(letterState);
  const regex = new RegExp(correct.map((letter, index) => letter || fallback[index]).join(""));
  return (text) => regex.test(text) && present(text);
};

const filterWords = async () => {
  const fullWordList = await getWordList();
  return fullWordList.filter(filter());
};

const countLetterUsage = (words) => {
  const accumulator = {
    a: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    b: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    c: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    d: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    e: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    f: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    g: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    h: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    i: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    j: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    k: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    l: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    m: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    n: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    o: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    p: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    q: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    r: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    s: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    t: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    u: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    v: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    w: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    x: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    y: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    z: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }
  };
  for (const word of words) {
    for (const [index, letter] of [...word].entries()) {
      accumulator[letter].total++;
      accumulator[letter][index]++;
    }
  }
  return accumulator;
};

const getBestWord = async (words) => {
  const letterUsage = countLetterUsage(words);
  let [bestWord] = words;
  const wordCount = {};
  for (const word of words) {
    let count = 0;
    for (const letter of new Set(...word)) {
      count += letterUsage[letter].total;
    }
    wordCount[word] = count;
    if (count > wordCount[bestWord]) {
      bestWord = word;
    }
  }
  return bestWord;
};

const start = async () => {
  const currentWords = await filterWords();
  const bestWord = await getBestWord(currentWords);
  writeWord(bestWord);
};

if ("wordle" in window) {
  addStartButton(start);
} else {
  console.log("This script must be run on a wordle page");
}
