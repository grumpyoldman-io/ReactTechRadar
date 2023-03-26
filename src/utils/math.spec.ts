import { randomBetween, normalBetween, boundedInterval } from './math';

describe('math', () => {
  describe('randomBetween', () => {
    // This function gives back random numbers, but it is based on a seed,
    // so every time you consecutively run this function it will return
    // the same values
    it('should give a randomBetween (from seed)', () => {
      expect(randomBetween(0, 10)).toBe(7.845208436629036);
      expect(randomBetween(0, 10)).toBe(2.525737140167621);
    });
  });

  describe('normalBetween', () => {
    // This function gives back normal numbers, but it is based on a seed,
    // so every time you consecutively run this function it will return
    // the same values
    it('should give a normalBetween (from seed)', () => {
      expect(normalBetween(0, 10)).toBe(0.27248197660455276);
      expect(normalBetween(0, 10)).toBe(8.073519701661098);
    });
  });

  describe('boundedInterval', () => {
    it('should give a boundedInterval', () => {
      expect(boundedInterval(20, 0, 10)).toBe(10);
      expect(boundedInterval(-10, 0, 10)).toBe(0);
    });
  });
});
