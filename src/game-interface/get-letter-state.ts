import { GAME_TILES } from "./constants";
import type { Letter } from "../types";

export type Evaluation = "correct" | "absent" | "present";

export type TileState = {
  evaluation: Evaluation | undefined;
  letter: Letter | undefined;
};

export type LetterState = TileState[][];

export const getLetterState = (): LetterState => {
  const state = [];
  for (const row of GAME_TILES) {
    const tileRow = [];
    for (const tile of row) {
      const letter = (tile.getAttribute("letter") as Letter) ?? undefined;
      const evaluation =
        (tile.getAttribute("evaluation") as Evaluation) ?? undefined;
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
