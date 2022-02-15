import { getWordList } from "../get-word-list";
import { filter } from "./filter";

export const filterWords = async (): Promise<string[]> => {
  const fullWordList = await getWordList();
  return fullWordList.filter(filter());
};
