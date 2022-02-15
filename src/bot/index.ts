// import { submit } from "../game-interface/submit";
import { writeWord } from "../game-interface/write-word";
import { filterWords } from "./filter-words";
import { getBestWord } from "./get-best-word";

export const start = async (): Promise<void> => {
  const currentWords = await filterWords();
  console.log(currentWords);
  console.log(currentWords.includes("cynic"));
  const bestWord = await getBestWord(currentWords);
  console.log(bestWord);
  writeWord(bestWord);
  // await submit();
};
