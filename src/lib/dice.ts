export interface DiceGroup {
  numDice: number;
  sides: number;
}

// Set the example dice groups here
const DICE_GROUPS = [
  { numDice: 2, sides: 6 },
  { numDice: 1, sides: 20 },
];

// Function to handle individual dice rolls
export function rollDie(sides: number): number {
  return Math.ceil(Math.random() * sides);
}

// Output individual rolls on a new line
export function rollAll(groups: DiceGroup[]) {
  console.log(
    "Rolling: " + groups.map((g) => `${g.numDice}d${g.sides}`).join(" + "),
  );
  console.log("---");

  // Total Variable
  let grandTotal = 0;

  // Use array to handle each numDice
  // number of dice dictates array length to store individual results
  // Sum the individual results
  // Sum the total as well
  // Show console in readable format
  for (const { numDice, sides } of groups) {
    const rolls = Array.from({ length: numDice }, () => rollDie(sides));
    const sum = rolls.reduce((a, b) => a + b, 0);
    grandTotal += sum;
    console.log(`${numDice}d${sides}: [${rolls.join(", ")}] = ${sum}`);
  }
}

rollAll(DICE_GROUPS);
