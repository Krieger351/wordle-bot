declare global {
  interface Window {
    wordle: { hash: string };
  }
}

window.wordle = window.wordle || {};

const wordListPromise: Promise<string[]> = (async () => {
  const response = await fetch(`main.${window.wordle.hash}.js`);
  const text = await response.text();

  const Oa = text.split("Oa=[")[1].split("]")[0].replaceAll('"', "").split(",");
  const Ma = text.split("Ma=[")[1].split("]")[0].replaceAll('"', "").split(",");
  return [...new Set([...Oa, ...Ma])];
})();

export const getWordList = (): Promise<string[]> => wordListPromise;
