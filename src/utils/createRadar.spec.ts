import { quadrantRadials, ringRadii } from '../config';
import type { RadarConfig } from '../types';
import { createRadar } from './createRadar';

const mockEntries: RadarConfig['entries'] = [
  {
    label: 'B',
    quadrant: 0,
    ring: 0,
    moved: false,
  },
  {
    label: 'C',
    quadrant: 1,
    ring: 2,
    moved: false,
  },
  {
    label: 'A',
    quadrant: 0, // Same as entry B
    ring: 0, // Same as entry B
    moved: false,
  },
];

const mockRings: RadarConfig['rings'] = [
  { label: 'INNER', color: '#5ba300' },
  { label: 'SECOND', color: '#009eb0' },
  { label: 'THIRD', color: '#c7ba00' },
  { label: 'OUTER', color: '#e09b96' },
];

const mockQuadrants: RadarConfig['quadrants'] = [
  { label: 'first' },
  { label: 'second' },
  { label: 'third' },
  { label: 'fourth' },
];

describe('createRadar', () => {
  let radar: ReturnType<typeof createRadar>;

  beforeAll(() => {
    radar = createRadar({
      title: 'Mock Radar',
      date: 'Yesterday',
      colors: {
        background: '#FFF',
        grid: '#CCC',
      },
      quadrants: mockQuadrants,
      rings: mockRings,
      entries: mockEntries,
    });
  });

  it('should output the header', () => {
    expect(radar).toHaveProperty('title', 'Mock Radar');
    expect(radar).toHaveProperty('date', 'Yesterday');
  });

  it('should output the colors', () => {
    expect(radar).toHaveProperty('colors');
    expect(radar.colors).toHaveProperty('background', '#FFF');
    expect(radar.colors).toHaveProperty('grid', '#CCC');
  });

  it('should output a multi dimension grid based on 4 quadrants, with 4 rings each', () => {
    expect(radar.grid).toHaveLength(4); // 4 Quadrants
    expect(radar.grid[0]).toHaveLength(4); // 4 Rings
    expect(radar.grid[0][0]).toHaveLength(2); // 2 Entries
  });

  it('should output quadrant structure', () => {
    expect(radar.quadrants).toHaveLength(4);

    radar.quadrants.forEach((quadrant, i) => {
      expect(quadrant).toMatchObject({
        ...mockQuadrants[i],
        ...quadrantRadials[i],
      });
    });
  });

  it('should output rings structure', () => {
    expect(radar.rings).toHaveLength(4);

    radar.rings.forEach((ring, i) => {
      expect(ring).toMatchObject({
        ...mockRings[i],
        radius: ringRadii[i],
      });
    });
  });

  it('should pass on all entries', () => {
    expect(radar.entries).toHaveLength(3);
  });

  it('should pass on entries with labels in the right order', () => {
    expect(radar.entries[0]).toHaveProperty('label', mockEntries[0].label);
    expect(radar.entries[1]).toHaveProperty('label', mockEntries[1].label);
    expect(radar.entries[2]).toHaveProperty('label', mockEntries[2].label);
  });

  it('should position the entries in the grid correctly', () => {
    expect(radar.grid[0][0][0]).toHaveProperty('label', mockEntries[2].label); // q0r0 label A
    expect(radar.grid[0][0][1]).toHaveProperty('label', mockEntries[0].label); // q0r0 label B
    expect(radar.grid[1][2][0]).toHaveProperty('label', mockEntries[1].label); // q1r2 label C
  });

  it('should add a unique sequential id to entries based on their position', () => {
    expect(radar.grid[1][2][0]).toHaveProperty('id', 1);
    expect(radar.grid[0][0][0]).toHaveProperty('id', 2);
    expect(radar.grid[0][0][1]).toHaveProperty('id', 3);
  });
});
