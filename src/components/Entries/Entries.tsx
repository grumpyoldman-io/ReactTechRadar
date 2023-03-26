import { forceCollide, forceSimulation } from 'd3';
import type { MouseEventHandler } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { Entry as EntryType, EntryState } from '../../types';
import { translate } from '../../utils/styleHelpers';
import { Entry } from './Entry';

interface EntriesProps {
  entries: EntryType[];
  entryState: EntryState;
}

export const Entries = ({ entries, entryState }: EntriesProps): JSX.Element => {
  const [entriesState, setEntriesState] = useState<
    (EntryType & { transform: string })[]
  >([]);

  const onMouseOver = useCallback<MouseEventHandler<SVGElement>>((e) => {
    entryState.set(
      parseInt((e.currentTarget.dataset.id ?? '0').replace('entry-', '')) ||
        null,
    );
  }, []);
  const onMouseOut = useCallback(() => {
    entryState.set(null);
  }, []);

  useEffect(() => {
    const ticked = (): void => {
      setEntriesState(
        entries.map((entry) => ({
          ...entry,
          transform: translate(
            entry.segment.clipX({ x: entry.x, y: entry.y }),
            entry.segment.clipY({ x: entry.x, y: entry.y }),
          ),
        })),
      );
    };

    forceSimulation()
      .nodes(entries)
      .velocityDecay(0.19)
      .force('collision', forceCollide().radius(16).strength(0.85))
      .on('tick', ticked);
  }, [entries]);

  return (
    <g>
      {entriesState.map((entry) => (
        <Entry
          key={entry.id}
          transform={entry.transform}
          entry={entry}
          data-id={`entry-${entry.id}`}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          {entry.id}
        </Entry>
      ))}
    </g>
  );
};
