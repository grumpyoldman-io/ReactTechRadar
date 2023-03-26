import type { Radar } from '../../types';
import { Label } from '../Label';

import styles from './Grid.module.css';

interface GridProps {
  rings: Radar['rings'];
  color: Radar['colors']['grid'];
}

export const Grid = ({ color, rings }: GridProps): JSX.Element => {
  return (
    <g>
      <line x1="0" y1="-400" x2="0" y2="400" stroke={color} strokeWidth="1" />
      <line x1="-400" y1="0" x2="400" y2="0" stroke={color} strokeWidth="1" />
      <defs>
        <filter x="0" y="0" width="1" height="1" id="solid">
          <feFlood floodColor="rgb(0, 0, 0, 0.8)" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      {rings.map((ring, ringIndex) => (
        <g key={`grid-ring-${ringIndex}`}>
          <circle
            cx="0"
            cy="0"
            r={ring.radius}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
          <Label
            y={-ring.radius + 62}
            textAnchor="middle"
            fill={ring.color}
            className={styles.RingLabel}
          >
            {ring.label}
          </Label>
        </g>
      ))}
    </g>
  );
};
