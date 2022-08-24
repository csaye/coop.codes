import { Email, GitHub, Twitter } from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';
import HomeLink from '../components/HomeLink';
import KofiButton from '../components/KofiButton';
import Snake from '../components/Snake';
import styles from '../styles/pages/Index.module.scss';

export default function Index() {
  const [fade, setFade] = useState(false);

  return (
    <div className={styles.container}>
      <Snake fade={fade} setFade={setFade} />
      <div style={{ opacity: fade ? 0 : 1, transition: '0.25s' }}>
        <HomeLink />
        <div className={styles.kofiButton}>
          <KofiButton />
        </div>
      </div>
      <div className={styles.icons}>
        <a
          href="https://github.com/csaye"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </a>
        <a
          href="mailto:hi@coop.codes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Email />
        </a>
        <a
          href="https://twitter.com/CooperComputer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter />
        </a>
      </div>
      <div className={styles.content}>
        <div
          className={styles.center}
          style={fade ? { opacity: 0.5 } : {}}
        >
          <h1>
            <span>&gt;{' '}</span>
            {
              'coop.codes'.split('').map((char, i) =>
                <span
                  style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                  key={i}
                >
                  {char}
                </span>
              )
            }
          </h1>
          <p>
            <Link href="/domain-hacks">
              <a>Domain Hacks</a>
            </Link>
            <b> • </b>
            <Link href="/i-acute">
              <a>I-Acute (í.is)</a>
            </Link>
            <b> • </b>
            <Link href="/add-a-word">
              <a>Add a Word</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
