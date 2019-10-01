import { DiceExpression } from "./model";

const signMapper = {
    "+": 1,
    "-": -1
}

const CONSTANT_NAME = "constant";

export function parseDices_(input: string, diceMarker = "kKdD"): DiceExpression {
    const dice: DiceExpression = {};
    const re = new RegExp(`([+-]?)\s*(\d*)([${diceMarker}]?)(\d+)`, "g");

    let match = null;
    while ((match = re.exec(input)) != null) {
        const isDice = !!match[3];
        const sign = signMapper[match[1] || "+"] as number;

        if (isDice) {
            const diceCount = (parseInt(match[2], 10) || 1) * sign;
            const diceSides = parseInt(match[4], 10);

            dice[diceSides] = (dice[diceSides] || 0) + diceCount;
        } else {
            dice.constant = parseInt(match[4], 10) * sign;
        }
    }

    return dice;
}

export function formatDices_(dice: DiceExpression, diceMarker = "d"): string {
    return Object.keys(dice).sort(diceSidesSorter_).reduce((formatted: string, side: string, index: number) => {
        const countOrConstant = dice[side] as number;
        const sign = countOrConstant > 0 ? "+" : "-";
        const isConstant = side === CONSTANT_NAME;

        return formatted
            // assume the first dice is always positive so skip it's sign
            + (index > 0 ? ` ${sign} ` : "")
            + (isConstant
                ? `${Math.abs(countOrConstant)}`
                : `${Math.abs(countOrConstant)}${diceMarker}${side}`);
    }, "");
}

function diceSidesSorter_(side1: string, side2: string): number {
    if (side1 === CONSTANT_NAME && side2 === CONSTANT_NAME)
        return 0;

    if (side1 === CONSTANT_NAME)
        return 1;

    if (side2 === CONSTANT_NAME)
        return -1;

    return parseInt(side2, 10) - parseInt(side1, 10);
}

export function diceCount_(dice: DiceExpression): number {
    return Object.keys(dice)
        .filter(k => k !== CONSTANT_NAME)
        .reduce((acc, curr) => acc += dice[curr], 0);
}

export function addDices_(a: DiceExpression, b: DiceExpression): DiceExpression {
    const sum: DiceExpression = {};

    for (const side of Object.keys(a)) {
        sum[side] = (sum[side] || 0) + a[side];
    }

    for (const side of Object.keys(b)) {
        sum[side] = (sum[side] || 0) + b[side];
    }

    return sum;
}
