import type { Coordinate, Quadrant, Ring, Rectangle } from './types';

export const resolution = {
  width: 1500,
  height: 1000,
};

// radialMin / radialMax are multiples of PI
export const quadrantRadials: Pick<
  Quadrant,
  'factorX' | 'factorY' | 'radialMax' | 'radialMin'
>[] = [
  { radialMin: 0, radialMax: 0.5, factorX: 1, factorY: 1 },
  { radialMin: 0.5, radialMax: 1, factorX: -1, factorY: 1 },
  { radialMin: -1, radialMax: -0.5, factorX: -1, factorY: -1 },
  { radialMin: -0.5, radialMax: 0, factorX: 1, factorY: -1 },
];

export const ringRadii: Ring['radius'][] = [130, 220, 310, 400];

export const titleOffset: Coordinate = { x: -675, y: -420 };

export const footerOffset: Coordinate = { x: -675, y: 420 };

export const legendOffset: Rectangle = [
  { x: 450, y: 90 },
  { x: -675, y: 90 },
  { x: -675, y: -310 },
  { x: 450, y: -310 },
];
