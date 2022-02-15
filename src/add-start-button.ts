const buildButton = (startBot: () => void): HTMLButtonElement => {
  const button = document.createElement("button");
  button.textContent = "Start Wordle bot";
  button.style.position = "absolute";
  button.style.right = "0";
  button.style.bottom = "0";
  button.addEventListener("click", startBot);
  return button;
};

export const addStartButton = (startBot: () => void): void => {
  console.log("Adding Controls!");
  document.body.append(buildButton(startBot));
};
