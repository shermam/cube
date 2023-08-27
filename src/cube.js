// This is the representation of the spots of a cube for reference
//
//                         -------------------------
//                         | #FFF  | #FFF  | #FFF  |
//                         |   00  |   01  |   02  |
//                         -------------------------
//                         | #FFF  | #FFF  | #FFF  |
//                         |   03  | XXXX  |   04  |
//                         -------------------------
//                         | #FFF  | #FFF  | #FFF  |
//                         |   05  |   06  |   07  |
// -------------------------------------------------------------------------------------------------
// | #F80  | #F80  | #F80  | #0F0  | #0F0  | #0F0  | #F00  | #F00  | #F00  | #00F  | #00F  | #00F  |
// |   08  |   09  |   10  |   16  |   17  |   18  |   24  |   25  |   26  |   32  |   33  |   34  |
// -------------------------------------------------------------------------------------------------
// | #F80  | #F80  | #F80  | #0F0  | #0F0  | #0F0  | #F00  | #F00  | #F00  | #00F  | #00F  | #00F  |
// |   11  | XXXX  |   12  |   19  | XXXX  |   20  |   27  | XXXX  |   28  |   35  | XXXX  |   36  |
// -------------------------------------------------------------------------------------------------
// | #F80  | #F80  | #F80  | #0F0  | #0F0  | #0F0  | #F00  | #F00  | #F00  | #00F  | #00F  | #00F  |
// |   13  |   14  |   15  |   21  |   22  |   23  |   29  |   30  |   31  |   37  |   38  |   39  |
// -------------------------------------------------------------------------------------------------
//                         | #FF0  | #FF0  | #FF0  |
//                         |   40  |   41  |   42  |
//                         -------------------------
//                         | #FF0  | #FF0  | #FF0  |
//                         |   43  | XXXX  |   44  |
//                         -------------------------
//                         | #FF0  | #FF0  | #FF0  |
//                         |   45  |   46  |   47  |
//                         -------------------------
import { assert, gcd } from "./utils.js";

export class Cube {
  colors = ["#FFF", "#F80", "#0F0", "#F00", "#00F", "#FF0"];
  /** @type {{color:string}[]} */
  spots = new Array(48)
    .fill(0)
    .map((_, i) => ({ color: this.colors[(i / 8) | 0] ?? "" }));

  rotations = new Map([
    [
      "U",
      {
        innerRing: this.#s([0, 1, 2, 4, 7, 6, 5, 3]),
        outerRing: this.#s([34, 33, 32, 26, 25, 24, 18, 17, 16, 10, 9, 8]),
      },
    ],
    [
      "F",
      {
        innerRing: this.#s([16, 17, 18, 20, 23, 22, 21, 19]),
        outerRing: this.#s([5, 6, 7, 24, 27, 29, 42, 41, 40, 15, 12, 10]),
      },
    ],
    [
      "D",
      {
        innerRing: this.#s([40, 41, 42, 44, 47, 46, 45, 43]),
        outerRing: this.#s([21, 22, 23, 29, 30, 31, 37, 38, 39, 13, 14, 15]),
      },
    ],
    [
      "L",
      {
        innerRing: this.#s([8, 9, 10, 12, 15, 14, 13, 11]),
        outerRing: this.#s([0, 3, 5, 16, 19, 21, 40, 43, 45, 39, 36, 34]),
      },
    ],
    [
      "R",
      {
        innerRing: this.#s([24, 25, 26, 28, 31, 30, 29, 27]),
        outerRing: this.#s([7, 4, 2, 32, 35, 37, 47, 44, 42, 23, 20, 18]),
      },
    ],
    [
      "B",
      {
        innerRing: this.#s([32, 33, 34, 36, 39, 38, 37, 35]),
        outerRing: this.#s([2, 1, 0, 8, 11, 13, 45, 46, 47, 31, 28, 26]),
      },
    ],
  ]);

  /**
   * Fills the spots from indexes
   * @param {number[]} indexes
   * @returns {{color:string}[]}
   */
  #s(indexes) {
    return indexes.map((index) => {
      const spot = this.spots[index];
      assert(spot);
      return spot;
    });
  }

  /**
   *
   * @param {string} direction
   */
  rotate(direction, factor = 1) {
    const rotation = this.rotations.get(direction);
    assert(rotation);
    const jumpInnerRing = 2 * factor;
    this.juggle(rotation.innerRing, jumpInnerRing);
    const jumpOuterRing = 3 * factor;
    this.juggle(rotation.outerRing, jumpOuterRing);
  }

  /**
   *
   * @param {{color: string}[]} array
   * @param {number} jump
   */
  juggle(array, jump) {
    const cycles = gcd(array.length, jump);
    for (let i = 0; i < cycles; i++) {
      const firstCycleElement = array[i];
      assert(firstCycleElement);
      let temp1 = firstCycleElement.color;
      for (let j = 0; j < array.length / cycles; j++) {
        const index = ((j * jump + jump) % array.length) + i;
        const element = array[index];
        assert(element);
        const temp2 = element.color;
        element.color = temp1;
        temp1 = temp2;
      }
    }
  }
}
