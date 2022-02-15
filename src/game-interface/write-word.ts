import { writeletter } from "./write-letter";

export const writeWord = (word: string): void => {
  for (const letter of word) {
    writeletter(letter);
  }
};
