import Link from 'next/link';
import styles from '../styles/components/HomeLink.module.scss';

type Props = {
  color?: string
};

export default function HomeLink(props: Props) {
  const { color } = props;

  return (
    <Link href="/">
      <a
        className={styles.container}
        style={{ color: color ?? '#000' }}
      >
        coop.codes
      </a>
    </Link>
  );
}
