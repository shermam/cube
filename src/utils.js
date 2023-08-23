/**
 *
 * @param {*} value
 * @return {asserts value}
 */
export function assert(value) {
  if (!value) throw new Error("Expected value to be truthy");
}

/**
 *
 * @param {number} n1
 * @param {number} n2
 * @returns {number}
 */
export function gcd(n1, n2) {
  return n2 === 0 ? n1 : gcd(n2, n1 % n2);
}
