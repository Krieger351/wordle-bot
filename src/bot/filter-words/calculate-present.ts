import type {
  Evaluation,
  LetterState,
  TileState,
} from "../../game-interface/get-letter-state";
import type { Letter } from "../../types";

const groupRowByLetter = (
  row: TileState[]
): Partial<Record<Letter, Partial<Record<Evaluation, number>>>> => {
  const rowByLetter: Partial<
    Record<Letter, Partial<Record<Evaluation, number>>>
  > = {};
  for (const { letter, evaluation } of row) {
    if (letter && evaluation) {
      rowByLetter[letter as Letter] = {
        ...rowByLetter[letter],
        [evaluation]: (rowByLetter[letter as Letter]?.[evaluation] ?? 0) + 1,
      };
    }
  }
  return rowByLetter;
};

type LetterUsage = {
  excessLetters: Partial<Record<Letter, number>>;
  presentLetters: Partial<Record<Letter, number>>;
};

const getLetterUsage = (rows: TileState[][]): LetterUsage => {
  const excessLetters: Partial<Record<Letter, number>> = {};
  const presentLetters: Partial<Record<Letter, number>> = {};
  for (const row of rows) {
    const rowByLetter = groupRowByLetter(row);
    for (const letter in rowByLetter) {
      const {
        absent = 0,
        present = 0,
        correct = 0,
      } = rowByLetter[letter as Letter] as Partial<Record<Evaluation, number>>;
      if (correct > 0 || present > 0) {
        if (absent > 0) {
          excessLetters[letter as Letter] = correct + present;
        } else {
          presentLetters[letter as Letter] = correct + present;
        }
      }
    }
  }
  return { excessLetters, presentLetters };
};

const buildFilter =
  ({ excessLetters, presentLetters }: LetterUsage) =>
  (word: string) => {
    for (const [letter, count] of Object.entries(excessLetters)) {
      if (word.split(letter).length - 1 !== count) {
        return false;
      }
    }
    for (const [letter, count] of Object.entries(presentLetters)) {
      if (word.split(letter).length - 1 < count) {
        return false;
      }
    }
    return true;
  };

export const calculatePresent = (
  letterState: LetterState
): ((word: string) => boolean) => buildFilter(getLetterUsage(letterState));
