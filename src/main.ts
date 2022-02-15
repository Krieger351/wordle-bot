import { addStartButton } from "./add-start-button";
import { start } from "./bot";

if ("wordle" in window) {
  addStartButton(start);
} else {
  console.log("This script must be run on a wordle page");
}
