import { useEffect, useRef } from 'react';

import styles from './PopOver.module.css';
import type { Entry } from '../../types';
import { Label } from '../Label';

interface PopOverProps {
  activeEntry: Entry | null;
}

export const PopOver = ({ activeEntry }: PopOverProps): JSX.Element | null => {
  const popOverRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (activeEntry === null || popOverRef.current === null) {
      return;
    }

    const transform =
      document
        .querySelector(`[data-id="entry-${activeEntry.id}"]`)
        ?.getAttribute('transform') ?? null;

    if (transform === null) {
      return;
    }

    // Position PopOver
    popOverRef.current.setAttribute('transform', transform);

    // Resize elements
    const label = popOverRef.current.querySelector('text');
    const rect = popOverRef.current.querySelector('rect');

    if (label === null || rect === null) {
      return;
    }

    const { width, height } = label.getBoundingClientRect();

    rect.setAttribute('width', String(width + 25));
    rect.setAttribute('height', String(height + 7));
    rect.setAttribute('x', String(-(width + 25) / 2));
    label.setAttribute('x', String(-(width + 25) / 2 + 6));
  }, [activeEntry]);

  if (activeEntry === null) {
    return null;
  }

  return (
    <g className={styles.PopOver} ref={popOverRef}>
      <rect x="-6" y="-35" width="0" height="0" />
      <path d="M -5,-15 5,-15 0,-9 z" />
      <Label x="0" y="-20" fill="#FFF" className={styles.PopOverLabel}>
        {activeEntry.label}
      </Label>
    </g>
  );
};
