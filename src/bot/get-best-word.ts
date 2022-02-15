import { countLetterUsage } from "./count-letter-usage";
import type { Letter } from "../types";

export const getBestWord = async (words: string[]): Promise<string> => {
  const letterUsage = countLetterUsage(words);
  let [bestWord] = words;
  const wordCount: Record<string, number> = {};
  for (const word of words) {
    let count = 0;
    for (const letter of new Set(...word)) {
      count += letterUsage[letter as Letter].total;
    }
    wordCount[word] = count;
    if (count > wordCount[bestWord]) {
      bestWord = word;
    }
  }
  return bestWord;
};
