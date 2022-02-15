import type { LetterState } from "../../game-interface/get-letter-state";
import type { Letter } from "../../types";

export const calculateFallback = (letterState: LetterState): string => {
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
  return `[^${[...excluded].join("")}]`;
};
