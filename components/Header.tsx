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
    <div className={styles.container}>
    </div>
  );
}
