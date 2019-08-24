import { parseDices_, diceCount_, formatDices_, addDices_ } from "./utils";

export function diceCount(input: string): number {
  return diceCount_(parseDices_(input));
}

export function sumDices(...inputs: string[]): string {
  var sum = inputs.map(parseDices_)
    .reduce((acc, curr) => addDices_(acc, curr));
  return formatDices_(sum);
}
