import { parseDices_, diceCount_, formatDices_, addDices_ } from "./utils";
 /**
  * Counts the number of dices in a dice expression.
  * A dice expression is like "3d6 + d3 + 5".
  * @example DICECOUNT("3d6 + d3 + 5") = 4
  * @param {String} input The dice expression.
  * @returns {Number} The number of dices.
  */
export function diceCount(input: string): number {
  return diceCount_(parseDices_(input));
}

/**
 * Adds two or more dice expressions.
 * A dice expression is like "3d6 + d3 + 5".
 * @example DICESUM("3d6 + d3 + 5"; "d3 + 2"; "1") = "3d6 + 2d3 + 8"
 * @param {String} inputs A list of dice expressions.
 * @returns {String} The summed dice expression.
 */
export function diceSum(...inputs: string[]): string {
  var sum = inputs.map((i) => parseDices_(i))
    .reduce((acc, curr) => addDices_(acc, curr));
  return formatDices_(sum, "d");
}

/**
 * Adds two or more dice expressions.
 * A dice expression is like "3d6 + d3 + 5".
 * @example DICESUM2("k", "3d6 + d3 + 5"; "d3 + 2"; "1") = "3k6 + 2k3 + 8"
 * @param {String} diceMarker The dice marker to format the dice expression.
 * @param {String} inputs A list of dice expressions.
 * @returns {String} The summed dice expression.
 */
export function diceSum2(diceMarker: string = "d", ...inputs: string[]): string {
  var sum = inputs.map((i) => parseDices_(i))
    .reduce((acc, curr) => addDices_(acc, curr));
  return formatDices_(sum, diceMarker);
}
