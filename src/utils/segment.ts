import { quadrantRadials, ringRadii } from '../config';
import type { Entry, Segment, Coordinate, Polar } from '../types';
import {
  boundedBox,
  boundedRing,
  cartesianFromPolar,
  polarFromCoordinate,
} from './coordinates';
import { randomBetween } from './math';

export const createSegment = (
  quadrant: Entry['quadrant'],
  ring: Entry['ring'],
): Segment => {
  const polarMin: Polar = {
    t: quadrantRadials[quadrant].radialMin * Math.PI,
    r: ring === 0 ? 30 : ringRadii[ring - 1],
  };
  const polarMax: Polar = {
    t: quadrantRadials[quadrant].radialMax * Math.PI,
    r: ringRadii[ring],
  };
  const cartesianMin: Coordinate = {
    x: 15 * quadrantRadials[quadrant].factorX,
    y: 15 * quadrantRadials[quadrant].factorY,
  };
  const cartesianMax: Coordinate = {
    x: ringRadii[3] * quadrantRadials[quadrant].factorX,
    y: ringRadii[3] * quadrantRadials[quadrant].factorY,
  };

  const getCartesianFromCoordinate = (coordinate: Coordinate): Coordinate => {
    return cartesianFromPolar(
      boundedRing(
        polarFromCoordinate(boundedBox(coordinate, cartesianMin, cartesianMax)),
        polarMin.r + 15,
        polarMax.r - 15,
      ),
    );
  };

  return {
    clipX: (coordinate: Coordinate): Coordinate['x'] => {
      // Modify original coordinate
      coordinate.x = getCartesianFromCoordinate(coordinate).x;

      return coordinate.x;
    },
    clipY: (coordinate: Coordinate): Coordinate['y'] => {
      // Modify original coordinate
      coordinate.y = getCartesianFromCoordinate(coordinate).y;

      return coordinate.y;
    },
    random: (): Coordinate => {
      return cartesianFromPolar({
        t: randomBetween(polarMin.t, polarMax.t),
        r: randomBetween(polarMin.r, polarMax.r),
      });
    },
  };
};
