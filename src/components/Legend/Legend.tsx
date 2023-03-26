import { Label } from '../Label';
import { entryTranslate, translate } from '../../utils/styleHelpers';
import { legendOffset } from '../../config';

import styles from './Legend.module.css';
import type { EntryState, Radar } from '../../types';
import { Entry } from './Entry';
import type { MouseEventHandler } from 'react';
import { useCallback } from 'react';

interface LegendProps {
  grid: Radar['grid'];
  quadrants: Radar['quadrants'];
  rings: Radar['rings'];
  entryState: EntryState;
}

export const Legend = ({
  grid,
  quadrants,
  rings,
  entryState,
}: LegendProps): JSX.Element => {
  const onMouseOver = useCallback<MouseEventHandler<SVGElement>>((e) => {
    entryState.set(
      parseInt((e.currentTarget.dataset.id ?? '0').replace('legend-', '')) ||
        null,
    );
  }, []);
  const onMouseOut = useCallback(() => {
    entryState.set(null);
  }, []);

  return (
    <g>
      {quadrants.map((quadrant, quadrantIndex) => (
        <g key={`legend-quadrant-${quadrantIndex}`}>
          <Label
            transform={translate(
              legendOffset[quadrantIndex].x,
              legendOffset[quadrantIndex].y - 45,
            )}
            className={styles.Quadrant}
          >
            {quadrant.label}
          </Label>
          {rings.map((ring, ringIndex) => (
            <g key={`legend-ring-${quadrantIndex}-${ringIndex}`}>
              <Label
                transform={entryTranslate(grid, quadrantIndex, ringIndex)}
                fill={ring.color}
                className={styles.Ring}
              >
                {ring.label}
              </Label>
              {grid[quadrantIndex][ringIndex].map((entry, entryIndex) => (
                <Entry
                  key={`legend-entry-${entry.id}`}
                  entry={entry}
                  transform={entryTranslate(
                    grid,
                    quadrantIndex,
                    ringIndex,
                    entryIndex,
                  )}
                  data-id={`legend-${entry.id}`}
                  filter={
                    entryState.active === entry.id ? 'url(#solid)' : undefined
                  }
                  fill={entryState.active === entry.id ? 'white' : undefined}
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                />
              ))}
            </g>
          ))}
        </g>
      ))}
    </g>
  );
};
