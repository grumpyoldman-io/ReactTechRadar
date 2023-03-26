import {
  cartesianFromPolar,
  polarFromCoordinate,
  boundedRing,
  boundedBox,
} from './coordinates';

describe('coordinates', () => {
  describe('polarFromCoordinate', () => {
    it('should convert a coordinate to a polar', () => {
      expect(polarFromCoordinate({ x: 100, y: 100 })).toStrictEqual({
        r: 141.4213562373095,
        t: 0.7853981633974483,
      });

      expect(polarFromCoordinate({ x: 240, y: 290 })).toStrictEqual({
        r: 376.4306044943742,
        t: 0.8794593980254346,
      });
    });
  });

  describe('cartesianFromPolar', () => {
    it('should convert a polar to a cartesian coordinate', () => {
      expect(cartesianFromPolar({ r: 100, t: 100 })).toStrictEqual({
        x: 86.23188722876839,
        y: -50.63656411097588,
      });

      expect(cartesianFromPolar({ r: 240, t: 290 })).toStrictEqual({
        x: 134.98294242401852,
        y: 198.44295214129954,
      });
    });
  });

  describe('boundedRing', () => {
    it('should convert a polar to a cartesian coordinate', () => {
      expect(boundedRing({ r: 100, t: 100 }, 101, 105)).toStrictEqual({
        r: 101,
        t: 100,
      });

      expect(boundedRing({ r: 100, t: 100 }, 90, 95)).toStrictEqual({
        r: 95,
        t: 100,
      });
    });
  });

  describe('boundedBox', () => {
    it('should convert a polar to a cartesian coordinate', () => {
      expect(
        boundedBox({ x: 0, y: 0 }, { x: 5, y: 5 }, { x: 10, y: 10 }),
      ).toStrictEqual({
        x: 5,
        y: 5,
      });

      expect(
        boundedBox({ x: 20, y: 20 }, { x: 5, y: 5 }, { x: 10, y: 10 }),
      ).toStrictEqual({
        x: 10,
        y: 10,
      });
    });
  });
});
