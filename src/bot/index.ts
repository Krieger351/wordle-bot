// import { submit } from "../game-interface/submit";
import { writeWord } from "../game-interface/write-word";
import { filterWords } from "./filter-words";
import { getBestWord } from "./get-best-word";

export const start = async (): Promise<void> => {
  const currentWords = await filterWords();
  console.log("Remaining Words:", currentWords.length);
  console.log("Words:", currentWords);
  const bestWord = getBestWord(currentWords);
  writeWord(bestWord);
};
