let seed = 42;

const randomWithSeed = (): number => {
  // Custom random number generator, to make random sequence reproducible
  // source: https://stackoverflow.com/a/19303725

  const x = Math.sin(seed++) * 10000;

  return x - Math.floor(x);
};

export const randomBetween = (min: number, max: number): number => {
  return min + randomWithSeed() * (max - min);
};

export const normalBetween = (min: number, max: number): number => {
  return min + (randomWithSeed() + randomWithSeed()) * 0.5 * (max - min);
};

export const boundedInterval = (
  value: number,
  min: number,
  max: number,
): number => {
  const low = Math.min(min, max);
  const high = Math.max(min, max);

  return Math.min(Math.max(value, low), high);
};
