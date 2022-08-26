import { useMediaQuery } from '@mui/material';
import Link from 'next/link';
import styles from '../styles/components/Header.module.scss';
import KofiButton from './KofiButton';

type Props = {
  light?: boolean,
  unresponsive?: boolean
};

export default function Header(props: Props) {
  const { light, unresponsive } = props;

  const bigScreen = useMediaQuery('(min-width: 992px)');

  return (
    <div
      className={
        (unresponsive || bigScreen) ? styles.container : styles.containerBar
      }
    >
      <Link href="/">
        <a
          className={styles.home}
          style={{ color: (light && bigScreen) ? '#fff' : undefined }}
        >
          coop.codes
        </a>
      </Link>
      <div className={styles.kofi}>
        <KofiButton />
      </div>
    </div>
  );
}
