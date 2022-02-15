import { GAME_KEY_MAP } from "./constants";

export const writeletter = (letter: string): void => {
  GAME_KEY_MAP[letter].click();
};
