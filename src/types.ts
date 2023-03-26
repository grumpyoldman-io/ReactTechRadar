import type { Dispatch, SetStateAction } from 'react';

export type Color = string;

export interface Coordinate {
  x: number;
  y: number;
}

export interface Polar {
  t: number;
  r: number;
}

export interface Quadrant {
  label: string;
  radialMin: number;
  radialMax: number;
  factorX: number;
  factorY: number;
}

export interface Ring {
  radius: number;
  label: string;
  color: Color;
}

export type Rectangle = [Coordinate, Coordinate, Coordinate, Coordinate];

export interface Segment {
  clipX(coordinate: Coordinate): Coordinate['x'];
  clipY(coordinate: Coordinate): Coordinate['y'];
  random(): Coordinate;
}

export interface Entry extends Coordinate {
  id: number;
  label: string;
  quadrant: 0 | 1 | 2 | 3; // counting clockwise, starting from bottom right
  ring: 0 | 1 | 2 | 3; // starting from inside
  moved: 'up' | 'down' | false;
  segment: Segment;
  color: string;
  link?: string;
}

export interface RadarConfig {
  title: string;
  date: string;
  colors: {
    background: Color;
    grid: Color;
  };
  quadrants: Pick<Quadrant, 'label'>[];
  entries: Pick<Entry, 'label' | 'quadrant' | 'ring' | 'moved' | 'link'>[];
  rings: [
    // starting from inside
    Pick<Ring, 'label' | 'color'>,
    Pick<Ring, 'label' | 'color'>,
    Pick<Ring, 'label' | 'color'>,
    Pick<Ring, 'label' | 'color'>,
  ];
}

export type Grid = Entry[][][];

export interface Radar extends Pick<RadarConfig, 'title' | 'date' | 'colors'> {
  grid: Grid;
  rings: [Ring, Ring, Ring, Ring];
  quadrants: [Quadrant, Quadrant, Quadrant, Quadrant];
  entries: Entry[];
}

export interface EntryState<State = Entry['id'] | null> {
  active: State;
  set: Dispatch<SetStateAction<State>>;
}
