import type { CSSProperties } from 'react';
import { useState, useMemo } from 'react';
import { resolution } from '../../config';
import type { Radar as RadarType, EntryState } from '../../types';
import { translate } from '../../utils/styleHelpers';
import { Header } from '../Header';
import { Grid } from '../Grid';
import { Footer } from '../Footer';
import { Legend } from '../Legend';
import { Entries } from '../Entries';
import { PopOver } from '../PopOver';

interface RadarProps {
  radar: RadarType;
}

export const Radar = ({ radar }: RadarProps): JSX.Element => {
  const style = useMemo<CSSProperties>(
    () => ({ backgroundColor: radar.colors.background }),
    [radar.colors.background],
  );

  const [active, set] = useState<null | number>(null);
  const entryState: EntryState = { active, set };

  return (
    <svg
      id="radar"
      style={style}
      viewBox={`0 0 ${resolution.width} ${resolution.height}`}
    >
      <g transform={translate(resolution.width / 2, resolution.height / 2)}>
        <Grid color={radar.colors.grid} rings={radar.rings} />
        <Header title={radar.title} date={radar.date} />
        <Footer />
        <Legend
          grid={radar.grid}
          quadrants={radar.quadrants}
          rings={radar.rings}
          entryState={entryState}
        />
        <Entries entries={radar.entries} entryState={entryState} />
        <PopOver
          activeEntry={
            active !== null
              ? radar.entries.find((entry) => entry.id === active) ?? null
              : null
          }
        />
      </g>
    </svg>
  );
};
