export interface DiceExpression {
    /**
     * key: dice number of sides
     * value: number of dices
     */ 
    [sides: number]: number;
    constant?: number;
}
