
// This runs the test sequence and flashes different blocks randomally.
export const runSequence = (
  level: number,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
  startCounting: () => void,
  flash: () => void
) => {
  let runs = 0;
  setIsRunning(true);

  const flashInterval: NodeJS.Timeout = setInterval(() => {
    // Stop flashing when the number of flashes matches our current level
    if (runs === level) {
      setIsRunning(false);
      return clearInterval(flashInterval);
    }

    startCounting();
    flash();
    runs++;
  }, 1000);
};

export const flash = (
  setFlashingBlock: React.Dispatch<React.SetStateAction<number>>,
  setSequene: React.Dispatch<React.SetStateAction<number[]>>
) => {
  // Choose randomally what block would flash next
  const flshBlck = Math.floor(Math.random() * 16);
  // Set it to our sate so it'll re render and would flash
  setFlashingBlock(flshBlck);
  // Store the value of that block that was chose to our sequence state for later comparison.
  setSequene((seq) => [...seq, flshBlck]);
};

export const handleSubmit = (
  replay: number[],
  sequence: number[],
  jumpLevel: () => void,
  dropLevel: () => void,
  makeSuccessIndicatorVisible: () => void
) => {
  if (replay.length !== sequence.length) return;

  // We join our replay and the test sequence seperatly and check for equality. I chose join with a sperator rather than a simple toString, to avoid 1 and then 11 or 11 and then 1 from comparing to true.
  const isCorrect = replay.join("-") === sequence.join("-");

  isCorrect ? jumpLevel() : dropLevel();

  makeSuccessIndicatorVisible();
};
