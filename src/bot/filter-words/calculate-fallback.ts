import type { LetterState } from "../../game-interface/get-letter-state";
import type { Letter } from "../../types";

const calculateAbsent = (letterState: LetterState): string => {
  const excluded = new Set<Letter>();
  for (const row of letterState) {
    const rowInfo: Partial<Record<Letter, boolean>> = {};
    for (const { letter, evaluation } of row) {
      if (letter && evaluation) {
        rowInfo[letter] = rowInfo[letter] || evaluation !== "absent";
      }
    }
    for (const letter in rowInfo) {
      if (!rowInfo[letter as Letter]) {
        excluded.add(letter as Letter);
      }
    }
  }
  return [...excluded].join("");
};

const calculatePresentExclusion = (
  letterState: LetterState
): [string, string, string, string, string] => {
  const presentExlcusion: [string, string, string, string, string] = [
    "",
    "",
    "",
    "",
    "",
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

export const calculateFallback = (
  letterState: LetterState
): [string, string, string, string, string] => {
  const fallback: string[] = [];
  const absent = calculateAbsent(letterState);
  const presentExlcusion = calculatePresentExclusion(letterState);
  for (let index = 0; index < 5; index++) {
    fallback[index] = `[^${absent}${presentExlcusion[index]}]`;
  }
  return [fallback[0], fallback[1], fallback[2], fallback[3], fallback[4]];
};
