import type { ComponentProps } from 'react';
import type { Entry as EntryType } from '../../types';
import { Label } from '../Label';

import styles from './Legend.module.css';

interface EntryProps extends ComponentProps<typeof Label> {
  entry: EntryType;
}

export const Entry = ({ entry, ...rest }: EntryProps): JSX.Element => {
  return (
    <a
      href={entry.link === undefined ? '#' : entry.link}
      target="_blank"
      rel="noreferrer"
    >
      <Label {...rest} className={styles.Entry}>
        {entry.id}. {entry.label}
      </Label>
    </a>
  );
};
