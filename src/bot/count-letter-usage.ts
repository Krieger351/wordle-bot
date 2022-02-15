import type { Letter } from "../types";

type LetterUsage = Record<
  Letter,
  {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    total: number;
  }
>;

export const countLetterUsage = (words: string[]): LetterUsage => {
  const accumulator: LetterUsage = {
    a: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    b: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    c: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    d: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    e: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    f: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    g: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    h: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    i: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    j: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    k: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    l: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    m: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    n: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    o: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    p: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    q: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    r: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    s: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    t: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    u: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    v: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    w: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    x: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    y: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    z: { total: 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
  };
  for (const word of words) {
    for (const [index, letter] of [...word].entries()) {
      accumulator[letter as Letter].total++;
      accumulator[letter as Letter][index as 0 | 1 | 2 | 3 | 4]++;
    }
  }
  return accumulator;
};
