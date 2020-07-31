export const newPattern = (
  level: number,
  setPattern: React.Dispatch<React.SetStateAction<number[]>>
) => {
  // Create an array of all numbers from 0 to 24
  const numbers = Array.from(Array(25).keys()).map((_, index) => index);

  // Randomaly re-arrange the numbers
  numbers.sort(() => Math.random() - 0.5);

  // Slice the array to have as many items as our level, which leads to us having a random set of box indexes. As many as our level
  const newPattern = numbers.slice(0, level);

  // Set this new array as our pattern
  setPattern(newPattern);
};