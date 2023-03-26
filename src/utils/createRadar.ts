import type { RadarConfig, Entry, Radar, Grid } from '../types';
import { createSegment } from './segment';
import { ringRadii, quadrantRadials } from '../config';

export const createRadar = (radarConfig: RadarConfig): Radar => {
  const grid: Grid = Array.from({ length: 4 }).map(() =>
    Array.from({ length: 4 }).map(() => []),
  );

  // Create quadrants
  const quadrants: Radar['quadrants'] = [
    { ...radarConfig.quadrants[0], ...quadrantRadials[0] },
    { ...radarConfig.quadrants[1], ...quadrantRadials[1] },
    { ...radarConfig.quadrants[2], ...quadrantRadials[2] },
    { ...radarConfig.quadrants[3], ...quadrantRadials[3] },
  ];

  // Create rings
  const rings: Radar['rings'] = [
    { ...radarConfig.rings[0], radius: ringRadii[0] },
    { ...radarConfig.rings[1], radius: ringRadii[1] },
    { ...radarConfig.rings[2], radius: ringRadii[2] },
    { ...radarConfig.rings[3], radius: ringRadii[3] },
  ];

  // Create entries
  const entries: Entry[] = radarConfig.entries.map((configEntry) => {
    const segment = createSegment(configEntry.quadrant, configEntry.ring);

    const entry: Entry = {
      // Temporary ID
      id: 0,
      ...configEntry,
      segment,
      // Position the entry randomly in its segment
      ...segment.random(),
      color: radarConfig.rings[configEntry.ring].color,
    };

    grid[entry.quadrant][entry.ring].push(entry);

    return entry;
  });

  // Assign unique sequential id to each entry
  let id = 1;

  [2, 3, 1, 0].forEach((quadrant) => {
    [0, 1, 2, 3].forEach((ring) => {
      const sortedEntriesByName = grid[quadrant][ring].sort((a, b) =>
        a.label.localeCompare(b.label),
      );

      sortedEntriesByName.forEach((entry) => {
        entry.id = id++;
      });
    });
  });

  return {
    title: radarConfig.title,
    date: radarConfig.date,
    colors: radarConfig.colors,
    grid,
    quadrants,
    rings,
    entries,
  };
};
