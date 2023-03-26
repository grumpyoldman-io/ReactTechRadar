import type { SVGAttributes } from 'react';

import styles from './Label.module.css';

export const Label = ({
  className,
  children,
  ...rest
}: SVGAttributes<SVGTextElement>): JSX.Element => {
  return (
    <text {...rest} className={[styles.Label, className].join(' ')}>
      {children}
    </text>
  );
};
