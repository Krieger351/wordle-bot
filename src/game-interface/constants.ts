/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const GAME_APP = document.querySelector("game-app") as HTMLElement;

export const GAME_KEYBOARD = GAME_APP.shadowRoot!.querySelector(
  "game-theme-manager"
)!.querySelector("game-keyboard") as HTMLElement;

export const GAME_KEYBOARD_KEYS =
  GAME_KEYBOARD.shadowRoot!.querySelectorAll("button");

export const GAME_KEY_MAP: Record<string, HTMLButtonElement> = (() => {
  const map: Record<string, HTMLButtonElement> = {};
  for (const key of GAME_KEYBOARD_KEYS) {
    map[key.getAttribute("data-key") as string] = key;
  }
  return map;
})();

export const GAME_ROWS = GAME_APP.shadowRoot!.querySelectorAll("game-row");
export const GAME_TILES = (() => {
  const tiles = [];
  for (const row of GAME_ROWS) {
    tiles.push([...row.shadowRoot!.querySelectorAll("game-tile")]);
  }
  return tiles;
})();
/* eslint-enable @typescript-eslint/no-non-null-assertion */
