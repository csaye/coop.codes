import { ReactNode, useState } from 'react';
import styles from '../styles/pages/DomainHacker.module.scss';
import { namecheapTlds } from '../util/namecheapTlds';
import { tlds } from '../util/tlds';

type Hack = {
  available: 'loading' | undefined | true | false,
  tld: string,
  domain: string,
  node: ReactNode
};

export default function DomainHacker() {
  const [word, setWord] = useState('');
  const [foundHacks, setHacks] = useState<Hack[]>([]);

  // mark nodes
  const checkMark = <span style={{ color: 'green' }}><b>✓</b></span>;
  const xMark = <span style={{ color: 'red' }}><b>✘</b></span>;
  const dotsMark = <span style={{ color: 'gray' }}><b>…</b></span>;
  const questionMark = <span style={{ color: 'goldenrod' }}><b>?</b></span>;
  const dotMark = <span style={{ color: 'black' }}><b> • </b></span>;

  return (
    <div className={styles.container}>
    </div>
  );
}
