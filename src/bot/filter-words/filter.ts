import { getLetterState } from "../../game-interface/get-letter-state";
import { calculateFallback } from "./calculate-fallback";
import { calculatePresent } from "./calculate-present";
import { getCorrectLetters } from "./get-correct-letters";

export const filter = (): ((text: string) => boolean) => {
  const letterState = getLetterState();

  const correct = getCorrectLetters(letterState);
  const fallback = calculateFallback(letterState);
  const present = calculatePresent(letterState);
  const regex = new RegExp(
    correct.map((letter, index) => letter || fallback[index]).join("")
  );

  return (text: string): boolean => regex.test(text) && present(text);
};
