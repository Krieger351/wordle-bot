import type {
  LetterState,
  TileState,
} from "../../game-interface/get-letter-state";
import type { Letter } from "../../types";

const getLetterCountPerRow = (row: TileState[]) => {
  const rowInfo: Partial<Record<Letter, number>> = {};
  for (const { letter, evaluation } of row) {
    if (letter && evaluation) {
      if (!rowInfo[letter]) {
        rowInfo[letter] = 0;
      }
      if (/^(present|correct)$/.test(evaluation)) {
        (rowInfo[letter] as number)++;
      }
    }
  }
  return rowInfo;
};

const buildFilter =
  (letters: Partial<Record<Letter, number>>) => (word: string) => {
    for (const letter in letters) {
      if (!word.includes(letter)) {
        return false;
      }
      if (
        word.split(letter).length - 1 <
        (letters[letter as Letter] as number)
      ) {
        return false;
      }
    }
    return true;
  };

export const calculatePresent = (
  letterState: LetterState
): ((word: string) => boolean) => {
  const letters: Partial<Record<Letter, number>> = {};
  for (const row of letterState) {
    const rowInfo = getLetterCountPerRow(row);
    for (const letter in rowInfo) {
      if (
        ((rowInfo[letter as Letter] as number) > 0 &&
          !letters[letter as Letter]) ||
        (rowInfo[letter as Letter] as number) >
          (letters[letter as Letter] as number)
      ) {
        letters[letter as Letter] = rowInfo[letter as Letter] as number;
      }
    }
  }

  return buildFilter(letters);
};
