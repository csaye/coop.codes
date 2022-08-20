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

  // finds hacks for given word
  async function findHacks(word: string) {
    // clean up word
    word = word.toLowerCase();
    word = word.replace(/[^a-z]+/g, '');
    // verify word
    if (!word) {
      window.alert('Please enter letter characters.');
      return;
    }
    if (word.length < 2) {
      window.alert('Please enter at least 2 letters.');
      return;
    }
    // find hacks
    let hacks: Hack[] = [];
    for (let i = word.length - 1; i > 1; i--) {
      const start = word.slice(0, i);
      const end = word.slice(i);
      for (const tld of tlds) {
        if (tld.startsWith(end)) {
          const domain = `${start}.${tld}`;
          const tldStart = tld.slice(0, end.length);
          const tldEnd = tld.slice(end.length);
          const node = <span><b>{start}</b>.<b>{tldStart}</b>{tldEnd}</span>;
          hacks.push({ available: 'loading', tld, domain, node });
        }
      }
    }
    // return if no hacks found
    if (!hacks.length) {
      window.alert('No hacks found.');
      return;
    }
  }

  return (
    <div className={styles.container}>
    </div>
  );
}
