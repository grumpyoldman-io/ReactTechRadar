import { Label } from '../Label';
import { translate } from '../../utils/styleHelpers';
import { footerOffset } from '../../config';

import styles from './Footer.module.css';

export const Footer = (): JSX.Element => {
  return (
    <Label
      transform={translate(footerOffset.x, footerOffset.y)}
      className={styles.Footer}
      xmlSpace="preserve"
    >
      ▲ moved up{'     '}▼ moved down
    </Label>
  );
};
