import { Cube } from "./src/cube.js";
import { assert } from "./src/utils.js";

const cube = new Cube();

/**
 *
 * @param {Cube} cube
 */
function render(cube) {
  for (let i = 0; i < cube.spots.length; i++) {
    /** @type {HTMLDivElement | null} */
    const spotDiv = document.querySelector(`#spot-${i}`);
    assert(spotDiv);

    const spot = cube.spots[i];
    assert(spot);
    spotDiv.style.backgroundColor = spot.color;
  }
}
console.log(cube);

/** @type {HTMLButtonElement | null} */
const renderButton = document.querySelector("#render");
renderButton?.addEventListener("click", () => {
  render(cube);
});

/** @type {HTMLButtonElement[] | null} */
const rotateButtons = Array.from(document.querySelectorAll(".rotate"));
for (const button of rotateButtons) {
  button.addEventListener("click", () => {
    cube.rotate(button.id, 1);
    render(cube);
  });
}
