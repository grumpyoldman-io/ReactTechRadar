import { legendOffset } from '../config';
import type { Coordinate, Grid } from '../types';

export const translate = (x: Coordinate['x'], y: Coordinate['y']): string =>
  `translate(${x}, ${y})`;

export const entryTranslate = (
  grid: Grid,
  quadrantIndex: number,
  ringIndex: number,
  index?: number,
): string => {
  const dx = ringIndex < 2 ? 0 : 140;
  let dy = index === undefined ? -16 : index * 12;

  if (ringIndex % 2 === 1) {
    dy = dy + 36 + grid[quadrantIndex][ringIndex - 1].length * 12;
  }

  return translate(
    legendOffset[quadrantIndex].x + dx,
    legendOffset[quadrantIndex].y + dy,
  );
};
