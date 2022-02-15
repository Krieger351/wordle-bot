import { GAME_KEY_MAP, GAME_KEYBOARD } from "./constants";

export const submit = async (): Promise<void> => {
  const observePromise = new Promise<void>((resolve) => {
    const observer = new MutationObserver(() => {
      observer.disconnect();
      resolve();
    });
    observer.observe(GAME_KEYBOARD.shadowRoot as ShadowRoot, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  });

  GAME_KEY_MAP["↵"].click();
  await observePromise;
};
