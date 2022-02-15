import type { LetterState } from "../../game-interface/get-letter-state";
import type { Letter } from "../../types";

export const getCorrectLetters = (
  letterState: LetterState
): [
  Letter | undefined,
  Letter | undefined,
  Letter | undefined,
  Letter | undefined,
  Letter | undefined
] => {
  const correct: [
    Letter | undefined,
    Letter | undefined,
    Letter | undefined,
    Letter | undefined,
    Letter | undefined
  ] = [undefined, undefined, undefined, undefined, undefined];
  for (const row of letterState) {
    for (const [index, { letter, evaluation }] of row.entries()) {
      if (evaluation === "correct" && letter) {
        correct[index] = letter;
      }
    }
  }
  return correct;
};
