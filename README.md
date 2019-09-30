# gas_charactersheet

Google Apps Scripts custom spreadsheet methods for roleplaying character sheets.

## Domain language

### dice expression

It describes a roleplaying dice throw. It is a string that is formatted like this: `3d6 + d3 + 5`. 
Contains zero or more dices and can include a constant.

Examples:

- `3d6 + d3 + 5`
- `1d6`
- `d6 - 1`
- `4`

Current features / limitations:

- Whitespaces are removed in the parsing step.
- Supports `k`, `K`, `d` and `D` dice markers in the parsing step.
- Supports substraction.
- `1dX` can be shortened to `dX`.
- The first token must be positive.

## Available shpreadsheet methods

### Dice count

Function: `DICECOUNT`  
Input: a dice expression to evaulate.  
Returns the number of dices used in a 'dice expression'.

Usage: `DICECOUNT("3d6 + d3 + 5")` will return `4` since there are **3** d6 dices and **1** d3 dice. `3 + 1 = 4`

### Dice sum

Function: `DICESUM`  
Input: a list of dice expressions.  
Returns the sum of multiple dice expressions.

Usage: `DICESUM("3d6 + d3 + 5"; "d3 + 2"; "1")` will return `3d6 + 2d3 + 8`

### Dice sum with dice marker format

Function: `DICESUM2`  
Input: a dice marker, like `d` in `3d6`. Currently only supports `k`, `K`, `d` and `D`.
Input: a list of dice expressions.  
Returns the sum of multiple dice expressions.

Usage: `DICESUM2("k"; "3d6 + d3 + 5"; "d3 + 2"; "1")` will return `3k6 + 2k3 + 8`
