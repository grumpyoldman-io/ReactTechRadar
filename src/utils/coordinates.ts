import type { Coordinate, Polar } from '../types';
import { boundedInterval } from './math';

export const polarFromCoordinate = (coordinate: Coordinate): Polar => {
  const x = coordinate.x;
  const y = coordinate.y;

  return {
    t: Math.atan2(y, x),
    r: Math.sqrt(x * x + y * y),
  };
};

export const cartesianFromPolar = (polar: Polar): Coordinate => {
  return {
    x: polar.r * Math.cos(polar.t),
    y: polar.r * Math.sin(polar.t),
  };
};

export const boundedRing = (
  polar: Polar,
  rMin: Polar['r'],
  rMax: Polar['r'],
): Polar => {
  return {
    t: polar.t,
    r: boundedInterval(polar.r, rMin, rMax),
  };
};

export const boundedBox = (
  coordinate: Coordinate,
  min: Coordinate,
  max: Coordinate,
): Coordinate => {
  return {
    x: boundedInterval(coordinate.x, min.x, max.x),
    y: boundedInterval(coordinate.y, min.y, max.y),
  };
};
