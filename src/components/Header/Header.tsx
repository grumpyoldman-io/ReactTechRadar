import { Label } from '../Label';
import { translate } from '../../utils/styleHelpers';
import { titleOffset } from '../../config';

import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  date: string;
}

export const Header = ({ title, date }: HeaderProps): JSX.Element => {
  return (
    <>
      <Label
        transform={translate(titleOffset.x, titleOffset.y)}
        className={styles.Title}
      >
        {title}
      </Label>
      <Label
        transform={translate(titleOffset.x, titleOffset.y + 20)}
        className={styles.Date}
      >
        {date}
      </Label>
    </>
  );
};
