import type { SVGAttributes } from 'react';
import type { Entry as EntryType } from '../../types';
import { Label } from '../Label';

interface EntryProps extends SVGAttributes<SVGGElement> {
  entry: EntryType;
}

import styles from './Entries.module.css';

export const Entry = ({
  entry,
  transform,
  ...rest
}: EntryProps): JSX.Element => {
  return (
    <g transform={transform} {...rest}>
      <a
        href={entry.link === undefined ? '#' : entry.link}
        target="_blank"
        rel="noreferrer"
      >
        {entry.moved ? (
          entry.moved === 'up' ? (
            // Down
            <path d="M -11,5 11,5 0,-13 z" fill={entry.color} />
          ) : (
            // Down
            <path d="M -11,-5 11,-5 0,13 z" fill={entry.color} />
          )
        ) : (
          // Stable
          <circle r="9" fill={entry.color} />
        )}
        <Label
          textAnchor="middle"
          fill="#FFF"
          className={styles.Entry}
          y="3"
          fontSize={entry.id > 9 ? '8px' : '9px'}
        >
          {entry.id}
        </Label>
      </a>
    </g>
  );
};
